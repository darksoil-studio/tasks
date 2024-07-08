import {
	AgentPubKeyMap,
	HashType,
	HoloHashMap,
	RecordBag,
	ZomeMock,
	decodeEntry,
	entryState,
	fakeCreateAction,
	fakeDeleteEntry,
	fakeEntry,
	fakeRecord,
	fakeUpdateEntry,
	hash,
	pickBy,
} from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	AppClient,
	Delete,
	EntryHash,
	Link,
	NewEntryAction,
	Record,
	SignedActionHashed,
	decodeHashFromBase64,
	fakeActionHash,
	fakeAgentPubKey,
	fakeDnaHash,
	fakeEntryHash,
} from '@holochain/client';

import { TasksClient } from './tasks-client.js';
import { Task } from './types.js';

export class TasksZomeMock extends ZomeMock implements AppClient {
	constructor(myPubKey?: AgentPubKey) {
		super('tasks_test', 'tasks', myPubKey);
	}
	/** Task */
	tasks = new HoloHashMap<
		ActionHash,
		{
			deletes: Array<SignedActionHashed<Delete>>;
			revisions: Array<Record>;
		}
	>();
	tasksForAssignee = new HoloHashMap<ActionHash, Link[]>();
	tasksForTask = new HoloHashMap<ActionHash, Link[]>();

	async create_task(task: Task): Promise<Record> {
		const entryHash = hash(task, HashType.ENTRY);
		const record = await fakeRecord(
			await fakeCreateAction(entryHash),
			fakeEntry(task),
		);

		this.tasks.set(record.signed_action.hashed.hash, {
			deletes: [],
			revisions: [record],
		});

		if (task.assignee) {
			const existingAssignee = this.tasksForAssignee.get(task.assignee) || [];
			this.tasksForAssignee.set(task.assignee, [
				...existingAssignee,
				{
					target: record.signed_action.hashed.hash,
					author: this.myPubKey,
					timestamp: Date.now() * 1000,
					zome_index: 0,
					link_type: 0,
					tag: new Uint8Array(),
					create_link_hash: await fakeActionHash(),
				},
			]);
		}
		await Promise.all(
			task.dependencies.map(async dependencies => {
				const existingDependencies =
					this.tasksForTask.get(dependencies.original_revision_hash) || [];
				this.tasksForTask.set(dependencies.original_revision_hash, [
					...existingDependencies,
					{
						target: record.signed_action.hashed.hash,
						author: this.myPubKey,
						timestamp: Date.now() * 1000,
						zome_index: 0,
						link_type: 0,
						tag: new Uint8Array(),
						create_link_hash: await fakeActionHash(),
					},
				]);
			}),
		);

		return record;
	}

	async get_latest_task(taskHash: ActionHash): Promise<Record | undefined> {
		const task = this.tasks.get(taskHash);
		return task ? task.revisions[task.revisions.length - 1] : undefined;
	}

	async get_all_revisions_for_task(
		taskHash: ActionHash,
	): Promise<Record[] | undefined> {
		const task = this.tasks.get(taskHash);
		return task ? task.revisions : undefined;
	}

	async get_original_task(taskHash: ActionHash): Promise<Record | undefined> {
		const task = this.tasks.get(taskHash);
		return task ? task.revisions[0] : undefined;
	}

	async get_all_deletes_for_task(
		taskHash: ActionHash,
	): Promise<Array<SignedActionHashed<Delete>> | undefined> {
		const task = this.tasks.get(taskHash);
		return task ? task.deletes : undefined;
	}

	async get_oldest_delete_for_task(
		taskHash: ActionHash,
	): Promise<SignedActionHashed<Delete> | undefined> {
		const task = this.tasks.get(taskHash);
		return task ? task.deletes[0] : undefined;
	}
	async delete_task(original_task_hash: ActionHash): Promise<ActionHash> {
		const record = await fakeRecord(await fakeDeleteEntry(original_task_hash));

		this.tasks
			.get(original_task_hash)
			.deletes.push(record.signed_action as SignedActionHashed<Delete>);

		return record.signed_action.hashed.hash;
	}

	async update_task(input: {
		original_task_hash: ActionHash;
		previous_task_hash: ActionHash;
		updated_task: Task;
	}): Promise<Record> {
		const record = await fakeRecord(
			await fakeUpdateEntry(
				input.previous_task_hash,
				undefined,
				undefined,
				fakeEntry(input.updated_task),
			),
			fakeEntry(input.updated_task),
		);

		this.tasks.get(input.original_task_hash).revisions.push(record);

		const task = input.updated_task;
		if (task.assignee) {
			const existingAssignee = this.tasksForAssignee.get(task.assignee) || [];
			this.tasksForAssignee.set(task.assignee, [
				...existingAssignee,
				{
					target: record.signed_action.hashed.hash,
					author: record.signed_action.hashed.content.author,
					timestamp: record.signed_action.hashed.content.timestamp,
					zome_index: 0,
					link_type: 0,
					tag: new Uint8Array(),
					create_link_hash: await fakeActionHash(),
				},
			]);
		}
		await Promise.all(
			task.dependencies.map(async dependencies => {
				const existingDependencies =
					this.tasksForTask.get(dependencies.original_revision_hash) || [];
				this.tasksForTask.set(dependencies.original_revision_hash, [
					...existingDependencies,
					{
						target: record.signed_action.hashed.hash,
						author: record.signed_action.hashed.content.author,
						timestamp: record.signed_action.hashed.content.timestamp,
						zome_index: 0,
						link_type: 0,
						tag: new Uint8Array(),
						create_link_hash: await fakeActionHash(),
					},
				]);
			}),
		);

		return record;
	}

	async get_tasks_for_assignee(assignee: AgentPubKey): Promise<Array<Link>> {
		return this.tasksForAssignee.get(assignee) || [];
	}

	async get_dependent_tasks_for_task(
		taskHash: ActionHash,
	): Promise<Array<Link>> {
		return this.tasksForTask.get(taskHash) || [];
	}

	async get_unfinished_tasks(): Promise<Array<Link>> {
		const records: Record[] = Array.from(this.tasks.values()).map(
			r => r.revisions[r.revisions.length - 1],
		);
		return Promise.all(
			records.map(async record => ({
				target: record.signed_action.hashed.hash,
				author: record.signed_action.hashed.content.author,
				timestamp: record.signed_action.hashed.content.timestamp,
				zome_index: 0,
				link_type: 0,
				tag: new Uint8Array(),
				create_link_hash: await fakeActionHash(),
			})),
		);
	}
}

export async function sampleTask(
	client: TasksClient,
	partialTask: Partial<Task> = {},
): Promise<Task> {
	return {
		...{
			original_create_hash: undefined,
			name: 'Lorem ipsum 2',
			description: 'Lorem ipsum 2',
			deadline: Date.now() * 1000,
			assignee: client.client.myPubKey,
			dependencies: [],
			status: 'Ready',
		},
		...partialTask,
	};
}
