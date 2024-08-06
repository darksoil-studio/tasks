import{s as h,c as g,r as m,h as u,l as y}from"./agent-avatar.DHVeJeSD.js";import{m as t,x as a,w as c,g as f,k as v,l as k}from"./tasks-client.qAG7b6b9.js";import{n as $}from"./chunk.7WLK7HSA.D0LMGQMn.js";import{S as x}from"./signal-watcher.DC_yjXfn.js";import"./chunk.DUWACTPH.C7rGf8ye.js";import"./chunk.BUIP557I.v6fbXhoA.js";import"./chunk.C2LF7HHG.DYJ60H94.js";import{a as w,t as b}from"./property.QJJZFMkB.js";import{t as _}from"./context.CVKhpfoq.js";import"./edit-task.Oje3jIiE.js";import"./tslib.es6.kHcLnhpD.js";import"./static.DYJOwAbU.js";var D=Object.defineProperty,P=Object.getOwnPropertyDescriptor,l=(s,r,o,i)=>{for(var e=i>1?void 0:i?P(r,o):r,p=s.length-1,d;p>=0;p--)(d=s[p])&&(e=(i?d(r,o,e):d(e))||e);return i&&e&&D(r,o,e),e};let n=class extends x(f){constructor(){super(...arguments),this._editing=!1}async deleteTask(){try{await this.tasksStore.client.deleteTask(this.taskHash),this.dispatchEvent(new CustomEvent("task-deleted",{bubbles:!0,composed:!0,detail:{taskHash:this.taskHash}}))}catch(s){console.error(s),$(t("Error deleting the task"))}}renderDetail(s){return a`
			<sl-card>
				<div slot="header" class="row" style="gap: 8px">
					<span style="font-size: 18px; flex: 1;">${t("Task")}</span>

					<sl-icon-button
						.src=${c(v)}
						@click=${()=>{this._editing=!0}}
					></sl-icon-button>
					<sl-icon-button
						.src=${c(k)}
						@click=${()=>this.deleteTask()}
					></sl-icon-button>
				</div>

				<div class="column" style="gap: 16px;">
					<div class="column" style="gap: 8px;">
						<span><strong>${t("Name")}</strong></span>
						<span style="white-space: pre-line">${s.entry.name}</span>
					</div>

					<div class="column" style="gap: 8px;">
						<span><strong>${t("Description")}</strong></span>
						<span style="white-space: pre-line"
							>${s.entry.description}</span
						>
					</div>

					<div class="column" style="gap: 8px;">
						<span><strong>${t("Deadline")}</strong></span>
						<span style="white-space: pre-line"
							>${s.entry.deadline?a`
										<sl-format-date
											.date=${new Date(s.entry.deadline/1e3)}
										></sl-format-date>
									`:a`<span>${t("No deadline")}</span>`}
						</span>
					</div>

					<div class="column" style="gap: 8px;">
						<span><strong>${t("Assignee")}</strong></span>
						<span style="white-space: pre-line"
							><agent-avatar
								.agentPubKey=${s.entry.assignee}
							></agent-avatar
						></span>
					</div>

					<div class="column" style="gap: 8px;">
						<span><strong>${t("Status")}</strong></span>
						<span style="white-space: pre-line"
							>${s.entry.status==="Ready"?t("Ready"):s.entry.status==="Blocked"?t("Blocked"):s.entry.status==="InProgress"?t("In Progress"):s.entry.status==="Done"?t("Done"):t("Cancelled")}</span
						>
					</div>
				</div>
			</sl-card>
		`}render(){const s=this.tasksStore.tasks.get(this.taskHash).latestVersion.get();switch(s.status){case"pending":return a`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;case"error":return a`<display-error
					.headline=${t("Error fetching the task")}
					.error=${s.error}
				></display-error>`;case"completed":return this._editing?a`<edit-task
						.taskHash=${this.taskHash}
						@task-updated=${async()=>{this._editing=!1}}
						@edit-canceled=${()=>{this._editing=!1}}
						style="display: flex; flex: 1;"
					></edit-task>`:this.renderDetail(s.value)}}};n.styles=[h];l([w(u("task-hash"))],n.prototype,"taskHash",2);l([g({context:_,subscribe:!0})],n.prototype,"tasksStore",2);l([m()],n.prototype,"_editing",2);n=l([y(),b("task-detail")],n);export{n as TaskDetail};
