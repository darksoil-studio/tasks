import { css, html, LitElement } from 'lit';
import { provide } from '@lit/context';
import { customElement, property } from 'lit/decorators.js';

import { tasksStoreContext } from '../context.js';
import { TasksStore } from '../tasks-store.js';

@customElement('tasks-context')
export class TasksContext extends LitElement {
  @provide({ context: tasksStoreContext })
  @property({ type: Object })
  store!: TasksStore;

  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      display: contents;
    }
  `;
}
