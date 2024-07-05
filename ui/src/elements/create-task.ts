import {
	hashProperty,
	hashState,
	notifyError,
	onSubmit,
	sharedStyles,
	wrapPathInSvg,
} from '@holochain-open-dev/elements';
import '@holochain-open-dev/elements/dist/elements/display-error.js';
import '@holochain-open-dev/profiles/dist/elements/search-agent.js';
import { SignalWatcher } from '@holochain-open-dev/signals';
import { EntryRecord } from '@holochain-open-dev/utils';
import {
	ActionHash,
	AgentPubKey,
	DnaHash,
	EntryHash,
	Record,
} from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiAlertCircleOutline, mdiDelete } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { tasksStoreContext } from '../context.js';
import { TasksStore } from '../tasks-store.js';
import { Task, TaskStatus } from '../types.js';

/**
 * @element create-task
 * @fires task-created: detail will contain { taskHash }
 */
@localized()
@customElement('create-task')
export class CreateTask extends SignalWatcher(LitElement) {
	/**
	 * @internal
	 */
	@consume({ context: tasksStoreContext, subscribe: true })
	tasksStore!: TasksStore;

	/**
	 * @internal
	 */
	@state()
	committing = false;

	/**
	 * @internal
	 */
	@query('#create-form')
	form!: HTMLFormElement;

	async createTask(fields: Partial<Task>) {
		const task: Task = {
			original_create_hash: undefined,
			name: fields.name!,
			description: fields.description!,
			deadline: new Date(fields.deadline!).valueOf() * 1000,
			assignee: fields.assignee!,
			dependencies: [], // TODO: here
			status: fields.status!,
		};

		try {
			this.committing = true;
			const record: EntryRecord<Task> =
				await this.tasksStore.client.createTask(task);

			this.dispatchEvent(
				new CustomEvent('task-created', {
					composed: true,
					bubbles: true,
					detail: {
						taskHash: record.actionHash,
					},
				}),
			);

			this.form.reset();
		} catch (e: unknown) {
			console.error(e);
			notifyError(msg('Error creating the task'));
		}
		this.committing = false;
	}

	render() {
		return html` <sl-card style="flex: 1;">
			<span slot="header">${msg('Create Task')}</span>

			<form
				id="create-form"
				class="column"
				style="flex: 1; gap: 16px;"
				${onSubmit(fields => this.createTask(fields))}
			>
				<sl-input name="name" .label=${msg('Name')} required></sl-input>
				<sl-textarea
					name="description"
					.label=${msg('Description')}
					required
				></sl-textarea>
				<sl-input
					name="deadline"
					.label=${msg('Deadline')}
					type="datetime-local"
					@click=${(e: Event) => e.preventDefault()}
				></sl-input>
				<search-agent
					name="assignee"
					.fieldLabel=${msg('Assignee')}
					required
				></search-agent>
				<sl-select name="status" .label=${msg('Status')} required>
					<sl-option value="Ready">${msg('Ready')}</sl-option>
					<sl-option value="Blocked">${msg('Blocked')}</sl-option>
					<sl-option value="InProgress">${msg('In Progress')}</sl-option>
					<sl-option value="Done">${msg('Done')}</sl-option>
					<sl-option value="Cancelled">${msg('Cancelled')}</sl-option>
				</sl-select>

				<sl-button variant="primary" type="submit" .loading=${this.committing}
					>${msg('Create Task')}</sl-button
				>
			</form>
		</sl-card>`;
	}

	static styles = [sharedStyles];
}
