const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/api-docs.6GVAIKQB.js","assets/chunks/api-viewer-tabs.bc9mZ4w5.js","assets/chunks/tslib.es6.kHcLnhpD.js","assets/chunks/api-demo.Bsqmng5d.js","assets/chunks/profiles-context.BuH_RMZO.js","assets/chunks/tasks-client.qAG7b6b9.js","assets/chunks/provide.-X3GMMG4.js","assets/chunks/property.QJJZFMkB.js","assets/chunks/signal-watcher.DC_yjXfn.js","assets/chunks/tasks-context.D8BqHQfx.js","assets/chunks/context.CVKhpfoq.js","assets/chunks/task-detail.C5iwHzj7.js","assets/chunks/agent-avatar.DHVeJeSD.js","assets/chunks/chunk.7WLK7HSA.D0LMGQMn.js","assets/chunks/chunk.DUWACTPH.C7rGf8ye.js","assets/chunks/static.DYJOwAbU.js","assets/chunks/chunk.BUIP557I.v6fbXhoA.js","assets/chunks/chunk.C2LF7HHG.DYJ60H94.js","assets/chunks/edit-task.Oje3jIiE.js"])))=>i.map(i=>d[i]);
import{y as k,X as s,o,c as d,a3 as r,j as c}from"./chunks/framework.D8cWuh-X.js";import{d as E,P as g,a as m,b as u,T as y,c as b,s as _,e as v,j as f,f as F}from"./chunks/tasks-client.qAG7b6b9.js";import{n as C,i as w}from"./chunks/static.DYJOwAbU.js";const A=r("",12),D=c("api-docs",{src:"custom-elements.json",only:"task-detail"},null,-1),P=[A,D],H=JSON.parse('{"title":"<task-detail>","description":"","frontmatter":{},"headers":[],"relativePath":"elements/task-detail.md","filePath":"elements/task-detail.md"}'),T={name:"elements/task-detail.md"},I=Object.assign(T,{setup(B){return k(async()=>{await s(()=>import("./chunks/api-docs.6GVAIKQB.js"),__vite__mapDeps([0,1,2])),await s(()=>import("./chunks/api-demo.Bsqmng5d.js"),__vite__mapDeps([3,1,2])),await s(()=>import("./chunks/profiles-context.BuH_RMZO.js"),__vite__mapDeps([4,2,5,6,7,8])),customElements.get("tasks-context")||await s(()=>import("./chunks/tasks-context.D8BqHQfx.js"),__vite__mapDeps([9,6,7,5,10])),customElements.get("task-detail")||await s(()=>import("./chunks/task-detail.C5iwHzj7.js"),__vite__mapDeps([11,12,5,2,7,8,13,14,15,16,17,10,18]));const a=await E(),t=new g(a,Array.from(a.keys())[0]),l=new m(new u(t,"tasks_test")),i=new y,e=new b(i,"tasks_test"),n=await _(e),h=await i.create_task(n),p=new v(e);f(C`
    <profiles-context .store=${l}>
      <tasks-context .store=${p}>
        <api-demo src="custom-elements.json" only="task-detail" exclude-knobs="store">
          <template data-element="task-detail" data-target="host">
            <task-detail task-hash="${w(F(h.signed_action.hashed.hash))}"></task-detail>
          </template>
        </api-demo>
      </tasks-context>
    </profiles-context>
  `,document.querySelector("element-demo"))}),(a,t)=>(o(),d("div",null,P))}});export{H as __pageData,I as default};
