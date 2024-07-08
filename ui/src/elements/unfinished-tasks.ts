import {
	hashProperty,
	sharedStyles,
	wrapPathInSvg,
} from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import { SignalWatcher } from '@holochain-open-dev/signals';
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
import './task-summary.js';

/**
 * @element unfinished-tasks
 */
@localized()
@customElement('unfinished-tasks')
export class UnfinishedTasks extends SignalWatcher(LitElement) {
	/**
	 * @internal
	 */
	@consume({ context: tasksStoreContext, subscribe: true })
	tasksStore!: TasksStore;

	renderList(hashes: Array<ActionHash>) {
		if (hashes.length === 0)
			return html` <div class="column center-content" style="gap: 16px;">
				<sl-icon
					.src=${wrapPathInSvg(mdiInformationOutline)}
					style="color: grey; height: 64px; width: 64px;"
				></sl-icon>
				<span class="placeholder">${msg('No tasks found')}</span>
			</div>`;

		return html`
			<div class="column" style="gap: 16px; flex: 1">
				${hashes.map(
					hash => html`<task-summary .taskHash=${hash}></task-summary>`,
				)}
			</div>
		`;
	}

	render() {
		const map = this.tasksStore.unfinishedTasks.get();

		switch (map.status) {
			case 'pending':
				return html`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the tasks')}
					.error=${map.error}
				></display-error>`;
			case 'completed':
				return this.renderList(Array.from(map.value.keys()));
		}
	}

	static styles = [sharedStyles];
}
