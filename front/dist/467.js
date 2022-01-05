"use strict";(self.webpackChunkbrojoon=self.webpackChunkbrojoon||[]).push([[467],{1467:function(e,t,n){n.r(t),n.d(t,{default:function(){return Y}});var r,a,o,l,i=n(7294),c=n(4524),s=n(2583),u=n(9602),m=n(1781);function d(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var f=c.Z.div(r||(r=d(["\n\twidth: 55px;\n\tflex-shrink: 0;\n\tborder-right: '5px solid #121212';\n\n\t& .fab-wrapper {\n\t\tbackground: #4d4d4d;\n\t\tmargin-top: 8px;\n\t\twidth: 30px;\n\t\theight: 1px;\n\t}\n"]))),p=c.Z.div(a||(a=d(["\n\tposition: fixed;\n\tleft : 0;\n\theight : 100%;\n\twidth: 55px;\n\tbackground-color: #363636;\n\tfont-size: 50px;\n\tdisplay: flex;\n"]))),h=c.Z.div(o||(o=d(["\n\twidth: 50px;\n\tdisplay: flex;\n\talign-items: center;\n\tflex-direction: column;\n\tmargin-top: 15px;\n\n\t.sideBarIcon {\n\t\tfont-size: 28px;\n\t\twidth: 45px;\n\t\theight: 45px;\n\t\tbox-shadow: none;\n\t\tmargin-top: 10px;\n\t}\n\n\t.sideBarIcon:hover {\n\t\tbackground-color: #4a4b54;\n\n\n\t}\t\n\t\n\t.sideBarIconLast {\n\t\tposition: fixed;\n\t\tbottom: 5px;\n\t\tleft: 5px;\n\t\twidth: 45px;\n\t\theight: 45px;\n\t\tbox-shadow: none;\n\t}\n\n\t.sideBarIconLast:hover {\n\t\tbackground-color: #4a4b54;\n\n\t}\n\t\n"]))),b=(0,u.ZP)(s.Z)((function(e){var t=e.theme;return{marginBottom:"15px",cursor:"pointer","& .MuiBadge-badge":{backgroundColor:"#44b700",color:"#44b700",boxShadow:"0 0 0 2px ".concat(t.palette.background.paper),"&::after":{position:"absolute",top:0,left:0,borderRadius:"50%",animation:"ripple 1.2s infinite ease-in-out",border:"1px solid currentColor",content:'""'}},"@keyframes ripple":{"0%":{transform:"scale(.8)",opacity:1},"100%":{transform:"scale(2.4)",opacity:0}}}})),E=(0,c.Z)(m.Z)(l||(l=d(["\n\tbackground-color: ",";\n\tbox-shadow: 0;\n\tcolor: white;\n\n"])),(function(e){return e.selected?"#4a4b54":"#363636"})),g=n(3074),Z=n(2701),v=n(3170),x=n(2684),P=n(3540),w=n(7109),O=n(3727),k=n(5977),I=n(9669),C=n.n(I),y=n(2132),A=(n(5202),n(2503)),B=n(3564),T=n(14),N=n(1749),S=n(1298),j=n(9621),L=n(3284),U=n(175);function W(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var H,z,G,R=function(){var e,t,n=(0,A.ZP)("/api/users",B.Z),r=n.data,a=(n.mutate,e=(0,i.useState)(-1),t=2,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],l=!0,i=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){i=!0,a=e}finally{try{l||null==n.return||n.return()}finally{if(i)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return W(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?W(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=a[0],l=a[1],c=(0,k.k6)(),s=function(e,t){l(t)},u=(0,i.useCallback)((function(){C().get("/api/auth/logout",U.Z).then((function(){(0,L.Z)().disconnect(),c.push("/login")})).catch((function(e){401===e.response.data.code?c.push("/login"):y.Am.error(e.message,{autoClose:4e3,position:y.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"})}))}),[]);return i.createElement(f,null,i.createElement(p,null,i.createElement(S.ZP,null,i.createElement(h,null,i.createElement(O.rU,{to:"/profile"},i.createElement(T.Z,{title:"Profile",placement:"right",arrow:!0},i.createElement(b,{className:"sideBarProfileIcon",onClick:function(e){s(0,-1)},overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},variant:"dot"},i.createElement(w.Z,{src:null==r?void 0:r.profile,alt:"Avatar"})))),i.createElement("div",{className:"fab-wrapper"}),i.createElement(O.rU,{to:"/home"},i.createElement(T.Z,{title:"Home",placement:"right",arrow:!0},i.createElement(E,{"aria-label":"add",className:"sideBarIcon",selected:0===o,onClick:function(e){s(0,0)}},i.createElement(j.Z,null)))),i.createElement(O.rU,{to:"/social"},i.createElement(T.Z,{title:"Social",placement:"right",arrow:!0},i.createElement(E,{"aria-label":"add",className:"sideBarIcon",selected:1===o,onClick:function(e){s(0,1)}},i.createElement(v.Z,null)))),i.createElement(O.rU,{to:"/channels"},i.createElement(T.Z,{title:"Channels",placement:"right",arrow:!0},i.createElement(E,{"aria-label":"add",className:"sideBarIcon",selected:2===o,onClick:function(e){s(0,2)}},i.createElement(g.Z,null)))),i.createElement(O.rU,{to:"/users"},i.createElement(T.Z,{title:"Users",placement:"right",arrow:!0},i.createElement(E,{"aria-label":"add",className:"sideBarIcon",selected:3===o,onClick:function(e){s(0,3)}},i.createElement(x.Z,null)))),i.createElement(O.rU,{to:"/achievements"},i.createElement(T.Z,{title:"Achievements",placement:"right",arrow:!0},i.createElement(E,{"aria-label":"add",className:"sideBarIcon",selected:4===o,onClick:function(e){s(0,4)}},i.createElement(N.Z,null)))),i.createElement(O.rU,{to:"/game"},i.createElement(T.Z,{title:"Game",placement:"right",arrow:!0},i.createElement(E,{"aria-label":"add",className:"sideBarIcon",selected:5===o,onClick:function(e){s(0,5)}},i.createElement(Z.Z,null)))),i.createElement(T.Z,{title:"Logout",placement:"right",arrow:!0},i.createElement(E,{"aria-label":"add",className:"sideBarIconLast",selected:6===o,onClick:u},i.createElement(P.Z,null)))))))},_=n(684),M=c.Z.div(H||(z=["\n\tdisplay: flex;\n\n"],G||(G=z.slice(0)),H=Object.freeze(Object.defineProperties(z,{raw:{value:Object.freeze(G)}})))),D=n(6103),J=(0,_.ZP)((function(){return Promise.all([n.e(268),n.e(471)]).then(n.bind(n,1471))})),$=(0,_.ZP)((function(){return Promise.all([n.e(852),n.e(565)]).then(n.bind(n,7565))})),q=(0,_.ZP)((function(){return n.e(670).then(n.bind(n,9670))})),F=(0,_.ZP)((function(){return Promise.all([n.e(59),n.e(268),n.e(641),n.e(463),n.e(12),n.e(30),n.e(158)]).then(n.bind(n,3158))})),K=(0,_.ZP)((function(){return Promise.all([n.e(59),n.e(606),n.e(704)]).then(n.bind(n,3556))})),Q=(0,_.ZP)((function(){return Promise.all([n.e(12),n.e(62)]).then(n.bind(n,5062))})),V=(0,_.ZP)((function(){return n.e(995).then(n.bind(n,3995))})),X=(0,_.ZP)((function(){return Promise.all([n.e(59),n.e(268),n.e(641),n.e(227),n.e(306),n.e(355)]).then(n.bind(n,4355))})),Y=function(){var e=(0,A.ZP)("/api/users",B.Z).data,t=(0,A.ZP)("/api/dms/dmlistOnlyIdJustArray",B.Z).data,n=(0,A.ZP)("/api/channels/myChannelListOnlyId",B.Z).data,r=(0,A.ZP)("/api/users/alluser",B.Z).data,a=(0,i.useContext)(D.J),o=a.setOnlineList,l=a.setOnGameList,c=(0,k.k6)();e&&""===e.username&&c.push("/login/first-step");var s=(0,L.Z)();return(0,i.useEffect)((function(){return null==s||s.on("onGameList",(function(e){l(e)})),function(){s.off("onGameList")}}),[s]),(0,i.useEffect)((function(){return null==s||s.on("onlineList",(function(e){o(e)})),function(){s.off("onlineList")}}),[s]),(0,i.useEffect)((function(){t&&n&&e&&s.emit("login",{userId:e.userId,username:e.username,Dms:t,channels:n})}),[s,t,n,e]),(0,i.useEffect)((function(){return null==s||s.on("notice",(function(e){3===e.match?y.Am.info("".concat(e.username,"가 게임을 신청 했습니다 DM을 확인해주세요..!"),{autoClose:7e3,position:y.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"dark"}):1===e.match&&y.Am.info("".concat(e.username,"과의 매치가 성사 되었습니다..!"),{autoClose:3e3,position:y.Am.POSITION.TOP_CENTER,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"dark"})})),function(){s.off("notice")}}),[s,r]),e?i.createElement(M,null,i.createElement(R,null),i.createElement(k.rs,null,i.createElement(k.AW,{exact:!0,path:"/home",component:J}),i.createElement(k.AW,{path:"/social",component:$}),i.createElement(k.AW,{path:"/channels",component:q}),i.createElement(k.AW,{exact:!0,path:"/users/:id",component:F}),i.createElement(k.AW,{exact:!0,path:"/users",component:K}),i.createElement(k.AW,{exact:!0,path:"/achievements",component:Q}),i.createElement(k.AW,{path:"/game",component:V}),i.createElement(k.AW,{exact:!0,path:"/profile/setting",component:X}),i.createElement(k.AW,{exact:!0,path:"/profile",component:F}))):null}},175:function(e,t){t.Z={withCredentials:!0}},3564:function(e,t,n){var r=n(9669),a=n.n(r),o=n(2132);t.Z=function(e){return a().get(e,{withCredentials:!0}).then((function(e){return e.data})).catch((function(e){return o.Am.error(e.message,{autoClose:4e3,position:o.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"}),401===e.response.data.code||"ban 유저"===e.response.data.data.message?setTimeout((function(){window.location.href="/login"}),4e3):setTimeout((function(){window.location.href="/home"}),4e3),!1}))}},3284:function(e,t,n){var r=n(4140),a=void 0;t.Z=function(){return a||(a=r.ZP.connect("http://13.209.169.93:8081")),a}}}]);