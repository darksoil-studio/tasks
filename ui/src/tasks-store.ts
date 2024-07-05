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

export class TasksStore {
	constructor(
		public client: TasksClient,
		public notificationsStore: NotificationsStore,
	) {}
}
