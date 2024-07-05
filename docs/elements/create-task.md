# `<create-task>`

## Usage

0. If you haven't already, [go through the setup for the module](/setup).

1. Import the `<create-task>` element somewhere in the javascript side of your web-app like this:

```js
import '@holochain-open-dev/tasks/dist/elements/create-task.js'
```

2. Use it in the html side of your web-app like this:


::: code-group
```html [Lit]
<create-task 
  .dependencies=${[dependencies]}
>
</create-task>
```

```html [React]
<create-task
  dependencies={[dependencies]}
>
</create-task>
```

```html [Angular]
<create-task
  [dependencies]="[dependencies]"
>
</create-task>
```

```html [Vue]
<create-task
  :dependencies="[dependencies]"
>
</create-task>
```

```html [Svelte]
<create-task
  dependencies={[encodeHashToBase64(dependencies)]}
>
</create-task>
```
:::

> [!WARNING]
> Like all the elements in this module, `<create-task>` needs to be placed inside an initialized `<tasks-context>`.

## Demo

Here is an interactive demo of the element:

<element-demo>
</element-demo>

<script setup>
import { onMounted } from "vue";
import { ProfilesClient, ProfilesStore } from '@holochain-open-dev/profiles';
import { demoProfiles, ProfilesZomeMock } from '@holochain-open-dev/profiles/dist/mocks.js';
import { decodeHashFromBase64 } from '@holochain/client';
import { render, html } from "lit";

import { TasksZomeMock, sampleTask } from "../../ui/src/mocks.ts";
import { TasksStore } from "../../ui/src/tasks-store.ts";
import { TasksClient } from "../../ui/src/tasks-client.ts";

onMounted(async () => {
  // Elements need to be imported on the client side, not the SSR side
  // Reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  await import('@api-viewer/docs/lib/api-docs.js');
  await import('@api-viewer/demo/lib/api-demo.js');
  await import('@holochain-open-dev/profiles/dist/elements/profiles-context.js');
  if (!customElements.get('tasks-context')) await import('../../ui/src/elements/tasks-context.ts');
  if (!customElements.get('create-task')) await import('../../ui/src/elements/create-task.ts');

  const profiles = await demoProfiles();

  const profilesMock = new ProfilesZomeMock(
    profiles,
    Array.from(profiles.keys())[0]
  );
  const profilesStore = new ProfilesStore(new ProfilesClient(profilesMock, "tasks_test"));

  const mock = new TasksZomeMock();
  const client = new TasksClient(mock, "tasks_test");

  const task = await sampleTask(client);

  const record = await mock.create_task(task);

  const store = new TasksStore(client);
  
  render(html`
    <profiles-context .store=${profilesStore}>
      <tasks-context .store=${store}>
        <api-demo src="custom-elements.json" only="create-task" exclude-knobs="store">
        </api-demo>
      </tasks-context>
    </profiles-context>
  `, document.querySelector('element-demo'))
  })


</script>

## API Reference

`<create-task>` is a [custom element](https://web.dev/articles/custom-elements-v1), which means that it can be used in any web app or website. Here is the reference for its API:

<api-docs src="custom-elements.json" only="create-task">
</api-docs>
