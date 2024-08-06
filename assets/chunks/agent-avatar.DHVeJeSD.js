import{i as R,v as Ge,g as Ot,q as be,x as $,w as Je,p as Qe,f as ti,m as we}from"./tasks-client.qAG7b6b9.js";import{_ as ut}from"./tslib.es6.kHcLnhpD.js";import{s as ei,a as u,t as qt,n as ii}from"./property.QJJZFMkB.js";import{S as oi}from"./signal-watcher.DC_yjXfn.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class te{constructor(e,i,o,s){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(r,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=r,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(r,n)),this.unsubscribe=n},this.host=e,i.context!==void 0){const r=i;this.context=r.context,this.callback=r.callback,this.subscribe=r.subscribe??!1}else this.context=i,this.callback=o,this.subscribe=s??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new ei(this.context,this.t,this.subscribe))}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function si({context:t,subscribe:e}){return(i,o)=>{typeof o=="object"?o.addInitializer(function(){new te(this,{context:t,callback:s=>{i.set.call(this,s)},subscribe:e})}):i.constructor.addInitializer(s=>{new te(s,{context:t,callback:r=>{s[o]=r},subscribe:e})})}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ee="lit-localize-status";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ri=class{constructor(e){this.__litLocalizeEventHandler=i=>{i.detail.status==="ready"&&this.host.requestUpdate()},this.host=e}hostConnected(){window.addEventListener(ee,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(ee,this.__litLocalizeEventHandler)}};const ni=t=>t.addController(new ri(t)),ai=ni;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xe=()=>(t,e)=>(t.addInitializer(ai),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Vt(t){return u({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const li=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function at(t,e){return(i,o,s)=>{const r=n=>{var a;return((a=n.renderRoot)==null?void 0:a.querySelector(t))??null};return li(i,o,{get(){return r(this)}})}}const Ce=[R`
    .row {
      display: flex;
      flex-direction: row;
    }
    .column {
      display: flex;
      flex-direction: column;
    }
    .small-margin {
      margin-top: 6px;
    }
    .big-margin {
      margin-top: 23px;
    }

    .fill {
      flex: 1;
      height: 100%;
    }

    .title {
      font-size: 20px;
    }

    .center-content {
      align-items: center;
      justify-content: center;
    }

    .placeholder {
      color: var(--sl-color-gray-700);
    }

    .flex-scrollable-parent {
      position: relative;
      display: flex;
      flex: 1;
    }

    .flex-scrollable-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .flex-scrollable-x {
      max-width: 100%;
      overflow-x: auto;
    }
    .flex-scrollable-y {
      max-height: 100%;
      overflow-y: auto;
    }
    :host {
      color: var(--sl-color-neutral-1000);
    }

    sl-card {
      display: flex;
    }
    sl-card::part(base) {
      flex: 1;
    }
    sl-card::part(body) {
      display: flex;
      flex: 1;
    }
    sl-drawer::part(body) {
      display: flex;
    }
  `];/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},$e=t=>(...e)=>({_$litDirective$:t,values:e});let Ee=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,o){this._$Ct=e,this._$AM=i,this._$Ci=o}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};function ke(t){return{attribute:t,type:Object,hasChanged:(e,i)=>(e==null?void 0:e.toString())!==(i==null?void 0:i.toString()),converter:e=>e&&e.length>0&&Ge(e)}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ci=class ze extends Event{constructor(e){super(ze.eventName,{bubbles:!0,composed:!0,cancelable:!1}),this.routes=e}};ci.eventName="lit-routes-connected";var hi=R`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,di=R`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`,ft=R`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,Ae=Object.defineProperty,pi=Object.defineProperties,ui=Object.getOwnPropertyDescriptor,fi=Object.getOwnPropertyDescriptors,ie=Object.getOwnPropertySymbols,gi=Object.prototype.hasOwnProperty,mi=Object.prototype.propertyIsEnumerable,oe=(t,e,i)=>e in t?Ae(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,Tt=(t,e)=>{for(var i in e||(e={}))gi.call(e,i)&&oe(t,i,e[i]);if(ie)for(var i of ie(e))mi.call(e,i)&&oe(t,i,e[i]);return t},Pe=(t,e)=>pi(t,fi(e)),f=(t,e,i,o)=>{for(var s=o>1?void 0:o?ui(e,i):e,r=t.length-1,n;r>=0;r--)(n=t[r])&&(s=(o?n(e,i,s):n(s))||s);return o&&s&&Ae(e,i,s),s},N=class extends Ot{constructor(){super(),Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const i=new CustomEvent(t,Tt({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(i),i}static define(t,e=this,i={}){const o=customElements.get(t);if(!o){customElements.define(t,class extends e{},i);return}let s=" (unknown version)",r=s;"version"in e&&e.version&&(s=" v"+e.version),"version"in o&&o.version&&(r=" v"+o.version),!(s&&r&&s===r)&&console.warn(`Attempted to register <${t}>${s}, but <${t}>${r} has already been registered.`)}};N.version="2.15.1";N.dependencies={};f([u()],N.prototype,"dir",2);f([u()],N.prototype,"lang",2);const I=Math.min,S=Math.max,At=Math.round,$t=Math.floor,J=t=>({x:t,y:t}),vi={left:"right",right:"left",bottom:"top",top:"bottom"},yi={start:"end",end:"start"};function Ht(t,e,i){return S(t,I(e,i))}function gt(t,e){return typeof t=="function"?t(e):t}function Q(t){return t.split("-")[0]}function mt(t){return t.split("-")[1]}function Se(t){return t==="x"?"y":"x"}function Yt(t){return t==="y"?"height":"width"}function st(t){return["top","bottom"].includes(Q(t))?"y":"x"}function Kt(t){return Se(st(t))}function bi(t,e,i){i===void 0&&(i=!1);const o=mt(t),s=Kt(t),r=Yt(s);let n=s==="x"?o===(i?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(n=Pt(n)),[n,Pt(n)]}function wi(t){const e=Pt(t);return[Ft(t),e,Ft(e)]}function Ft(t){return t.replace(/start|end/g,e=>yi[e])}function xi(t,e,i){const o=["left","right"],s=["right","left"],r=["top","bottom"],n=["bottom","top"];switch(t){case"top":case"bottom":return i?e?s:o:e?o:s;case"left":case"right":return e?r:n;default:return[]}}function Ci(t,e,i,o){const s=mt(t);let r=xi(Q(t),i==="start",o);return s&&(r=r.map(n=>n+"-"+s),e&&(r=r.concat(r.map(Ft)))),r}function Pt(t){return t.replace(/left|right|bottom|top/g,e=>vi[e])}function _i(t){return{top:0,right:0,bottom:0,left:0,...t}}function Le(t){return typeof t!="number"?_i(t):{top:t,right:t,bottom:t,left:t}}function St(t){const{x:e,y:i,width:o,height:s}=t;return{width:o,height:s,top:i,left:e,right:e+o,bottom:i+s,x:e,y:i}}function se(t,e,i){let{reference:o,floating:s}=t;const r=st(e),n=Kt(e),a=Yt(n),l=Q(e),c=r==="y",h=o.x+o.width/2-s.width/2,p=o.y+o.height/2-s.height/2,m=o[a]/2-s[a]/2;let d;switch(l){case"top":d={x:h,y:o.y-s.height};break;case"bottom":d={x:h,y:o.y+o.height};break;case"right":d={x:o.x+o.width,y:p};break;case"left":d={x:o.x-s.width,y:p};break;default:d={x:o.x,y:o.y}}switch(mt(e)){case"start":d[n]-=m*(i&&c?-1:1);break;case"end":d[n]+=m*(i&&c?-1:1);break}return d}const $i=async(t,e,i)=>{const{placement:o="bottom",strategy:s="absolute",middleware:r=[],platform:n}=i,a=r.filter(Boolean),l=await(n.isRTL==null?void 0:n.isRTL(e));let c=await n.getElementRects({reference:t,floating:e,strategy:s}),{x:h,y:p}=se(c,o,l),m=o,d={},g=0;for(let v=0;v<a.length;v++){const{name:b,fn:y}=a[v],{x:w,y:x,data:E,reset:_}=await y({x:h,y:p,initialPlacement:o,placement:m,strategy:s,middlewareData:d,rects:c,platform:n,elements:{reference:t,floating:e}});h=w??h,p=x??p,d={...d,[b]:{...d[b],...E}},_&&g<=50&&(g++,typeof _=="object"&&(_.placement&&(m=_.placement),_.rects&&(c=_.rects===!0?await n.getElementRects({reference:t,floating:e,strategy:s}):_.rects),{x:h,y:p}=se(c,m,l)),v=-1)}return{x:h,y:p,placement:m,strategy:s,middlewareData:d}};async function Xt(t,e){var i;e===void 0&&(e={});const{x:o,y:s,platform:r,rects:n,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:p="floating",altBoundary:m=!1,padding:d=0}=gt(e,t),g=Le(d),b=a[m?p==="floating"?"reference":"floating":p],y=St(await r.getClippingRect({element:(i=await(r.isElement==null?void 0:r.isElement(b)))==null||i?b:b.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(a.floating)),boundary:c,rootBoundary:h,strategy:l})),w=p==="floating"?{x:o,y:s,width:n.floating.width,height:n.floating.height}:n.reference,x=await(r.getOffsetParent==null?void 0:r.getOffsetParent(a.floating)),E=await(r.isElement==null?void 0:r.isElement(x))?await(r.getScale==null?void 0:r.getScale(x))||{x:1,y:1}:{x:1,y:1},_=St(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:w,offsetParent:x,strategy:l}):w);return{top:(y.top-_.top+g.top)/E.y,bottom:(_.bottom-y.bottom+g.bottom)/E.y,left:(y.left-_.left+g.left)/E.x,right:(_.right-y.right+g.right)/E.x}}const Ei=t=>({name:"arrow",options:t,async fn(e){const{x:i,y:o,placement:s,rects:r,platform:n,elements:a,middlewareData:l}=e,{element:c,padding:h=0}=gt(t,e)||{};if(c==null)return{};const p=Le(h),m={x:i,y:o},d=Kt(s),g=Yt(d),v=await n.getDimensions(c),b=d==="y",y=b?"top":"left",w=b?"bottom":"right",x=b?"clientHeight":"clientWidth",E=r.reference[g]+r.reference[d]-m[d]-r.floating[g],_=m[d]-r.reference[d],P=await(n.getOffsetParent==null?void 0:n.getOffsetParent(c));let B=P?P[x]:0;(!B||!await(n.isElement==null?void 0:n.isElement(P)))&&(B=a.floating[x]||r.floating[g]);const K=E/2-_/2,M=B/2-v[g]/2-1,O=I(p[y],M),X=I(p[w],M),it=O,bt=B-v[g]-X,z=B/2-v[g]/2+K,lt=Ht(it,z,bt),q=!l.arrow&&mt(s)!=null&&z!==lt&&r.reference[g]/2-(z<it?O:X)-v[g]/2<0,D=q?z<it?z-it:z-bt:0;return{[d]:m[d]+D,data:{[d]:lt,centerOffset:z-lt-D,...q&&{alignmentOffset:D}},reset:q}}}),ki=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var i,o;const{placement:s,middlewareData:r,rects:n,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:h=!0,crossAxis:p=!0,fallbackPlacements:m,fallbackStrategy:d="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:v=!0,...b}=gt(t,e);if((i=r.arrow)!=null&&i.alignmentOffset)return{};const y=Q(s),w=st(a),x=Q(a)===a,E=await(l.isRTL==null?void 0:l.isRTL(c.floating)),_=m||(x||!v?[Pt(a)]:wi(a)),P=g!=="none";!m&&P&&_.push(...Ci(a,v,g,E));const B=[a,..._],K=await Xt(e,b),M=[];let O=((o=r.flip)==null?void 0:o.overflows)||[];if(h&&M.push(K[y]),p){const z=bi(s,n,E);M.push(K[z[0]],K[z[1]])}if(O=[...O,{placement:s,overflows:M}],!M.every(z=>z<=0)){var X,it;const z=(((X=r.flip)==null?void 0:X.index)||0)+1,lt=B[z];if(lt)return{data:{index:z,overflows:O},reset:{placement:lt}};let q=(it=O.filter(D=>D.overflows[0]<=0).sort((D,Z)=>D.overflows[1]-Z.overflows[1])[0])==null?void 0:it.placement;if(!q)switch(d){case"bestFit":{var bt;const D=(bt=O.filter(Z=>{if(P){const G=st(Z.placement);return G===w||G==="y"}return!0}).map(Z=>[Z.placement,Z.overflows.filter(G=>G>0).reduce((G,Ze)=>G+Ze,0)]).sort((Z,G)=>Z[1]-G[1])[0])==null?void 0:bt[0];D&&(q=D);break}case"initialPlacement":q=a;break}if(s!==q)return{reset:{placement:q}}}return{}}}};async function zi(t,e){const{placement:i,platform:o,elements:s}=t,r=await(o.isRTL==null?void 0:o.isRTL(s.floating)),n=Q(i),a=mt(i),l=st(i)==="y",c=["left","top"].includes(n)?-1:1,h=r&&l?-1:1,p=gt(e,t);let{mainAxis:m,crossAxis:d,alignmentAxis:g}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...p};return a&&typeof g=="number"&&(d=a==="end"?g*-1:g),l?{x:d*h,y:m*c}:{x:m*c,y:d*h}}const Ai=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var i,o;const{x:s,y:r,placement:n,middlewareData:a}=e,l=await zi(e,t);return n===((i=a.offset)==null?void 0:i.placement)&&(o=a.arrow)!=null&&o.alignmentOffset?{}:{x:s+l.x,y:r+l.y,data:{...l,placement:n}}}}},Pi=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:i,y:o,placement:s}=e,{mainAxis:r=!0,crossAxis:n=!1,limiter:a={fn:b=>{let{x:y,y:w}=b;return{x:y,y:w}}},...l}=gt(t,e),c={x:i,y:o},h=await Xt(e,l),p=st(Q(s)),m=Se(p);let d=c[m],g=c[p];if(r){const b=m==="y"?"top":"left",y=m==="y"?"bottom":"right",w=d+h[b],x=d-h[y];d=Ht(w,d,x)}if(n){const b=p==="y"?"top":"left",y=p==="y"?"bottom":"right",w=g+h[b],x=g-h[y];g=Ht(w,g,x)}const v=a.fn({...e,[m]:d,[p]:g});return{...v,data:{x:v.x-i,y:v.y-o}}}}},Si=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){const{placement:i,rects:o,platform:s,elements:r}=e,{apply:n=()=>{},...a}=gt(t,e),l=await Xt(e,a),c=Q(i),h=mt(i),p=st(i)==="y",{width:m,height:d}=o.floating;let g,v;c==="top"||c==="bottom"?(g=c,v=h===(await(s.isRTL==null?void 0:s.isRTL(r.floating))?"start":"end")?"left":"right"):(v=c,g=h==="end"?"top":"bottom");const b=d-l.top-l.bottom,y=m-l.left-l.right,w=I(d-l[g],b),x=I(m-l[v],y),E=!e.middlewareData.shift;let _=w,P=x;if(p?P=h||E?I(x,y):y:_=h||E?I(w,b):b,E&&!h){const K=S(l.left,0),M=S(l.right,0),O=S(l.top,0),X=S(l.bottom,0);p?P=m-2*(K!==0||M!==0?K+M:S(l.left,l.right)):_=d-2*(O!==0||X!==0?O+X:S(l.top,l.bottom))}await n({...e,availableWidth:P,availableHeight:_});const B=await s.getDimensions(r.floating);return m!==B.width||d!==B.height?{reset:{rects:!0}}:{}}}};function vt(t){return Oe(t)?(t.nodeName||"").toLowerCase():"#document"}function L(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function V(t){var e;return(e=(Oe(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Oe(t){return t instanceof Node||t instanceof L(t).Node}function j(t){return t instanceof Element||t instanceof L(t).Element}function H(t){return t instanceof HTMLElement||t instanceof L(t).HTMLElement}function re(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof L(t).ShadowRoot}function Ct(t){const{overflow:e,overflowX:i,overflowY:o,display:s}=T(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+i)&&!["inline","contents"].includes(s)}function Li(t){return["table","td","th"].includes(vt(t))}function Rt(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch{return!1}})}function Zt(t){const e=Gt(),i=T(t);return i.transform!=="none"||i.perspective!=="none"||(i.containerType?i.containerType!=="normal":!1)||!e&&(i.backdropFilter?i.backdropFilter!=="none":!1)||!e&&(i.filter?i.filter!=="none":!1)||["transform","perspective","filter"].some(o=>(i.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(i.contain||"").includes(o))}function Oi(t){let e=tt(t);for(;H(e)&&!dt(e);){if(Rt(e))return null;if(Zt(e))return e;e=tt(e)}return null}function Gt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function dt(t){return["html","body","#document"].includes(vt(t))}function T(t){return L(t).getComputedStyle(t)}function Bt(t){return j(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function tt(t){if(vt(t)==="html")return t;const e=t.assignedSlot||t.parentNode||re(t)&&t.host||V(t);return re(e)?e.host:e}function Te(t){const e=tt(t);return dt(e)?t.ownerDocument?t.ownerDocument.body:t.body:H(e)&&Ct(e)?e:Te(e)}function xt(t,e,i){var o;e===void 0&&(e=[]),i===void 0&&(i=!0);const s=Te(t),r=s===((o=t.ownerDocument)==null?void 0:o.body),n=L(s);return r?e.concat(n,n.visualViewport||[],Ct(s)?s:[],n.frameElement&&i?xt(n.frameElement):[]):e.concat(s,xt(s,[],i))}function Re(t){const e=T(t);let i=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const s=H(t),r=s?t.offsetWidth:i,n=s?t.offsetHeight:o,a=At(i)!==r||At(o)!==n;return a&&(i=r,o=n),{width:i,height:o,$:a}}function Jt(t){return j(t)?t:t.contextElement}function ht(t){const e=Jt(t);if(!H(e))return J(1);const i=e.getBoundingClientRect(),{width:o,height:s,$:r}=Re(e);let n=(r?At(i.width):i.width)/o,a=(r?At(i.height):i.height)/s;return(!n||!Number.isFinite(n))&&(n=1),(!a||!Number.isFinite(a))&&(a=1),{x:n,y:a}}const Ti=J(0);function Be(t){const e=L(t);return!Gt()||!e.visualViewport?Ti:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Ri(t,e,i){return e===void 0&&(e=!1),!i||e&&i!==L(t)?!1:e}function rt(t,e,i,o){e===void 0&&(e=!1),i===void 0&&(i=!1);const s=t.getBoundingClientRect(),r=Jt(t);let n=J(1);e&&(o?j(o)&&(n=ht(o)):n=ht(t));const a=Ri(r,i,o)?Be(r):J(0);let l=(s.left+a.x)/n.x,c=(s.top+a.y)/n.y,h=s.width/n.x,p=s.height/n.y;if(r){const m=L(r),d=o&&j(o)?L(o):o;let g=m,v=g.frameElement;for(;v&&o&&d!==g;){const b=ht(v),y=v.getBoundingClientRect(),w=T(v),x=y.left+(v.clientLeft+parseFloat(w.paddingLeft))*b.x,E=y.top+(v.clientTop+parseFloat(w.paddingTop))*b.y;l*=b.x,c*=b.y,h*=b.x,p*=b.y,l+=x,c+=E,g=L(v),v=g.frameElement}}return St({width:h,height:p,x:l,y:c})}function Bi(t){let{elements:e,rect:i,offsetParent:o,strategy:s}=t;const r=s==="fixed",n=V(o),a=e?Rt(e.floating):!1;if(o===n||a&&r)return i;let l={scrollLeft:0,scrollTop:0},c=J(1);const h=J(0),p=H(o);if((p||!p&&!r)&&((vt(o)!=="body"||Ct(n))&&(l=Bt(o)),H(o))){const m=rt(o);c=ht(o),h.x=m.x+o.clientLeft,h.y=m.y+o.clientTop}return{width:i.width*c.x,height:i.height*c.y,x:i.x*c.x-l.scrollLeft*c.x+h.x,y:i.y*c.y-l.scrollTop*c.y+h.y}}function Mi(t){return Array.from(t.getClientRects())}function Me(t){return rt(V(t)).left+Bt(t).scrollLeft}function Di(t){const e=V(t),i=Bt(t),o=t.ownerDocument.body,s=S(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),r=S(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let n=-i.scrollLeft+Me(t);const a=-i.scrollTop;return T(o).direction==="rtl"&&(n+=S(e.clientWidth,o.clientWidth)-s),{width:s,height:r,x:n,y:a}}function Ii(t,e){const i=L(t),o=V(t),s=i.visualViewport;let r=o.clientWidth,n=o.clientHeight,a=0,l=0;if(s){r=s.width,n=s.height;const c=Gt();(!c||c&&e==="fixed")&&(a=s.offsetLeft,l=s.offsetTop)}return{width:r,height:n,x:a,y:l}}function ji(t,e){const i=rt(t,!0,e==="fixed"),o=i.top+t.clientTop,s=i.left+t.clientLeft,r=H(t)?ht(t):J(1),n=t.clientWidth*r.x,a=t.clientHeight*r.y,l=s*r.x,c=o*r.y;return{width:n,height:a,x:l,y:c}}function ne(t,e,i){let o;if(e==="viewport")o=Ii(t,i);else if(e==="document")o=Di(V(t));else if(j(e))o=ji(e,i);else{const s=Be(t);o={...e,x:e.x-s.x,y:e.y-s.y}}return St(o)}function De(t,e){const i=tt(t);return i===e||!j(i)||dt(i)?!1:T(i).position==="fixed"||De(i,e)}function Hi(t,e){const i=e.get(t);if(i)return i;let o=xt(t,[],!1).filter(a=>j(a)&&vt(a)!=="body"),s=null;const r=T(t).position==="fixed";let n=r?tt(t):t;for(;j(n)&&!dt(n);){const a=T(n),l=Zt(n);!l&&a.position==="fixed"&&(s=null),(r?!l&&!s:!l&&a.position==="static"&&!!s&&["absolute","fixed"].includes(s.position)||Ct(n)&&!l&&De(t,n))?o=o.filter(h=>h!==n):s=a,n=tt(n)}return e.set(t,o),o}function Fi(t){let{element:e,boundary:i,rootBoundary:o,strategy:s}=t;const n=[...i==="clippingAncestors"?Rt(e)?[]:Hi(e,this._c):[].concat(i),o],a=n[0],l=n.reduce((c,h)=>{const p=ne(e,h,s);return c.top=S(p.top,c.top),c.right=I(p.right,c.right),c.bottom=I(p.bottom,c.bottom),c.left=S(p.left,c.left),c},ne(e,a,s));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Ni(t){const{width:e,height:i}=Re(t);return{width:e,height:i}}function Wi(t,e,i){const o=H(e),s=V(e),r=i==="fixed",n=rt(t,!0,r,e);let a={scrollLeft:0,scrollTop:0};const l=J(0);if(o||!o&&!r)if((vt(e)!=="body"||Ct(s))&&(a=Bt(e)),o){const p=rt(e,!0,r,e);l.x=p.x+e.clientLeft,l.y=p.y+e.clientTop}else s&&(l.x=Me(s));const c=n.left+a.scrollLeft-l.x,h=n.top+a.scrollTop-l.y;return{x:c,y:h,width:n.width,height:n.height}}function Mt(t){return T(t).position==="static"}function ae(t,e){return!H(t)||T(t).position==="fixed"?null:e?e(t):t.offsetParent}function Ie(t,e){const i=L(t);if(Rt(t))return i;if(!H(t)){let s=tt(t);for(;s&&!dt(s);){if(j(s)&&!Mt(s))return s;s=tt(s)}return i}let o=ae(t,e);for(;o&&Li(o)&&Mt(o);)o=ae(o,e);return o&&dt(o)&&Mt(o)&&!Zt(o)?i:o||Oi(t)||i}const Ui=async function(t){const e=this.getOffsetParent||Ie,i=this.getDimensions,o=await i(t.floating);return{reference:Wi(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function qi(t){return T(t).direction==="rtl"}const kt={convertOffsetParentRelativeRectToViewportRelativeRect:Bi,getDocumentElement:V,getClippingRect:Fi,getOffsetParent:Ie,getElementRects:Ui,getClientRects:Mi,getDimensions:Ni,getScale:ht,isElement:j,isRTL:qi};function Vi(t,e){let i=null,o;const s=V(t);function r(){var a;clearTimeout(o),(a=i)==null||a.disconnect(),i=null}function n(a,l){a===void 0&&(a=!1),l===void 0&&(l=1),r();const{left:c,top:h,width:p,height:m}=t.getBoundingClientRect();if(a||e(),!p||!m)return;const d=$t(h),g=$t(s.clientWidth-(c+p)),v=$t(s.clientHeight-(h+m)),b=$t(c),w={rootMargin:-d+"px "+-g+"px "+-v+"px "+-b+"px",threshold:S(0,I(1,l))||1};let x=!0;function E(_){const P=_[0].intersectionRatio;if(P!==l){if(!x)return n();P?n(!1,P):o=setTimeout(()=>{n(!1,1e-7)},1e3)}x=!1}try{i=new IntersectionObserver(E,{...w,root:s.ownerDocument})}catch{i=new IntersectionObserver(E,w)}i.observe(t)}return n(!0),r}function Yi(t,e,i,o){o===void 0&&(o={});const{ancestorScroll:s=!0,ancestorResize:r=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=!1}=o,c=Jt(t),h=s||r?[...c?xt(c):[],...xt(e)]:[];h.forEach(y=>{s&&y.addEventListener("scroll",i,{passive:!0}),r&&y.addEventListener("resize",i)});const p=c&&a?Vi(c,i):null;let m=-1,d=null;n&&(d=new ResizeObserver(y=>{let[w]=y;w&&w.target===c&&d&&(d.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var x;(x=d)==null||x.observe(e)})),i()}),c&&!l&&d.observe(c),d.observe(e));let g,v=l?rt(t):null;l&&b();function b(){const y=rt(t);v&&(y.x!==v.x||y.y!==v.y||y.width!==v.width||y.height!==v.height)&&i(),v=y,g=requestAnimationFrame(b)}return i(),()=>{var y;h.forEach(w=>{s&&w.removeEventListener("scroll",i),r&&w.removeEventListener("resize",i)}),p==null||p(),(y=d)==null||y.disconnect(),d=null,l&&cancelAnimationFrame(g)}}const Ki=Ai,Xi=Pi,Zi=ki,le=Si,Gi=Ei,Ji=(t,e,i)=>{const o=new Map,s={platform:kt,...i},r={...s.platform,_c:o};return $i(t,e,{...s,platform:r})};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=$e(class extends Ee{constructor(t){var e;if(super(t),t.type!==_e.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var o,s;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!((o=this.nt)!=null&&o.has(r))&&this.st.add(r);return this.render(e)}const i=t.element.classList;for(const r of this.st)r in e||(i.remove(r),this.st.delete(r));for(const r in e){const n=!!e[r];n===this.st.has(r)||(s=this.nt)!=null&&s.has(r)||(n?(i.add(r),this.st.add(r)):(i.remove(r),this.st.delete(r)))}return be}});function Qi(t){return to(t)}function Dt(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function to(t){for(let e=t;e;e=Dt(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Dt(t);e;e=Dt(e)){if(!(e instanceof Element))continue;const i=getComputedStyle(e);if(i.display!=="contents"&&(i.position!=="static"||i.filter!=="none"||e.tagName==="BODY"))return e}return null}function eo(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var C=class extends N{constructor(){super(...arguments),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom");let o=0,s=0,r=0,n=0,a=0,l=0,c=0,h=0;i?t.top<e.top?(o=t.left,s=t.bottom,r=t.right,n=t.bottom,a=e.left,l=e.top,c=e.right,h=e.top):(o=e.left,s=e.bottom,r=e.right,n=e.bottom,a=t.left,l=t.top,c=t.right,h=t.top):t.left<e.left?(o=t.right,s=t.top,r=e.left,n=e.top,a=t.right,l=t.bottom,c=e.left,h=e.bottom):(o=e.right,s=e.top,r=t.left,n=t.top,a=e.right,l=e.bottom,c=t.left,h=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${r}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||eo(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&(this.cleanup=Yi(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[Ki({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(le({apply:({rects:i})=>{const o=this.sync==="width"||this.sync==="both",s=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${i.reference.width}px`:"",this.popup.style.height=s?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Zi({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Xi({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(le({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Gi({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?i=>kt.getOffsetParent(i,Qi):kt.getOffsetParent;Ji(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:Pe(Tt({},kt),{getOffsetParent:e})}).then(({x:i,y:o,middlewareData:s,placement:r})=>{const n=getComputedStyle(this).direction==="rtl",a={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${i}px`,top:`${o}px`}),this.arrow){const l=s.arrow.x,c=s.arrow.y;let h="",p="",m="",d="";if(this.arrowPlacement==="start"){const g=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",p=n?g:"",d=n?"":g}else if(this.arrowPlacement==="end"){const g=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=n?"":g,d=n?g:"",m=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(d=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",h=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(d=typeof l=="number"?`${l}px`:"",h=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:h,right:p,bottom:m,left:d,[a]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return $`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${pt({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${pt({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?$`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};C.styles=[ft,di];f([at(".popup")],C.prototype,"popup",2);f([at(".popup__arrow")],C.prototype,"arrowEl",2);f([u()],C.prototype,"anchor",2);f([u({type:Boolean,reflect:!0})],C.prototype,"active",2);f([u({reflect:!0})],C.prototype,"placement",2);f([u({reflect:!0})],C.prototype,"strategy",2);f([u({type:Number})],C.prototype,"distance",2);f([u({type:Number})],C.prototype,"skidding",2);f([u({type:Boolean})],C.prototype,"arrow",2);f([u({attribute:"arrow-placement"})],C.prototype,"arrowPlacement",2);f([u({attribute:"arrow-padding",type:Number})],C.prototype,"arrowPadding",2);f([u({type:Boolean})],C.prototype,"flip",2);f([u({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],C.prototype,"flipFallbackPlacements",2);f([u({attribute:"flip-fallback-strategy"})],C.prototype,"flipFallbackStrategy",2);f([u({type:Object})],C.prototype,"flipBoundary",2);f([u({attribute:"flip-padding",type:Number})],C.prototype,"flipPadding",2);f([u({type:Boolean})],C.prototype,"shift",2);f([u({type:Object})],C.prototype,"shiftBoundary",2);f([u({attribute:"shift-padding",type:Number})],C.prototype,"shiftPadding",2);f([u({attribute:"auto-size"})],C.prototype,"autoSize",2);f([u()],C.prototype,"sync",2);f([u({type:Object})],C.prototype,"autoSizeBoundary",2);f([u({attribute:"auto-size-padding",type:Number})],C.prototype,"autoSizePadding",2);f([u({attribute:"hover-bridge",type:Boolean})],C.prototype,"hoverBridge",2);var je=new Map,io=new WeakMap;function oo(t){return t??{keyframes:[],options:{duration:0}}}function ce(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function He(t,e){je.set(t,oo(e))}function he(t,e,i){const o=io.get(t);if(o!=null&&o[e])return ce(o[e],i.dir);const s=je.get(e);return s?ce(s,i.dir):{keyframes:[],options:{duration:0}}}function de(t,e){return new Promise(i=>{function o(s){s.target===t&&(t.removeEventListener(e,o),i())}t.addEventListener(e,o)})}function pe(t,e,i){return new Promise(o=>{if((i==null?void 0:i.duration)===1/0)throw new Error("Promise-based animations must be finite.");const s=t.animate(e,Pe(Tt({},i),{duration:so()?0:i.duration}));s.addEventListener("cancel",o,{once:!0}),s.addEventListener("finish",o,{once:!0})})}function ue(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?parseFloat(t)*1e3:parseFloat(t)}function so(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function fe(t){return Promise.all(t.getAnimations().map(e=>new Promise(i=>{e.cancel(),requestAnimationFrame(i)})))}const Nt=new Set,ro=new MutationObserver(Ue),ct=new Map;let Fe=document.documentElement.dir||"ltr",Ne=document.documentElement.lang||navigator.language,ot;ro.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});function We(...t){t.map(e=>{const i=e.$code.toLowerCase();ct.has(i)?ct.set(i,Object.assign(Object.assign({},ct.get(i)),e)):ct.set(i,e),ot||(ot=e)}),Ue()}function Ue(){Fe=document.documentElement.dir||"ltr",Ne=document.documentElement.lang||navigator.language,[...Nt.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let no=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Nt.add(this.host)}hostDisconnected(){Nt.delete(this.host)}dir(){return`${this.host.dir||Fe}`.toLowerCase()}lang(){return`${this.host.lang||Ne}`.toLowerCase()}getTranslationData(e){var i,o;const s=new Intl.Locale(e.replace(/_/g,"-")),r=s==null?void 0:s.language.toLowerCase(),n=(o=(i=s==null?void 0:s.region)===null||i===void 0?void 0:i.toLowerCase())!==null&&o!==void 0?o:"",a=ct.get(`${r}-${n}`),l=ct.get(r);return{locale:s,language:r,region:n,primary:a,secondary:l}}exists(e,i){var o;const{primary:s,secondary:r}=this.getTranslationData((o=i.lang)!==null&&o!==void 0?o:this.lang());return i=Object.assign({includeFallback:!1},i),!!(s&&s[e]||r&&r[e]||i.includeFallback&&ot&&ot[e])}term(e,...i){const{primary:o,secondary:s}=this.getTranslationData(this.lang());let r;if(o&&o[e])r=o[e];else if(s&&s[e])r=s[e];else if(ot&&ot[e])r=ot[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof r=="function"?r(...i):r}date(e,i){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),i).format(e)}number(e,i){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),i).format(e)}relativeTime(e,i,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(e,i)}};var qe={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};We(qe);var ao=qe,Ve=class extends no{};We(ao);function yt(t,e){const i=Tt({waitUntilFirstUpdate:!1},e);return(o,s)=>{const{update:r}=o,n=Array.isArray(t)?t:[t];o.update=function(a){n.forEach(l=>{const c=l;if(a.has(c)){const h=a.get(c),p=this[c];h!==p&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[s](h,p)}}),r.call(this,a)}}}var k=class extends N{constructor(){super(),this.localize=new Ve(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=ue(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=ue(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await fe(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:i,options:o}=he(this,"tooltip.show",{dir:this.localize.dir()});await pe(this.popup.popup,i,o),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await fe(this.body);const{keyframes:i,options:o}=he(this,"tooltip.hide",{dir:this.localize.dir()});await pe(this.popup.popup,i,o),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,de(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,de(this,"sl-after-hide")}render(){return $`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${pt({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};k.styles=[ft,hi];k.dependencies={"sl-popup":C};f([at("slot:not([name])")],k.prototype,"defaultSlot",2);f([at(".tooltip__body")],k.prototype,"body",2);f([at("sl-popup")],k.prototype,"popup",2);f([u()],k.prototype,"content",2);f([u()],k.prototype,"placement",2);f([u({type:Boolean,reflect:!0})],k.prototype,"disabled",2);f([u({type:Number})],k.prototype,"distance",2);f([u({type:Boolean,reflect:!0})],k.prototype,"open",2);f([u({type:Number})],k.prototype,"skidding",2);f([u()],k.prototype,"trigger",2);f([u({type:Boolean})],k.prototype,"hoist",2);f([yt("open",{waitUntilFirstUpdate:!0})],k.prototype,"handleOpenChange",1);f([yt(["content","distance","hoist","placement","skidding"])],k.prototype,"handleOptionsChange",1);f([yt("disabled")],k.prototype,"handleDisabledChange",1);He("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});He("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});k.define("sl-tooltip");var lo=R`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,Wt="";function ge(t){Wt=t}function co(t=""){if(!Wt){const e=[...document.getElementsByTagName("script")],i=e.find(o=>o.hasAttribute("data-shoelace"));if(i)ge(i.getAttribute("data-shoelace"));else{const o=e.find(r=>/shoelace(\.min)?\.js($|\?)/.test(r.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(r.src));let s="";o&&(s=o.getAttribute("src")),ge(s.split("/").slice(0,-1).join("/"))}}return Wt.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var ho={name:"default",resolver:t=>co(`assets/icons/${t}.svg`)},po=ho,me={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},uo={name:"system",resolver:t=>t in me?`data:image/svg+xml,${encodeURIComponent(me[t])}`:""},fo=uo,go=[po,fo],Ut=[];function mo(t){Ut.push(t)}function vo(t){Ut=Ut.filter(e=>e!==t)}function ve(t){return go.find(e=>e.name===t)}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yo=(t,e)=>(t==null?void 0:t._$litType$)!==void 0,Do=t=>t.strings===void 0,bo={},Io=(t,e=bo)=>t._$AH=e;var wt=Symbol(),Et=Symbol(),It,jt=new Map,W=class extends N{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var i;let o;if(e!=null&&e.spriteSheet){this.svg=$`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const s=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(s),this.svg}try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?wt:Et}catch{return Et}try{const s=document.createElement("div");s.innerHTML=await o.text();const r=s.firstElementChild;if(((i=r==null?void 0:r.tagName)==null?void 0:i.toLowerCase())!=="svg")return wt;It||(It=new DOMParser);const a=It.parseFromString(r.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):wt}catch{return wt}}connectedCallback(){super.connectedCallback(),mo(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),vo(this)}getIconSource(){const t=ve(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:i}=this.getIconSource(),o=i?ve(this.library):void 0;if(!e){this.svg=null;return}let s=jt.get(e);if(s||(s=this.resolveIcon(e,o),jt.set(e,s)),!this.initialRender)return;const r=await s;if(r===Et&&jt.delete(e),e===this.getIconSource().url){if(yo(r)){this.svg=r;return}switch(r){case Et:case wt:this.svg=null,this.emit("sl-error");break;default:this.svg=r.cloneNode(!0),(t=o==null?void 0:o.mutator)==null||t.call(o,this.svg),this.emit("sl-load")}}}render(){return this.svg}};W.styles=[ft,lo];f([Vt()],W.prototype,"svg",2);f([u({reflect:!0})],W.prototype,"name",2);f([u()],W.prototype,"src",2);f([u()],W.prototype,"label",2);f([u({reflect:!0})],W.prototype,"library",2);f([yt("label")],W.prototype,"handleLabelChange",1);f([yt(["name","src","library"])],W.prototype,"setIcon",1);W.define("sl-icon");var _t=function(t,e,i,o){var s=arguments.length,r=s<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(s<3?n(r):s>3?n(e,i,r):n(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};let nt=class extends Ot{constructor(){super(...arguments),this.tooltip=!1}get _iconSize(){return this.iconSize?this.iconSize:this.tooltip!==!1?"32px":"64px"}renderIcon(){return $`
      <sl-icon
        style="color: red; height: ${this._iconSize}; width: ${this._iconSize}; margin-bottom: 8px;"
        src="${Je(Qe)}"
      ></sl-icon>
    `}renderFull(){return $` <div class="column center-content" style="flex: 1">
      ${this.renderIcon()}
      <div style="width: 500px; text-align: center" class="column">
        ${this.headline?$` <span style="margin-bottom: 8px">${this.headline} </span>`:$``}
        <span class="placeholder"
          >${typeof this.error=="object"&&"message"in this.error?this.error.message:this.error}
        </span>
      </div>
    </div>`}renderTooltip(){return $`
      <sl-tooltip hoist .content=${this.headline?this.headline:this.error}>
        ${this.renderIcon()}</sl-tooltip
      >
    `}render(){return this.tooltip!==!1?this.renderTooltip():this.renderFull()}};nt.styles=[Ce,R`
      :host {
        display: flex;
        flex: 1;
      }
    `];_t([u({attribute:"tooltip"})],nt.prototype,"tooltip",void 0);_t([u()],nt.prototype,"headline",void 0);_t([u()],nt.prototype,"error",void 0);_t([u({attribute:"icon-size"})],nt.prototype,"iconSize",void 0);nt=_t([qt("display-error")],nt);var wo=R`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`,xo=class extends N{constructor(){super(...arguments),this.localize=new Ve(this)}render(){return $`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};xo.styles=[ft,wo];var Co=R`
  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`,Qt=class extends N{constructor(){super(...arguments),this.effect="none"}render(){return $`
      <div
        part="base"
        class=${pt({skeleton:!0,"skeleton--pulse":this.effect==="pulse","skeleton--sheen":this.effect==="sheen"})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};Qt.styles=[ft,Co];f([u()],Qt.prototype,"effect",2);Qt.define("sl-skeleton");const _o=ii("hc_zome_profiles/store");/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ye="important",$o=" !"+Ye,ye=$e(class extends Ee{constructor(t){var e;if(super(t),t.type!==_e.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const o=t[i];return o==null?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(t,[e]){const{style:i}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const o of this.ft)e[o]==null&&(this.ft.delete(o),o.includes("-")?i.removeProperty(o):i[o]=null);for(const o in e){const s=e[o];if(s!=null){this.ft.add(o);const r=typeof s=="string"&&s.endsWith($o);o.includes("-")||r?i.setProperty(o,r?s.slice(0,-11):s,r?Ye:""):i[o]=s}}return be}});let Lt=[0],zt=0;function Eo(t){t[0]===132&&t[1]===32&&t[2]===36?Lt=t.slice(3):Lt=t||[],zt=0}function A(){return(()=>{const e=Lt[zt];return zt=(zt+1)%Lt.length,e})()/256}function Ke(t){const e=Math.floor(A()*360),i=A()*60+40,o=t||(A()*100+(A()+A()+A()+A())*25)/2;return{h:e,s:i,l:o}}function Xe({h:t,s:e,l:i}){return`hsl(${t}, ${e}%, ${i}%)`}function ko(t,e,i){const o=A()*2*Math.PI,s=e*Math.cos(o),r=e*Math.sin(o),n=i.x+s,a=i.x+r,l=o+2*Math.PI*.3,c=e*Math.cos(l),h=e*Math.sin(l),p=i.x+c,m=i.x+h,d=l+2*Math.PI*.3,g=e*Math.cos(d),v=e*Math.sin(d),b=i.x+g,y=i.x+v;t.beginPath(),t.moveTo(n,a),t.lineTo(p,m),t.lineTo(b,y),t.fill()}function zo(t){const e=t.hash||[0];return Eo(e),{backgroundColor:t.backgroundColor||Xe(Ke()),hash:e,size:t.size||32}}function Ao(t,e){if(t.hash&&!(t.hash instanceof Uint8Array))throw new Error("invalid type for opts.hash, expecting Uint8Array or null");t=zo(t||{});const{size:i,backgroundColor:o}=t;e.width=e.height=i;const s=e.getContext("2d");if(!s)return;s.fillStyle=o,s.fillRect(0,0,e.width,e.height);const r=A()<.5?3:4,n=Array.apply(null,Array(r)).map((a,l)=>{const c=l===0?5+A()*25:l===1?70+A()*25:null;return{x:A()*i,y:A()*i,radius:5+A()*i*.25,type:Math.floor(A()*3),color:Xe(Ke(c))}}).sort((a,l)=>a.radius>l.radius?-1:1);for(let a=0;a<r;a++){const l=n[a],{x:c,y:h,radius:p,type:m,color:d}=l;switch(s.fillStyle=d,m){case 0:s.beginPath(),s.arc(c,h,p,0,2*Math.PI),s.fill();break;case 1:s.fillRect(c,h,p*2,p*2);break;case 2:ko(s,p*2,{x:c,y:h});break;default:throw new Error("shape is greater than 2, this should never happen")}}return e}var Y=function(t,e,i,o){var s=arguments.length,r=s<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(s<3?n(r):s>3?n(e,i,r):n(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};let F=class extends Ot{constructor(){super(...arguments),this.size=32,this.shape="circle",this.disableTooltip=!1,this.disableCopy=!1,this.justCopiedHash=!1}async copyHash(){this.disableCopy||(await navigator.clipboard.writeText(this.strHash),this.timeout&&clearTimeout(this.timeout),this.justCopiedHash=!0,this._tooltip.show(),this.timeout=setTimeout(()=>{this._tooltip.hide(),setTimeout(()=>{this.justCopiedHash=!1},100)},2e3))}get strHash(){return ti(this.hash)}updated(e){var i,o;super.updated(e),(e.has("hash")&&((i=e.get("hash"))==null?void 0:i.toString())!==((o=this.hash)==null?void 0:o.toString())||e.has("size")||e.has("value"))&&Ao({hash:this.hash,size:this.size},this._canvas)}renderCanvas(){return $` <canvas
      id="canvas"
      width="1"
      height="1"
      class=${pt({square:this.shape==="square",circle:this.shape==="circle"})}
    ></canvas>`}render(){return $`<div
      @click=${()=>this.copyHash()}
      style="${this.disableCopy?"":"cursor: pointer;"} flex-grow: 0"
    >
      <sl-tooltip
        id="tooltip"
        placement="top"
        .content=${this.justCopiedHash?we("Copied!"):`${this.strHash.substring(0,6)}...`}
        .trigger=${this.disableTooltip||this.justCopiedHash?"manual":"hover focus"}
        hoist
      >
        ${this.renderCanvas()}
      </sl-tooltip>
    </div>`}static get styles(){return R`
      :host {
        display: flex;
      }

      .square {
        border-radius: 0%;
      }
      .circle {
        border-radius: 50%;
      }
    `}};Y([u(ke("hash"))],F.prototype,"hash",void 0);Y([u({type:Number})],F.prototype,"size",void 0);Y([u({type:String})],F.prototype,"shape",void 0);Y([u({type:Boolean,attribute:"disable-tooltip"})],F.prototype,"disableTooltip",void 0);Y([u({type:Boolean,attribute:"disable-copy"})],F.prototype,"disableCopy",void 0);Y([at("#canvas")],F.prototype,"_canvas",void 0);Y([at("#tooltip")],F.prototype,"_tooltip",void 0);Y([Vt()],F.prototype,"justCopiedHash",void 0);F=Y([xe(),qt("holo-identicon")],F);var Po=R`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,U=class extends N{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}render(){const t=$`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${()=>this.hasError=!0}"
      />
    `;let e=$``;return this.initials?e=$`<div part="initials" class="avatar__initials">${this.initials}</div>`:e=$`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `,$`
      <div
        part="base"
        class=${pt({avatar:!0,"avatar--circle":this.shape==="circle","avatar--rounded":this.shape==="rounded","avatar--square":this.shape==="square"})}
        role="img"
        aria-label=${this.label}
      >
        ${this.image&&!this.hasError?t:e}
      </div>
    `}};U.styles=[ft,Po];U.dependencies={"sl-icon":W};f([Vt()],U.prototype,"hasError",2);f([u()],U.prototype,"image",2);f([u()],U.prototype,"label",2);f([u()],U.prototype,"initials",2);f([u()],U.prototype,"loading",2);f([u({reflect:!0})],U.prototype,"shape",2);f([yt("image")],U.prototype,"handleImageChange",1);U.define("sl-avatar");let et=class extends oi(Ot){constructor(){super(...arguments),this.size=32,this.disableTooltip=!1,this.disableCopy=!1}renderIdenticon(){return $` <div
      style=${ye({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
    >
      <holo-identicon
        .disableCopy=${this.disableCopy}
        .disableTooltip=${this.disableTooltip}
        .hash=${this.agentPubKey}
        .size=${this.size}
      >
      </holo-identicon>
      <div class="badge"><slot name="badge"></slot></div>
    </div>`}renderProfile(e){if(!e||!e.entry.fields.avatar)return this.renderIdenticon();const i=$`
      <div
        style=${ye({cursor:this.disableCopy?"":"pointer",position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
      >
        <sl-avatar
          .image=${e.entry.fields.avatar}
          style="--size: ${this.size}px;"
          @click=${()=>this.dispatchEvent(new CustomEvent("profile-clicked",{composed:!0,bubbles:!0,detail:{agentPubKey:this.agentPubKey}}))}
        >
        </sl-avatar>
        <div class="badge"><slot name="badge"></slot></div>
      </div>
    `;return $`
      <sl-tooltip
        id="tooltip"
        placement="top"
        .trigger=${this.disableTooltip?"manual":"hover focus"}
        hoist
        .content=${e.entry.nickname}
      >
        ${i}
      </sl-tooltip>
    `}render(){if(this.store.config.avatarMode==="identicon")return this.renderIdenticon();const e=this.store.profiles.get(this.agentPubKey).get();switch(e.status){case"pending":return $`<sl-skeleton
          effect="pulse"
          style="height: ${this.size}px; width: ${this.size}px"
        ></sl-skeleton>`;case"completed":return this.renderProfile(e.value);case"error":return $`
          <display-error
            tooltip
            .headline=${we("Error fetching the agent's avatar")}
            .error=${e.error}
          ></display-error>
        `}}};et.styles=[Ce,R`
      .badge {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    `];ut([u(ke("agent-pub-key"))],et.prototype,"agentPubKey",void 0);ut([u({type:Number})],et.prototype,"size",void 0);ut([u({type:Boolean,attribute:"disable-tooltip"})],et.prototype,"disableTooltip",void 0);ut([u({type:Boolean,attribute:"disable-copy"})],et.prototype,"disableCopy",void 0);ut([si({context:_o,subscribe:!0}),u()],et.prototype,"store",void 0);et=ut([xe(),qt("agent-avatar")],et);export{Ve as L,C as S,f as _,$e as a,ft as b,si as c,He as d,at as e,N as f,de as g,ke as h,Ee as i,fe as j,he as k,xe as l,pe as m,pt as n,Do as o,W as p,xo as q,Vt as r,Ce as s,_e as t,Pe as u,Tt as v,yt as w,Io as x,_o as y};
