import{s as m,c as d,h,l as f}from"./agent-avatar.DHVeJeSD.js";import{x as r,w as u,m as c,g as y,h as v}from"./tasks-client.qAG7b6b9.js";import{S as g}from"./signal-watcher.DC_yjXfn.js";import"./chunk.C2LF7HHG.DYJ60H94.js";import{a as k,t as x}from"./property.QJJZFMkB.js";import{t as S}from"./context.CVKhpfoq.js";import"./task-summary.BEiASs-o.js";import"./tslib.es6.kHcLnhpD.js";import"./chunk.BUIP557I.v6fbXhoA.js";import"./chunk.DUWACTPH.C7rGf8ye.js";import"./static.DYJOwAbU.js";var w=Object.defineProperty,P=Object.getOwnPropertyDescriptor,p=(s,t,n,o)=>{for(var e=o>1?void 0:o?P(t,n):t,i=s.length-1,l;i>=0;i--)(l=s[i])&&(e=(o?l(t,n,e):l(e))||e);return o&&e&&w(t,n,e),e};let a=class extends g(y){renderList(s){return s.length===0?r` <div class="column center-content" style="gap: 16px;">
				<sl-icon
					style="color: grey; height: 64px; width: 64px;"
					.src=${u(v)}
				></sl-icon>
				<span class="placeholder">${c("No tasks found for this task")}</span>
			</div>`:r`
			<div style="display: flex; flex-direction: column">
				${s.map(t=>r`<task-summary .taskHash=${t}></task-summary>`)}
			</div>
		`}render(){const s=this.tasksStore.tasks.get(this.taskHash).dependentTasks.live.get();switch(s.status){case"pending":return r`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;case"error":return r`<display-error
					.headline=${c("Error fetching the tasks")}
					.error=${s.error}
				></display-error>`;case"completed":return this.renderList(s.value)}}};a.styles=[m];p([k(h("task-hash"))],a.prototype,"taskHash",2);p([d({context:S,subscribe:!0})],a.prototype,"tasksStore",2);a=p([f(),x("dependent-tasks-for-task")],a);export{a as DependentTasksForTask};
