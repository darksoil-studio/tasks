import { createContext } from '@lit/context';
import { TasksStore } from './tasks-store.js';

export const tasksStoreContext = createContext<TasksStore>(
  'tasks/store'
);

