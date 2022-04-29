"use strict";(self.webpackChunkbrojoon=self.webpackChunkbrojoon||[]).push([[467],{1467:function(e,t,n){n.r(t),n.d(t,{default:function(){return Y}});var r,a,o,i,l=n(7294),c=n(4524),s=n(2583),u=n(9602),m=n(1781);function d(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var f=c.Z.div(r||(r=d(["\n\twidth: 55px;\n\tflex-shrink: 0;\n\tborder-right: '5px solid #121212';\n\n\t& .fab-wrapper {\n\t\tbackground: #4d4d4d;\n\t\tmargin-top: 8px;\n\t\twidth: 30px;\n\t\theight: 1px;\n\t}\n"]))),p=c.Z.div(a||(a=d(["\n\tposition: fixed;\n\tleft : 0;\n\theight : 100%;\n\twidth: 55px;\n\tbackground-color: #363636;\n\tfont-size: 50px;\n\tdisplay: flex;\n"]))),h=c.Z.div(o||(o=d(["\n\twidth: 50px;\n\tdisplay: flex;\n\talign-items: center;\n\tflex-direction: column;\n\tmargin-top: 15px;\n\n\t.sideBarIcon {\n\t\tfont-size: 28px;\n\t\twidth: 45px;\n\t\theight: 45px;\n\t\tbox-shadow: none;\n\t\tmargin-top: 10px;\n\t}\n\n\t.sideBarIcon:hover {\n\t\tbackground-color: #4a4b54;\n\n\n\t}\t\n\t\n\t.sideBarIconLast {\n\t\tposition: fixed;\n\t\tbottom: 5px;\n\t\tleft: 5px;\n\t\twidth: 45px;\n\t\theight: 45px;\n\t\tbox-shadow: none;\n\t}\n\n\t.sideBarIconLast:hover {\n\t\tbackground-color: #4a4b54;\n\n\t}\n\t\n"]))),b=(0,u.ZP)(s.Z)((function(e){var t=e.theme;return{marginBottom:"15px",cursor:"pointer","& .MuiBadge-badge":{backgroundColor:"#44b700",color:"#44b700",boxShadow:"0 0 0 2px ".concat(t.palette.background.paper),"&::after":{position:"absolute",top:0,left:0,borderRadius:"50%",animation:"ripple 1.2s infinite ease-in-out",border:"1px solid currentColor",content:'""'}},"@keyframes ripple":{"0%":{transform:"scale(.8)",opacity:1},"100%":{transform:"scale(2.4)",opacity:0}}}})),g=(0,c.Z)(m.Z)(i||(i=d(["\n\tbackground-color: ",";\n\tbox-shadow: 0;\n\tcolor: white;\n\n"])),(function(e){return e.selected?"#4a4b54":"#363636"})),E=n(3074),Z=n(2701),x=n(3170),v=n(2684),P=n(3540),w=n(7109),O=n(3727),I=n(5977),k=n(9669),C=n.n(k),y=n(2132),A=(n(5202),n(2503)),B=n(3564),T=n(14),N=n(1749),S=n(1298),L=n(9621),j=n(3284),U=n(175),W=n(6103);function G(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var H,z,R,_=function(){var e,t,n=(0,A.ZP)("/api/users",B.Z),r=n.data,a=(n.mutate,(0,l.useContext)(W.J).onGameList),o=(e=(0,l.useState)(-1),t=2,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,l=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){l=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(l)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return G(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?G(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[0],c=o[1],s=(0,I.k6)(),u=function(e,t){c(t)},m=(0,l.useCallback)((function(){C().get("/api/auth/logout",U.Z).then((function(){(0,j.Z)().disconnect(),s.push("/login")})).catch((function(e){401===e.response.data.code?s.push("/login"):y.Am.error(e.message,{autoClose:3e3,position:y.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"})}))}),[]);return l.createElement(f,null,l.createElement(p,null,l.createElement(S.ZP,null,l.createElement(h,null,l.createElement(O.rU,{to:"/profile"},l.createElement(T.Z,{title:"Profile",placement:"right",arrow:!0},l.createElement(b,{className:"sideBarProfileIcon",onClick:function(e){u(0,-1)},overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},variant:"dot"},l.createElement(w.Z,{src:null==r?void 0:r.profile,alt:"Avatar"})))),l.createElement("div",{className:"fab-wrapper"}),l.createElement(O.rU,{to:"/home"},l.createElement(T.Z,{title:"Home",placement:"right",arrow:!0},l.createElement(g,{"aria-label":"add",className:"sideBarIcon",selected:0===i,onClick:function(e){u(0,0)}},l.createElement(L.Z,null)))),l.createElement(O.rU,{to:"/social"},l.createElement(T.Z,{title:"Social",placement:"right",arrow:!0},l.createElement(g,{"aria-label":"add",className:"sideBarIcon",selected:1===i,onClick:function(e){u(0,1)}},l.createElement(x.Z,null)))),l.createElement(O.rU,{to:"/channels"},l.createElement(T.Z,{title:"Channels",placement:"right",arrow:!0},l.createElement(g,{"aria-label":"add",className:"sideBarIcon",selected:2===i,onClick:function(e){u(0,2)}},l.createElement(E.Z,null)))),l.createElement(O.rU,{to:"/users"},l.createElement(T.Z,{title:"Users",placement:"right",arrow:!0},l.createElement(g,{"aria-label":"add",className:"sideBarIcon",selected:3===i,onClick:function(e){u(0,3)}},l.createElement(v.Z,null)))),l.createElement(O.rU,{to:"/achievements"},l.createElement(T.Z,{title:"Achievements",placement:"right",arrow:!0},l.createElement(g,{"aria-label":"add",className:"sideBarIcon",selected:4===i,onClick:function(e){u(0,4)}},l.createElement(N.Z,null)))),r&&a&&!a[r.userId]&&l.createElement(O.rU,{to:"/game"},l.createElement(T.Z,{title:"Game",placement:"right",arrow:!0},l.createElement(g,{"aria-label":"add",className:"sideBarIcon",selected:5===i,onClick:function(e){u(0,5)}},l.createElement(Z.Z,null)))),l.createElement(T.Z,{title:"Logout",placement:"right",arrow:!0},l.createElement(g,{"aria-label":"add",className:"sideBarIconLast",selected:6===i,onClick:m},l.createElement(P.Z,null)))))))},J=n(684),M=c.Z.div(H||(z=["\n\tdisplay: flex;\n\n"],R||(R=z.slice(0)),H=Object.freeze(Object.defineProperties(z,{raw:{value:Object.freeze(R)}})))),D=(0,J.ZP)((function(){return Promise.all([n.e(852),n.e(268),n.e(471)]).then(n.bind(n,1471))})),$=(0,J.ZP)((function(){return Promise.all([n.e(852),n.e(565)]).then(n.bind(n,7565))})),q=(0,J.ZP)((function(){return n.e(670).then(n.bind(n,9670))})),F=(0,J.ZP)((function(){return Promise.all([n.e(852),n.e(59),n.e(268),n.e(641),n.e(463),n.e(12),n.e(740),n.e(158)]).then(n.bind(n,3158))})),K=(0,J.ZP)((function(){return Promise.all([n.e(59),n.e(606),n.e(704)]).then(n.bind(n,3556))})),Q=(0,J.ZP)((function(){return Promise.all([n.e(12),n.e(62)]).then(n.bind(n,5062))})),V=(0,J.ZP)((function(){return n.e(995).then(n.bind(n,3995))})),X=(0,J.ZP)((function(){return Promise.all([n.e(59),n.e(268),n.e(641),n.e(227),n.e(306),n.e(355)]).then(n.bind(n,4355))})),Y=function(){var e=(0,A.ZP)("/api/users",B.Z).data,t=(0,A.ZP)("/api/dms/dmlistOnlyIdJustArray",B.Z).data,n=(0,A.ZP)("/api/channels/myChannelListOnlyId",B.Z).data,r=(0,A.ZP)("/api/users/alluser",B.Z).data,a=(0,l.useContext)(W.J),o=a.setOnlineList,i=a.setOnGameList,c=(0,I.k6)();e&&""===e.username&&c.push("/login/first-step");var s=(0,j.Z)();return(0,l.useEffect)((function(){return null==s||s.on("onGameList",(function(e){i(e)})),function(){s.off("onGameList")}}),[s]),(0,l.useEffect)((function(){return null==s||s.on("onlineList",(function(e){o(e)})),function(){s.off("onlineList")}}),[s]),(0,l.useEffect)((function(){return null==s||s.on("isSiteBan",(function(){C().get("/api/auth/logout",U.Z).then((function(){(0,j.Z)().disconnect(),c.push("/login")})).catch((function(e){(0,j.Z)().disconnect(),c.push("/login")}))})),function(){s.off("isSiteBan")}}),[s]),(0,l.useEffect)((function(){t&&n&&e&&s.emit("login",{userId:e.userId,username:e.username,Dms:t,channels:n})}),[s,t,n,e]),(0,l.useEffect)((function(){return null==s||s.on("notice",(function(e){3===e.match?y.Am.info("".concat(e.username,"가 게임을 신청 했습니다 DM을 확인해주세요..!"),{autoClose:7e3,position:y.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"dark"}):1===e.match&&y.Am.info("".concat(e.username,"과의 매치가 성사 되었습니다..!"),{autoClose:3e3,position:y.Am.POSITION.TOP_CENTER,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"dark"})})),function(){s.off("notice")}}),[s,r]),e?l.createElement(M,null,l.createElement(_,null),l.createElement(I.rs,null,l.createElement(I.AW,{exact:!0,path:"/home",component:D}),l.createElement(I.AW,{path:"/social",component:$}),l.createElement(I.AW,{path:"/channels",component:q}),l.createElement(I.AW,{exact:!0,path:"/users/:id",component:F}),l.createElement(I.AW,{exact:!0,path:"/users",component:K}),l.createElement(I.AW,{exact:!0,path:"/achievements",component:Q}),l.createElement(I.AW,{path:"/game",component:V}),l.createElement(I.AW,{exact:!0,path:"/profile/setting",component:X}),l.createElement(I.AW,{exact:!0,path:"/profile",component:F}))):null}},175:function(e,t){t.Z={withCredentials:!0}},3564:function(e,t,n){var r=n(9669),a=n.n(r),o=n(2132);t.Z=function(e){return a().get(e,{withCredentials:!0}).then((function(e){return e.data})).catch((function(e){return o.Am.error(e.message,{autoClose:3e3,position:o.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"}),401===e.response.data.code||"ban 유저"===e.response.data.data.message?setTimeout((function(){window.location.href="/login"}),3e3):setTimeout((function(){window.location.href="/home"}),3e3),!1}))}},3284:function(e,t,n){var r=n(4140),a=void 0;t.Z=function(){return a||(a=r.ZP.connect("http://44.192.96.197:8081")),a}}}]);