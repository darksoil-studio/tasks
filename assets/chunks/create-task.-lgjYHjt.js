import{s as m,c as p,r as d,e as u,l as f}from"./agent-avatar.DHVeJeSD.js";import{n as h,o as g}from"./chunk.7WLK7HSA.D0LMGQMn.js";import{m as s,x as b,g as y}from"./tasks-client.qAG7b6b9.js";import{S as v}from"./signal-watcher.DC_yjXfn.js";import"./chunk.DUWACTPH.C7rGf8ye.js";import{t as k}from"./property.QJJZFMkB.js";import{t as x}from"./context.CVKhpfoq.js";import"./tslib.es6.kHcLnhpD.js";import"./static.DYJOwAbU.js";var $=Object.defineProperty,_=Object.getOwnPropertyDescriptor,n=(e,o,i,t)=>{for(var a=t>1?void 0:t?_(o,i):o,c=e.length-1,l;c>=0;c--)(l=e[c])&&(a=(t?l(o,i,a):l(a))||a);return t&&a&&$(o,i,a),a};let r=class extends v(y){constructor(){super(...arguments),this.committing=!1}async createTask(e){const i={original_create_hash:void 0,name:e.name,description:e.description,deadline:e.deadline?new Date(e.deadline).valueOf()*1e3:void 0,assignee:e.assignee,dependencies:[],status:"Ready"};try{this.committing=!0;const t=await this.tasksStore.client.createTask(i);this.dispatchEvent(new CustomEvent("task-created",{composed:!0,bubbles:!0,detail:{taskHash:t.actionHash}})),this.form.reset()}catch(t){console.error(t),h(s("Error creating the task"))}this.committing=!1}render(){return b` <sl-card style="flex: 1;">
			<span slot="header">${s("Create Task")}</span>

			<form
				id="create-form"
				class="column"
				style="flex: 1; gap: 16px;"
				${g(e=>this.createTask(e))}
			>
				<sl-input name="name" .label=${s("Name")} required></sl-input>
				<sl-textarea
					name="description"
					.label=${s("Description")}
					required
				></sl-textarea>
				<sl-input
					name="deadline"
					.label=${s("Deadline")}
					type="datetime-local"
					@click=${e=>e.preventDefault()}
				></sl-input>
				<search-agent
					name="assignee"
					.fieldLabel=${s("Assignee")}
				></search-agent>

				<sl-button variant="primary" type="submit" .loading=${this.committing}
					>${s("Create Task")}</sl-button
				>
			</form>
		</sl-card>`}};r.styles=[m];n([p({context:x,subscribe:!0})],r.prototype,"tasksStore",2);n([d()],r.prototype,"committing",2);n([u("#create-form")],r.prototype,"form",2);r=n([f(),k("create-task")],r);export{r as CreateTask};
