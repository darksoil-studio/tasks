const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/api-docs.6GVAIKQB.js","assets/chunks/api-viewer-tabs.bc9mZ4w5.js","assets/chunks/tslib.es6.kHcLnhpD.js","assets/chunks/api-demo.Bsqmng5d.js","assets/chunks/profiles-context.BuH_RMZO.js","assets/chunks/tasks-client.qAG7b6b9.js","assets/chunks/provide.-X3GMMG4.js","assets/chunks/property.QJJZFMkB.js","assets/chunks/signal-watcher.DC_yjXfn.js","assets/chunks/tasks-context.D8BqHQfx.js","assets/chunks/context.CVKhpfoq.js","assets/chunks/dependent-tasks-for-task.B8cBrfyO.js","assets/chunks/agent-avatar.DHVeJeSD.js","assets/chunks/chunk.C2LF7HHG.DYJ60H94.js","assets/chunks/task-summary.BEiASs-o.js","assets/chunks/chunk.BUIP557I.v6fbXhoA.js","assets/chunks/chunk.DUWACTPH.C7rGf8ye.js","assets/chunks/static.DYJOwAbU.js"])))=>i.map(i=>d[i]);
import{y as r,X as s,o as c,c as E,a3 as g,j as m}from"./chunks/framework.D8cWuh-X.js";import{d as u,P as y,a as f,b,T as _,c as v,s as l,e as F,j as C,f as A}from"./chunks/tasks-client.qAG7b6b9.js";import{n as D,i as w}from"./chunks/static.DYJOwAbU.js";const P=g("",12),B=m("api-docs",{src:"custom-elements.json",only:"tasks-for-task"},null,-1),x=[P,B],S=JSON.parse('{"title":"<dependent-tasks-for-task>","description":"","frontmatter":{},"headers":[],"relativePath":"elements/dependent-tasks-for-task.md","filePath":"elements/dependent-tasks-for-task.md"}'),T={name:"elements/dependent-tasks-for-task.md"},V=Object.assign(T,{setup(I){return r(async()=>{await s(()=>import("./chunks/api-docs.6GVAIKQB.js"),__vite__mapDeps([0,1,2])),await s(()=>import("./chunks/api-demo.Bsqmng5d.js"),__vite__mapDeps([3,1,2])),await s(()=>import("./chunks/profiles-context.BuH_RMZO.js"),__vite__mapDeps([4,2,5,6,7,8])),customElements.get("tasks-context")||await s(()=>import("./chunks/tasks-context.D8BqHQfx.js"),__vite__mapDeps([9,6,7,5,10])),customElements.get("dependent-tasks-for-task")||await s(()=>import("./chunks/dependent-tasks-for-task.B8cBrfyO.js"),__vite__mapDeps([11,12,5,2,7,8,13,10,14,15,16,17]));const a=await u(),i=Array.from(a.keys())[0],h=new y(a,i),p=new f(new b(h,"tasks_test")),t=new _,e=new v(t,"tasks_test"),k=await l(e),o=await t.create_task(k),n=await l(e,{dependencies:[o.signed_action.hashed.hash]});await t.create_task(n);const d=new F(e);C(D`
    <profiles-context .store=${p}>
      <tasks-context .store=${d}>
        <api-demo src="custom-elements.json" only="tasks-for-task" exclude-knobs="store">
          <template data-element="tasks-for-task" data-target="host">
            <dependent-tasks-for-task task-hash="${w(A(n.dependencies[0]))}"></dependent-tasks-for-task>
          </template>
        </api-demo>
      </tasks-context>
    </profiles-context>
  `,document.querySelector("element-demo"))}),(a,i)=>(c(),E("div",null,x))}});export{S as __pageData,V as default};
