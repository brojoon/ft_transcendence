"use strict";(self.webpackChunkbrojoon=self.webpackChunkbrojoon||[]).push([[623],{3023:function(e,t){if("function"==typeof Symbol&&Symbol.for){var n=Symbol.for;n("react.element"),n("react.portal"),n("react.fragment"),n("react.strict_mode"),n("react.profiler"),n("react.provider"),n("react.context"),n("react.forward_ref"),n("react.suspense"),n("react.suspense_list"),n("react.memo"),n("react.lazy"),n("react.block"),n("react.server.block"),n("react.fundamental"),n("react.debug_trace_mode"),n("react.legacy_hidden")}},6607:function(e,t,n){n(3023)},2734:function(e,t,n){n.d(t,{Z:function(){return o}}),n(7294);var r=n(6682),a=n(247);function o(){return(0,r.Z)(a.Z)}},1377:function(e,t,n){n.d(t,{Z:function(){return h}});var r,a,o,l=n(7294),i=n(2642),c=n(6867),s=n(594),u=n(9572),d=n(4524);function m(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var p=d.Z.div(r||(r=m(["\n\tcolor: white;\n\tposition: fixed;\n\tleft: 0;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tz-index: 6000;\n\tbackground-color: rgba(30, 30, 030, 0.5);\n\n"]))),f=d.Z.div(a||(a=m(["\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\twidth: 400px;\n\tbackground-color: #1e1e1e;\n\tcolor: #979797;\n\topacity: 1;\n\tborder: 1px solid #1e1e1e;\n\tborder-radius: 4px;\n\tz-index: 7000;\n\ttransform: translate(-50%, -50%);\n\tbox-shadow:\n\t\t0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);\n\n\t& .container {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: center;\n\t\tbackground-color: #fec107;\n\t}\n\n\t& .header {\n\t\tmargin: 1px 10px 0 8px;\n\t\tfont-size: 20px;\n\t\tcolor: white;\n\t\tdisplay: flex;\n\t}\n\n\t& .header-content {\n\t\tmargin: 0 0 0 4px;\n\t\tline-height: 22px;\n\t}\n\n\t& .header .emoji {\n\t\tcolor: white;\n\t}\n\n\t& .content {\n\t\tmargin: 10px;\n\t}\n"]))),b=d.Z.div(o||(o=m(["\n\tdisplay: flex;\n\tjustify-content: flex-end;\n\tmargin-top: 15px;\n\tfont-weight: 600;\n\n\t& .noBtn {\n\t\tcolor: #979797;\n\t}\n"]))),h=function(e){var t=e.content,n=e.NoBtn,r=e.YesBtn,a=e.headerContent;return l.createElement(l.Fragment,null,l.createElement(p,{onClick:n}),l.createElement(f,null,l.createElement("div",{className:"container"},l.createElement("div",{className:"header"},l.createElement(u.Z,{className:"emoji"}),l.createElement("div",{className:"header-content"},a)),l.createElement("div",null,l.createElement(c.Z,{className:"emoji",onClick:n},l.createElement(s.Z,null)))),l.createElement("div",{className:"content"},t),l.createElement(b,null,l.createElement(i.Z,{className:"noBtn",onClick:n,variant:"text"},"NO"),l.createElement(i.Z,{onClick:r,variant:"text"},"YES"))))}},6136:function(e,t,n){n.r(t),n.d(t,{default:function(){return be}});var r=n(7294),a=n(2503),o=n(3564),l=n(1508),i=n(2640),c=(n(5697),n(5893));const s=r.createContext(null);function u(e){const{children:t,value:n}=e,a=function(){const[e,t]=r.useState(null);return r.useEffect((()=>{t(`mui-p-${Math.round(1e5*Math.random())}`)}),[]),e}(),o=r.useMemo((()=>({idPrefix:a,value:n})),[a,n]);return(0,c.jsx)(s.Provider,{value:o,children:t})}function d(){return r.useContext(s)}function m(e,t){const{idPrefix:n}=e;return null===n?null:`${e.idPrefix}-P-${t}`}function p(e,t){const{idPrefix:n}=e;return null===n?null:`${e.idPrefix}-T-${t}`}var f=n(7462),b=n(3366),h=n(3069);const x=["children"];var v=r.forwardRef((function(e,t){const{children:n}=e,a=(0,b.Z)(e,x),o=d();if(null===o)throw new TypeError("No TabContext provided");const l=r.Children.map(n,(e=>r.isValidElement(e)?r.cloneElement(e,{"aria-controls":m(o,e.props.value),id:p(o,e.props.value)}):null));return(0,c.jsx)(h.Z,(0,f.Z)({},a,{ref:t,value:o.value,children:l}))})),g=n(7109),Z=n(6010),E=n(9602),y=n(6122);const w=e=>e;var C=(()=>{let e=w;return{configure(t){e=t},generate:t=>e(t),reset(){e=w}}})();const I={active:"Mui-active",checked:"Mui-checked",completed:"Mui-completed",disabled:"Mui-disabled",error:"Mui-error",expanded:"Mui-expanded",focused:"Mui-focused",focusVisible:"Mui-focusVisible",required:"Mui-required",selected:"Mui-selected"};function P(e,t){return I[t]||`${C.generate(e)}-${t}`}function k(e){return P("MuiTabPanel",e)}!function(e,t){const n={};["root"].forEach((e=>{n[e]=P("MuiTabPanel",e)}))}();const O=["children","className","value"],N=(0,E.ZP)("div",{name:"MuiTabPanel",slot:"Root",overridesResolver:(e,t)=>t.root})((({theme:e})=>({padding:e.spacing(3)})));var j,A,B=r.forwardRef((function(e,t){const n=(0,y.Z)({props:e,name:"MuiTabPanel"}),{children:r,className:a,value:o}=n,l=(0,b.Z)(n,O),i=(0,f.Z)({},n),s=(e=>{const{classes:t}=e;return function(e,t,n){const r={};return Object.keys(e).forEach((a=>{r[a]=e[a].reduce(((e,r)=>(r&&(n&&n[r]&&e.push(n[r]),e.push(t(r))),e)),[]).join(" ")})),r}({root:["root"]},k,t)})(i),u=d();if(null===u)throw new TypeError("No TabContext provided");const h=m(u,o),x=p(u,o);return(0,c.jsx)(N,(0,f.Z)({"aria-labelledby":x,className:(0,Z.Z)(s.root,a),hidden:o!==u.value,id:h,ref:t,role:"tabpanel",ownerState:i},l,{children:o===u.value&&r}))})),T=n(2440),M=n(576),S=n(9334),L=n(1298),z=n(1377),D=n(9669),R=n.n(D),_=n(2642),G=n(6867),H=n(594),F=n(9572),$=n(4524);function Y(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var J,U,V,q,K,Q,W=$.Z.div(j||(j=Y(["\n\tcolor: white;\n\tposition: fixed;\n\tleft: 0;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tz-index: 6000;\n\tbackground-color: rgba(30, 30, 030, 0.5);\n\n"]))),X=$.Z.div(A||(A=Y(["\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\twidth: 400px;\n\tbackground-color: #1e1e1e;\n\tcolor: #979797;\n\topacity: 1;\n\tborder: 1px solid #1e1e1e;\n\tborder-radius: 4px;\n\tz-index: 7000;\n\ttransform: translate(-50%, -50%);\n\tbox-shadow:\n\t\t0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);\n\n\t& .wrapper {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: center;\n\t\tbackground-color: #fec107;\n\t}\n\n\t& .header {\n\t\tmargin: 1px 10px 0 8px;\n\t\tfont-size: 20px;\n\t\tcolor: white;\n\t\tdisplay: flex;\n\t}\n\n\t& .error-icon {\n\t\tcolor: white;\n\t}\n\n\t& .header-content {\n\t\tmargin: 0 0 0 4px;\n\t\tline-height: 22px;\n\t}\n\n\t& .close-icon {\n\t\tcolor: white;\n\t}\n\n\t& .body {\n\t\tmargin: 10px;\n\t}\n\n\t& .button-wrapper {\n\t\tdisplay: flex;\n\t\tjustify-content: flex-end;\n\t\tmargin-top: 15px;\n\t\tfont-weight: 600;\n\t}\n\n\t& .moderate-btn {\n\t\tfont-weight: 600\n\t}\n\n\t& .ban-btn {\n\t\tfont-weight: 600;\n\t\tcolor: red;\n\t}\n"]))),ee=function(e){var t=e.content,n=e.NoBtn,a=e.ModerateBtn,o=e.BanBtn,l=e.headerContent;return r.createElement(r.Fragment,null,r.createElement(W,{onClick:n}),r.createElement(X,null,r.createElement("div",{className:"wrapper"},r.createElement("div",{className:"header"},r.createElement(F.Z,{className:"error-icon"}),r.createElement("div",{className:"header-content"},l)),r.createElement("div",null,r.createElement(G.Z,{className:"close-icon",onClick:n},r.createElement(H.Z,null)))),r.createElement("div",{className:"body"},t),r.createElement("div",{className:"button-wrapper"},r.createElement(_.Z,{className:"moderate-btn",onClick:a,variant:"text"},"Moderator"),r.createElement(_.Z,{className:"ban-btn",onClick:o,variant:"text"},"Ban"))))},te=n(2658),ne=n(3727),re=n(175),ae=n(6103),oe=n(3284),le=n(2132),ie=(0,$.Z)(g.Z)(J||(U=["\n\tborder: ",";\n\n"],V||(V=U.slice(0)),J=Object.freeze(Object.defineProperties(U,{raw:{value:Object.freeze(V)}}))),(function(e){return e.isstate})),ce=function(){var e,t=(0,a.ZP)("/api/users/listAdmin",o.Z),n=t.data,l=(t.mutate,(0,r.useContext)(ae.J)),i=l.onlineList,c=l.onGameList;return r.createElement(L.ZP,null,r.createElement(T.Z,{sx:{width:"100%"},component:"nav","aria-label":"mailbox folders"},n&&(null==n?void 0:n.map((function(t){return e=0,c&&c[t.userId]&&(e=2),0===e&&(null==i||i.map((function(n){n.userId===t.userId&&(e=1)}))),r.createElement(M.ZP,{button:!0,key:t.userId},r.createElement(ie,{isstate:"".concat(e?1===e?"2px solid #1ed14b":"2px solid #FFD400":"2px solid #d63638"),src:t.profile,alt:"Avatar"}),r.createElement(S.Z,{primary:t.userId,style:{marginLeft:"12px"}}))})))))};function se(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var ue=$.Z.div(q||(q=se(["\n\tbackground-color: white;\n\theight: 100%;\n\n\t& .admin-page-header {\n\t\tbackground-color: #d3d3d3;\n\t\theight: 70px;\n\t\tfont-weight: 700;\n\t\tfont-size: 30px;\n\t\tline-height: 65px;\n\t\tbox-shadow:\n\t\t\trgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;\n\t}\n\n\t& .header-span {\n\t\tmargin-left: 50px;\n\t}\n"]))),de=(0,$.Z)(l.Z)(K||(K=se(["\n\twidth: 100%;\n\theight: calc(100% - 180px);\n\tmargin-top: 10px;\n\n\t& .tab-panel-2-list {\n\t\twidth: 100%;\n\t}\n\n\t& .tab-panel-2-text {\n\t\tmargin-left: 12px;\n\t}\n\n\t& .tab-panel-3-list {\n\t\twidth: 100%;\n\t}\n\n\t& .tab-panel-3-avatar {\n\t\tborder: 2px solid red;\n\t}\n\n\t& .tab-panel-3-text {\n\t\tmargin-left: 12px;\n\t}\n\n\t& .tab-panel-4-list {\n\t\twidth: 100%;\n\t}\n\n\t& .tab-panel-4-list-item {\n\t\tfont-size: 16px;\n\t\tmargin-top: 11px;\n\t\tcolor: gray;\n\t}\n\n\t& .tab-panel-4-avatar {\n\t\tborder: 2px solid red;\n\t\twidth: 38px;\n\t\theight: 38px;\n\t}\n\n\t& .tab-pannel-4-text {\n\t\tmargin-left: 12px;\n\t}\n\n\t& .mute-icon {\n\t\tcolor: red;\n\t}\n\n\t& .delete-channel-wrapper {\n\t\tdisplay: flex;\n\t\tjustify-content: flex-end;\n\t\tmargin-top: 20px;\n\t}\n\n\t& .delete-btn {\n\t\tbackground-color: red;\n\t\tfont-weight: 600;\n\t}\n\n\t& .tab-panel-5-list {\n\t\twidth: 100%;\n\t}\n\n\t& .tab-panel-5-avatar {\n\t\tborder: 2px solid red;\n\t}\n\n\t& .tab-panel-5-text {\n\t\tmargin-left: 12px;\n\t}\n\n\n\n"]))),me=(0,$.Z)(g.Z)(Q||(Q=se(["\n\tborder: ",";\n"])),(function(e){return e.isstate}));function pe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],l=!0,i=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);l=!0);}catch(e){i=!0,a=e}finally{try{l||null==n.return||n.return()}finally{if(i)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return fe(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?fe(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function fe(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var be=function(){var e,t=(0,a.ZP)("/api/users/alluser",o.Z),n=t.data,c=t.mutate,s=(0,a.ZP)("/api/users/listAdmin",o.Z),d=s.data,m=(s.mutate,(0,a.ZP)("/api/users/listBan",o.Z)),p=m.data,f=m.mutate,b=(0,a.ZP)("/api/users/listModerator",o.Z),h=b.data,x=b.mutate,Z=(0,a.ZP)("/api/channels/ownerApi/siteOwnerChannelList",o.Z),E=Z.data,y=(Z.mutate,(0,a.ZP)("/api/dms/dmlistOnlyIdJustArray",o.Z).data),w=(0,a.ZP)("/api/channels/myChannelListOnlyId",o.Z).data,C=(0,r.useContext)(ae.J),I=C.onlineList,P=C.setOnlineList,k=C.onGameList,O=C.setOnGameList,N=(0,a.ZP)("/api/users",o.Z).data,j=pe((0,r.useState)("1"),2),A=j[0],D=j[1],_=pe((0,r.useState)(!1),2),G=_[0],H=_[1],F=pe((0,r.useState)(!1),2),$=F[0],Y=F[1],J=pe((0,r.useState)(""),2),U=J[0],V=J[1],q=pe((0,r.useState)(""),2),K=q[0],Q=q[1],W=pe((0,r.useState)(!1),2),X=W[0],ie=W[1],se=pe((0,r.useState)(""),2),fe=se[0],be=se[1],he=(0,oe.Z)();(0,r.useEffect)((function(){y&&w&&N&&he.emit("login",{userId:N.userId,username:N.username,Dms:y,channels:w})}),[he,y,w,N]),(0,r.useEffect)((function(){return null==he||he.on("onGameList",(function(e){O(e)})),function(){he.off("onGameList")}}),[he]),(0,r.useEffect)((function(){return null==he||he.on("onlineList",(function(e){P(e)})),function(){he.off("onlineList")}}),[he]);var xe=(0,r.useCallback)((function(e,t){be(t),ie(!0)}),[X,fe]),ve=(0,r.useCallback)((function(e){e.preventDefault(),ie(!1)}),[G]),ge=(0,r.useCallback)((function(e,t){var n=!1;null==d||d.map((function(e){e.userId===(null==N?void 0:N.userId)&&(n=!0)})),n&&(V(t),H(!0))}),[U,d,N]),Ze=(0,r.useCallback)((function(e){e.preventDefault(),H(!1)}),[G]),Ee=(0,r.useCallback)((function(e,t){Q(t),Y(!0)}),[U]),ye=(0,r.useCallback)((function(e){e.preventDefault(),Y(!1)}),[$]),we=(0,r.useCallback)((function(e,t){D(t)}),[]),Ce=(0,r.useCallback)((function(e){e.preventDefault();var t=!1;null==d||d.map((function(e){e.userId===(null==N?void 0:N.userId)&&(t=!0)})),t&&fe&&R().get("/api/users/addModerator/".concat(fe),re.Z).then((function(){x(),c(),ie(!1),be("")})).catch((function(e){le.Am.error(e.message,{autoClose:4e3,position:le.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"})}))}),[fe,d,N]),Ie=(0,r.useCallback)((function(e){e.preventDefault(),U&&R().get("/api/users/removeModerator/".concat(U),re.Z).then((function(){x(),c(),H(!1),V("")})).catch((function(e){le.Am.error(e.message,{autoClose:4e3,position:le.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"})}))}),[U]),Pe=(0,r.useCallback)((function(e){e.preventDefault(),fe&&R().get("/api/users/addBan/".concat(fe),re.Z).then((function(){f(),c(),ie(!1),be("")})).catch((function(e){le.Am.error(e.message,{autoClose:4e3,position:le.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"})}))}),[fe]),ke=(0,r.useCallback)((function(e){e.preventDefault(),K&&R().get("/api/users/removeBan/".concat(K),re.Z).then((function(){f(),c(),Y(!1),Q("")})).catch((function(e){le.Am.error(e.message,{autoClose:4e3,position:le.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"})}))}),[K]);return d?r.createElement(ue,null,G&&r.createElement(z.Z,{headerContent:"Remove from moderator list",content:"Are you sure you want to remove this user from the moderator list?",NoBtn:Ze,YesBtn:Ie}),$&&r.createElement(z.Z,{headerContent:"Remove from ban list",content:"Are you sure you want to remove this user from the ban list?",NoBtn:ye,YesBtn:ke}),X&&r.createElement(ee,{headerContent:"Assign user privilege",content:"You can add you to the list of moderator or ban",NoBtn:ve,ModerateBtn:Ce,BanBtn:Pe}),r.createElement("div",{className:"admin-page-header"},r.createElement("span",{className:"header-span"},"Administrator")),r.createElement(de,{sx:{typography:"body1"}},r.createElement(u,{value:A},r.createElement(l.Z,{sx:{borderBottom:1,borderColor:"divider"}},r.createElement(v,{onChange:we,"aria-label":"lab API tabs example"},r.createElement(i.Z,{label:"AdminList",value:"1"}),r.createElement(i.Z,{label:"ModeratorList",value:"2"}),r.createElement(i.Z,{label:"UserList",value:"3"}),r.createElement(i.Z,{label:"ChannelList",value:"4"}),r.createElement(i.Z,{label:"BanList",value:"5"}))),r.createElement(B,{value:"1"},r.createElement(ce,null)),r.createElement(B,{value:"2"},r.createElement(L.ZP,null,r.createElement(T.Z,{className:"tab-panel-2-list",component:"nav","aria-label":"mailbox folders"},null==h?void 0:h.map((function(t){return e=0,k&&k[t.userId]&&(e=2),0===e&&(null==I||I.map((function(n){n.userId===t.userId&&(e=1)}))),r.createElement(M.ZP,{button:!0,onClick:function(e){ge(e,t.userId)},key:t.userId},r.createElement(me,{isstate:"".concat(e?1===e?"2px solid #1ed14b":"2px solid #FFD400":"2px solid #d63638"),src:t.profile,alt:"Avatar"}),r.createElement(S.Z,{className:"tab-panel-2-text",primary:t.userId}))}))))),r.createElement(B,{value:"3"},r.createElement(L.ZP,null,r.createElement(T.Z,{className:"tab-panel-3-list",component:"nav","aria-label":"mailbox folders"},null==n?void 0:n.map((function(t){var n=!0;if(null==p||p.map((function(e){e.userId===t.userId&&(n=!1)})),null==d||d.map((function(e){e.userId===t.userId&&(n=!1)})),null==h||h.map((function(e){e.userId===t.userId&&(n=!1)})),n)return e=0,k&&k[t.userId]&&(e=2),0===e&&(null==I||I.map((function(n){n.userId===t.userId&&(e=1)}))),r.createElement(M.ZP,{button:!0,onClick:function(e){xe(e,t.userId)},key:t.userId},r.createElement(me,{isstate:"".concat(e?1===e?"2px solid #1ed14b":"2px solid #FFD400":"2px solid #d63638"),src:t.profile,alt:"Avatar"}),r.createElement(S.Z,{className:"tab-panel-3-text",primary:t.userId}))}))))),r.createElement(B,{value:"4"},r.createElement(L.ZP,null,r.createElement(T.Z,{className:"tab-panel-4-list",component:"nav","aria-label":"mailbox folders"},null==E?void 0:E.map((function(e){return r.createElement(ne.rU,{to:"/admin/".concat(e.id),key:e.id},r.createElement(M.ZP,{button:!0},r.createElement(te.Z,null,e.name)))}))))),r.createElement(B,{value:"5"},r.createElement(L.ZP,null,r.createElement(T.Z,{className:"tab-panel-5-list",component:"nav","aria-label":"mailbox folders"},null==p?void 0:p.map((function(e){return r.createElement(M.ZP,{button:!0,onClick:function(t){Ee(t,e.userId)},key:e.userId},r.createElement(g.Z,{src:e.profile,alt:"Avatar"}),r.createElement(S.Z,{className:"tab-panel-5-text",primary:e.userId}))})))))))):null}},175:function(e,t){t.Z={withCredentials:!0}},3564:function(e,t,n){var r=n(9669),a=n.n(r),o=n(2132);t.Z=function(e){return a().get(e,{withCredentials:!0}).then((function(e){return e.data})).catch((function(e){return o.Am.error(e.message,{autoClose:4e3,position:o.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"}),401===e.response.data.code||"ban 유저"===e.response.data.data.message?setTimeout((function(){window.location.href="/login"}),4e3):setTimeout((function(){window.location.href="/home"}),4e3),!1}))}},3284:function(e,t,n){var r=n(4140),a=void 0;t.Z=function(){return a||(a=r.ZP.connect("http://13.209.169.93:8081")),a}}}]);