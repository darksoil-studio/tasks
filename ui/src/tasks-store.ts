import { NotificationsStore } from '@darksoil-studio/notifications';
import {
	AsyncComputed,
	allRevisionsOfEntrySignal,
	collectionSignal,
	deletedLinksSignal,
	deletesForEntrySignal,
	immutableEntrySignal,
	joinAsync,
	joinAsyncMap,
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
	mapValues,
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
import { encode } from '@msgpack/msgpack';

import {
	NOTIFICATIONS_TYPES,
	TasksNotificationClickHandlers,
	TasksNotificationsTypes,
	notificationsTypes,
} from './notifications.js';
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
	if (nonOptionalDeps.length === 0) return undefined;

	if (
		currentStatus === 'Blocked' &&
		nonOptionalDeps.every(d => d.status === 'Done')
	)
		return 'Ready';

	if (
		(currentStatus === 'Ready' || currentStatus === 'InProgress') &&
		!!nonOptionalDeps.find(d => d.status !== 'Done')
	)
		return 'Blocked';

	return undefined;
}

export class TasksStore {
	private updatingTasks = new HoloHashMap<HoloHash, boolean>();

	constructor(
		public client: TasksClient,
		public notificationsStore?: NotificationsStore,
		public notificationsOnClickHandlers?: TasksNotificationClickHandlers,
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
								dependencies,
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

					if (notificationsStore) {
						if (
							signal.app_entry.status === 'Cancelled' &&
							signal.original_app_entry.status !== 'Cancelled'
						) {
							const task = this.tasks.get(originalCreateHash);
							const dependentTasksHashes = await toPromise(
								task.dependentTasks.live,
							);

							const notifyCancelled = async (dependentTaskHash: ActionHash) => {
								const latestVersion = await toPromise(
									this.tasks.get(dependentTaskHash).latestVersion,
								);
								if (
									latestVersion.entry.assignee &&
									encodeHashToBase64(latestVersion.entry.assignee) !==
										encodeHashToBase64(this.client.client.myPubKey)
								) {
									await notificationsStore.client.createNotification({
										content: encode({}),
										notification_type:
											NOTIFICATIONS_TYPES.DEPENDENCY_FOR_YOUR_TASK_WAS_CANCELLED,
										persistent: false,
										notification_group: encodeHashToBase64(dependentTaskHash),
										recipients: [latestVersion.entry.assignee],
									});
								}
							};

							await Promise.all(
								dependentTasksHashes.map(h => notifyCancelled(h)),
							);
						}

						if (
							signal.app_entry.assignee !== signal.original_app_entry.assignee
						) {
							// Assignee changed
							if (
								signal.original_app_entry.assignee &&
								encodeHashToBase64(signal.original_app_entry.assignee) !==
									encodeHashToBase64(this.client.client.myPubKey)
							) {
								await notificationsStore.client.createNotification({
									content: encode({}),
									notification_type: NOTIFICATIONS_TYPES.TASK_UNASSIGNED_TO_YOU,
									notification_group: encodeHashToBase64(
										signal.app_entry.original_create_hash!,
									),
									persistent: false,
									recipients: [signal.original_app_entry.assignee],
								});
							}
							if (
								signal.app_entry.assignee &&
								encodeHashToBase64(signal.app_entry.assignee) !==
									encodeHashToBase64(this.client.client.myPubKey)
							) {
								await notificationsStore.client.createNotification({
									content: encode({}),
									notification_type: NOTIFICATIONS_TYPES.TASK_ASSIGNED_TO_YOU,
									notification_group: encodeHashToBase64(
										signal.app_entry.original_create_hash!,
									),
									persistent: false,
									recipients: [signal.app_entry.assignee],
								});
							}

							if (!signal.app_entry.assignee) {
								const task = this.tasks.get(originalCreateHash);
								const dependentTasksHashes = await toPromise(
									task.dependentTasks.live,
								);
								const notifyDependents = async (
									dependentTaskHash: ActionHash,
								) => {
									const latestVersion = await toPromise(
										this.tasks.get(dependentTaskHash).latestVersion,
									);
									if (
										latestVersion.entry.assignee &&
										encodeHashToBase64(latestVersion.entry.assignee) !==
											encodeHashToBase64(this.client.client.myPubKey)
									) {
										await notificationsStore.client.createNotification({
											content: encode({}),
											notification_type:
												NOTIFICATIONS_TYPES.ASSIGNEE_REMOVED_FROM_YOUR_DEPENDENCIES,
											persistent: false,
											notification_group: encodeHashToBase64(dependentTaskHash),
											recipients: [latestVersion.entry.assignee],
										});
									}

									await Promise.all(
										dependentTasksHashes.map(h => notifyDependents(h)),
									);
								};
							}
						}
					}
				}
			}
			if (signal.type === 'EntryCreated') {
				if (notificationsStore) {
					if (
						signal.app_entry.assignee &&
						encodeHashToBase64(signal.app_entry.assignee) !==
							encodeHashToBase64(this.client.client.myPubKey)
					) {
						await notificationsStore.client.createNotification({
							content: encode({}),
							notification_type: NOTIFICATIONS_TYPES.TASK_ASSIGNED_TO_YOU,
							notification_group: encodeHashToBase64(
								signal.action.hashed.hash!,
							),
							persistent: false,
							recipients: [signal.app_entry.assignee],
						});
					}
				}
			}
		});

		if (notificationsStore) {
			notificationsStore.addTypes(
				notificationsTypes(this, notificationsOnClickHandlers),
			);
		}
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
					: originalDependentHash,
				dependencies,
				status: newStatus,
			};
			await this.client.updateTask(
				originalDependencyHash,
				latestVersion.actionHash,
				newTask,
			);

			if (
				this.notificationsStore &&
				newTask.assignee &&
				encodeHashToBase64(newTask.assignee) !==
					encodeHashToBase64(this.client.client.myPubKey)
			) {
				if (
					latestVersion.entry.status === 'Blocked' &&
					newStatus !== 'Blocked'
				) {
					await this.notificationsStore.client.createNotification({
						notification_group: encodeHashToBase64(originalDependentHash),
						notification_type: NOTIFICATIONS_TYPES.TASK_UNBLOCKED,
						content: encode({}),
						persistent: false,
						recipients: [newTask.assignee],
					});
				}
			}
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

	/** Unfinished Tasks */

	unfinishedTasks = pipe(
		collectionSignal(
			this.client,
			() => this.client.getUnfinishedTasks(),
			'UnfinishedTasks',
		),
		unfinishedTasks =>
			slice(
				this.tasks,
				unfinishedTasks.map(l => l.target),
			),
	);
}
