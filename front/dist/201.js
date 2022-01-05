"use strict";(self.webpackChunkbrojoon=self.webpackChunkbrojoon||[]).push([[201],{5089:function(t,e,n){var o=n(5318);e.Z=void 0;var a=o(n(4938)),r=n(5893),i=(0,a.default)((0,r.jsx)("path",{d:"M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"}),"EmojiEvents");e.Z=i},2642:function(t,e,n){n.d(e,{Z:function(){return Z}});var o=n(3366),a=n(7462),r=n(7294),i=(n(5697),n(6010)),l=n(7463),s=n(1796),c=n(9602),d=n(6122),u=n(6637),p=n(8216),m=n(1420);function f(t){return(0,m.Z)("MuiButton",t)}var h=(0,n(1271).Z)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","contained","containedInherit","containedPrimary","containedSecondary","disableElevation","focusVisible","disabled","colorInherit","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]),b=n(5893);const v=["children","color","component","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],g=t=>(0,a.Z)({},"small"===t.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===t.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===t.size&&{"& > *:nth-of-type(1)":{fontSize:22}}),x=(0,c.ZP)(u.Z,{shouldForwardProp:t=>(0,c.FO)(t)||"classes"===t,name:"MuiButton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,e[n.variant],e[`${n.variant}${(0,p.Z)(n.color)}`],e[`size${(0,p.Z)(n.size)}`],e[`${n.variant}Size${(0,p.Z)(n.size)}`],"inherit"===n.color&&e.colorInherit,n.disableElevation&&e.disableElevation,n.fullWidth&&e.fullWidth]}})((({theme:t,ownerState:e})=>(0,a.Z)({},t.typography.button,{minWidth:64,padding:"6px 16px",borderRadius:t.shape.borderRadius,transition:t.transitions.create(["background-color","box-shadow","border-color","color"],{duration:t.transitions.duration.short}),"&:hover":(0,a.Z)({textDecoration:"none",backgroundColor:(0,s.Fq)(t.palette.text.primary,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===e.variant&&"inherit"!==e.color&&{backgroundColor:(0,s.Fq)(t.palette[e.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===e.variant&&"inherit"!==e.color&&{border:`1px solid ${t.palette[e.color].main}`,backgroundColor:(0,s.Fq)(t.palette[e.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===e.variant&&{backgroundColor:t.palette.grey.A100,boxShadow:t.shadows[4],"@media (hover: none)":{boxShadow:t.shadows[2],backgroundColor:t.palette.grey[300]}},"contained"===e.variant&&"inherit"!==e.color&&{backgroundColor:t.palette[e.color].dark,"@media (hover: none)":{backgroundColor:t.palette[e.color].main}}),"&:active":(0,a.Z)({},"contained"===e.variant&&{boxShadow:t.shadows[8]}),[`&.${h.focusVisible}`]:(0,a.Z)({},"contained"===e.variant&&{boxShadow:t.shadows[6]}),[`&.${h.disabled}`]:(0,a.Z)({color:t.palette.action.disabled},"outlined"===e.variant&&{border:`1px solid ${t.palette.action.disabledBackground}`},"outlined"===e.variant&&"secondary"===e.color&&{border:`1px solid ${t.palette.action.disabled}`},"contained"===e.variant&&{color:t.palette.action.disabled,boxShadow:t.shadows[0],backgroundColor:t.palette.action.disabledBackground})},"text"===e.variant&&{padding:"6px 8px"},"text"===e.variant&&"inherit"!==e.color&&{color:t.palette[e.color].main},"outlined"===e.variant&&{padding:"5px 15px",border:"1px solid "+("light"===t.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)")},"outlined"===e.variant&&"inherit"!==e.color&&{color:t.palette[e.color].main,border:`1px solid ${(0,s.Fq)(t.palette[e.color].main,.5)}`},"contained"===e.variant&&{color:t.palette.getContrastText(t.palette.grey[300]),backgroundColor:t.palette.grey[300],boxShadow:t.shadows[2]},"contained"===e.variant&&"inherit"!==e.color&&{color:t.palette[e.color].contrastText,backgroundColor:t.palette[e.color].main},"inherit"===e.color&&{color:"inherit",borderColor:"currentColor"},"small"===e.size&&"text"===e.variant&&{padding:"4px 5px",fontSize:t.typography.pxToRem(13)},"large"===e.size&&"text"===e.variant&&{padding:"8px 11px",fontSize:t.typography.pxToRem(15)},"small"===e.size&&"outlined"===e.variant&&{padding:"3px 9px",fontSize:t.typography.pxToRem(13)},"large"===e.size&&"outlined"===e.variant&&{padding:"7px 21px",fontSize:t.typography.pxToRem(15)},"small"===e.size&&"contained"===e.variant&&{padding:"4px 10px",fontSize:t.typography.pxToRem(13)},"large"===e.size&&"contained"===e.variant&&{padding:"8px 22px",fontSize:t.typography.pxToRem(15)},e.fullWidth&&{width:"100%"})),(({ownerState:t})=>t.disableElevation&&{boxShadow:"none","&:hover":{boxShadow:"none"},[`&.${h.focusVisible}`]:{boxShadow:"none"},"&:active":{boxShadow:"none"},[`&.${h.disabled}`]:{boxShadow:"none"}})),y=(0,c.ZP)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.startIcon,e[`iconSize${(0,p.Z)(n.size)}`]]}})((({ownerState:t})=>(0,a.Z)({display:"inherit",marginRight:8,marginLeft:-4},"small"===t.size&&{marginLeft:-2},g(t)))),S=(0,c.ZP)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.endIcon,e[`iconSize${(0,p.Z)(n.size)}`]]}})((({ownerState:t})=>(0,a.Z)({display:"inherit",marginRight:-4,marginLeft:8},"small"===t.size&&{marginRight:-2},g(t))));var Z=r.forwardRef((function(t,e){const n=(0,d.Z)({props:t,name:"MuiButton"}),{children:r,color:s="primary",component:c="button",disabled:u=!1,disableElevation:m=!1,disableFocusRipple:h=!1,endIcon:g,focusVisibleClassName:Z,fullWidth:w=!1,size:z="medium",startIcon:I,type:C,variant:E="text"}=n,P=(0,o.Z)(n,v),k=(0,a.Z)({},n,{color:s,component:c,disabled:u,disableElevation:m,disableFocusRipple:h,fullWidth:w,size:z,type:C,variant:E}),R=(t=>{const{color:e,disableElevation:n,fullWidth:o,size:r,variant:i,classes:s}=t,c={root:["root",i,`${i}${(0,p.Z)(e)}`,`size${(0,p.Z)(r)}`,`${i}Size${(0,p.Z)(r)}`,"inherit"===e&&"colorInherit",n&&"disableElevation",o&&"fullWidth"],label:["label"],startIcon:["startIcon",`iconSize${(0,p.Z)(r)}`],endIcon:["endIcon",`iconSize${(0,p.Z)(r)}`]},d=(0,l.Z)(c,f,s);return(0,a.Z)({},s,d)})(k),A=I&&(0,b.jsx)(y,{className:R.startIcon,ownerState:k,children:I}),$=g&&(0,b.jsx)(S,{className:R.endIcon,ownerState:k,children:g});return(0,b.jsxs)(x,(0,a.Z)({ownerState:k,component:c,disabled:u,focusRipple:!h,focusVisibleClassName:(0,i.Z)(R.focusVisible,Z),ref:e,type:C},P,{classes:R,children:[A,r,$]}))}))},9773:function(t,e,n){const o=n(7294).createContext({});e.Z=o},576:function(t,e,n){n.d(e,{ZP:function(){return $}});var o=n(3366),a=n(7462),r=n(7294),i=(n(5697),n(6010)),l=n(7463),s=n(3907),c=n(1796),d=n(9602),u=n(6122),p=n(6637),m=n(8502),f=n(8974),h=n(1705),b=n(9773),v=n(1420),g=n(1271);function x(t){return(0,v.Z)("MuiListItem",t)}var y=(0,g.Z)("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]),S=n(8686);function Z(t){return(0,v.Z)("MuiListItemSecondaryAction",t)}(0,g.Z)("MuiListItemSecondaryAction",["root","disableGutters"]);var w=n(5893);const z=["className"],I=(0,d.ZP)("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,n.disableGutters&&e.disableGutters]}})((({ownerState:t})=>(0,a.Z)({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},t.disableGutters&&{right:0}))),C=r.forwardRef((function(t,e){const n=(0,u.Z)({props:t,name:"MuiListItemSecondaryAction"}),{className:s}=n,c=(0,o.Z)(n,z),d=r.useContext(b.Z),p=(0,a.Z)({},n,{disableGutters:d.disableGutters}),m=(t=>{const{disableGutters:e,classes:n}=t,o={root:["root",e&&"disableGutters"]};return(0,l.Z)(o,Z,n)})(p);return(0,w.jsx)(I,(0,a.Z)({className:(0,i.Z)(m.root,s),ownerState:p,ref:e},c))}));C.muiName="ListItemSecondaryAction";var E=C;const P=["className"],k=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected"],R=(0,d.ZP)("div",{name:"MuiListItem",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,n.dense&&e.dense,"flex-start"===n.alignItems&&e.alignItemsFlexStart,n.divider&&e.divider,!n.disableGutters&&e.gutters,!n.disablePadding&&e.padding,n.button&&e.button,n.hasSecondaryAction&&e.secondaryAction]}})((({theme:t,ownerState:e})=>(0,a.Z)({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!e.disablePadding&&(0,a.Z)({paddingTop:8,paddingBottom:8},e.dense&&{paddingTop:4,paddingBottom:4},!e.disableGutters&&{paddingLeft:16,paddingRight:16},!!e.secondaryAction&&{paddingRight:48}),!!e.secondaryAction&&{[`& > .${S.Z.root}`]:{paddingRight:48}},{[`&.${y.focusVisible}`]:{backgroundColor:t.palette.action.focus},[`&.${y.selected}`]:{backgroundColor:(0,c.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity),[`&.${y.focusVisible}`]:{backgroundColor:(0,c.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},[`&.${y.disabled}`]:{opacity:t.palette.action.disabledOpacity}},"flex-start"===e.alignItems&&{alignItems:"flex-start"},e.divider&&{borderBottom:`1px solid ${t.palette.divider}`,backgroundClip:"padding-box"},e.button&&{transition:t.transitions.create("background-color",{duration:t.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:t.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${y.selected}:hover`]:{backgroundColor:(0,c.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(0,c.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity)}}},e.hasSecondaryAction&&{paddingRight:48}))),A=(0,d.ZP)("li",{name:"MuiListItem",slot:"Container",overridesResolver:(t,e)=>e.container})({position:"relative"});var $=r.forwardRef((function(t,e){const n=(0,u.Z)({props:t,name:"MuiListItem"}),{alignItems:c="center",autoFocus:d=!1,button:v=!1,children:g,className:S,component:Z,components:z={},componentsProps:I={},ContainerComponent:C="li",ContainerProps:{className:$}={},dense:j=!1,disabled:N=!1,disableGutters:M=!1,disablePadding:L=!1,divider:O=!1,focusVisibleClassName:V,secondaryAction:F,selected:G=!1}=n,B=(0,o.Z)(n.ContainerProps,P),T=(0,o.Z)(n,k),W=r.useContext(b.Z),q={dense:j||W.dense||!1,alignItems:c,disableGutters:M},H=r.useRef(null);(0,f.Z)((()=>{d&&H.current&&H.current.focus()}),[d]);const U=r.Children.toArray(g),D=U.length&&(0,m.Z)(U[U.length-1],["ListItemSecondaryAction"]),Y=(0,a.Z)({},n,{alignItems:c,autoFocus:d,button:v,dense:q.dense,disabled:N,disableGutters:M,disablePadding:L,divider:O,hasSecondaryAction:D,selected:G}),_=(t=>{const{alignItems:e,button:n,classes:o,dense:a,disabled:r,disableGutters:i,disablePadding:s,divider:c,hasSecondaryAction:d,selected:u}=t,p={root:["root",a&&"dense",!i&&"gutters",!s&&"padding",c&&"divider",r&&"disabled",n&&"button","flex-start"===e&&"alignItemsFlexStart",d&&"secondaryAction",u&&"selected"],container:["container"]};return(0,l.Z)(p,x,o)})(Y),J=(0,h.Z)(H,e),K=z.Root||R,Q=I.root||{},X=(0,a.Z)({className:(0,i.Z)(_.root,Q.className,S),disabled:N},T);let tt=Z||"li";return v&&(X.component=Z||"div",X.focusVisibleClassName=(0,i.Z)(y.focusVisible,V),tt=p.Z),D?(tt=X.component||Z?tt:"div","li"===C&&("li"===tt?tt="div":"li"===X.component&&(X.component="div")),(0,w.jsx)(b.Z.Provider,{value:q,children:(0,w.jsxs)(A,(0,a.Z)({as:C,className:(0,i.Z)(_.container,$),ref:J,ownerState:Y},B,{children:[(0,w.jsx)(K,(0,a.Z)({},Q,!(0,s.Z)(K)&&{as:tt,ownerState:(0,a.Z)({},Y,Q.ownerState)},X,{children:U})),U.pop()]}))})):(0,w.jsx)(b.Z.Provider,{value:q,children:(0,w.jsxs)(K,(0,a.Z)({},Q,{as:tt,ref:J,ownerState:Y},!(0,s.Z)(K)&&{ownerState:(0,a.Z)({},Y,Q.ownerState)},X,{children:[U,F&&(0,w.jsx)(E,{children:F})]}))})}))},8686:function(t,e,n){n.d(e,{t:function(){return a}});var o=n(1420);function a(t){return(0,o.Z)("MuiListItemButton",t)}const r=(0,n(1271).Z)("MuiListItemButton",["root","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","selected"]);e.Z=r},201:function(t,e,n){n.r(e),n.d(e,{default:function(){return $}});var o,a,r,i,l,s=n(7294),c=n(9669),d=n.n(c),u=n(2642),p=n(3727),m=n(5977),f=n(576),h=n(5089),b=n(7109),v=n(2503),g=n(3564),x=n(2132),y=n(4524);function S(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var Z=y.Z.div(o||(o=S(["\n\tcolor: white;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n\twidth: 100%;\n\tfont-size: 30px;\n\theight: 100vh;\n\n\t& .wrapper {\n\t\tdisplay: flex;\n\t\tjustify-content: space-around;\n\t\talign-items: center;\n\t\twidth: 100%;\n\t}\n\n\t& .result-wrapper {\n\t\tdisplay: flex;\n\t\tmargin-bottom: 18px;\n\t}\n\n\t& .result-icon {\n\t\tfont-size: 45px;\n\t}\n\n\t& .result-winnert-text {\n\t\tfont-size: 30px;\n\t}\n\n\n\n\n"]))),w=y.Z.div(a||(a=S(["\n\tmargin-bottom: 15px;\n\n\t\n\t& .profile1-wrapper {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\twidth: 350px;\n\t\theight: 410px;\n\t\tborder: 1px solid rgba(57, 57, 57, 0.7);\n\t\tbackground-color: #1e1e1e;\n\t\twhite-space: overflow-wrap;\n\n\t}\n\n\t& .profile1-wrapper:hover {\n\t\tbackground: #666666;\n\t}\n\n\t& .avatar1 {\n\t\twidth: 250px;\n\t\theight: 250px;\n\t\tmargin-bottom: 8px;\n\t}\n\n\t& .profile1-text {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tcolor: white;\n\t}\n\t\n\n\n"]))),z=y.Z.div(r||(r=S(["\n\tmargin-bottom: 15px;\n\n\t& .profile2-wrapper {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\twidth: 350px;\n\t\theight: 410px;\n\t\tborder: 1px solid rgba(57, 57, 57, 0.7);\n\t\tbackground-color: #1e1e1e;\n\t\twhite-space: overflow-wrap;\n\t}\n\n\t& .profile2-wrapper:hover {\n\t\tbackground: #666666;\n\t}\n\n\t& .avatar2 {\n\t\twidth: 250px;\n\t\theight: 250px;\n\t\tmargin-bottom: 8px;\n\t}\n\n\t& .profile2-text {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tcolor: white;\n\t}\n\t\n"]))),I=y.Z.div(i||(i=S(["\n\tcolor: ",";\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n"])),(function(t){return t.winner})),C=y.Z.div(l||(l=S(["\n\tcolor: ",";\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n"])),(function(t){return t.winner}));function E(t,e,n,o,a,r,i){try{var l=t[r](i),s=l.value}catch(t){return void n(t)}l.done?e(s):Promise.resolve(s).then(o,a)}function P(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var r=t.apply(e,n);function i(t){E(r,o,a,i,l,"next",t)}function l(t){E(r,o,a,i,l,"throw",t)}i(void 0)}))}}function k(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,a,r=[],i=!0,l=!1;try{for(n=n.call(t);!(i=(o=n.next()).done)&&(r.push(o.value),!e||r.length!==e);i=!0);}catch(t){l=!0,a=t}finally{try{i||null==n.return||n.return()}finally{if(l)throw a}}return r}}(t,e)||function(t,e){if(t){if("string"==typeof t)return R(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?R(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var A={withCredentials:!0},$=function(t){var e=(0,m.UO)().id,n=k((0,s.useState)(""),2),o=n[0],a=n[1],r=k((0,s.useState)(""),2),i=r[0],l=r[1],c=k((0,s.useState)(0),2),y=c[0],S=c[1],E=k((0,s.useState)(0),2),R=E[0],$=E[1],j=k((0,s.useState)("".concat(t.match.params.winner)),2),N=j[0],M=j[1],L=k((0,s.useState)(""),2),O=L[0],V=L[1],F=k((0,s.useState)(""),2),G=F[0],B=F[1],T=k((0,s.useState)(""),2),W=T[0],q=T[1],H=k((0,s.useState)(""),2),U=H[0],D=H[1],Y=k((0,s.useState)(""),2),_=Y[0],J=Y[1],K=(0,v.ZP)("/api/users/alluser",g.Z).data;return(0,s.useEffect)((function(){o&&i&&(null==K||K.map((function(t){t.userId===o?(D(t.profile),V(t.username),N===o&&q(t.username)):t.userId===i&&(J(t.profile),B(t.username),N===i&&q(t.username))})))}),[o,i,N]),(0,s.useEffect)((function(){function t(){return(t=P(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d().get("/api/game/history/".concat(e),A).then((function(t){a(t.data.userId1),l(t.data.userId2),S(t.data.user1Point),$(t.data.user2Point),M(t.data.winner)})).catch((function(t){x.Am.error(t.message,{autoClose:4e3,position:x.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"})}));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}""===o&&function(){t.apply(this,arguments)}()}),[e,o]),s.createElement(Z,null,s.createElement("div",{className:"wrapper"},s.createElement(w,null,s.createElement(p.rU,{to:"/users/".concat(O)},s.createElement(f.ZP,{className:"profile1-wrapper",button:!0},s.createElement(b.Z,{className:"avatar1",src:U,alt:"Avatar"}),s.createElement(I,{winner:"".concat(N===o?"white":"red")},s.createElement("span",null,O),s.createElement("span",null,y," Point"))))),s.createElement("div",null,"VS"),s.createElement(z,null,s.createElement(p.rU,{to:"/users/".concat(G)},s.createElement(f.ZP,{className:"profile2-wrapper",button:!0},s.createElement(b.Z,{className:"avatar2",src:_,alt:"Avatar"}),s.createElement(C,{winner:"".concat(N===i?"white":"red")},s.createElement("span",null,G),s.createElement("span",null,R," Point")))))),s.createElement("div",{className:"result-wrapper"},s.createElement(h.Z,{className:"result-icon"}),s.createElement("div",{className:""},"승리자 : ",W||"무승부")),s.createElement("div",null,s.createElement(p.rU,{to:"/game"},s.createElement(u.Z,{variant:"contained"}," 매치 페이지로 이동 "))))}}}]);