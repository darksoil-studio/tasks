import { toPromise } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
import { cleanNodeDecoding } from '@holochain-open-dev/utils/dist/clean-node-decoding.js';
import {
	ActionHash,
	Delete,
	Record,
	SignedActionHashed,
	encodeHashToBase64,
} from '@holochain/client';
import { dhtSync, pause, runScenario } from '@holochain/tryorama';
import { decode } from '@msgpack/msgpack';
import { assert, expect, test } from 'vitest';

import { sampleTask } from '../../ui/src/mocks.js';
import { Task } from '../../ui/src/types.js';
import { waitUntil } from '../../ui/src/utils.js';
import { setup } from './setup.js';

test('create and update Task', async () => {
	await runScenario(async scenario => {
		const { alice, bob } = await setup(scenario);

		// Alice creates a Task
		const dependency: EntryRecord<Task> = await alice.store.client.createTask(
			await sampleTask(alice.store.client),
		);
		assert.ok(dependency);
		const originalDependencyActionHash = dependency.actionHash;

		// Bob creates a dependent Task
		const dependent: EntryRecord<Task> = await alice.store.client.createTask(
			await sampleTask(alice.store.client, {
				status: 'Blocked',
				dependencies: [
					{
						original_revision_hash: dependency.actionHash,
						last_revision_hash: dependency.actionHash,
						optional: false,
						status: 'Ready',
					},
				],
			}),
		);
		const originalDependentActionHash = dependent.actionHash;
		assert.ok(dependency);

		const dependentTasks = await toPromise(
			alice.store.tasks.get(dependency.actionHash).dependentTasks.live,
		);
		assert.equal(dependentTasks.length, 1);
		assert.equal(
			encodeHashToBase64(dependentTasks[0]),
			encodeHashToBase64(dependent.actionHash),
		);

		// Task is not ready: it's blocked by its dependency
		await expect(async () =>
			bob.store.client.updateTask(
				originalDependentActionHash,
				dependent.actionHash,
				{
					...dependent.entry,
					original_create_hash: originalDependentActionHash,
					status: 'Ready',
				},
			),
		).rejects.toThrowError();

		await alice.store.client.updateTask(
			originalDependencyActionHash,
			dependency.actionHash,
			{
				...dependency.entry,
				original_create_hash: originalDependencyActionHash,
				status: 'Done',
			},
		);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		// await bob.store.client.updateTask(
		// 	originalDependentActionHash,
		// 	dependent.actionHash,
		// 	{
		// 		...dependent.entry,
		// 		dependencies: [
		// 			{
		// 				original_revision_hash: dependency.actionHash,
		// 				last_revision_hash: updatedDependency.actionHash,
		// 				optional: false,
		// 				status: 'Done',
		// 			},
		// 		],
		// 		status: 'Ready',
		// 	},
		// );

		// Task status should be automatically updated by the store
		await waitUntil(
			async () =>
				(
					await toPromise(
						bob.store.tasks.get(dependent.actionHash).latestVersion,
					)
				).entry.status === 'Ready',
			30_000,
		);
	});
});
