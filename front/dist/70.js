"use strict";(self.webpackChunkbrojoon=self.webpackChunkbrojoon||[]).push([[70],{4126:function(e,t,n){n.d(t,{Z:function(){return P}});var r,a,l,i,o=n(7294),u=n(9334),c=n(1298),s=n(2440),d=n(3564),f=n(2503),p=n(3727),m=n(8718),b=n(8619),v=n(4524),h=n(7109);function y(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var g,x=v.Z.div(r||(r=y(["\n\twidth: 300px;\n\theight: 100%;\n\tpadding: 30px 15px;\n\tbackground-color: #363636;\n\tborder-right: 1px solid #4f4f4f;\n\toverflow: hidden;\n\n\t& .search-input {\n\t\twidth: 100%;\n\t\toutline: none;\n\t\tresize: none;\n\t\tborder-radius: 4px;\n\t\tbackground: #bdbdbd;\n\t\tfont-size: 16px;\n\t\tfont-weight: bold;\n\t\tfont-family: monospace;\n\t\theight: 40px;\n\t\tcolor: black;\n\t\tborder: none;\n\t\tpadding: 0 12px;\n\t}\n\n\t& .friend-icon-wrapper {\n\t\tborder-top: 1px solid #4f4f4f;\n\t\tborder-bottom: 1px solid #4f4f4f;\n\t\tmargin: 10px 0;\n\t\tpadding: 14px 0 0;\n\t\theight: 80px;\n\t}\n\n\t& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected {\n\t\tbackground-color: #666666 !important;\n\t}\n\n\t& .friend-list-wrapper {\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t}\n\n\t& .friend-list-wrapper:hover {\n\t\tbackground-color: rgba(74,75,84,0.7);\n\t}\n\n\t& .friend-list-btn {\n\t\tcolor: white;\n\t}\n\n\t& .friend-list-icon {\n\t\tmargin-right: 20px;\n\t}\n"]))),w=v.Z.div(a||(a=y(["\n\theight: 79%;\n\n\t& .list {\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t}\n\n\t& .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected {\n\t\tbackground-color: #666666 !important;\n\t}\n\n\t& .list:hover {\n\t\tbackground-color: rgba(74,75,84,0.7);\n\t}\n\n\t& .list-item-button {\n\t\tpadding: 8px;\n\t}\n\n\t& .user-avatar-id-wrapper {\n\t\tdisplay: flex;\n\n\t\talign-items: center;\n\t}\n\n\n\t& .user-id {\n\t\tmargin-left: 12px;\n\t\tcolor: white;\n\t}\n\n\n"]))),E=(0,v.Z)(h.Z)(l||(l=y(["\n\tborder: ",";\n\tmargin-left: 0;\n"])),(function(e){return e.isstate})),Z=v.Z.div(i||(i=y(["\n  ...style;\n  background-color: #787c7f;\n  width: 8px;\n  border-radius: 5px;\n\n\t&:hover {\n\t\tbackground-color: white;\n\t}\n"]))),O=n(6103),k=["style"];function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);i=!0);}catch(e){o=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw a}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return I(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?I(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var P=function(){var e,t,n=(0,f.ZP)("/api/dms/dmlist",d.Z).data,r=(0,f.ZP)("/api/users/alluser",d.Z).data,a=(0,f.ZP)("/api/friend/blocklist",d.Z).data,l=j((0,o.useState)(0),2),i=l[0],v=l[1],h=j((0,o.useState)(""),2),y=h[0],I=h[1],P=(0,o.useContext)(O.J),S=P.onlineList,C=P.onGameList,N=(0,o.useCallback)((function(e,t){v(t)}),[i,v]),A=(0,o.useCallback)((function(e){I(e.target.value)}),[]);y&&-1===y.indexOf("\\")&&(g=null==n?void 0:n.filter((function(e){var t=new RegExp(y,"gi");return e.username.match(t)})));var z=(0,o.useCallback)((function(e){return e?g:n}),[n]);return o.createElement(x,null,o.createElement("input",{className:"search-input",onChange:A,value:y,autoComplete:"off"}),o.createElement("div",{className:"friend-icon-wrapper"},o.createElement(p.rU,{to:"/social"},o.createElement(s.Z,{className:"friend-list-wrapper",component:"nav","aria-label":"main mailbox folders"},o.createElement(b.Z,{className:"friend-list-btn",selected:0===i,onClick:function(e){return N(e,0)}},o.createElement(m.Z,{className:"friend-list-icon"}),o.createElement(u.Z,{primary:"Friends"}))))),o.createElement(w,null,o.createElement(c.ZP,{autoHide:!0,renderThumbVertical:function(e){e.style;var t=function(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}(e,k);return o.createElement(Z,t)}},o.createElement("div",null,null===(e=z(y))||void 0===e?void 0:e.map((function(e,n){var l=!1;if(null==a||a.map((function(t){t.userId2===e.userId&&(l=!0)})),!l)return o.createElement(p.rU,{to:"/social/dm/".concat(e.id),key:e.id},o.createElement(s.Z,{className:"list",component:"nav","aria-label":"main mailbox folders"},o.createElement(b.Z,{className:"list-item-button",selected:i===n+1,onClick:function(e){return N(e,n+1)}},null==r?void 0:r.map((function(n){if(n.userId===e.userId)return t=0,C&&C[n.userId]&&(t=2),0===t&&(null==S||S.map((function(e){e.userId===n.userId&&(t=1)}))),o.createElement("div",{className:"user-avatar-id-wrapper",key:e.id},o.createElement(E,{isstate:"".concat(t?1===t?"2px solid #1ed14b":"2px solid #FFD400":"2px solid #d63638"),src:n.profile,alt:"Avatar"}),o.createElement(u.Z,{className:"user-id",primary:n.username}))})))))}))))))}},5070:function(e,t,n){n.r(t),n.d(t,{default:function(){return ue}});var r,a,l,i=n(7294),o=n(5697),u=n.n(o),c=n(7314),s=n(2734),d=n(3720),f=n(3069),p=n(2640),m=n(2658),b=n(576),v=n(9334),h=n(2503),y=n(3564),g=n(1298),x=n(3727),w=n(4524),E=n(2440),Z=n(7109);function O(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var k=(0,w.Z)(E.Z)(r||(r=O(["\n\twidth: 100%:\n\theight: 100%;\n\tbackground: #1e1e1e;\n\n\t& .friend-list-wrapper:hover {\n\t\tbackground-color: rgba(74,75,84,0.5);\n\t}\n\n\t& .text {\n\t\tmargin-left: 12px;\n\t\tcolor: white;\n\t}\n\n"]))),j=(0,w.Z)(Z.Z)(a||(a=O(["\n\tborder: ",";\n\n"])),(function(e){return e.isstate})),I=w.Z.div(l||(l=O(["\n  ...style;\n  background-color: #787c7f;\n  width: 8px;\n  border-radius: 5px;\n\n\t&:hover {\n\t\tbackground-color: white;\n\t}\n"]))),P=n(6103),S=["style"];var C,N,A,z=function(){var e,t=(0,h.ZP)("/api/users/alluser",y.Z).data,n=(0,h.ZP)("/api/friend/friendlist",y.Z).data,r=(0,i.useContext)(P.J),a=r.onlineList,l=r.onGameList;return i.createElement(g.ZP,{renderThumbVertical:function(e){e.style;var t=function(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}(e,S);return i.createElement(I,t)}},i.createElement(k,{"aria-label":"mailbox folders"},null==n?void 0:n.map((function(n){return null==t?void 0:t.map((function(t){if((null==t?void 0:t.userId)===(null==n?void 0:n.userId2))return e=0,l&&l[t.userId]&&(e=2),0===e&&(null==a||a.map((function(n){n.userId===t.userId&&(e=1)}))),i.createElement(x.rU,{to:"/users/".concat(t.userId),key:t.userId},i.createElement(b.ZP,{className:"friend-list-wrapper",button:!0},i.createElement(j,{isstate:"".concat(e?1===e?"2px solid #1ed14b":"2px solid #FFD400":"2px solid #d63638"),src:t.profile,alt:"Avatar"}),i.createElement(v.Z,{className:"text",primary:t.username})))}))}))))};function L(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var F=(0,w.Z)(E.Z)(C||(C=L(["\n\twidth: 100%:\n\theight: 100%;\n\tbackground: #1e1e1e;\n\n\t& .friend-list-wrapper:hover {\n\t\tbackground-color: rgba(74,75,84,0.5);\n\t}\n\n\t& .text {\n\t\tmargin-left: 12px;\n\t\tcolor: white;\n\t}\n\n"]))),M=(0,w.Z)(Z.Z)(N||(N=L(["\n\tborder: ",";\n\n"])),(function(e){return e.isstate})),B=w.Z.div(A||(A=L(["\n  ...style;\n  background-color: #787c7f;\n  width: 8px;\n  border-radius: 5px;\n\n\t&:hover {\n\t\tbackground-color: white;\n\t}\n"]))),T=["style"];var U,D,G,J=function(){var e,t=(0,h.ZP)("/api/users/alluser",y.Z).data,n=(0,h.ZP)("/api/friend/friendlist",y.Z).data,r=(0,i.useContext)(P.J),a=r.onlineList,l=r.onGameList;return i.createElement(g.ZP,{renderThumbVertical:function(e){e.style;var t=function(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}(e,T);return i.createElement(B,t)}},i.createElement(F,{"aria-label":"mailbox folders"},null==n?void 0:n.map((function(n){return null==t?void 0:t.map((function(t){if((null==t?void 0:t.userId)===(null==n?void 0:n.userId2)){if(e=0,l&&l[t.userId]&&(e=2),0===e&&(null==a||a.map((function(n){n.userId===t.userId&&(e=1)}))),0===e)return;return i.createElement(x.rU,{to:"/users/".concat(t.userId),key:t.userId},i.createElement(b.ZP,{className:"friend-list-wrapper",button:!0},i.createElement(M,{isstate:"".concat(e?1===e?"2px solid #1ed14b":"2px solid #FFD400":"2px solid #d63638"),src:t.profile,alt:"Avatar"}),i.createElement(v.Z,{className:"text",primary:t.username})))}}))}))))};function R(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var V=(0,w.Z)(E.Z)(U||(U=R(["\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: #1e1e1e;\n\n\t& .block-list-wrapper:hover {\n\t\tbackground-color: rgba(74,75,84,0.5);\n\t}\n\n\t& .list-text {\n\t\tmargin-left: 12px;\n\t\tcolor: white;\n\t}\n"]))),q=(0,w.Z)(Z.Z)(D||(D=R(["\n\tborder: ",";\n\n"])),(function(e){return e.isstate})),W=w.Z.div(G||(G=R(["\n  ...style;\n  background-color: #787c7f;\n  width: 8px;\n  border-radius: 5px;\n\n\t&:hover {\n\t\tbackground-color: white;\n\t}\n"]))),$=["style"];var H,K,Q=function(){var e,t=(0,h.ZP)("/api/users/alluser",y.Z).data,n=(0,h.ZP)("/api/friend/blocklist",y.Z).data,r=(0,i.useContext)(P.J),a=r.onlineList,l=r.onGameList;return i.createElement(g.ZP,{renderThumbVertical:function(e){e.style;var t=function(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}(e,$);return i.createElement(W,t)}},i.createElement(V,null,null==n?void 0:n.map((function(n){return null==t?void 0:t.map((function(t){if((null==t?void 0:t.userId)===(null==n?void 0:n.userId2))return e=0,l&&l[t.userId]&&(e=2),0===e&&(null==a||a.map((function(n){n.userId===t.userId&&(e=1)}))),i.createElement(x.rU,{to:"/users/".concat(t.userId),key:n.userId2},i.createElement(b.ZP,{className:"block-list-wrapper",button:!0},i.createElement(q,{isstate:"".concat(e?1===e?"2px solid #1ed14b":"2px solid #FFD400":"2px solid #d63638"),src:t.profile,alt:"Avatar"}),i.createElement(v.Z,{className:"list-text",primary:t.username})))}))}))))},X=n(4126),Y=n(1508);function _(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var ee=(0,w.Z)(Y.Z)(H||(H=_(["\n\tbackground-color: #1e1e1e; \n\twidth: 100%;\n\theight: 100%;\n\n\t& .app-bar {\n\t\tbackground: #1e1e1e;\n\t\theight: 10vh;\n\t}\n\n\t& .swipeable-views {\n\t\tcolor: white;\n\t}\n"]))),te=(0,w.Z)(Y.Z)(K||(K=_(["\n\theight: 90vh;\n"]))),ne=n(1852),re=["children","value","index"];function ae(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function le(){return le=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},le.apply(this,arguments)}function ie(e){var t=e.children,n=e.value,r=e.index,a=function(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}(e,re);return i.createElement("div",null,i.createElement("div",le({role:"tabpanel",hidden:n!==r,id:"full-width-tabpanel-".concat(r),"aria-labelledby":"full-width-tab-".concat(r)},a),n===r&&i.createElement(te,null,i.createElement(m.Z,{component:"span"},t))))}function oe(e){return{id:"full-width-tab-".concat(e),"aria-controls":"full-width-tabpanel-".concat(e)}}ie.propTypes={children:u().node,index:u().number.isRequired,value:u().number.isRequired};var ue=function(){var e,t,n=(0,s.Z)(),r=(e=(0,i.useState)(0),t=2,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);i=!0);}catch(e){o=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw a}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return ae(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ae(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=r[0],l=r[1],o=(0,ne.useMediaQuery)({maxWidth:700}),u=(0,i.useCallback)((function(e,t){l(t)}),[]),m=(0,i.useCallback)((function(e){l(e)}),[]);return i.createElement(i.Fragment,null,i.createElement(X.Z,null),o?null:i.createElement(ee,null,i.createElement(d.Z,{position:"static",className:"app-bar"},i.createElement(f.Z,{value:a,onChange:u,indicatorColor:"secondary",textColor:"inherit",variant:"fullWidth","aria-label":"full width tabs example"},i.createElement(p.Z,le({label:"🌐 ONLINE"},oe(0))),i.createElement(p.Z,le({label:"👥 FRIENDS"},oe(1))),i.createElement(p.Z,le({label:"🚨 BLOCKED"},oe(2))))),i.createElement(c.ZP,{className:"swipeable-views ",axis:"rtl"===n.direction?"x-reverse":"x",index:a,onChangeIndex:m},i.createElement(ie,{value:a,index:0},i.createElement(J,null)),i.createElement(ie,{value:a,index:1},i.createElement(z,null)),i.createElement(ie,{value:a,index:2},i.createElement(Q,null)))))}}}]);