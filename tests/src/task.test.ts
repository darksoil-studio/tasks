import { toPromise } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
import { cleanNodeDecoding } from '@holochain-open-dev/utils/dist/clean-node-decoding.js';
import {
	ActionHash,
	Delete,
	Record,
	SignedActionHashed,
} from '@holochain/client';
import { dhtSync, runScenario } from '@holochain/tryorama';
import { decode } from '@msgpack/msgpack';
import { assert, test } from 'vitest';

import { sampleTask } from '../../ui/src/mocks.js';
import { Task } from '../../ui/src/types.js';
import { setup } from './setup.js';

test('create Task', async () => {
	await runScenario(async scenario => {
		const { alice, bob } = await setup(scenario);

		// Alice creates a Task
		const task: EntryRecord<Task> = await alice.store.client.createTask(
			await sampleTask(alice.store.client),
		);
		assert.ok(task);
	});
});

test('create and read Task', async () => {
	await runScenario(async scenario => {
		const { alice, bob } = await setup(scenario);

		const sample = await sampleTask(alice.store.client);

		// Alice creates a Task
		const task: EntryRecord<Task> = await alice.store.client.createTask(sample);
		assert.ok(task);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		// Bob gets the created Task
		const createReadOutput: EntryRecord<Task> = await toPromise(
			bob.store.tasks.get(task.actionHash).original,
		);
		assert.deepEqual(sample, cleanNodeDecoding(createReadOutput.entry));
	});
});

test('create and delete Task', async () => {
	await runScenario(async scenario => {
		const { alice, bob } = await setup(scenario);

		// Alice creates a Task
		const task: EntryRecord<Task> = await alice.store.client.createTask(
			await sampleTask(alice.store.client),
		);
		assert.ok(task);

		// Alice deletes the Task
		const deleteActionHash = await alice.store.client.deleteTask(
			task.actionHash,
		);
		assert.ok(deleteActionHash);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		// Bob tries to get the deleted Task
		const deletes: Array<SignedActionHashed<Delete>> = await toPromise(
			bob.store.tasks.get(task.actionHash).deletes,
		);
		assert.equal(deletes.length, 1);
	});
});
