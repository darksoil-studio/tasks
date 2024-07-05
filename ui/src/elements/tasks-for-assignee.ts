
import { LitElement, html } from 'lit';
import { state, customElement, property } from 'lit/decorators.js';
import { Record, EntryHash, ActionHash, AgentPubKey } from '@holochain/client';
import { AsyncComputed, SignalWatcher } from '@holochain-open-dev/signals';
import { EntryRecord, slice} from '@holochain-open-dev/utils';
import { hashProperty, sharedStyles, wrapPathInSvg } from '@holochain-open-dev/elements';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiInformationOutline } from '@mdi/js';

import '@holochain-open-dev/elements/dist/elements/display-error.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

import '@holochain-open-dev/profiles/dist/elements/agent-avatar.js';

import { TasksStore } from '../tasks-store.js';
import { tasksStoreContext } from '../context.js';
import { Task } from '../types.js';


/**
 * @element tasks-for-assignee
 */
@localized()
@customElement('tasks-for-assignee')
export class TasksForAssignee extends SignalWatcher(LitElement) {

  /**
   * REQUIRED. The Assignee for which the Tasks should be fetched
   */
  @property(hashProperty('assignee'))
  assignee!: AgentPubKey;

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
        <span class="placeholder">${msg("No tasks found for this assignee")}</span>
      </div>`;

    return html`
      <div style="display: flex; flex-direction: column">
        ${hashes.map(hash =>
          html`<task-summary .taskHash=${hash}></task-summary>`
        )}
      </div>
    `;
  }

  render() {
    const map = this.tasksStore.tasksForAssignee.get(this.assignee).live.get();

    switch (map.status) {
      case 'pending': 
        return html`<div
          style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
        >
          <sl-spinner style="font-size: 2rem;"></sl-spinner>
        </div>`;
      case 'error': 
        return html`<display-error
          .headline=${msg("Error fetching the tasks")}
          .error=${map.error}
        ></display-error>`;
      case 'completed':
        return this.renderList(Array.from(map.value.keys()));
    }
  }
  
  static styles = [sharedStyles];
}
