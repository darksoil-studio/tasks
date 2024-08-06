import{s as c,c as d,l as f}from"./agent-avatar.DHVeJeSD.js";import{x as t,w as u,m as p,g as h,h as y}from"./tasks-client.qAG7b6b9.js";import{S as v}from"./signal-watcher.DC_yjXfn.js";import"./chunk.C2LF7HHG.DYJ60H94.js";import{t as g}from"./property.QJJZFMkB.js";import{t as x}from"./context.CVKhpfoq.js";import"./task-summary.BEiASs-o.js";import"./tslib.es6.kHcLnhpD.js";import"./chunk.BUIP557I.v6fbXhoA.js";import"./chunk.DUWACTPH.C7rGf8ye.js";import"./static.DYJOwAbU.js";var k=Object.defineProperty,S=Object.getOwnPropertyDescriptor,m=(r,s,o,i)=>{for(var e=i>1?void 0:i?S(s,o):s,a=r.length-1,l;a>=0;a--)(l=r[a])&&(e=(i?l(s,o,e):l(e))||e);return i&&e&&k(s,o,e),e};let n=class extends v(h){renderList(r){return r.length===0?t` <div class="column center-content" style="gap: 16px;">
				<sl-icon
					.src=${u(y)}
					style="color: grey; height: 64px; width: 64px;"
				></sl-icon>
				<span class="placeholder">${p("No tasks found")}</span>
			</div>`:t`
			<div class="column" style="gap: 16px; flex: 1">
				${r.map(s=>t`<task-summary .taskHash=${s}></task-summary>`)}
			</div>
		`}render(){const r=this.tasksStore.unfinishedTasks.get();switch(r.status){case"pending":return t`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;case"error":return t`<display-error
					.headline=${p("Error fetching the tasks")}
					.error=${r.error}
				></display-error>`;case"completed":return this.renderList(Array.from(r.value.keys()))}}};n.styles=[c];m([d({context:x,subscribe:!0})],n.prototype,"tasksStore",2);n=m([f(),g("unfinished-tasks")],n);export{n as UnfinishedTasks};
