"use strict";(self.webpackChunkbrojoon=self.webpackChunkbrojoon||[]).push([[658],{6425:function(t,e,n){n.d(e,{Z:function(){return f}});var r,a,o,l=n(7294),c=n(3720),i=n(4386),s=n(2658),u=n(4524),d=n(1508),p=(0,u.Z)(d.Z)(r||(a=["\n\twidth: 100%;\n\n\t& .app-bar {\n\t\tbackground-color: #272727;\n\t}\n\n\t& .header-text {\n\t\tflex-grow: 1;\n\t}\n"],o||(o=a.slice(0)),r=Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(o)}})))),m=n(5977),f=function(t){var e=t.content;return(0,m.UO)().id,l.createElement(l.Fragment,null,l.createElement(p,null,l.createElement(c.Z,{className:"app-bar",position:"static"},l.createElement(i.Z,null,l.createElement(s.Z,{className:"header-text",variant:"h6",component:"div"},e)))))}},7015:function(t,e,n){n.d(e,{Z:function(){return O}});var r,a,o=n(7294),l=n(9334),c=n(1298),i=n(2440),s=n(3564),u=n(2503),d=n(3727),p=n(2642),m=n(8619),f=n(1458),h=n(4524);function b(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var g,y=h.Z.div(r||(r=b(["\n\twidth: 280px;\n\theight: 100%;\n\tpadding: 30px 15px;\n\tbackground-color: #353636;\n\tborder-right: 1px solid #4f4f4f;\n\toverflow: hidden;\n\n\t& .search-input {\n\t\twidth: 100%;\n\t\toutline: none;\n\t\tresize: none;\n\t\tborder-radius: 4px;\n\t\tbackground: #bdbdbd;\n\t\tfont-size: 16px;\n\t\tfont-weight: bold;\n\t\tfont-family: monospace;\n\t\tcolor: black;\n\t\tborder: none;\n\t\tpadding: 0 15px;\n\t\theight: 40px;\n\t}\n\n\n\t& .header-wrapper {\n\t\tborder-top: 1px solid #4f4f4f;\n\t\tborder-bottom: 1px solid #4f4f4f;\n\t\tmargin: 10px 0;\n\t\tpadding: 14px 0 0;\n\t\theight: 80px;\n\t}\n\n\t& .channel-discover-wrapper {\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t}\n\n\t& .channel-discover-wrapper:hover {\n\t\tbackground-color: rgba(74,75,84,0.7);\n\t}\n\n\t& .fireicon {\n\t\tmargin-right: 15px;\n\t}\n\n\t& .channel-discover-btn {\n\t\tcolor: white;\n\t}\n\n\t& .channel-list-wrapper {\n\t\theight: 70%;\n\t}\n\n\t& .channel-list {\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t}\n\n\t& .channel-list:hover {\n\t\tbackground-color: rgba(74,75,84,0.7);\n\t}\n\n\t& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected {\n\t\tbackground-color: #666666 !important;\n\t}\n\n\t& .channel-list-btn {\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t}\n\n\t& .channel-list-text {\n\t\tcolor: white;\n\t\tmargin: 4px 0 4px 18px\n\t}\n\n\n\t\n\t& .footer {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\theight: 11%;\n\t}\n\n\t& .create-btn {\n\t\twidth: 180px;\n\t\theight: 35px;\n\t\tbackground-color: #597aff;\n\t\tborder-color: #597aff;\n\t\tfont-weight: bold;\n\t}\n\t\n\t\n\t& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected {\n\t\tbackground-color: #666666;\n\t}\n"]))),v=h.Z.div(a||(a=b(["\n  ...style;\n  background-color: #787c7f;\n  width: 8px;\n  border-radius: 5px;\n\n\t&:hover {\n\t\tbackground-color: white;\n\t}\n"]))),w=["style"];function x(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,o=[],l=!0,c=!1;try{for(n=n.call(t);!(l=(r=n.next()).done)&&(o.push(r.value),!e||o.length!==e);l=!0);}catch(t){c=!0,a=t}finally{try{l||null==n.return||n.return()}finally{if(c)throw a}}return o}}(t,e)||function(t,e){if(t){if("string"==typeof t)return E(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?E(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var O=function(){(0,u.ZP)("/api/users/alluser",s.Z).data;var t,e=(0,u.ZP)("/api/channels/myChannelList",s.Z).data,n=((0,u.ZP)("/api/users",s.Z).data,x((0,o.useState)(0),2)),r=n[0],a=n[1],h=x((0,o.useState)(""),2),b=h[0],E=h[1],O=(0,o.useCallback)((function(t,e){a(e)}),[r,a]),Z=(0,o.useCallback)((function(t){E(t.target.value)}),[]);b&&-1===b.indexOf("\\")&&(g=null==e?void 0:e.filter((function(t){var e=new RegExp(b,"gi");return t.name.match(e)})));var P=(0,o.useCallback)((function(t){return t?g:e}),[e]);return o.createElement(y,null,o.createElement("input",{className:"search-input",autoComplete:"off",onChange:Z,value:b}),o.createElement("div",{className:"header-wrapper"},o.createElement(d.rU,{to:"/channels"},o.createElement(i.Z,{className:"channel-discover-wrapper",component:"nav","aria-label":"main mailbox folders"},o.createElement(m.Z,{className:"channel-discover-btn",selected:0===r,onClick:function(t){return O(t,0)}},o.createElement(f.Z,{className:"fireicon"}),o.createElement(l.Z,{primary:"Discover"}))))),o.createElement("div",{className:"channel-list-wrapper"},o.createElement(c.ZP,{autoHide:!0,renderThumbVertical:function(t){t.style;var e=function(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}(t,w);return o.createElement(v,e)}},null===(t=P(b))||void 0===t?void 0:t.map((function(t,e){var n="";return 0===t.type?n="Public":1===t.type?n="Protected":2===t.type&&(n="Private"),o.createElement(d.rU,{to:"/channels/".concat(t.id),key:t.id},o.createElement(i.Z,{className:"channel-list",component:"nav","aria-label":"main mailbox folders"},o.createElement(m.Z,{className:"channel-list-btn",selected:r===e+1,onClick:function(t){return O(t,e+1)}},o.createElement(l.Z,{className:"channel-list-text",primary:t.name,secondary:n}))))})))),o.createElement("div",{className:"footer"},o.createElement(d.rU,{to:"/channels/create"},o.createElement(p.Z,{className:"create-btn",variant:"contained"},"CREATE  +"))))}},3658:function(t,e,n){n.r(e),n.d(e,{default:function(){return lt}});var r,a,o=n(7294),l=n(5725),c=n(2643),i=n(2658),s=n(7797),u=n(1298),d=n(2503),p=n(3564),m=n(5977),f=n(3595),h=n(9669),b=n.n(h),g=n(594),y=n(6867),v=n(3981),w=n(7666),x=n(2642),E=n(270),O=n(6446),Z=n(2450),P=n(2961),j=n(175),k=n(4524);function C(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var N=k.Z.div(r||(r=C(["\n\tcolor: white;\n\tposition: fixed;\n\tleft: 0;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tz-index: 2000;\n\tbackground-color: rgba(30, 30, 030, 0.5);\n"]))),I=k.Z.div(a||(a=C(["\n\tposition: fixed;\n\ttop: 50%;\n\tleft: 50%;\n\twidth: 500px;\n\theight: 180px;\n\tbackground-color: #1e1e1e;\n\tcolor: #979797;\n\topacity: 1;\n\tborder: 1px solid #1e1e1e;\n\tborder-radius: 3px;\n\tpadding: 10px 20px 10px 20px;\n\tz-index: 3000;\n\ttransform: translate(-50%, -50%);\n\tboxShadow:\n\t\t0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);\n\n\t& .header {\n\t\tdisplay: flex;\n\t\tcolor: white;\n\t\tjustify-content: space-between;\n\t}\n\n\t& .close-icon {\n\t\tcolor: white;\n\t}\n\n\t& .body {\n\t\tdisplay: flex;\n\t}\n\n\t& .form-control {\n\t\twidth: 100%;\n\t\tcolor: white;\n\t\tmargin-top: 15px;\n\t}\n\n\t& .input-label {\n\t\tcolor: white;\n\t}\n\n\t& .visibility-icon {\n\t\tcolor: white;\n\t}\n\n\t& .join-btn {\n\t\twidth: 120px;\n\t\theight: 45px;\n\t\tbackground-color: #597aff;\n\t\tborder-color: #597aff;\n\t\tfont-weight: bold;\n\t\tmargin: 20px 0 0 10px;\n\t}\n\n\t& .password-error-text {\n\t\tcolor: red;\n\t\tfont-weight: 600;\n\t}\n\n\t& .css-1480iag-MuiInputBase-root-MuiInput-root {\n\t\tcolor: white;\n\t}\n\n\t& .css-1480iag-MuiInputBase-root-MuiInput-root:before {\n\t\tborder-bottom: 1px solid rgba(255, 255, 255, 0.6);\n\t}\n\n\t& .css-1480iag-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before {\n\t\tborder-bottom: 1px solid rgba(255, 255, 255, 1);\n\n\t}\n"]))),S=n(2132);function A(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function M(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?A(Object(n),!0).forEach((function(e){T(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):A(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function T(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function z(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,o=[],l=!0,c=!1;try{for(n=n.call(t);!(l=(r=n.next()).done)&&(o.push(r.value),!e||o.length!==e);l=!0);}catch(t){c=!0,a=t}finally{try{l||null==n.return||n.return()}finally{if(c)throw a}}return o}}(t,e)||function(t,e){if(t){if("string"==typeof t)return B(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?B(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function B(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var D,R,U,H,L=function(t){var e=t.channelPasswordModal,n=t.setChannelPasswordModal,r=t.channelPasswordRoomNumber,a=t.setChannelPasswordRoomNumber,l=(0,d.ZP)("/api/channels/myChannelList",p.Z),c=(l.data,l.mutate),i=(0,d.ZP)("/api/channels/allChannelList",p.Z),s=(i.data,i.mutate),u=z((0,o.useState)({password:"",showPassword:!1}),2),f=u[0],h=u[1],k=z((0,o.useState)(!1),2),C=k[0],A=k[1],B=(0,m.k6)(),D=(0,o.useCallback)((function(){h(M(M({},f),{},{showPassword:!f.showPassword}))}),[f,h]),R=(0,o.useCallback)((function(t){return function(e){h(M(M({},f),{},T({},t,e.target.value))),A(!1)}}),[f,h,C,A]),U=(0,o.useCallback)((function(t){t.preventDefault()}),[]),H=(0,o.useCallback)((function(t){t.preventDefault(),n(!1),h({password:"",showPassword:!1})}),[e,n]),L=(0,o.useCallback)((function(t){t.preventDefault(),b().post("/api/channels/join/".concat(r),{password:f.password},j.Z).then((function(t){h({password:"",showPassword:!1}),n(!1),s(),c().then((function(){B.push("/channels/".concat(r))})),a("")})).catch((function(t){"아이디 혹은 비밀번호가 틀림"===t.response.data.data.message?A(!0):S.Am.error(t.message,{autoClose:4e3,position:S.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"})}))}),[f,e,r,C]);return o.createElement(o.Fragment,null,o.createElement(N,{onClick:H}),o.createElement(I,null,o.createElement("div",{className:"header"},o.createElement("h2",null,"Unlock channel access password"),o.createElement(y.Z,{className:"close-icon","aria-label":"close",onClick:H},o.createElement(g.Z,null))),o.createElement("div",{className:"body"},o.createElement(O.Z,{className:"form-control",variant:"standard"},o.createElement(w.Z,{htmlFor:"standard-adornment-password",className:"input-label"},"What is the password?"),o.createElement(v.Z,{id:"standard-adornment-password",type:f.showPassword?"text":"password",value:f.password,onChange:R("password"),endAdornment:o.createElement(E.Z,{position:"end"},o.createElement(y.Z,{className:"visibility-icon ","aria-label":"toggle password visibility",onClick:D,onMouseDown:U},f.showPassword?o.createElement(Z.Z,null):o.createElement(P.Z,null)))})),o.createElement(x.Z,{className:"join-btn",onClick:L,variant:"contained"},"JOIN")),C&&o.createElement("span",{className:"password-error-text"},"Password is wrong")))},F=n(1508),G=n(5295);function $(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var _=(0,k.Z)(F.Z)(D||(D=$(["\n\tbackground-color: #121212;\n\tpadding: 15px 8px 15px 15px;\n\twidth: 100%;\n\theight: calc(100% - 64px);\n\n\t& .grid-container {\n\t\twidth: 100%;\n\t}\n"]))),V=k.Z.div(R||(R=$(["\n  ...style;\n  background-color: #787c7f;\n  width: 8px;\n  border-radius: 5px;\n\n\t&:hover {\n\t\tbackground-color: white;\n\t}\n"]))),W=(0,k.Z)(G.Z)(U||(U=$(["\n\tbackground-color: #1e1e1e;\n\twidth: ",";\n\tcolor: white;\n"])),(function(t){return t.ismobile?"95%":"100%"})),J=(0,k.Z)(i.Z)(H||(H=$(["\n\tdisplay:flex;\n\tjustify-content: space-between;\n"]))),Q=n(1852),q=["style"];function K(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,o=[],l=!0,c=!1;try{for(n=n.call(t);!(l=(r=n.next()).done)&&(o.push(r.value),!e||o.length!==e);l=!0);}catch(t){c=!0,a=t}finally{try{l||null==n.return||n.return()}finally{if(c)throw a}}return o}}(t,e)||function(t,e){if(t){if("string"==typeof t)return X(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?X(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function X(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var Y,tt,et,nt=function(){var t=(0,d.ZP)("/api/channels/allChannelList",p.Z),e=t.data,n=t.mutate,r=(0,d.ZP)("/api/channels/myChannelList",p.Z),a=r.data,h=r.mutate,g=K((0,o.useState)(!1),2),y=g[0],v=g[1],w=K((0,o.useState)(""),2),x=w[0],E=w[1],O=(0,m.k6)(),Z=(0,Q.useMediaQuery)({maxWidth:420}),P=(0,o.useCallback)((function(t,e){e.preventDefault(),b().post("/api/channels/join/".concat(t),{password:""},j.Z).then((function(){n(),h().then((function(){O.push("/channels/".concat(t))}))})).catch((function(t){403===t.response.data.code?S.Am.error("This room is not accessible",{autoClose:4e3,position:S.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"}):S.Am.error(t.message,{autoClose:4e3,position:S.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"})}))}),[]),k=(0,o.useCallback)((function(t,e){e.preventDefault(),v(!0),E(t)}),[y,v,x,E]);return o.createElement(_,{sx:{flexGrow:1}},o.createElement(u.ZP,{renderThumbVertical:function(t){t.style;var e=function(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}(t,q);return o.createElement(V,e)}},o.createElement(l.ZP,{className:"grid-container",container:!0,spacing:3},y?o.createElement(L,{channelPasswordModal:y,setChannelPasswordModal:v,channelPasswordRoomNumber:x,setChannelPasswordRoomNumber:E}):null,null==e?void 0:e.map((function(t){var e=!1;return null==a||a.forEach((function(n){if(n.id===t.id)return e=!0,null})),e||2===t.type?null:0===t.type?o.createElement(l.ZP,{item:!0,xs:12,sm:12,md:6,key:t.id},o.createElement(W,{ismobile:Z,className:"card",onClick:function(e){P(t.id,e)}},o.createElement(s.Z,null,o.createElement(c.Z,null,o.createElement(J,null,o.createElement("span",null,t.name)),o.createElement(i.Z,{variant:"body2",color:"hsla(0,0%,100%,.7)"},t.authId))))):1===t.type?o.createElement(l.ZP,{item:!0,xs:12,sm:12,md:6,key:t.id},o.createElement(W,{ismobile:Z,className:"card",onClick:function(e){k(t.id,e)}},o.createElement(s.Z,null,o.createElement(c.Z,null,o.createElement(J,null,o.createElement("span",null,t.name),o.createElement("span",null,o.createElement(f.Z,null))),o.createElement(i.Z,{variant:"body2",color:"hsla(0,0%,100%,.7)"},t.authId))))):void 0})))))},rt=n(6425),at=k.Z.div(Y||(tt=["\n\twidth: 100%;\n"],et||(et=tt.slice(0)),Y=Object.freeze(Object.defineProperties(tt,{raw:{value:Object.freeze(et)}})))),ot=n(7015),lt=function(){return o.createElement(o.Fragment,null,o.createElement(ot.Z,null),o.createElement(at,null,o.createElement(rt.Z,{content:"Discover some channels"}),o.createElement(nt,null)))}}}]);