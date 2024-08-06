import{s as m,c as f,h as d,l as g}from"./agent-avatar.DHVeJeSD.js";import{x as t,w as h,m as c,g as y,h as u}from"./tasks-client.qAG7b6b9.js";import{S as v}from"./signal-watcher.DC_yjXfn.js";import"./chunk.C2LF7HHG.DYJ60H94.js";import{a as x,t as k}from"./property.QJJZFMkB.js";import{t as S}from"./context.CVKhpfoq.js";import"./tslib.es6.kHcLnhpD.js";var w=Object.defineProperty,P=Object.getOwnPropertyDescriptor,p=(e,r,o,i)=>{for(var s=i>1?void 0:i?P(r,o):r,n=e.length-1,l;n>=0;n--)(l=e[n])&&(s=(i?l(r,o,s):l(s))||s);return i&&s&&w(r,o,s),s};let a=class extends v(y){renderList(e){return e.length===0?t` <div class="column center-content" style="gap: 16px;">
				<sl-icon
					style="color: grey; height: 64px; width: 64px;"
					.src=${h(u)}
				></sl-icon>
				<span class="placeholder"
					>${c("No tasks found for this assignee")}</span
				>
			</div>`:t`
			<div style="display: flex; flex-direction: column">
				${e.map(r=>t`<task-summary .taskHash=${r}></task-summary>`)}
			</div>
		`}render(){const e=this.tasksStore.tasksForAssignee.get(this.assignee).live.get();switch(e.status){case"pending":return t`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;case"error":return t`<display-error
					.headline=${c("Error fetching the tasks")}
					.error=${e.error}
				></display-error>`;case"completed":return this.renderList(Array.from(e.value.keys()))}}};a.styles=[m];p([x(d("assignee"))],a.prototype,"assignee",2);p([f({context:S,subscribe:!0})],a.prototype,"tasksStore",2);a=p([g(),k("tasks-for-assignee")],a);export{a as TasksForAssignee};
