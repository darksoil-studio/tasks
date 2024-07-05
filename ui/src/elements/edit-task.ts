import {
	hashProperty,
	hashState,
	notifyError,
	onSubmit,
	sharedStyles,
	wrapPathInSvg,
} from '@holochain-open-dev/elements';
import '@holochain-open-dev/profiles/dist/elements/search-agent.js';
import { SignalWatcher, toPromise } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
import { ActionHash, AgentPubKey, EntryHash, Record } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiAlertCircleOutline, mdiDelete } from '@mdi/js';
import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { tasksStoreContext } from '../context.js';
import { TasksStore } from '../tasks-store.js';
import { Task, TaskStatus } from '../types.js';

/**
 * @element edit-task
 * @fires task-updated: detail will contain { originalTaskHash, previousTaskHash, updatedTaskHash }
 */
@localized()
@customElement('edit-task')
export class EditTask extends SignalWatcher(LitElement) {
	/**
	 * REQUIRED. The hash of the original `Create` action for this Task
	 */
	@property(hashProperty('task-hash'))
	taskHash!: ActionHash;

	/**
	 * @internal
	 */
	@consume({ context: tasksStoreContext })
	tasksStore!: TasksStore;

	/**
	 * @internal
	 */
	@state()
	committing = false;

	async firstUpdated() {
		const currentRecord = await toPromise(
			this.tasksStore.tasks.get(this.taskHash).latestVersion,
		);
		setTimeout(() => {
			(this.shadowRoot?.getElementById('form') as HTMLFormElement).reset();
		});
	}

	async updateTask(currentRecord: EntryRecord<Task>, fields: Partial<Task>) {
		const task: Task = {
			original_create_hash: this.taskHash,
			name: fields.name!,
			description: fields.description!,
			deadline: new Date(fields.deadline!).valueOf() * 1000,
			assignee: fields.assignee!,
			dependencies: currentRecord.entry.dependencies!,
			status: fields.status!,
		};

		try {
			this.committing = true;
			const updateRecord = await this.tasksStore.client.updateTask(
				this.taskHash,
				currentRecord.actionHash,
				task,
			);

			this.dispatchEvent(
				new CustomEvent('task-updated', {
					composed: true,
					bubbles: true,
					detail: {
						originalTaskHash: this.taskHash,
						previousTaskHash: currentRecord.actionHash,
						updatedTaskHash: updateRecord.actionHash,
					},
				}),
			);
		} catch (e: unknown) {
			console.error(e);
			notifyError(msg('Error updating the task'));
		}

		this.committing = false;
	}

	renderEditForm(currentRecord: EntryRecord<Task>) {
		return html` <sl-card>
			<span slot="header">${msg('Edit Task')}</span>

			<form
				id="form"
				class="column"
				style="flex: 1; gap: 16px;"
				${onSubmit(fields => this.updateTask(currentRecord, fields))}
			>
				<sl-input
					name="name"
					.label=${msg('Name')}
					required
					.defaultValue=${currentRecord.entry.name}
				></sl-input>

				<sl-textarea
					name="description"
					.label=${msg('Description')}
					required
					.defaultValue=${currentRecord.entry.description}
				></sl-textarea>

				<sl-input
					name="deadline"
					.label=${msg('Deadline')}
					type="datetime-local"
					@click=${(e: Event) => e.preventDefault()}
					.defaultValue=${currentRecord.entry.deadline
						? new Date(currentRecord.entry.deadline / 1000).toLocaleString()
						: nothing}
				></sl-input>

				<search-agent
					name="assignee"
					.fieldLabel=${msg('Assignee')}
					required
					.defaultValue=${currentRecord.entry.assignee}
				></search-agent>

				<sl-select
					name="status"
					.label=${msg('Status')}
					required
					.defaultValue=${currentRecord.entry.status}
				>
					<sl-option value="Ready">${msg('Ready')}</sl-option>
					<sl-option value="Blocked">${msg('Blocked')}</sl-option>
					<sl-option value="InProgress">${msg('In Progress')}</sl-option>
					<sl-option value="Done">${msg('Done')}</sl-option>
					<sl-option value="Cancelled">${msg('Cancelled')}</sl-option>
				</sl-select>

				<div class="row" style="gap: 8px;">
					<sl-button
						@click=${() =>
							this.dispatchEvent(
								new CustomEvent('edit-canceled', {
									bubbles: true,
									composed: true,
								}),
							)}
						style="flex: 1;"
						>${msg('Cancel')}</sl-button
					>
					<sl-button
						type="submit"
						variant="primary"
						style="flex: 1;"
						.loading=${this.committing}
						>${msg('Save')}</sl-button
					>
				</div>
			</form>
		</sl-card>`;
	}

	render() {
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
				return this.renderEditForm(task.value);
		}
	}

	static styles = [sharedStyles];
}
