import { NotificationsStore } from '@darksoil-studio/notifications';
import {
	AsyncComputed,
	allRevisionsOfEntrySignal,
	collectionSignal,
	deletedLinksSignal,
	deletesForEntrySignal,
	immutableEntrySignal,
	joinAsync,
	latestVersionOfEntrySignal,
	liveLinksSignal,
	mapCompleted,
	pipe,
	toPromise,
} from '@holochain-open-dev/signals';
import {
	EntryRecord,
	HashType,
	HoloHashMap,
	LazyHoloHashMap,
	retype,
	slice,
} from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	EntryHash,
	HoloHash,
	NewEntryAction,
	Record,
	Update,
	encodeHashToBase64,
} from '@holochain/client';

import { TasksClient } from './tasks-client.js';
import { Task, TaskDependency, TaskStatus } from './types.js';
import { effect, waitUntil } from './utils.js';

function dependantTasksUpdateNeeded(
	previousStatus: TaskStatus,
	newStatus: TaskStatus,
): boolean {
	if (previousStatus === newStatus) return false;
	if (newStatus === 'Done') return true;

	if (
		previousStatus === 'Done' &&
		(newStatus === 'Ready' || newStatus === 'InProgress')
	)
		return true;

	return false;
}

function deriveNewStatus(
	currentStatus: TaskStatus,
	dependencies: Array<TaskDependency>,
): TaskStatus | undefined {
	const nonOptionalDeps = dependencies.filter(d => !d.optional);

	if (
		currentStatus === 'Blocked' &&
		nonOptionalDeps.every(d => d.status === 'Done')
	)
		return 'Ready';

	if (
		(currentStatus === 'Ready' || currentStatus === 'InProgress') &&
		dependencies.find(d => d.status !== 'Done')
	)
		return 'Blocked';

	return undefined;
}

export class TasksStore {
	private updatingTasks = new HoloHashMap<HoloHash, boolean>();
	constructor(
		public client: TasksClient,
		public notificationsStore?: NotificationsStore,
	) {
		effect(() => {
			const myTasks = this.myTasks.live.get();
			if (myTasks.status !== 'completed') return;

			// For each task
			// Get all its dependencies
			// Check whether the latestVersion of any of them means that we should update our task,
			// and do so if necessary

			for (const [taskHash, task] of Array.from(myTasks.value.entries())) {
				const latestVersion = task.latestVersion.get();
				if (latestVersion.status !== 'completed') continue;
				const dependencies = latestVersion.value.entry.dependencies;

				const dependenciesLatestVersions = joinAsync(
					dependencies.map(d =>
						this.tasks.get(d.original_revision_hash).latestVersion.get(),
					),
				);
				if (dependenciesLatestVersions.status !== 'completed') continue;

				for (let i = 0; i < dependencies.length; i++) {
					const dependencyLatestVersion = dependenciesLatestVersions.value[i];
					const dependency = dependencies[i];

					dependency.last_revision_hash = dependencyLatestVersion.actionHash;
					dependency.status = dependencyLatestVersion.entry.status;
				}

				const newStatus = deriveNewStatus(
					latestVersion.value.entry.status,
					dependencies,
				);

				if (newStatus) {
					if (!this.updatingTasks.get(taskHash)) {
						this.updatingTasks.set(taskHash, true);

						this.client
							.updateTask(taskHash, latestVersion.value.actionHash, {
								...latestVersion.value.entry,
								original_create_hash: latestVersion.value.entry
									.original_create_hash
									? latestVersion.value.entry.original_create_hash
									: taskHash,
								status: newStatus,
							})
							.finally(() => {
								this.updatingTasks.delete(taskHash);
							});
					}
				}
			}
		});

		client.onSignal(async signal => {
			if (signal.type === 'EntryUpdated') {
				if (signal.app_entry.type === 'Task') {
					const originalCreateHash = signal.app_entry.original_create_hash!;

					if (
						dependantTasksUpdateNeeded(
							signal.original_app_entry.status,
							signal.app_entry.status,
						)
					) {
						const task = this.tasks.get(originalCreateHash);
						const dependentTasksHashes = await toPromise(
							task.dependentTasks.live,
						);

						await Promise.all(
							dependentTasksHashes.map(dt =>
								this.updateDependentTaskIfNecessary(
									originalCreateHash,
									signal.action.hashed.hash,
									signal.app_entry.status,
									dt,
								),
							),
						);
					}
				}
			}
			// if (signal.type === 'LinkCreated') {
			// 	if (signal.link_type === 'TaskUpdates') {
			// 		const task = this.tasks.get(
			// 			retype(signal.action.hashed.content.base_address, HashType.ACTION),
			// 		);
			// 		await waitUntil(async () => {
			// 			const latestVersion = await toPromise(task.latestVersion);

			// 			return (
			// 				encodeHashToBase64(latestVersion.actionHash) ===
			// 				encodeHashToBase64(
			// 					retype(
			// 						signal.action.hashed.content.target_address,
			// 						HashType.ACTION,
			// 					),
			// 				)
			// 			);
			// 		}, 10_000);

			// 		const latestVersion = await toPromise(task.latestVersion);
			// 		const previousRevision = await this.client.getOriginalTask(
			// 			(latestVersion.action as Update).original_action_address,
			// 		);
			// 		if (!previousRevision)
			// 			throw new Error(
			// 				'Could not find previous revision when we just updated it',
			// 			);
			// 	}
			// }
		});
	}

	private async updateDependentTaskIfNecessary(
		originalDependencyHash: ActionHash,
		latestDependencyHash: ActionHash,
		newDependencyStatus: TaskStatus,
		originalDependentHash: ActionHash,
	) {
		const latestVersion = await toPromise(
			this.tasks.get(originalDependentHash).latestVersion,
		);
		const dependencies = latestVersion.entry.dependencies;

		for (const dependency of dependencies) {
			if (
				encodeHashToBase64(dependency.original_revision_hash) ===
				encodeHashToBase64(originalDependencyHash)
			) {
				dependency.last_revision_hash = latestDependencyHash;
				dependency.status = newDependencyStatus;
			}
		}

		const newStatus = deriveNewStatus(latestVersion.entry.status, dependencies);

		if (newStatus) {
			const newTask: Task = {
				...latestVersion.entry,
				original_create_hash: latestVersion.entry.original_create_hash
					? latestVersion.entry.original_create_hash
					: originalDependencyHash,
				dependencies,
			};
			await this.client.updateTask(
				originalDependencyHash,
				latestVersion.actionHash,
				newTask,
			);
		}
	}

	/** Task */

	tasks = new LazyHoloHashMap((taskHash: ActionHash) => ({
		latestVersion: latestVersionOfEntrySignal(this.client, () =>
			this.client.getLatestTask(taskHash),
		),
		original: immutableEntrySignal(() => this.client.getOriginalTask(taskHash)),
		allRevisions: allRevisionsOfEntrySignal(this.client, () =>
			this.client.getAllRevisionsForTask(taskHash),
		),
		deletes: deletesForEntrySignal(this.client, taskHash, () =>
			this.client.getAllDeletesForTask(taskHash),
		),
		dependentTasks: {
			live: mapCompleted(
				liveLinksSignal(
					this.client,
					taskHash,
					() => this.client.getDependentTasksForTask(taskHash),
					'Dependency',
				),
				links => links.map(l => l.target),
			),
			deleted: mapCompleted(
				deletedLinksSignal(
					this.client,
					taskHash,
					() => this.client.getDeletedDependentTasksForTask(taskHash),
					'Dependency',
				),
				links => links.map(l => l[0].hashed.content.target_address),
			),
		},
	}));

	tasksForAssignee = new LazyHoloHashMap((assignee: AgentPubKey) => ({
		live: mapCompleted(
			liveLinksSignal(
				this.client,
				assignee,
				() => this.client.getTasksForAssignee(assignee),
				'AssigneeToTasks',
			),
			links =>
				slice(
					this.tasks,
					links.map(l => l.target),
				),
		),
		deleted: mapCompleted(
			deletedLinksSignal(
				this.client,
				assignee,
				() => this.client.getDeletedTasksForAssignee(assignee),
				'AssigneeToTasks',
			),
			links =>
				slice(
					this.tasks,
					links.map(l => l[0].hashed.content.target_address),
				),
		),
	}));

	myTasks = this.tasksForAssignee.get(this.client.client.myPubKey);
}
