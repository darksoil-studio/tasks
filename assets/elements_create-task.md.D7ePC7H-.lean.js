const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/api-docs.6GVAIKQB.js","assets/chunks/api-viewer-tabs.bc9mZ4w5.js","assets/chunks/tslib.es6.kHcLnhpD.js","assets/chunks/api-demo.Bsqmng5d.js","assets/chunks/profiles-context.BuH_RMZO.js","assets/chunks/tasks-client.qAG7b6b9.js","assets/chunks/provide.-X3GMMG4.js","assets/chunks/property.QJJZFMkB.js","assets/chunks/signal-watcher.DC_yjXfn.js","assets/chunks/tasks-context.D8BqHQfx.js","assets/chunks/context.CVKhpfoq.js","assets/chunks/create-task.-lgjYHjt.js","assets/chunks/agent-avatar.DHVeJeSD.js","assets/chunks/chunk.7WLK7HSA.D0LMGQMn.js","assets/chunks/chunk.DUWACTPH.C7rGf8ye.js","assets/chunks/static.DYJOwAbU.js"])))=>i.map(i=>d[i]);
import{y as h,X as s,o as k,c as o,a3 as r,j as d}from"./chunks/framework.D8cWuh-X.js";import{d as c,P as E,a as g,b as m,T as u,c as y,s as b,e as _,j as v,x as f}from"./chunks/tasks-client.qAG7b6b9.js";const F=r("",12),C=d("api-docs",{src:"custom-elements.json",only:"create-task"},null,-1),A=[F,C],T=JSON.parse('{"title":"<create-task>","description":"","frontmatter":{},"headers":[],"relativePath":"elements/create-task.md","filePath":"elements/create-task.md"}'),w={name:"elements/create-task.md"},q=Object.assign(w,{setup(P){return h(async()=>{await s(()=>import("./chunks/api-docs.6GVAIKQB.js"),__vite__mapDeps([0,1,2])),await s(()=>import("./chunks/api-demo.Bsqmng5d.js"),__vite__mapDeps([3,1,2])),await s(()=>import("./chunks/profiles-context.BuH_RMZO.js"),__vite__mapDeps([4,2,5,6,7,8])),customElements.get("tasks-context")||await s(()=>import("./chunks/tasks-context.D8BqHQfx.js"),__vite__mapDeps([9,6,7,5,10])),customElements.get("create-task")||await s(()=>import("./chunks/create-task.-lgjYHjt.js"),__vite__mapDeps([11,12,5,2,7,8,13,14,15,10]));const e=await c(),a=new E(e,Array.from(e.keys())[0]),n=new g(new m(a,"tasks_test")),t=new u,i=new y(t,"tasks_test"),l=await b(i);await t.create_task(l);const p=new _(i);v(f`
    <profiles-context .store=${n}>
      <tasks-context .store=${p}>
        <api-demo src="custom-elements.json" only="create-task" exclude-knobs="store">
        </api-demo>
      </tasks-context>
    </profiles-context>
  `,document.querySelector("element-demo"))}),(e,a)=>(k(),o("div",null,A))}});export{T as __pageData,q as default};
