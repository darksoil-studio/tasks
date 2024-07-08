import { NotificationType } from '@darksoil-studio/notifications';
import { wrapPathInSvg } from '@holochain-open-dev/elements/dist/icon.js';
import { AsyncState, mapCompleted } from '@holochain-open-dev/signals';
import { ActionHash, decodeHashFromBase64 } from '@holochain/client';
import { msg } from '@lit/localize';
import {
	mdiAccountAlert,
	mdiAccountPlus,
	mdiAccountRemove,
	mdiFormatListChecks,
} from '@mdi/js';

import { TasksStore } from './tasks-store';

export const NOTIFICATIONS_TYPES = {
	TASK_UNBLOCKED: 'tasks/task_unblocked',
	TASK_ASSIGNED_TO_YOU: 'tasks/task_assigned_to_you',
	TASK_UNASSIGNED_TO_YOU: 'tasks/task_unassigned_to_you',
	DEPENDENCY_FOR_YOUR_TASK_WAS_CANCELLED:
		'tasks/dependency_for_your_task_was_cancelled',
	ASSIGNEE_REMOVED_FROM_YOUR_DEPENDENCIES:
		'tasks/assignee_removed_from_your_dependencies',
} as const;

export type TasksNotificationsTypes =
	(typeof NOTIFICATIONS_TYPES)[keyof typeof NOTIFICATIONS_TYPES];

export type TasksNotificationClickHandlers = {
	[key in TasksNotificationsTypes]: (taskHash: ActionHash) => void;
};

export function notificationsTypes(
	tasksStore: TasksStore,
	onClickHandlers?: TasksNotificationClickHandlers,
): Record<TasksNotificationsTypes, NotificationType> {
	const title = (notificationGroup: string) => {
		const taskHash = decodeHashFromBase64(notificationGroup);
		return mapCompleted(
			tasksStore.tasks.get(taskHash).latestVersion,
			task => task.entry.name,
		);
	};
	return {
		[NOTIFICATIONS_TYPES.TASK_UNBLOCKED]: {
			name: msg('One of your tasks was unblocked'),
			description: msg(
				'All the dependencies of one of your tasks are done, so your task is ready to be done.',
			),
			title,
			contents(notification) {
				return new AsyncState({
					status: 'completed',
					value: {
						body: msg('The task has been unblocked.'),
						iconSrc: wrapPathInSvg(mdiFormatListChecks),
					},
				});
			},
			onClick(notificationGroup) {
				if (!onClickHandlers) return;
				const taskHash = decodeHashFromBase64(notificationGroup);
				return onClickHandlers[NOTIFICATIONS_TYPES.TASK_UNBLOCKED](taskHash);
			},
		},
		[NOTIFICATIONS_TYPES.TASK_ASSIGNED_TO_YOU]: {
			name: msg('A task was assigned to you'),
			description: msg('Another person assigned this task to you'),
			title,
			contents(notification) {
				return new AsyncState({
					status: 'completed',
					value: {
						body: msg('A task was assigned to you.'),
						iconSrc: wrapPathInSvg(mdiAccountPlus),
					},
				});
			},
			onClick(notificationGroup) {
				if (!onClickHandlers) return;
				const taskHash = decodeHashFromBase64(notificationGroup);
				return onClickHandlers[NOTIFICATIONS_TYPES.TASK_ASSIGNED_TO_YOU](
					taskHash,
				);
			},
		},
		[NOTIFICATIONS_TYPES.TASK_UNASSIGNED_TO_YOU]: {
			name: msg('You were unassigned from one of your tasks'),
			description: msg('Another person unassigned you from one of your tasks'),
			title,
			contents(notification) {
				return new AsyncState({
					status: 'completed',
					value: {
						body: msg('You were unassigned from one of your tasks.'),
						iconSrc: wrapPathInSvg(mdiAccountRemove),
					},
				});
			},
			onClick(notificationGroup) {
				if (!onClickHandlers) return;
				const taskHash = decodeHashFromBase64(notificationGroup);
				return onClickHandlers[NOTIFICATIONS_TYPES.TASK_UNASSIGNED_TO_YOU](
					taskHash,
				);
			},
		},
		[NOTIFICATIONS_TYPES.ASSIGNEE_REMOVED_FROM_YOUR_DEPENDENCIES]: {
			name: msg('A task that you depend on had its assignee removed'),
			description: msg(
				'Now one of your tasks depends on a task that has no assignee.',
			),
			title,
			contents(notification) {
				return new AsyncState({
					status: 'completed',
					value: {
						body: msg('A task that you depend on had its assignee removed.'),
						iconSrc: wrapPathInSvg(mdiAccountAlert),
					},
				});
			},
			onClick(notificationGroup) {
				if (!onClickHandlers) return;
				const taskHash = decodeHashFromBase64(notificationGroup);
				return onClickHandlers[
					NOTIFICATIONS_TYPES.ASSIGNEE_REMOVED_FROM_YOUR_DEPENDENCIES
				](taskHash);
			},
		},
		[NOTIFICATIONS_TYPES.DEPENDENCY_FOR_YOUR_TASK_WAS_CANCELLED]: {
			name: msg('A task that you depend on was cancelled'),
			description: msg(
				'Now one of your tasks depends on a task that is cancelled.',
			),
			title,
			contents(notification) {
				return new AsyncState({
					status: 'completed',
					value: {
						body: msg('A task that you depend on was cancelled.'),
						iconSrc: wrapPathInSvg(mdiAccountAlert),
					},
				});
			},
			onClick(notificationGroup) {
				if (!onClickHandlers) return;
				const taskHash = decodeHashFromBase64(notificationGroup);
				return onClickHandlers[
					NOTIFICATIONS_TYPES.DEPENDENCY_FOR_YOUR_TASK_WAS_CANCELLED
				](taskHash);
			},
		},
	};
}
