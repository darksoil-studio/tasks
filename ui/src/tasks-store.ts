import { NotificationsStore } from '@darksoil-studio/notifications';
import {
	AsyncComputed,
	allRevisionsOfEntrySignal,
	collectionSignal,
	deletedLinksSignal,
	deletesForEntrySignal,
	immutableEntrySignal,
	latestVersionOfEntrySignal,
	liveLinksSignal,
	pipe,
} from '@holochain-open-dev/signals';
import {
	EntryRecord,
	HashType,
	LazyHoloHashMap,
	retype,
	slice,
} from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	EntryHash,
	NewEntryAction,
	Record,
} from '@holochain/client';

import { TasksClient } from './tasks-client.js';
import { Task } from './types.js';

export class TasksStore {
	constructor(
		public client: TasksClient,
		public notificationsStore: NotificationsStore,
	) {}
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
		dependencies: {
			live: pipe(
				liveLinksSignal(
					this.client,
					taskHash,
					() => this.client.getDependentTasksForTask(taskHash),
					'TaskToTasks',
				),
				links => links.map(l => l.target),
			),
			deleted: pipe(
				deletedLinksSignal(
					this.client,
					taskHash,
					() => this.client.getDeletedDependentTasksForTask(taskHash),
					'TaskToTasks',
				),
				links => links.map(l => l[0].hashed.content.target_address),
			),
		},
	}));

	tasksForAssignee = new LazyHoloHashMap((assignee: AgentPubKey) => ({
		live: pipe(
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
		deleted: pipe(
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
}
