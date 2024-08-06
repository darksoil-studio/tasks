import{s as m,c as u,r as c,h,l as y}from"./agent-avatar.DHVeJeSD.js";import{n as f,o as g}from"./chunk.7WLK7HSA.D0LMGQMn.js";import{t as v,m as t,x as d,n as $,g as k}from"./tasks-client.qAG7b6b9.js";import{S as b}from"./signal-watcher.DC_yjXfn.js";import"./chunk.DUWACTPH.C7rGf8ye.js";import{a as x,t as E}from"./property.QJJZFMkB.js";import{t as S}from"./context.CVKhpfoq.js";import"./tslib.es6.kHcLnhpD.js";import"./static.DYJOwAbU.js";var w=Object.defineProperty,D=Object.getOwnPropertyDescriptor,o=(e,s,r,n)=>{for(var a=n>1?void 0:n?D(s,r):s,l=e.length-1,p;l>=0;l--)(p=e[l])&&(a=(n?p(s,r,a):p(a))||a);return n&&a&&w(s,r,a),a};let i=class extends b(k){constructor(){super(...arguments),this.committing=!1}async firstUpdated(){await v(this.tasksStore.tasks.get(this.taskHash).latestVersion),setTimeout(()=>{var e;((e=this.shadowRoot)==null?void 0:e.getElementById("form")).reset()})}async updateTask(e,s){const r={original_create_hash:this.taskHash,name:s.name,description:s.description,deadline:new Date(s.deadline).valueOf()*1e3,assignee:s.assignee,dependencies:e.entry.dependencies,status:s.status};try{this.committing=!0,await this.tasksStore.client.updateTask(this.taskHash,e.actionHash,r),this.dispatchEvent(new CustomEvent("task-updated",{composed:!0,bubbles:!0}))}catch(n){console.error(n),f(t("Error updating the task"))}this.committing=!1}renderEditForm(e){return d` <sl-card>
			<span slot="header">${t("Edit Task")}</span>

			<form
				id="form"
				class="column"
				style="flex: 1; gap: 16px;"
				${g(s=>this.updateTask(e,s))}
			>
				<sl-input
					name="name"
					.label=${t("Name")}
					required
					.defaultValue=${e.entry.name}
				></sl-input>

				<sl-textarea
					name="description"
					.label=${t("Description")}
					required
					.defaultValue=${e.entry.description}
				></sl-textarea>

				<sl-input
					name="deadline"
					.label=${t("Deadline")}
					type="datetime-local"
					@click=${s=>s.preventDefault()}
					.defaultValue=${e.entry.deadline?new Date(e.entry.deadline/1e3).toLocaleString():$}
				></sl-input>

				<search-agent
					name="assignee"
					.fieldLabel=${t("Assignee")}
					.defaultValue=${e.entry.assignee}
				></search-agent>

				<sl-select
					name="status"
					.label=${t("Status")}
					required
					.defaultValue=${e.entry.status}
				>
					<sl-option value="Ready">${t("Ready")}</sl-option>
					<sl-option value="Blocked">${t("Blocked")}</sl-option>
					<sl-option value="InProgress">${t("In Progress")}</sl-option>
					<sl-option value="Done">${t("Done")}</sl-option>
					<sl-option value="Cancelled">${t("Cancelled")}</sl-option>
				</sl-select>

				<div class="row" style="gap: 8px;">
					<sl-button
						@click=${()=>this.dispatchEvent(new CustomEvent("edit-canceled",{bubbles:!0,composed:!0}))}
						style="flex: 1;"
						>${t("Cancel")}</sl-button
					>
					<sl-button
						type="submit"
						variant="primary"
						style="flex: 1;"
						.loading=${this.committing}
						>${t("Save")}</sl-button
					>
				</div>
			</form>
		</sl-card>`}render(){const e=this.tasksStore.tasks.get(this.taskHash).latestVersion.get();switch(e.status){case"pending":return d`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;case"error":return d`<display-error
					.headline=${t("Error fetching the task")}
					.error=${e.error}
				></display-error>`;case"completed":return this.renderEditForm(e.value)}}};i.styles=[m];o([x(h("task-hash"))],i.prototype,"taskHash",2);o([u({context:S})],i.prototype,"tasksStore",2);o([c()],i.prototype,"committing",2);i=o([y(),E("edit-task")],i);export{i as EditTask};
