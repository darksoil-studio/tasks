import { hashProperty, sharedStyles } from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import '@holochain-open-dev/profiles/dist/elements/agent-avatar.js';
import { SignalWatcher } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
import { ActionHash, EntryHash, Record } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/format-date/format-date.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { tasksStoreContext } from '../context.js';
import { TasksStore } from '../tasks-store.js';
import { Task, TaskStatus } from '../types.js';

/**
 * @element task-summary
 * @fires task-selected: detail will contain { taskHash }
 */
@localized()
@customElement('task-summary')
export class TaskSummary extends SignalWatcher(LitElement) {
	/**
	 * REQUIRED. The hash of the Task to show
	 */
	@property(hashProperty('task-hash'))
	taskHash!: ActionHash;

	/**
	 * @internal
	 */
	@consume({ context: tasksStoreContext, subscribe: true })
	tasksStore!: TasksStore;

	renderSummary(entryRecord: EntryRecord<Task>) {
		return html`
			<div class="column" style="gap: 16px;">
				<div class="column" style="gap: 8px">
					<span><strong>${msg('Name')}</strong></span>
					<span style="white-space: pre-line">${entryRecord.entry.name}</span>
				</div>

				<div class="column" style="gap: 8px">
					<span><strong>${msg('Description')}</strong></span>
					<span style="white-space: pre-line"
						>${entryRecord.entry.description}</span
					>
				</div>

				<div class="column" style="gap: 8px">
					<span><strong>${msg('Deadline')}</strong></span>
					<span style="white-space: pre-line"
						>${entryRecord.entry.deadline
							? html`
									<sl-format-date
										.date=${new Date(entryRecord.entry.deadline / 1000)}
									></sl-format-date>
								`
							: html`<span>${msg('No deadline')}</span>`}
					</span>
				</div>

				<div class="column" style="gap: 8px">
					<span><strong>${msg('Assignee')}</strong></span>
					<span style="white-space: pre-line"
						><agent-avatar
							.agentPubKey=${entryRecord.entry.assignee}
						></agent-avatar
					></span>
				</div>

				<div class="column" style="gap: 8px">
					<span><strong>${msg('Status')}</strong></span>
					<span style="white-space: pre-line"
						>${entryRecord.entry.status === 'Ready'
							? msg('Ready')
							: entryRecord.entry.status === 'Blocked'
								? msg('Blocked')
								: entryRecord.entry.status === 'InProgress'
									? msg('In Progress')
									: entryRecord.entry.status === 'Done'
										? msg('Done')
										: msg('Cancelled')}</span
					>
				</div>
			</div>
		`;
	}

	renderTask() {
		const task = this.tasksStore.tasks.get(this.taskHash).latestVersion.get();

		switch (task.status) {
			case 'pending':
				return html`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the task')}
					.error=${task.error}
				></display-error>`;
			case 'completed':
				return this.renderSummary(task.value);
		}
	}

	render() {
		return html`<sl-card
			style="flex: 1; cursor: grab;"
			@click=${() =>
				this.dispatchEvent(
					new CustomEvent('task-selected', {
						composed: true,
						bubbles: true,
						detail: {
							taskHash: this.taskHash,
						},
					}),
				)}
		>
			${this.renderTask()}
		</sl-card>`;
	}

	static styles = [sharedStyles];
}
