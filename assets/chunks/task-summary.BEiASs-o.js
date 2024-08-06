import{s as y,c as d,h as f,l as u}from"./agent-avatar.DHVeJeSD.js";import{x as a,m as s,g as c}from"./tasks-client.qAG7b6b9.js";import{S as g}from"./signal-watcher.DC_yjXfn.js";import"./chunk.BUIP557I.v6fbXhoA.js";import"./chunk.C2LF7HHG.DYJ60H94.js";import{a as h}from"./chunk.DUWACTPH.C7rGf8ye.js";import{a as v,t as x}from"./property.QJJZFMkB.js";import{t as S}from"./context.CVKhpfoq.js";import"./tslib.es6.kHcLnhpD.js";import"./static.DYJOwAbU.js";h.define("sl-tag");var k=Object.defineProperty,P=Object.getOwnPropertyDescriptor,m=(e,n,i,l)=>{for(var t=l>1?void 0:l?P(n,i):n,o=e.length-1,p;o>=0;o--)(p=e[o])&&(t=(l?p(n,i,t):p(t))||t);return l&&t&&k(n,i,t),t};let r=class extends g(c){renderSummary(e){return a`
			<div class="row" style="gap: 16px; align-items: center">
				<span style="white-space: pre-line">${e.entry.name}</span>

				${e.entry.deadline?a`
							<sl-format-date
								.date=${new Date(e.entry.deadline/1e3)}
							></sl-format-date>
						`:a``}

				<agent-avatar .agentPubKey=${e.entry.assignee}></agent-avatar>

				<span style="flex: 1"></span>

				<sl-tag style="white-space: pre-line"
					>${e.entry.status==="Ready"?s("Ready"):e.entry.status==="Blocked"?s("Blocked"):e.entry.status==="InProgress"?s("In Progress"):e.entry.status==="Done"?s("Done"):s("Cancelled")}</sl-tag
				>
			</div>
		`}render(){const e=this.tasksStore.tasks.get(this.taskHash).latestVersion.get();switch(e.status){case"pending":return a`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;case"error":return a`<display-error
					.headline=${s("Error fetching the task")}
					.error=${e.error}
				></display-error>`;case"completed":return this.renderSummary(e.value)}}};r.styles=[y];m([v(f("task-hash"))],r.prototype,"taskHash",2);m([d({context:S,subscribe:!0})],r.prototype,"tasksStore",2);r=m([u(),x("task-summary")],r);export{r as TaskSummary};
