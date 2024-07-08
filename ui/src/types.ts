import { ActionCommittedSignal } from '@holochain-open-dev/utils';
import { ActionHash, AgentPubKey } from '@holochain/client';

export type TasksSignal = ActionCommittedSignal<EntryTypes, LinkTypes>;

export type EntryTypes = { type: 'Task' } & Task;

export type LinkTypes = 'AssigneeToTasks' | 'Dependency' | 'TaskUpdates';

export type TaskStatus =
	| 'Ready'
	| 'Blocked'
	| 'InProgress'
	| 'Done'
	| 'Cancelled';

export interface TaskDependency {
	original_revision_hash: ActionHash;
	last_revision_hash: ActionHash;
	status: TaskStatus;
	optional: boolean;
}

export interface Task {
	original_create_hash: ActionHash | undefined;

	name: string;

	description: string;

	deadline: number | undefined;

	assignee: AgentPubKey | undefined;

	dependencies: Array<TaskDependency>;

	status: TaskStatus;
}
