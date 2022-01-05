"use strict";(self.webpackChunkbrojoon=self.webpackChunkbrojoon||[]).push([[566],{7449:function(t,e,n){n.d(e,{Z:function(){return s}});var r,a,o,l=n(7294),i=n(6307),c=n(4524).Z.div(r||(a=["\n\theight: 60px;\n\tbackground-color: #272727;\n\tpadding: 20px 6px 3px 16px;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\n\t& .chat-box-form {\n\t\twidth: 100%;\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t}\n\n\t& .chat-box-input {\n\t\twidth: 95%;\n\t\toutline: none;\n\t\tresize: none;\n\t\tborder-radius: 4px;\n\t\tbackground: #bdbdbd;\n\t\tfont-size: 16px;\n\t\tfont-weight: bold;\n\t\tfont-family: monospace;\n\t\theight: 37px;\n\t\tcolor: black;\n\t\tborder: none;\n\t\tpadding: 10px;\n\t}\n\n\t& .submit-btn {\n\t\tbackground: #272727;\n\t\tbox-shadow: none;\n\t\tborder: none;\n\t\tcolor: white;\n\t\tmargin-left: 10px;\n\t\tcursor: pointer;\n\t}\n"],o||(o=a.slice(0)),r=Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(o)}}))));function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var s=function(t){var e,n,r=t.chat,a=t.onSubmitChat,o=t.setChat,s=(e=(0,l.useState)(""),n=2,function(t){if(Array.isArray(t))return t}(e)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,o=[],l=!0,i=!1;try{for(n=n.call(t);!(l=(r=n.next()).done)&&(o.push(r.value),!e||o.length!==e);l=!0);}catch(t){i=!0,a=t}finally{try{l||null==n.return||n.return()}finally{if(i)throw a}}return o}}(e,n)||function(t,e){if(t){if("string"==typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),d=s[0],f=s[1],m=(0,l.useCallback)((function(t){f(t.target.value)}),[]);(0,l.useEffect)((function(){r&&(a(),f(""))}),[r,a]);var p=(0,l.useCallback)((function(t){t.preventDefault(),o(d)}),[d,a]);return l.createElement(c,null,l.createElement("form",{className:"chat-box-form"},l.createElement("input",{className:"chat-box-input",value:d,onChange:m}),l.createElement("button",{className:"submit-btn",onClick:p},l.createElement(i.Z,null))))}},4126:function(t,e,n){n.d(e,{Z:function(){return A}});var r,a,o,l,i=n(7294),c=n(9334),u=n(1298),s=n(2440),d=n(3564),f=n(2503),m=n(3727),p=n(8718),h=n(8619),b=n(4524),g=n(7109);function v(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var y,x=b.Z.div(r||(r=v(["\n\twidth: 300px;\n\theight: 100%;\n\tpadding: 30px 15px;\n\tbackground-color: #363636;\n\tborder-right: 1px solid #4f4f4f;\n\toverflow: hidden;\n\n\t& .search-input {\n\t\twidth: 100%;\n\t\toutline: none;\n\t\tresize: none;\n\t\tborder-radius: 4px;\n\t\tbackground: #bdbdbd;\n\t\tfont-size: 16px;\n\t\tfont-weight: bold;\n\t\tfont-family: monospace;\n\t\theight: 40px;\n\t\tcolor: black;\n\t\tborder: none;\n\t\tpadding: 0 12px;\n\t}\n\n\t& .friend-icon-wrapper {\n\t\tborder-top: 1px solid #4f4f4f;\n\t\tborder-bottom: 1px solid #4f4f4f;\n\t\tmargin: 10px 0;\n\t\tpadding: 14px 0 0;\n\t\theight: 80px;\n\t}\n\n\t& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected {\n\t\tbackground-color: #666666 !important;\n\t}\n\n\t& .friend-list-wrapper {\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t}\n\n\t& .friend-list-wrapper:hover {\n\t\tbackground-color: rgba(74,75,84,0.7);\n\t}\n\n\t& .friend-list-btn {\n\t\tcolor: white;\n\t}\n\n\t& .friend-list-icon {\n\t\tmargin-right: 20px;\n\t}\n"]))),w=b.Z.div(a||(a=v(["\n\theight: 79%;\n\n\t& .list {\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t}\n\n\t& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected {\n\t\tbackground-color: #666666 !important;\n\t}\n\n\t& .list:hover {\n\t\tbackground-color: rgba(74,75,84,0.7);\n\t}\n\n\t& .list-item-button {\n\t\tpadding: 8px;\n\t}\n\n\t& .user-avatar-id-wrapper {\n\t\tdisplay: flex;\n\n\t\talign-items: center;\n\t}\n\n\n\t& .user-id {\n\t\tmargin-left: 12px;\n\t\tcolor: white;\n\t}\n\n\n"]))),E=(0,b.Z)(g.Z)(o||(o=v(["\n\tborder: ",";\n\tmargin-left: 0;\n"])),(function(t){return t.isstate})),k=b.Z.div(l||(l=v(["\n  ...style;\n  background-color: #787c7f;\n  width: 8px;\n  border-radius: 5px;\n\n\t&:hover {\n\t\tbackground-color: white;\n\t}\n"]))),Z=n(6103),O=["style"];function I(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,o=[],l=!0,i=!1;try{for(n=n.call(t);!(l=(r=n.next()).done)&&(o.push(r.value),!e||o.length!==e);l=!0);}catch(t){i=!0,a=t}finally{try{l||null==n.return||n.return()}finally{if(i)throw a}}return o}}(t,e)||function(t,e){if(t){if("string"==typeof t)return j(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var A=function(){var t,e,n=(0,f.ZP)("/api/dms/dmlist",d.Z).data,r=(0,f.ZP)("/api/users/alluser",d.Z).data,a=(0,f.ZP)("/api/friend/blocklist",d.Z).data,o=I((0,i.useState)(0),2),l=o[0],b=o[1],g=I((0,i.useState)(""),2),v=g[0],j=g[1],A=(0,i.useContext)(Z.J),C=A.onlineList,S=A.onGameList,N=(0,i.useCallback)((function(t,e){b(e)}),[l,b]),P=(0,i.useCallback)((function(t){j(t.target.value)}),[]);v&&-1===v.indexOf("\\")&&(y=null==n?void 0:n.filter((function(t){var e=new RegExp(v,"gi");return t.username.match(e)})));var T=(0,i.useCallback)((function(t){return t?y:n}),[n]);return i.createElement(x,null,i.createElement("input",{className:"search-input",onChange:P,value:v,autoComplete:"off"}),i.createElement("div",{className:"friend-icon-wrapper"},i.createElement(m.rU,{to:"/social"},i.createElement(s.Z,{className:"friend-list-wrapper",component:"nav","aria-label":"main mailbox folders"},i.createElement(h.Z,{className:"friend-list-btn",selected:0===l,onClick:function(t){return N(t,0)}},i.createElement(p.Z,{className:"friend-list-icon"}),i.createElement(c.Z,{primary:"Friends"}))))),i.createElement(w,null,i.createElement(u.ZP,{autoHide:!0,renderThumbVertical:function(t){t.style;var e=function(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}(t,O);return i.createElement(k,e)}},i.createElement("div",null,null===(t=T(v))||void 0===t?void 0:t.map((function(t,n){var o=!1;if(null==a||a.map((function(e){e.userId2===t.userId&&(o=!0)})),!o)return i.createElement(m.rU,{to:"/social/dm/".concat(t.id),key:t.id},i.createElement(s.Z,{className:"list",component:"nav","aria-label":"main mailbox folders"},i.createElement(h.Z,{className:"list-item-button",selected:l===n+1,onClick:function(t){return N(t,n+1)}},null==r?void 0:r.map((function(n){if(n.userId===t.userId)return e=0,S&&S[n.userId]&&(e=2),0===e&&(null==C||C.map((function(t){t.userId===n.userId&&(e=1)}))),i.createElement("div",{className:"user-avatar-id-wrapper",key:t.id},i.createElement(E,{isstate:"".concat(e?1===e?"2px solid #1ed14b":"2px solid #FFD400":"2px solid #d63638"),src:n.profile,alt:"Avatar"}),i.createElement(c.Z,{className:"user-id",primary:n.username}))})))))}))))))}},9566:function(t,e,n){n.r(e),n.d(e,{default:function(){return Q}});var r,a,o,l,i,c,u=n(7449),s=n(7294),d=n(3720),f=n(4386),m=n(2658),p=n(2642),h=n(7109),b=n(2503),g=n(3564),v=n(5977),y=n(9529),x=n(9669),w=n.n(x),E=n(175),k=n(4524),Z=n(1508),O=(0,k.Z)(Z.Z)(r||(a=["\n\tflex-grow: 1;\n\n\t& .wrapper {\n\t\tposition: static;\n\t\tbackground-color: #272727;\n\t}\n\n\t& .user-profile-container {\n\t\tflex-grow: 1;\n\t}\n\n\t& .user-profile-wrapper {\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\talign-items: center;\n\t\twhite-space: nowrap;\n\t}\n\n\t& .avatar {\n\t\twidth: 40px;\n\t\theight: 40px;\n\t\tleft: -10px;\n\t}\n\n\t& .challenge-btn {\n\t\tbackground-color: rgba(22, 120, 209, 0.8);\n\t\tcolor: white;\n\t\twidth: 160px;\n\t\theight: 35px;\n\t\tpadding: 0 16px;\n\t\tfont-weight: bold;\n\t}\n\n\t& .challenge-btn:hover\t {\n\t\tbackground-color: rgba(22, 120, 209, 1);\n\t}\n\n\n\t& .challenge-block-btn {\n\t\twidth: 160px;\n\t\theight: 35px;\n\t\tpadding: 0 16px;\n\t\tbackground-color: #393939;\n\t\tfont-weight: bold;\n\t}\n\t& .watch-btn {\n\t\twidth: 160px;\n\t\theight: 35px;\n\t\tbackground-color: rgba(255, 212, 0, 0.9);\n\t\tfont-weight: bold;\n\t}\n\n\t& .watch-btn:hover {\n\t\tbackground-color: rgba(255, 212, 0, 1);\n\n\t}\n\n"],o||(o=a.slice(0)),r=Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(o)}})))),I=n(2132),j=n(6103),A=n(2961),C=function(){var t=(0,v.UO)().id,e=(0,b.ZP)("/api/users",g.Z).data,n=(0,b.ZP)("/api/dms/findDmUser/".concat(t),g.Z).data,r=(0,b.ZP)("/api/users/alluser",g.Z).data,a=(0,s.useContext)(j.J),o=(a.onlineList,a.onGameList),l=(0,v.k6)(),i=0;o&&n&&o[n]&&(i=2);var c=(0,s.useCallback)((function(t){t.preventDefault(),w().post("/api/dms/sendMessage/".concat(n,"/3/0"),{message:""},E.Z).then((function(t){l.push("/game/ping-pong/".concat(t.data))})).catch((function(t){"Block 상태"===t.response.data.data.message?I.Am.error("Cant challenge because you are blocked",{autoClose:4e3,position:I.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"}):I.Am.error(t.message,{autoClose:4e3,position:I.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"})}))}),[n,r]),u=(0,s.useCallback)((function(t){t.preventDefault(),o&&n&&l.push("/game/ping-pong/".concat(o[n]))}),[o]);return s.createElement(O,null,s.createElement(d.Z,{className:"wrapper"},s.createElement(f.Z,null,s.createElement(m.Z,{variant:"h6",component:"span",className:"user-profile-container"},null==r?void 0:r.map((function(t){if(t.userId==n)return s.createElement("div",{className:"user-profile-wrapper",key:n},s.createElement(h.Z,{className:"avatar",src:t.profile,alt:"Avatar"}),s.createElement("span",null,t.username))}))),2===i&&o&&e&&void 0===o[null==e?void 0:e.userId]?s.createElement(p.Z,{onClick:u,variant:"contained",className:"watch-btn"},"WATCH ",s.createElement(A.Z,null)):o&&e&&o[null==e?void 0:e.userId]?s.createElement(p.Z,{className:"challenge-block-btn",onClick:c,disabled:!0},"CHALLENGE ",s.createElement(y.Z,null)):s.createElement(p.Z,{className:"challenge-btn",onClick:c},"CHALLENGE ",s.createElement(y.Z,null)))))},S=n(1298);function N(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var P=k.Z.div(l||(l=N(["\n\tbackground: #1e1e1e;\n\twidth: 100%;\n\theight: 100%;\n\tpadding: 8px 0 8px 15px;\n\n\t& .chatList-wrapper {\n\t\tcolor: white; \n\t\tdisplay: flex;\n\t}\n\n\t& .chatList-profile-wrapper {\n\t\tmargin-right: 10px;\n\t}\n\n\t& .avatar {\n\t\twidth: 40px;\n\t\theight: 40px;\n\t\tmargin-bottom: 25px;\n\t}\n\n\t& .chat {\n\t\tmargin-top: 0;\n\t}\n\n  & .challenge-join-wrapper {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    width: 100%;\n  }\n\n  & .challenge-join-btn {\n    margin-right: 15px;\n    font-weight: 700;\n\n  }\n\n  & .challenge-join-block-btn {\n    margin-right: 15px;\n    font-weight: 700;\n\t\tbackground-color: #393939;\n  }\n"]))),T=k.Z.div(i||(i=N(["\n  display: flex;\n  justify-content: center;\n  flex: 1;\n  width: 100%;\n  position: sticky;\n  top: 14px;\n\n  & button {\n    font-weight: bold;\n    font-size: 13px;\n    height: 28px;\n\t\tcolor: white;\n    line-height: 27px;\n    padding: 0 16px;\n    z-index: 2;\n    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);\n    box-shadow: 0 0 0 1px var(--saf-0), 0 1px 3px 0 rgba(0, 0, 0, 0.08);\n    border-radius: 24px;\n    position: relative;\n    top: -13px;\n    background: #363636;\n    border: none;\n    outline: none;\n  }\n"]))),z=k.Z.div(c||(c=N(["\n  ...style;\n  background-color: #787c7f;\n  width: 8px;\n  border-radius: 5px;\n\n\t&:hover {\n\t\tbackground-color: white;\n\t}\n"]))),M=n(8667),H=n(3727),B=["style"];function D(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var L,U=function(t){var e,n=t.chatData,r=t.scrollbarRef,a=t.isReachingEnd,o=t.setSize,l=(0,b.ZP)("/api/users/alluser",g.Z).data,i=(0,b.ZP)("/api/users",g.Z).data,c=(0,s.useContext)(j.J).onGameList,u=(0,s.useCallback)((function(t){0!==t.scrollTop||a||o((function(t){return t+1})).then((function(){var e,n;null!=r&&r.current&&(null===(e=r.current)||void 0===e||e.scrollTop((null===(n=r.current)||void 0===n?void 0:n.getScrollHeight())-t.scrollHeight))}))}),[o,a,r]),d=(0,M.W)(n?n.flat().reverse():[]);return s.createElement(P,null,s.createElement(S.ZP,{ref:r,onScrollFrame:u,renderThumbVertical:function(t){t.style;var e=function(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}(t,B);return s.createElement(z,e)}},Object.entries(d).map((function(t){var n,r,a=(r=2,function(t){if(Array.isArray(t))return t}(n=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,o=[],l=!0,i=!1;try{for(n=n.call(t);!(l=(r=n.next()).done)&&(o.push(r.value),!e||o.length!==e);l=!0);}catch(t){i=!0,a=t}finally{try{l||null==n.return||n.return()}finally{if(i)throw a}}return o}}(n,r)||function(t,e){if(t){if("string"==typeof t)return D(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(t,e):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=a[0],u=a[1];return s.createElement("div",{key:o},s.createElement(T,null,s.createElement("button",null,o)),null==u?void 0:u.map((function(t,n){return e="",s.createElement("div",{className:"chatList-wrapper",key:t.message+n},s.createElement("div",{className:"chatList-profile-wrapper"},null==l?void 0:l.map((function(r){if(r.userId===t.userId1)return e=r.username,s.createElement(h.Z,{className:"avatar",src:r.profile,alt:"Avatar",key:t.message+n})}))),0===t.match&&s.createElement("div",null,s.createElement("div",null,e),s.createElement("p",{className:"chat"},t.message)),(1===t.match||3===t.match)&&s.createElement("div",{className:"challenge-join-wrapper"},s.createElement("div",null,s.createElement("div",null,e),s.createElement("p",{className:"chat"},t.message)),c&&i&&c[null==i?void 0:i.userId]?s.createElement(p.Z,{className:"challenge-join-block-btn",variant:"contained",disabled:!0},"JOIN"):s.createElement(H.rU,{to:"/game/ping-pong/".concat(t.historyId)},s.createElement(p.Z,{className:"challenge-join-btn",variant:"contained"},"JOIN"))),2===t.match&&s.createElement("div",{className:"challenge-join-wrapper"},s.createElement("div",null,s.createElement("div",null,e),s.createElement("p",{className:"chat"},t.message)),s.createElement(H.rU,{to:"/game/history/".concat(t.historyId)},s.createElement(p.Z,{className:"challenge-join-btn",variant:"contained"},"HISTORY"))))})))}))))},R=n(958),G=n(3284),Y=k.Z.div(L||(L=function(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}(["\n\twidth: 100%;\n\theight: 100vh;\n\tdisplay: flex;\n\tflex-direction: column;\n"]))),_=n(1852),F=n(4126);function J(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,o=[],l=!0,i=!1;try{for(n=n.call(t);!(l=(r=n.next()).done)&&(o.push(r.value),!e||o.length!==e);l=!0);}catch(t){i=!0,a=t}finally{try{l||null==n.return||n.return()}finally{if(i)throw a}}return o}}(t,e)||W(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function W(t,e){if(t){if("string"==typeof t)return $(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?$(t,e):void 0}}function $(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var Q=function(){var t,e,n=J((0,s.useState)(""),2),r=n[0],a=n[1],o=(0,v.UO)().id,l=(0,b.ZP)("/api/users",g.Z).data,i=(0,b.ZP)("/api/dms/findDmUser/".concat(o),g.Z).data,c=(0,b.ZP)("/api/dms/dmlist",g.Z).data,d=J((0,s.useState)(!1),2),f=(d[0],d[1]),m=(0,_.useMediaQuery)({maxWidth:700}),p=(0,_.useMediaQuery)({maxWidth:420}),h=(0,R.ZP)((function(t){return"/api/dms/get20MessageUseDmId/".concat(o,"/").concat(t+1)}),g.Z),y=h.data,x=h.mutate,k=h.setSize,Z=(0,v.k6)(),O=0===(null==y||null===(t=y[0])||void 0===t?void 0:t.length)||y&&(null===(e=y[y.length-1])||void 0===e?void 0:e.length)<20||!1,j=(0,s.useRef)(null),A=(0,G.Z)(),S=(0,s.useCallback)((function(){null!=r&&r.trim()&&y&&(x((function(t){return null==t||t[0].unshift({id:t[0][0].id+1,dmId:parseInt(o),userId1:null==l?void 0:l.userId,userId2:i,message:r,match:0,createdAt:new Date,updatedAt:new Date,historyId:0}),t}),!1),w().post("/api/dms/sendMessage/".concat(i,"/0/0"),{message:r},E.Z).catch((function(t){"Block 상태"===t.response.data.data.message?I.Am.error(" Cant send message because it is blocked",{autoClose:4e3,position:I.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"}):I.Am.error(t.message,{autoClose:4e3,position:I.Am.POSITION.TOP_RIGHT,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"}),x()})),a(""),setTimeout((function(){var t;null===(t=j.current)||void 0===t||t.scrollToBottom()}),50))}),[r]),N=(0,s.useCallback)((function(t){t.userId1!=(null==l?void 0:l.userId)&&x((function(e){return null==e||e[0].unshift(t),e}),!1).then((function(){f((function(t){return!t})),j.current&&j.current.getScrollHeight()<j.current.getClientHeight()+j.current.getScrollTop()+150&&setTimeout((function(){var t;null===(t=j.current)||void 0===t||t.scrollToBottom()}),50)}))}),[l,j]);return(0,s.useEffect)((function(){if(c){var t,e=!0,n=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=W(t))){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,i=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return l=t.done,t},e:function(t){i=!0,o=t},f:function(){try{l||null==n.return||n.return()}finally{if(i)throw o}}}}(c);try{for(n.s();!(t=n.n()).done;)if(t.value.id===parseInt(o)){e=!1;break}}catch(t){n.e(t)}finally{n.f()}e&&Z.push("/home")}}),[c]),(0,s.useEffect)((function(){return null==A||A.on("dm",N),function(){null==A||A.off("dm")}}),[A,N]),(0,s.useEffect)((function(){var t;1===(null==y?void 0:y.length)&&(null===(t=j.current)||void 0===t||t.scrollToBottom())}),[y]),s.createElement(s.Fragment,null,m?null:s.createElement(F.Z,null),s.createElement(Y,null,p?null:s.createElement(C,null),s.createElement(U,{chatData:y,scrollbarRef:j,isReachingEnd:O,setSize:k}),s.createElement(u.Z,{chat:r,setChat:a,onSubmitChat:S})))}},8667:function(t,e,n){n.d(e,{W:function(){return c},a:function(){return u}});var r=n(285),a=n.n(r),o=n(7484),l=n.n(o);l().extend(a());var i=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];function c(t){var e={};return t.forEach((function(t){var n=l()(t.createdAt).format("YYYY-MM-DD");n+=" "+i[l()(t.createdAt).day()],Array.isArray(e[n])?e[n].push(t):e[n]=[t]})),e}function u(t){var e={};return t.forEach((function(t){var n=l()(t.updatedAt).format("YYYY-MM-DD");n+=" "+i[l()(t.updatedAt).day()],Array.isArray(e[n])?e[n].push(t):e[n]=[t]})),e}}}]);