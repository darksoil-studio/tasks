import { EntryRecord, ZomeClient } from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	AppClient,
	CreateLink,
	Delete,
	DeleteLink,
	EntryHash,
	Link,
	Record,
	SignedActionHashed,
} from '@holochain/client';

import { Task } from './types.js';
import { TasksSignal } from './types.js';

export class TasksClient extends ZomeClient<TasksSignal> {
	constructor(
		public client: AppClient,
		public roleName: string,
		public zomeName = 'tasks',
	) {
		super(client, roleName, zomeName);
	}
	/** Task */

	async createTask(task: Task): Promise<EntryRecord<Task>> {
		const record: Record = await this.callZome('create_task', task);
		return new EntryRecord(record);
	}

	async getLatestTask(
		taskHash: ActionHash,
	): Promise<EntryRecord<Task> | undefined> {
		const record: Record = await this.callZome('get_latest_task', taskHash);
		return record ? new EntryRecord(record) : undefined;
	}

	async getOriginalTask(
		taskHash: ActionHash,
	): Promise<EntryRecord<Task> | undefined> {
		const record: Record = await this.callZome('get_original_task', taskHash);
		return record ? new EntryRecord(record) : undefined;
	}

	async getAllRevisionsForTask(
		taskHash: ActionHash,
	): Promise<Array<EntryRecord<Task>>> {
		const records: Record[] = await this.callZome(
			'get_all_revisions_for_task',
			taskHash,
		);
		return records.map(r => new EntryRecord(r));
	}

	async updateTask(
		originalTaskHash: ActionHash,
		previousTaskHash: ActionHash,
		updatedTask: Task,
	): Promise<void> {
		await this.callZome('update_task', {
			original_task_hash: originalTaskHash,
			previous_task_hash: previousTaskHash,
			updated_task: updatedTask,
		});
	}

	deleteTask(originalTaskHash: ActionHash): Promise<ActionHash> {
		return this.callZome('delete_task', originalTaskHash);
	}

	getAllDeletesForTask(
		originalTaskHash: ActionHash,
	): Promise<Array<SignedActionHashed<Delete>> | undefined> {
		return this.callZome('get_all_deletes_for_task', originalTaskHash);
	}

	getOldestDeleteForTask(
		originalTaskHash: ActionHash,
	): Promise<SignedActionHashed<Delete> | undefined> {
		return this.callZome('get_oldest_delete_for_task', originalTaskHash);
	}

	async getTasksForAssignee(assignee: AgentPubKey): Promise<Array<Link>> {
		return this.callZome('get_tasks_for_assignee', assignee);
	}

	async getDeletedTasksForAssignee(
		assignee: AgentPubKey,
	): Promise<
		Array<[SignedActionHashed<CreateLink>, SignedActionHashed<DeleteLink>[]]>
	> {
		return this.callZome('get_deleted_tasks_for_assignee', assignee);
	}

	async getDependentTasksForTask(taskHash: ActionHash): Promise<Array<Link>> {
		return this.callZome('get_dependent_tasks_for_task', taskHash);
	}

	async getDeletedDependentTasksForTask(
		taskHash: ActionHash,
	): Promise<
		Array<[SignedActionHashed<CreateLink>, SignedActionHashed<DeleteLink>[]]>
	> {
		return this.callZome('get_deleted_dependent_tasks_for_task', taskHash);
	}

	/** Unfinished Tasks */

	async getUnfinishedTasks(): Promise<Array<Link>> {
		return this.callZome('get_unfinished_tasks', undefined);
	}
}
