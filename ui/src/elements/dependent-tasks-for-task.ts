import {
	hashProperty,
	sharedStyles,
	wrapPathInSvg,
} from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import { AsyncComputed, SignalWatcher } from '@holochain-open-dev/signals';
import { EntryRecord, slice } from '@holochain-open-dev/utils';
import { ActionHash, AgentPubKey, EntryHash, Record } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiInformationOutline } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { tasksStoreContext } from '../context.js';
import { TasksStore } from '../tasks-store.js';
import { Task } from '../types.js';
import './task-summary.js';

/**
 * @element dependent-tasks-for-task
 */
@localized()
@customElement('dependent-tasks-for-task')
export class DependentTasksForTask extends SignalWatcher(LitElement) {
	/**
	 * REQUIRED. The TaskHash for which the Tasks should be fetched
	 */
	@property(hashProperty('task-hash'))
	taskHash!: ActionHash;

	/**
	 * @internal
	 */
	@consume({ context: tasksStoreContext, subscribe: true })
	tasksStore!: TasksStore;

	renderList(hashes: Array<ActionHash>) {
		if (hashes.length === 0)
			return html` <div class="column center-content" style="gap: 16px;">
				<sl-icon
					style="color: grey; height: 64px; width: 64px;"
					.src=${wrapPathInSvg(mdiInformationOutline)}
				></sl-icon>
				<span class="placeholder">${msg('No tasks found for this task')}</span>
			</div>`;

		return html`
			<div style="display: flex; flex-direction: column">
				${hashes.map(
					hash => html`<task-summary .taskHash=${hash}></task-summary>`,
				)}
			</div>
		`;
	}

	render() {
		const hashes = this.tasksStore.tasks
			.get(this.taskHash)
			.dependentTasks.live.get();

		switch (hashes.status) {
			case 'pending':
				return html`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the tasks')}
					.error=${hashes.error}
				></display-error>`;
			case 'completed':
				return this.renderList(hashes.value);
		}
	}

	static styles = [sharedStyles];
}
