import { 
  SignedActionHashed,
  CreateLink,
  Link,
  DeleteLink,
  Delete,
  AppClient, 
  Record, 
  ActionHash, 
  EntryHash, 
  AgentPubKey,
} from '@holochain/client';
import { EntryRecord, ZomeClient } from '@holochain-open-dev/utils';

import { TasksSignal } from './types.js';

export class TasksClient extends ZomeClient<TasksSignal> {

  constructor(public client: AppClient, public roleName: string, public zomeName = 'tasks') {
    super(client, roleName, zomeName);
  }
}
