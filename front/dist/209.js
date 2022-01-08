"use strict";(self.webpackChunkbrojoon=self.webpackChunkbrojoon||[]).push([[209],{9062:function(e,r,t){t.d(r,{Z:function(){return C}});var n=t(3366),i=t(7462),a=t(7294),o=(t(5697),t(6010)),s=t(7463),c=t(917),l=t(8216),u=t(6122),d=t(9602),h=t(1420);function f(e){return(0,h.Z)("MuiCircularProgress",e)}(0,t(1271).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var v=t(5893);const m=["className","color","disableShrink","size","style","thickness","value","variant"];let k,p,g,Z,w=e=>e;const x=(0,c.F4)(k||(k=w`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),S=(0,c.F4)(p||(p=w`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),b=(0,d.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,r[t.variant],r[`color${(0,l.Z)(t.color)}`]]}})((({ownerState:e,theme:r})=>(0,i.Z)({display:"inline-block"},"determinate"===e.variant&&{transition:r.transitions.create("transform")},"inherit"!==e.color&&{color:r.palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,c.iv)(g||(g=w`
      animation: ${0} 1.4s linear infinite;
    `),x))),y=(0,d.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),P=(0,d.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.circle,r[`circle${(0,l.Z)(t.variant)}`],t.disableShrink&&r.circleDisableShrink]}})((({ownerState:e,theme:r})=>(0,i.Z)({stroke:"currentColor"},"determinate"===e.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,c.iv)(Z||(Z=w`
      animation: ${0} 1.4s ease-in-out infinite;
    `),S)));var C=a.forwardRef((function(e,r){const t=(0,u.Z)({props:e,name:"MuiCircularProgress"}),{className:a,color:c="primary",disableShrink:d=!1,size:h=40,style:k,thickness:p=3.6,value:g=0,variant:Z="indeterminate"}=t,w=(0,n.Z)(t,m),x=(0,i.Z)({},t,{color:c,disableShrink:d,size:h,thickness:p,value:g,variant:Z}),S=(e=>{const{classes:r,variant:t,color:n,disableShrink:i}=e,a={root:["root",t,`color${(0,l.Z)(n)}`],svg:["svg"],circle:["circle",`circle${(0,l.Z)(t)}`,i&&"circleDisableShrink"]};return(0,s.Z)(a,f,r)})(x),C={},j={},D={};if("determinate"===Z){const e=2*Math.PI*((44-p)/2);C.strokeDasharray=e.toFixed(3),D["aria-valuenow"]=Math.round(g),C.strokeDashoffset=`${((100-g)/100*e).toFixed(3)}px`,j.transform="rotate(-90deg)"}return(0,v.jsx)(b,(0,i.Z)({className:(0,o.Z)(S.root,a),style:(0,i.Z)({width:h,height:h},j,k),ownerState:x,ref:r,role:"progressbar"},D,w,{children:(0,v.jsx)(y,{className:S.svg,ownerState:x,viewBox:"22 22 44 44",children:(0,v.jsx)(P,{className:S.circle,style:C,ownerState:x,cx:44,cy:44,r:(44-p)/2,fill:"none",strokeWidth:p})})}))}))},1209:function(e,r,t){t.r(r),t.d(r,{default:function(){return h}});var n,i,a,o=t(7294),s=t(9669),c=t.n(s),l=t(5977),u=t(9062),d=t(4524).Z.div(n||(i=["\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\twidth: 100%;\n\tflex-direction: column;\n\theight: 100vh;\n\n\tcolor: white;\n\n\t& .progress {\n\t\tcolor: white;\n\t}\n"],a||(a=i.slice(0)),n=Object.freeze(Object.defineProperties(i,{raw:{value:Object.freeze(a)}})))),h=function(){var e=(0,l.k6)();return setTimeout((function(){c().get("/api/users",{withCredentials:!0}).then((function(){e.push("/home")})).catch((function(){e.push("/login")}))}),1e3),o.createElement(d,null,o.createElement(u.Z,{className:"progress"}))}}}]);