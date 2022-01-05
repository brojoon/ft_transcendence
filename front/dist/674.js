"use strict";(self.webpackChunkbrojoon=self.webpackChunkbrojoon||[]).push([[674],{1458:function(e,t,n){var r=n(5318);t.Z=void 0;var a=r(n(4938)),o=n(5893),l=(0,a.default)((0,o.jsx)("path",{d:"M7 11H1v2h6v-2zm2.17-3.24L7.05 5.64 5.64 7.05l2.12 2.12 1.41-1.41zM13 1h-2v6h2V1zm5.36 6.05-1.41-1.41-2.12 2.12 1.41 1.41 2.12-2.12zM17 11v2h6v-2h-6zm-5-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm2.83 7.24 2.12 2.12 1.41-1.41-2.12-2.12-1.41 1.41zm-9.19.71 1.41 1.41 2.12-2.12-1.41-1.41-2.12 2.12zM11 23h2v-6h-2v6z"}),"Flare");t.Z=l},2450:function(e,t,n){var r=n(5318);t.Z=void 0;var a=r(n(4938)),o=n(5893),l=(0,a.default)((0,o.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");t.Z=l},8619:function(e,t,n){var r=n(3366),a=n(7462),o=n(7294),l=(n(5697),n(6010)),i=n(7463),s=n(1796),c=n(9602),d=n(6122),u=n(6637),p=n(8974),m=n(1705),f=n(9773),b=n(8686),h=n(5893);const v=["alignItems","autoFocus","component","children","dense","disableGutters","divider","focusVisibleClassName","selected"],g=(0,c.ZP)(u.Z,{shouldForwardProp:e=>(0,c.FO)(e)||"classes"===e,name:"MuiListItemButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.dense&&t.dense,"flex-start"===n.alignItems&&t.alignItemsFlexStart,n.divider&&t.divider,!n.disableGutters&&t.gutters]}})((({theme:e,ownerState:t})=>(0,a.Z)({display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${b.Z.selected}`]:{backgroundColor:(0,s.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${b.Z.focusVisible}`]:{backgroundColor:(0,s.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${b.Z.selected}:hover`]:{backgroundColor:(0,s.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(0,s.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${b.Z.focusVisible}`]:{backgroundColor:e.palette.action.focus},[`&.${b.Z.disabled}`]:{opacity:e.palette.action.disabledOpacity}},t.divider&&{borderBottom:`1px solid ${e.palette.divider}`,backgroundClip:"padding-box"},"flex-start"===t.alignItems&&{alignItems:"flex-start"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.dense&&{paddingTop:4,paddingBottom:4}))),y=o.forwardRef((function(e,t){const n=(0,d.Z)({props:e,name:"MuiListItemButton"}),{alignItems:s="center",autoFocus:c=!1,component:u="div",children:y,dense:w=!1,disableGutters:x=!1,divider:Z=!1,focusVisibleClassName:E,selected:C=!1}=n,O=(0,r.Z)(n,v),k=o.useContext(f.Z),j={dense:w||k.dense||!1,alignItems:s,disableGutters:x},P=o.useRef(null);(0,p.Z)((()=>{c&&P.current&&P.current.focus()}),[c]);const I=(0,a.Z)({},n,{alignItems:s,dense:j.dense,disableGutters:x,divider:Z,selected:C}),S=(e=>{const{alignItems:t,classes:n,dense:r,disabled:o,disableGutters:l,divider:s,selected:c}=e,d={root:["root",r&&"dense",!l&&"gutters",s&&"divider",o&&"disabled","flex-start"===t&&"alignItemsFlexStart",c&&"selected"]},u=(0,i.Z)(d,b.t,n);return(0,a.Z)({},n,u)})(I),M=(0,m.Z)(P,t);return(0,h.jsx)(f.Z.Provider,{value:j,children:(0,h.jsx)(g,(0,a.Z)({ref:M,component:u,focusVisibleClassName:(0,l.Z)(S.focusVisible,E),ownerState:I},O,{classes:S,children:y}))})}));t.Z=y},2945:function(e,t,n){n.d(t,{Z:function(){return N}});var r,a,o,l,i,s=n(7294),c=n(1508),d=n(3981),u=n(7666),p=n(1275),m=n(8641),f=n(270),b=n(6867),h=n(2450),v=n(2961),g=n(4524),y=n(6446),w=n(2642);function x(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var Z=g.Z.div(r||(r=x(["\n\tdisplay: flex;\n\tjustify-content: space-between;\n\tcolor: ",";\n\tfont-size: 12px;\n\tmargin: 0 !important;\n\n\t& .name-length {\n\t\twhite-space: nowrap;\n\t}\n"])),(function(e){return e.textColor})),E=g.Z.span(a||(a=x(["\n\tmargin-left: 8px;\n\tcolor: #dd2c00;\n\tvisibility: ",";\n"])),(function(e){return e.visible})),C=(0,g.Z)(y.Z)(o||(o=x(["\n\twidth: 100%;\n\n\t& .input {\n\t\tcolor: white;\n\t}\n\n\t& .MuiInput-root{\n\t\tcolor: white;\n\t}\n\n\t& .css-1480iag-MuiInputBase-root-MuiInput-root:before {\n\t\tborder-bottom: 1px solid rgb(255, 255, 255, 0.6);\n\n\t}\n\n\t& .css-1480iag-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before {\n\t\t\tborder-bottom: 1px solid white;\n\t}\n\n"]))),O=(0,g.Z)(w.Z)(l||(l=x(["\n\twidth: 91px;\n\theight: 36px;\n\tmargin 5px 0 12px 8px;\n\tfont-weight:600;\n"]))),k=g.Z.div(i||(i=x(["\n\tcolor: #dd2c00;\n\tfont-weight: 600;\n\tfont-size: 12px;\n"])));function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){I(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],l=!0,i=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){i=!0,a=e}finally{try{l||null==n.return||n.return()}finally{if(i)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return M(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var N=function(e){var t=e.onSubmitChannelCreate,n=e.setVisibility,r=e.setName,a=e.name,o=e.value,l=e.setPasswordValues,i=e.createError,g=e.setCreateError,y=(0,s.useCallback)((function(e){e.preventDefault()}),[]),w=S((0,s.useState)(""),2),x=w[0],j=w[1],M=S((0,s.useState)("0"),2),N=M[0],z=M[1],A=S((0,s.useState)({password:"",showPassword:!1}),2),F=A[0],V=A[1],B=S((0,s.useState)(0),2),D=B[0],G=B[1],L=S((0,s.useState)(0),2),$=L[0],R=L[1];(0,s.useEffect)((function(){a&&(t(),j(""),z("0"),V({password:"",showPassword:!1}))}),[a]);var T=(0,s.useCallback)((function(){x.length>10||x.length<1?G(1):"1"==N&&(F.password.length>20||F.password.length<1)?R(1):(r(x),n(N),l(F))}),[x,N,F]),U=(0,s.useCallback)((function(e){j(e.target.value),D&&G(0),i&&g(0)}),[i,D]),q=(0,s.useCallback)((function(e){e.preventDefault(),z(e.target.value),V({password:"",showPassword:!1}),g(0)}),[]),H=(0,s.useCallback)((function(){V(P(P({},F),{},{showPassword:!F.showPassword}))}),[F,V]),J=(0,s.useCallback)((function(e){return function(t){R(0),V(P(P({},F),{},I({},e,t.target.value)))}}),[F,V]);return s.createElement(c.Z,{component:"form",sx:{"& > :not(style)":{m:1},width:"calc(100% - 15px)",padding:"5px 10px"},noValidate:!0,autoComplete:"off"},s.createElement(C,{variant:"standard"},s.createElement(u.Z,{className:"input",htmlFor:"component-simple"},"Name"),s.createElement(d.Z,{className:"input2",id:"component-simple",autoComplete:"off",value:x,onChange:U})),s.createElement(Z,{textColor:x.length>10?"#dd2c00":"hsla(0,0%,100%,.7)"},s.createElement(E,{visible:0==D?"hidden":"visible"},"Name length must be between 1 and 10"),s.createElement("span",{className:"name-length"}," ",x.length," / 10")),s.createElement(C,{variant:"standard"},s.createElement(u.Z,{className:"input",id:"demo-simple-select-standard-label"},"Visibility"),s.createElement(m.Z,{className:"input",labelId:"demo-simple-select-standard-label",id:"demo-simple-select-standard",value:N,onChange:q,label:"Visibility"},s.createElement(p.Z,{value:0},"Public"),s.createElement(p.Z,{value:1},"Protected"),s.createElement(p.Z,{value:2},"Private"))),1===parseInt(N)?s.createElement(C,{variant:"standard"},s.createElement(u.Z,{className:"input",htmlFor:"standard-adornment-password"},"Password"),s.createElement(d.Z,{id:"standard-adornment-password",autoComplete:"off",type:F.showPassword?"text":"password",value:F.password,onChange:J("password"),endAdornment:s.createElement(f.Z,{position:"end"},s.createElement(b.Z,{className:"input","aria-label":"toggle password visibility",onClick:H,onMouseDown:y},F.showPassword?s.createElement(h.Z,null):s.createElement(v.Z,null)))})):null,$?s.createElement(k,null,"Password length must be between 1 and 20"):"",s.createElement(O,{variant:"contained",onClick:T},o),i?1===i?s.createElement(k,null,"Failed either the channel already exists or there is a problem with the server"):s.createElement(k,null,"Failed to create channel"):"")}},7015:function(e,t,n){n.d(t,{Z:function(){return E}});var r,a,o=n(7294),l=n(9334),i=n(1298),s=n(2440),c=n(3564),d=n(2503),u=n(3727),p=n(2642),m=n(8619),f=n(1458),b=n(4524);function h(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var v,g=b.Z.div(r||(r=h(["\n\twidth: 280px;\n\theight: 100%;\n\tpadding: 30px 15px;\n\tbackground-color: #353636;\n\tborder-right: 1px solid #4f4f4f;\n\toverflow: hidden;\n\n\t& .search-input {\n\t\twidth: 100%;\n\t\toutline: none;\n\t\tresize: none;\n\t\tborder-radius: 4px;\n\t\tbackground: #bdbdbd;\n\t\tfont-size: 16px;\n\t\tfont-weight: bold;\n\t\tfont-family: monospace;\n\t\tcolor: black;\n\t\tborder: none;\n\t\tpadding: 0 15px;\n\t\theight: 40px;\n\t}\n\n\n\t& .header-wrapper {\n\t\tborder-top: 1px solid #4f4f4f;\n\t\tborder-bottom: 1px solid #4f4f4f;\n\t\tmargin: 10px 0;\n\t\tpadding: 14px 0 0;\n\t\theight: 80px;\n\t}\n\n\t& .channel-discover-wrapper {\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t}\n\n\t& .channel-discover-wrapper:hover {\n\t\tbackground-color: rgba(74,75,84,0.7);\n\t}\n\n\t& .fireicon {\n\t\tmargin-right: 15px;\n\t}\n\n\t& .channel-discover-btn {\n\t\tcolor: white;\n\t}\n\n\t& .channel-list-wrapper {\n\t\theight: 70%;\n\t}\n\n\t& .channel-list {\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t}\n\n\t& .channel-list:hover {\n\t\tbackground-color: rgba(74,75,84,0.7);\n\t}\n\n\t& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected {\n\t\tbackground-color: #666666 !important;\n\t}\n\n\t& .channel-list-btn {\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t}\n\n\t& .channel-list-text {\n\t\tcolor: white;\n\t\tmargin: 4px 0 4px 18px\n\t}\n\n\n\t\n\t& .footer {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\theight: 11%;\n\t}\n\n\t& .create-btn {\n\t\twidth: 180px;\n\t\theight: 35px;\n\t\tbackground-color: #597aff;\n\t\tborder-color: #597aff;\n\t\tfont-weight: bold;\n\t}\n\t\n\t\n\t& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected {\n\t\tbackground-color: #666666;\n\t}\n"]))),y=b.Z.div(a||(a=h(["\n  ...style;\n  background-color: #787c7f;\n  width: 8px;\n  border-radius: 5px;\n\n\t&:hover {\n\t\tbackground-color: white;\n\t}\n"]))),w=["style"];function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],l=!0,i=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){i=!0,a=e}finally{try{l||null==n.return||n.return()}finally{if(i)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return Z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Z(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var E=function(){(0,d.ZP)("/api/users/alluser",c.Z).data;var e,t=(0,d.ZP)("/api/channels/myChannelList",c.Z).data,n=((0,d.ZP)("/api/users",c.Z).data,x((0,o.useState)(0),2)),r=n[0],a=n[1],b=x((0,o.useState)(""),2),h=b[0],Z=b[1],E=(0,o.useCallback)((function(e,t){a(t)}),[r,a]),C=(0,o.useCallback)((function(e){Z(e.target.value)}),[]);h&&-1===h.indexOf("\\")&&(v=null==t?void 0:t.filter((function(e){var t=new RegExp(h,"gi");return e.name.match(t)})));var O=(0,o.useCallback)((function(e){return e?v:t}),[t]);return o.createElement(g,null,o.createElement("input",{className:"search-input",autoComplete:"off",onChange:C,value:h}),o.createElement("div",{className:"header-wrapper"},o.createElement(u.rU,{to:"/channels"},o.createElement(s.Z,{className:"channel-discover-wrapper",component:"nav","aria-label":"main mailbox folders"},o.createElement(m.Z,{className:"channel-discover-btn",selected:0===r,onClick:function(e){return E(e,0)}},o.createElement(f.Z,{className:"fireicon"}),o.createElement(l.Z,{primary:"Discover"}))))),o.createElement("div",{className:"channel-list-wrapper"},o.createElement(i.ZP,{autoHide:!0,renderThumbVertical:function(e){e.style;var t=function(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}(e,w);return o.createElement(y,t)}},null===(e=O(h))||void 0===e?void 0:e.map((function(e,t){var n="";return 0===e.type?n="Public":1===e.type?n="Protected":2===e.type&&(n="Private"),o.createElement(u.rU,{to:"/channels/".concat(e.id),key:e.id},o.createElement(s.Z,{className:"channel-list",component:"nav","aria-label":"main mailbox folders"},o.createElement(m.Z,{className:"channel-list-btn",selected:r===t+1,onClick:function(e){return E(e,t+1)}},o.createElement(l.Z,{className:"channel-list-text",primary:e.name,secondary:n}))))})))),o.createElement("div",{className:"footer"},o.createElement(u.rU,{to:"/channels/create"},o.createElement(p.Z,{className:"create-btn",variant:"contained"},"CREATE  +"))))}}}]);