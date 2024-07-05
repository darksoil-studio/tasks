import { 
  Record, 
  ActionHash, 
  DnaHash,
  SignedActionHashed,
  EntryHash, 
  AgentPubKey,
  Create,
  Update,
  Delete,
  CreateLink,
  DeleteLink
} from '@holochain/client';
import { ActionCommittedSignal } from '@holochain-open-dev/utils';

export type TasksSignal = ActionCommittedSignal<EntryTypes, LinkTypes>;

export type EntryTypes =
 | ({  type: 'Task'; } & Task);

export type LinkTypes = string;


export interface TaskStatus {
  type:  
    | 'Ready'
        | 'Blocked'
        | 'InProgress'
        | 'Done'
        | 'Cancelled'
    ;
}

export interface Task { 
  name: string;

  description: string;

  deadline: number | undefined;

  assignee: AgentPubKey;

  dependencies: Array<ActionHash>;

  status: TaskStatus;
}

