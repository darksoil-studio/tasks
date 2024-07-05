import { Signal } from '@holochain-open-dev/signals';

// NOTE: This scheduling logic is too basic to be useful. Do not copy/paste.
// This function would usually live in a library/framework, not application code
let pending = false;

let w = new Signal.subtle.Watcher(() => {
	if (!pending) {
		pending = true;
		queueMicrotask(() => {
			pending = false;
			for (let s of w.getPending()) s.get();
			w.watch();
		});
	}
});

// TODO: why do we need to use this complicated effect method?
// An effect effect Signal which evaluates to cb, which schedules a read of
// itself on the microtask queue whenever one of its dependencies might change
export function effect(cb: any) {
	let destructor: any;
	let c = new Signal.Computed(() => {
		if (typeof destructor === 'function') {
			destructor();
		}
		destructor = cb();
	});
	w.watch(c);
	c.get();
	return () => {
		if (typeof destructor === 'function') {
			destructor();
		}
		w.unwatch(c);
	};
}

const pause = (ms: number) =>
	new Promise(resolve => setTimeout(() => resolve(undefined), ms));

export async function waitUntil(
	condition: () => Promise<boolean>,
	timeout: number,
) {
	const start = Date.now();
	const isDone = await condition();
	if (isDone) return;
	if (timeout <= 0) throw new Error('timeout');
	await pause(1000);
	return waitUntil(condition, timeout - (Date.now() - start));
}
