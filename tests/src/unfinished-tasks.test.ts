import { assert, test } from "vitest";

import { runScenario, dhtSync } from '@holochain/tryorama';
import { ActionHash, Record, EntryHash } from '@holochain/client';
import { decode } from '@msgpack/msgpack';
import { EntryRecord } from '@holochain-open-dev/utils';
import { toPromise } from '@holochain-open-dev/signals';

import { Task } from '../../ui/src/types.js';
import { sampleTask } from '../../ui/src/mocks.js';
import { setup } from './setup.js';

test('create a Task and get unfinished tasks', async () => {
  await runScenario(async scenario => {
    const { alice, bob } = await setup(scenario);

    // Bob gets unfinished tasks
    let collectionOutput = await toPromise(bob.store.unfinishedTasks);
    assert.equal(collectionOutput.size, 0);

    // Alice creates a Task
    const task: EntryRecord<Task> = await alice.store.client.createTask(await sampleTask(alice.store.client));
    assert.ok(task);
    
    await dhtSync(
      [alice.player, bob.player],
      alice.player.cells[0].cell_id[0]
    );
    
    // Bob gets unfinished tasks again
    collectionOutput = await toPromise(bob.store.unfinishedTasks);
    assert.equal(collectionOutput.size, 1);
    assert.deepEqual(task.actionHash, Array.from(collectionOutput.keys())[0]);    
  });
});

