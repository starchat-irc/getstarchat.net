(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={":":`;`,s:` `,"\\":`\\`,r:`\r`,n:`
`};function t(t){if(t===void 0)return;let n=``;for(let r=0;r<t.length;r++){let i=t[r];if(i!==`\\`){n+=i;continue}let a=t[r+1];if(a===void 0)break;n+=e[a]??a,r++}return n}function n(e){return String(e).replace(/\\/g,`\\\\`).replace(/;/g,`\\:`).replace(/ /g,`\\s`).replace(/\r/g,`\\r`).replace(/\n/g,`\\n`)}function r(e){let n={};for(let r of String(e??``).split(`;`)){if(!r)continue;let e=r.indexOf(`=`),i=e===-1?r:r.slice(0,e);if(!i)continue;let a=e===-1?void 0:t(r.slice(e+1));n[i]=a===``?void 0:a}return n}function i(e){let t=String(e??``).replace(/[\r\n]+$/,``),n=t,i={};if(t.startsWith(`@`)){let e=t.indexOf(` `),n=e===-1?t.slice(1):t.slice(1,e);t=e===-1?``:t.slice(e+1).replace(/^ +/,``),i=r(n)}let a=``;if(t.startsWith(`:`)){let e=t.indexOf(` `);a=e===-1?t.slice(1):t.slice(1,e),t=e===-1?``:t.slice(e+1).replace(/^ +/,``)}let o=[],s=!1,c=``,l=t.indexOf(` :`),u=t,d=null;t.startsWith(`:`)?(u=``,d=t.slice(1)):l!==-1&&(u=t.slice(0,l),d=t.slice(l+2));let f=u.split(` `).filter(Boolean);c=(f.shift()||``).toUpperCase(),o.push(...f),d!==null&&(o.push(d),s=!0);let p=a.indexOf(`!`),m=p===-1?a.split(`@`)[0]:a.slice(0,p),h=a!==``&&p===-1&&!a.includes(`@`)&&a.includes(`.`);return{raw:n,tags:i,source:a,nick:m,fromServer:h,command:c,params:o,hasTrailing:s}}var a=5e3,o=2e4,s=e=>typeof e==`function`?e():e;function c(e,t){return{mechanism:`PLAIN`,payload:()=>{let n=s(e);return`${n}\0${n}\0${s(t)}`}}}function l(e,t,n=`jwt`){return{mechanism:`IRCV3BEARER`,payload:()=>`${s(e)}\0${n}\0${s(t)}`}}function u(e){let t=``;for(let n of new TextEncoder().encode(e))t+=String.fromCharCode(n);return btoa(t)}function d(e){let t=(e._reconnectAttempt||0)+1;e._reconnectAttempt=t;let n=Math.min(3e3*2**(t-1),3e4);return e.setConnectionState?.(`reconnecting`,t,n),n}function f({nickname:e,sasl:t=null,ctx:n,sendLine:r,closeTransport:i,onMessage:s}){let c=!1,l=!1,d=!1,f=null,p=new Set,m={},h=!!t;function g(){f&&=(clearTimeout(f),null)}function _(){g(),f=setTimeout(()=>{c||(h?(console.warn(`CAP/SASL negotiation timeout, reconnecting instead of registering without login`),f=null,i()):(console.warn(`CAP negotiation timeout, proceeding without capabilities`),v()))},h?o:a)}function v(){c||=(g(),r(`CAP END`),!0)}function y(){l||=(r(`NICK ${e}`),r(`USER ${e} 0 * :${e}`),!0)}function b(){n._reconnectAttempt=0,n.setConnectionState?.(`connecting`),r(`CAP LS 302`),y(),_()}function x(){let e=u(t.payload());for(let t=0;t<e.length;t+=400)r(`AUTHENTICATE ${e.substring(t,t+400)}`);e.length%400==0&&r(`AUTHENTICATE +`)}function ee(e){let i=e.startsWith(`@`)?e.substring(e.indexOf(` `)+1).trim():e,a=i.split(` `);if(!c&&a[1]===`421`&&a.length>=4&&a[3]?.toUpperCase()===`CAP`)v();else{if(!c&&i.startsWith(`:`)&&i.includes(` CAP `)){if(g(),a[3]===`LS`&&!d){let e=a[4]===`*`,t=e?5:4;if(a.slice(t).join(` `).replace(/^:/,``).trim().split(` `).filter(Boolean).forEach(e=>{let t=e.indexOf(`=`),n=t===-1?e:e.slice(0,t);p.add(n),t!==-1&&(m[n]=e.slice(t+1))}),!e){let e=p.has(`draft/metadata-3`)?`draft/metadata-3`:p.has(`draft/metadata-2`)?`draft/metadata-2`:null,t=[`batch`,`away-notify`,`message-tags`,`account-tag`,`server-time`,`echo-message`,`draft/message-redaction`,p.has(`chathistory`)?`chathistory`:p.has(`draft/chathistory`)?`draft/chathistory`:null,`draft/event-playback`,e,`draft/multiline`,`draft/read-marker`,p.has(`draft/webpush`)?`draft/webpush`:`soju.im/webpush`,h?`sasl`:null].filter(e=>e&&p.has(e));t.length>0?(r(`CAP REQ :${t.join(` `)}`),d=!0,_()):v()}return}if(a[3]===`ACK`){let e=(i.includes(` ACK :`)?i.split(` ACK :`)[1]:``).split(` `).filter(Boolean).map(e=>e.split(`=`)[0]),a=new Set(e);if(n.supportsChathistory=a.has(`chathistory`)||a.has(`draft/chathistory`),n.metadataVersion=a.has(`draft/metadata-3`)?3:a.has(`draft/metadata-2`)?2:0,n.supportsMetadata=n.metadataVersion>0,n.supportsMessageTags=a.has(`message-tags`),n.supportsEchoMessage=a.has(`echo-message`),n.supportsRedaction=a.has(`draft/message-redaction`),n.supportsReadMarker=a.has(`draft/read-marker`),n.supportsWebpush=a.has(`draft/webpush`)||a.has(`soju.im/webpush`),n.supportsMultiline=a.has(`draft/multiline`),n.supportsMultiline){let e=Object.fromEntries((m[`draft/multiline`]||``).split(`,`).filter(Boolean).map(e=>e.split(`=`)));n.multilineMaxBytes=parseInt(e[`max-bytes`],10)||4096,n.multilineMaxLines=parseInt(e[`max-lines`],10)||0}n.onCapabilities?.({offered:[...p].sort(),enabled:[...a].sort()}),h&&a.has(`sasl`)?(r(`AUTHENTICATE ${t.mechanism}`),_()):v();return}if(a[3]===`NAK`){v();return}}if(h&&(i===`AUTHENTICATE :+`||i===`AUTHENTICATE +`||i.includes(` AUTHENTICATE +`)))x();else if(h&&i.startsWith(`:`)&&(i.includes(` 903 `)||i.includes(` 904 `)||i.includes(` 905 `)))a[1]!==`903`&&(console.warn(`SASL authentication failed (${a[1]})`),n.onSaslFailure?.(a[1])),v();else if(i.startsWith(`PING`)){let e=i.split(`:`)[1];r(`PONG :${e}`)}else!c&&a[1]===`001`&&(g(),c=!0),c&&s({data:e})}}function S(){g()}return{onOpen:b,onLine:ee,cleanup:S}}var p=5e3,m=1e4;function h(e){let{url:t,nickname:n,sasl:r=null,ctx:i,onMessage:a,onStatusUpdate:o=()=>{}}=e,s=new WebSocket(t),c=0,l=()=>i.effectiveQuitMessage?.()||e.quitMessage||`Avoid staring into the cosmic void. It might stare back at you.`,u=null,g=!1,_=setTimeout(()=>{_=null,s.readyState!==WebSocket.CONNECTING||g||i.performLogout||(console.warn(`WebSocket handshake timeout, trying a new connection`),b(),y(d(i)))},m),v=f({nickname:n,sasl:r,ctx:i,sendLine:e=>s.send(`${e}\r\n`),closeTransport:()=>s.close(),onMessage:a});function y(t){i._wsReconnectTimer&&clearTimeout(i._wsReconnectTimer),i._wsReconnectTimer=setTimeout(()=>{if(i._wsReconnectTimer=null,i.performLogout)return;if(i.setConnectionState?.(`connecting`),!e.beforeReconnect){i.socket=h(e);return}let t=i.socket;new Promise(t=>t(e.beforeReconnect())).catch(e=>console.warn(`beforeReconnect failed, reconnecting with the old values:`,e)).then(()=>{!i.performLogout&&i.socket===t&&(i.socket=h(e))})},t)}function b(){clearTimeout(_),clearTimeout(u),s.onmessage=s.onopen=s.onerror=s.onclose=null,v.cleanup();try{s.close()}catch{}o(`disconnected`)}function x(){b(),i._reconnectAttempt=0,i.setConnectionState?.(`reconnecting`,1,0),y(0)}return s.onmessage=e=>{c=Date.now();let t=String(e.data||``).split(/\r?\n/).map(e=>e.trim()).filter(Boolean);for(let e of t)v.onLine(e)},s.onopen=()=>{clearTimeout(_),v.onOpen()},s.onerror=e=>{console.error(`WebSocket error:`,e),o(`error`)},s.onclose=()=>{clearTimeout(u),clearTimeout(_),v.cleanup(),g||(o(`disconnected`),i.performLogout||y(d(i)))},{send:e=>{s.readyState===WebSocket.OPEN?s.send(`${e}\r\n`):console.warn(`WebSocket not open, cannot send:`,e)},resume:()=>{if(i.performLogout||g)return;if(i._wsReconnectTimer){i._reconnectAttempt=0,y(0);return}if(s.readyState===WebSocket.CONNECTING){x();return}if(s.readyState!==WebSocket.OPEN)return;let e=Date.now();clearTimeout(u),s.send(`PING :resume-${e}\r\n`),u=setTimeout(()=>{c<e&&s.readyState===WebSocket.OPEN&&!i.performLogout&&x()},p)},quit:()=>{i.performLogout=!0,clearTimeout(i._wsReconnectTimer);try{s.readyState===WebSocket.OPEN&&s.send(`QUIT :${l()}\r\n`)}catch{}},close:()=>{g=!0,clearTimeout(_),clearTimeout(i._wsReconnectTimer),i._wsReconnectTimer=null;try{s.readyState===WebSocket.OPEN?(s.send(`QUIT :${l()}\r\n`),setTimeout(()=>s.close(),100)):s.close()}catch(e){console.error(`Error closing WebSocket:`,e),s.close()}finally{i.performLogout=!0}}}}var g=[`#FFFFFF`,`#000000`,`#00007F`,`#009300`,`#FF0000`,`#7F0000`,`#9C009C`,`#FC7F00`,`#FFFF00`,`#00FC00`,`#009393`,`#00FFFF`,`#0000FC`,`#FF00FF`,`#7F7F7F`,`#D2D2D2`],_={":D":`😃`,":P":`😛`,";)":`😉`,":(":`😞`,":)":`🙂`,"<3":`❤️`},v="A-Za-z0-9\\[\\]\\\\`_^{|}\\-",y=``,b=``,x=``,ee=``,S=``,te=``,ne=``,re=``,C=``;function w(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function ie(e){return String(e).replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function ae(e){return String(e??``).replace(/\x03(\d{1,2}(,\d{1,2})?)?/g,``).replace(/\x04([0-9a-fA-F]{6}(,[0-9a-fA-F]{6})?)?/g,``).replace(/[\x02\x0F\x11\x16\x1D\x1E\x1F]/g,``)}function oe(e,t=g){let n=String(e??``),r=()=>({b:!1,i:!1,u:!1,s:!1,m:!1,rev:!1,fg:null,bg:null}),i=r(),a=``,o=``,s=()=>{if(!a)return;let e=w(a);a=``;let t=[];i.b&&t.push(`irc-b`),i.i&&t.push(`irc-i`),i.u&&t.push(`irc-u`),i.s&&t.push(`irc-s`),i.m&&t.push(`irc-m`);let n=i.fg,r=i.bg;i.rev&&(n||r?[n,r]=[r,n]:t.push(`irc-reverse`));let s=[];if(n&&s.push(`color:${n}`),r&&s.push(`background-color:${r}`),r&&t.push(`irc-bg`),!t.length&&!s.length){o+=e;return}let c=t.length?` class="${t.join(` `)}"`:``,l=s.length?` style="${s.join(`;`)}"`:``;o+=`<span${c}${l}>${e}</span>`},c=e=>{let n=parseInt(e,10);return Number.isInteger(n)&&n>=0&&n<t.length?t[n]:null};for(let e=0;e<n.length;e++){let t=n[e];switch(t){case y:s(),i.b=!i.b;break;case re:s(),i.i=!i.i;break;case C:s(),i.u=!i.u;break;case ne:s(),i.s=!i.s;break;case S:s(),i.m=!i.m;break;case te:s(),i.rev=!i.rev;break;case ee:s(),i=r();break;case b:{s();let t=/^(\d{1,2})(?:,(\d{1,2}))?/.exec(n.slice(e+1));if(!t){i.fg=null,i.bg=null;break}i.fg=t[1]===`99`?null:c(t[1]),t[2]!==void 0&&(i.bg=t[2]===`99`?null:c(t[2])),e+=t[0].length;break}case x:{s();let t=/^([0-9a-fA-F]{6})(?:,([0-9a-fA-F]{6}))?/.exec(n.slice(e+1));if(!t){i.fg=null,i.bg=null;break}i.fg=`#${t[1]}`,t[2]!==void 0&&(i.bg=`#${t[2]}`),e+=t[0].length;break}default:if(t<` `&&t!==`
`&&t!==`	`)break;a+=t}}return s(),o}var se=new Map;function ce(e){return se.has(e)||se.set(e,RegExp(`(^|[^${v}@])(@?${ie(e)})(?![${v}])`,`i`)),se.get(e)}function le(e,t){return!e||!t?!1:ce(t).test(ae(e))}function ue(e){let t=Array.isArray(e)?e:String(e??``).split(/[,\n]/),n=new Set,r=[];for(let e of t){let t=String(e??``).trim().slice(0,50);if(t&&!n.has(t.toLowerCase())&&(n.add(t.toLowerCase()),r.push(t),r.length===20))break}return r}function de(e){return[...e].sort((e,t)=>t.length-e.length).map(ie).join(`|`)}var fe=new Map;function pe(e){let t=e.join(`
`).toLowerCase();return fe.has(t)||(fe.size>20&&fe.clear(),fe.set(t,RegExp(`(^|[^${v}@])(?:${de(e)})(?![${v}])`,`i`))),fe.get(t)}function me(e,t,n=[]){return e?le(e,t)?!0:n.length>0&&pe(n).test(ae(e)):!1}function he(e,{nick:t=``,emotes:n=_,highlightWords:r=[]}={}){let i=Object.keys(n).map(ie).join(`|`),a=[];t&&a.push(`(?<me>@?${ie(t)})(?![${v}])`),r.length&&a.push(`(?<word>${de(r)})(?![${v}])`),a.push(`(?<at>@[${v}]+)`),i&&a.push(`(?<emote>${i})(?=$|[\\s.,!?])`);let o=RegExp(`(?<pre>^|[^${v}@])(?:${a.join(`|`)})`,`gi`),s=``,c=0;for(let t of String(e).matchAll(o)){let{pre:r,me:i,word:a,at:o,emote:l}=t.groups;if(s+=w(e.slice(c,t.index))+w(r),i)s+=`<span class="mention mention--me">${w(i)}</span>`;else if(a)s+=`<span class="mention mention--me mention--word">${w(a)}</span>`;else if(o)s+=`<span class="mention">${w(o)}</span>`;else if(l){let e=n[l]??n[l.toUpperCase()];s+=e?`<span class="emote" title="${w(l)}">${e}</span>`:w(l)}c=t.index+t[0].length}return s+w(e.slice(c))}function ge(e,t){return new Date(e).toLocaleTimeString(t,{hour:`2-digit`,minute:`2-digit`})}function _e(e,{now:t=Date.now(),today:n=`Today`,yesterday:r=`Yesterday`,locale:i}={}){let a=Math.round((T(t)-T(e))/864e5);return a===0?n:a===1?r:new Date(e).toLocaleDateString(i,{weekday:`long`,day:`2-digit`,month:`long`,year:`numeric`})}function T(e){let t=new Date(e);return t.setHours(0,0,0,0),t.getTime()}function ve(e){let t=0,n=String(e??``).toLowerCase();for(let e=0;e<n.length;e++)t=n.charCodeAt(e)+((t<<5)-t),t|=0;return Math.abs(t)%360}function ye(e,t){return{get:()=>e.store(t),set:n=>e.store(t,n)}}var be=1e3,xe=1;function Se(e,{onAdd:t}={}){e.set({});let n={};function r(t){e.get()[t]||(e.get()[t]={type:t.startsWith(`#`)?`channel`:`private`,content:[]})}function i(e){return e.id??=xe++,typeof e._ts!=`number`&&(e._ts=Date.now()),e}function a(t){let n=e.get()[t];n.content.length>1e3&&n.content.splice(0,n.content.length-be)}return{add:(n,o)=>{r(n);let s=e.get()[n].content;return s.push(i(o)),a(n),t?.(n,o),s[s.length-1]},bufferAdd:(e,t)=>{n[e]||(n[e]=[]),n[e].push(i(t))},flushBuffer:t=>{let i=n[t]||[];if(delete n[t],i.length===0)return[];r(t);let o=e.get()[t];return o.content=[...o.content,...i].sort((e,t)=>(e._ts||0)-(t._ts||0)),a(t),i},ensure:e=>r(e),get:t=>e.get()[t]?.content||[],remove:t=>{delete e.get()[t],delete n[t]},keys:()=>Object.keys(e.get()),privateKeys:()=>Object.keys(e.get()).filter(t=>e.get()[t].type===`private`&&t!==`Server`)}}var Ce=/^[~&@%+]/,we={"~":1,"&":2,"@":3,"%":4,"+":5,"":6},Te=[`~`,`&`,`@`,`%`,`+`],Ee=[`*`,`-`,`none`,`null`,`undefined`,`(none)`,`N/A`];function E(e,t){return we[e.role]-we[t.role]||e.name.localeCompare(t.name)}function De(e,{role:t=``,account:n=null,realname:r=``}={}){return{role:t,prefixModes:t?[t]:[],name:e,isTyping:!1,isAway:!1,isOnline:!0,account:n,realname:r,playing:``,voice:``}}function D(e){return e.set({}),{ensureChannel(t){Array.isArray(e.get()[t])||(e.get()[t]=[])},flush(t){e.get()[t]=[...e.get()[t]]},clear(t){e.get()[t]=[]},clearAll(){e.set({})},get(t){return e.get()[t]||[]},getUser(e,t){return this.get(e).find(e=>e.name===t)},updateUserList(t,n){this.ensureChannel(t);let r=e.get()[t];n.forEach(e=>{let t=Ce.test(e)?e[0]:``,n=e.replace(Ce,``),i=r.find(e=>e.name===n);i?t&&(i.role=t,i.prefixModes=[t]):r.push(De(n,{role:t}))})},updateUserRole(e,t,n,r){this.ensureChannel(e);let i=this.getUser(e,t);i&&(Array.isArray(i.prefixModes)||(i.prefixModes=i.role?[i.role]:[]),r?i.prefixModes.includes(n)||i.prefixModes.push(n):i.prefixModes=i.prefixModes.filter(e=>e!==n),i.role=Te.find(e=>i.prefixModes.includes(e))||``,this.flush(e))},addUser(t,n,r=null,i=``){this.ensureChannel(t);let a=this.getUser(t,n);a?Object.assign(a,{account:r,realname:i}):e.get()[t].push(De(n,{account:r,realname:i})),this.flush(t)},removeUser(t,n){this.ensureChannel(t),e.get()[t]=this.get(t).filter(e=>e.name!==n),this.flush(t)},renameUser(e,t){this.updateEverywhere(e,e=>{e.name=t})},setTyping(e,t,n){this.ensureChannel(e);let r=this.getUser(e,t);r&&(r.isTyping=n,this.flush(e))},setAway(e,t){this.updateEverywhere(e,e=>{e.isAway=t})},setPlaying(e,t){let n=typeof t==`string`?t.trim():``,r=Ee.includes(n)?``:n;this.updateEverywhere(e,e=>{e.playing=r})},setVoice(e,t){let n=typeof t==`string`&&t.trim().startsWith(`#`)?t.trim().toLowerCase():``;this.updateEverywhere(e,e=>{if((e.voice||``)===n)return!1;e.voice=n})},clearPlaying(e){this.setPlaying(e,``)},setOnline(e,t){this.updateEverywhere(e,e=>{e.isOnline=t})},updateEverywhere(t,n){Object.keys(e.get()).forEach(e=>{let r=this.getUser(e,t);r&&n(r)!==!1&&this.flush(e)})},sort(t){this.ensureChannel(t),this.get(t).length>0&&(e.get()[t].sort(E),this.flush(t))},getSorted(e){return this.ensureChannel(e),[...this.get(e)].sort(E)}}}function Oe(e){return e.get()||e.set({}),{setTopic:(t,n)=>{let r=e.get();r[t]=n,e.set(r)},getTopic:t=>e.get()[t]||``,clearTopic:t=>{let n=e.get();delete n[t],e.set(n)}}}var ke=new Set([`nickserv`,`chanserv`,`hostserv`,`histserv`,`memoserv`,`operserv`,`botserv`,`saslserv`,`infoserv`,`statserv`,`global`,`alis`]);function Ae(e){return typeof e==`string`&&ke.has(e.toLowerCase())}var je={$schema:`./servers.schema.json`,schemaVersion:1,servers:[{id:`st-city`,name:`ST-City`,domain:`st-city.net`,description:{de:`Deutschsprachige Rollenspiel- und Chat-Community.`,en:`German-speaking roleplay and chat community.`},languages:[`de`],websocket:`wss://skynet.st-city.net`,irc:{host:`irc.st-city.net`,port:6697,tls:!0}},{id:`ergo-testnet`,name:`Ergo Testnet`,domain:`testnet.ergo.chat`,description:{en:`Public test instance of the Ergo IRC server, open for trying out clients.`},languages:[`en`],websocket:`wss://testnet.ergo.chat/webirc`,irc:{host:`testnet.ergo.chat`,port:6697,tls:!0}},{id:`libera`,name:`Libera.Chat`,domain:`libera.chat`,description:{en:`Network for free and open source software projects.`},languages:[`en`],websocket:`wss://web.libera.chat/webirc/websocket/`,irc:{host:`irc.libera.chat`,port:6697,tls:!0}}]},Me=`https://raw.githubusercontent.com/starchat-irc/starchat/main/servers/servers.json`,Ne=864e5,Pe=`starchat.serverList:`,Fe=/^[a-z0-9][a-z0-9-]{1,39}$/,Ie=/^([a-z0-9-]+\.)+[a-z]{2,}$/;function Le(e,t){if(!e||!t)return!1;let n=e.toLowerCase(),r=t.toLowerCase();return n===r||n.endsWith(`.${r}`)}function Re(e,t){if(typeof e!=`string`)return null;try{let n=new URL(e);return n.protocol===t?n.hostname:null}catch{return null}}function ze(e){if(!e||typeof e!=`object`)return null;let{id:t,name:n,domain:r}=e;if(typeof t!=`string`||!Fe.test(t)||typeof n!=`string`||n.trim()===``||typeof r!=`string`||!Ie.test(r))return null;let i={id:t,name:n.trim(),domain:r,languages:Array.isArray(e.languages)?e.languages.filter(e=>typeof e==`string`):[]};e.description&&typeof e.description==`object`&&(i.description={...e.description}),Re(e.websocket,`wss:`)&&(i.websocket=e.websocket);let a=e.irc;return a&&typeof a.host==`string`&&a.host!==``&&Number.isInteger(a.port)&&a.port>0&&a.port<65536&&(i.irc={host:a.host,port:a.port,tls:a.tls!==!1}),Le(Re(e.discovery,`https:`),r)&&(i.discovery=e.discovery),!i.websocket&&!i.irc?null:i}function Be(e){if(!e||e.schemaVersion!==1||!Array.isArray(e.servers))return null;let t=new Set,n=[];for(let r of e.servers){let e=ze(r);e&&!t.has(e.id)&&(t.add(e.id),n.push(e))}return n}function Ve(){try{return globalThis.localStorage??null}catch{return null}}function He(e,t){try{let n=e?.getItem(t);if(!n)return null;let r=JSON.parse(n),i=Be(r.data);return i?{servers:i,savedAt:Number(r.savedAt)||0}:null}catch{return null}}function Ue(e,t,n,r){try{e?.setItem(t,JSON.stringify({savedAt:r,data:n}))}catch{}}async function We({source:e=`default`,fetch:t=globalThis.fetch,storage:n=Ve(),now:r=Date.now,ttl:i=Ne,bundled:a=je}={}){if(e===!1)return{servers:[],origin:`none`};let o=e==="default",s=o?Me:e,c=Pe+s,l=He(n,c);if(l&&r()-l.savedAt<i)return{servers:l.servers,origin:`cache`};try{let e=await t(s,{headers:{Accept:`application/json`}});if(e.ok){let t=await e.json(),i=Be(t);if(i)return Ue(n,c,t,r()),{servers:i,origin:`network`}}}catch{}return l?{servers:l.servers,origin:`stale`}:o?{servers:Be(a)??[],origin:`bundled`}:{servers:[],origin:`none`}}function Ge(e,t){if(e&&typeof e==`object`)return ze(e)??(Ie.test(e.domain??``)?Ke(e.domain):null);if(typeof e!=`string`||e===``)return null;let n=e.toLowerCase();return t.find(e=>e.id===n||e.domain===n)||(Ie.test(n)?Ke(n):null)}function Ke(e){return{id:e.replace(/[^a-z0-9-]/g,`-`).slice(0,40),name:e,domain:e,languages:[]}}async function qe({primaryServer:e=null,serverList:t=`default`}={},n={}){let{servers:r,origin:i}=await We({...n,source:t}),a=Ge(e,r);return a?{primary:a,servers:[a,...r.filter(e=>e.id!==a.id)],origin:i}:{primary:null,servers:r,origin:i}}var Je=`/.well-known/starchat.json`,Ye=5e3,Xe=Object.freeze([`profiles`,`friends`,`uploads`,`push`,`voice`,`calls`,`reports`,`explore`,`chatState`,`alwaysOn`,`events`]),Ze=Object.freeze([`sasl-plain`,`bearer`,`guest`]);function Qe(e){return Le(Re(e.discovery,`https:`),e.domain)?e.discovery:`https://${e.domain}${Je}`}function $e(e,t){return Re(e,t)?e.replace(/\/+$/,``):null}function et(e,t){return Array.isArray(e)?[...new Set(e.filter(e=>t.includes(e)))]:[]}function tt(e){if(!e||typeof e!=`object`||Array.isArray(e)||e.schemaVersion!==1)return null;let t=$e(e.apiBaseUrl,`https:`),n={},r=$e(e.branding?.logo,`https:`),i=$e(e.branding?.themeCss,`https:`);return r&&(n.logo=r),i&&(n.themeCss=i),{name:typeof e.name==`string`&&e.name.trim()!==``?e.name.trim().slice(0,60):null,websocketUrl:$e(e.websocketUrl,`wss:`),apiBaseUrl:t,auth:Array.isArray(e.auth)?et(e.auth,Ze):[`sasl-plain`,`guest`],features:t?et(e.features,Xe):[],branding:n}}async function nt(e,{fetch:t=globalThis.fetch,timeoutMs:n=Ye}={}){let r=typeof AbortController==`function`?new AbortController:null,i=r?setTimeout(()=>r.abort(),n):null;try{let n=await t(Qe(e),{headers:{Accept:`application/json`},credentials:`omit`,signal:r?.signal});return!n.ok||n.url&&!Le(Re(n.url,`https:`),e.domain)?null:tt(await n.json())}catch{return null}finally{i&&clearTimeout(i)}}function rt({server:e,discovery:t=null,token:n=null,fetch:r=(...e)=>globalThis.fetch(...e)}){let i=n,a=t?.apiBaseUrl??null,o=new Set(t?.features??[]);function s(t){if(!a)throw Error(`${e.domain} has no API`);if(typeof t!=`string`||/^[a-z][a-z0-9+.-]*:|^\/\/|\\/i.test(t))throw Error(`API path must be relative`);let n=new URL(`${a}/`),r=new URL(t.replace(/^\/+/,``),n);if(r.origin!==n.origin||!r.pathname.startsWith(n.pathname))throw Error(`API path must be relative`);return r.toString()}return{id:e.id,server:e,discovery:t,name:t?.name||e.name,websocketUrl:t?.websocketUrl||e.websocket||null,irc:e.irc??null,apiBaseUrl:a,hasFeature:e=>o.has(e),getToken:()=>i,setToken:e=>{i=e||null},apiUrl:s,api(e,t={}){let n=new Headers(t.headers);return n.has(`Accept`)||n.set(`Accept`,`application/json`),i&&n.set(`Authorization`,`Bearer ${i}`),r(s(e),{...t,headers:n,credentials:`omit`})}}}async function it(e,{token:t=null,fetch:n,timeoutMs:r}={}){return rt({server:e,discovery:await nt(e,{fetch:n,timeoutMs:r}),token:t,fetch:n})}function at(e,t,n,r){let i=[...n],a=i[0]?.startsWith(`#`)?i.shift():e.currentChannel,o=r?i.shift():null,s=i.join(` `).trim();!a?.startsWith(`#`)||r&&!o||!s?e.updateStatus(`Usage: /${t.toLowerCase()} [#channel] ${r?`<name> `:``}<text>`):e.sendRaw(`${t} ${a} ${o?`${o} `:``}:${s}`)}function ot(e){return e.isChatTarget()?!0:(e.addToServerWindow(e.t(`server_chat_only`),{kind:`error`}),!1)}var st={join:(e,t)=>{(e[0]||``).split(`,`).map(e=>e.trim().toLowerCase()).filter(Boolean).forEach(e=>{t.joinChannel(e.startsWith(`#`)?e:`#${e}`)})},part:(e,t)=>{t.partChannel(e)},msg:(e,t)=>{let n=e[0],r=e.slice(1).join(` `);if(n&&r){if(!n.startsWith(`#`)){let e=t.messageManager.keys().find(e=>!e.startsWith(`#`)&&e.toLowerCase()===n.toLowerCase());e&&(n=e)}Ae(n)&&!t.hasOpenQuery(n)?t.sendServiceCommand(n,r):(t.sendOwnMessage(n,r),t.switchChannel(n))}},nick:(e,t)=>{e[0]&&t.sendRaw(`NICK ${e[0]}`)},me:(e,t)=>{ot(t)&&(t.sendOwnMessage(t.currentChannel,e.join(` `),{isAction:!0}),t.scrollToBottom())},ignore:(e,t)=>{let n=e[0];n?t.ignoreUser(n)&&t.updateStatus(`${n} is now ignored.`):t.updateStatus(t.ignoredUsers.length?`Ignored: ${t.ignoredUsers.join(`, `)}`:`Nobody is ignored.`)},unignore:(e,t)=>{let n=e[0];t.unignoreUser(n)&&t.updateStatus(`${n} is no longer ignored.`)},highlight:(e,t)=>{let n=(e[0]||``).toLowerCase(),r=e.slice(1).join(` `).trim();if(n===`add`&&r)t.addHighlightWords(r);else if((n===`del`||n===`remove`)&&r)t.removeHighlightWord(r);else if(n===`clear`)t.setHighlightWords([]);else if(n){t.updateStatus(t.t(`highlight_usage`));return}t.updateStatus(t.highlightWords.length?t.t(`highlight_list`,{words:t.highlightWords.join(`, `)}):t.t(`highlight_empty`))},list:(e,t)=>{t.requestChannelList()},whois:(e,t)=>{let n=e[0];n&&t.sendServerCommand(`WHOIS ${n} ${n}`)},quote:(e,t)=>{t.sendServerCommand(e.join(` `))},raw:(e,t)=>{t.sendServerCommand(e.join(` `))},ctcp:(e,t)=>{let[n,r,...i]=e;!n||!r?t.addToServerWindow(t.t(`server_command_usage`,{usage:`/ctcp <nick> <VERSION|PING|TIME|...>`}),{kind:`error`}):t.sendCtcpRequest(n,r,i.join(` `))},version:(e,t)=>{e[0]?t.sendCtcpRequest(e[0],`VERSION`):t.sendServerCommand(`VERSION`)},ns:(e,t)=>t.sendServiceCommand(`NickServ`,e.join(` `)),cs:(e,t)=>t.sendServiceCommand(`ChanServ`,e.join(` `)),hs:(e,t)=>t.sendServiceCommand(`HostServ`,e.join(` `)),ms:(e,t)=>t.sendServiceCommand(`MemoServ`,e.join(` `)),os:(e,t)=>t.sendServiceCommand(`OperServ`,e.join(` `)),scene:(e,t)=>at(t,`SCENE`,e,!1),umgebung:(e,t)=>at(t,`UMGEBUNG`,e,!1),npc:(e,t)=>at(t,`NPC`,e,!0),npca:(e,t)=>at(t,`NPCA`,e,!0),server:(e,t)=>{t.openServerWindow()},away:(e,t)=>{let n=e.join(` `)||`Away`;t.sendRaw(`AWAY :${n}`),t.activeUsers.setAway(t.nickname,!0),t.updateStatus(`You are now marked as away: ${n}`)},back:(e,t)=>{t.sendRaw(`AWAY`),t.activeUsers.setAway(t.nickname,!1),t.updateStatus(`You are no longer marked as away.`)},roll:(e,t)=>{if(!ot(t))return;let n=Math.floor(Math.random()*20)+1;t.sendOwnMessage(t.currentChannel,`${t.nickname} rolls a d20: ${n}`,{isAction:!0})},flip:(e,t)=>{if(!ot(t))return;let n=Math.random()>.5?`Heads`:`Tails`;t.sendOwnMessage(t.currentChannel,`${t.nickname} flips a coin: ${n}`,{isAction:!0})}},ct={de:{locale:`de-DE`,today:`Heute`,yesterday:`Gestern`,new_messages:`Neue Nachrichten`,new_messages_count:`:count neue Nachrichten`,jump_to_latest:`Zu den neuesten Nachrichten`,sending:`Wird gesendet, sobald die Verbindung wieder steht …`,loading_history:`Ältere Nachrichten werden geladen …`,notification_mention_title:`:sender hat dich in :channel erwähnt`,channels:`Channels`,home:`Home`,home_empty:`Du bist noch in keinem Channel.`,community_no_channels:`Diese Community hat noch keine Channels.`,join_channel:`Channel betreten`,explore_channels:`Channels entdecken`,explore_join:`Beitreten`,explore_joined:`Beigetreten`,bot_badge:`BOT`,bot_title:`Bot (vom Server gekennzeichnet)`,bot_title_service:`Netzwerkdienst`,friends:`Freunde`,uploads:`Medien-Uploads`,friends_hub:`Freunde-Hub`,friends_title:`Freunde`,friends_add_placeholder:`Nick eingeben`,friends_add:`Anfrage senden`,friends_tab_online:`Online`,friends_tab_all:`Alle`,friends_tab_pending:`Anfragen`,friends_search:`Freunde durchsuchen`,friends_state_online:`Online`,friends_state_away:`Abwesend`,friends_state_offline:`Offline`,friends_message:`Nachricht schreiben`,friends_more:`Weitere Aktionen`,friends_none_online:`Gerade ist niemand online.`,friends_none:`Du hast noch keine Freunde. Schick oben eine Anfrage.`,friends_none_found:`Niemand gefunden.`,friends_incoming:`Eingehend`,friends_outgoing:`Ausgehend`,friends_no_requests:`Keine offenen Anfragen.`,friends_accept:`Annehmen`,friends_decline:`Ablehnen`,friends_block:`Blockieren`,friends_cancel_request:`Zurückziehen`,friends_and_dms:`Freunde & DMs`,direct_messages:`Direktnachrichten`,no_direct_messages:`Noch keine Direktnachrichten.`,online_friends:`Freunde online`,no_friends:`Keine Freunde gefunden.`,close_dm:`Unterhaltung schließen`,more_communities:`:count weitere Communities`,discover_communities:`Communities entdecken`,leave_channel:`Channel verlassen`,mark_as_read:`Als gelesen markieren`,open_chat:`Chat öffnen`,remove_friend:`Freund entfernen`,no_channel_selected:`Kein Channel ausgewählt`,no_topic:`Kein Topic gesetzt`,toggle_userlist:`Benutzerliste ein-/ausblenden`,toggle_join_part:`Beitritte/Austritte ein-/ausblenden`,events_joined:`:count beigetreten`,events_left:`:count gegangen`,channel_management:`Channel-Verwaltung`,reconnecting:`Verbindung unterbrochen – neuer Versuch in`,attempt:`Versuch`,connecting:`Verbinde mit IRC …`,users:`Benutzer`,send_message:`Nachricht senden`,ignore:`Ignorieren`,unignore:`Nicht mehr ignorieren`,typing_suffix:`tippt …`,input_placeholder:`Nachricht schreiben – Bild einfügen oder hierher ziehen (Shift+Enter für neue Zeile)`,input_placeholder_text:`Nachricht schreiben (Shift+Enter für neue Zeile)`,server_window:`Server`,server_window_clear:`Server-Fenster leeren`,server_input_placeholder:`IRC-Befehl eingeben, z. B. WHOIS nick, /ns info oder /quote …`,server_not_connected:`nicht verbunden – nicht gesendet`,server_chat_only:`Dieser Befehl geht nur in einem Channel oder einer Unterhaltung.`,server_command_usage:`Verwendung: :usage`,ctcp_sent:`CTCP :command an :nick gesendet`,ctcp_reply:`CTCP :command-Antwort von :nick: :text`,ctcp_ping_reply:`:seconds Sekunden`,whois_user:`:nick ist :user@:host – :realname`,whowas_user:`:nick war :user@:host – :realname`,whois_server:`:nick nutzt Server :server :info`,whois_idle:`:nick ist seit :idle inaktiv`,whois_signon:`, online seit :signon`,whois_channels:`:nick ist in: :channels`,whois_account:`:nick ist eingeloggt als :account`,whois_away:`:nick ist abwesend: :message`,topic_set_by:`Topic von :channel gesetzt von :nick am :date`,channel_created:`:channel erstellt am :date`,reply:`Antworten`,replying_to:`Antwort an`,cancel_reply:`Antwort abbrechen (Esc)`,reply_unknown:`Antwort auf eine ältere Nachricht`,add_reaction:`Reaktion hinzufügen`,react_with:`Mit :emoji reagieren`,search_emoji:`Emojis suchen …`,delete_message:`Nachricht löschen (zweimal klicken, Shift: sofort)`,delete_message_confirm:`Löschen?`,delete_message_failed:`Die Nachricht konnte nicht gelöscht werden.`,message_deleted:`Nachricht gelöscht`,profile_not_found:`Zu diesem Account gibt es kein Profil.`,profile_loading:`Profil wird geladen …`,profile_member_since:`Mitglied seit`,profile_characters:`Charaktere`,profile_mutual_communities:`Gemeinsame Communities`,profile_account:`Account`,profile_no_account:`Nicht angemeldet`,profile_offline:`Nicht online`,profile_away:`Abwesend`,profile_irc_operator:`IRC-Operator`,profile_add_friend:`Als Freund hinzufügen`,profile_is_friend:`Befreundet`,profile_friend_pending:`Anfrage ausstehend`,profile_edit:`Profil bearbeiten`,profile_avatar:`Profilbild`,profile_avatar_hint:`JPG, PNG oder GIF, max. 2 MB. Das Bild wird quadratisch zugeschnitten.`,profile_avatar_choose:`Bild auswählen`,profile_avatar_upload:`Hochladen`,profile_avatar_remove:`Entfernen`,profile_avatar_saved:`Profilbild gespeichert.`,profile_avatar_removed:`Profilbild entfernt.`,profile_avatar_failed:`Das Profilbild konnte nicht gespeichert werden.`,profile_more_settings:`Weitere Einstellungen`,profile_delete_account:`Konto löschen`,profile_close:`Schließen`,profile_status:`Status`,profile_status_placeholder:`Was machst du gerade?`,profile_status_emoji:`Emoji einfügen`,profile_status_save:`Status speichern`,profile_status_clear:`Status entfernen`,profile_status_saved:`Status gespeichert.`,profile_status_cleared:`Status entfernt.`,profile_status_failed:`Der Status konnte nicht gespeichert werden.`,profile_status_recent_emojis:`Zuletzt verwendet`,highlight_words:`Highlight-Wörter`,highlight_words_hint:`Nachrichten mit diesen Wörtern werden wie eine Erwähnung behandelt, zum Beispiel dein Spitzname. Mehrere Wörter mit Komma trennen.`,highlight_add_placeholder:`Wort hinzufügen …`,highlight_add:`Hinzufügen`,highlight_remove:`Entfernen`,highlight_close:`Schließen`,highlight_empty:`Keine Highlight-Wörter festgelegt.`,highlight_list:`Highlight-Wörter: :words`,highlight_usage:`Verwendung: /highlight [add <Wort> | del <Wort> | clear]`,settings_title:`Einstellungen`,settings_search:`Einstellungen durchsuchen …`,settings_search_results:`Suchergebnisse`,settings_search_empty:`Keine passende Einstellung gefunden.`,settings_section_account:`Konto`,settings_section_notifications:`Benachrichtigungen`,settings_section_appearance:`Darstellung`,settings_section_chat:`Chat`,settings_section_media:`Medien`,settings_section_logging:`Logging`,settings_section_connections:`Verbindungen`,settings_connection_account:`Mit deinem Konto synchronisiert`,settings_connection_local:`Einstellungen gelten nur hier`,settings_scope_app:`Gilt für alle Tabs`,settings_scope_browser:`Gilt für diesen Browser`,settings_scope_account:`:app-Konto`,settings_scope_synced:`Mit deinem Konto synchronisiert`,settings_scope_connection:`Nur diese Verbindung`,settings_notification_sound:`Ton bei Erwähnungen`,settings_notification_sound_hint:`Spielt bei Erwähnungen und Highlight-Wörtern, wenn der Channel nicht offen ist. Gilt für dieses Gerät.`,settings_notification_sound_app:`:app`,settings_notification_sound_chime:`Glocke`,settings_notification_sound_drop:`Tropfen`,settings_notification_sound_ping:`Ping`,settings_notification_sound_system:`Systemton`,settings_notification_sound_off:`Aus`,settings_group_popups:`Desktop-Popups`,settings_notify_dm:`Bei Direktnachrichten`,settings_notify_mention:`Bei Erwähnungen und Highlight-Wörtern`,settings_notify_minimized:`Bei jeder Nachricht, wenn minimiert`,settings_notify_minimized_hint:`Auch normale Channel-Nachrichten melden, solange das Fenster minimiert ist.`,settings_browser_notifications:`Browser-Benachrichtigungen`,settings_browser_notifications_hint:`Meldet Erwähnungen und Direktnachrichten, während der Chat im Hintergrund ist.`,settings_browser_notifications_enable:`Erlauben`,settings_browser_notifications_granted:`Aktiv`,settings_browser_notifications_denied:`Im Browser blockiert`,settings_browser_notifications_default:`Noch nicht erlaubt`,settings_theme:`Farbschema`,settings_theme_auto:`Wie das System`,settings_theme_dark:`Dunkel`,settings_theme_light:`Hell`,settings_show_join_part:`Betreten und Verlassen anzeigen`,settings_show_join_part_hint:`Join-, Part- und Quit-Meldungen im Channel.`,settings_show_user_list:`Benutzerliste anzeigen`,settings_ignore_list:`Ignorierte Nutzer`,settings_autojoin:`Autojoin-Channels`,connections_loading:`Verbindungen werden geladen...`,connections_error_load:`Die Verbindungen konnten nicht geladen werden.`,connections_error_save:`Speichern fehlgeschlagen.`,connections_error_delete:`Die Verbindung konnte nicht gelöscht werden.`,connections_current:`Dieser Tab`,connections_add:`Neue Verbindung`,connections_new_home:`:app`,connections_new_home_hint:`Mit deinem :app-Account, inklusive Communities, Freunde und Profil.`,connections_new_directory:`Aus dem Verzeichnis`,connections_new_directory_hint:`Bekannte IRC-Netzwerke mit fertigen Einstellungen.`,connections_new_custom:`Eigener Server`,connections_new_custom_hint:`Ein beliebiges IRC-Netzwerk von Hand einrichten.`,connections_new_title:`Neue Verbindung`,connections_back:`Zurück`,connections_open_tab:`Zum Tab wechseln`,connections_type_external:`Extern`,connections_type_socket:`Direkt (TCP/TLS)`,connections_type_websocket:`WebSocket`,connections_section_server:`Server`,connections_section_login:`Anmeldung`,connections_field_name:`Name`,connections_field_nickname:`Nickname`,connections_field_host:`Host`,connections_field_port:`Port`,connections_field_tls:`TLS verwenden`,connections_field_websocket_url:`WebSocket-Adresse`,connections_field_channel:`Start-Channel`,connections_field_sasl_user:`SASL-Account`,connections_field_sasl_password:`SASL-Passwort`,connections_login_hint_home:`Optional: Mit SASL meldest du dich mit Account-Name und Passwort an, statt über den gespeicherten Login.`,connections_login_hint_external:`Optional: SASL-Anmeldung, wenn du auf diesem Server einen registrierten Account hast.`,connections_password_saved:`Passwort gespeichert`,connections_create:`Verbindung anlegen`,connections_save:`Speichern`,connections_saved:`Gespeichert`,connections_delete:`Verbindung löschen`,connections_delete_confirm:`Wirklich löschen?`,connections_reconnect_hint:`Änderungen gelten ab dem nächsten Verbinden.`,connections_directory_sync:`Aktualisieren`,connections_directory_sync_failed:`Das Verzeichnis konnte nicht aktualisiert werden.`,connections_directory_empty:`Noch keine Server. Aktualisiere das Verzeichnis.`,connections_directory_use:`Übernehmen`,connections_test:`Verbindung testen`,connections_test_ok:`Server erreichbar (:ms ms)`,connections_test_timeout:`Keine Antwort. Host, Port oder Firewall prüfen.`,connections_test_refused:`Verbindung abgelehnt. Stimmt der Port?`,"connections_test_not-found":`Host nicht gefunden. Schreibweise prüfen.`,connections_test_certificate:`Zertifikat ungültig oder selbst signiert. Beim Verbinden kannst du ihm einmalig oder dauerhaft vertrauen.`,connections_test_tls:`TLS-Fehler. Ist TLS für diesen Port richtig eingestellt?`,connections_test_invalid:`Die Serverangaben sind unvollständig.`,connections_test_busy:`Ein Test läuft bereits.`,connections_test_rate_limited:`Bitte kurz warten, bevor du erneut testest.`,connections_test_unknown:`Server nicht erreichbar.`,connection_error_host_required:`Bitte einen Host angeben.`,connection_error_host_invalid:`Nur den Hostnamen angeben, ohne ircs:// oder Pfad.`,connection_error_port:`Der Port muss zwischen 1 und 65535 liegen.`,connection_error_websocket_url:`Bitte eine Adresse mit wss:// oder ws:// angeben.`,connection_error_nickname:`Ungültiger Nickname (Buchstabe am Anfang, keine Leerzeichen, max. 30 Zeichen).`,connection_error_nickname_required:`Bitte einen Nickname angeben.`,connection_error_channel:`Channels beginnen mit # und enthalten keine Leerzeichen.`,connection_error_sasl_password:`Für die SASL-Anmeldung fehlt das Passwort.`,connection_error_unknown:`Diese Verbindung gibt es nicht mehr.`,connection_error_encryption:`Das Passwort kann auf diesem System nicht sicher gespeichert werden.`,settings_autojoin_hint:`Diese Channels werden bei jeder Verbindung betreten, zusätzlich zu den Channels deiner letzten Sitzung. Mehrere mit Komma trennen.`,settings_autojoin_placeholder:`#channel hinzufügen …`,settings_ignore_list_hint:`Nachrichten dieser Nicks werden ausgeblendet. Auch per /ignore und /unignore.`,settings_ignore_placeholder:`Nick hinzufügen …`,settings_rich_presence:`Player-Musik als Status zeigen`,settings_rich_presence_hint:`Was im eingebauten Player läuft, sehen andere im Chat.`,settings_system_media:`Systemmedien als Status zeigen`,settings_system_media_hint:`Auch Musik aus anderen Apps (z. B. Spotify) als Status anzeigen.`,settings_logging_enable:`Chat-Logs speichern`,settings_logging_enable_hint:`Nachrichten dieser Verbindung als Textdateien auf diesem Rechner speichern.`,settings_log_directory:`Log-Verzeichnis`,settings_log_change:`Ändern …`,settings_log_viewer:`Gespeicherte Logs`,settings_log_viewer_open:`Log-Viewer öffnen`,settings_connections_manage:`Verbindungen und Server`,settings_connections_hint:`Profile, Zugangsdaten (SASL) und Server-Liste verwalten.`,settings_connections_open:`Verwalten …`,settings_path_none:`Nicht festgelegt`,settings_list_empty:`Noch keine Einträge.`,settings_spotify:`Spotify-Konto`,settings_spotify_hint:`Verknüpft Spotify mit deinem :app-Konto, damit deine Musik als Status erscheinen kann.`,settings_spotify_connected:`Verbunden`,settings_spotify_not_connected:`Nicht verbunden`,settings_spotify_connect:`Verbinden …`,settings_spotify_disconnect:`Trennen`,settings_section_diagnostics:`Diagnose`,settings_error_report:`Fehlerbericht`,settings_error_report_hint:`Fehler der App werden nur auf diesem Rechner gespeichert. Kopiere den Bericht und schick ihn uns, wenn du ein Problem meldest – Zugangsdaten werden vorher entfernt.`,settings_error_report_count:`:count Einträge`,settings_error_report_copied:`In die Zwischenablage kopiert`,settings_error_report_copy:`Fehlerbericht kopieren`,settings_error_report_clear_label:`Gespeicherte Fehler`,settings_error_report_clear:`Leeren`,notify_level_title:`Benachrichtigungen`,notify_level_all:`Alle Nachrichten`,notify_level_mentions:`Nur Erwähnungen`,notify_level_mute:`Stumm`,close:`Schließen`,settings_push:`Push-Benachrichtigungen`,settings_push_hint:`Erwähnungen und Direktnachrichten kommen auch an, wenn der Chat geschlossen ist. Stummgeschaltete Channels und ignorierte Nutzer bleiben still.`,push_enable:`Aktivieren`,push_registered:`Push-Benachrichtigungen sind auf diesem Gerät aktiv.`,push_status_active:`Aktiv auf diesem Gerät`,push_status_inactive:`Nicht aktiv`,push_status_error:`Nicht aktiv: :error`,push_status_denied_browser:`Im Browser blockiert – in den Website-Einstellungen erlauben`,push_status_denied_app:`Benachrichtigungen sind für die App ausgeschaltet`,push_status_account_only:`Nur mit :app-Konto`,push_status_unsupported_server:`Der Server bietet kein Push an`,push_status_unsupported_device:`Dieser Browser unterstützt kein Push`,settings_android_notifications:`Ton und Vibration`,settings_android_notifications_hint:`Direktnachrichten und Erwähnungen haben eigene Kanäle – in den Android-Einstellungen kannst du beide getrennt laut oder leise stellen.`,settings_android_notifications_open:`Android-Einstellungen öffnen`,share_title:`Teilen mit …`,share_placeholder:`Channel, DM oder Freund suchen …`,share_file_too_large:`:name ist zu groß (höchstens 15 MB) und wird nicht angehängt.`,share_file_account_only:`Dateien kannst du nur mit :app-Konto teilen.`,share_file_unreadable:`Die Datei konnte nicht gelesen werden – die teilende App hat keinen Zugriff erlaubt.`,settings_quit_message:`Quit-Nachricht`,settings_quit_message_hint:`Sehen andere, wenn du dich abmeldest oder den Chat schließt. Leer lassen für den Standardtext.`,settings_quit_message_placeholder:`Avoid staring into the cosmic void. It might stare back at you.`,nick_color:`Namensfarbe`,nick_color_own:`Deine Namensfarbe`,nick_color_hint:`(nur für dich sichtbar)`,nick_color_reset:`Automatische Farbe`,quick_switcher_placeholder:`Wohin? Channel, DM oder Freund …`,quick_switcher_empty:`Nichts gefunden.`,quick_switcher_hint_move:`auswählen`,quick_switcher_hint_open:`öffnen`,quick_switcher_hint_close:`schließen`,shortcut_help_title:`Tastaturkürzel`,shortcut_quick_switcher:`Schnellwechsler`,shortcut_previous_channel:`Vorheriger Channel / vorherige DM`,shortcut_next_channel:`Nächster Channel / nächste DM`,shortcut_color:`Farbe einfügen`,shortcut_bold:`Fett`,shortcut_italic:`Kursiv`,shortcut_underline:`Unterstrichen`,shortcut_complete:`Nick, Channel oder Befehl ergänzen`,shortcut_newline:`Neue Zeile`,shortcut_escape:`Antwort abbrechen / Fenster schließen`,shortcut_help:`Diese Übersicht`,search_messages:`In diesem Chat suchen`,search_placeholder:`Nachrichten oder Nick suchen …`,search_older:`Älterer Treffer (Enter)`,search_newer:`Neuerer Treffer (Shift+Enter)`,search_load_older:`Ältere laden`,shortcut_search:`Im Chat suchen`,copy_invite_link:`Einladungslink kopieren`,invite_link_copied:`Einladungslink in die Zwischenablage kopiert.`,invite_link_copy_failed:`Einladungslink konnte nicht kopiert werden.`,login_welcome:`Willkommen bei :app`,login_invited_to:`Du wurdest nach :channel eingeladen.`,login_username:`Benutzername`,login_password:`Passwort`,login_remember:`Angemeldet bleiben`,login_submit:`Einloggen`,login_loading:`Wird eingeloggt …`,login_guest:`Als Gast fortfahren`,login_guest_loading:`Wird geladen …`,login_no_account:`Noch keinen Account?`,login_register:`Jetzt registrieren`,login_nick_required:`Bitte gib einen Nicknamen ein.`,login_nickname:`Nickname`,login_account_password:`Account-Passwort (optional)`,login_account_password_hint:`Nur für registrierte Nicknames, sonst als Gast.`,login_connect:`Verbinden`,login_advanced:`Erweiterte Einstellungen`,login_server:`Server`,login_server_other:`Anderer Server …`,login_server_domain:`Domain des Servers`,login_server_websocket:`WebSocket-Adresse`,login_start_channel:`Startkanal`,login_start_channel_invalid:`Der Startkanal ist kein gültiger Kanalname.`,server_unreachable:`Keine Verbindung zum Server. Er ist nicht erreichbar oder erlaubt keine Verbindungen von dieser Seite. Versuch einen anderen Server oder den Desktop-Client.`,server_invalid_domain:`Bitte gib eine gültige Domain ein, z. B. irc.example.org.`,server_invalid_websocket:`Die WebSocket-Adresse muss mit wss:// beginnen.`,login_sasl_failed:`Anmeldung fehlgeschlagen: Account oder Passwort stimmen nicht.`,server_no_websocket:`Dieser Server bietet keine WebSocket-Verbindung an. Nutze den Desktop-Client.`,connection_error:`Verbindungsfehler`,emoji_category_smileys:`Smileys`,emoji_category_gestures:`Gesten`,emoji_category_nature:`Natur`,emoji_category_food:`Essen`,emoji_category_travel:`Reisen`,emoji_category_activities:`Aktivitäten`,emoji_category_objects:`Objekte`,emoji_category_symbols:`Symbole`,open_navigation:`Channels und Communities`,input_more:`Weitere Optionen`,input_upload:`Datei hochladen`,input_gif:`GIF senden`,input_colors:`Farbe einfügen`,input_identify:`Bei NickServ identifizieren (:nick)`,input_logout:`Abmelden`,voice_join:`Sprachchat beitreten (experimentell)`,voice_leave:`Sprachchat verlassen`,voice_experimental:`Experimentell`,voice_connecting:`Verbinde …`,voice_connected:`Verbunden`,voice_reconnecting:`Verbindung wird wiederhergestellt …`,voice_mute:`Mikrofon stummschalten`,voice_unmute:`Mikrofon einschalten`,voice_deafen:`Ton aus (taub schalten)`,voice_undeafen:`Ton wieder an`,voice_settings:`Spracheinstellungen`,voice_volume:`Lautstärke`,voice_you:`du`,voice_ptt_hint:`Push-to-Talk: :key gedrückt halten`,voice_mic_denied:`Kein Zugriff aufs Mikrofon. Bitte die Berechtigung erlauben.`,voice_mic_denied_system:`Windows (bzw. das System) blockiert das Mikrofon. Unter Einstellungen → Datenschutz und Sicherheit → Mikrofon den Zugriff für Desktop-Apps erlauben.`,voice_mic_missing:`Kein Mikrofon gefunden. Ist eins angeschlossen und unter „Mikrofon“ ausgewählt?`,voice_mic_busy:`Das Mikrofon lässt sich nicht öffnen – eventuell nutzt es gerade eine andere App exklusiv.`,voice_unreachable:`Der Sprachserver ist nicht erreichbar.`,voice_server_disabled:`Der Sprachchat ist auf diesem Server noch nicht eingerichtet.`,voice_dismiss:`Meldung schließen`,voice_failed:`Der Sprachchat konnte nicht verbunden werden.`,voice_audio_blocked:`Ton ist blockiert – hier klicken, um ihn zu aktivieren`,voice_in_channel:`Im Sprachchat`,voice_not_allowed:`Der Sprachchat ist im Testbetrieb und für dein Konto noch nicht freigeschaltet.`,voice_check_failed:`Dein Nick konnte gerade nicht geprüft werden. Bitte gleich noch einmal versuchen.`,voice_wrong_account:`Dieser Nick gehört nicht zu deinem Konto.`,voice_not_in_channel:`Du musst im Channel sein, um seinem Sprachchat beizutreten.`,voice_left_channel:`Sprachchat beendet, weil du den Channel verlassen hast.`,voice_disconnected:`Sprachchat getrennt.`,voice_filter_failed:`Der Rauschfilter ließ sich nicht laden, der Filter des Browsers ist aktiv.`,voice_call_not_friends:`Anrufe gehen nur zwischen Freunden.`,voice_call_start:`Anrufen (experimentell)`,voice_call_hangup:`Auflegen`,voice_call_incoming:`:nick ruft an`,voice_call_leaves_channel:`Annehmen verlässt den Sprachchat in :channel.`,voice_call_accept:`Annehmen`,voice_call_decline:`Ablehnen`,voice_call_ringing:`Klingelt bei :nick …`,voice_call_with:`Anruf mit :nick`,voice_call_no_answer:`:nick geht nicht ran.`,voice_call_declined:`:nick hat den Anruf abgelehnt.`,voice_call_busy:`:nick ist gerade in einem anderen Gespräch.`,voice_call_ended:`Anruf mit :nick beendet.`,voice_call_missed:`Verpasster Anruf von :nick`,voice_call_notification_body:`Anruf im :app-Chat. Zum Annehmen den Chat öffnen.`,voice_call_gone:`Der Anruf ist schon vorbei.`,voice_call_unsupported:`:nick nutzt gerade einen Client ohne Anruffunktion. Anrufe gehen nur im aktuellen :app-Chat (Web, Desktop, App).`,voice_call_unavailable:`:nick hat den Sprachchat ausgeschaltet und kann gerade keine Anrufe annehmen.`,settings_section_voice:`Sprachchat (experimentell)`,settings_voice_enabled:`Sprachchat in Channels anbieten`,settings_voice_enabled_hint:`Experimentell: In der Channel-Kopfzeile erscheint ein Mikrofon-Knopf. Wer im Channel ist, kann dessen Sprachchat beitreten.`,settings_voice_mode:`Sendemodus`,settings_voice_mode_vad:`Sprachaktivierung`,settings_voice_mode_ptt:`Push-to-Talk`,settings_voice_mode_open:`Immer offen`,settings_voice_ptt_key:`Push-to-Talk-Taste`,settings_voice_ptt_key_hint:`Wirkt, solange das Chatfenster im Vordergrund ist.`,settings_voice_noise:`Rausch- und Echounterdrückung`,settings_voice_noise_hint:`Filter des Browsers gegen Echo, gleichmäßiges Rauschen und schwankende Lautstärke. Gilt ab dem nächsten Beitritt.`,settings_voice_devices:`Geräte und Mikrofontest`,settings_voice_input:`Mikrofon`,settings_voice_output:`Ausgabe`,settings_voice_default_device:`Systemstandard`,settings_voice_sounds:`Töne im Sprachchat`,settings_voice_sounds_hint:`Kurzer Ton, wenn jemand den Sprachchat betritt oder verlässt und wenn du dich stumm oder wieder laut schaltest. Spielt auf dem gewählten Ausgabegerät.`,settings_voice_filter:`Rauschfilter`,settings_voice_filter_browser:`Browser (Standard)`,settings_voice_filter_hint:`RNNoise filtert Tastatur, Lüfter und Hintergrundgeräusche stärker als der Browser und braucht etwas mehr Rechenleistung. Wird beim ersten Mal geladen (etwa 120 KB). Gilt ab dem nächsten Beitritt, der Mikrofontest zeigt es sofort.`,settings_voice_threshold:`Schwelle der Sprachaktivierung`,settings_voice_threshold_hint:`Beim Sprechen soll der Balken über der Markierung liegen, bei Stille darunter. Alles darunter wird nicht gesendet.`,settings_voice_test_start:`Mikrofon testen`,settings_voice_test_stop:`Test beenden`,settings_voice_output_unsupported:`Die Ausgabe folgt hier dem System.`,report:`Melden`,report_message:`Nachricht melden`,report_title:`Melden:`,report_reason:`Was ist das Problem?`,report_details:`Anmerkung (optional)`,report_details_placeholder:`Was ist passiert? Hilfreich sind z. B. Channel und Uhrzeit.`,report_child_safety_hint:`Bitte keine Bilder oder Inhalte speichern oder weiterleiten – ein Hinweis genügt. Bei akuter Gefahr: Notruf 110.`,report_policy_link:`Kinderschutz-Richtlinie`,report_cancel:`Abbrechen`,report_submit:`Meldung senden`,report_reason_required:`Bitte wähle einen Grund aus.`,report_error:`Die Meldung konnte nicht gesendet werden. Bitte versuche es erneut.`,report_error_rate_limited:`Du hast gerade mehrere Meldungen gesendet. Bitte warte ein paar Minuten.`,always_on_title:`Immer erreichbar bleiben?`,always_on_text:`Dein Nick bleibt online, auch wenn die App oder der Browser geschlossen ist – so verpasst du keine Nachrichten. Andere sehen dich dann als „abwesend“.`,always_on_change_later:`Du kannst das jederzeit in den Einstellungen unter „Konto“ ändern.`,always_on_enable:`Ja, aktivieren`,always_on_decline:`Nein, danke`,always_on_setting:`Immer online bleiben`,always_on_setting_hint:`Dein Nick bleibt in den Channels, auch ohne verbundenes Gerät. Nachrichten landen im Verlauf, andere sehen dich als „abwesend“.`,always_on_enabled:`Dein Nick bleibt jetzt online.`,always_on_disabled:`Dein Nick geht offline, sobald kein Gerät mehr verbunden ist.`,always_on_unavailable:`Die Einstellung kann gerade nicht geändert werden. Bitte versuche es später erneut.`,events_title:`Termine`,events_open:`Termine anzeigen`,events_soon:`Termin in den nächsten 24 Stunden`,events_loading:`Termine werden geladen …`,events_failed:`Termine konnten nicht geladen werden.`,events_empty:`Keine Termine in den nächsten 30 Tagen.`,events_retry:`Erneut versuchen`,events_tomorrow:`Morgen`,events_open_channel:`Kanal öffnen`,events_recurrence_weekly:`jede Woche`,events_recurrence_biweekly:`alle 2 Wochen`,events_recurrence_monthly:`jeden Monat`,report_received:`Danke! Deine Meldung ist bei uns eingegangen und wird so schnell wie möglich geprüft.`,report_reason_child_safety:`Gefährdung von Kindern / Minderjährigen`,report_reason_sexual_content:`Sexuelle Inhalte`,report_reason_harassment:`Belästigung oder Bedrohung`,report_reason_hate_speech:`Hass oder Hetze`,report_reason_spam:`Spam oder Werbung`,report_reason_other:`Etwas anderes`,cm_topic_edit:`Topic bearbeiten`,cm_topic_hint:`Tipp: Strg + K fügt einen mIRC-Farbcode ein.`,cancel:`Abbrechen`,cm_topic_set:`Topic setzen`,cm_title:`Channel-Verwaltung`,cm_standard_modes:`Standard-Modes (+n +m +t …)`,apply:`Anwenden`,cm_mode_e_hint:`+E wird hier als Kanalmodus behandelt. Die Bedeutung hängt vom IRC-Server ab (Ergo: RPG-Befehle), daher hat er im Client keine feste Bedeutung.`,cm_custom_modes:`Eigene Modes`,cm_lists_title:`Listenverwaltung`,cm_ban_list:`Banliste (+b)`,cm_exception_list:`Exceptionliste (+e)`,cm_invex_list:`Invite-Exceptions (+I)`,cm_ban_empty:`Keine Ban-Einträge vorhanden.`,cm_exception_empty:`Keine Exception-Einträge vorhanden.`,cm_invex_empty:`Keine Invite-Exception-Einträge vorhanden.`,cm_set_by:`gesetzt von :nick`,remove:`Entfernen`,color_palette:`Farbpalette`,color_palette_open:`Farbpalette öffnen`,emoji_picker:`Emojis`,emoji_picker_open:`Emoji-Auswahl öffnen`,emoji_none:`Keine Emojis gefunden`,gif_search:`GIF suchen`,gif_search_placeholder:`Bei KLIPY suchen …`,gif_picker_open:`GIF-Auswahl öffnen`,gif_none:`Keine GIFs gefunden`,upload_file:`Datei hochladen`,attachment_hint:`Angehängtes Medium (Rücktaste zum Entfernen)`,preview:`Vorschau`,logout:`Abmelden`,identify_nickserv:`Bei NickServ identifizieren`,password:`Passwort`,identify:`Identifizieren`,narration_title:`Umgebung`,notice_badge:`Notice`,explore_title:`Communities und Channels entdecken`,explore_tab_list:`Liste (Server)`,explore_tab_communities:`Communities`,explore_server_list:`Channel-Liste des Servers`,refresh:`Aktualisieren`,loading:`Wird geladen …`,explore_search_placeholder:`Channel oder Topic suchen …`,explore_count:`:shown von :total Channels`,explore_count_query:`für „:query“`,explore_none_found:`Keine Channels gefunden.`,explore_none:`Keine Channels verfügbar.`,explore_no_topic:`Kein Topic`,channels_label:`Channels:`,uploads_title:`Uploads`,uploads_intro:`Hier verwaltest du deine Uploads. „Link kopieren“ legt die URL in die Zwischenablage, „Löschen“ entfernt Datei und Eintrag.`,uploads_empty:`Noch keine Uploads vorhanden.`,uploads_no_caption:`Ohne Beschreibung`,copy_link:`Link kopieren`,delete:`Löschen`},en:{locale:`en-GB`,today:`Today`,yesterday:`Yesterday`,new_messages:`New messages`,new_messages_count:`:count new messages`,jump_to_latest:`Jump to latest messages`,sending:`Will be sent once the connection is back …`,loading_history:`Loading older messages …`,notification_mention_title:`:sender mentioned you in :channel`,channels:`Channels`,home:`Home`,home_empty:`You have not joined any channel yet.`,community_no_channels:`This community has no channels yet.`,join_channel:`Join channel`,explore_channels:`Explore channels`,explore_join:`Join`,explore_joined:`Joined`,bot_badge:`BOT`,bot_title:`Bot (marked by the server)`,bot_title_service:`Network service`,friends:`Friends`,uploads:`Media uploads`,friends_hub:`Friends hub`,friends_title:`Friends`,friends_add_placeholder:`Enter a nick`,friends_add:`Send request`,friends_tab_online:`Online`,friends_tab_all:`All`,friends_tab_pending:`Requests`,friends_search:`Search friends`,friends_state_online:`Online`,friends_state_away:`Away`,friends_state_offline:`Offline`,friends_message:`Send a message`,friends_more:`More actions`,friends_none_online:`Nobody is online right now.`,friends_none:`You have no friends yet. Send a request above.`,friends_none_found:`Nobody found.`,friends_incoming:`Incoming`,friends_outgoing:`Outgoing`,friends_no_requests:`No open requests.`,friends_accept:`Accept`,friends_decline:`Decline`,friends_block:`Block`,friends_cancel_request:`Withdraw`,friends_and_dms:`Friends & DMs`,direct_messages:`Direct messages`,no_direct_messages:`No direct messages yet.`,online_friends:`Online friends`,no_friends:`No friends found.`,close_dm:`Close conversation`,more_communities:`:count more communities`,discover_communities:`Discover communities`,leave_channel:`Leave channel`,mark_as_read:`Mark as read`,open_chat:`Open chat`,remove_friend:`Remove friend`,no_channel_selected:`No channel selected`,no_topic:`No topic set`,toggle_userlist:`Toggle user list`,toggle_join_part:`Show/hide joins and leaves`,events_joined:`:count joined`,events_left:`:count left`,channel_management:`Channel management`,reconnecting:`Connection lost – retrying in`,attempt:`attempt`,connecting:`Connecting to IRC …`,users:`Users`,send_message:`Send message`,ignore:`Ignore`,unignore:`Unignore`,typing_suffix:`is typing …`,input_placeholder:`Write a message – paste or drop an image (Shift+Enter for a new line)`,input_placeholder_text:`Write a message (Shift+Enter for a new line)`,server_window:`Server`,server_window_clear:`Clear server window`,server_input_placeholder:`Enter an IRC command, e.g. WHOIS nick, /ns info or /quote …`,server_not_connected:`not connected – not sent`,server_chat_only:`This command only works in a channel or conversation.`,server_command_usage:`Usage: :usage`,ctcp_sent:`CTCP :command sent to :nick`,ctcp_reply:`CTCP :command reply from :nick: :text`,ctcp_ping_reply:`:seconds seconds`,whois_user:`:nick is :user@:host – :realname`,whowas_user:`:nick was :user@:host – :realname`,whois_server:`:nick is using server :server :info`,whois_idle:`:nick has been idle for :idle`,whois_signon:`, online since :signon`,whois_channels:`:nick is in: :channels`,whois_account:`:nick is logged in as :account`,whois_away:`:nick is away: :message`,topic_set_by:`Topic of :channel set by :nick on :date`,channel_created:`:channel created on :date`,reply:`Reply`,replying_to:`Replying to`,cancel_reply:`Cancel reply (Esc)`,reply_unknown:`Reply to an older message`,add_reaction:`Add reaction`,react_with:`React with :emoji`,search_emoji:`Search emojis …`,delete_message:`Delete message (click twice, Shift: immediately)`,delete_message_confirm:`Delete?`,delete_message_failed:`The message could not be deleted.`,message_deleted:`Message deleted`,profile_not_found:`There is no profile for this account.`,profile_loading:`Loading profile …`,profile_member_since:`Member since`,profile_characters:`Characters`,profile_mutual_communities:`Mutual communities`,profile_account:`Account`,profile_no_account:`Not logged in`,profile_offline:`Not online`,profile_away:`Away`,profile_irc_operator:`IRC operator`,profile_add_friend:`Add as friend`,profile_is_friend:`Friends`,profile_friend_pending:`Request pending`,profile_edit:`Edit profile`,profile_avatar:`Profile picture`,profile_avatar_hint:`JPG, PNG or GIF, max. 2 MB. The image is cropped to a square.`,profile_avatar_choose:`Choose image`,profile_avatar_upload:`Upload`,profile_avatar_remove:`Remove`,profile_avatar_saved:`Profile picture saved.`,profile_avatar_removed:`Profile picture removed.`,profile_avatar_failed:`The profile picture could not be saved.`,profile_more_settings:`More settings`,profile_delete_account:`Delete account`,profile_close:`Close`,profile_status:`Status`,profile_status_placeholder:`What are you up to?`,profile_status_emoji:`Insert emoji`,profile_status_save:`Save status`,profile_status_clear:`Clear status`,profile_status_saved:`Status saved.`,profile_status_cleared:`Status cleared.`,profile_status_failed:`The status could not be saved.`,profile_status_recent_emojis:`Recently used`,highlight_words:`Highlight words`,highlight_words_hint:`Messages containing these words are treated like a mention, for example your nickname. Separate several words with commas.`,highlight_add_placeholder:`Add a word …`,highlight_add:`Add`,highlight_remove:`Remove`,highlight_close:`Close`,highlight_empty:`No highlight words set.`,highlight_list:`Highlight words: :words`,highlight_usage:`Usage: /highlight [add <word> | del <word> | clear]`,settings_title:`Settings`,settings_search:`Search settings …`,settings_search_results:`Search results`,settings_search_empty:`No matching setting found.`,settings_section_account:`Account`,settings_section_notifications:`Notifications`,settings_section_appearance:`Appearance`,settings_section_chat:`Chat`,settings_section_media:`Media`,settings_section_logging:`Logging`,settings_section_connections:`Connections`,settings_connection_account:`Synced with your account`,settings_connection_local:`Settings stay on this device`,settings_scope_app:`Applies to all tabs`,settings_scope_browser:`Applies to this browser`,settings_scope_account:`:app account`,settings_scope_synced:`Synced with your account`,settings_scope_connection:`This connection only`,settings_notification_sound:`Sound on mentions`,settings_notification_sound_hint:`Plays on mentions and highlight words while the channel is not open. Applies to this device.`,settings_notification_sound_app:`:app`,settings_notification_sound_chime:`Chime`,settings_notification_sound_drop:`Drop`,settings_notification_sound_ping:`Ping`,settings_notification_sound_system:`System sound`,settings_notification_sound_off:`Off`,settings_group_popups:`Desktop pop-ups`,settings_notify_dm:`On direct messages`,settings_notify_mention:`On mentions and highlight words`,settings_notify_minimized:`On every message while minimised`,settings_notify_minimized_hint:`Also report regular channel messages while the window is minimised.`,settings_browser_notifications:`Browser notifications`,settings_browser_notifications_hint:`Reports mentions and direct messages while the chat is in the background.`,settings_browser_notifications_enable:`Allow`,settings_browser_notifications_granted:`Active`,settings_browser_notifications_denied:`Blocked in the browser`,settings_browser_notifications_default:`Not allowed yet`,settings_theme:`Colour scheme`,settings_theme_auto:`Like the system`,settings_theme_dark:`Dark`,settings_theme_light:`Light`,settings_show_join_part:`Show joins and leaves`,settings_show_join_part_hint:`Join, part and quit lines in channels.`,settings_show_user_list:`Show the user list`,settings_ignore_list:`Ignored users`,settings_autojoin:`Autojoin channels`,connections_loading:`Loading connections...`,connections_error_load:`The connections could not be loaded.`,connections_error_save:`Saving failed.`,connections_error_delete:`The connection could not be deleted.`,connections_current:`This tab`,connections_add:`New connection`,connections_new_home:`:app`,connections_new_home_hint:`With your :app account, including communities, friends and profile.`,connections_new_directory:`From the directory`,connections_new_directory_hint:`Well-known IRC networks with ready-made settings.`,connections_new_custom:`Own server`,connections_new_custom_hint:`Set up any IRC network by hand.`,connections_new_title:`New connection`,connections_back:`Back`,connections_open_tab:`Switch to tab`,connections_type_external:`External`,connections_type_socket:`Direct (TCP/TLS)`,connections_type_websocket:`WebSocket`,connections_section_server:`Server`,connections_section_login:`Sign-in`,connections_field_name:`Name`,connections_field_nickname:`Nickname`,connections_field_host:`Host`,connections_field_port:`Port`,connections_field_tls:`Use TLS`,connections_field_websocket_url:`WebSocket address`,connections_field_channel:`Start channel`,connections_field_sasl_user:`SASL account`,connections_field_sasl_password:`SASL password`,connections_login_hint_home:`Optional: with SASL you sign in with account name and password instead of the saved login.`,connections_login_hint_external:`Optional: SASL sign-in if you have a registered account on this server.`,connections_password_saved:`Password saved`,connections_create:`Create connection`,connections_save:`Save`,connections_saved:`Saved`,connections_delete:`Delete connection`,connections_delete_confirm:`Really delete?`,connections_reconnect_hint:`Changes apply from the next connect.`,connections_directory_sync:`Refresh`,connections_directory_sync_failed:`The directory could not be refreshed.`,connections_directory_empty:`No servers yet. Refresh the directory.`,connections_directory_use:`Use`,connections_test:`Test connection`,connections_test_ok:`Server reachable (:ms ms)`,connections_test_timeout:`No answer. Check host, port or firewall.`,connections_test_refused:`Connection refused. Is the port right?`,"connections_test_not-found":`Host not found. Check the spelling.`,connections_test_certificate:`Certificate invalid or self-signed. When connecting you can trust it once or permanently.`,connections_test_tls:`TLS error. Is TLS set correctly for this port?`,connections_test_invalid:`The server details are incomplete.`,connections_test_busy:`A test is already running.`,connections_test_rate_limited:`Please wait a moment before testing again.`,connections_test_unknown:`Server not reachable.`,connection_error_host_required:`Please enter a host.`,connection_error_host_invalid:`Enter the host name only, without ircs:// or a path.`,connection_error_port:`The port must be between 1 and 65535.`,connection_error_websocket_url:`Please enter an address starting with wss:// or ws://.`,connection_error_nickname:`Invalid nickname (letter first, no spaces, max. 30 characters).`,connection_error_nickname_required:`Please enter a nickname.`,connection_error_channel:`Channels start with # and contain no spaces.`,connection_error_sasl_password:`The password for SASL sign-in is missing.`,connection_error_unknown:`This connection no longer exists.`,connection_error_encryption:`The password cannot be stored securely on this system.`,settings_autojoin_hint:`These channels are joined on every connect, in addition to the channels of your last session. Separate several with commas.`,settings_autojoin_placeholder:`Add #channel …`,settings_ignore_list_hint:`Messages from these nicks are hidden. Also via /ignore and /unignore.`,settings_ignore_placeholder:`Add a nick …`,settings_rich_presence:`Show player music as status`,settings_rich_presence_hint:`Others see in the chat what is playing in the built-in player.`,settings_system_media:`Show system media as status`,settings_system_media_hint:`Also show music from other apps (e.g. Spotify) as status.`,settings_logging_enable:`Save chat logs`,settings_logging_enable_hint:`Save the messages of this connection as text files on this computer.`,settings_log_directory:`Log directory`,settings_log_change:`Change …`,settings_log_viewer:`Saved logs`,settings_log_viewer_open:`Open log viewer`,settings_connections_manage:`Connections and servers`,settings_connections_hint:`Manage profiles, credentials (SASL) and the server list.`,settings_connections_open:`Manage …`,settings_path_none:`Not set`,settings_list_empty:`No entries yet.`,settings_spotify:`Spotify account`,settings_spotify_hint:`Links Spotify to your :app account so your music can show as your status.`,settings_spotify_connected:`Connected`,settings_spotify_not_connected:`Not connected`,settings_spotify_connect:`Connect …`,settings_spotify_disconnect:`Disconnect`,settings_section_diagnostics:`Diagnostics`,settings_error_report:`Error report`,settings_error_report_hint:`App errors are only stored on this computer. Copy the report and send it to us when you report a problem – credentials are removed first.`,settings_error_report_count:`:count entries`,settings_error_report_copied:`Copied to clipboard`,settings_error_report_copy:`Copy error report`,settings_error_report_clear_label:`Stored errors`,settings_error_report_clear:`Clear`,notify_level_title:`Notifications`,notify_level_all:`All messages`,notify_level_mentions:`Only mentions`,notify_level_mute:`Muted`,close:`Close`,settings_push:`Push notifications`,settings_push_hint:`Mentions and direct messages arrive even when the chat is closed. Muted channels and ignored users stay silent.`,push_enable:`Enable`,push_registered:`Push notifications are active on this device.`,push_status_active:`Active on this device`,push_status_inactive:`Not active`,push_status_error:`Not active: :error`,push_status_denied_browser:`Blocked in the browser – allow it in the site settings`,push_status_denied_app:`Notifications are turned off for the app`,push_status_account_only:`Only with an :app account`,push_status_unsupported_server:`The server offers no push`,push_status_unsupported_device:`This browser does not support push`,settings_android_notifications:`Sound and vibration`,settings_android_notifications_hint:`Direct messages and mentions have their own channels – set each one loud or quiet in the Android settings.`,settings_android_notifications_open:`Open Android settings`,share_title:`Share with …`,share_placeholder:`Search channel, DM or friend …`,share_file_too_large:`:name is too large (15 MB at most) and is not attached.`,share_file_account_only:`Sharing files needs an :app account.`,share_file_unreadable:`The file could not be read – the sharing app did not grant access.`,settings_quit_message:`Quit message`,settings_quit_message_hint:`Others see it when you log out or close the chat. Leave empty for the default text.`,settings_quit_message_placeholder:`Avoid staring into the cosmic void. It might stare back at you.`,nick_color:`Name colour`,nick_color_own:`Your name colour`,nick_color_hint:`(only you see it)`,nick_color_reset:`Automatic colour`,quick_switcher_placeholder:`Where to? Channel, DM or friend …`,quick_switcher_empty:`Nothing found.`,quick_switcher_hint_move:`select`,quick_switcher_hint_open:`open`,quick_switcher_hint_close:`close`,shortcut_help_title:`Keyboard shortcuts`,shortcut_quick_switcher:`Quick switcher`,shortcut_previous_channel:`Previous channel / DM`,shortcut_next_channel:`Next channel / DM`,shortcut_color:`Insert colour`,shortcut_bold:`Bold`,shortcut_italic:`Italic`,shortcut_underline:`Underline`,shortcut_complete:`Complete nick, channel or command`,shortcut_newline:`New line`,shortcut_escape:`Cancel reply / close window`,shortcut_help:`This overview`,search_messages:`Search this chat`,search_placeholder:`Search messages or nick …`,search_older:`Older match (Enter)`,search_newer:`Newer match (Shift+Enter)`,search_load_older:`Load older`,shortcut_search:`Search in chat`,copy_invite_link:`Copy invite link`,invite_link_copied:`Invite link copied to clipboard.`,invite_link_copy_failed:`Could not copy the invite link.`,login_welcome:`Welcome to :app`,login_invited_to:`You have been invited to :channel.`,login_username:`Username`,login_password:`Password`,login_remember:`Remember me`,login_submit:`Log in`,login_loading:`Logging in …`,login_guest:`Continue as guest`,login_guest_loading:`Loading …`,login_no_account:`No account yet?`,login_register:`Sign up now`,login_nick_required:`Please enter a nickname.`,login_nickname:`Nickname`,login_account_password:`Account password (optional)`,login_account_password_hint:`Only for registered nicknames, otherwise as a guest.`,login_connect:`Connect`,login_advanced:`Advanced settings`,login_server:`Server`,login_server_other:`Other server …`,login_server_domain:`Domain of the server`,login_server_websocket:`WebSocket address`,login_start_channel:`Start channel`,login_start_channel_invalid:`The start channel is not a valid channel name.`,server_unreachable:`Could not connect. The server is not reachable or does not accept connections from this page. Try another server or the desktop client.`,server_invalid_domain:`Please enter a valid domain, e.g. irc.example.org.`,server_invalid_websocket:`The WebSocket address must start with wss://.`,login_sasl_failed:`Login failed: account or password is wrong.`,server_no_websocket:`This server offers no WebSocket connection. Use the desktop client.`,connection_error:`Connection error`,emoji_category_smileys:`Smileys`,emoji_category_gestures:`Gestures`,emoji_category_nature:`Nature`,emoji_category_food:`Food`,emoji_category_travel:`Travel`,emoji_category_activities:`Activities`,emoji_category_objects:`Objects`,emoji_category_symbols:`Symbols`,open_navigation:`Channels and communities`,input_more:`More options`,input_upload:`Upload file`,input_gif:`Send a GIF`,input_colors:`Insert colour`,input_identify:`Identify with NickServ (:nick)`,input_logout:`Log out`,voice_join:`Join voice chat (experimental)`,voice_leave:`Leave voice chat`,voice_experimental:`Experimental`,voice_connecting:`Connecting …`,voice_connected:`Connected`,voice_reconnecting:`Reconnecting …`,voice_mute:`Mute microphone`,voice_unmute:`Unmute microphone`,voice_deafen:`Deafen`,voice_undeafen:`Undeafen`,voice_settings:`Voice settings`,voice_volume:`Volume`,voice_you:`you`,voice_ptt_hint:`Push-to-talk: hold :key`,voice_mic_denied:`No access to the microphone. Please allow the permission.`,voice_mic_denied_system:`Windows (or the system) blocks the microphone. Allow access for desktop apps under Settings → Privacy & security → Microphone.`,voice_mic_missing:`No microphone found. Is one connected and selected under "Microphone"?`,voice_mic_busy:`The microphone cannot be opened – another app may be using it exclusively.`,voice_unreachable:`The voice server cannot be reached.`,voice_server_disabled:`Voice chat is not set up on this server yet.`,voice_dismiss:`Dismiss`,voice_failed:`The voice chat could not connect.`,voice_audio_blocked:`Audio is blocked – click here to enable it`,voice_in_channel:`In voice chat`,voice_not_allowed:`Voice chat is in testing and not yet enabled for your account.`,voice_check_failed:`Your nick could not be checked right now. Please try again in a moment.`,voice_wrong_account:`This nick does not belong to your account.`,voice_not_in_channel:`You have to be in the channel to join its voice chat.`,voice_left_channel:`Voice chat ended because you left the channel.`,voice_disconnected:`Voice chat disconnected.`,voice_filter_failed:`The noise filter could not be loaded, the browser filter is active.`,voice_call_not_friends:`Calls only work between friends.`,voice_call_start:`Call (experimental)`,voice_call_hangup:`Hang up`,voice_call_incoming:`:nick is calling`,voice_call_leaves_channel:`Answering leaves the voice chat in :channel.`,voice_call_accept:`Answer`,voice_call_decline:`Decline`,voice_call_ringing:`Ringing :nick …`,voice_call_with:`Call with :nick`,voice_call_no_answer:`:nick does not answer.`,voice_call_declined:`:nick declined the call.`,voice_call_busy:`:nick is in another call.`,voice_call_ended:`Call with :nick ended.`,voice_call_missed:`Missed call from :nick`,voice_call_notification_body:`Call in the :app chat. Open the chat to answer.`,voice_call_gone:`The call is already over.`,voice_call_unsupported:`:nick cannot take calls with their client. Calls only work in the :app chat (web, desktop, app).`,voice_call_unavailable:`:nick has voice chat switched off and cannot take calls right now.`,settings_section_voice:`Voice chat (experimental)`,settings_voice_enabled:`Offer voice chat in channels`,settings_voice_enabled_hint:`Experimental: a microphone button appears in the channel header. Everyone in the channel can join its voice chat.`,settings_voice_mode:`Transmit mode`,settings_voice_mode_vad:`Voice activation`,settings_voice_mode_ptt:`Push-to-talk`,settings_voice_mode_open:`Always open`,settings_voice_ptt_key:`Push-to-talk key`,settings_voice_ptt_key_hint:`Works while the chat window is in the foreground.`,settings_voice_noise:`Noise and echo suppression`,settings_voice_noise_hint:`Filters of the browser against echo, steady noise and varying volume. Applies from the next join.`,settings_voice_devices:`Devices and microphone test`,settings_voice_input:`Microphone`,settings_voice_output:`Output`,settings_voice_default_device:`System default`,settings_voice_sounds:`Voice chat sounds`,settings_voice_sounds_hint:`A short sound when someone joins or leaves the voice chat and when you mute or unmute yourself. Plays on the chosen output device.`,settings_voice_filter:`Noise filter`,settings_voice_filter_browser:`Browser (default)`,settings_voice_filter_hint:`RNNoise removes keyboard, fan and background noise better than the browser and needs a bit more CPU. Loaded on first use (about 120 KB). Applies from the next join, the mic test uses it right away.`,settings_voice_threshold:`Voice activation threshold`,settings_voice_threshold_hint:`While speaking the bar should be above the marker, below it in silence. Everything below is not sent.`,settings_voice_test_start:`Test microphone`,settings_voice_test_stop:`Stop test`,settings_voice_output_unsupported:`Output follows the system here.`,report:`Report`,report_message:`Report message`,report_title:`Report:`,report_reason:`What is the problem?`,report_details:`Note (optional)`,report_details_placeholder:`What happened? Channel and time help us, for example.`,report_child_safety_hint:`Please do not save or forward any images or content – a note is enough. In an emergency, call 112.`,report_policy_link:`Child safety policy`,report_cancel:`Cancel`,report_submit:`Send report`,report_reason_required:`Please choose a reason.`,report_error:`The report could not be sent. Please try again.`,report_error_rate_limited:`You just sent several reports. Please wait a few minutes.`,always_on_title:`Stay reachable?`,always_on_text:`Your nick stays online even when the app or browser is closed – so you will not miss any messages. Others will see you as "away".`,always_on_change_later:`You can change this any time in the settings under "Account".`,always_on_enable:`Yes, enable`,always_on_decline:`No, thanks`,always_on_setting:`Always stay online`,always_on_setting_hint:`Your nick stays in the channels even without a connected device. Messages end up in the history, others see you as "away".`,always_on_enabled:`Your nick now stays online.`,always_on_disabled:`Your nick goes offline as soon as no device is connected.`,always_on_unavailable:`This setting cannot be changed right now. Please try again later.`,events_title:`Events`,events_open:`Show events`,events_soon:`Event within the next 24 hours`,events_loading:`Loading events …`,events_failed:`Could not load the events.`,events_empty:`No events in the next 30 days.`,events_retry:`Try again`,events_tomorrow:`Tomorrow`,events_open_channel:`Open channel`,events_recurrence_weekly:`every week`,events_recurrence_biweekly:`every 2 weeks`,events_recurrence_monthly:`every month`,report_received:`Thank you! We received your report and will review it as soon as possible.`,report_reason_child_safety:`Endangering children / minors`,report_reason_sexual_content:`Sexual content`,report_reason_harassment:`Harassment or threats`,report_reason_hate_speech:`Hate speech`,report_reason_spam:`Spam or advertising`,report_reason_other:`Something else`,cm_topic_edit:`Edit topic`,cm_topic_hint:`Tip: Ctrl + K inserts an mIRC colour code.`,cancel:`Cancel`,cm_topic_set:`Set topic`,cm_title:`Channel management`,cm_standard_modes:`Standard modes (+n +m +t …)`,apply:`Apply`,cm_mode_e_hint:`+E is treated as a channel mode here. Its meaning depends on the IRC server (Ergo: RPG commands), so the client gives it no fixed meaning.`,cm_custom_modes:`Custom modes`,cm_lists_title:`Lists`,cm_ban_list:`Bans (+b)`,cm_exception_list:`Exceptions (+e)`,cm_invex_list:`Invite exceptions (+I)`,cm_ban_empty:`No bans.`,cm_exception_empty:`No exceptions.`,cm_invex_empty:`No invite exceptions.`,cm_set_by:`set by :nick`,remove:`Remove`,color_palette:`Colour palette`,color_palette_open:`Open colour palette`,emoji_picker:`Emojis`,emoji_picker_open:`Open emoji picker`,emoji_none:`No emojis found`,gif_search:`Search GIF`,gif_search_placeholder:`Search KLIPY …`,gif_picker_open:`Open GIF picker`,gif_none:`No GIFs found`,upload_file:`Upload file`,attachment_hint:`Attached media (Backspace to remove)`,preview:`Preview`,logout:`Log out`,identify_nickserv:`Identify with NickServ`,password:`Password`,identify:`Identify`,narration_title:`Scene`,notice_badge:`Notice`,explore_title:`Explore communities and channels`,explore_tab_list:`List (server)`,explore_tab_communities:`Communities`,explore_server_list:`Server channel list`,refresh:`Refresh`,loading:`Loading …`,explore_search_placeholder:`Search channel or topic …`,explore_count:`:shown of :total channels`,explore_count_query:`for “:query”`,explore_none_found:`No channels found.`,explore_none:`No channels available.`,explore_no_topic:`No topic`,channels_label:`Channels:`,uploads_title:`Uploads`,uploads_intro:`Manage your uploads here. “Copy link” puts the URL on the clipboard, “Delete” removes the file and its entry.`,uploads_empty:`No uploads yet.`,uploads_no_caption:`No description`,copy_link:`Copy link`,delete:`Delete`}};function lt(e){let t=Array.isArray(e)?e:[e];for(let e of t){let t=String(e||``).toLowerCase().split(/[-_]/)[0];if(Object.hasOwn(ct,t))return t}return`en`}function ut(e,t){let n=Object.keys(t).sort((e,t)=>t.length-e.length),r=e;for(let e of n)r=r.replaceAll(`:${e}`,String(t[e]));return r}function dt({locale:e,overrides:t={},appName:n=`StarChat`}={}){let r=ct[lt(e)],i=ct.en;return function(e,a={}){let o=t[e]??r[e]??i[e]??e;return ut(String(o),{app:n,...a})}}var ft=Object.fromEntries(Object.entries(Object.assign({"./templates/always-on-dialog.html":`<!--
    Onboarding: asked once per account after the login: should the nick stay online (Ergo always-on)?
    See mixins/always-on.js; the switch lives in the settings ("Account").
-->
<div x-show="alwaysOn.showPrompt"
     x-cloak
     class="quick-switcher-backdrop report-dialog-backdrop"
     @keydown.escape.window="alwaysOn.showPrompt && closeAlwaysOnPrompt()">
    <div class="quick-switcher report-dialog" role="dialog" aria-modal="true" aria-labelledby="alwaysOnDialogTitle">
        <div class="report-dialog-header">
            <i class="bi bi-broadcast text-primary"></i>
            <h2 id="alwaysOnDialogTitle" class="report-dialog-title">{{ t('always_on_title') }}</h2>
            <button type="button" class="btn-close btn-close-white ms-auto" aria-label="{{ t('close') }}" @click="closeAlwaysOnPrompt()"></button>
        </div>
        <div class="report-dialog-body">
            <p class="mb-0">{{ t('always_on_text') }}</p>
            <p class="mb-0 always-on-dialog-hint">{{ t('always_on_change_later') }}</p>

            <div class="report-dialog-error" x-show="alwaysOn.error" x-text="alwaysOn.error" role="alert"></div>

            <div class="report-dialog-actions">
                <button type="button" class="btn btn-sm btn-outline-secondary" @click="declineAlwaysOnPrompt()" :disabled="alwaysOn.saving">
                    {{ t('always_on_decline') }}
                </button>
                <button type="button" class="btn btn-sm btn-primary" @click="acceptAlwaysOnPrompt()" :disabled="alwaysOn.saving">
                    <span x-show="alwaysOn.saving" class="spinner-border spinner-border-sm me-1"></span>
                    {{ t('always_on_enable') }}
                </button>
            </div>
        </div>
    </div>
</div>
`,"./templates/chat-channelbar.html":`<div class="d-flex chat-sidebar-shell overflow-x-hidden"
     :class="{ 'is-mobile-open': mobileSidebarOpen }"
     x-show="sidebarMode != 'uploads' || isMobileLayout" x-cloak>
    <div class="icon-rail d-flex flex-column align-items-center py-3 px-1 gap-1">
        <!-- Channels -->
        <button class="icon-rail-button position-relative"
                :class="{
                    'is-active': sidebarMode === 'channels' && !isServerWindow(),
                    'has-unread': channelsHaveUnread && sidebarMode !== 'channels'
                }"
                title="{{ t('home') }}"
                @click="setSidebarMode('channels')">
            <span class="icon-rail-icon"><i class="bi bi-house-door-fill"></i></span>
            <span class="rail-badge"
                  x-show="channelsMentionCount > 0 && sidebarMode !== 'channels'"
                  x-text="channelsMentionCount"></span>
        </button>

        <!-- Direct messages (and friends, when the server offers them) -->
        <button class="icon-rail-button position-relative"
                :class="{ 'is-active': sidebarMode === 'friends', 'has-unread': friendsIndicatorCount > 0 && sidebarMode !== 'friends' }"
                :title="hasFeature('friends') ? t('friends') : t('direct_messages')"
                @click="setSidebarMode('friends')">
            <span class="icon-rail-icon"><i class="bi" :class="hasFeature('friends') ? 'bi-people-fill' : 'bi-chat-dots-fill'"></i></span>
            <span class="rail-badge"
                  x-show="friendsIndicatorCount > 0"
                  x-text="friendsIndicatorCount"></span>
        </button>

        <!-- Uploads -->
        <template x-if="hasFeature('uploads')">
            <button class="icon-rail-button position-relative"
                    :class="{ 'is-active': sidebarMode === 'uploads' }"
                    title="{{ t('uploads') }}"
                    @click="setSidebarMode('uploads')">
                <span class="icon-rail-icon"><i class="bi bi-collection-play"></i></span>
            </button>
        </template>

        <!-- Server window (status window like in classic IRC clients), no unread counter, only an activity dot -->
        <button class="icon-rail-button position-relative"
                :class="{ 'is-active': isServerWindow() }"
                title="{{ t('server_window') }}"
                @click="openServerWindow()">
            <span class="icon-rail-icon"><i class="bi bi-terminal"></i></span>
            <span class="rail-activity-dot" x-show="serverWindowActivity && !isServerWindow()" x-cloak></span>
        </button>

        <!-- Settings and own profile (bottom of the rail) -->
        <button class="icon-rail-button mt-auto"
                :class="{ 'is-active': settingsWindow.show && settingsWindow.section !== 'account' }"
                title="{{ t('settings_title') }}"
                @click="openSettings()">
            <span class="icon-rail-icon"><i class="bi bi-gear"></i></span>
        </button>
        <template x-if="hasFeature('profiles')">
            <button class="icon-rail-button icon-rail-button--profile"
                    x-show="canUseProfiles()"
                    :class="{ 'is-active': settingsWindow.show && settingsWindow.section === 'account' }"
                    title="{{ t('profile_edit') }}"
                    @click="openProfileEditor()">
                <span class="icon-rail-icon rail-own-avatar nick-bg" :style="nickStyle(nickname)">
                    <template x-if="avatarUrl(nickname)">
                        <img class="nick-avatar-img" :src="avatarUrl(nickname)" alt="" loading="lazy" x-on:error="clearUserAvatar(nickname)">
                    </template>
                    <span x-show="!avatarUrl(nickname)" x-text="nickInitial(nickname)"></span>
                </span>
            </button>
        </template>
    </div>

    <div class="channellist-content overflow-auto" @click="closeMobileSidebarAfterPick($event)">
        <!-- Friends and DMs -->
        <div x-show="sidebarMode === 'friends'" x-cloak>
            <template x-if="hasFeature('friends')">
                <div>
                    <button type="button"
                            class="channel-item channel-item--hub mb-3"
                            :class="{ 'is-active': !selectedFriendName || !isDirectMessageChannel(currentChannel) }"
                            @click="openFriendsHub()">
                        <i class="bi bi-house-door channel-item-icon"></i>
                        <span class="channel-item-name">{{ t('friends_hub') }}</span>
                        <span class="mention-badge" x-show="pendingFriendRequestCount > 0" x-text="pendingFriendRequestCount"></span>
                    </button>

                    <!-- Friends: their DMs (latest activity first), then online friends without a DM -->
                    <div x-show="friendDmKeys().length || onlineFriendsWithoutDm().length">
                        <div class="sidebar-section-title">
                            <span>{{ t('friends_title') }}</span>
                        </div>
                        <div class="d-flex flex-column gap-1 mb-3">
                            <template x-for="user in friendDmKeys()" :key="user">
                                {{> dm-sidebar-item }}
                            </template>
                            <template x-for="friend in onlineFriendsWithoutDm()" :key="friend.friendship_id">
                                <button type="button"
                                        class="channel-item channel-item--idle"
                                        @click="openFriendChat(friend.user.display)"
                                        @contextmenu.prevent="openFriendContextMenu(friend, $event)"
                                        @touchstart.passive="startLongPress($event, (e) => openFriendContextMenu(friend, e))"
                                        @touchmove.passive="moveLongPress($event)"
                                        @touchend="endLongPress($event)"
                                        @touchcancel="cancelLongPress()">
                                    <span class="channel-item-avatar nick-bg position-relative" :style="nickStyle(friend.user.display)">
                                        <template x-if="avatarUrl(friend.user.display)">
                                            <img class="nick-avatar-img" :src="avatarUrl(friend.user.display)" alt="" loading="lazy" x-on:error="clearUserAvatar(friend.user.display)">
                                        </template>
                                        <span x-show="!avatarUrl(friend.user.display)" x-text="nickInitial(friend.user.display)"></span>
                                        <span class="presence-dot is-online"></span>
                                    </span>
                                    <span class="channel-item-name" x-text="friend.user.display"></span>
                                </button>
                            </template>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Everyone else (latest activity first) -->
            <div x-show="otherDmKeys().length || !privateMessageKeys.length">
                <div class="sidebar-section-title">
                    <span>{{ t('direct_messages') }}</span>
                </div>
                <div class="d-flex flex-column gap-1 mb-3">
                    <template x-for="user in otherDmKeys()" :key="user">
                        {{> dm-sidebar-item }}
                    </template>
                    <div class="sidebar-empty" x-show="privateMessageKeys.length === 0">{{ t('no_direct_messages') }}</div>
                </div>
            </div>
        </div>

        <!-- Channels -->
        <div class="position-relative" x-show="sidebarMode === 'channels'" x-cloak>
            <div class="sidebar-section-title">
                <span class="text-truncate me-auto" x-text="serverName || t('home')"></span>
                <template x-if="hasFeature('events')">
                    <button class="sidebar-section-action sidebar-events-button"
                            x-show="showEventsButton()"
                            :class="{ 'is-open': communityEvents.open }"
                            :title="hasEventSoon() ? t('events_soon') : t('events_open')"
                            :aria-expanded="communityEvents.open ? 'true' : 'false'"
                            x-ref="eventsButton"
                            @click="toggleCommunityEvents()">
                        <i class="bi bi-calendar-event"></i>
                        <span class="sidebar-events-dot" x-show="hasEventSoon()"></span>
                    </button>
                </template>
                <template x-if="hasFeature('explore')">
                    <button class="sidebar-section-action" title="{{ t('explore_channels') }}" @click="openExploreModal()">
                        <i class="bi bi-plus-lg"></i>
                    </button>
                </template>
            </div>
            <template x-if="hasFeature('events')">
                <div>{{> community-events }}</div>
            </template>
            <div class="d-flex flex-column gap-1">
                <template x-for="entry in channelListEntries" :key="entry.name">
                    <div class="channel-list-entry">
                    <div class="channel-group-label text-truncate" x-show="entry.groupLabel" x-text="entry.groupLabel"></div>
                    <button type="button"
                            class="channel-item"
                            :class="{
                                'is-muted': entry.joined && channelNotifyLevel(entry.name) === 'mute',
                                'is-active': entry.name === currentChannel,
                                'is-unread': entry.joined && entry.name !== currentChannel && hasUnread(entry.name),
                                'is-not-joined': !entry.joined
                            }"
                            :title="entry.joined ? '' : t('join_channel')"
                            @click="entry.joined ? switchChannel(entry.name) : joinChannel(entry.name)"
                            @contextmenu.prevent="entry.joined && openChannelContextMenu(entry.name, $event)"
                            @touchstart.passive="startLongPress($event, (e) => entry.joined && openChannelContextMenu(entry.name, e))"
                            @touchmove.passive="moveLongPress($event)"
                            @touchend="endLongPress($event)"
                            @touchcancel="cancelLongPress()">
                        <i class="bi bi-hash channel-item-icon"></i>
                        <span class="channel-item-name" x-text="entry.name.replace(/^#/, '')"></span>
                        <i class="bi bi-plus-lg channel-item-join" x-show="!entry.joined"></i>
                        <i class="bi bi-bell-slash channel-item-notify" x-show="entry.joined && channelNotifyLevel(entry.name) === 'mute'" title="{{ t('notify_level_mute') }}"></i>
                        <i class="bi bi-at channel-item-notify" x-show="entry.joined && channelNotifyLevel(entry.name) === 'mentions'" title="{{ t('notify_level_mentions') }}"></i>
                        <span class="mention-badge" x-show="entry.name !== currentChannel && mentionCountFor(entry.name) > 0" x-text="mentionCountFor(entry.name)"></span>
                    </button>
                    </div>
                </template>
                <div class="sidebar-empty" x-show="channelListEntries.length === 0">
                    <span x-text="t('home_empty')"></span>
                </div>
            </div>
        </div>
    </div>
</div>

<div x-show="contextMenu.show"
     x-cloak
     x-ref="contextMenu"
     class="chat-context-menu"
     :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }"
     @click.outside="contextMenu.show = false">

    <div class="chat-context-menu-title" x-text="contextMenu.channel"></div>
    <button type="button" class="context-action"
            x-show="hasUnread(contextMenu.channel)"
            @click="markTargetRead(contextMenu.channel)">
        <i class="bi bi-check2-all"></i> {{ t('mark_as_read') }}
    </button>
    <div class="chat-context-menu-section">{{ t('notify_level_title') }}</div>
    <template x-for="[level, icon] in [['all', 'bi-bell'], ['mentions', 'bi-at'], ['mute', 'bi-bell-slash']]" :key="level">
        <button type="button" class="context-action"
                role="menuitemradio"
                :aria-checked="channelNotifyLevel(contextMenu.channel) === level"
                @click="setChannelNotifyLevel(contextMenu.channel, level)">
            <i class="bi" :class="icon"></i> <span x-text="t('notify_level_' + level)"></span>
            <i class="bi bi-check2 ms-auto" x-show="channelNotifyLevel(contextMenu.channel) === level"></i>
        </button>
    </template>
    <template x-if="hasModule('invites')">
        <button type="button" class="context-action"
                x-show="canShareInvites() && channelInviteUrl(contextMenu.channel)"
                @click="copyInviteLink(channelInviteUrl(contextMenu.channel))">
            <i class="bi bi-link-45deg"></i> {{ t('copy_invite_link') }}
        </button>
    </template>
    <button type="button" class="context-action text-danger" @click="partChannel(contextMenu.channel)">
        <i class="bi bi-box-arrow-left"></i> {{ t('leave_channel') }}
    </button>
</div>

<template x-if="hasFeature('friends')">
    <div x-show="friendContextMenu.show"
         x-cloak
         class="chat-context-menu"
         :style="{ top: friendContextMenu.y + 'px', left: friendContextMenu.x + 'px' }"
         @click.outside="friendContextMenu.show = false">

        <div class="chat-context-menu-title" x-text="friendContextMenu.friendName"></div>
        <button type="button" class="context-action" @click="openFriendChat(friendContextMenu.friendName)">
            <i class="bi bi-chat-dots"></i> {{ t('open_chat') }}
        </button>
        <button type="button" class="context-action text-danger" @click="removeFriendFromContextMenu()">
            <i class="bi bi-person-dash"></i> {{ t('remove_friend') }}
        </button>
    </div>
</template>
`,"./templates/chat-header.html":`<div class="chat-header">
    <div class="chat-header-row">
        <!-- Small screens: opens the channel/community drawer -->
        <button type="button" class="chat-header-btn chat-header-menu-btn position-relative"
                title="{{ t('open_navigation') }}"
                aria-label="{{ t('open_navigation') }}"
                :aria-expanded="mobileSidebarOpen"
                @click="toggleMobileSidebar()">
            <i class="bi bi-list"></i>
            <span class="chat-header-menu-dot" x-show="hasUnreadOutsideCurrentView()" x-cloak></span>
        </button>
        <h1 class="chat-header-title">
            <i class="bi" :class="isServerWindow() ? 'bi-terminal' : (currentChannel && currentChannel.startsWith('#') ? 'bi-hash' : 'bi-at')"></i>
            <span x-text="isServerWindow() ? t('server_window') : (currentChannel ? currentChannel.replace(/^#/, '') : t('no_channel_selected'))"></span>
        </h1>

        <template x-if="currentChannel && currentChannel.startsWith('#')">
            <button type="button"
                    class="chat-header-topic"
                    :class="{ 'is-editable': canManageCurrentChannel() }"
                    :title="canManageCurrentChannel() ? 'Topic bearbeiten' : ''"
                    @click="openTopicEditor()"
                    x-html="$store.channelTopics?.[currentChannel] ? channelTopic : escapeHtml(t('no_topic'))">
            </button>
        </template>

        <div class="chat-header-actions">
            <!-- Voice chat of the channel (experimental, Settings -> Voice chat) -->
            <template x-if="hasFeature('voice')">
            <button class="chat-header-btn"
                    :class="{ 'is-active': isInVoice(currentChannel), 'chat-header-btn--voice-live': isInVoice(currentChannel) }"
                    x-show="currentChannel?.startsWith('#') && (canJoinVoice(currentChannel) || isInVoice(currentChannel))"
                    x-cloak
                    :disabled="voice.state === 'connecting'"
                    :title="isInVoice(currentChannel) ? t('voice_leave') : t('voice_join')"
                    :aria-label="isInVoice(currentChannel) ? t('voice_leave') : t('voice_join')"
                    @click="toggleVoice(currentChannel)">
                <i class="bi" :class="isInVoice(currentChannel) ? 'bi-telephone-x' : 'bi-mic'"></i>
            </button>
            </template>
            <!-- Voice call with a friend (DM window, experimental) -->
            <template x-if="hasFeature('calls')">
            <button class="chat-header-btn"
                    :class="{ 'is-active': isInCallWith(currentChannel), 'chat-header-btn--voice-live': isInCallWith(currentChannel) }"
                    x-show="canCallUser(currentChannel) || isInCallWith(currentChannel)"
                    x-cloak
                    :disabled="voice.state === 'connecting' && !isInCallWith(currentChannel)"
                    :title="isInCallWith(currentChannel) ? t('voice_call_hangup') : t('voice_call_start')"
                    :aria-label="isInCallWith(currentChannel) ? t('voice_call_hangup') : t('voice_call_start')"
                    @click="isInCallWith(currentChannel) ? hangUpCall() : startCall(currentChannel)">
                <i class="bi" :class="isInCallWith(currentChannel) ? 'bi-telephone-x' : 'bi-telephone'"></i>
            </button>
            </template>
            <button class="chat-header-btn"
                    :class="{ 'is-active': messageSearch.open }"
                    x-show="currentChannel && !isServerWindow()"
                    title="{{ t('search_messages') }} (Ctrl+F)"
                    @click="messageSearch.open ? closeMessageSearch() : openMessageSearch()">
                <i class="bi bi-search"></i>
            </button>
            <button class="chat-header-btn"
                    x-show="isServerWindow()"
                    @click="clearServerWindow()"
                    title="{{ t('server_window_clear') }}">
                <i class="bi bi-eraser"></i>
            </button>
            <button class="chat-header-btn"
                    x-show="canManageCurrentChannel()"
                    @click="openChannelManagement()"
                    title="{{ t('channel_management') }}">
                <i class="bi bi-sliders"></i>
            </button>
            <button class="chat-header-btn chat-header-btn--desktop"
                    :class="{ 'is-active': highlightWords.length > 0 }"
                    title="{{ t('highlight_words') }}"
                    @click="openSettings('notifications')">
                <i class="bi" :class="highlightWords.length > 0 ? 'bi-bell-fill' : 'bi-bell'"></i>
            </button>
            <button class="chat-header-btn chat-header-btn--desktop"
                    :class="{ 'is-active': !hideJoinPart }"
                    x-show="currentChannel && currentChannel.startsWith('#')"
                    title="{{ t('toggle_join_part') }}"
                    @click="toggleJoinPart()">
                <i class="bi" :class="hideJoinPart ? 'bi-door-closed' : 'bi-door-open'"></i>
            </button>
            <button class="chat-header-btn"
                    :class="{ 'is-active': userListOpen }"
                    x-show="currentChannel && currentChannel.startsWith('#') && sidebarMode === 'channels'"
                    title="{{ t('toggle_userlist') }}"
                    @click="toggleUserList()">
                <i class="bi bi-people-fill"></i>
            </button>
        </div>
    </div>
    <template x-if="hasFeature('voice')">
        <div>{{> voice-bar }}</div>
    </template>
    <!-- Message search (Ctrl+F) -->
    <div class="message-search" x-show="messageSearch.open" x-cloak role="search">
        <i class="bi bi-search"></i>
        <input type="search"
               x-ref="messageSearchInput"
               x-model="messageSearch.query"
               @input.debounce.150ms="messageSearchInput()"
               @keydown.enter.prevent="messageSearchStep($event.shiftKey ? -1 : 1)"
               @keydown.escape.prevent.stop="closeMessageSearch()"
               placeholder="{{ t('search_placeholder') }}"
               aria-label="{{ t('search_messages') }}">
        <span class="message-search-counter" x-text="messageSearchCounter()"></span>
        <button type="button" class="chat-header-btn" title="{{ t('search_newer') }}"
                :disabled="messageSearchResults().length < 2" @click="messageSearchStep(-1)">
            <i class="bi bi-chevron-down"></i>
        </button>
        <button type="button" class="chat-header-btn" title="{{ t('search_older') }}"
                :disabled="messageSearchResults().length < 2" @click="messageSearchStep(1)">
            <i class="bi bi-chevron-up"></i>
        </button>
        <button type="button" class="btn btn-sm btn-outline-secondary message-search-more"
                x-show="canLoadOlderForSearch()"
                :disabled="historyLoadingByTarget[currentChannel]"
                @click="loadOlderForSearch()">
            {{ t('search_load_older') }}
        </button>
        <button type="button" class="chat-header-btn" title="{{ t('close') }}" @click="closeMessageSearch()">
            <i class="bi bi-x-lg"></i>
        </button>
    </div>
    <!-- Reconnect Banner -->
    <div x-show="connectionState !== 'connected'"
         x-cloak
         class="reconnect-banner"
         :class="{
         'reconnect-banner--reconnecting': connectionState === 'reconnecting',
         'reconnect-banner--connecting':   connectionState === 'connecting'
     }">
        <template x-if="connectionState === 'reconnecting'">
        <span>
            <span class="reconnect-spinner"></span>
            {{ t('reconnecting') }}
            <strong x-text="reconnectDelay + 's'"></strong>
            ({{ t('attempt') }} <span x-text="reconnectAttempt"></span>)
        </span>
        </template>
        <template x-if="connectionState === 'connecting'">
        <span>
            <span class="reconnect-spinner"></span>
            {{ t('connecting') }}
        </span>
        </template>
    </div>
</div>

<div x-show="$store.channelManagement.showTopicEditor"
     x-cloak
     class="position-fixed top-50 start-50 translate-middle bg-dark text-light border border-secondary-subtle rounded shadow p-3"
     style="z-index: 1080; min-width: 420px; max-width: 90vw;"
     @click.outside="$store.channelManagement.showTopicEditor = false">
    <h6 class="mb-2">{{ t('cm_topic_edit') }}</h6>
    <div class="small text-muted mb-2">{{ t('cm_topic_hint') }}</div>
    <textarea class="form-control form-control-sm bg-black text-light border-secondary"
              rows="4"
              x-model="$store.channelManagement.topicDraft"
              @keydown="insertTopicColorCode($event)"></textarea>
    <div class="d-flex justify-content-end gap-2 mt-3">
        <button class="btn btn-sm btn-outline-secondary" @click="$store.channelManagement.showTopicEditor = false">{{ t('cancel') }}</button>
        <button class="btn btn-sm btn-primary" @click="applyChannelTopic()">{{ t('cm_topic_set') }}</button>
    </div>
</div>

<div x-show="$store.channelManagement.showPanel"
     x-cloak
     class="position-fixed top-50 start-50 translate-middle bg-dark text-light border border-secondary-subtle rounded shadow p-3"
     style="z-index: 1080; min-width: 640px;  max-width: 400px;"
     @click.outside="$store.channelManagement.showPanel = false">
    <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="mb-0">{{ t('cm_title') }} · <span x-text="currentChannel"></span></h6>
        <button class="btn btn-sm btn-outline-secondary" @click="$store.channelManagement.showPanel = false">×</button>
    </div>

    <div class="row g-3">
        <div class="col-md-12">
            <label class="form-label small">{{ t('cm_standard_modes') }}</label>
            <div class="input-group input-group-sm mb-2">
                <input class="form-control bg-black text-light border-secondary" x-model="$store.channelManagement.channelModesDraft" placeholder="+nt">
                <button class="btn btn-outline-primary" @click="applyChannelModes()">{{ t('apply') }}</button>
            </div>
            <div class="d-flex flex-wrap gap-3 small">
                <template x-for="mode in $store.channelManagement.commonChannelModes" :key="mode">
                    <label class="form-check form-switch mb-0 d-flex align-items-center gap-1">
                        <input class="form-check-input" type="checkbox"
                               :checked="$store.channelManagement.standardModeState?.[mode]"
                               @change="setStandardMode(mode, $event.target.checked)">
                        <span x-text="'+' + mode"></span>
                    </label>
                </template>
            </div>
            <div class="small text-muted mt-2">
                {{ t('cm_mode_e_hint') }}
            </div>
        </div>
    </div>
    <div class="row g-3">
        <div class="col-md-12">
            <label class="form-label small">{{ t('cm_custom_modes') }}</label>
            <div class="input-group input-group-sm mb-2">
                <input class="form-control bg-black text-light border-secondary" x-model="$store.channelManagement.customModesDraft" placeholder="+f 5:30">
                <button class="btn btn-outline-primary" @click="applyCustomModes()">{{ t('apply') }}</button>
            </div>
        </div>
    </div>
</div>


<div x-show="$store.channelManagement.showListManager"
     x-cloak
     class="position-fixed top-50 start-50 translate-middle bg-dark text-light border border-secondary-subtle rounded shadow p-3"
     style="z-index: 1090; min-width: 720px; max-width: 95vw;"
     @click.outside="$store.channelManagement.showListManager = false">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="mb-0">{{ t('cm_lists_title') }} · <span x-text="currentChannel"></span></h6>
        <button class="btn btn-sm btn-outline-secondary" @click="$store.channelManagement.showListManager = false">×</button>
    </div>

    <div class="btn-group btn-group-sm mb-3" role="group">
        <button class="btn" :class="$store.channelManagement.listManagerTab === 'ban' ? 'btn-secondary' : 'btn-outline-secondary'" @click="$store.channelManagement.listManagerTab = 'ban'">{{ t('cm_ban_list') }}</button>
        <button class="btn" :class="$store.channelManagement.listManagerTab === 'exception' ? 'btn-secondary' : 'btn-outline-secondary'" @click="$store.channelManagement.listManagerTab = 'exception'">{{ t('cm_exception_list') }}</button>
        <button class="btn" :class="$store.channelManagement.listManagerTab === 'invex' ? 'btn-secondary' : 'btn-outline-secondary'" @click="$store.channelManagement.listManagerTab = 'invex'">{{ t('cm_invex_list') }}</button>
    </div>

    <div x-show="$store.channelManagement.listManagerTab === 'ban'">
        <div class="small text-muted mb-2" x-show="$store.channelManagement.banList.length === 0">{{ t('cm_ban_empty') }}</div>
        <template x-for="entry in $store.channelManagement.banList" :key="entry.mask">
            <div class="d-flex justify-content-between align-items-center border border-secondary-subtle rounded p-2 mb-2">
                <div class="small">
                    <div class="fw-semibold" x-text="entry.mask"></div>
                    <div class="text-muted" x-text="entry.by ? t('cm_set_by', { nick: entry.by }) : ''"></div>
                </div>
                <button class="btn btn-sm btn-outline-danger" @click="removeBan(entry.mask)">{{ t('remove') }} (-b)</button>
            </div>
        </template>
    </div>

    <div x-show="$store.channelManagement.listManagerTab === 'exception'">
        <div class="small text-muted mb-2" x-show="$store.channelManagement.exceptionList.length === 0">{{ t('cm_exception_empty') }}</div>
        <template x-for="entry in $store.channelManagement.exceptionList" :key="entry.mask">
            <div class="d-flex justify-content-between align-items-center border border-secondary-subtle rounded p-2 mb-2">
                <div class="small">
                    <div class="fw-semibold" x-text="entry.mask"></div>
                    <div class="text-muted" x-text="entry.by ? t('cm_set_by', { nick: entry.by }) : ''"></div>
                </div>
                <button class="btn btn-sm btn-outline-danger" @click="removeException(entry.mask)">{{ t('remove') }} (-e)</button>
            </div>
        </template>
    </div>

    <div x-show="$store.channelManagement.listManagerTab === 'invex'">
        <div class="small text-muted mb-2" x-show="$store.channelManagement.invexList.length === 0">{{ t('cm_invex_empty') }}</div>
        <template x-for="entry in $store.channelManagement.invexList" :key="entry.mask">
            <div class="d-flex justify-content-between align-items-center border border-secondary-subtle rounded p-2 mb-2">
                <div class="small">
                    <div class="fw-semibold" x-text="entry.mask"></div>
                    <div class="text-muted" x-text="entry.by ? t('cm_set_by', { nick: entry.by }) : ''"></div>
                </div>
                <button class="btn btn-sm btn-outline-danger" @click="removeInvex(entry.mask)">{{ t('remove') }} (-I)</button>
            </div>
        </template>
    </div>
</div>
`,"./templates/chat-input.html":`<div class="chat-input-bar position-relative">
    <div class="chat-input-outer">
        <!-- Reply bar (IRCv3 +draft/reply) -->
        <template x-if="replyingTo && replyingTo.target === currentChannel">
            <div class="chat-reply-bar">
                <i class="bi bi-reply-fill"></i>
                <span class="chat-reply-label">{{ t('replying_to') }}</span>
                <span class="chat-reply-author nick-color" :style="nickStyle(replyingTo.user)" x-text="replyingTo.user"></span>
                <span class="chat-reply-text" x-text="replyingTo.text"></span>
                <button type="button" class="chat-reply-cancel" title="{{ t('cancel_reply') }}" @click="cancelReply()">
                    <i class="bi bi-x-circle-fill"></i>
                </button>
            </div>
        </template>

        <div class="input-group chat-input-group">
            <!-- Small screens: secondary tools live behind "+" (Discord-style), see .chat-input-desktop-only -->
            <button type="button" class="btn chat-tool-btn chat-more-btn chat-input-mobile-only"
                    x-ref="inputMoreButton"
                    :class="{ 'is-active': showInputMoreMenu }"
                    :aria-expanded="showInputMoreMenu"
                    title="{{ t('input_more') }}" aria-label="{{ t('input_more') }}"
                    @click="toggleInputMoreMenu()">
                <i class="bi bi-plus-circle-fill"></i>
            </button>
            <span class="input-group-text chat-nick-badge cursor-pointer chat-input-desktop-only" x-text="nickname" @click="toggleIdentifyPrompt"></span>
            <template x-if="isServerWindow()">
                <span class="input-group-text chat-server-badge"><i class="bi bi-terminal"></i></span>
            </template>
            <button class="btn chat-tool-btn chat-input-desktop-only" x-show="!isServerWindow()" @click="toggleColorPicker" title="{{ t('color_palette') }}" aria-label="{{ t('color_palette_open') }}">
                <i class="bi bi-palette"></i>
            </button>
            <button class="btn chat-tool-btn chat-emoji-btn" x-show="!isServerWindow()" @click="toggleEmojiPicker" title="{{ t('emoji_picker') }}" aria-label="{{ t('emoji_picker_open') }}">
                <i class="bi bi-emoji-smile"></i>
            </button>
            <template x-if="hasFeature('gifs')">
            <button class="btn chat-tool-btn chat-input-desktop-only" x-show="!isServerWindow()" @click="toggleGifPicker" title="{{ t('gif_search') }}" aria-label="{{ t('gif_picker_open') }}">
                <i class="bi bi-filetype-gif"></i>
            </button>
            </template>
            <template x-if="hasFeature('uploads')">
            <button class="btn chat-tool-btn chat-input-desktop-only" x-show="canUploadMedia() && !isServerWindow()" @click="triggerMediaUpload" :disabled="mediaUploadInProgress" title="{{ t('upload_file') }}" aria-label="{{ t('upload_file') }}">
                <i class="bi bi-paperclip"></i>
            </button>
            </template>
            <template x-if="hasFeature('uploads')">
            <input type="file" x-show="canUploadMedia()" x-ref="mediaInput" class="d-none" accept="image/*,video/mp4,video/webm" @change="uploadMediaFile">
            </template>
            <template x-if="hasFeature('uploads') && pendingMediaFile">
                <span class="input-group-text chat-attachment-badge" title="{{ t('attachment_hint') }}">
                    <template x-if="pendingMediaPreviewUrl && isPendingMediaImage()">
                        <img :src="pendingMediaPreviewUrl" alt="{{ t('preview') }}" class="rounded chat-media-preview">
                    </template>
                    <template x-if="!isPendingMediaImage()">
                        <i class="bi bi-file-earmark-play"></i>
                    </template>
                </span>
            </template>
            <textarea rows="1" class="form-control chat-text-input" x-ref="messageInput" x-model="newMessage"
                   @keydown.enter="if (!$event.shiftKey) { $event.preventDefault(); sendMessage(); }" @keydown.escape="cancelReply()" @keydown.tab="handleTabCompletion($event)" @keydown.up="navigateInputHistory($event, -1)" @keydown.down="navigateInputHistory($event, 1)" @keydown.ctrl.k.prevent="openColorPicker" @keydown.ctrl.b.prevent="applyFormat('b')"
                   @keydown.ctrl.i.prevent="applyFormat('i')" @keydown.ctrl.u.prevent="applyFormat('u')" @keydown.ctrl.s.prevent="applyFormat('s')"
                   x-on:input="autoGrowInput($el)" @input.debounce.500ms="handleInput" @paste="handlePasteUpload" @dragover.prevent @drop.prevent="handleInputDrop" @keydown.backspace="handleInputBackspace"
                   :placeholder="isServerWindow() ? t('server_input_placeholder') : (hasFeature('uploads') ? t('input_placeholder') : t('input_placeholder_text'))" x-init="focusMessageInput()"></textarea>
            <button class="btn chat-send-btn" @click="sendMessage">
                <i class="bi bi-send-fill"></i>
            </button>
            <button class="btn chat-logout-btn ms-1 chat-input-desktop-only" @click="logout()" title="{{ t('logout') }}">
                <i class="bi bi-box-arrow-right"></i>
            </button>
        </div>

        <div class="typing-indicator text-muted chat-typing-indicator">
            <span x-show="reactiveUsers[currentChannel]?.some(user => user.isTyping && user.name !== nickname)"
                  x-text="reactiveUsers[currentChannel]?.filter(user => user.isTyping && user.name !== nickname).map(user => user.name).join(', ') + ' ' + t('typing_suffix')"></span>
        </div>
    </div>

    <!-- "+" menu (small screens) -->
    <div x-show="showInputMoreMenu" x-cloak class="chat-popup chat-popup-more" role="menu"
         @click.outside="if (!$refs.inputMoreButton?.contains($event.target)) showInputMoreMenu = false">
        <template x-if="hasFeature('uploads')">
        <button type="button" class="context-action" role="menuitem"
                x-show="canUploadMedia() && !isServerWindow()" :disabled="mediaUploadInProgress"
                @click="runInputMoreAction(() => triggerMediaUpload())">
            <i class="bi bi-paperclip"></i> {{ t('input_upload') }}
        </button>
        </template>
        <template x-if="hasFeature('gifs')">
        <button type="button" class="context-action" role="menuitem" x-show="!isServerWindow()"
                @click="runInputMoreAction(() => toggleGifPicker())">
            <i class="bi bi-filetype-gif"></i> {{ t('input_gif') }}
        </button>
        </template>
        <button type="button" class="context-action" role="menuitem" x-show="!isServerWindow()"
                @click="runInputMoreAction(() => toggleColorPicker())">
            <i class="bi bi-palette"></i> {{ t('input_colors') }}
        </button>
        <button type="button" class="context-action" role="menuitem"
                @click="runInputMoreAction(() => toggleIdentifyPrompt())">
            <i class="bi bi-person-badge"></i> <span x-text="t('input_identify').replace(':nick', nickname)"></span>
        </button>
        <button type="button" class="context-action text-danger" role="menuitem"
                @click="runInputMoreAction(() => logout())">
            <i class="bi bi-box-arrow-right"></i> {{ t('input_logout') }}
        </button>
    </div>

    <!-- NickServ -->
    <div x-show="showIdentifyPrompt" class="chat-popup chat-popup-identify" @click.outside="toggleIdentifyPrompt()">
        <h6 class="mb-2 chat-identify-title">{{ t('identify_nickserv') }}</h6>
        <div class="input-group input-group-sm">
            <input type="password" class="form-control bg-dark text-light border-secondary" x-model="identifyPassword" placeholder="{{ t('password') }}">
            <button class="btn btn-primary btn-sm" @click="identifyWithNickServ()">{{ t('identify') }}</button>
        </div>
    </div>

    <!-- Command suggestions -->
    <div x-show="commandSuggestions.length > 0 && newMessage.startsWith('/')"
         class="chat-popup chat-popup-suggestions">
        <ul class="list-unstyled mb-0">
            <template x-for="suggestion in commandSuggestions" :key="suggestion">
                <li class="cursor-pointer py-1 px-2 rounded context-action" @click="completeCommand(suggestion)">/<span x-text="suggestion"></span></li>
            </template>
        </ul>
    </div>

    <!-- Color picker -->
    <div x-show="showColorPicker" class="chat-popup chat-popup-colors">
        <div class="d-flex flex-wrap gap-1">
            <template x-for="(color, index) in mircColors" :key="index">
                <span class="color-swatch" :style="'background:' + color" @click="insertColor(index)"></span>
            </template>
        </div>
    </div>

    <!-- Emoji picker -->
    {{> emoji-picker }}

    <!-- GIF picker -->
    <template x-if="hasFeature('gifs')">
        <div>{{> gif-picker }}</div>
    </template>
</div>

<style>
    .chat-input-bar {
        padding: .5rem 0 .25rem;
        background: var(--chat-bg);
    }

    .chat-input-outer {
        width: 100%;
    }

    /* The input group itself */
    .chat-input-group {
        background: var(--chat-bg-input);
        border: 1px solid transparent;
        border-radius: 8px;
        overflow: hidden;
        transition: border-color .15s;
    }
    .chat-input-group:focus-within {
        border-color: var(--chat-border-strong);
    }

    /* Nick badge */
    .chat-nick-badge {
        background: transparent;
        border: none;
        border-right: 1px solid rgba(255,255,255,.08);
        color: #aaa;
        font-size: .9rem;
        padding: 0 .8rem;
        cursor: pointer;
        transition: color .15s;
    }
    .chat-nick-badge:hover { color: #fff; }

    /* Tool buttons (palette / emoji / paperclip) */
    .chat-tool-btn {
        background: transparent;
        border: none;
        border-radius: 0;
        color: #888;
        padding: .6rem .75rem;
        font-size: 1.15rem;
        transition: color .15s, background .15s;
    }
    .chat-tool-btn:hover        { color: #ddd; background: rgba(255,255,255,.06); }
    .chat-tool-btn:disabled     { opacity: .3; }

    /* Attachment badge */
    .chat-attachment-badge {
        background: transparent;
        border: none;
        border-left: 1px solid rgba(255,255,255,.08);
        padding: 0 .5rem;
        color: #aaa;
    }

    /* Text input */
    .chat-text-input {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        color: #e0e0e0 !important;
        font-size: 1.05rem;
        padding: .6rem .6rem;
        resize: none;
        overflow-y: auto;
        max-height: 160px;
        line-height: 1.4;
        white-space: pre-wrap;
        word-break: break-word;
    }
    .chat-text-input::placeholder { color: #666; }

    /* "+" menu, only on small screens */
    .chat-input-mobile-only { display: none; }
    .chat-popup-more {
        bottom: calc(100% - .5rem);
        left: .5rem;
        min-width: 220px;
        max-width: calc(100vw - 1rem);
        padding: .375rem;
    }
    .chat-popup-more .context-action { width: 100%; min-height: 44px; }

    @media (max-width: 768px) {
        .chat-input-group > .chat-input-desktop-only { display: none !important; }
        .chat-input-group > .chat-input-mobile-only { display: inline-flex; align-items: center; }
        /* Discord order: [+] [text] [emoji] [send] */
        .chat-input-group > .chat-more-btn  { order: 0; color: #aaa; font-size: 1.4rem; padding: .5rem .6rem; }
        .chat-input-group > .chat-more-btn.is-active { color: #fff; }
        .chat-input-group > .chat-attachment-badge { order: 1; }
        .chat-input-group > .chat-text-input { order: 2; padding: .6rem .25rem; }
        .chat-input-group > .chat-emoji-btn { order: 3; padding: .5rem .6rem; }
        .chat-input-group > .chat-send-btn  { order: 4; border-left: none; padding: .5rem .75rem; }
        .chat-input-group > .chat-server-badge { order: 1; }
        /* One-line placeholder instead of a wrapped one */
        .chat-text-input::placeholder { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    }

    /* Text Input Light Theme */
    [data-bs-theme=light] .chat-text-input { color: #212529 !important; }

    /* Send button */
    .chat-send-btn {
        background: transparent;
        border: none;
        border-radius: 0;
        border-left: 1px solid rgba(255,255,255,.08);
        color: #888;
        padding: .6rem .85rem;
        font-size: 1.15rem;
        transition: color .15s, background .15s;
    }
    .chat-send-btn:hover { color: #5865f2; background: rgba(88,101,242,.12); }

    /* Logout button */
    .chat-logout-btn {
        background: transparent;
        border: none;
        border-radius: 0 12px 12px 0;
        color: #666;
        padding: .6rem .8rem;
        font-size: 1.15rem;
        transition: color .15s, background .15s;
    }
    .chat-logout-btn:hover { color: #e05c5c; background: rgba(220,70,70,.1); }

    /* Popups (pickers, suggestions, nickserv) */
    .chat-popup {
        position: absolute;
        background: #2b2d31;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 10px;
        padding: .65rem .75rem;
        box-shadow: 0 6px 20px rgba(0,0,0,.45);
        z-index: 1050;
    }

    /* Color swatches */
    .color-swatch {
        display: inline-block;
        width: 22px;
        height: 22px;
        border-radius: 4px;
        cursor: pointer;
        transition: transform .1s;
    }
    .color-swatch:hover { transform: scale(1.3); }

    /* Emoji items */
    .emoji-item {
        font-size: 1.4rem;
        padding: .15rem .25rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background .1s;
    }
    .emoji-item:hover { background: rgba(255,255,255,.08); }
</style>
`,"./templates/chat-messages.html":`<div class="position-relative flex-grow-1 d-flex flex-column" style="min-height: 0;">
    <div class="chat-messages flex-grow-1 overflow-auto" x-ref="chatMessages" @scroll.passive="handleChatScroll($event)" @click="hideTouchActions($event)">
        <div class="chat-messages-spacer" aria-hidden="true"></div>

        <div class="chat-history-loading" x-show="historyLoadingByTarget[currentChannel] && historyRequestTypeByTarget[currentChannel] === 'before'" x-cloak>
            <span class="reconnect-spinner"></span> {{ t('loading_history') }}
        </div>

        <template x-for="row in messageRows" :key="row.key">
            <div :data-message-id="row.message.id"
                 :class="{ 'search-hit': isSearchHit(row.message), 'search-hit--current': isCurrentSearchHit(row.message) }">
                <template x-if="row.dayLabel">
                    <div class="chat-divider chat-divider--day" role="separator"><span x-text="row.dayLabel"></span></div>
                </template>
                <template x-if="row.showUnreadSeparator">
                    <div class="chat-divider unread-separator" role="separator"><span>{{ t('new_messages') }}</span></div>
                </template>

                <!-- Server window -->
                <template x-if="row.kind === 'server'">
                    <div class="msg-server" :class="'msg-server--' + row.message.serverKind">
                        <time class="msg-server-time" x-text="formatClock(row.message._ts)" :title="formatFullTimestamp(row.message._ts)"></time>
                        <span class="msg-server-prefix" x-text="serverLinePrefix(row.message)"></span>
                        <span class="msg-server-text" x-html="parseMircFormatting(row.message.text)"></span>
                    </div>
                </template>

                <!-- Scene narration (UMGEBUNG command) -->
                <template x-if="row.kind === 'umgebung'">
                    <div class="msg msg--umgebung">
                        <div class="msg-umgebung-title">{{ t('narration_title') }}</div>
                        <div class="msg-body" x-effect="renderMessageInto($el, row.message)"></div>
                    </div>
                </template>

                <!-- Join / Part / Kick / Nick / System -->
                <template x-if="row.kind === 'joinpart' || row.kind === 'system'">
                    <div class="msg msg--system">
                        <div class="msg-gutter"><i class="bi" :class="systemIcon(row.message)"></i></div>
                        <div class="msg-main">
                            <span x-text="row.message.text"></span>
                            <time class="msg-time" x-text="formatClock(row.message._ts)" :title="formatFullTimestamp(row.message._ts)"></time>
                        </div>
                    </div>
                </template>

                <!-- Zusammengefasste Beitritte/Austritte -->
                <template x-if="row.kind === 'events'">
                    <div class="msg msg--system msg--events">
                        <div class="msg-gutter"><i class="bi bi-arrow-left-right"></i></div>
                        <div class="msg-main">
                            <button type="button" class="msg-events-toggle"
                                    :aria-expanded="row.expanded"
                                    @click="toggleEventGroup(row.groupId)">
                                <span class="msg-events-counts" x-text="row.summary.counts"></span>
                                <span class="msg-events-names" x-text="row.summary.names"></span>
                                <i class="bi" :class="row.expanded ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                            </button>
                            <time class="msg-time" x-text="formatClock(row.message._ts)" :title="formatFullTimestamp(row.message._ts)"></time>
                            <template x-if="row.expanded">
                                <ul class="msg-events-list">
                                    <template x-for="event in row.events" :key="event.id">
                                        <li>
                                            <i class="bi" :class="systemIcon(event)"></i>
                                            <span x-text="event.text"></span>
                                            <time class="msg-time" x-text="formatClock(event._ts)" :title="formatFullTimestamp(event._ts)"></time>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </div>
                    </div>
                </template>

                <!-- /me -->
                <template x-if="row.kind === 'action'">
                    <div class="msg msg--action" :class="{ 'msg--mention': row.isMention }" :data-msgid="row.message.msgid"
                         @touchstart.passive="startLongPress($event, () => hasMessageActions(row.message) && showTouchActions(row.message))"
                         @touchmove.passive="moveLongPress($event)"
                         @touchend="endLongPress($event)"
                         @touchcancel="cancelLongPress()">
                        <!-- Own small avatar: without it the line looks like a continuation of the previous author -->
                        <div class="msg-gutter">
                            <button type="button" class="msg-avatar msg-avatar--action nick-bg" :style="nickStyle(row.message.user)"
                                    @click="showUserOptions(row.message.user, $event)">
                                <template x-if="avatarUrl(row.message.user)">
                                    <img class="nick-avatar-img" :src="avatarUrl(row.message.user)" alt="" loading="lazy" x-on:error="clearUserAvatar(row.message.user)">
                                </template>
                                <span x-show="!avatarUrl(row.message.user)" x-text="nickInitial(row.message.user)"></span>
                            </button>
                        </div>
                        <div class="msg-main">
                            <span class="msg-author nick-color" :style="nickStyle(row.message.user)" x-text="row.message.user"
                                  @click="showUserOptions(row.message.user, $event)"></span>
                            <span class="bot-badge" x-show="isBotNick(row.message.user)" x-cloak :title="botBadgeTitle(row.message.user)">{{ t('bot_badge') }}</span>
                            <template x-if="row.message.redacted">
                                <span class="msg-body msg-body--deleted"><i class="bi bi-trash3"></i> {{ t('message_deleted') }}</span>
                            </template>
                            <template x-if="!row.message.redacted">
                                <span class="msg-body" :class="{ 'is-deleting': row.message.deleting }" x-effect="renderMessageInto($el, row.message)"></span>
                            </template>
                            <time class="msg-time msg-action-time" x-text="formatClock(row.message._ts)" :title="formatFullTimestamp(row.message._ts)"></time>
                            {{> message-actions }}
                        </div>
                    </div>
                </template>

                <!-- Regular message -->
                <template x-if="row.kind === 'text'">
                    <div class="msg"
                         :class="{
                             'msg--grouped': row.grouped,
                             'msg--mention': row.isMention,
                             'msg--notice': row.message.isNotice,
                             'msg--pending': row.message.pending,
                             'msg--reply': row.message.replyTo
                         }"
                         :data-msgid="row.message.msgid"
                         @touchstart.passive="startLongPress($event, () => hasMessageActions(row.message) && showTouchActions(row.message))"
                         @touchmove.passive="moveLongPress($event)"
                         @touchend="endLongPress($event)"
                         @touchcancel="cancelLongPress()">
                        <div class="msg-gutter">
                            <template x-if="!row.grouped">
                                <button type="button" class="msg-avatar nick-bg" :style="nickStyle(row.message.user)"
                                        @click="showUserOptions(row.message.user, $event)">
                                    <template x-if="avatarUrl(row.message.user)">
                                        <img class="nick-avatar-img" :src="avatarUrl(row.message.user)" alt="" loading="lazy" x-on:error="clearUserAvatar(row.message.user)">
                                    </template>
                                    <span x-show="!avatarUrl(row.message.user)" x-text="nickInitial(row.message.user)"></span>
                                </button>
                            </template>
                            <template x-if="row.grouped">
                                <time class="msg-hover-time" x-text="formatClock(row.message._ts)" :title="formatFullTimestamp(row.message._ts)"></time>
                            </template>
                        </div>
                        <div class="msg-main">
                            <template x-if="row.message.replyTo">
                                <button type="button" class="msg-reply-ref"
                                        :class="{ 'is-unknown': !replyPreview(row.message)?.found }"
                                        @click="jumpToMessage(row.message.replyTo)">
                                    <i class="bi bi-reply-fill msg-reply-icon"></i>
                                    <span class="msg-reply-author nick-color"
                                          x-show="replyPreview(row.message)?.user"
                                          :style="nickStyle(replyPreview(row.message)?.user)"
                                          x-text="replyPreview(row.message)?.user"></span>
                                    <span class="msg-reply-text" x-text="replyPreview(row.message)?.text"></span>
                                </button>
                            </template>
                            <template x-if="!row.grouped">
                                <div class="msg-header">
                                    <span class="msg-author nick-color" :style="nickStyle(row.message.user)"
                                          x-text="row.message.user"
                                          @click="showUserOptions(row.message.user, $event)"></span>
                                    <span class="bot-badge" x-show="isBotNick(row.message.user)" x-cloak :title="botBadgeTitle(row.message.user)">{{ t('bot_badge') }}</span>
                                    <span class="msg-badge" x-show="row.message.isNotice">{{ t('notice_badge') }}</span>
                                    <time class="msg-time" x-text="formatClock(row.message._ts)" :title="formatFullTimestamp(row.message._ts)"></time>
                                </div>
                            </template>
                            <template x-if="row.message.redacted">
                                <div class="msg-body msg-body--deleted"><i class="bi bi-trash3"></i> {{ t('message_deleted') }}</div>
                            </template>
                            <template x-if="!row.message.redacted">
                                <div class="msg-body" :class="{ 'is-deleting': row.message.deleting }" x-effect="renderMessageInto($el, row.message)"></div>
                            </template>
                            <div class="msg-pending-hint" x-show="row.message.pending">
                                <i class="bi bi-clock"></i> {{ t('sending') }}
                            </div>
                            {{> message-actions }}
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </div>

    <!-- Reaction picker (fixed position next to the clicked button) -->
    <div class="emoji-picker-popup reaction-picker"
         x-show="reactionPicker.show"
         x-cloak
         :style="{ left: reactionPicker.x + 'px', top: reactionPicker.y + 'px' }"
         @click.outside="closeReactionPicker()"
         @keydown.escape.window="reactionPicker.show && closeReactionPicker()"
         x-data="emojiPicker()">
        <div class="reaction-quick-row">
            <template x-for="emoji in quickReactions" :key="emoji">
                <button type="button" class="ep-emoji-btn" @click="reactFromPicker(emoji)" x-text="emoji"></button>
            </template>
        </div>
        <div class="ep-search-row">
            <i class="bi bi-search ep-search-icon"></i>
            <input type="text" class="ep-search-input" x-model="emojiSearch" placeholder="{{ t('search_emoji') }}">
            <button type="button" class="ep-close-btn" @click="closeReactionPicker()"><i class="bi bi-x"></i></button>
        </div>
        <div class="ep-tabs" x-show="!emojiSearch">
            <template x-for="(cat, key) in categories" :key="key">
                <button type="button" class="ep-tab-btn" :class="{ 'ep-tab-active': activeCategory === key }"
                        :title="cat.title" @click="activeCategory = key" x-text="cat.label"></button>
            </template>
        </div>
        <div class="ep-grid">
            <template x-for="(emoji, idx) in filteredEmojis()" :key="idx">
                <button type="button" class="ep-emoji-btn" @click="reactFromPicker(emoji)" x-text="emoji"></button>
            </template>
        </div>
    </div>

    <button type="button"
            class="jump-to-latest"
            x-show="isScrolledUp"
            x-cloak
            x-transition.opacity.duration.200ms
            @click="jumpToLatest()">
        <span x-text="newWhileScrolledUp > 0 ? t('new_messages_count', { count: newWhileScrolledUp }) : t('jump_to_latest')"></span>
        <i class="bi bi-arrow-down"></i>
    </button>
</div>
`,"./templates/chat-userlist.html":`<div x-show="showUserList" class="userlist p-3 overflow-auto" x-cloak>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="mb-0 sidebar-section-title p-0">{{ t('users') }}</h6>
        <span class="badge text-bg-secondary" x-text="(reactiveUsers[currentChannel] || []).length"></span>
    </div>

    <div class="d-flex gap-1 mb-2" x-show="canManageCurrentChannel() && currentChannel && currentChannel.startsWith('#')">
        <button class="btn btn-sm btn-outline-secondary flex-fill d-flex align-items-center justify-content-center gap-1" @click="openChannelListManager('ban')"><i class="bi bi-slash-circle"></i></button>
        <button class="btn btn-sm btn-outline-secondary flex-fill d-flex align-items-center justify-content-center gap-1" @click="openChannelListManager('exception')"><i class="bi bi-shield-check"></i></button>
        <button class="btn btn-sm btn-outline-secondary flex-fill d-flex align-items-center justify-content-center gap-1" @click="openChannelListManager('invex')"><i class="bi bi-door-open"></i></button>
    </div>

    <ul class="list-unstyled d-flex flex-column gap-1">
        <template x-for="user in reactiveUsers[currentChannel] || []" :key="user.name">
            <li class="px-2 py-2 rounded position-relative cursor-pointer user-row overflow-hidden user-row-min-width"
                :class="{
        'fw-bold text-warning': user.role === '@',
        'fw-bold text-danger': user.role === '~',
        'text-info': user.role === '%',
        'text-success': user.role === '+'
    }">

                <div class="d-flex align-items-center text-truncate" @click="showUserOptions(user.name, $event)" @contextmenu.prevent="showUserOptions(user.name, $event)">
                    <span x-show="user.isOnline" class="text-success me-2">●</span>
                    <span x-show="!user.isOnline" class="text-muted me-2">○</span>

                    <span class="channel-item-avatar userlist-avatar nick-bg me-2" :style="nickStyle(user.name)">
                        <template x-if="avatarUrl(user.name)">
                            <img class="nick-avatar-img" :src="avatarUrl(user.name)" alt="" loading="lazy" x-on:error="clearUserAvatar(user.name)">
                        </template>
                        <span x-show="!avatarUrl(user.name)" x-text="nickInitial(user.name)"></span>
                    </span>
                    <span x-text="user.role" class="me-1"></span>
                    <!-- An own colour (profile card) wins over the role colour, like the nick list in mIRC -->
                    <span class="text-truncate truncate-inline"
                          :class="{ 'nick-color': customNickHue(user.name) !== null }"
                          :style="customNickHue(user.name) !== null ? nickStyle(user.name) : ''"
                          x-text="user.name"
                          :title="user.name"></span>
                    <span class="bot-badge ms-1" x-show="isBotNick(user.name)" x-cloak :title="botBadgeTitle(user.name)">{{ t('bot_badge') }}</span>

                    <i class="bi bi-volume-up-fill ms-1 userlist-voice"
                       x-show="userInVoice(user)"
                       x-cloak
                       title="{{ t('voice_in_channel') }}"
                       aria-label="{{ t('voice_in_channel') }}"></i>

                    <span x-show="user.account"
                          class="text-muted ms-1 text-truncate"
                          x-text="'(' + user.account + ')'"
                          :title="user.account"></span>
                </div>
                <div class="mt-1 user-activity">
                    <template x-if="user.isTyping">
                        <span class="text-muted fst-italic">
                            <i class="bi bi-three-dots user-activity-icon"></i> {{ t('typing_suffix') }}
                        </span>
                    </template>

                    <template x-if="!user.isTyping && user.playing && user.playing.trim()">
                        <span class="user-playing" :title="user.playing">
                            <i class="bi bi-music-note-beamed user-activity-icon"></i> <span x-text="user.playing"></span>
                        </span>
                    </template>
                    <template x-if="!user.isTyping && !(user.playing && user.playing.trim()) && userStatus(user.name)">
                        <span class="user-custom-status" :title="userStatus(user.name)" x-text="userStatus(user.name)"></span>
                    </template>
                    <span x-show="!user.isTyping && !(user.playing && user.playing.trim()) && !userStatus(user.name)">&nbsp;</span>
                </div>
            </li>

        </template>
    </ul>
</div>

{{> profile-card }}
`,"./templates/chat.html":`<div x-data="chatComponent()" class="chat-container">

    {{> login-overlay }}

    <template x-if="isAuthenticated">
        <div class="d-flex flex-column flex-grow-1">
            {{> chat-header }}

            <div class="d-flex flex-grow-1 chat-main-content" :class="{ 'chat-main-content--no-input': !(sidebarMode === 'channels' || isDirectMessageChannel(currentChannel) || isServerWindow()) }">
                {{> chat-channelbar }}

                <!-- Small screens: dims the chat while the channel or user drawer is open -->
                <div class="mobile-drawer-backdrop" x-show="isMobileLayout && (mobileSidebarOpen || showUserList)" x-cloak
                     @click="closeMobileDrawers()"></div>

                <div class="flex-grow-1 d-flex flex-column">
                    <template x-if="sidebarMode === 'channels' || (sidebarMode === 'friends' && selectedFriendName && (isDirectMessageChannel(currentChannel) || currentChannel === 'Server'))">
                        <div class="flex-grow-1 d-flex flex-column">
                            {{> chat-messages }}
                        </div>
                    </template>

                    <template x-if="hasFeature('friends') && sidebarMode === 'friends' && (!selectedFriendName || (!isDirectMessageChannel(currentChannel) && currentChannel !== 'Server'))">
                        {{> friends-hub }}
                    </template>

                    <template x-if="hasFeature('uploads') && sidebarMode === 'uploads'">
                        {{> upload-manager }}
                    </template>
                </div>

                {{> chat-userlist }}
            </div>

            <div class="chat-input-wrapper" x-show="sidebarMode === 'channels' || isDirectMessageChannel(currentChannel) || isServerWindow()" x-cloak>
                {{> chat-input }}
            </div>

            <template x-if="hasFeature('explore')">
                <div>{{> modal-explore }}</div>
            </template>
            {{> settings-window }}
            {{> quick-switcher }}
            <template x-if="hasFeature('reports')">
                <div>{{> report-dialog }}</div>
            </template>
            <template x-if="hasFeature('alwaysOn')">
                <div>{{> always-on-dialog }}</div>
            </template>
        </div>
    </template>

</div>
`,"./templates/community-events.html":`<!-- Upcoming events of the active community (Home: all my communities), opened from the calendar button -->
<div class="community-events-popover"
     x-show="communityEvents.open"
     x-cloak
     x-init="$watch('activeCommunityFilter', () => closeCommunityEvents())"
     @click.outside="if (!$refs.eventsButton?.contains($event.target)) closeCommunityEvents()"
     @keydown.escape.window="closeCommunityEvents()"
     role="dialog"
     aria-label="{{ t('events_title') }}">
    <div class="community-events-header">
        <span>{{ t('events_title') }}</span>
        <button type="button" class="community-events-close" title="{{ t('close') }}" @click="closeCommunityEvents()">
            <i class="bi bi-x-lg"></i>
        </button>
    </div>

    <div class="community-events-status" x-show="communityEvents.loading && communityEvents.items.length === 0">
        {{ t('events_loading') }}
    </div>
    <div class="community-events-status" x-show="communityEvents.failed && !communityEvents.loading">
        {{ t('events_failed') }}
        <button type="button" class="community-events-retry" @click="loadCommunityEvents()">{{ t('events_retry') }}</button>
    </div>
    <div class="community-events-status"
         x-show="!communityEvents.loading && !communityEvents.failed && communityEvents.items.length === 0">
        {{ t('events_empty') }}
    </div>

    <div class="community-events-list" x-show="communityEvents.items.length > 0">
        <template x-for="group in communityEventGroups()" :key="group.key">
            <div class="community-events-day">
                <div class="community-events-day-label" x-text="group.label"></div>
                <template x-for="event in group.events" :key="\`\${event.event_id}-\${event.starts_at}\`">
                    <div class="community-event">
                        <span class="community-event-time" x-text="event.time"></span>
                        <div class="community-event-body">
                            <div class="community-event-title" x-text="event.title"></div>
                            <div class="community-event-meta">
                                <span x-show="!activeCommunity" x-text="event.community_name"></span>
                                <span x-show="eventRecurrenceLabel(event.recurrence)" x-text="eventRecurrenceLabel(event.recurrence)"></span>
                                <button type="button"
                                        class="community-event-channel"
                                        x-show="event.channel"
                                        :title="t('events_open_channel')"
                                        @click="openEventChannel(event.channel)"
                                        x-text="event.channel"></button>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </div>
</div>
`,"./templates/connections-settings.html":`<!--
    Settings -> Connections (desktop): the connection profiles of the app, in place of the
    old manager window. Data and changes go through the shell (see mixins/connections.js):
    passwords can be set here but are never shown again.
-->
<div class="connections-page">
    <div class="connections-notice is-error" x-show="connectionsPage.error" x-text="t(connectionsPage.error)"></div>
    <div class="connections-loading" x-show="connectionsPage.loading && !connectionsPage.available">
        <span class="reconnect-spinner"></span> {{ t('connections_loading') }}
    </div>

    <!-- ── List ─────────────────────────────────────────────────────── -->
    <template x-if="connectionsPage.available && connectionsPage.view === 'list'">
        <div class="connections-list">
            <template x-for="profile in connectionsPage.profiles" :key="profile.hash">
                <button type="button" class="connections-item" @click="editConnection(profile.hash)">
                    <i class="bi" :class="profile.serverType === 'external' ? 'bi-globe2' : 'bi-house-door'"></i>
                    <span class="connections-item-text">
                        <span class="connections-item-title">
                            <span x-text="connectionTitle(profile)"></span>
                            <span class="connections-badge" x-show="profile.hash === currentConnectionHash()">{{ t('connections_current') }}</span>
                        </span>
                        <span class="connections-item-sub" x-text="profile.summary"></span>
                    </span>
                    <i class="bi bi-chevron-right connections-item-arrow"></i>
                </button>
            </template>

            <div class="connections-add">
                <div class="settings-item-label">{{ t('connections_add') }}</div>
                <div class="connections-choices">
                    <button type="button" class="connections-choice" @click="startNewConnection('home')">
                        <i class="bi bi-house-door"></i>
                        <span class="connections-choice-title">{{ t('connections_new_home') }}</span>
                        <span class="connections-choice-sub">{{ t('connections_new_home_hint') }}</span>
                    </button>
                    <button type="button" class="connections-choice" @click="showConnectionDirectory()">
                        <i class="bi bi-collection"></i>
                        <span class="connections-choice-title">{{ t('connections_new_directory') }}</span>
                        <span class="connections-choice-sub">{{ t('connections_new_directory_hint') }}</span>
                    </button>
                    <button type="button" class="connections-choice" @click="startNewConnection('external')">
                        <i class="bi bi-globe2"></i>
                        <span class="connections-choice-title">{{ t('connections_new_custom') }}</span>
                        <span class="connections-choice-sub">{{ t('connections_new_custom_hint') }}</span>
                    </button>
                </div>
            </div>
        </div>
    </template>

    <!-- ── Server directory ─────────────────────────────────────────── -->
    <template x-if="connectionsPage.available && connectionsPage.view === 'directory'">
        <div class="connections-directory">
            <div class="connections-toolbar">
                <button type="button" class="btn btn-sm btn-link connections-back" @click="showConnectionList()">
                    <i class="bi bi-arrow-left"></i> {{ t('connections_back') }}
                </button>
                <span class="flex-grow-1"></span>
                <button type="button" class="btn btn-sm btn-outline-secondary" :disabled="connectionsPage.syncing" @click="syncConnectionDirectory()">
                    <i class="bi bi-arrow-clockwise" :class="{ 'connections-spin': connectionsPage.syncing }"></i> {{ t('connections_directory_sync') }}
                </button>
            </div>
            <div class="connections-notice is-error" x-show="connectionsPage.syncError">{{ t('connections_directory_sync_failed') }}</div>
            <div class="settings-chips-empty" x-show="!connectionsPage.servers.length && !connectionsPage.syncing">{{ t('connections_directory_empty') }}</div>
            <template x-for="server in connectionsPage.servers" :key="server.id">
                <div class="connections-server">
                    <img :src="server.logo_url || ''" alt="" x-show="server.logo_url">
                    <i class="bi bi-hdd-network" x-show="!server.logo_url"></i>
                    <div class="connections-item-text">
                        <span class="connections-item-title" x-text="server.name"></span>
                        <span class="connections-item-sub" x-text="server.description || describeConnectionServer({ connectionType: server.host ? 'socket' : 'websocket', host: server.host, port: server.port, ssl: server.ssl, websocketUrl: server.websocket_url })"></span>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="startConnectionFromServer(server)">
                        <i class="bi bi-plus-lg"></i> {{ t('connections_directory_use') }}
                    </button>
                </div>
            </template>
        </div>
    </template>

    <!-- ── Edit / new ───────────────────────────────────────────────── -->
    <template x-if="connectionsPage.available && connectionsPage.draft && (connectionsPage.view === 'edit' || connectionsPage.view === 'new')">
        <form class="connections-form" @submit.prevent="saveConnection()">
            <div class="connections-toolbar">
                <button type="button" class="btn btn-sm btn-link connections-back" @click="showConnectionList()">
                    <i class="bi bi-arrow-left"></i> {{ t('connections_back') }}
                </button>
                <span class="flex-grow-1"></span>
                <button type="button" class="btn btn-sm btn-outline-secondary"
                        x-show="connectionsPage.view === 'edit' && connectionsPage.draft.hash !== currentConnectionHash()"
                        @click="openConnectionTab(connectionsPage.draft.hash)">
                    <i class="bi bi-box-arrow-up-right"></i> {{ t('connections_open_tab') }}
                </button>
            </div>

            <div class="settings-item-label" x-text="connectionsPage.view === 'new' ? t('connections_new_title') : connectionTitle(connectionsPage.draft)"></div>

            <!-- Identity -->
            <div class="connections-grid">
                <label class="connections-field">
                    <span>{{ t('connections_field_name') }}</span>
                    <input type="text" class="form-control form-control-sm" maxlength="60" x-model="connectionsPage.draft.name"
                           :placeholder="connectionsPage.draft.serverType === 'external' ? t('connections_type_external') : t('connections_new_home')">
                </label>
                <label class="connections-field">
                    <span>{{ t('connections_field_nickname') }}</span>
                    <template x-if="connectionsPage.draft.serverType === 'external'">
                        <input type="text" class="form-control form-control-sm" maxlength="30" x-model="connectionsPage.draft.externalServer.nickname"
                               :class="{ 'is-invalid': connectionError('nickname') }">
                    </template>
                    <template x-if="connectionsPage.draft.serverType !== 'external'">
                        <input type="text" class="form-control form-control-sm" maxlength="30" x-model="connectionsPage.draft.nickname"
                               :class="{ 'is-invalid': connectionError('nickname') }">
                    </template>
                    <small class="connections-field-error" x-show="connectionError('nickname')" x-text="connectionError('nickname')"></small>
                </label>
            </div>

            <!-- Server (external) -->
            <template x-if="connectionsPage.draft.serverType === 'external'">
                <div class="connections-section">
                    <div class="connections-section-title"><i class="bi bi-hdd-network"></i> {{ t('connections_section_server') }}</div>
                    <div class="btn-group btn-group-sm connections-segmented" role="radiogroup">
                        <button type="button" class="btn btn-outline-secondary"
                                :class="{ active: connectionsPage.draft.externalServer.connectionType !== 'websocket' }"
                                @click="connectionsPage.draft.externalServer.connectionType = 'socket'">{{ t('connections_type_socket') }}</button>
                        <button type="button" class="btn btn-outline-secondary"
                                :class="{ active: connectionsPage.draft.externalServer.connectionType === 'websocket' }"
                                @click="connectionsPage.draft.externalServer.connectionType = 'websocket'">{{ t('connections_type_websocket') }}</button>
                    </div>

                    <template x-if="connectionsPage.draft.externalServer.connectionType !== 'websocket'">
                        <div class="connections-grid connections-grid--host">
                            <label class="connections-field">
                                <span>{{ t('connections_field_host') }}</span>
                                <input type="text" class="form-control form-control-sm" placeholder="irc.libera.chat"
                                       x-model="connectionsPage.draft.externalServer.host" :class="{ 'is-invalid': connectionError('host') }">
                                <small class="connections-field-error" x-show="connectionError('host')" x-text="connectionError('host')"></small>
                            </label>
                            <label class="connections-field">
                                <span>{{ t('connections_field_port') }}</span>
                                <input type="number" min="1" max="65535" class="form-control form-control-sm"
                                       x-model.number="connectionsPage.draft.externalServer.port" :class="{ 'is-invalid': connectionError('port') }">
                                <small class="connections-field-error" x-show="connectionError('port')" x-text="connectionError('port')"></small>
                            </label>
                            <label class="connections-check">
                                <input type="checkbox" class="form-check-input" x-model="connectionsPage.draft.externalServer.ssl">
                                <span>{{ t('connections_field_tls') }}</span>
                            </label>
                        </div>
                    </template>

                    <template x-if="connectionsPage.draft.externalServer.connectionType === 'websocket'">
                        <label class="connections-field">
                            <span>{{ t('connections_field_websocket_url') }}</span>
                            <input type="text" class="form-control form-control-sm" placeholder="wss://web.libera.chat/webirc/websocket/"
                                   x-model="connectionsPage.draft.externalServer.websocketUrl" :class="{ 'is-invalid': connectionError('websocketUrl') }">
                            <small class="connections-field-error" x-show="connectionError('websocketUrl')" x-text="connectionError('websocketUrl')"></small>
                        </label>
                    </template>

                    <label class="connections-field">
                        <span>{{ t('connections_field_channel') }}</span>
                        <input type="text" class="form-control form-control-sm" placeholder="#channel"
                               x-model="connectionsPage.draft.externalServer.defaultChannel" :class="{ 'is-invalid': connectionError('defaultChannel') }">
                        <small class="connections-field-error" x-show="connectionError('defaultChannel')" x-text="connectionError('defaultChannel')"></small>
                    </label>

                    <div class="connections-test">
                        <button type="button" class="btn btn-sm btn-outline-secondary" :disabled="connectionsPage.test.state === 'running'" @click="testConnectionDraft()">
                            <i class="bi" :class="connectionsPage.test.state === 'running' ? 'bi-arrow-repeat connections-spin' : 'bi-broadcast'"></i>
                            {{ t('connections_test') }}
                        </button>
                        <span :class="connectionsPage.test.state === 'ok' ? 'text-success' : 'text-danger'" x-text="connectionTestMessage()"></span>
                    </div>
                </div>
            </template>

            <!-- Login -->
            <div class="connections-section">
                <div class="connections-section-title"><i class="bi bi-key"></i> {{ t('connections_section_login') }}</div>
                <small class="settings-item-hint" x-text="connectionsPage.draft.serverType === 'external' ? t('connections_login_hint_external') : t('connections_login_hint_home')"></small>
                <div class="connections-grid">
                    <label class="connections-field">
                        <span>{{ t('connections_field_sasl_user') }}</span>
                        <template x-if="connectionsPage.draft.serverType === 'external'">
                            <input type="text" class="form-control form-control-sm" autocomplete="off" x-model="connectionsPage.draft.externalServer.saslUsername">
                        </template>
                        <template x-if="connectionsPage.draft.serverType !== 'external'">
                            <input type="text" class="form-control form-control-sm" autocomplete="off" x-model="connectionsPage.draft.saslUsername">
                        </template>
                    </label>
                    <label class="connections-field">
                        <span>{{ t('connections_field_sasl_password') }}</span>
                        <input type="password" class="form-control form-control-sm" autocomplete="new-password" x-model="connectionsPage.password"
                               :placeholder="connectionsPage.draft.hasSaslPassword ? '••••••••' : ''" :class="{ 'is-invalid': connectionError('saslPassword') }">
                        <small class="connections-field-error" x-show="connectionError('saslPassword')" x-text="connectionError('saslPassword')"></small>
                        <small class="text-success" x-show="connectionsPage.draft.hasSaslPassword && !connectionsPage.password && !connectionError('saslPassword')">
                            <i class="bi bi-shield-check"></i> {{ t('connections_password_saved') }}
                        </small>
                    </label>
                </div>
            </div>

            <div class="connections-notice is-error" x-show="connectionError('form') || connectionError('hash')" x-text="connectionError('form') || connectionError('hash')"></div>

            <div class="connections-footer">
                <button type="submit" class="btn btn-sm btn-primary" :disabled="!isConnectionDirty() || connectionsPage.saving">
                    <i class="bi bi-check2"></i>
                    <span x-text="connectionsPage.view === 'new' ? t('connections_create') : t('connections_save')"></span>
                </button>
                <span class="text-success" x-show="connectionsPage.saved"><i class="bi bi-check-circle"></i> {{ t('connections_saved') }}</span>
                <span class="flex-grow-1"></span>
                <button type="button" class="btn btn-sm"
                        :class="connectionsPage.deleteConfirm ? 'btn-danger' : 'btn-outline-danger'"
                        x-show="connectionsPage.view === 'edit' && connectionsPage.profiles.length > 1"
                        @click="deleteConnection()"
                        x-text="connectionsPage.deleteConfirm ? t('connections_delete_confirm') : t('connections_delete')"></button>
            </div>
            <small class="settings-item-hint" x-show="connectionsPage.view === 'edit'">{{ t('connections_reconnect_hint') }}</small>
        </form>
    </template>
</div>
`,"./templates/dm-sidebar-item.html":`<!-- One open DM in the sidebar; expects the Alpine variable "user" (the nick). -->
<div class="channel-item channel-item--dm"
     role="button"
     tabindex="0"
     :class="{ 'is-active': user === currentChannel, 'is-unread': user !== currentChannel && hasUnread(user) }"
     @click="openDirectMessage(user)"
     @keydown.enter="openDirectMessage(user)">
    <span class="channel-item-avatar nick-bg position-relative" :style="nickStyle(user)">
        <template x-if="avatarUrl(user)">
            <img class="nick-avatar-img" :src="avatarUrl(user)" alt="" loading="lazy" x-on:error="clearUserAvatar(user)">
        </template>
        <span x-show="!avatarUrl(user)" x-text="nickInitial(user)"></span>
        <span class="presence-dot" x-show="isFriendNick(user)" :class="isFriendOnline(user) ? 'is-online' : 'is-offline'"></span>
    </span>
    <span class="channel-item-name" x-text="user"></span>
    <span class="bot-badge" x-show="isBotNick(user)" x-cloak :title="botBadgeTitle(user)">{{ t('bot_badge') }}</span>
    <span class="mention-badge" x-show="user !== currentChannel && unreadMessages[user] > 0" x-text="unreadMessages[user]"></span>
    <button type="button" class="channel-item-close" title="{{ t('close_dm') }}" @click.stop="closeDM(user)">
        <i class="bi bi-x-lg"></i>
    </button>
</div>
`,"./templates/emoji-picker.html":`<div x-show="showEmojiPicker"
     class="emoji-picker-popup"
     style="bottom: calc(100% + 4px); left: .5rem;"
     @click.outside="showEmojiPicker = false"
     x-data="emojiPicker()">

    <div class="ep-search-row">
        <i class="bi bi-search ep-search-icon"></i>
        <input type="text" class="ep-search-input" x-model="emojiSearch"
               placeholder="{{ t('search_emoji') }}" @keydown.escape="showEmojiPicker = false">
        <button class="ep-close-btn" @click="showEmojiPicker = false"><i class="bi bi-x"></i></button>
    </div>

    <div class="ep-tabs" x-show="!emojiSearch">
        <template x-for="(cat, key) in categories" :key="key">
            <button class="ep-tab-btn" :class="{ 'ep-tab-active': activeCategory === key }"
                    :title="cat.title" @click="activeCategory = key" x-text="cat.label">
            </button>
        </template>
    </div>

    <div class="ep-category-title"
         x-text="emojiSearch ? 'Suchergebnisse' : (categories[activeCategory]?.title || '')">
    </div>

    <div class="ep-grid">
        <template x-for="(emoji, idx) in filteredEmojis()" :key="idx">
            <button class="ep-emoji-btn"
                    @click="insertEmoji(emoji); showEmojiPicker = false"
                    x-text="emoji">
            </button>
        </template>
        <div x-show="filteredEmojis().length === 0" class="ep-empty">{{ t('emoji_none') }}</div>
    </div>
</div>

<style>
    .emoji-picker-popup { position:absolute; width:320px; background:#2b2d31; border:1px solid rgba(255,255,255,.1); border-radius:12px; box-shadow:0 8px 28px rgba(0,0,0,.5); z-index:1050; overflow:hidden; display:flex; flex-direction:column; }
    .ep-search-row { display:flex; align-items:center; gap:6px; padding:8px 10px; border-bottom:1px solid rgba(255,255,255,.06); }
    .ep-search-icon { color:#666; font-size:.85rem; flex-shrink:0; }
    .ep-search-input { flex:1; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.08); border-radius:6px; color:#e0e0e0; font-size:.85rem; padding:4px 8px; outline:none; transition:border-color .15s; }
    .ep-search-input:focus { border-color:rgba(255,255,255,.2); }
    .ep-search-input::placeholder { color:#555; }
    .ep-close-btn { background:none; border:none; color:#666; font-size:1rem; padding:2px 4px; border-radius:4px; cursor:pointer; line-height:1; transition:color .15s; }
    .ep-close-btn:hover { color:#ccc; }
    .ep-tabs { display:flex; gap:2px; padding:6px 8px 4px; border-bottom:1px solid rgba(255,255,255,.06); overflow-x:auto; scrollbar-width:none; }
    .ep-tabs::-webkit-scrollbar { display:none; }
    .ep-tab-btn { background:none; border:none; border-radius:6px; padding:4px 7px; font-size:1.1rem; cursor:pointer; transition:background .12s; flex-shrink:0; }
    .ep-tab-btn:hover { background:rgba(255,255,255,.08); }
    .ep-tab-active { background:rgba(255,255,255,.14) !important; }
    .ep-category-title { font-size:.68rem; font-weight:600; text-transform:uppercase; letter-spacing:.06em; color:#666; padding:6px 10px 2px; }
    .ep-grid { display:grid; grid-template-columns:repeat(8,1fr); gap:1px; padding:4px 6px 8px; max-height:220px; overflow-y:auto; scrollbar-width:thin; scrollbar-color:rgba(255,255,255,.1) transparent; }
    .ep-emoji-btn { background:none; border:none; border-radius:6px; font-size:1.25rem; padding:4px; cursor:pointer; line-height:1; transition:background .1s,transform .1s; aspect-ratio:1; display:flex; align-items:center; justify-content:center; }
    .ep-emoji-btn:hover { background:rgba(255,255,255,.1); transform:scale(1.2); }
    .ep-empty { grid-column:1/-1; text-align:center; color:#555; font-size:.8rem; padding:1rem 0; }
</style>
`,"./templates/friends-hub.html":`<!-- Friends hub: shown in friends mode while no DM is open. Requests live in one place (the "Requests" tab). -->
<div class="friends-empty-state friends-hub flex-grow-1 p-4 overflow-auto" x-cloak>
    <div class="friends-page">

        <div class="friends-page-header">
            <h4 class="friends-page-title"><i class="bi bi-people-fill"></i> {{ t('friends_title') }}</h4>
            <form class="friends-add" x-show="isAuthenticated" @submit.prevent="sendFriendRequest()">
                <input type="text" class="form-control form-control-sm"
                       placeholder="{{ t('friends_add_placeholder') }}"
                       x-model="friendRequestInput">
                <button type="submit" class="btn btn-sm btn-primary text-nowrap" :disabled="!friendRequestInput.trim()">
                    <i class="bi bi-person-plus"></i> {{ t('friends_add') }}
                </button>
            </form>
        </div>

        <div class="alert alert-info py-2 px-3 mb-0" role="alert" x-show="friendNotice" x-text="friendNotice"></div>

        <div class="friends-tabs" role="tablist">
            <button type="button" class="friends-tab" role="tab" :class="{ 'is-active': friendFilter === 'online' }" @click="friendFilter = 'online'">
                {{ t('friends_tab_online') }}<span class="friends-tab-count" x-text="friendTabCounts().online"></span>
            </button>
            <button type="button" class="friends-tab" role="tab" :class="{ 'is-active': friendFilter === 'all' }" @click="friendFilter = 'all'">
                {{ t('friends_tab_all') }}<span class="friends-tab-count" x-text="friendTabCounts().all"></span>
            </button>
            <button type="button" class="friends-tab" role="tab" :class="{ 'is-active': friendFilter === 'pending' }" @click="friendFilter = 'pending'">
                {{ t('friends_tab_pending') }}<span class="friends-tab-count"
                      :class="{ 'is-alert': incomingFriendRequests.length > 0 }"
                      x-text="incomingFriendRequests.length > 0 ? incomingFriendRequests.length : friendTabCounts().pending"></span>
            </button>
        </div>

        <!-- Online / all friends -->
        <template x-if="friendFilter !== 'pending'">
            <div class="d-flex flex-column gap-2">
                <input type="search" class="form-control form-control-sm friends-search"
                       placeholder="{{ t('friends_search') }}"
                       x-model="friendSearch"
                       x-show="friends.length > 5">

                <div class="friends-rows">
                    <template x-for="friend in filteredFriendList()" :key="friend.friendship_id">
                        <div class="friends-row"
                             role="button" tabindex="0"
                             @click="openFriendChat(friend.user.display)"
                             @keydown.enter="openFriendChat(friend.user.display)"
                             @contextmenu.prevent="openFriendContextMenu(friend, $event)">
                            <span class="channel-item-avatar nick-bg position-relative" :style="nickStyle(friend.user.display)">
                                <template x-if="avatarUrl(friend.user.display)">
                                    <img class="nick-avatar-img" :src="avatarUrl(friend.user.display)" alt="" loading="lazy" x-on:error="clearUserAvatar(friend.user.display)">
                                </template>
                                <span x-show="!avatarUrl(friend.user.display)" x-text="nickInitial(friend.user.display)"></span>
                                <span class="presence-dot" :class="isFriendOnline(friend.user.display) ? 'is-online' : 'is-offline'"></span>
                            </span>
                            <span class="friends-row-text">
                                <span class="friends-row-name" x-text="friend.user.display"></span>
                                <span class="friends-row-sub"
                                      x-text="friendState(friend.user.display) === 'online' ? t('friends_state_online') : (friendState(friend.user.display) === 'away' ? t('friends_state_away') : t('friends_state_offline'))"></span>
                            </span>
                            <span class="mention-badge" x-show="unreadMessages[friend.user.display] > 0" x-text="unreadMessages[friend.user.display]"></span>
                            <span class="friends-row-actions">
                                <button type="button" class="friends-icon-btn" title="{{ t('friends_message') }}" @click.stop="openFriendChat(friend.user.display)">
                                    <i class="bi bi-chat-fill"></i>
                                </button>
                                <button type="button" class="friends-icon-btn" title="{{ t('friends_more') }}" @click.stop="openFriendContextMenu(friend, $event)">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                            </span>
                        </div>
                    </template>
                </div>

                <div class="friends-empty" x-show="filteredFriendList().length === 0"
                     x-text="friendSearch.trim() ? t('friends_none_found') : (friends.length === 0 ? t('friends_none') : t('friends_none_online'))"></div>
            </div>
        </template>

        <!-- Requests: incoming and outgoing -->
        <template x-if="friendFilter === 'pending'">
            <div>
                <div x-show="incomingFriendRequests.length">
                    <div class="friends-group-title">{{ t('friends_incoming') }} <span x-text="'(' + incomingFriendRequests.length + ')'"></span></div>
                    <div class="friends-rows">
                        <template x-for="req in incomingFriendRequests" :key="req.friendship_id">
                            <div class="friends-row">
                                <span class="channel-item-avatar nick-bg" :style="nickStyle(req.user.display)">
                                    <template x-if="avatarUrl(req.user.display)">
                                        <img class="nick-avatar-img" :src="avatarUrl(req.user.display)" alt="" loading="lazy" x-on:error="clearUserAvatar(req.user.display)">
                                    </template>
                                    <span x-show="!avatarUrl(req.user.display)" x-text="nickInitial(req.user.display)"></span>
                                </span>
                                <span class="friends-row-text"><span class="friends-row-name" x-text="req.user.display"></span></span>
                                <span class="friends-row-actions">
                                    <button type="button" class="friends-icon-btn is-success" title="{{ t('friends_accept') }}" @click="friendAction(req.friendship_id, 'accept')"><i class="bi bi-check-lg"></i></button>
                                    <button type="button" class="friends-icon-btn" title="{{ t('friends_decline') }}" @click="friendAction(req.friendship_id, 'decline')"><i class="bi bi-x-lg"></i></button>
                                    <button type="button" class="friends-icon-btn is-danger" title="{{ t('friends_block') }}" @click="friendAction(req.friendship_id, 'block')"><i class="bi bi-slash-circle"></i></button>
                                </span>
                            </div>
                        </template>
                    </div>
                </div>

                <div x-show="outgoingFriendRequests.length">
                    <div class="friends-group-title">{{ t('friends_outgoing') }} <span x-text="'(' + outgoingFriendRequests.length + ')'"></span></div>
                    <div class="friends-rows">
                        <template x-for="req in outgoingFriendRequests" :key="req.friendship_id">
                            <div class="friends-row">
                                <span class="channel-item-avatar nick-bg" :style="nickStyle(req.user.display)">
                                    <template x-if="avatarUrl(req.user.display)">
                                        <img class="nick-avatar-img" :src="avatarUrl(req.user.display)" alt="" loading="lazy" x-on:error="clearUserAvatar(req.user.display)">
                                    </template>
                                    <span x-show="!avatarUrl(req.user.display)" x-text="nickInitial(req.user.display)"></span>
                                </span>
                                <span class="friends-row-text"><span class="friends-row-name" x-text="req.user.display"></span></span>
                                <button type="button" class="btn btn-sm btn-outline-secondary" @click="friendAction(req.friendship_id, 'unfriend')">{{ t('friends_cancel_request') }}</button>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="friends-empty" x-show="!incomingFriendRequests.length && !outgoingFriendRequests.length">{{ t('friends_no_requests') }}</div>
            </div>
        </template>
    </div>
</div>
`,"./templates/gif-picker.html":`<div x-show="showGifPicker"
     class="gif-picker-popup"
     style="bottom: calc(100% + 4px); left: .5rem;"
     @click.outside="showGifPicker = false"
     x-data="gifPicker()"
     x-init="$watch('showGifPicker', v => { if (v) onOpen(); })">

    <div class="gp-search-row">
        <i class="bi bi-search gp-search-icon"></i>
        <input type="text" class="gp-search-input" x-model="gifSearch"
               placeholder="{{ t('gif_search_placeholder') }}" @keydown.escape="showGifPicker = false"
               x-ref="gifSearchInput">
        <button class="gp-close-btn" x-show="gifSearch.length > 0" @click="gifSearch = ''"><i class="bi bi-x"></i></button>
    </div>

    <div class="gp-grid" @scroll.debounce.150ms="if ($el.scrollTop + $el.clientHeight >= $el.scrollHeight - 50) loadMore()">
        <template x-for="gif in gifs" :key="gif.id">
            <button class="gp-gif-btn" @click="newMessage = gif.url; sendMessage(); showGifPicker = false" :title="gif.title">
                <img :src="gif.preview" :alt="gif.title" loading="lazy">
            </button>
        </template>

        <div x-show="loading" class="gp-loading">
            <div class="spinner-border spinner-border-sm text-muted" role="status"></div>
        </div>
        <div x-show="!loading && gifs.length === 0" class="gp-empty">{{ t('gif_none') }}</div>
    </div>

    <div class="gp-attribution">
        <span style="color:#888;font-size:.7rem;">Powered by <a href="https://klipy.com" target="_blank" rel="noopener" style="color:#6e8efb;text-decoration:none;">KLIPY</a></span>
    </div>
</div>

<style>
    .gif-picker-popup {
        position: absolute;
        width: 380px;
        background: #2b2d31;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 12px;
        box-shadow: 0 8px 28px rgba(0,0,0,.5);
        z-index: 1050;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .gp-search-row {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 10px;
        border-bottom: 1px solid rgba(255,255,255,.06);
    }

    .gp-search-icon { color: #666; font-size: .85rem; flex-shrink: 0; }

    .gp-search-input {
        flex: 1;
        background: rgba(255,255,255,.07);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 6px;
        color: #e0e0e0;
        font-size: .85rem;
        padding: 4px 8px;
        outline: none;
        transition: border-color .15s;
    }
    .gp-search-input:focus { border-color: rgba(255,255,255,.2); }
    .gp-search-input::placeholder { color: #555; }

    .gp-close-btn {
        background: none;
        border: none;
        color: #666;
        font-size: 1rem;
        padding: 2px 4px;
        border-radius: 4px;
        cursor: pointer;
        line-height: 1;
        transition: color .15s;
    }
    .gp-close-btn:hover { color: #ccc; }

    .gp-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        padding: 6px;
        max-height: 320px;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,.1) transparent;
    }

    .gp-gif-btn {
        background: rgba(255,255,255,.05);
        border: none;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
        padding: 0;
        width: calc(50% - 2px);
        transition: transform .1s;
    }
    .gp-gif-btn:hover { transform: scale(1.03); }

    .gp-gif-btn img {
        display: block;
        width: 100%;
        height: 100px;
        object-fit: cover;
        border-radius: 6px;
    }

    .gp-loading {
        width: 100%;
        text-align: center;
        padding: .75rem 0;
    }

    .gp-empty {
        width: 100%;
        text-align: center;
        color: #555;
        font-size: .8rem;
        padding: 1.5rem 0;
    }

    .gp-attribution {
        padding: 4px 10px 6px;
        text-align: right;
        border-top: 1px solid rgba(255,255,255,.06);
        opacity: .6;
    }
</style>
`,"./templates/login-overlay.html":`<!-- Login overlay, shown when the user is not yet connected -->
<div class="login-overlay" x-show="!isAuthenticated" x-cloak>
    <form class="card bg-dark text-light" style="width: 400px; max-width: calc(100vw - 32px);" @submit.prevent="loginPassword ? login() : guestLogin()">
        <div class="card-header">{{ t('login_welcome') }}</div>
        <div class="card-body">
            <!-- Arrived through a channel / invite link: say where the user is about to go -->
            <div class="alert alert-info py-2 small" x-show="requestedChannels.length > 0" x-cloak>
                <i class="bi bi-envelope-open-heart me-1"></i>
                <span x-text="t('login_invited_to').replace(':channel', requestedChannels.join(', '))"></span>
            </div>
            <div class="mb-3">
                <label for="starchat-nick" class="form-label">{{ t('login_nickname') }}</label>
                <input type="text" class="form-control bg-secondary text-light border-0" id="starchat-nick"
                       autocomplete="username" maxlength="32"
                       x-model="loginUsername" :disabled="isLoading">
            </div>
            <div class="mb-3">
                <label for="starchat-password" class="form-label">{{ t('login_account_password') }}</label>
                <input type="password" class="form-control bg-secondary text-light border-0" id="starchat-password"
                       autocomplete="current-password"
                       x-model="loginPassword" :disabled="isLoading">
                <div class="form-text text-secondary">{{ t('login_account_password_hint') }}</div>
            </div>

            <!-- Advanced settings: server and start channel -->
            <div class="mb-3">
                <button type="button" class="btn btn-link btn-sm p-0 text-decoration-none text-secondary d-flex align-items-center gap-1 w-100 text-start"
                        :aria-expanded="showAdvancedLogin ? 'true' : 'false'"
                        @click="showAdvancedLogin = !showAdvancedLogin">
                    <i class="bi" :class="showAdvancedLogin ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
                    <span>{{ t('login_advanced') }}</span>
                    <span class="ms-auto text-truncate small" x-show="!showAdvancedLogin" x-text="loginSummary()"></span>
                </button>
                <div class="mt-2" x-show="showAdvancedLogin" x-cloak>
                    <label for="starchat-server" class="form-label small mb-1">{{ t('login_server') }}</label>
                    <select id="starchat-server" class="form-select form-select-sm bg-secondary text-light border-0 mb-2"
                            x-model="selectedServerId" :disabled="isLoading">
                        <template x-for="server in serverOptions" :key="server.id">
                            <option :value="server.id" x-text="serverOptionLabel(server)" :selected="server.id === selectedServerId"></option>
                        </template>
                        <option value="__other__" :selected="selectedServerId === '__other__'">{{ t('login_server_other') }}</option>
                    </select>
                    <div x-show="selectedServerId === '__other__'">
                        <input type="text" class="form-control form-control-sm bg-secondary text-light border-0 mb-1"
                               placeholder="irc.example.org" autocapitalize="off" spellcheck="false"
                               aria-label="{{ t('login_server_domain') }}"
                               x-model="customServerDomain" :disabled="isLoading">
                        <input type="text" class="form-control form-control-sm bg-secondary text-light border-0 mb-2"
                               placeholder="wss://… (optional)" autocapitalize="off" spellcheck="false"
                               aria-label="{{ t('login_server_websocket') }}"
                               x-model="customWebsocketUrl" :disabled="isLoading">
                    </div>
                    <label for="starchat-channel" class="form-label small mb-1">{{ t('login_start_channel') }}</label>
                    <input type="text" id="starchat-channel" class="form-control form-control-sm bg-secondary text-light border-0"
                           placeholder="#channel" autocapitalize="off" spellcheck="false"
                           x-model="startChannel" :disabled="isLoading">
                </div>
            </div>

            <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
                <span x-show="!isLoading">{{ t('login_connect') }}</span>
                <span x-show="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
            <template x-if="hasModule('invites')">
                <p class="small text-center mt-3 mb-0" x-show="canShareInvites()">
                    {{ t('login_no_account') }}
                    <a :href="\`\${inviteBaseUrl()}/register\`" target="_blank" rel="noopener">{{ t('login_register') }}</a>
                </p>
            </template>
            <p class="text-danger mt-2 mb-0" x-show="loginError" x-text="loginError"></p>
        </div>
    </form>
</div>
`,"./templates/message-actions.html":`<!-- Hover toolbar of a message: quick reactions, reaction picker, reply, delete (IRCv3, only when the server supports it), report -->
<template x-if="hasMessageActions(row.message)">
    <div class="msg-actions" role="toolbar" :class="{ 'is-visible': pendingDeleteId === row.message.id || touchActionsMessageId === row.message.id }">
        <template x-if="canReactTo(row.message)">
            <span class="msg-actions-group">
                <template x-for="emoji in quickReactions.slice(0, 3)" :key="emoji">
                    <button type="button" class="msg-action-btn msg-action-btn--emoji"
                            :title="t('react_with').replace(':emoji', emoji)"
                            @click="toggleReaction(row.message, emoji)"
                            x-text="emoji"></button>
                </template>
                <button type="button" class="msg-action-btn" title="{{ t('add_reaction') }}"
                        @click.stop="openReactionPicker(row.message, $event)">
                    <i class="bi bi-emoji-smile"></i>
                </button>
            </span>
        </template>
        <template x-if="canReplyTo(row.message)">
            <button type="button" class="msg-action-btn" title="{{ t('reply') }}" @click="startReply(row.message)">
                <i class="bi bi-reply-fill"></i>
            </button>
        </template>
        <template x-if="hasFeature('reports') && canReportMessage(row.message)">
            <button type="button" class="msg-action-btn" title="{{ t('report_message') }}" aria-label="{{ t('report_message') }}"
                    @click="openReportDialog(row.message.user, row.message)">
                <i class="bi bi-flag"></i>
            </button>
        </template>
        <template x-if="canDelete(row.message)">
            <button type="button" class="msg-action-btn msg-action-btn--danger"
                    :class="{ 'is-confirming': pendingDeleteId === row.message.id }"
                    :title="pendingDeleteId === row.message.id ? t('delete_message_confirm') : t('delete_message')"
                    @click="deleteMessage(row.message, $event)">
                <i class="bi bi-trash3"></i>
                <span class="msg-action-confirm" x-show="pendingDeleteId === row.message.id">{{ t('delete_message_confirm') }}</span>
            </button>
        </template>
    </div>
</template>

<!-- Reactions below the message -->
<template x-if="row.message.reactions?.length">
    <div class="msg-reactions">
        <template x-for="reaction in row.message.reactions" :key="reaction.emoji">
            <button type="button" class="msg-reaction"
                    :class="{ 'is-mine': hasReacted(reaction) }"
                    :title="reactionTitle(reaction)"
                    :disabled="!canReactTo(row.message)"
                    @click="toggleReaction(row.message, reaction.emoji)">
                <span class="msg-reaction-emoji" x-text="reaction.emoji"></span>
                <span class="msg-reaction-count" x-text="reaction.nicks.length"></span>
            </button>
        </template>
        <button type="button" class="msg-reaction msg-reaction--add"
                x-show="canReactTo(row.message)"
                title="{{ t('add_reaction') }}"
                @click.stop="openReactionPicker(row.message, $event)">
            <i class="bi bi-emoji-smile"></i>
        </button>
    </div>
</template>
`,"./templates/modal-explore.html":`<!-- Explore modal: Bootstrap modal for browsing server channels and communities -->
<div class="modal fade" id="exploreModal" tabindex="-1" aria-labelledby="exploreModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content bg-dark text-light">

            <div class="modal-header">
                <h5 class="modal-title" id="exploreModalLabel">{{ t('explore_title') }}</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="{{ t('close') }}"></button>
            </div>

            <div class="modal-body">

                <!-- Tab nav -->
                <ul class="nav nav-tabs mb-3">
                    <li class="nav-item">
                        <button class="nav-link" :class="{ active: activeExploreTab === 'list' }"
                                @click="activeExploreTab = 'list'; requestChannelList();">
                            {{ t('explore_tab_list') }}
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" :class="{ active: activeExploreTab === 'communities' }"
                                @click="activeExploreTab = 'communities'; fetchExploreData();">
                            {{ t('explore_tab_communities') }}
                        </button>
                    </li>
                </ul>

                <!-- Tab: Server channel list -->
                <div x-show="activeExploreTab === 'list'">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="mb-0 text-uppercase text-muted">{{ t('explore_server_list') }}</h6>
                        <button class="btn btn-sm btn-outline-light" @click="requestChannelList()" :disabled="isListing">
                            <span x-show="!isListing">↻ {{ t('refresh') }}</span>
                            <span x-show="isListing">
                                <span class="spinner-border spinner-border-sm"></span> {{ t('loading') }}
                            </span>
                        </button>
                    </div>

                    <div class="mb-3">
                        <input type="text"
                               class="form-control form-control-sm bg-secondary text-light border-secondary"
                               placeholder="{{ t('explore_search_placeholder') }}"
                               x-model="exploreSearch">
                    </div>

                    <div class="text-muted small mb-2" x-show="serverChannels.length > 0">
                        <span x-text="t('explore_count', { shown: filteredServerChannels.length, total: serverChannels.length })"></span>
                        <span x-show="exploreSearch.trim()" x-text="t('explore_count_query', { query: exploreSearch })"></span>
                    </div>

                    <div class="list-group" style="max-height:400px; overflow-y:auto;">
                        <template x-for="channel in filteredServerChannels" :key="channel.name">
                            <div class="list-group-item list-group-item-action bg-dark text-light d-flex justify-content-between align-items-center">
                                <div class="text-truncate me-2">
                                    <span class="fw-semibold" x-text="channel.name"></span>
                                    <span class="badge text-bg-secondary ms-1" x-text="channel.users + ' Users'"></span>
                                    <p class="mb-0 small text-muted text-truncate" x-text="channel.topic || t('explore_no_topic')"></p>
                                </div>
                                <button class="btn btn-sm flex-shrink-0"
                                        :class="isChannelJoined(channel.name) ? 'btn-outline-secondary' : 'btn-success'"
                                        @click="joinChannel(channel.name)"
                                        :disabled="isChannelJoined(channel.name)">
                                    <i class="bi bi-check2" x-show="isChannelJoined(channel.name)"></i>
                                    <span x-text="isChannelJoined(channel.name) ? t('explore_joined') : t('explore_join')"></span>
                                </button>
                            </div>
                        </template>
                    </div>

                    <div class="text-muted small text-center py-3"
                         x-show="!isListing && filteredServerChannels.length === 0">
                        <span x-show="exploreSearch.trim()">{{ t('explore_none_found') }}</span>
                        <span x-show="!exploreSearch.trim()">{{ t('explore_none') }}</span>
                    </div>
                </div>

                <!-- Tab: Communities -->
                <div x-show="activeExploreTab === 'communities'">
                    <h6 class="mb-2 text-uppercase text-muted">{{ t('explore_tab_communities') }}</h6>
                    <div class="list-group">
                        <template x-for="community in communities" :key="community.id">
                            <div class="list-group-item list-group-item-action bg-dark text-light d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 class="mb-1" x-text="community.name"></h5>
                                    <p class="mb-1 text-muted" x-text="community.description"></p>
                                    <p class="mb-1 text-muted">
                                        <strong>{{ t('channels_label') }}</strong>
                                        <span x-text="community.channel_names.join(', ')"></span>
                                    </p>
                                </div>
                                <button class="btn btn-sm flex-shrink-0"
                                        :class="isCommunityJoined(community) ? 'btn-outline-secondary' : 'btn-success'"
                                        :disabled="isCommunityJoined(community)"
                                        :title="isCommunityJoined(community) ? '' : missingCommunityChannels(community).join(', ')"
                                        @click="joinCommunity(community)">
                                    <i class="bi bi-check2" x-show="isCommunityJoined(community)"></i>
                                    <span x-text="isCommunityJoined(community) ? t('explore_joined') : t('explore_join')"></span>
                                </button>
                            </div>
                        </template>
                    </div>
                </div>

            </div><!-- /.modal-body -->
        </div>
    </div>
</div>
`,"./templates/profile-card.html":`<!-- Profile card: opens on a click on a nick (user list, avatar or author of a message) -->
<div x-show="showingUserOptions"
     class="chat-context-menu chat-user-menu profile-card"
     x-cloak
     x-ref="userMenu"
     @click.outside="showingUserOptions = false"
     @keydown.escape.window="showingUserOptions = false">
    <div class="profile-card-banner nick-bg" :style="nickStyle(selectedUser)"></div>

    <div class="profile-card-head">
        <span class="profile-card-avatar nick-bg" :style="nickStyle(selectedUser)">
            <template x-if="profileCardAvatar()">
                <img class="nick-avatar-img" :src="profileCardAvatar()" alt="">
            </template>
            <span x-show="!profileCardAvatar()" x-text="nickInitial(selectedUser)"></span>
            <span class="profile-card-status"
                  :class="'is-' + profileCardStatus()"
                  :title="profileCardStatus() === 'offline' ? t('profile_offline') : (profileCardStatus() === 'away' ? t('profile_away') : '')"></span>
        </span>
        <template x-if="hasFeature('profiles')">
        <button type="button"
                class="btn btn-sm profile-card-edit"
                x-show="isOwnProfileCard() && canUseProfiles()"
                @click="openProfileEditor()">
            <i class="bi bi-pencil"></i> {{ t('profile_edit') }}
        </button>
        </template>
    </div>

    <div class="profile-card-body">
        <div class="profile-card-name nick-color" :style="nickStyle(selectedUser)" x-text="selectedUser"></div>
        <div class="profile-card-sub">
            <template x-if="profileCard.account">
                <span><i class="bi bi-person-check"></i> <span x-text="profileCard.account"></span></span>
            </template>
            <template x-if="profileCard.whoisDone && !profileCard.account && profileCard.isOnline">
                <span>{{ t('profile_no_account') }}</span>
            </template>
            <template x-if="!profileCard.isOnline">
                <span>{{ t('profile_offline') }}</span>
            </template>
        </div>

        <div class="profile-card-custom-status" x-show="profileCardStatusText()" x-text="profileCardStatusText()"></div>

        <div class="profile-card-badges" x-show="profileCardRole() || profileCard.isOperator">
            <span class="profile-card-badge" x-show="profileCardRole()" x-text="profileCardRole()"></span>
            <span class="profile-card-badge" x-show="profileCard.isOperator"><i class="bi bi-shield-fill"></i> {{ t('profile_irc_operator') }}</span>
        </div>

        <div class="profile-card-note" x-show="profileCard.awayMessage">
            <i class="bi bi-moon"></i> <span x-text="profileCard.awayMessage"></span>
        </div>
        <div class="profile-card-note user-playing" x-show="profileCardUser()?.playing">
            <i class="bi bi-music-note-beamed"></i> <span x-text="profileCardUser()?.playing"></span>
        </div>

        <div class="profile-card-loading" x-show="!profileCard.whoisDone || profileCard.loading">
            <span class="spinner-border spinner-border-sm"></span> {{ t('profile_loading') }}
        </div>

        <template x-if="hasFeature('profiles') && profileCard.profile">
            <div class="profile-card-sections">
                <div class="profile-card-section" x-show="profileCard.profile.member_since">
                    <div class="profile-card-label">{{ t('profile_member_since') }}</div>
                    <div x-text="formatProfileDate(profileCard.profile.member_since)"></div>
                </div>
                <div class="profile-card-section" x-show="profileCard.profile.mutual_communities.length">
                    <div class="profile-card-label">{{ t('profile_mutual_communities') }}</div>
                    <div class="profile-card-chips">
                        <template x-for="community in profileCard.profile.mutual_communities" :key="community.slug">
                            <span class="profile-card-chip" x-text="community.name"></span>
                        </template>
                    </div>
                </div>
                <div class="profile-card-section" x-show="profileCard.profile.characters.length">
                    <div class="profile-card-label">{{ t('profile_characters') }}</div>
                    <div class="d-flex flex-column gap-1">
                        <template x-for="character in profileCard.profile.characters" :key="character.url">
                            <a class="profile-card-character" :href="character.url" target="_blank" rel="noopener">
                                <span class="fw-semibold" x-text="character.name"></span>
                                <span class="profile-card-character-meta" x-text="[character.race, character.character_class].filter(Boolean).join(' · ')"></span>
                            </a>
                        </template>
                    </div>
                </div>
            </div>
        </template>

        <!-- Own colour for this nick (like mIRC/KVIrc), only this user sees it -->
        <div class="profile-card-section profile-card-colors">
            <div class="profile-card-label">
                <span x-text="isOwnProfileCard() ? t('nick_color_own') : t('nick_color')"></span>
                <span class="profile-card-colors-hint">{{ t('nick_color_hint') }}</span>
            </div>
            <div class="nick-color-swatches" role="group" :aria-label="t('nick_color')">
                <template x-for="hue in nickColorHues" :key="hue">
                    <button type="button"
                            class="nick-color-swatch nick-bg"
                            :class="{ 'is-selected': customNickHue(selectedUser) === hue }"
                            :style="\`--nick-hue: \${hue}\`"
                            :aria-pressed="customNickHue(selectedUser) === hue"
                            :aria-label="\`\${hue}°\`"
                            @click="setNickColor(selectedUser, hue)"></button>
                </template>
                <button type="button"
                        class="nick-color-reset"
                        x-show="customNickHue(selectedUser) !== null"
                        title="{{ t('nick_color_reset') }}"
                        aria-label="{{ t('nick_color_reset') }}"
                        @click="setNickColor(selectedUser, null)">
                    <i class="bi bi-arrow-counterclockwise"></i>
                </button>
            </div>
        </div>

        <div class="profile-card-actions">
            <button type="button" class="context-action" x-show="!isOwnProfileCard()" @click="sendPrivateMessage(selectedUser)">
                <i class="bi bi-chat-dots"></i> {{ t('send_message') }}
            </button>
            <template x-if="hasFeature('friends')">
                <div style="display: contents">
            <button type="button" class="context-action" x-show="canAddProfileFriend()" @click="addFriendFromProfileCard()">
                <i class="bi bi-person-plus"></i> {{ t('profile_add_friend') }}
            </button>
            <div class="context-action is-static" x-show="!isOwnProfileCard() && profileFriendStatus() === 'friend'">
                <i class="bi bi-people-fill"></i> {{ t('profile_is_friend') }}
            </div>
            <div class="context-action is-static" x-show="!isOwnProfileCard() && profileFriendStatus() === 'pending'">
                <i class="bi bi-hourglass-split"></i> {{ t('profile_friend_pending') }}
            </div>
                </div>
            </template>
            <button type="button" class="context-action" x-show="!isOwnProfileCard()" @click="toggleIgnoreUser(selectedUser)">
                <i class="bi bi-ban"></i> <span x-text="isIgnored(selectedUser) ? t('unignore') : t('ignore')"></span>
            </button>
            <template x-if="hasFeature('reports')">
            <button type="button" class="context-action text-danger" x-show="canReportUser(selectedUser)" @click="openReportDialog(selectedUser)">
                <i class="bi bi-flag"></i> {{ t('report') }}
            </button>
            </template>
        </div>

        <template x-if="canManageCurrentChannel() && selectedUser !== nickname">
            <details class="profile-card-moderation" @toggle="$nextTick(() => positionUserMenu())">
                <summary class="small text-uppercase text-muted">Moderation</summary>
                <div class="d-grid gap-1 mt-2">
                    <button class="btn btn-sm btn-outline-info" @click="applyUserMode(selectedUser, '+v')">+v (Voice)</button>
                    <button class="btn btn-sm btn-outline-info" @click="applyUserMode(selectedUser, '-v')">-v (Devoice)</button>
                    <button class="btn btn-sm btn-outline-warning" @click="applyUserMode(selectedUser, '+h')">+h (Hop)</button>
                    <button class="btn btn-sm btn-outline-warning" @click="applyUserMode(selectedUser, '-h')">-h (Dehop)</button>
                    <button class="btn btn-sm btn-outline-primary" @click="applyUserMode(selectedUser, '+o')">+o (AOP / OP)</button>
                    <button class="btn btn-sm btn-outline-primary" @click="applyUserMode(selectedUser, '-o')">-o (Deop)</button>
                    <button class="btn btn-sm btn-outline-danger" @click="kickUser(selectedUser)">Kick</button>
                    <button class="btn btn-sm btn-danger" @click="banAndKickUser(selectedUser)">Ban + Kick</button>
                </div>
            </details>
        </template>
    </div>
</div>
`,"./templates/profile-editor.html":`<!-- Own profile: the "Account" section of the settings window (avatar, status) -->
<div class="profile-editor-body">

        <div class="profile-editor-loading" x-show="profileEditor.loading">
            <span class="spinner-border spinner-border-sm"></span> {{ t('profile_loading') }}
        </div>

        <div x-show="!profileEditor.loading">
            <div class="profile-editor-label">{{ t('profile_avatar') }}</div>
            <div class="profile-editor-avatar-row">
                <span class="profile-editor-avatar nick-bg" :style="nickStyle(nickname)">
                    <template x-if="profileEditorAvatar()">
                        <img class="nick-avatar-img" :src="profileEditorAvatar()" alt="">
                    </template>
                    <span x-show="!profileEditorAvatar()" x-text="nickInitial(nickname)"></span>
                </span>

                <div class="d-flex flex-column gap-2 flex-grow-1">
                    <input type="file"
                           class="d-none"
                           accept="image/jpeg,image/png,image/gif"
                           x-ref="profileAvatarInput"
                           @change="selectProfileAvatar($event)">
                    <div class="d-flex flex-wrap gap-2">
                        <button type="button" class="btn btn-sm btn-outline-secondary" @click="$refs.profileAvatarInput.click()" :disabled="profileEditor.saving">
                            <i class="bi bi-image"></i> {{ t('profile_avatar_choose') }}
                        </button>
                        <button type="button" class="btn btn-sm btn-primary" x-show="profileEditor.file" @click="uploadProfileAvatar()" :disabled="profileEditor.saving">
                            <span class="spinner-border spinner-border-sm" x-show="profileEditor.saving"></span>
                            <i class="bi bi-upload" x-show="!profileEditor.saving"></i> {{ t('profile_avatar_upload') }}
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" x-show="!profileEditor.file && (ownAvatarUrl || profileEditor.profile?.avatar_url)" @click="removeProfileAvatar()" :disabled="profileEditor.saving">
                            <i class="bi bi-trash"></i> {{ t('profile_avatar_remove') }}
                        </button>
                    </div>
                    <div class="profile-editor-hint">{{ t('profile_avatar_hint') }}</div>
                </div>
            </div>

            <div class="profile-editor-message is-success" x-show="profileEditor.notice" x-text="profileEditor.notice"></div>
            <div class="profile-editor-message is-error" x-show="profileEditor.error" x-text="profileEditor.error"></div>

            <div class="profile-editor-section">
                <label class="profile-editor-label" for="profileStatusInput">{{ t('profile_status') }}</label>
                <div class="profile-status-field">
                    <button type="button"
                            class="profile-status-emoji-btn"
                            title="{{ t('profile_status_emoji') }}"
                            @click="profileEditor.statusEmojiOpen = !profileEditor.statusEmojiOpen">
                        <i class="bi bi-emoji-smile"></i>
                    </button>
                    <input type="text"
                           id="profileStatusInput"
                           class="profile-status-input"
                           maxlength="128"
                           placeholder="{{ t('profile_status_placeholder') }}"
                           x-ref="profileStatusInput"
                           x-model="profileEditor.statusDraft"
                           @keydown.enter.prevent="saveProfileStatus()">
                    <span class="profile-status-counter" x-text="statusDraftLength() + '/128'"></span>

                    <div class="emoji-picker-popup profile-status-emoji-picker"
                         x-show="profileEditor.statusEmojiOpen"
                         x-cloak
                         @click.outside="profileEditor.statusEmojiOpen = false"
                         @keydown.escape.stop="profileEditor.statusEmojiOpen = false"
                         x-data="emojiPicker()">
                        <div class="ep-category-title">{{ t('profile_status_recent_emojis') }}</div>
                        <div class="reaction-quick-row">
                            <template x-for="emoji in statusQuickEmojis()" :key="emoji">
                                <button type="button" class="ep-emoji-btn" @click="insertStatusEmoji(emoji)" x-text="emoji"></button>
                            </template>
                        </div>
                        <div class="ep-search-row">
                            <i class="bi bi-search ep-search-icon"></i>
                            <input type="text" class="ep-search-input" x-model="emojiSearch" placeholder="{{ t('search_emoji') }}">
                            <button type="button" class="ep-close-btn" @click="profileEditor.statusEmojiOpen = false"><i class="bi bi-x"></i></button>
                        </div>
                        <div class="ep-tabs" x-show="!emojiSearch">
                            <template x-for="(cat, key) in categories" :key="key">
                                <button type="button" class="ep-tab-btn" :class="{ 'ep-tab-active': activeCategory === key }"
                                        :title="cat.title" @click="activeCategory = key" x-text="cat.label"></button>
                            </template>
                        </div>
                        <div class="ep-category-title" x-text="emojiSearch ? t('search_emoji') : (categories[activeCategory]?.title || '')"></div>
                        <div class="ep-grid">
                            <template x-for="(emoji, idx) in filteredEmojis()" :key="idx">
                                <button type="button" class="ep-emoji-btn" @click="insertStatusEmoji(emoji)" x-text="emoji"></button>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-wrap gap-2 mt-2">
                    <button type="button" class="btn btn-sm btn-primary" @click="saveProfileStatus()" :disabled="profileEditor.statusSaving || !isStatusDraftChanged()">
                        <span class="spinner-border spinner-border-sm" x-show="profileEditor.statusSaving"></span>
                        {{ t('profile_status_save') }}
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" x-show="ownStatus" @click="saveProfileStatus(true)" :disabled="profileEditor.statusSaving">
                        <i class="bi bi-x-circle"></i> {{ t('profile_status_clear') }}
                    </button>
                </div>
                <div class="profile-editor-message is-success" x-show="profileEditor.statusNotice" x-text="profileEditor.statusNotice"></div>
                <div class="profile-editor-message is-error" x-show="profileEditor.statusError" x-text="profileEditor.statusError"></div>
            </div>

            <div class="profile-editor-section" x-show="alwaysOn.loaded || alwaysOn.loadFailed">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="alwaysOnSwitch"
                           :checked="alwaysOn.enabled" :disabled="alwaysOn.saving || !alwaysOn.loaded" @change="toggleAlwaysOn($event)">
                    <label class="form-check-label" for="alwaysOnSwitch">{{ t('always_on_setting') }}</label>
                </div>
                <div class="profile-editor-hint">{{ t('always_on_setting_hint') }}</div>
                <div class="profile-editor-message is-error" x-show="alwaysOn.loadFailed && !alwaysOn.loaded">{{ t('always_on_unavailable') }}</div>
                <div class="profile-editor-message is-success" x-show="alwaysOn.notice" x-text="alwaysOn.notice"></div>
                <div class="profile-editor-message is-error" x-show="alwaysOn.error && !alwaysOn.showPrompt" x-text="alwaysOn.error"></div>
            </div>

            <div class="profile-editor-footer" x-show="profileEditor.profile?.settings_url">
                <a :href="profileEditor.profile?.settings_url" target="_blank" rel="noopener" class="profile-editor-link">
                    {{ t('profile_more_settings') }} <i class="bi bi-box-arrow-up-right"></i>
                </a>
                <a :href="profileEditor.profile?.delete_account_url" x-show="profileEditor.profile?.delete_account_url"
                   target="_blank" rel="noopener" class="profile-editor-link text-danger">
                    {{ t('profile_delete_account') }} <i class="bi bi-box-arrow-up-right"></i>
                </a>
            </div>
        </div>
    </div>
`,"./templates/quick-switcher.html":`<!--
    Quick switcher (Ctrl+P) and the shortcut overview (?), see mixins/shortcuts.js.
-->
<div x-show="quickSwitcher.show"
     x-cloak
     class="quick-switcher-backdrop"
     @click.self="closeQuickSwitcher()">
    <div class="quick-switcher" role="dialog" aria-modal="true" aria-label="{{ t('shortcut_quick_switcher') }}">
        <!-- Share mode (Android app): what was shared and where it should go -->
        <template x-if="hasModule('share') && quickSwitcher.mode === 'share' && pendingShare">
            <div class="quick-switcher-share">
                <div class="quick-switcher-share-title">
                    <i class="bi bi-share"></i>
                    <span>{{ t('share_title') }}</span>
                    <button type="button" class="btn-close btn-close-white ms-auto" aria-label="{{ t('close') }}" @click="closeQuickSwitcher()"></button>
                </div>
                <div class="quick-switcher-share-content">
                    <i class="bi" :class="pendingShare.file ? 'bi-paperclip' : 'bi-link-45deg'"></i>
                    <span x-text="pendingShareSummary()"></span>
                </div>
                <div class="quick-switcher-share-warning" x-show="pendingShareWarning()" x-text="pendingShareWarning()"></div>
            </div>
        </template>
        <label class="quick-switcher-search">
            <i class="bi bi-search"></i>
            <input type="text"
                   x-model="quickSwitcher.query"
                   x-effect="quickSwitcher.show && !isMobileLayout && $nextTick(() => $el.focus())"
                   @input="quickSwitcherInput()"
                   @keydown.arrow-down.prevent="quickSwitcherMove(1)"
                   @keydown.arrow-up.prevent="quickSwitcherMove(-1)"
                   @keydown.enter.prevent="quickSwitcherConfirm()"
                   @keydown.escape.prevent.stop="closeQuickSwitcher()"
:placeholder="quickSwitcher.mode === 'share' ? t('share_placeholder') : t('quick_switcher_placeholder')"
                   autocomplete="off"
                   spellcheck="false">
        </label>

        <div class="quick-switcher-list" role="listbox">
            <template x-for="(item, index) in quickSwitcherItems()" :key="item.kind + item.name">
                <button type="button"
                        class="quick-switcher-item"
                        role="option"
                        :aria-selected="index === quickSwitcher.index"
                        :class="{ 'is-selected': index === quickSwitcher.index, 'is-unread': item.unread > 0 }"
                        @mouseenter="quickSwitcher.index = index"
                        @click="quickSwitcherConfirm(item)">
                    <i class="bi" :class="item.kind === 'channel' ? 'bi-hash' : (item.kind === 'dm' ? 'bi-chat-dots' : 'bi-person')"></i>
                    <span class="quick-switcher-name" x-text="item.kind === 'channel' ? item.name.replace(/^#/, '') : item.name"></span>
                    <span class="mention-badge" x-show="item.mentions > 0" x-text="item.mentions"></span>
                </button>
            </template>
            <div class="quick-switcher-empty" x-show="quickSwitcherItems().length === 0">{{ t('quick_switcher_empty') }}</div>
        </div>

        <div class="quick-switcher-hint" x-show="!isMobileLayout">
            <span><kbd>↑</kbd><kbd>↓</kbd> {{ t('quick_switcher_hint_move') }}</span>
            <span><kbd>Enter</kbd> {{ t('quick_switcher_hint_open') }}</span>
            <span><kbd>Esc</kbd> {{ t('quick_switcher_hint_close') }}</span>
        </div>
    </div>
</div>

<div x-show="showShortcutHelp"
     x-cloak
     class="quick-switcher-backdrop"
     @click.self="showShortcutHelp = false">
    <div class="quick-switcher shortcut-help" role="dialog" aria-modal="true" aria-labelledby="shortcutHelpTitle">
        <div class="shortcut-help-header">
            <span id="shortcutHelpTitle">{{ t('shortcut_help_title') }}</span>
            <button type="button" class="btn-close btn-close-white" aria-label="{{ t('close') }}" @click="showShortcutHelp = false"></button>
        </div>
        <dl class="shortcut-help-list">
            <template x-for="shortcut in shortcuts" :key="shortcut.label">
                <div class="shortcut-help-row">
                    <dt x-text="t(shortcut.label)"></dt>
                    <dd>
                        <template x-for="key in shortcut.keys" :key="key">
                            <kbd x-text="key"></kbd>
                        </template>
                    </dd>
                </div>
            </template>
        </dl>
    </div>
</div>
`,"./templates/report-dialog.html":`<!--
    Report a user or a message to the moderators of the server (see the reports feature).
-->
<div x-show="reportDialog.show"
     x-cloak
     class="quick-switcher-backdrop report-dialog-backdrop"
     @click.self="closeReportDialog()"
     @keydown.escape.window="reportDialog.show && closeReportDialog()">
    <div class="quick-switcher report-dialog" role="dialog" aria-modal="true" aria-labelledby="reportDialogTitle">
        <div class="report-dialog-header">
            <i class="bi bi-flag-fill text-danger"></i>
            <h2 id="reportDialogTitle" class="report-dialog-title">
                {{ t('report_title') }} <span x-text="reportDialog.nick"></span>
            </h2>
            <button type="button" class="btn-close btn-close-white ms-auto" aria-label="{{ t('close') }}" @click="closeReportDialog()"></button>
        </div>

        <template x-if="!reportDialog.done">
            <form class="report-dialog-body" @submit.prevent="submitReport()">
                <template x-if="reportDialog.message">
                    <blockquote class="report-dialog-quote" x-text="reportDialog.message.text"></blockquote>
                </template>

                <fieldset class="report-dialog-reasons">
                    <legend class="report-dialog-label">{{ t('report_reason') }}</legend>
                    <!-- Reasons come from the server that receives the report -->
                    <template x-for="reason in reportReasons" :key="reason.value">
                        <label class="report-dialog-reason">
                            <input type="radio" name="report_reason" :value="reason.value" x-model="reportDialog.reason">
                            <span x-text="reason.label"></span>
                        </label>
                    </template>
                </fieldset>

                <label class="report-dialog-label" for="reportDetails">{{ t('report_details') }}</label>
                <textarea id="reportDetails" class="form-control report-dialog-details" rows="3" maxlength="2000"
                          x-model="reportDialog.details" placeholder="{{ t('report_details_placeholder') }}"></textarea>

                <p class="report-dialog-hint" x-show="reportDialog.reason === 'child_safety'">
                    {{ t('report_child_safety_hint') }}
                </p>

                <div class="report-dialog-error" x-show="reportDialog.error" x-text="reportDialog.error" role="alert"></div>

                <div class="report-dialog-actions">
                    <a :href="reportPolicyUrl" x-show="reportPolicyUrl" target="_blank" rel="noopener" class="report-dialog-policy">{{ t('report_policy_link') }}</a>
                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="closeReportDialog()">{{ t('report_cancel') }}</button>
                    <button type="submit" class="btn btn-sm btn-danger" :disabled="reportDialog.sending">
                        <span x-show="reportDialog.sending" class="spinner-border spinner-border-sm me-1"></span>
                        {{ t('report_submit') }}
                    </button>
                </div>
            </form>
        </template>

        <template x-if="reportDialog.done">
            <div class="report-dialog-body">
                <p class="mb-3"><i class="bi bi-check-circle-fill text-success me-1"></i>{{ t('report_received') }}</p>
                <div class="report-dialog-actions">
                    <button type="button" class="btn btn-sm btn-outline-secondary"
                            x-show="!isIgnored(reportDialog.nick)"
                            @click="toggleIgnoreUser(reportDialog.nick)">
                        <i class="bi bi-ban me-1"></i>{{ t('ignore') }}
                    </button>
                    <button type="button" class="btn btn-sm btn-primary" @click="closeReportDialog()">{{ t('close') }}</button>
                </div>
            </div>
        </template>
    </div>
</div>
`,"./templates/settings-window.html":`<!--
    Settings window, rendered from the settings registry.
    Every setting shows where it applies: all tabs, this connection or the account on the server.
-->
<div x-show="settingsWindow.show"
     x-cloak
     class="settings-window-backdrop"
     @click.self="closeSettings()"
     @keydown.escape.window="settingsWindow.show && closeSettings()">
    <div class="settings-window" role="dialog" aria-modal="true" aria-labelledby="settingsWindowTitle">

        <nav class="settings-nav">
            <div class="settings-nav-title" id="settingsWindowTitle">{{ t('settings_title') }}</div>

            <label class="settings-search">
                <i class="bi bi-search"></i>
                <input type="search"
                       x-model="settingsWindow.query"
                       x-effect="settingsWindow.show && $nextTick(() => $el.focus())"
                       placeholder="{{ t('settings_search') }}">
            </label>

            <div class="settings-nav-list">
                <template x-for="section in settingsSections()" :key="section.id">
                    <button type="button"
                            class="settings-nav-item"
                            :class="{ 'is-active': !settingsWindow.query && settingsWindow.section === section.id }"
                            @click="selectSettingsSection(section.id)">
                        <i class="bi" :class="section.icon"></i>
                        <span x-text="t(section.label)"></span>
                    </button>
                </template>
            </div>

            <div class="settings-nav-connection">
                <i class="bi" :class="syncsWithAccount() ? 'bi-cloud-check' : 'bi-plug'"></i>
                <span x-text="syncsWithAccount() ? t('settings_connection_account') : t('settings_connection_local')"></span>
            </div>
        </nav>

        <section class="settings-content">
            <header class="settings-content-header">
                <h2 x-text="settingsWindow.query.trim() ? t('settings_search_results') : t(activeSettingsSection()?.label || 'settings_title')"></h2>
                <button type="button" class="chat-header-btn" title="{{ t('highlight_close') }}" @click="closeSettings()">
                    <i class="bi bi-x-lg"></i>
                </button>
            </header>

            <div class="settings-content-body">
                <template x-for="(setting, index) in visibleSettings()" :key="setting.id">
                    <div>
                        <div class="settings-group-title"
                             x-show="settingStartsGroup(visibleSettings(), index)"
                             x-text="setting.group ? t(setting.group) : ''"></div>

                        <!-- Custom views -->
                        <template x-if="hasFeature('profiles') && setting.type === 'custom' && setting.view === 'profile'">
                            <div class="settings-item settings-item--stacked">
                                {{> profile-editor }}
                            </div>
                        </template>

                        <template x-if="hasModule('connections') && setting.type === 'custom' && setting.view === 'connections'">
                            <div class="settings-item settings-item--stacked">
                                {{> connections-settings }}
                            </div>
                        </template>

                        <template x-if="hasFeature('voice') && setting.type === 'custom' && setting.view === 'voice'">
                            <div class="settings-item settings-item--stacked">
                                {{> voice-settings }}
                            </div>
                        </template>

                        <template x-if="setting.type !== 'custom'">
                            <div class="settings-item" :class="{ 'settings-item--stacked': setting.type === 'list' || setting.type === 'text' }">
                                <div class="settings-item-text">
                                    <div class="settings-item-label">
                                        <span x-text="t(setting.label)"></span>
                                        <span class="settings-item-section" x-show="settingsWindow.query.trim()" x-text="settingSectionLabel(setting)"></span>
                                    </div>
                                    <div class="settings-item-hint" x-show="setting.hint" x-text="setting.hint ? t(setting.hint) : ''"></div>
                                    <div class="settings-item-scope">
                                        <i class="bi" :class="settingScope(setting).icon"></i>
                                        <span x-text="settingScope(setting).label"></span>
                                    </div>
                                </div>

                                <div class="settings-item-control">
                                    <!-- Toggle -->
                                    <template x-if="setting.type === 'toggle'">
                                        <label class="settings-switch">
                                            <input type="checkbox"
                                                   :checked="settingValue(setting)"
                                                   :aria-label="t(setting.label)"
                                                   @change="updateSetting(setting, $event.target.checked)">
                                            <span class="settings-switch-slider"></span>
                                        </label>
                                    </template>

                                    <!-- Select -->
                                    <template x-if="setting.type === 'select'">
                                        <select class="form-select form-select-sm settings-select"
                                                :aria-label="t(setting.label)"
                                                @change="updateSetting(setting, $event.target.value)">
                                            <template x-for="option in setting.options" :key="option.value">
                                                <option :value="option.value" :selected="settingValue(setting) === option.value" x-text="t(option.label)"></option>
                                            </template>
                                        </select>
                                    </template>

                                    <!-- Text (saved when the field is left or Enter is pressed) -->
                                    <template x-if="setting.type === 'text'">
                                        <input type="text"
                                               class="form-control form-control-sm settings-text"
                                               :value="settingValue(setting)"
                                               :maxlength="setting.maxLength || null"
                                               :placeholder="setting.placeholder ? t(setting.placeholder) : ''"
                                               :aria-label="t(setting.label)"
                                               @change="updateSetting(setting, $event.target.value)"
                                               @keydown.enter.prevent="$event.target.blur()">
                                    </template>

                                    <!-- Action -->
                                    <template x-if="setting.type === 'action'">
                                        <div class="settings-action">
                                            <span class="settings-action-status" x-show="settingStatus(setting)" x-text="settingStatus(setting)"></span>
                                            <button type="button" class="btn btn-sm btn-outline-secondary" x-show="settingActionLabel(setting)" @click="runSetting(setting)" x-text="settingActionLabel(setting)"></button>
                                        </div>
                                    </template>

                                    <!-- Path -->
                                    <template x-if="setting.type === 'path'">
                                        <div class="settings-path">
                                            <code class="settings-path-value" :title="settingValue(setting)" x-text="settingValue(setting) || t('settings_path_none')"></code>
                                            <button type="button" class="btn btn-sm btn-outline-secondary" @click="runSetting(setting)" x-text="settingActionLabel(setting)"></button>
                                        </div>
                                    </template>

                                    <!-- List (chips) -->
                                    <template x-if="setting.type === 'list'">
                                        <div class="settings-list">
                                            <form class="settings-list-form" @submit.prevent="addListEntry(setting)">
                                                <input type="text"
                                                       class="form-control form-control-sm"
                                                       maxlength="200"
                                                       :value="listInput(setting)"
                                                       @input="setListInput(setting, $event.target.value)"
                                                       :disabled="isListFull(setting)"
                                                       :placeholder="setting.placeholder ? t(setting.placeholder) : ''">
                                                <button type="submit" class="btn btn-sm btn-primary" :disabled="!listInput(setting).trim() || isListFull(setting)">
                                                    {{ t('highlight_add') }}
                                                </button>
                                            </form>
                                            <div class="settings-chips">
                                                <template x-for="entry in settingValue(setting) || []" :key="entry">
                                                    <span class="settings-chip">
                                                        <span x-text="entry"></span>
                                                        <button type="button" title="{{ t('highlight_remove') }}" @click="removeListEntry(setting, entry)">
                                                            <i class="bi bi-x"></i>
                                                        </button>
                                                    </span>
                                                </template>
                                                <span class="settings-chips-empty" x-show="!(settingValue(setting) || []).length">{{ t('settings_list_empty') }}</span>
                                                <span class="settings-chips-count" x-show="setting.limit && (settingValue(setting) || []).length"
                                                      x-text="(settingValue(setting) || []).length + ' / ' + setting.limit"></span>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>

                <div class="settings-empty" x-show="settingsWindow.query.trim() && visibleSettings().length === 0">
                    <i class="bi bi-search"></i> {{ t('settings_search_empty') }}
                </div>
            </div>
        </section>
    </div>
</div>
`,"./templates/upload-manager.html":`<!-- Upload manager, shown when sidebarMode === 'uploads' -->
<div class="flex-grow-1 p-4 overflow-auto upload-manager-view" x-cloak>

    <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0 d-flex align-items-center gap-2">
            <i class="bi bi-collection-play"></i> {{ t('uploads_title') }}
        </h4>
        <button class="btn btn-outline-primary" @click="fetchMyUploads()" :disabled="myUploadsLoading">
            <i class="bi bi-arrow-clockwise"></i> {{ t('refresh') }}
        </button>
    </div>

    <p class="text-muted mb-3">
        {{ t('uploads_intro') }}
    </p>

    <div class="alert alert-secondary" x-show="myUploadsLoading">{{ t('loading') }}</div>
    <div class="alert alert-secondary" x-show="!myUploadsLoading && myUploads.length === 0">{{ t('uploads_empty') }}</div>

    <div class="row g-3" x-show="!myUploadsLoading && myUploads.length > 0">
        <template x-for="upload in myUploads" :key="upload.id">
            <div class="col-12 col-md-6 col-xl-4">
                <div class="card bg-dark border-secondary-subtle h-100">
                    <div class="card-body">
                        <template x-if="isUploadImage(upload)">
                            <img :src="upload.url" alt="{{ t('preview') }}" class="rounded mb-2"
                                 style="width:100%; height:160px; object-fit:cover;">
                        </template>
                        <template x-if="isUploadVideo(upload)">
                            <video :src="upload.url" class="rounded mb-2 w-100"
                                   style="height:160px; object-fit:cover;" muted preload="metadata"></video>
                        </template>
                        <h6 class="card-title text-truncate" x-text="upload.original_name"></h6>
                        <p class="card-text text-muted small mb-1" x-text="upload.caption || t('uploads_no_caption')"></p>
                        <p class="card-text text-muted small mb-3" x-text="upload.mime_type"></p>
                        <div class="d-flex gap-2">
                            <button class="btn btn-sm btn-outline-info"   @click="copyUploadLink(upload)">{{ t('copy_link') }}</button>
                            <button class="btn btn-sm btn-outline-danger" @click="deleteUpload(upload)">{{ t('delete') }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>

</div>
`,"./templates/voice-bar.html":`<!-- Voice chat bar (experimental): stays visible in every window while connected -->
<div class="voice-notice" x-show="voiceError && voice.state === 'idle' && !settingsWindow.show" x-cloak role="alert">
    <i class="bi bi-mic-mute"></i>
    <span class="voice-notice-text" x-text="voiceError"></span>
    <button type="button" class="voice-notice-action" @click="openSettings('voice')">{{ t('voice_settings') }}</button>
    <button type="button" class="chat-header-btn" title="{{ t('voice_dismiss') }}" aria-label="{{ t('voice_dismiss') }}" @click="dismissVoiceError()">
        <i class="bi bi-x-lg"></i>
    </button>
</div>
<!-- Incoming call from a friend -->
<div class="voice-call-incoming" x-show="incomingCall" x-cloak role="alertdialog" aria-live="assertive">
    <i class="bi bi-telephone-inbound-fill"></i>
    <span class="voice-notice-text">
        <span x-text="incomingCall ? t('voice_call_incoming', { nick: incomingCall.nick }) : ''"></span>
        <small class="voice-call-incoming-hint" x-show="isInVoice() && voice.kind === 'channel'"
               x-text="t('voice_call_leaves_channel', { channel: voice.channel })"></small>
    </span>
    <button type="button" class="voice-call-btn voice-call-btn--accept" @click="acceptCall()">
        <i class="bi bi-telephone-fill"></i> {{ t('voice_call_accept') }}
    </button>
    <button type="button" class="voice-call-btn voice-call-btn--decline" @click="declineCall()">
        <i class="bi bi-telephone-x-fill"></i> {{ t('voice_call_decline') }}
    </button>
</div>
<div class="voice-bar" x-show="voice.state !== 'idle'" x-cloak role="region" aria-label="{{ t('settings_section_voice') }}">
    <div class="voice-bar-status">
        <span class="voice-bar-dot" :class="'is-' + voice.state"></span>
        <button type="button" class="voice-bar-channel"
                @click="switchChannel(voiceCall ? resolveTargetKey(voiceCall.nick) : voice.channel)"
                x-text="voiceCall ? voiceCall.nick : voice.channel"></button>
        <span class="voice-bar-state" x-text="voiceCall?.state === 'ringing' ? voiceCallLabel() : voiceStateLabel()"></span>
        <span class="voice-bar-badge">{{ t('voice_experimental') }}</span>
    </div>

    <div class="voice-bar-participants">
        <template x-for="participant in voice.participants" :key="participant.identity">
            <div class="voice-participant"
                 :class="{ 'is-speaking': participant.isSpeaking, 'is-muted': participant.isMuted }">
                <button type="button"
                        class="voice-participant-chip"
                        :title="participant.isLocal ? participant.name : participant.name + ' – ' + t('voice_volume')"
                        :disabled="participant.isLocal"
                        @click="toggleVoiceVolumeMenu(participant.identity)">
                    <span class="channel-item-avatar voice-participant-avatar nick-bg" :style="nickStyle(participant.name)">
                        <template x-if="avatarUrl(participant.name)">
                            <img class="nick-avatar-img" :src="avatarUrl(participant.name)" alt="" loading="lazy" x-on:error="clearUserAvatar(participant.name)">
                        </template>
                        <span x-show="!avatarUrl(participant.name)" x-text="nickInitial(participant.name)"></span>
                    </span>
                    <span class="voice-participant-name" x-text="participant.name"></span>
                    <span class="voice-participant-you" x-show="participant.isLocal">({{ t('voice_you') }})</span>
                    <i class="bi bi-mic-mute-fill voice-participant-muted" x-show="participant.isMuted"></i>
                </button>
                <div class="voice-volume-popover" x-show="voice.volumeFor === participant.identity" x-cloak
                     @click.outside="voice.volumeFor = null">
                    <label class="voice-volume-label">
                        <span>{{ t('voice_volume') }}</span>
                        <span x-text="voiceParticipantVolume(participant.identity) + ' %'"></span>
                    </label>
                    <input type="range" min="0" max="100" step="5" class="form-range"
                           :value="voiceParticipantVolume(participant.identity)"
                           @input="setVoiceParticipantVolume(participant.identity, $event.target.value)">
                </div>
            </div>
        </template>
    </div>

    <div class="voice-bar-controls">
        <span class="voice-bar-ptt" x-show="voicePttHint()" x-text="voicePttHint()"></span>
        <button type="button" class="voice-bar-btn voice-bar-btn--warning" x-show="voice.audioBlocked" @click="enableVoiceAudio()"
                title="{{ t('voice_audio_blocked') }}">
            <i class="bi bi-volume-mute"></i> <span>{{ t('voice_audio_blocked') }}</span>
        </button>
        <span class="voice-bar-meter" :title="Math.round(voice.level) + ' dB'" aria-hidden="true">
            <span class="voice-bar-meter-fill" :class="{ 'is-open': voice.open }" :style="'width:' + voiceLevelPercent(voice.level) + '%'"></span>
        </span>
        <button type="button" class="voice-bar-btn" :class="{ 'is-off': voice.micMuted }"
                :title="voice.micMuted ? t('voice_unmute') : t('voice_mute')"
                :aria-pressed="voice.micMuted"
                @click="toggleVoiceMute()">
            <i class="bi" :class="voice.micMuted ? 'bi-mic-mute-fill' : 'bi-mic-fill'"></i>
        </button>
        <button type="button" class="voice-bar-btn" :class="{ 'is-off': voice.deafened }"
                :title="voice.deafened ? t('voice_undeafen') : t('voice_deafen')"
                :aria-pressed="voice.deafened"
                @click="toggleVoiceDeafen()">
            <i class="bi" :class="voice.deafened ? 'bi-volume-mute-fill' : 'bi-headphones'"></i>
        </button>
        <button type="button" class="voice-bar-btn" title="{{ t('voice_settings') }}" @click="openSettings('voice')">
            <i class="bi bi-gear"></i>
        </button>
        <button type="button" class="voice-bar-btn voice-bar-btn--leave"
                :title="voiceCall ? t('voice_call_hangup') : t('voice_leave')"
                @click="voiceCall ? hangUpCall() : leaveVoice()">
            <i class="bi bi-telephone-x-fill"></i>
        </button>
    </div>
</div>
`,"./templates/voice-settings.html":`<!-- Settings -> Voice chat: devices, microphone test and voice activation threshold -->
<div class="voice-settings" x-init="refreshVoiceDevices(); loadVoiceFilters()">
    <div class="settings-item-label">{{ t('settings_voice_devices') }}</div>

    <div class="voice-settings-grid">
        <label class="voice-settings-field">
            <span>{{ t('settings_voice_input') }}</span>
            <select class="form-select form-select-sm" @change="setVoiceInput($event.target.value)">
                <option value="" :selected="!voiceSettings.inputDeviceId">{{ t('settings_voice_default_device') }}</option>
                <template x-for="device in voiceDevices.inputs" :key="device.id">
                    <option :value="device.id" :selected="voiceSettings.inputDeviceId === device.id" x-text="device.label"></option>
                </template>
            </select>
        </label>

        <label class="voice-settings-field">
            <span>{{ t('settings_voice_output') }}</span>
            <select class="form-select form-select-sm" :disabled="!voiceDevices.canSelectOutput" @change="setVoiceOutput($event.target.value)">
                <option value="" :selected="!voiceSettings.outputDeviceId">{{ t('settings_voice_default_device') }}</option>
                <template x-for="device in voiceDevices.outputs" :key="device.id">
                    <option :value="device.id" :selected="voiceSettings.outputDeviceId === device.id" x-text="device.label"></option>
                </template>
            </select>
            <small class="settings-item-hint" x-show="!voiceDevices.canSelectOutput">{{ t('settings_voice_output_unsupported') }}</small>
        </label>
    </div>

    <!-- Only when the server offers a filter this chat can run -->
    <label class="voice-settings-field voice-settings-filter" x-show="voiceFilters.length" x-cloak>
        <span>{{ t('settings_voice_filter') }}</span>
        <select class="form-select form-select-sm" @change="setVoiceFilter($event.target.value)">
            <option value="" :selected="!selectedVoiceFilter()">{{ t('settings_voice_filter_browser') }}</option>
            <template x-for="filter in voiceFilters" :key="filter.id">
                <option :value="filter.id" :selected="voiceSettings.noiseFilter === filter.id" x-text="filter.name"></option>
            </template>
        </select>
        <small class="settings-item-hint">{{ t('settings_voice_filter_hint') }}</small>
    </label>

    <div class="voice-settings-threshold" :class="{ 'is-disabled': voiceSettings.mode !== 'vad' }">
        <div class="voice-settings-threshold-head">
            <span>{{ t('settings_voice_threshold') }}</span>
            <button type="button" class="btn btn-sm btn-outline-secondary"
                    x-show="voice.state === 'idle'"
                    @click="voiceTest.running ? stopVoiceTest() : startVoiceTest()"
                    x-text="voiceTest.running ? t('settings_voice_test_stop') : t('settings_voice_test_start')"></button>
        </div>
        <div class="voice-meter" aria-hidden="true">
            <span class="voice-meter-fill"
                  :class="{ 'is-open': voice.state !== 'idle' ? voice.open : voiceTest.open }"
                  :style="'width:' + voiceLevelPercent(voice.state !== 'idle' ? voice.level : voiceTest.level) + '%'"></span>
            <span class="voice-meter-threshold" :style="'left:' + voiceThresholdPercent() + '%'"></span>
        </div>
        <input type="range" class="form-range" min="0" max="100" step="1"
               :value="voiceThresholdPercent()"
               :disabled="voiceSettings.mode !== 'vad'"
               aria-label="{{ t('settings_voice_threshold') }}"
               @input="setVoiceThresholdPercent($event.target.value)">
        <div class="settings-item-hint">{{ t('settings_voice_threshold_hint') }}</div>
    </div>

    <div class="voice-settings-error" x-show="voiceError" x-text="voiceError"></div>
</div>
`})).map(([e,t])=>[e.replace(/^.*\/|\.html$/g,``),t])),pt=/\{\{> ([a-z0-9-]+) \}\}/g,mt=/\{\{ t\('([a-z0-9_]+)'\) \}\}/g,ht=10;function gt(e,t,n=ft){let r=(e,t,i)=>{if(!Object.hasOwn(n,e))throw Error(`Unknown template "${e}"${i.length?` (included from ${i.at(-1)})`:``}`);if(t>ht||i.includes(e))throw Error(`Template include loop: ${[...i,e].join(` > `)}`);return n[e].replace(pt,(n,a)=>r(a,t+1,[...i,e]))};return r(e,0,[]).replace(mt,(e,n)=>w(t(n)))}var _t=!1,vt=!1,O=[],yt=-1,k=!1,bt=!1;function xt(e){wt(e)}function St(){bt=!0}function Ct(){bt=!1,Et()}function wt(e){O.includes(e)||(O.push(e),e._x_schedulerPriority!==void 0&&(k=!0)),Et()}function Tt(e){let t=O.indexOf(e);t!==-1&&t>yt&&O.splice(t,1)}function Et(){if(!vt&&!_t){if(bt)return;_t=!0,queueMicrotask(Dt)}}function Dt(){_t=!1,vt=!0;for(let e=0;e<O.length;e++)k&&Ot(e),O[e](),yt=e;O.length=0,yt=-1,k=!1,vt=!1}function Ot(e){let t=new Map,n=O.slice(e).sort((e,n)=>kt(e,n,t));for(let t=0;t<n.length;t++)O[e+t]=n[t];k=!1}function kt(e,t,n){return At(e)?At(t)?jt(e._x_schedulerPriority.el,n)-jt(t._x_schedulerPriority.el,n)||e._x_schedulerPriority.order-t._x_schedulerPriority.order:-1:+!!At(t)}function At(e){return e._x_schedulerPriority!==void 0}function jt(e,t){if(t.has(e))return t.get(e);let n=0,r=e;for(;e;)n++,e=e._x_teleportBack?e._x_teleportBack:typeof ShadowRoot==`function`&&e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentElement;return t.set(r,n),n}var Mt,A,Nt,Pt,Ft=0,It=!0;function Lt(e){It=!1,e(),It=!0}function Rt(e){Mt=e.reactive,Nt=e.release,A=t=>e.effect(t,{scheduler:e=>{It?xt(e):e()}}),Pt=e.raw}function zt(e){A=e}function Bt(e){let t=()=>{};return[(n,r)=>{let i=r?.priority===`structural`?Ft++:void 0,a=A(n);return i!==void 0&&a!==void 0&&(a._x_schedulerPriority={el:e,order:i}),e._x_effects||(e._x_effects=new Set,e._x_runEffects=()=>{e._x_effects.forEach(e=>e())}),e._x_effects.add(a),t=()=>{a!==void 0&&(e._x_effects.delete(a),Nt(a))},a},()=>{t()}]}function Vt(e,t){let n=!0,r,i,a=A(()=>{let a=e(),o=JSON.stringify(a);if(!n&&(typeof a==`object`||a!==r)){let e=typeof r==`object`?JSON.parse(i):r;queueMicrotask(()=>{t(a,e)})}r=a,i=o,n=!1});return()=>{Tt(a),Nt(a)}}async function Ht(e){St();try{await e(),await Promise.resolve()}finally{Ct()}}var Ut=[],Wt=[],Gt=[];function Kt(e){Gt.push(e)}function qt(e,t){typeof t==`function`?(e._x_cleanups||=[],e._x_cleanups.push(t)):(t=e,Wt.push(t))}function Jt(e){Ut.push(e)}function Yt(e,t,n){e._x_attributeCleanups||={},e._x_attributeCleanups[t]||(e._x_attributeCleanups[t]=[]),e._x_attributeCleanups[t].push(n)}function Xt(e,t){e._x_attributeCleanups&&Object.entries(e._x_attributeCleanups).forEach(([n,r])=>{(t===void 0||t.includes(n))&&(r.forEach(e=>e()),delete e._x_attributeCleanups[n])})}function Zt(e){for(e._x_effects?.forEach(Tt);e._x_cleanups?.length;)e._x_cleanups.pop()()}var Qt=new MutationObserver(ln),j=!1;function $t(){Qt.observe(document,{subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0}),j=!0}function en(){nn(),Qt.disconnect(),j=!1}var tn=[];function nn(){let e=Qt.takeRecords();tn.push(()=>e.length>0&&ln(e));let t=tn.length;queueMicrotask(()=>{if(tn.length===t)for(;tn.length>0;)tn.shift()()})}function rn(){for(;tn.length>0;)tn.shift()();let e=Qt.takeRecords();e.length>0&&ln(e)}function M(e){if(!j)return e();en();try{return e()}finally{$t()}}var an=!1,on=[];function sn(){an=!0}function cn(){an=!1,ln(on),on=[]}function ln(e){if(an){on=on.concat(e);return}let t=[],n=new Set,r=new Map,i=new Map;for(let a=0;a<e.length;a++)if(!e[a].target._x_ignoreMutationObserver&&(e[a].type===`childList`&&(e[a].removedNodes.forEach(e=>{e.nodeType===1&&e._x_marker&&n.add(e)}),e[a].addedNodes.forEach(e=>{e.nodeType===1&&(n.has(e)?n.delete(e):e._x_marker||t.push(e))})),e[a].type===`attributes`)){let t=e[a].target,n=e[a].attributeName,o=e[a].oldValue,s=()=>{r.has(t)||r.set(t,[]),r.get(t).push({name:n,value:t.getAttribute(n)})},c=()=>{i.has(t)||i.set(t,[]),i.get(t).push(n)};t.hasAttribute(n)&&o===null?s():t.hasAttribute(n)?(c(),s()):c()}i.forEach((e,t)=>{Xt(t,e)}),r.forEach((e,t)=>{Ut.forEach(n=>n(t,e))});for(let e of n)t.some(t=>t.contains(e))||Wt.forEach(t=>t(e));for(let e of t)e.isConnected&&Gt.forEach(t=>t(e));t=null,n=null,r=null,i=null}function un(e){return pn(fn(e))}function dn(e,t,n){return e._x_dataStack=[t,...fn(n||e)],()=>{e._x_dataStack=e._x_dataStack.filter(e=>e!==t)}}function fn(e){return e._x_dataStack?e._x_dataStack:typeof ShadowRoot==`function`&&e instanceof ShadowRoot?fn(e.host):e.parentNode?fn(e.parentNode):[]}function pn(e){return new Proxy({objects:e},hn)}function mn(e,t){return e===null||e===Object.prototype?null:Object.prototype.hasOwnProperty.call(e,t)?e:mn(Object.getPrototypeOf(e),t)}var hn={ownKeys({objects:e}){return Array.from(new Set(e.flatMap(e=>Object.keys(e))))},has({objects:e},t){return t!=Symbol.unscopables&&e.some(e=>Object.prototype.hasOwnProperty.call(e,t)||Reflect.has(e,t))},get({objects:e},t,n){return t==`toJSON`?gn:Reflect.get(e.find(e=>Reflect.has(e,t))||{},t,n)},set({objects:e},t,n,r){let i;for(let n of e)if(i=mn(n,t),i)break;i||=e[e.length-1];let a=Object.getOwnPropertyDescriptor(i,t);return a?.set&&a?.get?a.set.call(r,n)||!0:Reflect.set(i,t,n)}};function gn(){return Reflect.ownKeys(this).reduce((e,t)=>(e[t]=Reflect.get(this,t),e),{})}function _n(e,t=()=>{}){let n=e=>typeof e==`object`&&!Array.isArray(e)&&e!==null,r=(i,a=``)=>{Object.entries(Object.getOwnPropertyDescriptors(i)).forEach(([o,{value:s,enumerable:c}])=>{if(c===!1||s===void 0||typeof s==`object`&&s&&s.__v_skip)return;let l=a===``?o:`${a}.${o}`;typeof s==`object`&&s&&s._x_interceptor?i[o]=s.initialize(e,l,o,t):n(s)&&s!==i&&!(s instanceof Element)&&r(s,l)})};return r(e)}function vn(e,t=()=>{}){let n={initialValue:void 0,_x_interceptor:!0,initialize(t,n,r,i){return e(this.initialValue,()=>yn(t,n),e=>bn(t,n,e),n,r,i)}};return t(n),e=>{if(typeof e==`object`&&e&&e._x_interceptor){let t=n.initialize.bind(n);n.initialize=(r,i,a,o)=>{let s=e.initialize(r,i,a,o);return n.initialValue=s,t(r,i,a,o)}}else n.initialValue=e;return n}}function yn(e,t){return t.split(`.`).reduce((e,t)=>e[t],e)}function bn(e,t,n){if(typeof t==`string`&&(t=t.split(`.`)),t.length===1)e[t[0]]=n;else if(t.length===0)throw error;else if(e[t[0]])return bn(e[t[0]],t.slice(1),n);else return e[t[0]]={},bn(e[t[0]],t.slice(1),n)}var xn={};function Sn(e,t){xn[e]=t}function Cn(e,t){let n=wn(t);return Object.entries(xn).forEach(([r,i])=>{Object.defineProperty(e,`$${r}`,{get(){return i(t,n)},enumerable:!1})}),e}function wn(e){let[t,n]=nr(e),r={interceptor:vn,...t};return qt(e,n),r}function Tn(e,t,n,...r){try{return n(...r)}catch(n){En(n,e,t)}}function En(...e){return Dn(...e)}var Dn=kn;function On(e){Dn=e}function kn(e,t,n=void 0){e=Object.assign(e??{message:`No error message given.`},{el:t,expression:n}),console.warn(`Alpine Expression Error: ${e.message}

${n?`Expression: "`+n+`"

`:``}`,t),setTimeout(()=>{throw e},0)}var An=!0;function jn(e){let t=An;An=!1;let n=e();return An=t,n}function Mn(e,t,n={}){let r;return N(e,t)(e=>r=e,n),r}function N(...e){return Nn(...e)}var Nn=()=>{};function Pn(e){Nn=e}var Fn;function In(e){Fn=e}function Ln(e,t){let n={};Cn(n,e);let r=[n,...fn(e)],i=typeof t==`function`?Rn(r,t):Vn(r,t,e);return Tn.bind(null,e,t,i)}function Rn(e,t){return(n=()=>{},{scope:r={},params:i=[],context:a}={})=>{An?Hn(n,t.apply(pn([r,...e]),i)):Hn(n,t,pn([r,...e]),i)}}var zn={};function Bn(e,t){if(zn[e])return zn[e];let n=Object.getPrototypeOf(async function(){}).constructor,r=/^[\n\s]*if.*\(.*\)/.test(e.trim())||/^(let|const)\s/.test(e.trim())?`(async()=>{ ${e} })()`:e,i=(()=>{try{let t=new n([`__self`,`scope`],`with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);return Object.defineProperty(t,"name",{value:`[Alpine] ${e}`}),t}catch(n){return En(n,t,e),Promise.resolve()}})();return zn[e]=i,i}function Vn(e,t,n){let r=Bn(t,n);return(i=()=>{},{scope:a={},params:o=[],context:s}={})=>{r.result=void 0,r.finished=!1;let c=pn([a,...e]);if(typeof r==`function`){let e=r.call(s,r,c).catch(e=>En(e,n,t));r.finished?(Hn(i,r.result,c,o,n),r.result=void 0):e.then(e=>{Hn(i,e,c,o,n)}).catch(e=>En(e,n,t)).finally(()=>r.result=void 0)}}}function Hn(e,t,n,r,i){if(An&&typeof t==`function`){let a=t.apply(n,r);a instanceof Promise?a.then(t=>Hn(e,t,n,r)).catch(e=>En(e,i,t)):e(a)}else typeof t==`object`&&t instanceof Promise?t.then(t=>e(t)):e(t)}function Un(...e){return Fn(...e)}function Wn(e,t,n={}){let r={};Cn(r,e);let i=[r,...fn(e)],a=pn([n.scope??{},...i]),o=n.params??[];if(t.includes(`await`)){let e=Object.getPrototypeOf(async function(){}).constructor;return new e([`scope`],`with (scope) { let __result = ${/^[\n\s]*if.*\(.*\)/.test(t.trim())||/^(let|const)\s/.test(t.trim())?`(async()=>{ ${t} })()`:t}; return __result }`).call(n.context,a)}{let e=/^[\n\s]*if.*\(.*\)/.test(t.trim())||/^(let|const)\s/.test(t.trim())?`(()=>{ ${t} })()`:t,r=Function([`scope`],`with (scope) { let __result = ${e}; return __result }`).call(n.context,a);return typeof r==`function`&&An?r.apply(a,o):r}}var Gn=`x-`;function Kn(e=``){return Gn+e}function qn(e){Gn=e}var Jn={};function P(e,t){return Jn[e]=t,{before(t){if(!Jn[t]){console.warn(String.raw`Cannot find directive \`${t}\`. \`${e}\` will use the default order of execution`);return}let n=pr.indexOf(t);pr.splice(n>=0?n:pr.indexOf(`DEFAULT`),0,e)}}}function Yn(e){return Object.keys(Jn).includes(e)}function Xn(e,t,n){if(t=Array.from(t),e._x_virtualDirectives){let n=Object.entries(e._x_virtualDirectives).map(([e,t])=>({name:e,value:t})),r=Zn(n);n=n.map(e=>r.find(t=>t.name===e.name)?{name:`x-bind:${e.name}`,value:`"${e.value}"`}:e),t=t.concat(n)}let r={};return t.map(or((e,t)=>r[e]=t)).filter(lr).map(dr(r,n)).sort(mr).map(t=>rr(e,t))}function Zn(e){return Array.from(e).map(or()).filter(e=>!lr(e))}var Qn=!1,$n=new Map,er=Symbol();function tr(e){Qn=!0;let t=Symbol();er=t,$n.set(t,[]);let n=()=>{for(;$n.get(t).length;)$n.get(t).shift()();$n.delete(t)};e(n),Qn=!1,n()}function nr(e){let t=[],n=e=>t.push(e),[r,i]=Bt(e);return t.push(i),[{Alpine:ta,effect:r,cleanup:n,evaluateLater:N.bind(N,e),evaluate:Mn.bind(Mn,e)},()=>t.forEach(e=>e())]}function rr(e,t){let n=Jn[t.type]||(()=>{}),[r,i]=nr(e);Yt(e,t.original,i);let a=()=>{e._x_ignore||e._x_ignoreSelf||(n.inline&&n.inline(e,t,r),n=n.bind(n,e,t,r),Qn?$n.get(er).push(n):n())};return a.runCleanups=i,a}var ir=(e,t)=>({name:n,value:r})=>(n.startsWith(e)&&(n=n.replace(e,t)),{name:n,value:r}),ar=e=>e;function or(e=()=>{}){return({name:t,value:n})=>{let{name:r,value:i}=sr.reduce((e,t)=>t(e),{name:t,value:n});return r!==t&&e(r,t),{name:r,value:i}}}var sr=[];function cr(e){sr.push(e)}function lr({name:e}){return ur().test(e)}var ur=()=>RegExp(`^${Gn}([^:^.]+)\\b`);function dr(e,t){return({name:n,value:r})=>{n===r&&(r=``);let i=n.match(ur()),a=n.match(/:([a-zA-Z0-9\-_:]+)/),o=n.match(/\.[^.\]]+(?=[^\]]*$)/g)||[],s=t||e[n]||n;return{type:i?i[1]:null,value:a?a[1]:null,modifiers:o.map(e=>e.replace(`.`,``)),expression:r,original:s}}}var fr=`DEFAULT`,pr=[`ignore`,`ref`,`id`,`data`,`anchor`,`bind`,`init`,`for`,`model`,`modelable`,`transition`,`show`,`if`,fr,`teleport`];function mr(e,t){let n=pr.indexOf(e.type)===-1?fr:e.type,r=pr.indexOf(t.type)===-1?fr:t.type;return pr.indexOf(n)-pr.indexOf(r)}function hr(e,t){if(typeof ShadowRoot==`function`&&e instanceof ShadowRoot){Array.from(e.children).forEach(e=>hr(e,t));return}let n=!1;if(t(e,()=>n=!0),n)return;let r=e.firstElementChild;for(;r;)hr(r,t,!1),r=r.nextElementSibling}var gr=!1;function _r(e,t=()=>{}){return(...n)=>gr?t(...n):e(...n)}function vr(e){return(...t)=>gr&&e(...t)}var yr=[];function br(e){yr.push(e)}function xr(e,t){yr.forEach(n=>n(e,t)),gr=!0,Tr(()=>{Jr(t,(e,t)=>{t(e,()=>{})})}),gr=!1}var Sr=!1;function Cr(e,t){t._x_dataStack||=e._x_dataStack,gr=!0,Sr=!0,Tr(()=>{wr(t)}),gr=!1,Sr=!1}function wr(e){let t=!1;Jr(e,(e,n)=>{hr(e,(e,r)=>{if(t&&Wr(e))return r();t=!0,n(e,r)})})}function Tr(e){let t=A;zt((e,n)=>{let r=t(e);return Nt(r),()=>{}}),e(),zt(t)}var Er=0;function Dr(e,t){let n=e._x_deferInit;n||(n=e._x_deferInit={pending:0,ownsIgnore:!e._x_ignore,queuedAttributes:new Map},n.ownsIgnore&&(e._x_ignore=!0),Er++),n.pending++,Promise.resolve(t).catch(t=>{try{En(t,e)}catch(e){setTimeout(()=>{throw e},0)}}).then(()=>Or(e,n))}function Or(e,t){t.pending--,t.pending>0||(rn(),t.pending>0||e._x_deferInit===t&&(delete e._x_deferInit,t.ownsIgnore&&delete e._x_ignore,Er--,e.isConnected&&(jr(t),Jr(e))))}function kr(e,t){if(Er===0)return!1;let n=Ur(e,e=>e._x_deferInit);return n?(Ar(n._x_deferInit,e,t.map(({name:e})=>e)),!0):!1}function Ar(e,t,n){let r=e.queuedAttributes.get(t);r&&r.marker===t._x_marker||(r={marker:t._x_marker,names:new Set},e.queuedAttributes.set(t,r)),n.forEach(e=>r.names.add(e))}function jr(e){e.queuedAttributes.forEach((e,t)=>{if(!t.isConnected||!t._x_marker||t._x_marker!==e.marker)return;let n=Ur(t,e=>e._x_deferInit);if(n){Ar(n._x_deferInit,t,Array.from(e.names));return}let r=Array.from(e.names).filter(e=>t.hasAttribute(e)).map(e=>({name:e,value:t.getAttribute(e)}));r.length!==0&&Xn(t,r).forEach(e=>e())})}br((e,t)=>{Er!==0&&e&&e.nodeType===1&&t&&t.nodeType===1&&Ur(e,e=>e._x_deferInit)&&(t._x_ignore=!0)});function Mr(e,t,n={},r={}){return e.dispatchEvent(new CustomEvent(t,{detail:n,bubbles:!0,composed:!0,cancelable:!0,...r}))}function Nr(e,...t){console.warn(`Alpine Warning: ${e}`,...t)}var Pr=!1;function Fr(){Pr&&Nr(`Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.`),Pr=!0,document.body||Nr("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),Mr(document,`alpine:init`),Mr(document,`alpine:initializing`),$t(),Kt(e=>Jr(e,hr)),qt(e=>Yr(e)),Jt((e,t)=>{kr(e,t)||Xn(e,t).forEach(e=>e())}),Array.from(document.querySelectorAll(zr().join(`,`))).filter(e=>!Hr(e.parentElement,!0)).forEach(e=>{Jr(e)}),Mr(document,`alpine:initialized`),setTimeout(()=>{Xr()})}var Ir=[],Lr=[];function Rr(){return Ir.map(e=>e())}function zr(){return Ir.concat(Lr).map(e=>e())}function Br(e){Ir.push(e)}function Vr(e){Lr.push(e)}function Hr(e,t=!1){return Ur(e,e=>{if((t?zr():Rr()).some(t=>e.matches(t)))return!0})}function Ur(e,t){if(e){if(t(e))return e;if(e._x_teleportBack)return Ur(e._x_teleportBack,t);if(e.parentNode instanceof ShadowRoot)return Ur(e.parentNode.host,t);if(e.parentElement)return Ur(e.parentElement,t)}}function Wr(e){return Rr().some(t=>e.matches(t))}var Gr=[];function Kr(e){Gr.push(e)}var qr=1;function Jr(e,t=hr,n=()=>{}){Ur(e,e=>e._x_ignore)||tr(()=>{t(e,(e,t)=>{e._x_marker||(n(e,t),Gr.forEach(n=>n(e,t)),Xn(e,e.attributes).forEach(e=>e()),e._x_ignore||(e._x_marker=qr++),e._x_ignore&&t())})})}function Yr(e,t=hr){t(e,e=>{Zt(e),Xt(e),delete e._x_marker})}function Xr(){[[`ui`,`dialog`,[`[x-dialog], [x-popover]`]],[`anchor`,`anchor`,[`[x-anchor]`]],[`sort`,`sort`,[`[x-sort]`]]].forEach(([e,t,n])=>{Yn(t)||n.some(t=>{if(document.querySelector(t))return Nr(`found "${t}", but missing ${e} plugin`),!0})})}var Zr=[],Qr=!1;function $r(e=()=>{}){return queueMicrotask(()=>{Qr||setTimeout(()=>{ei()})}),new Promise(t=>{Zr.push(()=>{e(),t()})})}function ei(){for(Qr=!1;Zr.length;)Zr.shift()()}function ti(){Qr=!0}function ni(e,t){return Array.isArray(t)?ii(e,t.join(` `)):typeof t==`object`&&t?ai(e,t):typeof t==`function`?ni(e,t()):ii(e,t)}function ri(e){return e.split(/\s/).filter(Boolean)}function ii(e,t){return t=t===!0?t=``:t||``,(t=>(e.classList.add(...t),()=>{e.classList.remove(...t)}))((t=>ri(t).filter(t=>!e.classList.contains(t)).filter(Boolean))(t))}function ai(e,t){let n=Object.entries(t).flatMap(([e,t])=>t?ri(e):!1).filter(Boolean),r=Object.entries(t).flatMap(([e,t])=>!t&&ri(e)).filter(Boolean),i=[],a=[];return r.forEach(t=>{e.classList.contains(t)&&(e.classList.remove(t),a.push(t))}),n.forEach(t=>{e.classList.contains(t)||(e.classList.add(t),i.push(t))}),()=>{a.forEach(t=>e.classList.add(t)),i.forEach(t=>e.classList.remove(t))}}function oi(e,t){return typeof t==`object`&&t?si(e,t):ci(e,t)}function si(e,t){let n={};return Object.entries(t).forEach(([t,r])=>{n[t]=e.style[t],t.startsWith(`--`)||(t=li(t)),e.style.setProperty(t,r)}),setTimeout(()=>{e.style.length===0&&e.removeAttribute(`style`)}),()=>{oi(e,n)}}function ci(e,t){let n=e.getAttribute(`style`,t);return e.setAttribute(`style`,t),()=>{e.setAttribute(`style`,n||``)}}function li(e){return e.replace(/([a-z])([A-Z])/g,`$1-$2`).toLowerCase()}function ui(e,t=()=>{}){let n=!1;return function(){n?t.apply(this,arguments):(n=!0,e.apply(this,arguments))}}P(`transition`,(e,{value:t,modifiers:n,expression:r},{evaluate:i})=>{typeof r==`function`&&(r=i(r)),r!==!1&&(!r||typeof r==`boolean`?fi(e,n,t):di(e,r,t))});function di(e,t,n){pi(e,ni,``),{enter:t=>{e._x_transition.enter.during=t},"enter-start":t=>{e._x_transition.enter.start=t},"enter-end":t=>{e._x_transition.enter.end=t},leave:t=>{e._x_transition.leave.during=t},"leave-start":t=>{e._x_transition.leave.start=t},"leave-end":t=>{e._x_transition.leave.end=t}}[n](t)}function fi(e,t,n){pi(e,oi);let r=!t.includes(`in`)&&!t.includes(`out`)&&!n,i=r||t.includes(`in`)||[`enter`].includes(n),a=r||t.includes(`out`)||[`leave`].includes(n);t.includes(`in`)&&!r&&(t=t.filter((e,n)=>n<t.indexOf(`out`))),t.includes(`out`)&&!r&&(t=t.filter((e,n)=>n>t.indexOf(`out`)));let o=!t.includes(`opacity`)&&!t.includes(`scale`),s=o||t.includes(`opacity`),c=o||t.includes(`scale`),l=+!s,u=c?_i(t,`scale`,95)/100:1,d=_i(t,`delay`,0)/1e3,f=_i(t,`origin`,`center`),p=`opacity, transform`,m=_i(t,`duration`,150)/1e3,h=_i(t,`duration`,75)/1e3,g=`cubic-bezier(0.4, 0.0, 0.2, 1)`;i&&(e._x_transition.enter.during={transformOrigin:f,transitionDelay:`${d}s`,transitionProperty:p,transitionDuration:`${m}s`,transitionTimingFunction:g},e._x_transition.enter.start={opacity:l,transform:`scale(${u})`},e._x_transition.enter.end={opacity:1,transform:`scale(1)`}),a&&(e._x_transition.leave.during={transformOrigin:f,transitionDelay:`${d}s`,transitionProperty:p,transitionDuration:`${h}s`,transitionTimingFunction:g},e._x_transition.leave.start={opacity:1,transform:`scale(1)`},e._x_transition.leave.end={opacity:l,transform:`scale(${u})`})}function pi(e,t,n={}){e._x_transition||={enter:{during:n,start:n,end:n},leave:{during:n,start:n,end:n},in(n=()=>{},r=()=>{}){hi(e,t,{during:this.enter.during,start:this.enter.start,end:this.enter.end},n,r)},out(n=()=>{},r=()=>{}){hi(e,t,{during:this.leave.during,start:this.leave.start,end:this.leave.end},n,r)}}}window.Element.prototype._x_toggleAndCascadeWithTransitions=function(e,t,n,r){let i=document.visibilityState===`visible`?requestAnimationFrame:setTimeout,a=()=>i(n);t?e._x_transition&&(e._x_transition.enter||e._x_transition.leave)?e._x_transition.enter&&(Object.entries(e._x_transition.enter.during).length||Object.entries(e._x_transition.enter.start).length||Object.entries(e._x_transition.enter.end).length)?e._x_transition.in(n):a():e._x_transition?e._x_transition.in(n):a():(e._x_hidePromise=e._x_transition?new Promise((t,n)=>{e._x_transition.out(()=>{},()=>t(r)),e._x_transitioning&&e._x_transitioning.beforeCancel(()=>n({isFromCancelledTransition:!0}))}):Promise.resolve(r),queueMicrotask(()=>{let t=mi(e);t?(t._x_hideChildren||=[],t._x_hideChildren.push(e)):i(()=>{let t=e=>{let n=Promise.all([e._x_hidePromise,...(e._x_hideChildren||[]).map(t)]).then(([e])=>e?.());return delete e._x_hidePromise,delete e._x_hideChildren,n};t(e).catch(e=>{if(!e.isFromCancelledTransition)throw e})})}))};function mi(e){let t=e.parentNode;if(t)return t._x_hidePromise?t:mi(t)}function hi(e,t,{during:n,start:r,end:i}={},a=()=>{},o=()=>{}){if(e._x_transitioning&&e._x_transitioning.cancel(),Object.keys(n).length===0&&Object.keys(r).length===0&&Object.keys(i).length===0){a(),o();return}let s,c,l;gi(e,{start(){s=t(e,r)},during(){c=t(e,n)},before:a,end(){s(),l=t(e,i)},after:o,cleanup(){c(),l()}})}function gi(e,t){let n,r,i,a=ui(()=>{M(()=>{n=!0,r||t.before(),i||(t.end(),ei()),t.after(),e.isConnected&&t.cleanup(),delete e._x_transitioning})});e._x_transitioning={beforeCancels:[],beforeCancel(e){this.beforeCancels.push(e)},cancel:ui(function(){for(;this.beforeCancels.length;)this.beforeCancels.shift()();a()}),finish:a},M(()=>{t.start(),t.during()}),ti(),requestAnimationFrame(()=>{if(n)return;let a=Number(getComputedStyle(e).transitionDuration.replace(/,.*/,``).replace(`s`,``))*1e3,o=Number(getComputedStyle(e).transitionDelay.replace(/,.*/,``).replace(`s`,``))*1e3;a===0&&(a=Number(getComputedStyle(e).animationDuration.replace(`s`,``))*1e3),M(()=>{t.before()}),r=!0,requestAnimationFrame(()=>{n||(M(()=>{t.end()}),ei(),setTimeout(e._x_transitioning.finish,a+o),i=!0)})})}function _i(e,t,n){if(e.indexOf(t)===-1)return n;let r=e[e.indexOf(t)+1];if(!r||t===`scale`&&isNaN(r))return n;if(t===`duration`||t===`delay`){let e=r.match(/([0-9]+)ms/);if(e)return e[1]}return t===`origin`&&[`top`,`right`,`left`,`center`,`bottom`].includes(e[e.indexOf(t)+2])?[r,e[e.indexOf(t)+2]].join(` `):r}function vi(e,t,n,r=[]){switch(e._x_bindings||=Mt({}),e._x_bindings[t]=n,t=r.includes(`camel`)?Di(t):t,t){case`value`:yi(e,n);break;case`style`:xi(e,n);break;case`class`:bi(e,n);break;case`selected`:case`checked`:Si(e,t,n);break;default:Ci(e,t,n)}}function yi(e,t){if(Ri(e))e.attributes.value===void 0&&(e.value=t);else if(Li(e))Number.isInteger(t)?e.value=t:!Array.isArray(t)&&typeof t!=`boolean`&&![null,void 0].includes(t)?e.value=String(t):e.checked=Array.isArray(t)?t.some(t=>Oi(t,e.value)):!!t;else if(e.tagName===`SELECT`)Ei(e,t);else if(e.tagName===`OPTION`)Ci(e,`value`,t);else{if(e.value===t&&(typeof t!=`object`||!t))return;e.value=t===void 0?``:t}}function bi(e,t){e._x_undoAddedClasses&&e._x_undoAddedClasses(),e._x_undoAddedClasses=ni(e,t)}function xi(e,t){e._x_undoAddedStyles&&e._x_undoAddedStyles(),e._x_undoAddedStyles=oi(e,t)}function Si(e,t,n){Ci(e,t,n),Ti(e,t,n)}function Ci(e,t,n){[null,void 0,!1].includes(n)&&Mi(t)?e.removeAttribute(t):(ji(t)&&(n=t),Ni(n)&&(n=JSON.stringify(n)),wi(e,t,n))}function wi(e,t,n){e.getAttribute(t)!=n&&e.setAttribute(t,n)}function Ti(e,t,n){e[t]!==n&&(e[t]=n)}function Ei(e,t){let n=[].concat(t).map(e=>e+``);Array.from(e.options).forEach(e=>{e.selected=n.includes(e.value)})}function Di(e){return e.toLowerCase().replace(/-(\w)/g,(e,t)=>t.toUpperCase())}function Oi(e,t){return e==t}function ki(e){return[1,`1`,`true`,`on`,`yes`,!0].includes(e)?!0:[0,`0`,`false`,`off`,`no`,!1].includes(e)?!1:e?!!e:null}var Ai=new Set(`allowfullscreen.async.autofocus.autoplay.checked.controls.default.defer.disabled.formnovalidate.inert.ismap.itemscope.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.selected.shadowrootclonable.shadowrootdelegatesfocus.shadowrootserializable`.split(`.`));function ji(e){return Ai.has(e)}function Mi(e){return![`aria-pressed`,`aria-checked`,`aria-expanded`,`aria-selected`].includes(e)}function Ni(e){return typeof e==`object`&&!!e}function Pi(e,t,n){return e._x_bindings&&e._x_bindings[t]!==void 0?e._x_bindings[t]:Ii(e,t,n)}function Fi(e,t,n,r=!0){if(e._x_bindings&&e._x_bindings[t]!==void 0)return e._x_bindings[t];if(e._x_inlineBindings&&e._x_inlineBindings[t]!==void 0){let n=e._x_inlineBindings[t];return n.extract=r,jn(()=>Mn(e,n.expression))}return Ii(e,t,n)}function Ii(e,t,n){let r=e.getAttribute(t);return r===null?typeof n==`function`?n():n:r===``?!0:ji(t)?!![t,`true`].includes(r):r}function Li(e){return e.type===`checkbox`||e.localName===`ui-checkbox`||e.localName===`ui-switch`}function Ri(e){return e.type===`radio`||e.localName===`ui-radio`}function zi(e,t){let n;return function(){let r=this,i=arguments;clearTimeout(n),n=setTimeout(function(){n=null,e.apply(r,i)},t)}}function Bi(e,t){let n;return function(){let r=this,i=arguments;n||(e.apply(r,i),n=!0,setTimeout(()=>n=!1,t))}}function Vi({get:e,set:t},{get:n,set:r}){let i=!0,a,o=A(()=>{let o=e(),s=n();if(i)r(Hi(o)),i=!1;else{let e=JSON.stringify(o),n=JSON.stringify(s);e===a?e!==n&&t(Hi(s)):r(Hi(o))}a=JSON.stringify(e()),JSON.stringify(n())});return()=>{Tt(o),Nt(o)}}function Hi(e){return typeof e==`object`?JSON.parse(JSON.stringify(e)):e}function Ui(e){(Array.isArray(e)?e:[e]).forEach(e=>e(ta))}var Wi={},Gi=!1;function Ki(e,t){if(Gi||=(Wi=Mt(Wi),!0),t===void 0)return Wi[e];Wi[e]=t,typeof t==`object`&&t&&t._x_interceptor?Wi[e]=t.initialize(Wi,e,e,()=>{}):_n(Wi[e]),typeof t==`object`&&t&&t.hasOwnProperty(`init`)&&typeof t.init==`function`&&Wi[e].init()}function qi(){return Wi}var Ji={};function Yi(e,t){let n=typeof t==`function`?t:()=>t;return e instanceof Element?Zi(e,n()):(Ji[e]=n,()=>{})}function Xi(e){return Object.entries(Ji).forEach(([t,n])=>{Object.defineProperty(e,t,{get(){return(...e)=>n(...e)}})}),e}function Zi(e,t,n){let r=[];for(;r.length;)r.pop()();let i=Object.entries(t).map(([e,t])=>({name:e,value:t})),a=Zn(i);return i=i.map(e=>a.find(t=>t.name===e.name)?{name:`x-bind:${e.name}`,value:`"${e.value}"`}:e),Xn(e,i,n).map(e=>{r.push(e.runCleanups),e()}),()=>{for(;r.length;)r.pop()()}}var Qi={};function $i(e,t){Qi[e]=t}function ea(e,t){return Object.entries(Qi).forEach(([n,r])=>{Object.defineProperty(e,n,{get(){return(...e)=>r.bind(t)(...e)},enumerable:!1})}),e}var ta={get reactive(){return Mt},get release(){return Nt},get effect(){return A},get raw(){return Pt},get transaction(){return Ht},version:`3.17.5`,flushAndStopDeferringMutations:cn,dontAutoEvaluateFunctions:jn,disableEffectScheduling:Lt,startObservingMutations:$t,stopObservingMutations:en,setReactivityEngine:Rt,onAttributeRemoved:Yt,onAttributesAdded:Jt,closestDataStack:fn,skipDuringClone:_r,onlyDuringClone:vr,addRootSelector:Br,addInitSelector:Vr,setErrorHandler:On,interceptClone:br,addScopeToNode:dn,deferMutations:sn,mapAttributes:cr,evaluateLater:N,interceptInit:Kr,initInterceptors:_n,injectMagics:Cn,setEvaluator:Pn,setRawEvaluator:In,mergeProxies:pn,extractProp:Fi,findClosest:Ur,onElRemoved:qt,closestRoot:Hr,destroyTree:Yr,interceptor:vn,transition:hi,setStyles:oi,mutateDom:M,deferInit:Dr,directive:P,entangle:Vi,throttle:Bi,debounce:zi,evaluate:Mn,evaluateRaw:Un,initTree:Jr,nextTick:$r,prefixed:Kn,prefix:qn,plugin:Ui,magic:Sn,store:Ki,start:Fr,clone:Cr,cloneNode:xr,bound:Pi,$data:un,watch:Vt,walk:hr,data:$i,bind:Yi};function na(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}Object.freeze({}),Object.freeze([]);var ra=Object.assign,ia=Object.prototype.hasOwnProperty,aa=(e,t)=>ia.call(e,t),oa=Array.isArray,sa=e=>fa(e)===`[object Map]`,ca=e=>typeof e==`string`,la=e=>typeof e==`symbol`,ua=e=>typeof e==`object`&&!!e,da=Object.prototype.toString,fa=e=>da.call(e),pa=e=>fa(e).slice(8,-1),ma=e=>ca(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,ha=(e=>{let t=Object.create(null);return n=>t[n]||(t[n]=e(n))})(e=>e.charAt(0).toUpperCase()+e.slice(1)),ga=(e,t)=>!Object.is(e,t);function _a(e,...t){console.warn(`[Vue warn] ${e}`,...t)}var F,va=new WeakSet,ya=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,va.has(this)&&(va.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ca(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ra(this),Ea(this);let e=F,t=Pa;F=this,Pa=!0;try{return this.fn()}finally{F!==this&&_a(`Active effect was not restored correctly - this is likely a Vue internal bug.`),Da(this),F=e,Pa=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Aa(e);this.deps=this.depsTail=void 0,Ra(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?va.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Oa(this)&&this.run()}get dirty(){return Oa(this)}},ba=0,xa,Sa;function Ca(e,t=!1){e.flags|=8,t?(e.next=Sa,Sa=e):(e.next=xa,xa=e)}function wa(){ba++}function Ta(){if(--ba>0)return;if(Sa){let e=Sa;for(Sa=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;xa;){let t=xa;for(xa=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function Ea(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Da(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Aa(r),ja(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Oa(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(ka(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function ka(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===za)||(e.globalVersion=za,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Oa(e))))return;e.flags|=2;let t=e.dep,n=F,r=Pa;F=e,Pa=!0;try{Ea(e);let n=e.fn(e._value);(t.version===0||ga(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{F=n,Pa=r,Da(e),e.flags&=-3}}function Aa(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subsHead===e&&(n.subsHead=i),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Aa(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function ja(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}function Ma(e,t){e.effect instanceof ya&&(e=e.effect.fn);let n=new ya(e);t&&ra(n,t);try{n.run()}catch(e){throw n.stop(),e}let r=n.run.bind(n);return r.effect=n,r}function Na(e){e.effect.stop()}var Pa=!0,Fa=[];function Ia(){Fa.push(Pa),Pa=!1}function La(){let e=Fa.pop();Pa=e===void 0||e}function Ra(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=F;F=void 0;try{t()}finally{F=e}}}var za=0,Ba=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},Va=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0,this.subsHead=void 0}track(e){if(!F||!Pa||F===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==F)t=this.activeLink=new Ba(F,this),F.deps?(t.prevDep=F.depsTail,F.depsTail.nextDep=t,F.depsTail=t):F.deps=F.depsTail=t,Ha(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=F.depsTail,t.nextDep=void 0,F.depsTail.nextDep=t,F.depsTail=t,F.deps===t&&(F.deps=e)}return F.onTrack&&F.onTrack(ra({effect:F},e)),t}trigger(e){this.version++,za++,this.notify(e)}notify(e){wa();try{for(let t=this.subsHead;t;t=t.nextSub)t.sub.onTrigger&&!(t.sub.flags&8)&&t.sub.onTrigger(ra({effect:t.sub},e));for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Ta()}}};function Ha(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Ha(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subsHead===void 0&&(e.dep.subsHead=e),e.dep.subs=e}}var Ua=new WeakMap,Wa=Symbol(`Object iterate`),Ga=Symbol(`Map keys iterate`),Ka=Symbol(`Array iterate`);function I(e,t,n){if(Pa&&F){let r=Ua.get(e);r||Ua.set(e,r=new Map);let i=r.get(n);i||(r.set(n,i=new Va),i.map=r,i.key=n),i.track({target:e,type:t,key:n})}}function qa(e,t,n,r,i,a){let o=Ua.get(e);if(!o){za++;return}let s=o=>{o&&o.trigger({target:e,type:t,key:n,newValue:r,oldValue:i,oldTarget:a})};if(wa(),t===`clear`)o.forEach(s);else{let i=oa(e),a=i&&ma(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Ka||!la(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Ka)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(Wa)),sa(e)&&s(o.get(Ga)));break;case`delete`:i||(s(o.get(Wa)),sa(e)&&s(o.get(Ga)));break;case`set`:sa(e)&&s(o.get(Wa))}}Ta()}function Ja(e){let t=L(e);return t===e?t:(I(t,`iterate`,Ka),Mo(e)?t:t.map(Po))}function Ya(e){return I(e=L(e),`iterate`,Ka),e}function Xa(e,t){return jo(e)?Ao(e)?Fo(Po(t)):Fo(t):Po(t)}var Za={__proto__:null,[Symbol.iterator](){return Qa(this,Symbol.iterator,e=>Xa(this,e))},concat(...e){return Ja(this).concat(...e.map(e=>oa(e)?Ja(e):e))},entries(){return Qa(this,`entries`,e=>(e[1]=Xa(this,e[1]),e))},every(e,t){return eo(this,`every`,e,t,void 0,arguments)},filter(e,t){return eo(this,`filter`,e,t,e=>e.map(e=>Xa(this,e)),arguments)},find(e,t){return eo(this,`find`,e,t,e=>Xa(this,e),arguments)},findIndex(e,t){return eo(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return eo(this,`findLast`,e,t,e=>Xa(this,e),arguments)},findLastIndex(e,t){return eo(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return eo(this,`forEach`,e,t,void 0,arguments)},includes(...e){return no(this,`includes`,e)},indexOf(...e){return no(this,`indexOf`,e)},join(e){return Ja(this).join(e)},lastIndexOf(...e){return no(this,`lastIndexOf`,e)},map(e,t){return eo(this,`map`,e,t,void 0,arguments)},pop(){return ro(this,`pop`)},push(...e){return ro(this,`push`,e)},reduce(e,...t){return to(this,`reduce`,e,t)},reduceRight(e,...t){return to(this,`reduceRight`,e,t)},shift(){return ro(this,`shift`)},some(e,t){return eo(this,`some`,e,t,void 0,arguments)},splice(...e){return ro(this,`splice`,e)},toReversed(){return Ja(this).toReversed()},toSorted(e){return Ja(this).toSorted(e)},toSpliced(...e){return Ja(this).toSpliced(...e)},unshift(...e){return ro(this,`unshift`,e)},values(){return Qa(this,`values`,e=>Xa(this,e))}};function Qa(e,t,n){let r=Ya(e),i=r[t]();return r!==e&&!Mo(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var $a=Array.prototype;function eo(e,t,n,r,i,a){let o=Ya(e),s=o!==e&&!Mo(e),c=o[t];if(c!==$a[t]){let t=c.apply(e,a);return s?Po(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,Xa(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function to(e,t,n,r){let i=Ya(e),a=i!==e&&!Mo(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=Xa(e,t)),n.call(this,t,Xa(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?Xa(e,c):c}function no(e,t,n){let r=L(e);I(r,`iterate`,Ka);let i=r[t](...n);return(i===-1||i===!1)&&No(n[0])?(n[0]=L(n[0]),r[t](...n)):i}function ro(e,t,n=[]){Ia(),wa();let r=L(e)[t].apply(e,n);return Ta(),La(),r}var io=na(`__proto__,__v_isRef,__isVue`),ao=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(la));function oo(e){la(e)||(e=String(e));let t=L(this);return I(t,`has`,e),t.hasOwnProperty(e)}var so=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?To:wo:i?Co:So).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=oa(e);if(!r){let e;if(a&&(e=Za[t]))return e;if(t===`hasOwnProperty`)return oo}let o=Reflect.get(e,t,Io(e)?e:n);if((la(t)?ao.has(t):io(t))||(r||I(e,`get`,t),i))return o;if(Io(o)){let e=a&&ma(t)?o:o.value;return r&&ua(e)?Oo(e):e}return ua(o)?r?Oo(o):Do(o):o}},co=class extends so{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=oa(e)&&ma(t);if(!this._isShallow){let r=jo(i);if(!Mo(n)&&!jo(n)&&(i=L(i),n=L(n)),!a&&Io(i)&&!Io(n))return r?(_a(`Set operation on key "${String(t)}" failed: target is readonly.`,e[t]),!0):(i.value=n,!0)}let o=a?Number(t)<e.length:aa(e,t),s=Reflect.set(e,t,n,Io(e)?e:r);return e===L(r)&&s&&(o?ga(n,i)&&qa(e,`set`,t,n,i):qa(e,`add`,t,n)),s}deleteProperty(e,t){let n=aa(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&qa(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return la(t)&&ao.has(t)||I(e,`has`,t),n}ownKeys(e){return I(e,`iterate`,oa(e)?`length`:Wa),Reflect.ownKeys(e)}},lo=class extends so{constructor(e=!1){super(!0,e)}set(e,t){return _a(`Set operation on key "${String(t)}" failed: target is readonly.`,e),!0}deleteProperty(e,t){return _a(`Delete operation on key "${String(t)}" failed: target is readonly.`,e),!0}},uo=new co,fo=new lo,po=e=>e,mo=e=>Reflect.getPrototypeOf(e);function ho(e,t,n){return function(...r){let i=this.__v_raw,a=L(i),o=sa(a),s=e===`entries`||e===Symbol.iterator&&o,c=e===`keys`&&o,l=i[e](...r),u=n?po:t?Fo:Po;return!t&&I(a,`iterate`,c?Ga:Wa),ra(Object.create(l),{next(){let{value:e,done:t}=l.next();return t?{value:e,done:t}:{value:s?[u(e[0]),u(e[1])]:u(e),done:t}}})}}function go(e){return function(...t){{let n=t[0]?`on key "${t[0]}" `:``;_a(`${ha(e)} operation ${n}failed: target is readonly.`,L(this))}return e===`delete`?!1:e===`clear`?void 0:this}}function _o(e,t){let n={get(n){let r=this.__v_raw,i=L(r),a=L(n);e||(ga(n,a)&&I(i,`get`,n),I(i,`get`,a));let{has:o}=mo(i),s=t?po:e?Fo:Po;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&I(L(t),`iterate`,Wa),t.size},has(t){let n=this.__v_raw,r=L(n),i=L(t);return e||(ga(t,i)&&I(r,`has`,t),I(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=L(a),s=t?po:e?Fo:Po;return!e&&I(o,`iterate`,Wa),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return ra(n,e?{add:go(`add`),set:go(`set`),delete:go(`delete`),clear:go(`clear`)}:{add(e){let n=L(this),r=mo(n),i=L(e),a=!t&&!Mo(e)&&!jo(e)?i:e;return r.has.call(n,a)||ga(e,a)&&r.has.call(n,e)||ga(i,a)&&r.has.call(n,i)||(n.add(a),qa(n,`add`,a,a)),this},set(e,n){t||Mo(n)||jo(n)||(n=L(n));let r=L(this),{has:i,get:a}=mo(r),o=i.call(r,e);o?xo(r,i,e):(e=L(e),o=i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?ga(n,s)&&qa(r,`set`,e,n,s):qa(r,`add`,e,n),this},delete(e){let t=L(this),{has:n,get:r}=mo(t),i=n.call(t,e);i?xo(t,n,e):(e=L(e),i=n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&qa(t,`delete`,e,void 0,a),o},clear(){let e=L(this),t=e.size!==0,n=sa(e)?new Map(e):new Set(e),r=e.clear();return t&&qa(e,`clear`,void 0,void 0,n),r}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=ho(r,e,t)}),n}function vo(e,t){let n=_o(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(aa(n,r)&&r in t?n:t,r,i)}var yo={get:vo(!1,!1)},bo={get:vo(!0,!1)};function xo(e,t,n){let r=L(n);if(r!==n&&t.call(e,r)){let t=pa(e);_a(`Reactive ${t} contains both the raw and reactive versions of the same object${t===`Map`?` as keys`:``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)}}var So=new WeakMap,Co=new WeakMap,wo=new WeakMap,To=new WeakMap;function Eo(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function Do(e){return jo(e)?e:ko(e,!1,uo,yo,So)}function Oo(e){return ko(e,!0,fo,bo,wo)}function ko(e,t,n,r,i){if(!ua(e))return _a(`value cannot be made ${t?`readonly`:`reactive`}: ${String(e)}`),e;if(e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let a=i.get(e);if(a)return a;let o=Eo(pa(e));if(o===0)return e;let s=new Proxy(e,o===2?r:n);return i.set(e,s),s}function Ao(e){return jo(e)?Ao(e.__v_raw):!!(e&&e.__v_isReactive)}function jo(e){return!!(e&&e.__v_isReadonly)}function Mo(e){return!!(e&&e.__v_isShallow)}function No(e){return e?!!e.__v_raw:!1}function L(e){let t=e&&e.__v_raw;return t?L(t):e}var Po=e=>ua(e)?Do(e):e,Fo=e=>ua(e)?Oo(e):e;function Io(e){return e?e.__v_isRef===!0:!1}Sn(`nextTick`,()=>$r),Sn(`dispatch`,e=>Mr.bind(Mr,e)),Sn(`watch`,(e,{evaluateLater:t,cleanup:n})=>(e,r)=>{let i=t(e);n(Vt(()=>{let e;return i(t=>e=t),e},r))}),Sn(`store`,qi),Sn(`data`,e=>un(e)),Sn(`root`,e=>Hr(e)),Sn(`refs`,e=>(e._x_refs_proxy||=pn(Lo(e)),e._x_refs_proxy));function Lo(e){let t=[];return Ur(e,e=>{e._x_refs&&t.push(e._x_refs)}),t}var Ro={};function zo(e){return Ro[e]||(Ro[e]=0),++Ro[e]}function Bo(e,t){return Ur(e,e=>{if(e._x_ids&&e._x_ids[t])return!0})}function Vo(e,t){e._x_ids||={},e._x_ids[t]||(e._x_ids[t]=zo(t))}Sn(`id`,(e,{cleanup:t})=>(n,r=null)=>Ho(e,`${n}${r?`-${r}`:``}`,t,()=>{let t=Bo(e,n),i=t?t._x_ids[n]:zo(n);return r?`${n}-${i}-${r}`:`${n}-${i}`})),br((e,t)=>{e._x_id&&(t._x_id=e._x_id)});function Ho(e,t,n,r){if(e._x_id||={},e._x_id[t])return e._x_id[t];let i=r();return e._x_id[t]=i,n(()=>{delete e._x_id[t]}),i}Sn(`el`,e=>e),Uo(`Focus`,`focus`,`focus`),Uo(`Persist`,`persist`,`persist`);function Uo(e,t,n){Sn(t,r=>Nr(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,r))}P(`modelable`,(e,{expression:t},{effect:n,evaluateLater:r,cleanup:i})=>{let a=r(t),o=()=>{let e;return a(t=>e=t),e},s=r(`${t} = __placeholder`),c=e=>s(()=>{},{scope:{__placeholder:e}});c(o()),queueMicrotask(()=>{if(!e._x_model)return;e._x_removeModelListeners.default();let t=e._x_model.get,n=e._x_model.setWithModifiers;i(Vi({get(){return t()},set(e){n(e)}},{get(){return o()},set(e){c(e)}}))})}),P(`teleport`,(e,{modifiers:t,expression:n},{cleanup:r})=>{e.tagName.toLowerCase()!==`template`&&Nr(`x-teleport can only be used on a <template> tag`,e);let i=Go(n),a=e.content.cloneNode(!0).firstElementChild;e._x_teleport=a,a._x_teleportBack=e,e.setAttribute(`data-teleport-template`,!0),a.setAttribute(`data-teleport-target`,!0),e._x_forwardEvents&&e._x_forwardEvents.forEach(t=>{a.addEventListener(t,t=>{t.stopPropagation(),e.dispatchEvent(new t.constructor(t.type,t))})}),dn(a,{},e);let o=(e,t,n)=>{n.includes(`prepend`)?t.parentNode.insertBefore(e,t):n.includes(`append`)?t.parentNode.insertBefore(e,t.nextSibling):t.appendChild(e)};M(()=>{_r(()=>{o(a,i,t),Jr(a)})()}),e._x_teleportPutBack=()=>{let r=Go(n);M(()=>{o(e._x_teleport,r,t)})},r(()=>M(()=>{a.remove(),Yr(a)}))});var Wo=document.createElement(`div`);function Go(e){let t=_r(()=>document.querySelector(e),()=>Wo)();return t||Nr(`Cannot find x-teleport element for selector: "${e}"`),t}var Ko=()=>{};Ko.inline=(e,{modifiers:t},{cleanup:n})=>{t.includes(`self`)?e._x_ignoreSelf=!0:e._x_ignore=!0,n(()=>{t.includes(`self`)?delete e._x_ignoreSelf:delete e._x_ignore})},P(`ignore`,Ko),P(`effect`,_r((e,{expression:t},{effect:n})=>{n(N(e,t))}));function qo(e,t,n,r){let i=e,a=e=>r(e),o={},s=(e,t)=>n=>t(e,n);return n.includes(`dot`)&&(t=Yo(t)),n.includes(`camel`)&&(t=Xo(t)),n.includes(`capture`)&&(o.capture=!0),n.includes(`window`)&&(i=window),n.includes(`document`)&&(i=document),n.includes(`passive`)&&(o.passive=n[n.indexOf(`passive`)+1]!==`false`),a=Jo(n,a),n.includes(`prevent`)&&(a=s(a,(e,t)=>{t.preventDefault(),e(t)})),n.includes(`stop`)&&(a=s(a,(e,t)=>{t.stopPropagation(),e(t)})),n.includes(`once`)&&(a=s(a,(e,n)=>{e(n),i.removeEventListener(t,a,o)})),(n.includes(`away`)||n.includes(`outside`))&&(i=document,a=s(a,(t,n)=>{e.contains(n.target)||n.target.isConnected!==!1&&(e.offsetWidth<1&&e.offsetHeight<1||e._x_isShown!==!1&&t(n))})),n.includes(`self`)&&(a=s(a,(t,n)=>{n.target===e&&t(n)})),t===`submit`&&(a=s(a,(e,t)=>{t.target._x_pendingModelUpdates&&t.target._x_pendingModelUpdates.forEach(e=>e()),e(t)})),($o(t)||es(t))&&(a=s(a,(e,t)=>{ns(t,n)||e(t)})),i.addEventListener(t,a,o),()=>{i.removeEventListener(t,a,o)}}function Jo(e,t){if(e.includes(`debounce`)){let n=e[e.indexOf(`debounce`)+1]||`invalid-wait`,r=Zo(n.split(`ms`)[0])?Number(n.split(`ms`)[0]):250;t=zi(t,r)}if(e.includes(`throttle`)){let n=e[e.indexOf(`throttle`)+1]||`invalid-wait`,r=Zo(n.split(`ms`)[0])?Number(n.split(`ms`)[0]):250;t=Bi(t,r)}return t}function Yo(e){return e.replace(/-/g,`.`)}function Xo(e){return e.toLowerCase().replace(/-(\w)/g,(e,t)=>t.toUpperCase())}function Zo(e){return!Array.isArray(e)&&!isNaN(e)}function Qo(e){return[` `,`_`].includes(e)?e:e.replace(/([a-z])([A-Z])/g,`$1-$2`).replace(/[_\s]/,`-`).toLowerCase()}function $o(e){return[`keydown`,`keyup`].includes(e)}function es(e){return[`contextmenu`,`click`,`mouse`].some(t=>e.includes(t))}var ts=[`window`,`document`,`prevent`,`stop`,`once`,`capture`,`self`,`away`,`outside`,`passive`,`dot`,`camel`,`preserve-scroll`,`blur`,`change`,`lazy`,`number`,`boolean`,`trim`,`fill`,`unintrusive`,`parent`];function ns(e,t){let n=t.filter((e,n)=>e===`false`&&t[n-1]===`passive`?!1:!ts.includes(e));if(n.includes(`debounce`)){let e=n.indexOf(`debounce`);n.splice(e,Zo((n[e+1]||`invalid-wait`).split(`ms`)[0])?2:1)}if(n.includes(`throttle`)){let e=n.indexOf(`throttle`);n.splice(e,Zo((n[e+1]||`invalid-wait`).split(`ms`)[0])?2:1)}if(n.length===0||n.length===1&&rs(e.key).includes(n[0]))return!1;let r=[`ctrl`,`shift`,`alt`,`meta`,`cmd`,`super`].filter(e=>n.includes(e));return n=n.filter(e=>!r.includes(e)),!(r.length>0&&r.filter(t=>((t===`cmd`||t===`super`)&&(t=`meta`),e[`${t}Key`])).length===r.length&&(es(e.type)||rs(e.key).includes(n[0])))}function rs(e){if(!e)return[];e=Qo(e);let t={ctrl:`control`,slash:`/`,space:` `,spacebar:` `,cmd:`meta`,esc:`escape`,up:`arrow-up`,down:`arrow-down`,left:`arrow-left`,right:`arrow-right`,period:`.`,comma:`,`,equal:`=`,minus:`-`,underscore:`_`};return t[e]=e,Object.keys(t).map(n=>{if(t[n]===e)return n}).filter(e=>e)}P(`model`,(e,{modifiers:t,expression:n},{effect:r,cleanup:i})=>{let a=e;t.includes(`parent`)&&(a=Ur(e,t=>t!==e));let o=N(a,n),s;s=typeof n==`string`?N(a,`${n} = __placeholder`):typeof n==`function`&&typeof n()==`string`?N(a,`${n()} = __placeholder`):()=>{};let c=()=>{let e;return o(t=>e=t),cs(e)?e.get():e},l=e=>{let t;o(e=>t=e),cs(t)?t.set(e):s(()=>{},{scope:{__placeholder:e}})};typeof n==`string`&&e.type===`radio`&&M(()=>{e.hasAttribute(`name`)||e.setAttribute(`name`,n)});let u=t.includes(`change`)||t.includes(`lazy`),d=t.includes(`blur`),f=t.includes(`enter`),p=u||d||f,m;if(gr)m=()=>{};else if(p){let n=[],r=n=>l(is(e,t,n,c()));if(u&&n.push(qo(e,`change`,t,r)),d&&(n.push(qo(e,`blur`,t,r)),e.form)){let t=e.form,n=()=>r({target:e});t._x_pendingModelUpdates||=[],t._x_pendingModelUpdates.push(n),i(()=>{t._x_pendingModelUpdates&&t._x_pendingModelUpdates.splice(t._x_pendingModelUpdates.indexOf(n),1)})}f&&n.push(qo(e,`keydown`,t,e=>{e.key===`Enter`&&r(e)})),m=()=>n.forEach(e=>e())}else m=qo(e,e.tagName.toLowerCase()===`select`||[`checkbox`,`radio`].includes(e.type)?`change`:`input`,t,n=>{l(is(e,t,n,c()))});if(t.includes(`fill`)&&([void 0,null,``].includes(c())||Li(e)&&Array.isArray(c())||e.tagName.toLowerCase()===`select`&&e.multiple)&&l(is(e,t,{target:e},c())),e._x_removeModelListeners||={},e._x_removeModelListeners.default=m,i(()=>e._x_removeModelListeners.default()),e.form){let n=qo(e.form,`reset`,[],n=>{$r(()=>e._x_model&&e._x_model.set(is(e,t,{target:e},c())))});i(()=>n())}if(e._x_model={get(){return c()},set(e){l(e)},setWithModifiers:Jo(t,l)},e._x_forceModelUpdate=t=>{t===void 0&&typeof n==`string`&&n.match(/\./)&&(t=``),M(()=>{Li(e)?e.checked=Array.isArray(t)?t.some(t=>t==e.value):!!t:Ri(e)?e.checked=typeof t==`boolean`?ki(e.value)===t:e.value==t:vi(e,`value`,t)})},e.tagName===`SELECT`){let t=new MutationObserver(()=>{e._x_forceModelUpdate(c())});t.observe(e,{childList:!0}),i(()=>t.disconnect())}r(()=>{let n=c();t.includes(`unintrusive`)&&document.activeElement.isSameNode(e)||e._x_forceModelUpdate(n)})});function is(e,t,n,r){return M(()=>{if(n instanceof CustomEvent&&n.detail!==void 0)return n.detail!==null&&n.detail!==void 0?n.detail:n.target.value;if(Li(e)){if(Array.isArray(r)){let e=null;return e=t.includes(`number`)?as(n.target.value):t.includes(`boolean`)?ki(n.target.value):n.target.value,n.target.checked?r.includes(e)?r:r.concat([e]):r.filter(t=>!os(t,e))}return n.target.checked}if(e.tagName.toLowerCase()===`select`&&e.multiple)return t.includes(`number`)?Array.from(n.target.selectedOptions).map(e=>as(e.value||e.text)):t.includes(`boolean`)?Array.from(n.target.selectedOptions).map(e=>ki(e.value||e.text)):Array.from(n.target.selectedOptions).map(e=>e.value||e.text);{let i;return i=Ri(e)?n.target.checked?n.target.value:r:n.target.value,t.includes(`number`)?as(i):t.includes(`boolean`)?ki(i):t.includes(`trim`)?i.trim():i}})}function as(e){let t=e?parseFloat(e):null;return ss(t)?t:e}function os(e,t){return e==t}function ss(e){return!Array.isArray(e)&&!isNaN(e)}function cs(e){return typeof e==`object`&&!!e&&typeof e.get==`function`&&typeof e.set==`function`}P(`cloak`,e=>{if(gr)return e.removeAttribute(Kn(`cloak`));queueMicrotask(()=>M(()=>e.removeAttribute(Kn(`cloak`))))}),Vr(()=>`[${Kn(`init`)}]`),P(`init`,_r((e,{expression:t},{evaluate:n})=>typeof t==`string`?!!t.trim()&&n(t,{},!1):n(t,{},!1))),P(`text`,(e,{expression:t},{effect:n,evaluateLater:r})=>{let i=r(t);n(()=>{i(t=>{M(()=>{e.textContent=t})})})}),P(`html`,(e,{expression:t},{effect:n,evaluateLater:r})=>{let i=r(t);n(()=>{i(t=>{M(()=>{Array.from(e.children).forEach(e=>Yr(e)),e.innerHTML=t??``,e._x_ignoreSelf=!0,Jr(e),delete e._x_ignoreSelf})})},{priority:`structural`})}),cr(ir(`:`,ar(Kn(`bind:`))));var ls=(e,{value:t,modifiers:n,expression:r,original:i},{effect:a,cleanup:o})=>{if(!t){let t={};Xi(t),N(e,r)(t=>{Zi(e,t,i)},{scope:t});return}if(t===`key`)return us(e,r);if(e._x_inlineBindings&&e._x_inlineBindings[t]&&e._x_inlineBindings[t].extract)return;let s=N(e,r);a(()=>s(i=>{i===void 0&&typeof r==`string`&&r.match(/\./)&&(i=``),M(()=>vi(e,t,i,n))})),o(()=>{e._x_undoAddedClasses&&e._x_undoAddedClasses(),e._x_undoAddedStyles&&e._x_undoAddedStyles()})};ls.inline=(e,{value:t,modifiers:n,expression:r})=>{t&&(e._x_inlineBindings||={},e._x_inlineBindings[t]={expression:r,extract:!1})},P(`bind`,ls);function us(e,t){e._x_keyExpression=t}Br(()=>`[${Kn(`data`)}]`);var ds=Symbol();P(`data`,(e,{expression:t},{cleanup:n})=>{if(ps(e))return;let r=e[ds];if(r?.expression===t)return;t=t===``?`{}`:t;let i={};Cn(i,e);let a={};ea(a,i);let o=Mn(e,t,{scope:a});(o===void 0||o===!0)&&(o={}),Cn(o,e);let s;if(r?.reactiveData){s=r.reactiveData,fs(s,o);let n={expression:t};e[ds]=n,queueMicrotask(()=>{e[ds]===n&&delete e[ds]})}else s=Mt(o);_n(s,n);let c=dn(e,s);_r(()=>{s.init&&Mn(e,s.init)})(),n(()=>{s.destroy&&Mn(e,s.destroy),c();let t={reactiveData:s};e[ds]=t,queueMicrotask(()=>{e[ds]===t&&delete e[ds]})})});function fs(e,t){Object.keys(t).forEach(n=>{let r=Object.getOwnPropertyDescriptor(t,n),i=Object.getOwnPropertyDescriptor(e,n);r.get||r.set||i?.get||i?.set?(i&&delete e[n],i||(e[n]=void 0),r.get||r.set?Object.defineProperty(e,n,r):e[n]=t[n]):e[n]=t[n]}),Object.keys(e).filter(e=>!Object.prototype.hasOwnProperty.call(t,e)).forEach(t=>delete e[t])}br((e,t)=>{e._x_dataStack&&(t._x_dataStack=e._x_dataStack,t.setAttribute(`data-has-alpine-state`,!0))});function ps(e){return gr?Sr?!0:e.hasAttribute(`data-has-alpine-state`):!1}P(`show`,(e,{modifiers:t,expression:n},{effect:r})=>{let i=N(e,n);e._x_doHide||=()=>{M(()=>{e.style.setProperty(`display`,`none`,t.includes(`important`)?`important`:void 0)})},e._x_doShow||=()=>{M(()=>{e.style.length===1&&e.style.display===`none`?e.removeAttribute(`style`):e.style.removeProperty(`display`)})};let a=()=>{e._x_doHide(),e._x_isShown=!1},o=()=>{e._x_doShow(),e._x_isShown=!0},s=()=>setTimeout(o),c=ui(e=>e?o():a(),t=>{typeof e._x_toggleAndCascadeWithTransitions==`function`?e._x_toggleAndCascadeWithTransitions(e,t,o,a):t?s():a()}),l,u=!0;r(()=>i(e=>{(u||e!==l)&&(t.includes(`immediate`)&&(e?s():a()),c(e),l=e,u=!1)}))}),P(`for`,_r((e,{expression:t},{effect:n,cleanup:r})=>{let i=gs(t),a=N(e,i.items),o=N(e,e._x_keyExpression||`index`);e._x_lookup=new Map,n(()=>hs(e,i,a,o),{priority:`structural`}),r(()=>{e._x_lookup.forEach(e=>M(()=>{Yr(e),e.remove()})),delete e._x_lookup,delete e._x_lastRenderedEl})}));function ms(e){return t=>{Object.entries(t).forEach(([t,n])=>{e[t]=n})}}function hs(e,t,n,r){n(n=>{vs(n)&&(n=Array.from({length:n},(e,t)=>t+1)),n??=[],n instanceof Set&&(n=Array.from(n)),n instanceof Map&&(n=Array.from(n));let i=e._x_lookup,a=new Map;e._x_lookup=a;let o=ys(n),s=Object.entries(n).map(([s,c])=>{o||(s=parseInt(s));let l=_s(t,c,s,n),u;return r(t=>{typeof t==`object`&&Nr(`x-for key cannot be an object, it must be a string or an integer`,e),i.has(t)&&(a.set(t,i.get(t)),i.delete(t)),u=t},{scope:{index:s,...l}}),[u,l]});M(()=>{i.forEach(e=>{Yr(e),e.remove()});let t=new Set,n=e;s.forEach(([r,i])=>{if(a.has(r)){let e=a.get(r);e._x_refreshXForScope(i),n.nextElementSibling!==e&&(n.nextElementSibling&&e.replaceWith(n.nextElementSibling),n.after(e)),n=e,e._x_currentIfEl&&(e.nextElementSibling!==e._x_currentIfEl&&n.after(e._x_currentIfEl),n=e._x_currentIfEl);return}e.content.children.length>1&&Nr(`x-for templates require a single root element, additional elements will be ignored.`,e);let o=document.importNode(e.content,!0).firstElementChild,s=Mt(i);dn(o,s,e),o._x_refreshXForScope=ms(s),a.set(r,o),t.add(o),n.after(o),n=o}),t.forEach(e=>Jr(e)),n===e?delete e._x_lastRenderedEl:e._x_lastRenderedEl=n})})}function gs(e){let t=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,n=/^\s*\(|\)\s*$/g,r=e.match(/([\s\S]*?)\b(?:in|of)\b([\s\S]*)/);if(!r)return;let i={};i.items=r[2].trim();let a=r[1].replace(n,``).trim(),o=a.match(t);return o?(i.item=a.replace(t,``).trim(),i.index=o[1].trim(),o[2]&&(i.collection=o[2].trim())):i.item=a,i}function _s(e,t,n,r){let i={};return/^\[.*\]$/.test(e.item)&&Array.isArray(t)?e.item.replace(`[`,``).replace(`]`,``).split(`,`).map(e=>e.trim()).forEach((e,n)=>{i[e]=t[n]}):/^\{.*\}$/.test(e.item)&&!Array.isArray(t)&&typeof t==`object`?e.item.replace(`{`,``).replace(`}`,``).split(`,`).map(e=>e.trim()).forEach(e=>{i[e]=t[e]}):i[e.item]=t,e.index&&(i[e.index]=n),e.collection&&(i[e.collection]=r),i}function vs(e){return typeof e!=`object`&&!isNaN(e)}function ys(e){return typeof e==`object`&&!Array.isArray(e)}function bs(){}bs.inline=(e,{expression:t},{cleanup:n})=>{let r=Hr(e);r&&(r._x_refs||={},r._x_refs[t]=e,n(()=>delete r._x_refs[t]))},P(`ref`,bs),P(`if`,_r((e,{expression:t},{effect:n,cleanup:r})=>{e.tagName.toLowerCase()!==`template`&&Nr(`x-if can only be used on a <template> tag`,e);let i=N(e,t),a=()=>{if(e._x_currentIfEl)return e._x_currentIfEl;let t=e.content.cloneNode(!0).firstElementChild;return dn(t,{},e),M(()=>{e.after(t),Jr(t)}),e._x_currentIfEl=t,e._x_lastRenderedEl=t,e._x_undoIf=()=>{M(()=>{Yr(t),t.remove()}),delete e._x_currentIfEl,delete e._x_lastRenderedEl},t},o=()=>{e._x_undoIf&&(e._x_undoIf(),delete e._x_undoIf)};n(()=>i(e=>{e?a():o()}),{priority:`structural`}),r(()=>e._x_undoIf&&e._x_undoIf())})),P(`id`,(e,{expression:t},{evaluate:n})=>{n(t).forEach(t=>Vo(e,t))}),br((e,t)=>{e._x_ids&&(t._x_ids=e._x_ids)}),cr(ir(`@`,ar(Kn(`on:`)))),P(`on`,_r((e,{value:t,modifiers:n,expression:r},{cleanup:i})=>{let a=r?N(e,r):()=>{};e.tagName.toLowerCase()===`template`&&(e._x_forwardEvents||=[],e._x_forwardEvents.includes(t)||e._x_forwardEvents.push(t));let o=qo(e,t,n,e=>{a(()=>{},{scope:{$event:e},params:[e]})});i(()=>o())})),xs(`Collapse`,`collapse`,`collapse`),xs(`Intersect`,`intersect`,`intersect`),xs(`Focus`,`trap`,`focus`),xs(`Mask`,`mask`,`mask`);function xs(e,t,n){P(t,r=>Nr(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,r))}ta.setEvaluator(Ln),ta.setRawEvaluator(Wn),ta.setReactivityEngine({reactive:Do,effect:(e,t={})=>{let n;return n=Ma(e,{scheduler:()=>{n&&(t.scheduler?t.scheduler(n):n())}}),n},release:Na,raw:L});var Ss=ta;function Cs(){return{botNicks:{},botModeChar:``,isBotNick(e){return e?!!this.botNicks[String(e).toLowerCase()]||Ae(e):!1},botBadgeTitle(e){return Ae(e)?this.t(`bot_title_service`):this.t(`bot_title`)},markBot(e,t){let n=String(e||``).toLowerCase();if(!n||!!this.botNicks[n]==!!t)return;let r={...this.botNicks};t?r[n]=!0:delete r[n],this.botNicks=r},noteBotTag(e){e?.nick&&e.tags&&Object.prototype.hasOwnProperty.call(e.tags,`bot`)&&this.markBot(e.nick,!0)},noteWhoFlags(e,t){this.botModeChar&&this.markBot(e,String(t||``).includes(this.botModeChar))},renameBot(e,t){let n=String(e||``).toLowerCase();this.botNicks[n]&&(this.markBot(e,!1),this.markBot(t,!0))}}}function ws(){return{isFriendNick(){return!1},isFriendOnline(){return!1},lastActivityAt(e){let t=this.stores.messages.get()?.[e]?.content||[];for(let e=t.length-1;e>=0;e--){let n=t[e];if(!n._hidden&&typeof n._ts==`number`&&n._ts>0)return n._ts}return 0},sortedDmKeys(e){return[...e].sort((e,t)=>this.lastActivityAt(t)-this.lastActivityAt(e)||e.localeCompare(t))},friendDmKeys(){return this.sortedDmKeys(this.privateMessageKeys.filter(e=>this.isFriendNick(e)))},otherDmKeys(){return this.sortedDmKeys(this.privateMessageKeys.filter(e=>!this.isFriendNick(e)))},openDirectMessage(e){e&&(this.selectedFriendName=e,this.sendPrivateMessage(e),this.sidebarMode=`friends`,this.scheduleChatStateSave?.())}}}function Ts(){return{showPanel:!1,showTopicEditor:!1,showListManager:!1,listManagerTab:`ban`,topicDraft:``,channelModesDraft:``,customModesDraft:``,commonChannelModes:[`n`,`t`,`m`,`i`,`s`,`E`],standardModeState:{n:!1,t:!1,m:!1,i:!1,s:!1,E:!1},banList:[],exceptionList:[],invexList:[]}}function Es(){return{channelManagementStore(){return this.stores.channelManagement.get()},getCurrentUserRole(e=this.currentChannel){return(this.reactiveUsers[e]||[]).find(e=>e.name===this.nickname)?.role||``},canManageCurrentChannel(){return this.currentChannel?.startsWith(`#`)?[`~`,`&`,`@`,`%`].includes(this.getCurrentUserRole()):!1},applyChannelTopic(){if(!this.canManageCurrentChannel())return;let e=(this.channelManagementStore().topicDraft||``).trim();this.sendRaw(`TOPIC ${this.currentChannel} :${e}`),this.channelManagementStore().showTopicEditor=!1},insertTopicColorCode(e){e?.ctrlKey&&e.key.toLowerCase()===`k`&&(e.preventDefault(),this.channelManagementStore().topicDraft+=``)},openTopicEditor(){this.canManageCurrentChannel()&&(this.channelManagementStore().topicDraft=this.channelManager.getTopic(this.currentChannel),this.channelManagementStore().showTopicEditor=!0)},openChannelManagement(){this.canManageCurrentChannel()&&(this.channelManagementStore().showPanel=!0,this.channelManagementStore().channelModesDraft=``,this.channelManagementStore().customModesDraft=``,this.sendRaw(`MODE ${this.currentChannel}`))},openChannelListManager(e=`ban`){this.canManageCurrentChannel()&&(this.channelManagementStore().listManagerTab=e,this.channelManagementStore().showListManager=!0,this.channelManagementStore().banList=[],this.channelManagementStore().exceptionList=[],this.channelManagementStore().invexList=[],this.sendRaw(`MODE ${this.currentChannel} +b`),this.sendRaw(`MODE ${this.currentChannel} +e`),this.sendRaw(`MODE ${this.currentChannel} +I`))},parseChannelModeState(e=``){let t=this.channelManagementStore(),n={...t.standardModeState||{n:!1,t:!1,m:!1,i:!1,s:!1,E:!1}},r=null;for(let t of String(e))t===`+`||t===`-`?r=t:Object.prototype.hasOwnProperty.call(n,t)&&r&&(n[t]=r===`+`);t.standardModeState=n},setStandardMode(e,t){if(!this.canManageCurrentChannel()||!e)return;let n=this.channelManagementStore();n.standardModeState={...n.standardModeState,[e]:!!t},this.sendRaw(`MODE ${this.currentChannel} ${t?`+`:`-`}${e}`)},applyModeShortcut(e){if(!this.canManageCurrentChannel()||!e)return;let t=String(e).trim();t&&this.sendRaw(`MODE ${this.currentChannel} ${t}`)},applyChannelModes(){this.canManageCurrentChannel()&&this.channelManagementStore().channelModesDraft.trim()&&(this.sendRaw(`MODE ${this.currentChannel} ${this.channelManagementStore().channelModesDraft.trim()}`),this.channelManagementStore().channelModesDraft=``)},applyCustomModes(){this.canManageCurrentChannel()&&this.channelManagementStore().customModesDraft.trim()&&(this.sendRaw(`MODE ${this.currentChannel} ${this.channelManagementStore().customModesDraft.trim()}`),this.channelManagementStore().customModesDraft=``)},applyUserMode(e,t){this.canManageCurrentChannel()&&e&&t&&(this.sendRaw(`MODE ${this.currentChannel} ${t} ${e}`),this.showingUserOptions=!1)},kickUser(e){this.canManageCurrentChannel()&&e&&(this.sendRaw(`KICK ${this.currentChannel} ${e} :Requested by ${this.nickname}`),this.showingUserOptions=!1)},banAndKickUser(e){this.canManageCurrentChannel()&&e&&(this.sendRaw(`MODE ${this.currentChannel} +b ${e}!*@*`),this.sendRaw(`KICK ${this.currentChannel} ${e} :Banned by ${this.nickname}`),this.showingUserOptions=!1)},refreshChannelLists(){this.canManageCurrentChannel()&&(this.channelManagementStore().banList=[],this.channelManagementStore().exceptionList=[],this.channelManagementStore().invexList=[],this.sendRaw(`MODE ${this.currentChannel} +b`),this.sendRaw(`MODE ${this.currentChannel} +e`),this.sendRaw(`MODE ${this.currentChannel} +I`))},removeBan(e){this.canManageCurrentChannel()&&e&&(this.sendRaw(`MODE ${this.currentChannel} -b ${e}`),this.channelManagementStore().banList=this.channelManagementStore().banList.filter(t=>t.mask!==e),this.refreshChannelLists())},removeException(e){this.canManageCurrentChannel()&&e&&(this.sendRaw(`MODE ${this.currentChannel} -e ${e}`),this.channelManagementStore().exceptionList=this.channelManagementStore().exceptionList.filter(t=>t.mask!==e),this.refreshChannelLists())},removeInvex(e){this.canManageCurrentChannel()&&e&&(this.sendRaw(`MODE ${this.currentChannel} -I ${e}`),this.channelManagementStore().invexList=this.channelManagementStore().invexList.filter(t=>t.mask!==e),this.refreshChannelLists())}}}var Ds=200;function Os(e,t){return e.toLowerCase().startsWith(t.toLowerCase())}function ks(e,t){return e.localeCompare(t,void 0,{sensitivity:`base`})}function As(){return{_tabCompletion:null,completionNicks(){let e=this.currentChannel;if(!e)return[];let t=(this.nickname||``).toLowerCase(),n=e.startsWith(`#`)?this.activeUsers.get(e).map(e=>e.name):[e],r=[],i=this.messageManager.get(e);for(let e=i.length-1;e>=0&&i.length-e<=Ds;e--){let t=i[e];t._hidden||t.isJoinPart||t.isSystem||!t.user||r.some(e=>e.toLowerCase()===t.user.toLowerCase())||r.push(t.user)}let a=new Set(n.map(e=>e.toLowerCase())),o=e.startsWith(`#`)?r.filter(e=>a.has(e.toLowerCase())):r,s=new Set(o.map(e=>e.toLowerCase())),c=n.filter(e=>!s.has(e.toLowerCase())).sort(ks);return[...o,...c].filter(e=>e&&e.toLowerCase()!==t)},completionCandidates(e,t){if(e.startsWith(`/`)&&t){let t=e.slice(1);return Object.keys(st).filter(e=>Os(e,t)).sort(ks).map(e=>({text:`/${e}`,suffix:` `}))}if(e.startsWith(`#`))return[...new Set(this.availableChannels)].filter(t=>Os(t,e)).sort(ks).map(e=>({text:e,suffix:` `}));let n=e.startsWith(`@`)?`@`:``,r=e.slice(n.length);return!r&&!n?[]:this.completionNicks().filter(e=>Os(e,r)).map(e=>({text:n+e,suffix:t&&!n?`: `:` `}))},handleTabCompletion(e){if(e.ctrlKey||e.altKey||e.metaKey)return;let t=e.target,n=this.newMessage||``,r=typeof t?.selectionStart==`number`?t.selectionStart:n.length,i=this._tabCompletion;if(!(i&&i.value===n&&i.caret===r)){let e=n.slice(0,r).match(/\S*$/)[0];if(!e){this._tabCompletion=null;return}let t=r-e.length;i={start:t,after:n.slice(r).replace(/^ /,``),candidates:this.completionCandidates(e,t===0),index:-1}}if(e.preventDefault(),!i.candidates.length){this._tabCompletion=null;return}let a=i.candidates.length,o=e.shiftKey?-1:1;i.index=i.index===-1?e.shiftKey?a-1:0:(i.index+o+a)%a;let{text:s,suffix:c}=i.candidates[i.index],l=s+c;this.newMessage=n.slice(0,i.start)+l+i.after,i.value=this.newMessage,i.caret=i.start+l.length,this._tabCompletion=i,this.commandSuggestions=[];let u=i.caret;this.$nextTick?.(()=>t?.setSelectionRange?.(u,u))}}}var js=64,R={highlightWords:`chat.highlightWords`,ignoredUsers:`chat.ignoredUsers`,channelNotifications:`chat.channelNotifications`,quitMessage:`chat.quitMessage`,nickColors:`chat.nickColors`,leftLobbies:`chat.leftLobbies`,autojoinChannels:`chat.autojoinChannels`};function Ms(e){let t=(Array.isArray(e)?e:String(e??``).split(/[\s,]+/)).filter(e=>typeof e==`string`).map(e=>e.trim().replace(/^#+/,``).toLowerCase()).filter(e=>e&&e.length<100&&/^[\p{L}\p{N}_\-.]+$/u.test(e)).map(e=>`#${e}`);return[...new Set(t)].slice(0,50)}function Ns(e){if(!Array.isArray(e))return[];let t=e.filter(e=>typeof e==`string`&&e.startsWith(`#`)&&e.length<=100).map(e=>e.toLowerCase());return[...new Set(t)].slice(0,20)}var Ps=[0,25,45,60,95,140,170,195,215,240,270,300,330];function Fs(e){if(!e||typeof e!=`object`||Array.isArray(e))return{};let t=Object.entries(e).map(([e,t])=>[String(e).trim().toLowerCase(),Number(t)]).filter(([e,t])=>e&&e.length<=js&&Number.isInteger(t)&&t>=0&&t<360).slice(0,200);return Object.fromEntries(t)}function Is(e){return typeof e==`string`?e.replace(/[\r\n\x00]+/g,` `).trim().slice(0,200):``}var Ls=[`all`,`mentions`,`mute`];function Rs(e,t=``){return t?`${e}:${t}`:e}function zs(e,t,n,r){try{let i=localStorage.getItem(Rs(e,t));return r(i===null?n:JSON.parse(i))}catch{return r(n)}}function Bs(e,t,n){try{localStorage.setItem(Rs(e,t),JSON.stringify(n))}catch{}}function Vs(e){let t=Array.isArray(e)?e:String(e??``).split(/[\s,]+/),n=new Set,r=[];for(let e of t){let t=String(e??``).trim().slice(0,js);if(t&&!n.has(t.toLowerCase())&&(n.add(t.toLowerCase()),r.push(t),r.length===100))break}return r}function Hs(e){if(!e||typeof e!=`object`||Array.isArray(e))return{};let t=Object.entries(e).map(([e,t])=>[String(e).trim().toLowerCase(),t]).filter(([e,t])=>e.startsWith(`#`)&&e.length<=64&&Ls.includes(t)&&t!==`all`).slice(0,200);return Object.fromEntries(t)}function Us(e){try{return Is(localStorage.getItem(Rs(R.quitMessage,e))||``)}catch{return``}}function Ws(e=``){return{highlightWords:zs(R.highlightWords,e,[],ue),ignoredUsers:zs(R.ignoredUsers,e,[],Vs),channelNotifications:zs(R.channelNotifications,e,{},Hs),quitMessage:Us(e),nickColors:zs(R.nickColors,e,{},Fs),leftLobbies:zs(R.leftLobbies,e,[],Ns),autojoinChannels:zs(R.autojoinChannels,e,[],Ms)}}function Gs({storageScope:e=``,defaultQuitMessage:t=``}={}){return{storageScope:e,defaultQuitMessage:t,...Ws(e),nickColorHues:Ps,switchPreferenceScope(e){this.storageScope=e,Object.assign(this,Ws(e))},isHighlightedText(e){return me(e,this.nickname,this.highlightWords)},setHighlightWords(e,{sync:t=!0}={}){this.highlightWords=ue(e),Bs(R.highlightWords,this.storageScope,this.highlightWords),t&&this.markAccountSettingChanged?.(`highlight_words`)},addHighlightWords(e){this.setHighlightWords([...this.highlightWords,...ue(e)])},removeHighlightWord(e){let t=String(e??``).trim().toLowerCase();this.setHighlightWords(this.highlightWords.filter(e=>e.toLowerCase()!==t))},isIgnored(e){let t=String(e??``).toLowerCase();return this.ignoredUsers.some(e=>e.toLowerCase()===t)},setIgnoredUsers(e,{sync:t=!0}={}){this.ignoredUsers=Vs(e),Bs(R.ignoredUsers,this.storageScope,this.ignoredUsers),this.syncPushFilter?.(),t&&this.markAccountSettingChanged?.(`ignored_users`)},ignoreUser(e){return!e||this.isIgnored(e)?!1:(this.setIgnoredUsers([...this.ignoredUsers,e]),!0)},unignoreUser(e){if(!this.isIgnored(e))return!1;let t=String(e).toLowerCase();return this.setIgnoredUsers(this.ignoredUsers.filter(e=>e.toLowerCase()!==t)),!0},channelNotifyLevel(e){return e?.startsWith(`#`)&&this.channelNotifications[e.toLowerCase()]||`all`},setChannelNotifyLevel(e,t,{sync:n=!0}={}){if(!e?.startsWith(`#`)||!Ls.includes(t))return;let r={...this.channelNotifications};t===`all`?delete r[e.toLowerCase()]:r[e.toLowerCase()]=t,this.setChannelNotifications(r,{sync:n}),t===`mute`&&this.markTargetRead?.(e.toLowerCase()),this.emitUnreadState?.(),this.contextMenu&&(this.contextMenu.show=!1)},setChannelNotifications(e,{sync:t=!0}={}){this.channelNotifications=Hs(e),Bs(R.channelNotifications,this.storageScope,this.channelNotifications),this.syncPushFilter?.(),t&&this.markAccountSettingChanged?.(`channel_notifications`)},effectiveQuitMessage(){return this.quitMessage||this.defaultQuitMessage||`Avoid staring into the cosmic void. It might stare back at you.`},setQuitMessage(e,{sync:t=!0}={}){this.quitMessage=Is(e);try{let e=Rs(R.quitMessage,this.storageScope);this.quitMessage?localStorage.setItem(e,this.quitMessage):localStorage.removeItem(e)}catch{}this.socket?.setQuitMessage?.(this.effectiveQuitMessage()),t&&this.markAccountSettingChanged?.(`quit_message`)},customNickHue(e){let t=this.nickColors[String(e??``).toLowerCase()];return Number.isInteger(t)?t:null},setNickColor(e,t,{sync:n=!0}={}){let r=String(e??``).trim().toLowerCase();if(!r)return;let i={...this.nickColors};t==null?delete i[r]:i[r]=t,this.setNickColors(i,{sync:n})},setNickColors(e,{sync:t=!0}={}){this.nickColors=Fs(e),Bs(R.nickColors,this.storageScope,this.nickColors),t&&this.markAccountSettingChanged?.(`nick_colors`)},setAutojoinChannels(e,{sync:t=!0}={}){this.autojoinChannels=Ms(e),Bs(R.autojoinChannels,this.storageScope,this.autojoinChannels),t&&this.markAccountSettingChanged?.(`autojoin_channels`)},addAutojoinChannels(e){let t=Ms(e).filter(e=>!this.autojoinChannels.includes(e));this.setAutojoinChannels([...this.autojoinChannels,...t]),this.joinMissingAutojoinChannels?.()},removeAutojoinChannel(e){let t=String(e||``).toLowerCase();this.setAutojoinChannels(this.autojoinChannels.filter(e=>e!==t))},hasLeftLobby(e){return!!e&&this.leftLobbies.includes(String(e).toLowerCase())},setLeftLobbies(e,{sync:t=!0}={}){this.leftLobbies=Ns(e),Bs(R.leftLobbies,this.storageScope,this.leftLobbies),t&&this.markAccountSettingChanged?.(`left_lobbies`)},rememberLeftLobby(e,t){let n=String(e||``).toLowerCase();n&&this.hasLeftLobby(n)!==t&&this.setLeftLobbies(t?[...this.leftLobbies,n]:this.leftLobbies.filter(e=>e!==n))},handlePreferenceStorageEvent(e){if(!e?.key)return;let t=Object.entries(R).find(([,t])=>e.key===Rs(t,this.storageScope));t?this[t[0]]=Ws(this.storageScope)[t[0]]:this.applyDevicePreferenceChange?.(e.key,e.newValue)}}}var Ks=`chat.drafts`,qs=8e3;function Js(e,t=Date.now()){let n;try{n=JSON.parse(e||`{}`)}catch{return{}}return!n||typeof n!=`object`||Array.isArray(n)?{}:Object.fromEntries(Object.entries(n).filter(([e,n])=>e&&typeof n?.text==`string`&&n.text.trim()!==``&&Number.isFinite(n.at)&&t-n.at<=12096e5).sort((e,t)=>t[1].at-e[1].at).slice(0,50).map(([e,t])=>[e,t.text.slice(0,qs)]))}function Ys(e){let t=Object.entries(e).filter(([,e])=>e.text.trim()!==``).sort((e,t)=>t[1].at-e[1].at).slice(0,50).map(([e,t])=>[e,{text:t.text.slice(0,qs),at:t.at}]);return JSON.stringify(Object.fromEntries(t))}function Xs(e){try{return JSON.parse(localStorage.getItem(Rs(`chat.drafts`,e))||`{}`)||{}}catch{return{}}}function Zs(e){try{return Js(localStorage.getItem(Rs(Ks,e)))}catch{return{}}}function Qs({storageScope:e=``}={}){return{storageScope:e,channelDrafts:Zs(e),switchDraftScope(e){this.storageScope=e,this.channelDrafts=Zs(e)},saveDraft(e,t){if(!e)return;let n=String(t??``);n.trim()===``?delete this.channelDrafts[e]:this.channelDrafts[e]=n;let r=Xs(this.storageScope);n.trim()===``?delete r[e]:r[e]={text:n,at:Date.now()};try{localStorage.setItem(Rs(Ks,this.storageScope),Ys(r))}catch{}},clearDraft(e){this.saveDraft(e,``)},restoreCurrentDraft(){!this.newMessage&&this.currentChannel&&(this.newMessage=this.channelDrafts[this.currentChannel]||``,this.newMessage&&this.$nextTick?.(()=>this.autoGrowInput?.(this.$refs?.messageInput)))}}}var $s=2,ec=5e3;function tc(){return{historyPageSize:50,historyCursorByTarget:{},historyLoadingByTarget:{},historyRequestTypeByTarget:{},historyLoadedByTarget:{},historyBatchTargetById:{},historyExhaustedByTarget:{},historyReceivedByTarget:{},seenMessageKeysByTarget:{},_historyQueue:[],_historyInFlight:new Map,_historyRequestSeq:0,ensureSeenMessageBucket(e){return this.seenMessageKeysByTarget[e]||(this.seenMessageKeysByTarget[e]=new Set),this.seenMessageKeysByTarget[e]},getMessageDedupKey(e,t,n,r,i){if(i?.msgid)return`${e}|msgid|${i.msgid}`;let a=i?.time||``;return`${e}|${r?`notice`:`privmsg`}|${a}|${t}|${n}`},updateHistoryCursor(e,t){let n=t?.time;if(!n)return;let r=this.historyCursorByTarget[e];(!r||new Date(n)<new Date(r))&&(this.historyCursorByTarget[e]=n)},requestHistoryLatest(e,t=!1){this.isRegistered&&this.supportsChathistory&&e&&(this.historyLoadingByTarget[e]||(!this.historyLoadedByTarget[e]||t)&&(this.historyLoadingByTarget[e]=!0,this.historyRequestTypeByTarget[e]=`latest`,this.historyLoadedByTarget[e]=!0,this.isPriorityHistoryTarget(e)?this._historyQueue.unshift(e):this._historyQueue.push(e),this.pumpHistoryQueue()))},isPriorityHistoryTarget(e){return e===this.currentChannel||e===this._pendingActiveChannel},prioritizeHistory(e){let t=this._historyQueue.indexOf(e);t>0&&(this._historyQueue.splice(t,1),this._historyQueue.unshift(e))},pumpHistoryQueue(){for(;this._historyInFlight.size<$s&&this._historyQueue.length>0;){let e=this._historyQueue.shift(),t=++this._historyRequestSeq;this._historyInFlight.set(e,t),this.sendRaw(`CHATHISTORY LATEST ${e} * ${this.historyPageSize}`),setTimeout(()=>this.completeHistoryRequest(e,t),ec)}},completeHistoryRequest(e,t=null){let n=this._historyInFlight.get(e);n===void 0||t!==null&&n!==t||(this._historyInFlight.delete(e),this.historyLoadingByTarget[e]=!1,this.pumpHistoryQueue())},resetHistoryQueue(){this._historyQueue=[],this._historyInFlight=new Map},requestHistoryBefore(e){if(!this.isRegistered||!this.supportsChathistory||!e||this.historyLoadingByTarget[e]||this.historyExhaustedByTarget[e])return;let t=this.historyCursorByTarget[e];t&&(this.historyLoadingByTarget[e]=!0,this.historyRequestTypeByTarget[e]=`before`,this.sendRaw(`CHATHISTORY BEFORE ${e} timestamp=${t} ${this.historyPageSize}`),setTimeout(()=>{this.historyLoadingByTarget[e]=!1},ec))}}}function nc(e,t){if(!e||typeof e.value!=`string`)return!0;let{value:n,selectionStart:r,selectionEnd:i}=e;return r===i?t<0?n.lastIndexOf(`
`,r-1)===-1:n.indexOf(`
`,i)===-1:!1}function rc(){return{_inputHistory:{},_inputHistoryCursor:null,recordInputHistory(e,t){let n=String(t||``).trim();if(!e||!n)return;let r=this._inputHistory[e]||[];r[r.length-1]!==n&&r.push(n),r.length>50&&r.splice(0,r.length-50),this._inputHistory[e]=r,this._inputHistoryCursor=null},navigateInputHistory(e,t){if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||this.commandSuggestions?.length)return;let n=this.currentChannel,r=this._inputHistory[n]||[];if(!r.length||!nc(e.target,t))return;let i=this._inputHistoryCursor;if(i&&i.target!==n&&(i=null),t<0){if(i||={target:n,index:r.length,draft:this.newMessage},i.index===0){e.preventDefault();return}--i.index,this.newMessage=r[i.index]}else{if(!i)return;i.index+=1,i.index>=r.length?(this.newMessage=i.draft,i=null):this.newMessage=r[i.index]}e.preventDefault(),this._inputHistoryCursor=i,this.$nextTick?.(()=>{let e=this.$refs?.messageInput;if(!e)return;this.autoGrowInput?.(e);let t=e.value.length;e.setSelectionRange?.(t,t)})}}}var ic=`Server`,ac=/^((?:identify|register|passwd|password|ghost|recover|regain|drop|sadrop|saregister|resetpass)\b)(.*)$/i,oc=15e3,sc=1e3;function cc(e){let t=String(e||``),n=t.match(/^(PASS|OPER\s+\S+|AUTHENTICATE)\s+(.*)$/i);if(n)return`${n[1]} ********`;let r=t.match(/^(PRIVMSG\s+\S+\s+:?|NS\s+|NICKSERV\s+|CS\s+|CHANSERV\s+)(.*)$/i);if(r){let e=r[2].match(ac);if(e&&e[2].trim())return`${r[1]}${e[1]} ********`}return t}function lc(e){let t=Math.max(0,parseInt(e,10)||0),n=[];for(let[e,r]of[[`d`,86400],[`h`,3600],[`m`,60]])t>=r&&(n.push(`${Math.floor(t/r)}${e}`),t%=r);return n.push(`${t}s`),n.join(` `)}function uc(e){let t=parseInt(e,10);return Number.isFinite(t)&&t>0?new Date(t*1e3).toLocaleString():e}var dc={311:e=>[[`whois_user`,{nick:e[1],user:e[2],host:e[3],realname:e[5]||``}]],314:e=>[[`whowas_user`,{nick:e[1],user:e[2],host:e[3],realname:e[5]||``}]],312:e=>[[`whois_server`,{nick:e[1],server:e[2],info:e[3]?`(${e[3]})`:``}]],317:e=>[[`whois_idle`,{nick:e[1],idle:lc(e[2])}],e[3]&&/^\d+$/.test(e[3])?[`whois_signon`,{signon:uc(e[3])}]:null],319:e=>[[`whois_channels`,{nick:e[1],channels:e[2]||``}]],330:e=>[[`whois_account`,{nick:e[1],account:e[2]}]],301:e=>[[`whois_away`,{nick:e[1],message:e[2]||``}]],333:e=>[[`topic_set_by`,{channel:e[1],nick:e[2],date:uc(e[3])}]],329:e=>[[`channel_created`,{channel:e[1],date:uc(e[2])}]]};function fc(){return{serverWindowActivity:!1,_lastServerCommandAt:0,isServerWindow(e=this.currentChannel){return e===ic},isChatTarget(e=this.currentChannel){return!!e&&e!==`Server`},openServerWindow(){this.sidebarMode!==`channels`&&(this.isDirectMessageChannel(this.currentChannel)&&(this.lastDMBeforeChannel=this.currentChannel),this.sidebarMode=`channels`,this.selectedFriendName=``),this.messageManager.ensure(ic),this.switchChannel(ic),this.serverWindowActivity=!1},clearServerWindow(){let e=this.stores.messages.get()[ic];e&&(e.content=[])},addToServerWindow(e,{kind:t=`in`,from:n=``}={}){let r=String(e??``).replace(/\s+$/,``);if(!r.trim())return;this.messageManager.add(ic,{user:ic,text:r,from:n,serverKind:t,isSystem:!0,isAction:!1,isJoinPart:!1,timestamp:new Date().toLocaleTimeString(),_ts:Date.now()});let i=this.stores.messages.get()[ic];if(i.content.length>sc&&i.content.splice(0,i.content.length-sc),this.currentChannel===`Server`){this.isScrolledUp||this.scrollToBottom();return}let a=Date.now()-this._lastServerCommandAt<oc;(t===`notice`||t===`error`||t===`in`&&a)&&(this.serverWindowActivity=!0)},sendServerCommand(e){let t=String(e||``).trim();if(!t)return!1;this._lastServerCommandAt=Date.now();let n=this.sendRaw(t),r=cc(t);return this.addToServerWindow(n?r:`${r}  (${this.t(`server_not_connected`)})`,{kind:n?`out`:`error`}),n},sendCtcpRequest(e,t,n=``){let r=String(t||``).toUpperCase().replace(/[^A-Z0-9_-]/g,``),i=String(e||``).trim();if(!r||!i||/[\s\u0000-\u001F]/.test(i))return!1;let a=r===`PING`&&!n?String(Date.now()):String(n).replace(/[\u0000-\u001F]/g,``);this._lastServerCommandAt=Date.now();let o=this.sendRaw(`PRIVMSG ${i} :\u0001${r}${a?` ${a}`:``}\u0001`),s=this.t(`ctcp_sent`,{command:r,nick:i});return this.addToServerWindow(o?s:`${s}  (${this.t(`server_not_connected`)})`,{kind:o?`out`:`error`}),o},showCtcpReply(e,t,n){let r=n;if(t===`PING`&&/^\d{10,}$/.test(n)){let e=Math.max(0,Date.now()-Number(n))/1e3;r=this.t(`ctcp_ping_reply`,{seconds:e.toFixed(2)})}this.addToServerWindow(this.t(`ctcp_reply`,{command:t,nick:e,text:r}).trim(),{kind:`notice`,from:e})},sendServiceCommand(e,t){let n=String(t||``).trim();n?this.sendServerCommand(`PRIVMSG ${e} :${n}`):this.addToServerWindow(this.t(`server_command_usage`,{usage:`/${e.slice(0,2).toLowerCase()} <…>`}),{kind:`error`})},logServerLine(e,t){if(!e.fromServer||e.command===`BATCH`||e.tags?.batch&&this.activeBatches?.has(e.tags.batch))return;let n=/^\d{3}$/.test(e.command);if(n&&t.has(e.command))return;let r;if(r=n?this.formatServerNumeric(e):[`FAIL`,`WARN`,`NOTE`].includes(e.command)?`${e.command} ${e.params.slice(0,2).join(` `)}: ${e.params[e.params.length-1]||``}`:e.hasTrailing?e.params[e.params.length-1]:``,!r||r===`-`||r===`*`)return;let i=parseInt(e.command,10),a=e.command===`FAIL`||n&&i>=400&&i<600?`error`:e.command===`NOTICE`?`notice`:`in`;this.addToServerWindow(r,{kind:a,from:n||e.command===`NOTICE`?``:e.command})},formatServerNumeric(e){let t=dc[e.command];return!t||e.params.length<3?e.params.slice(1).join(` `):t(e.params).filter(Boolean).map(([e,t])=>this.t(e,t).trim()).join(``)},serverLinePrefix(e){return e.serverKind===`out`?`→`:e.serverKind===`error`?`!`:e.from?`-${e.from}-`:`*`}}}var pc=new Set(`331.332.333.315.352.353.354.366.367.348.346.376.760.761.762.764.765.766.767.768.769.770.771.772.774.775`.split(`.`)),mc={q:`~`,a:`&`,o:`@`,h:`%`,v:`+`},hc=[`*`,`-`,`none`,`null`,`undefined`,`(none)`,`N/A`],gc={401:e=>`${e[1]}: No such nick/channel`,403:e=>`${e[1]}: No such channel`,404:e=>`Cannot send to ${e[1]}`,421:e=>`Unknown command: ${e[1]}`,471:e=>`Cannot join ${e[1]}: Channel is full`,473:e=>`Cannot join ${e[1]}: Invite only`,474:e=>`Cannot join ${e[1]}: You are banned`,475:e=>`Cannot join ${e[1]}: Bad channel key`,482:e=>`You're not a channel operator on ${e[1]}`},_c=1e4,vc=10,yc=600,bc=8e3,xc=3,Sc=3e5,Cc={avatar:`syncOwnAvatar`,status:`syncOwnStatus`,playing:`syncOwnPlaying`,voice:`syncOwnVoice`};function wc(e,t,n,r){if(n===`avatar`)e.setUserAvatar(t,r);else if(n===`status`)e.setUserStatus(t,r);else if(n===`voice`)e.activeUsers.setVoice(t,r),z(t,e.nickname)&&e.ownVoiceMarkerChanged?.(r);else if(n===`playing`){let n=r?Ec(r):``;n?e.activeUsers.setPlaying(t,n):e.activeUsers.clearPlaying(t)}}var Tc={JOIN:e=>{let t=e.params[1]&&e.params[1]!==`*`?` (${e.params[1]})`:``;return{text:`${e.nick}${t} has joined the channel`,type:`join`}},PART:e=>({text:`${e.nick} has left the channel`,type:`part`}),QUIT:e=>({text:`${e.nick} has quit${e.params[0]?` (${e.params[0]})`:``}`,type:`part`}),KICK:e=>e.params[1]?{text:`${e.params[1]} was kicked by ${e.nick}${e.params[2]?` (${e.params[2]})`:``}`,type:`kick`,self:!1}:null,NICK:e=>e.params[0]?{text:`${e.nick} is now known as ${e.params[0]}`,type:`nick`,self:!1}:null,TOPIC:e=>({text:`${e.nick} changed the topic to: ${e.params[1]||``}`,type:`info`,self:!1}),MODE:()=>null};function z(e,t){return typeof e==`string`&&typeof t==`string`&&e.toLowerCase()===t.toLowerCase()}function Ec(e){let t=typeof e==`string`?e.trim():``;return hc.includes(t)?``:t}function Dc(e){let t=new Date(e),n=new Date;return t.toDateString()===n.toDateString()?t.toLocaleTimeString():`${t.toLocaleDateString(void 0,{day:`2-digit`,month:`2-digit`,year:`numeric`})} ${t.toLocaleTimeString()}`}function Oc(e,t){let n=t[2];n&&!e.some(e=>e.mask===n)&&e.push({mask:n,by:t[3]||``,at:t[4]||``})}var kc={"001"(e){this.nickname=e.params[0],this.isRegistered=!0,this._desiredNick=null,this._nickRetry=0,this.setConnectionState(`connected`),this.connectionStatus=`Connected`,this.historyLoadedByTarget={},this.historyLoadingByTarget={},this.resetHistoryQueue(),this._joinedChannels=new Set,this._pendingMetadataSync.clear(),this._metadataSyncQueue=[],this.resetMetadataRetries(),this.supportsMetadata&&this.sendRaw(`METADATA * SUB ${this.metadataKeys().join(` `)}`);let t=this.channelsToJoinOnConnect();this._bulkJoining=(this._bulkJoining||0)+t.length,this.scheduleBulkJoinTimeout(),this.joinChannels(t),this.syncFriendMonitor?.(),this.notifyHost(`update-profile-name`,{nickname:this.nickname}),this.privateMessageKeys.forEach(e=>this.requestHistoryLatest(e)),this.supportsMetadata&&(this.publishesNowPlaying&&this.syncOwnPlaying(),this.loadOwnAvatar?.(),this.syncOwnVoice?.()),this.flushOutgoingQueue(),this.checkAlwaysOnPrompt?.(),this.refreshAccountSettings?.()},BATCH(e){let t=e.params[0]||``,n=t.slice(1);if(t.startsWith(`+`)){let t=e.params[1],r=e.params[2]||null;t===`chathistory`&&(this.activeBatches.add(n),r&&(this.historyBatchTargetById[n]=r)),t===`draft/multiline`&&(this.multilineBatchById[n]={target:r,source:e.source,sender:e.nick,tags:e.tags,isNotice:!1,segments:[]});return}if(!t.startsWith(`-`))return;if(this.multilineBatchById[n]){this.assembleMultilineBatch(n),delete this.multilineBatchById[n];return}if(!this.activeBatches.has(n))return;this.activeBatches.delete(n);let r=this.resolveTargetKey(this.historyBatchTargetById[n]||this.currentChannel);delete this.historyBatchTargetById[n],r&&this.finishHistoryBatch(r)},321(){this.serverChannels=[],this.isListing=!0},322(e){let t=e.params[1];t&&!t.startsWith(`&`)&&this.serverChannels.push({name:t,users:parseInt(e.params[2],10)||0,topic:e.params[3]||``})},323(){this.isListing=!1,this.updateStatus(`Received ${this.serverChannels.length} channels from server.`)},324(e){(e.params[1]||``).toLowerCase()===this.currentChannel&&(this.stores.channelManagement.get().channelModesDraft=e.params.slice(2).join(` `).trim(),this.parseChannelModeState(e.params[2]||``))},367(e){(e.params[1]||``).toLowerCase()===this.currentChannel&&Oc(this.stores.channelManagement.get().banList,e.params)},348(e){(e.params[1]||``).toLowerCase()===this.currentChannel&&Oc(this.stores.channelManagement.get().exceptionList,e.params)},346(e){(e.params[1]||``).toLowerCase()===this.currentChannel&&Oc(this.stores.channelManagement.get().invexList,e.params)},730(e){this.applyMonitorPresence(e,`online`)},731(e){this.applyMonitorPresence(e,`offline`)},332(e){this.channelManager.setTopic((e.params[1]||``).toLowerCase(),e.params[2]||``)},TOPIC(e){this.channelManager.setTopic((e.params[0]||``).toLowerCase(),e.params[1]||``)},352(e){let t=(e.params[1]||``).toLowerCase(),n=e.params[5],r=e.params[6]||``;if(!t.startsWith(`#`)||!n)return;this.noteWhoFlags(n,r);let i=r.includes(`G`),a=[`~`,`&`,`@`,`%`,`+`].find(e=>r.includes(e))||``,o=(e.params[7]||``).split(` `).slice(1).join(` `);this.activeUsers.addUser(t,n,null,o),this.updateFriendPresence?.(n,i?`away`:`online`);let s=this.activeUsers.getUser(t,n);s&&(s.role=a,s.prefixModes=a?[a]:[],s.isAway=i,s.isOnline=!i),this.activeUsers.sort(t)},353(e){let t=(e.params[2]||``).toLowerCase(),n=(e.params[3]||``).split(` `).filter(Boolean);this.activeUsers.updateUserList(t,n)},366(e){let t=(e.params[1]||``).toLowerCase();this.activeUsers.sort(t),this._pendingMetadataSync.delete(t)&&this.supportsMetadata&&(this._metadataSyncQueue.push(t),this.scheduleMetadataSync())},MODE(e){let t=(e.params[0]||``).toLowerCase();if(!t.startsWith(`#`))return;let n=e.params[1]||``,r=2,i=`+`,a=(e,t)=>[`b`,`e`,`I`,`k`].includes(e)?!0:[`l`,`j`,`f`].includes(e)?t===`+`:!1;for(let o of n)if(o===`+`||o===`-`)i=o;else if(mc[o]){let n=e.params[r++];n&&this.activeUsers.updateUserRole(t,n,mc[o],i===`+`)}else a(o,i)&&r++;t===this.currentChannel&&this.parseChannelModeState(n),this.activeUsers.sort(t)},JOIN(e){let t=e.nick,n=(e.params[0]||``).toLowerCase(),r=e.params[1]&&e.params[1]!==`*`?e.params[1]:null;n&&(z(t,this.nickname)&&this.activeUsers.clear(n),this.activeUsers.addUser(n,t,r,e.params[2]||``),this.updateFriendPresence?.(t,`online`),z(t,this.nickname)&&this._ownPlaying&&this.activeUsers.setPlaying(t,this._ownPlaying),z(t,this.nickname)?(this.availableChannels.some(e=>e.toLowerCase()===n)||(this.availableChannels.push(n),this.scheduleChatStateSave?.()),this.availableChannels.sort(),this._joinedChannels.add(n),n===this.lobbyChannel?.toLowerCase()&&this.rememberLeftLobby(n,!1),this._pendingMetadataSync.add(n),this.requestHistoryLatest(n),this._bulkJoining>0?(this._bulkJoining--,n===this._pendingActiveChannel&&(this._pendingActiveChannel=null,this.switchChannel(n)),this._bulkJoining===0&&this.finishBulkJoin()):this._requestedJoins.delete(n)&&this.switchChannel(n)):(this.supportsMetadata&&this.hasFeature(`profiles`)&&!this.avatarUrl(t)&&this.sendRaw(`METADATA ${t} GET avatar`),this.addSystemLine(n,`${t}${r?` (${r})`:``} has joined the channel`,{user:t,isJoinPart:!0,joinPartType:`join`,tags:e.tags}),n===this.currentChannel&&this.updatePresence()),this.activeUsers.sort(n))},PART(e){let t=e.nick,n=(e.params[0]||``).toLowerCase();z(t,this.nickname)?(this._joinedChannels.delete(n),this.voiceChannelLeft?.(n),this.forgetPartedChannel(n)):this.addSystemLine(n,`${t} has left the channel`,{user:t,isJoinPart:!0,joinPartType:`part`,tags:e.tags}),this.activeUsers.removeUser(n,t),this.isUserInAnyChannel(t)||this.activeUsers.clearPlaying(t)},KICK(e){let t=(e.params[0]||``).toLowerCase(),n=e.params[1];if(!n)return;let r=e.params[2]?` (${e.params[2]})`:``;this.addSystemLine(t,`${n} was kicked by ${e.nick}${r}`,{isJoinPart:!0,joinPartType:`kick`,tags:e.tags}),this.activeUsers.removeUser(t,n),this.activeUsers.sort(t),z(n,this.nickname)&&(this._joinedChannels.delete(t),this.voiceChannelLeft?.(t),this.availableChannels=this.availableChannels.filter(e=>e!==t),this.currentChannel===t&&this.switchChannel(this.availableChannels[0]||`Server`),this.scheduleChatStateSave?.())},QUIT(e){let t=e.nick,n=e.params[0]?` (${e.params[0]})`:``;Object.keys(this.reactiveUsers).forEach(r=>{this.activeUsers.getUser(r,t)&&(z(t,this.nickname)||this.addSystemLine(r,`${t} has quit${n}`,{user:t,isJoinPart:!0,joinPartType:`part`,tags:e.tags}),this.activeUsers.removeUser(r,t))}),this.activeUsers.clearPlaying(t),this.activeUsers.setVoice(t,``),this.updateFriendPresence?.(t,`offline`)},"005"(e){for(let t of e.params.slice(1,e.hasTrailing?-1:void 0))t.startsWith(`CLIENTTAGDENY=`)&&this.applyClientTagDeny(t.slice(14)),t.startsWith(`VAPID=`)&&this.applyVapidKey?.(t.slice(6)),t.startsWith(`BOT=`)&&(this.botModeChar=t.slice(4).charAt(0))},REDACT(e){this.handleRedact(e)},MARKREAD(e){this.applyReadMarker(e.params[0],e.params[1])},FAIL(e){e.params[0]===`REDACT`?this.handleRedactFailure(e):e.params[0]===`WEBPUSH`?this.addToServerWindow?.(`Push: ${e.params.at(-1)}`):e.params.includes(`NICKNAME_RESERVED`)&&this.updateStatus(`Der Name ist bereits in Verwendung.`)},400(){this.updateStatus(`You must use your account name as your nickname.`)},432(e){this.updateStatus(`Nickname ${e.params[1]} is invalid.`)},433(e){let t=e.params[1]||this.nickname;if(this._desiredNick=this._desiredNick||t,this._nickRetry=(this._nickRetry||0)+1,this._nickRetry>5){this.updateStatus(`Nickname ${this._desiredNick} is in use.`);return}let n=`${this._desiredNick}${this._nickRetry===1?`_`:this._nickRetry}`;this.sendRaw(`NICK ${n}`),this.updateStatus(`Nickname ${t} is in use, trying ${n}...`)},NICK(e){let t=e.nick,n=e.params[0];n&&(Object.keys(this.reactiveUsers).filter(e=>this.activeUsers.getUser(e,t)).forEach(r=>this.addSystemLine(r,`${t} is now known as ${n}`,{joinPartType:`nick`,tags:e.tags})),this.activeUsers.renameUser(t,n),this.renameBot(t,n),this.renameUserAvatar(t,n),this.renameUserStatus?.(t,n),z(t,this.nickname)&&(this.nickname=n,this.updateStatus(`Nickname changed to ${n}`),this.notifyHost(`update-profile-name`,{nickname:n})))},AWAY(e){let t=e.params.length>0;this.activeUsers.setAway(e.nick,t),this.activeUsers.setOnline(e.nick,!t),this.updateFriendPresence?.(e.nick,t?`away`:`online`)},301(e){this.activeUsers.setAway(e.params[1],!0)},305(){this.activeUsers.setAway(this.nickname,!1)},306(){this.activeUsers.setAway(this.nickname,!0)},761(e){let t=e.params[1]||``,n=(e.params[2]||``).toLowerCase();t&&t!==`*`&&!t.startsWith(`#`)&&wc(this,t,n,e.params[4]??``)},766(e){let t=e.params[1]||``;t&&!t.startsWith(`#`)&&wc(this,t,(e.params[2]||``).toLowerCase(),``)},774(e){let t=e.params[1]||``;if(!t)return;t===`*`&&this.metadataVersion>=3&&(t=`*ALL`);let n=parseInt(e.params[2],10);this.scheduleMetadataRetry(`SYNC ${t}`,Number.isNaN(n)?vc:n,()=>this.sendRaw(`METADATA ${t} SYNC`))},775(e){let t=parseInt(e.params[1],10),n=e.params[2]||``,r=(e.params[3]||``).toUpperCase(),i=e.params.slice(4);if(!n||!r)return;let a=Number.isNaN(t)?vc:t,o=(i[0]||``).toLowerCase();if((r===`SET`||r===`CLEAR`)&&(n===`*`||z(n,this.nickname))&&Cc[o]){this.scheduleMetadataRetry(`SET ${o}`,a,()=>this[Cc[o]]?.());return}let s=i.length?i[i.length-1]:null,c=s!==null&&(s===``||s.includes(` `)||s.startsWith(`:`)),l=[`METADATA`,n,r,...c?i.slice(0,-1):i].join(` `)+(c?` :${s}`:``);this.scheduleMetadataRetry(`${r} ${n} ${i.join(` `)}`,a,()=>this.sendRaw(l))},METADATA(e){let t=e.params[0]||``,n=(e.params[1]||``).toLowerCase(),r=e.params[3]??``,i=``;e.nick&&!e.fromServer?i=e.nick:t&&t!==`*`&&!t.startsWith(`#`)&&(i=t),i&&wc(this,i,n,r)},TAGMSG(e){let t=e.nick,n=e.params[0]||``,r=z(t,this.nickname),i=this.resolveTargetKey(n.startsWith(`#`)||r?n:t);if(this.handleReactionTag(e,i)||this.handleCallTag?.(e,r))return;let a=e.tags[`+typing`];if(!t||!a||r||e.tags.batch&&this.activeBatches.has(e.tags.batch))return;let o=`${i}|${t}`;clearTimeout(this._typingTimers.get(o)),a===`active`?(this.activeUsers.setTyping(i,t,!0),this._typingTimers.set(o,setTimeout(()=>{this.activeUsers.setTyping(i,t,!1),this._typingTimers.delete(o)},6e3))):(a===`done`||a===`paused`)&&(this._typingTimers.delete(o),this.activeUsers.setTyping(i,t,!1))},PRIVMSG(e){this.handleChatMessage(e,!1)},NOTICE(e){this.handleChatMessage(e,!0)}};function Ac(){return{_typingTimers:new Map,_pendingMetadataSync:new Set,_metadataSyncQueue:[],_metadataSyncTimer:null,_metadataRetries:new Map,_lobbyJoinDeferred:!1,_lobbySettled:!1,metadataKeys(){return[`playing`,`status`,...this.hasFeature(`profiles`)?[`avatar`]:[],...this.hasFeature(`voice`)?[`voice`]:[]]},channelsToJoinOnConnect(){let e=(this.autojoinChannels||[]).filter(e=>!this.availableChannels.includes(e));this.availableChannels=[...this.availableChannels,...e];let t=this.lobbyChannel;return t&&this.autojoinChannels?.includes(t)||!t||!this.availableChannels.includes(t)?[...this.availableChannels]:this.hasLeftLobby(t)?(this.dropLeftLobby(),[...this.availableChannels]):this.syncsWithAccount?.()&&!this._lobbySettled?(this._lobbyJoinDeferred=!0,clearTimeout(this._lobbySettleTimer),this._lobbySettleTimer=setTimeout(()=>this.settleLobby(),bc),this.availableChannels.filter(e=>e!==t)):[...this.availableChannels]},settleLobby(){this._lobbySettled=!0,clearTimeout(this._lobbySettleTimer),this.joinMissingAutojoinChannels();let e=this.lobbyChannel,t=this._lobbyJoinDeferred;this._lobbyJoinDeferred=!1,e&&(this.hasLeftLobby(e)&&!this.autojoinChannels?.includes(e)?this._joinedChannels?.has(e)||this.dropLeftLobby():t&&this.isRegistered&&!this._joinedChannels?.has(e)&&this.joinChannels([e]))},joinMissingAutojoinChannels(){if(!this.isRegistered)return;let e=(this.autojoinChannels||[]).filter(e=>!this._joinedChannels?.has(e)&&!this.availableChannels.includes(e));e.length&&(this.availableChannels=[...this.availableChannels,...e],this.joinChannels(e))},dropLeftLobby(){let e=this.lobbyChannel;if(this.availableChannels=this.availableChannels.filter(t=>t!==e),this.currentChannel===e){let e=this.availableChannels.find(e=>e.startsWith(`#`));e?this.switchChannel(e):this.currentChannel=null}},scheduleMetadataRetry(e,t,n){let r=this._metadataRetries.get(e)||{attempts:0,timer:null,sentAt:0};r.timer||(Date.now()-r.sentAt>Sc&&(r.attempts=0),r.attempts>=xc||(r.attempts++,r.timer=setTimeout(()=>{r.timer=null,r.sentAt=Date.now(),this.supportsMetadata&&this.canSendChat()&&n()},Math.max(0,t)*1e3),this._metadataRetries.set(e,r)))},resetMetadataRetries(){this._metadataRetries.forEach(e=>clearTimeout(e.timer)),this._metadataRetries=new Map},scheduleMetadataSync(){!this._metadataSyncTimer&&this._metadataSyncQueue.length&&(this._metadataSyncTimer=setTimeout(()=>{this._metadataSyncTimer=null,this.sendNextMetadataSync(),this.scheduleMetadataSync()},yc))},sendNextMetadataSync(){let e=this._metadataSyncQueue.indexOf(this.currentChannel),[t]=this._metadataSyncQueue.splice(Math.max(e,0),1);t&&this.canSendChat()&&this.sendRaw(`METADATA ${t} SYNC`)},handleMessage(e){let t=i(String(e.data||``).trim());if(!t.command)return;if(t.command===`PING`){this.sendRaw(`PONG :${t.params[0]||``}`);return}if(this.noteBotTag(t),t.command===`FAIL`&&t.params[0]===`METADATA`&&t.params[1]===`KEY_NOT_SET`)return;let n=t.command===`METADATA`;if(this.consumeProfileWhois?.(t))return;n||this.logServerLine(t,pc);let r=gc[t.command];r?this.updateStatus(r(t.params)):Tc[t.command]&&this.activeBatches.has(t.tags.batch)?this.handleHistoryEvent(t):kc[t.command]?.call(this,t)},handleHistoryEvent(e){let t=e.tags.batch,n=this.resolveTargetKey(this.historyBatchTargetById[t]||e.params[0]);if(!n)return;this.updateHistoryCursor(n,e.tags);let r=Tc[e.command](e);if(!r||r.self!==!1&&z(e.nick,this.nickname)||this.isSystemLineSeen(n,e.tags))return;let i=e.tags.time?Date.parse(e.tags.time):NaN,a=Number.isFinite(i)?i:Date.now();this.messageManager.bufferAdd(n,{user:e.nick||`System`,text:r.text,isAction:!0,isJoinPart:!0,isSystem:!0,isHistorical:!0,joinPartType:r.type,msgid:e.tags.msgid||null,timestamp:Dc(a),_ts:a})},isSystemLineSeen(e,t){if(!t?.msgid)return!1;let n=this.ensureSeenMessageBucket(e),r=this.getMessageDedupKey(e,``,``,!1,t);return n.has(r)?!0:(n.add(r),!1)},resolveTargetKey(e){return e&&(e.startsWith(`#`)?e.toLowerCase():e===`Server`?e:this.messageManager.keys().find(t=>!t.startsWith(`#`)&&t.toLowerCase()===e.toLowerCase())||e)},hasOpenQuery(e){return this.messageManager.keys().some(t=>z(t,e))},isUserInAnyChannel(e){return Object.keys(this.reactiveUsers).some(t=>this.activeUsers.getUser(t,e))},applyMonitorPresence(e,t){(e.params[e.params.length-1]||``).split(`,`).forEach(e=>{let n=e.split(`!`)[0].trim();n&&this.updateFriendPresence?.(n,t)})},addSystemLine(e,t,{user:n=`System`,isJoinPart:r=!1,joinPartType:i=`info`,tags:a=null}={}){e&&(this.isSystemLineSeen(e,a)||(this.messageManager.add(e,{user:n,text:t,isAction:!0,isJoinPart:!0,isSystem:!0,joinPartType:i||(r?`join`:`info`),msgid:a?.msgid||null,timestamp:new Date().toLocaleTimeString(),_ts:Date.now()}),e===this.currentChannel&&!this.isScrolledUp&&this.scrollToBottom()))},scheduleBulkJoinTimeout(){clearTimeout(this._bulkJoinTimer),this._bulkJoinTimer=setTimeout(()=>{this._bulkJoining>0&&(this._bulkJoining=0,this.finishBulkJoin())},_c)},finishBulkJoin(){if(clearTimeout(this._bulkJoinTimer),!this.applyPendingPushTarget?.()){let e=this._pendingActiveChannel;this._pendingActiveChannel=null,e&&this.availableChannels.some(t=>t.toLowerCase()===e)&&this.switchChannel(e)}this.showPendingShare?.()},finishHistoryBatch(e){let t=this.historyRequestTypeByTarget[e]||`latest`,n=this.$refs.chatMessages||document.querySelector(`.chat-messages`),r=n?.scrollHeight||0,i=n?.scrollTop||0;this.historyLoadingByTarget[e]=!1,this.historyReceivedByTarget[e]=!0,t===`latest`&&this.completeHistoryRequest(e);let a=this.messageManager.flushBuffer(e);this.applyOrphanAnnotations(e,a),a.length===0?t===`before`&&(this.historyExhaustedByTarget[e]=!0):(this.isTargetVisible(e)?this.unreadMarkerByChannel[e]??this.placeUnreadMarker(e):this.recountUnread(e),this.$nextTick(()=>requestAnimationFrame(()=>{if(e!==this.currentChannel)return;let n=this.$refs.chatMessages||document.querySelector(`.chat-messages`);n&&(t===`before`?n.scrollTop=i+(n.scrollHeight-r):this.isScrolledUp||this.scrollToUnreadOrBottom(e))})))},handleChatMessage(e,t){let n=e.tags.batch,r=n?this.multilineBatchById[n]:null;if(r){r.isNotice=t,r.segments.push({text:e.params[1]??``,concat:Object.prototype.hasOwnProperty.call(e.tags,`draft/multiline-concat`)});return}let i=e.nick;if(!i||e.fromServer&&t)return;let a=e.params[0]||``,o=!!(n&&this.activeBatches.has(n)),s=e.params[1]??``;if(o||this.updateFriendPresence?.(i,`online`),s.startsWith(``)){s=s.replace(/^\u0001|\u0001$/g,``);let e=s.split(` `)[0].toUpperCase(),n=s.slice(e.length).trim(),r=z(a,this.nickname)&&!o&&!z(i,this.nickname);if(t){r&&e!==`ACTION`&&this.showCtcpReply?.(i,e,n);return}if(e===`PING`){r&&this.sendRaw(`NOTICE ${i} :\u0001PING${n?` ${n.slice(0,64)}`:``}\u0001`);return}if(e===`TIME`){r&&this.sendRaw(`NOTICE ${i} :\u0001TIME ${new Date().toString()}\u0001`);return}if(e===`AVATAR`){!t&&s.toUpperCase()===`AVATAR`&&z(a,this.nickname)&&!o&&this.ownAvatarUrl&&this.hasFeature(`profiles`)&&this.sendRaw(`NOTICE ${i} :\u0001AVATAR ${this.ownAvatarUrl}\u0001`);return}if(e===`VERSION`){!t&&s.toUpperCase()===`VERSION`&&z(a,this.nickname)&&!o&&this.sendRaw(`NOTICE ${i} :\u0001VERSION ${this.ctcpVersionString}\u0001`);return}if(e!==`ACTION`)return}if(this.ignoredUsers.some(e=>z(e,i)))return;let c=s.startsWith(`ACTION `);c&&(s=s.substring(7));let l=z(a,this.nickname),u=z(i,this.nickname),d=l&&Ae(i)?i:u&&Ae(a)?a:null;if(d&&!this.hasOpenQuery(d)){!o&&!u&&this.addToServerWindow(c?`${i} ${s}`:s,{kind:`notice`,from:i});return}let f=this.resolveTargetKey(l?i:a);if(u&&!o&&this.consumeEcho(f,s,c,e.tags))return;if(!o){let e=`${f}|${i}`;clearTimeout(this._typingTimers.get(e)),this._typingTimers.delete(e),this.activeUsers.setTyping(f,i,!1)}let p=this.getMessageDedupKey(f,i,s,t,e.tags),m=this.ensureSeenMessageBucket(f);if(m.has(p)||(m.add(p),o&&m.has(`${f}|text|${i}|${s}`)))return;let h=e.tags.time?Date.parse(e.tags.time):NaN,g=Number.isFinite(h)?h:Date.now(),_={user:i,text:s,isAction:c,isNotice:t,isJoinPart:!1,timestamp:Dc(g),_ts:g,msgid:e.tags.msgid||null,replyTo:e.tags[`+draft/reply`]||e.tags[`+reply`]||null,nickColor:this.getNickColor(i),isHistorical:o};if(o){this.updateHistoryCursor(f,e.tags),this.messageManager.bufferAdd(f,_);return}let v=this.messageManager.add(f,_);this.applyOrphanAnnotations(f,[v]);let y=this.isTargetVisible(f),b=!u&&!l&&this.isHighlightedText(s),x=this.channelNotifyLevel(f),ee=x===`mute`,S=!ee&&(x===`all`||b||l);y&&this.scheduleReadMarker(f),b&&!y&&!ee&&(this.mentionsByChannel[f]=(this.mentionsByChannel[f]||0)+1,this.hasMentions=!0,this.mentionCount++,this.notifyMention(i,f,s)),!u&&S&&this.notifyHost(`incoming-message`,{sender:i,channel:f,text:s,isDm:l,isMention:b}),f===this.currentChannel&&(this.isScrolledUp?u||this.newWhileScrolledUp++:this.scrollToBottom()),S&&!document.hasFocus()&&this.notifyHost(`unread-update`,{hasUnread:!0}),u||y||ee||(f===this.currentChannel&&this.unreadMarkerByChannel[f]==null&&(this.unreadMarkerByChannel[f]=v.id),this.unreadMessages[f]=(this.unreadMessages[f]||0)+1),l&&!u&&this.scheduleChatStateSave?.(),this.emitUnreadState()},assembleMultilineBatch(e){let t=this.multilineBatchById[e];if(!t||t.segments.length===0)return;let n=t.segments.map((e,t)=>(t===0||e.concat?``:`
`)+e.text).join(``),r={...t.tags};r.batch&&!this.activeBatches.has(r.batch)&&delete r.batch,this.handleChatMessage({raw:``,tags:r,source:t.source,nick:t.sender,fromServer:!1,command:t.isNotice?`NOTICE`:`PRIVMSG`,params:[t.target,n],hasTrailing:!0},t.isNotice)}}}var jc=[`👍`,`❤️`,`😂`,`😮`,`😢`,`🎉`],Mc=32,Nc=2e3,Pc=200,Fc=6e5,Ic=4e3,Lc=4e3;function Rc(e,t){return typeof e==`string`&&typeof t==`string`&&e.toLowerCase()===t.toLowerCase()}function zc(){return{replyingTo:null,reactionPicker:{show:!1,x:0,y:0,target:null,msgid:null},clientTagDeny:{all:!1,denied:[],allowed:[]},pendingDeleteId:null,_pendingDeleteTimer:null,_pendingEchoes:[],_orphanAnnotations:new Map,canUseClientTag(e){if(!this.supportsMessageTags)return!1;let t=this.clientTagDeny;return t.all?t.allowed.includes(e):!t.denied.includes(e)},applyClientTagDeny(e){let t={all:!1,denied:[],allowed:[]};String(e||``).split(`,`).filter(Boolean).forEach(e=>{e===`*`?t.all=!0:e.startsWith(`-`)?t.allowed.push(e.slice(1)):t.denied.push(e)}),this.clientTagDeny=t},canReact(){return this.canUseClientTag(`draft/react`)&&this.canUseClientTag(`draft/reply`)},canReply(){return this.canUseClientTag(`draft/reply`)},canRedact(){return!!this.supportsRedaction},isOwnMessage(e){return Rc(e?.user,this.nickname)},isActionableMessage(e){return!!e?.msgid&&!e.redacted&&!e.isSystem&&!e.isJoinPart&&this.isChatTarget(this.currentChannel)},canReactTo(e){return this.canReact()&&this.isActionableMessage(e)},canReplyTo(e){return this.canReply()&&this.isActionableMessage(e)},canDelete(e){return this.canRedact()&&this.isActionableMessage(e)&&this.isOwnMessage(e)&&!e.deleting},hasMessageActions(e){return this.canReactTo(e)||this.canReplyTo(e)||this.canDelete(e)||!!this.canReportMessage?.(e)},findMessageByMsgid(e,t){if(!e||!t)return null;let n=this.messageManager.get(e);for(let e=n.length-1;e>=0;e--)if(n[e].msgid===t)return n[e];return null},annotateMessage(e,t,n){let r=this.findMessageByMsgid(e,t);if(r){this.applyAnnotation(r,n);return}let i=`${e}|${t}`,a=this._orphanAnnotations.get(i)||[];a.push(n),this._orphanAnnotations.set(i,a),this._orphanAnnotations.size>Nc&&this._orphanAnnotations.delete(this._orphanAnnotations.keys().next().value)},applyOrphanAnnotations(e,t){if(this._orphanAnnotations.size!==0)for(let n of t){if(!n?.msgid)continue;let t=`${e}|${n.msgid}`,r=this._orphanAnnotations.get(t);r&&(this._orphanAnnotations.delete(t),r.forEach(e=>this.applyAnnotation(n,e)))}},applyAnnotation(e,t){t.type===`redact`?this.markRedacted(e):t.type===`react`&&this.applyReaction(e,t.emoji,t.nick,t.add)},applyReaction(e,t,n,r){if(e.redacted)return;let i=Array.isArray(e.reactions)?e.reactions:[],a=i.find(e=>e.emoji===t);r?(a||(a={emoji:t,nicks:[]},i.push(a)),a.nicks.some(e=>Rc(e,n))||a.nicks.push(n)):a&&(a.nicks=a.nicks.filter(e=>!Rc(e,n))),e.reactions=i.filter(e=>e.nicks.length>0)},hasReacted(e){return e.nicks.some(e=>Rc(e,this.nickname))},reactionTitle(e){return`${e.nicks.join(`, `)} – ${e.emoji}`},toggleReaction(e,t){if(!this.canReactTo(e)||!t)return;let r=this.currentChannel,i=(e.reactions||[]).find(e=>e.emoji===t),a=!(i&&this.hasReacted(i)),o=a?`+draft/react`:`+draft/unreact`;this.sendRaw(`@+draft/reply=${n(e.msgid)};${o}=${n(t)} TAGMSG ${r}`)&&this.applyReaction(e,t,this.nickname,a)},handleReactionTag(e,t){let n=e.tags[`+draft/react`]??e.tags[`+react`],r=e.tags[`+draft/unreact`],i=n??r,a=e.tags[`+draft/reply`]??e.tags[`+reply`];return i!==void 0&&(!i||!a||i.length>Mc||!e.nick||this.ignoredUsers.some(t=>Rc(t,e.nick))||this.annotateMessage(t,a,{type:`react`,emoji:i,nick:e.nick,add:n!==void 0}),!0)},openReactionPicker(e,t){if(!this.canReactTo(e))return;let n=t.currentTarget.getBoundingClientRect();this.reactionPicker={show:!0,x:Math.max(8,Math.min(n.right-320,window.innerWidth-320-8)),y:n.top-360-6>8?n.top-360-6:Math.min(n.bottom+6,window.innerHeight-360-8),target:this.currentChannel,msgid:e.msgid}},closeReactionPicker(){this.reactionPicker={show:!1,x:0,y:0,target:null,msgid:null}},reactFromPicker(e){let{target:t,msgid:n}=this.reactionPicker,r=t===this.currentChannel?this.findMessageByMsgid(t,n):null;r&&this.toggleReaction(r,e),this.closeReactionPicker()},startReply(e){this.canReplyTo(e)&&(this.replyingTo={target:this.currentChannel,msgid:e.msgid,user:e.user,text:this.messageSnippet(e)},this.$nextTick(()=>this.$refs.messageInput?.focus()))},cancelReply(){this.replyingTo=null},activeReplyTag(){let e=this.replyingTo;return!e||e.target!==this.currentChannel||!this.canReply()?null:{"+draft/reply":e.msgid}},messageSnippet(e,t=120){if(!e)return``;let n=ae(e.text||``).replace(/\s+/g,` `).trim();return n.length>t?`${n.slice(0,t)}…`:n},replyPreview(e){if(!e?.replyTo)return null;let t=this.findMessageByMsgid(this.currentChannel,e.replyTo);return t?t.redacted?{user:t.user,text:this.t(`message_deleted`),found:!0}:{user:t.user,text:this.messageSnippet(t,80),found:!0}:{user:``,text:this.t(`reply_unknown`),found:!1}},jumpToMessage(e){let t=(this.$refs.chatMessages||document.querySelector(`.chat-messages`))?.querySelector(`[data-msgid="${CSS.escape(e)}"]`);t&&(t.scrollIntoView({block:`center`,behavior:`smooth`}),t.classList.add(`msg--highlight`),setTimeout(()=>t.classList.remove(`msg--highlight`),1600))},deleteMessage(e,t=null){if(!this.canDelete(e))return;if(!t?.shiftKey&&this.pendingDeleteId!==e.id){this.pendingDeleteId=e.id,clearTimeout(this._pendingDeleteTimer),this._pendingDeleteTimer=setTimeout(()=>{this.pendingDeleteId===e.id&&(this.pendingDeleteId=null)},Lc);return}clearTimeout(this._pendingDeleteTimer),this.pendingDeleteId=null;let n=this.currentChannel;this.sendRaw(`REDACT ${n} ${e.msgid}`)&&(e.deleting=!0,setTimeout(()=>{e.deleting&&!e.redacted&&this.markRedacted(e)},Ic))},markRedacted(e){e.redacted=!0,e.deleting=!1,e.text=``,e.reactions=[],this.replyingTo?.msgid===e.msgid&&(this.replyingTo=null)},handleRedact(e){let[t,n]=e.params;if(!t||!n)return;let r=this.resolveTargetKey(Rc(t,this.nickname)?e.nick:t);this.annotateMessage(r,n,{type:`redact`})},handleRedactFailure(e){let t=this.resolveTargetKey(e.params[2]||``),n=this.findMessageByMsgid(t,e.params[3]);n&&(n.deleting=!1),this.updateStatus(e.params[e.params.length-1]||this.t(`delete_message_failed`))},expectEcho(e,t,n,r=!1){let i=Date.now();this._pendingEchoes=this._pendingEchoes.filter(e=>i-e.at<Fc),t.forEach(t=>this._pendingEchoes.push({target:e,text:t,isAction:r,message:n,at:i})),this._pendingEchoes.length>Pc&&this._pendingEchoes.splice(0,this._pendingEchoes.length-Pc)},consumeEcho(e,t,n,r){let i=this._pendingEchoes.findIndex(r=>r.target===e&&r.text===t&&r.isAction===n);if(i===-1)return!1;let[a]=this._pendingEchoes.splice(i,1),o=this.messageManager.get(e).find(e=>e.id===a.message.id)||a.message;return!o.msgid&&r.msgid&&(o.msgid=r.msgid,this.ensureSeenMessageBucket(e).add(this.getMessageDedupKey(e,``,``,!1,r)),this.applyOrphanAnnotations(e,[o])),o.pending=!1,!0}}}function Bc(e){return e&&!e._hidden&&!e.isJoinPart&&!e.redacted&&!e.serverKind&&typeof e.text==`string`}function Vc(e,t){let n=String(t??``).trim().toLowerCase();if(n.length<2)return[];let r=[];for(let t=e.length-1;t>=0;t--){let i=e[t];Bc(i)&&(ae(i.text).toLowerCase().includes(n)||String(i.user||``).toLowerCase().includes(n))&&r.push(i.id)}return r}var Hc={messages:null,length:-1,lastId:null,query:null,ids:[],idSet:new Set};function Uc(e,t){let n=e[e.length-1]?.id??null;if(Hc.messages!==e||Hc.length!==e.length||Hc.lastId!==n||Hc.query!==t){let r=Vc(e,t);Hc={messages:e,length:e.length,lastId:n,query:t,ids:r,idSet:new Set(r)}}return Hc}function Wc(){return{messageSearch:{open:!1,query:``,index:0},openMessageSearch(){this.currentChannel&&!this.isServerWindow?.()&&(this.messageSearch={...this.messageSearch,open:!0},this.$nextTick?.(()=>{let e=this.$refs?.messageSearchInput;e?.focus(),e?.select()}))},closeMessageSearch(){(this.messageSearch.open||this.messageSearch.query)&&(this.messageSearch={open:!1,query:``,index:0})},messageSearchResults(){return this.messageSearch.open?Uc(this.currentMessages,this.messageSearch.query).ids:[]},messageSearchInput(){this.messageSearch.index=0,this.jumpToSearchResult()},messageSearchStep(e){let t=this.messageSearchResults().length;t&&(this.messageSearch.index=(this.messageSearch.index+e+t)%t,this.jumpToSearchResult())},jumpToSearchResult(){let e=this.messageSearchResults()[this.messageSearch.index];e!==void 0&&this.$nextTick?.(()=>{((this.$refs?.chatMessages||document.querySelector(`.chat-messages`))?.querySelector(`[data-message-id="${CSS.escape(String(e))}"]`))?.scrollIntoView({block:`center`,behavior:`smooth`})})},isSearchHit(e){return this.messageSearch.open?Uc(this.currentMessages,this.messageSearch.query).idSet.has(e?.id):!1},isCurrentSearchHit(e){return this.messageSearch.open&&this.messageSearchResults()[this.messageSearch.index]===e?.id},messageSearchCounter(){if(this.messageSearch.query.trim().length<2)return``;let e=this.messageSearchResults().length;return e?`${this.messageSearch.index+1} / ${e}`:`0`},canLoadOlderForSearch(){let e=this.currentChannel;return!!e&&this.supportsChathistory&&this.isRegistered&&!this.historyExhaustedByTarget[e]&&!!this.historyCursorByTarget[e]},loadOlderForSearch(){this.canLoadOlderForSearch()&&this.requestHistoryBefore(this.currentChannel)}}}var Gc=500,Kc=10,qc=null,Jc=null,Yc=!1;function Xc(){return{isMobileLayout:!1,mobileSidebarOpen:!1,mobileUserListOpen:!1,touchActionsMessageId:null,showInputMoreMenu:!1,appInBackground:!1,setupMobileLayout(){let e=window.matchMedia?.(`(max-width: 768px)`);if(!e)return;let t=()=>{this.isMobileLayout=e.matches,e.matches||this.closeMobileDrawers()};t(),e.addEventListener?.(`change`,t)},focusMessageInput(){this.isMobileLayout||this.$nextTick?.(()=>this.$refs?.messageInput?.focus())},toggleMobileSidebar(){this.mobileUserListOpen=!1,this.mobileSidebarOpen=!this.mobileSidebarOpen},closeMobileDrawers(){this.mobileSidebarOpen=!1,this.mobileUserListOpen=!1},closeMobileSidebarAfterPick(e){this.isMobileLayout&&e?.target?.closest?.(`.channel-item`)&&!e.target.closest(`.channel-item-close`)&&(this.mobileSidebarOpen=!1)},toggleInputMoreMenu(){this.showInputMoreMenu=!this.showInputMoreMenu,this.showInputMoreMenu&&(this.showEmojiPicker=!1,this.showGifPicker=!1,this.showColorPicker=!1)},runInputMoreAction(e){this.showInputMoreMenu=!1,e?.()},handleBackButton(){return this.touchActionsMessageId===null?this.showEmojiPicker||this.showGifPicker||this.showColorPicker||this.showInputMoreMenu?(this.showEmojiPicker=!1,this.showGifPicker=!1,this.showColorPicker=!1,this.showInputMoreMenu=!1,!0):this.settingsWindow?.show?(this.closeSettings?.(),!0):this.quickSwitcher?.show?(this.closeQuickSwitcher(),!0):this.mobileSidebarOpen||this.mobileUserListOpen?(this.closeMobileDrawers(),!0):!1:(this.touchActionsMessageId=null,!0)},handleAppPaused(){this.appInBackground=!0,this.saveChatState?.()},handleAppResumed(){this.appInBackground=!1,this.socket?.resume?.(),this.isTargetVisible(this.currentChannel)&&this.markCurrentChannelAsRead(),this.refreshAccountSettings?.()},hasUnreadOutsideCurrentView(){return!!(this.channelsHaveUnread||this.friendsIndicatorCount>0)},startLongPress(e,t){this.cancelLongPress();let n=e?.touches?.[0];!n||e.touches.length>1||(Yc=!1,Jc={x:n.clientX,y:n.clientY},qc=setTimeout(()=>{qc=null,Yc=!0,navigator.vibrate?.(10),t({clientX:Jc.x,clientY:Jc.y,preventDefault(){}})},Gc))},moveLongPress(e){let t=e?.touches?.[0];t&&Jc&&(Math.abs(t.clientX-Jc.x)>Kc||Math.abs(t.clientY-Jc.y)>Kc)&&this.cancelLongPress()},endLongPress(e){clearTimeout(qc),qc=null,Yc&&=(e?.preventDefault?.(),!1)},cancelLongPress(){clearTimeout(qc),qc=null,Jc=null},showTouchActions(e){this.touchActionsMessageId=e?.id??null},hideTouchActions(e){this.touchActionsMessageId!==null&&(e?.target?.closest?.(`.msg-actions`)||(this.touchActionsMessageId=null))},clampMenuPosition(e,t,n=240,r=280){let i=Math.max(8,(window.innerWidth||n)-n-8),a=Math.max(8,(window.innerHeight||r)-r-8);return{x:Math.min(Math.max(8,e),i),y:Math.min(Math.max(8,t),a)}}}}var Zc=400;function Qc(){return{_requestedJoins:new Set,isDirectMessageChannel(e){return!!e&&!e.startsWith(`#`)&&e!==`Server`},toggleUserList(){this.isMobileLayout?(this.mobileSidebarOpen=!1,this.mobileUserListOpen=!this.mobileUserListOpen):this.setUserListOpen(!this.userListOpen)},setUserListOpen(e){this.userListOpen=!!e;try{localStorage.setItem(`chat.userListOpen`,this.userListOpen?`1`:`0`)}catch{}},setSidebarMode(e){let t=this.sidebarMode;if(this.sidebarMode=e,e===`friends`&&(t===`channels`&&this.currentChannel?.startsWith(`#`)&&(this.lastChannelBeforeDM=this.currentChannel),this.lastDMBeforeChannel&&this.messageManager.privateKeys().includes(this.lastDMBeforeChannel)?(this.selectedFriendName=this.lastDMBeforeChannel,this.switchChannel(this.lastDMBeforeChannel),this.$nextTick(()=>this.scrollToBottom())):this.selectedFriendName=``),e===`uploads`&&(t===`channels`&&this.currentChannel?.startsWith(`#`)&&(this.lastChannelBeforeDM=this.currentChannel),this.selectedFriendName=``,this.fetchMyUploads?.()),e===`channels`){this.isDirectMessageChannel(this.currentChannel)&&(this.lastDMBeforeChannel=this.currentChannel);let e=this.lastChannelBeforeDM||this.lobbyChannel||this.sortedChannels[0]||this.availableChannels[0]||this.defaultChannel;if(e){this.switchChannel(e),this.$nextTick(()=>this.scrollToBottom());return}}this.scheduleChatStateSave?.()},enterChannelsMode(){this.sidebarMode!==`channels`&&(this.isDirectMessageChannel(this.currentChannel)&&(this.lastDMBeforeChannel=this.currentChannel),this.sidebarMode=`channels`)},joinChannels(e){if(!this.isRegistered)return;let t=[];e.forEach(e=>{let n=t[t.length-1];n&&n.length+e.length+1<=Zc?t[t.length-1]=`${n},${e}`:t.push(e)}),t.forEach(e=>this.sendRaw(`JOIN ${e}`))},joinChannel(e){this.isRegistered&&(this._requestedJoins.add(String(e).toLowerCase()),this.sendRaw(`JOIN ${e}`),this.updateStatus(`Trying to join ${e}...`)),this.closeExplore?.(),this.scheduleChatStateSave?.()},partChannel(e=[]){typeof e==`string`&&(e=[e]);let t=e[0]||(this.currentChannel?.startsWith(`#`)?this.currentChannel:``);if(!t)return;let n=t.split(`,`).map(e=>{let t=e.trim();return(t.startsWith(`#`)?t:`#${t}`).toLowerCase()}),r=n.some(e=>e.toLowerCase()===this.currentChannel?.toLowerCase());n.forEach(e=>{e===this.lobbyChannel?.toLowerCase()&&this.rememberLeftLobby(e,!0),this.sendRaw(`PART ${e}`),this.updateStatus(`You left ${e}`),this.availableChannels=this.availableChannels.filter(t=>t.toLowerCase()!==e.toLowerCase()),this.channelManager.clearTopic(e),this.clearDraft(e)}),r&&this.switchAfterLeavingChannel(),this.contextMenu.show=!1,this.saveChatState?.()},switchAfterLeavingChannel(){let e=this.availableChannels.filter(e=>e!==this.lobbyChannel);e.length>0?this.switchChannel(e[0]):this.availableChannels.includes(this.lobbyChannel)?this.switchChannel(this.lobbyChannel):this.currentChannel=null},forgetPartedChannel(e){if(!this.availableChannels.some(t=>t.toLowerCase()===e))return;e===this.lobbyChannel?.toLowerCase()&&this.rememberLeftLobby?.(e,!0);let t=this.currentChannel?.toLowerCase()===e;this.availableChannels=this.availableChannels.filter(t=>t.toLowerCase()!==e),this.channelManager.clearTopic(e),this.clearDraft(e),t&&this.switchAfterLeavingChannel(),this.scheduleChatStateSave?.()},switchChannel(e){this.contextMenu.show=!1,this.friendContextMenu.show=!1,e=this.resolveTargetKey(e),this.isDirectMessageChannel(e)&&this.messageManager.ensure(e),e===this.currentChannel?(this.markCurrentChannelAsRead(),this.scrollToBottom()):(this.currentChannel&&(this.saveDraft(this.currentChannel,this.newMessage),this.leaveTarget(this.currentChannel)),e?.startsWith(`#`)?this.lastChannelBeforeDM=e:this.isDirectMessageChannel(e)&&(this.lastDMBeforeChannel=e),e.startsWith(`#`)&&this.onChannelShown?.(e),e.startsWith(`#`)&&this.sidebarMode!==`channels`?this.sidebarMode=`channels`:this.isDirectMessageChannel(e)&&this.sidebarMode!==`friends`&&(this.sidebarMode=`friends`),this.closeMessageSearch?.(),this.replyingTo?.target!==e&&(this.replyingTo=null),this.closeReactionPicker(),e===`Server`&&(this.serverWindowActivity=!1),this.currentChannel=e,this.isScrolledUp=!1,this.newWhileScrolledUp=0,this.selectedFriendName=e.startsWith(`#`)?``:e,this.newMessage=this.channelDrafts[e]||``,this.$nextTick(()=>this.autoGrowInput(this.$refs.messageInput)),this.enterTarget(e),this.scheduleChatStateSave?.(),this.isRegistered&&e!==`Server`&&(this.sendRaw(`WHO ${e}`),this.requestHistoryLatest(e),this.prioritizeHistory(e)),this.scrollToUnreadOrBottom(e),this.$nextTick(()=>{this.setupMediaPlayers(),this.setupStickToBottom()}),this.focusMessageInput())},openFriendsHub(){this.leaveTarget(this.currentChannel),this.selectedFriendName=``,this.currentChannel=``},closeDM(e){this.currentChannel===e&&this.openFriendsHub(),this.lastDMBeforeChannel===e&&(this.lastDMBeforeChannel=null),this.messageManager.remove(e),delete this.unreadMessages[e],delete this.unreadMarkerByChannel[e],this.clearDraft(e),delete this._lastRead?.[e],this.emitUnreadState(),this.scheduleChatStateSave?.()}}}var $c=[{keys:[`Ctrl`,`P`],label:`shortcut_quick_switcher`},{keys:[`Ctrl`,`F`],label:`shortcut_search`},{keys:[`Alt`,`↑`],label:`shortcut_previous_channel`},{keys:[`Alt`,`↓`],label:`shortcut_next_channel`},{keys:[`Ctrl`,`K`],label:`shortcut_color`},{keys:[`Ctrl`,`B`],label:`shortcut_bold`},{keys:[`Ctrl`,`I`],label:`shortcut_italic`},{keys:[`Ctrl`,`U`],label:`shortcut_underline`},{keys:[`Tab`],label:`shortcut_complete`},{keys:[`Shift`,`Enter`],label:`shortcut_newline`},{keys:[`Esc`],label:`shortcut_escape`},{keys:[`?`],label:`shortcut_help`}];function el(e){return String(e??``).toLowerCase().replace(/^#/,``)}function tl(e,t){if(!t)return 0;let n=el(e);if(n.startsWith(t))return 0;if(n.includes(t))return 1;let r=0;for(let e of t){if(r=n.indexOf(e,r),r===-1)return null;r++}return 2}function nl(e,t,{current:n=``,limit:r=10}={}){let i=el(t).trim(),a=new Set;return e.filter(e=>{let t=e.name.toLowerCase();return!e.name||a.has(t)?!1:(a.add(t),i!==``||e.name!==n)}).map(e=>({...e,unread:e.unread||0,mentions:e.mentions||0,score:tl(e.name,i)})).filter(e=>e.score!==null).sort((e,t)=>e.score-t.score||t.mentions-e.mentions||(t.unread>0)-(e.unread>0)||e.name.localeCompare(t.name,void 0,{sensitivity:`base`})).slice(0,r).map(({score:e,...t})=>t)}function rl(e){if(!e)return!1;let t=e.tagName;return t===`INPUT`||t===`TEXTAREA`||t===`SELECT`||e.isContentEditable===!0}function il(){return{quickSwitcher:{show:!1,query:``,index:0,mode:`switch`},showShortcutHelp:!1,shortcuts:$c,handleGlobalKeydown(e){let t=e.key,n=e.ctrlKey||e.metaKey;n&&!e.altKey&&!e.shiftKey&&t.toLowerCase()===`p`?(e.preventDefault(),this.quickSwitcher.show?this.closeQuickSwitcher():this.openQuickSwitcher()):n&&!e.altKey&&!e.shiftKey&&t.toLowerCase()===`f`?(e.preventDefault(),this.openMessageSearch()):n&&t===`/`||t===`?`&&!n&&!e.altKey&&!rl(e.target)?(e.preventDefault(),this.showShortcutHelp=!this.showShortcutHelp):e.altKey&&!n&&!e.shiftKey&&(t===`ArrowUp`||t===`ArrowDown`)?(e.preventDefault(),this.switchRelativeTarget(t===`ArrowUp`?-1:1)):t===`Escape`&&this.showShortcutHelp&&(this.showShortcutHelp=!1)},sidebarTargets(){return this.sidebarMode===`friends`?this.privateMessageKeys.filter(e=>e!==ic):this.sortedChannels},switchRelativeTarget(e){let t=this.sidebarTargets();if(!t.length)return;let n=t.indexOf(this.currentChannel),r=n===-1?e>0?0:t.length-1:(n+e+t.length)%t.length;t[r]!==this.currentChannel&&this.switchChannel(t[r])},openQuickSwitcher(e=`switch`){this.showShortcutHelp=!1,this.contextMenu.show=!1,e!==`share`&&(this.pendingShare=null),this.quickSwitcher={show:!0,query:``,index:0,mode:e}},closeQuickSwitcher(){this.quickSwitcher={show:!1,query:``,index:0,mode:`switch`},this.pendingShare=null,this.$nextTick?.(()=>this.focusMessageInput?.())},quickSwitcherItems(){let e=this.availableChannels.filter(e=>e.startsWith(`#`)).map(e=>({name:e,kind:`channel`})),t=this.privateMessageKeys.filter(e=>e!==ic).map(e=>({name:e,kind:`dm`})),n=(this.friends||[]).map(e=>e.user?.display).filter(Boolean).map(e=>({name:e,kind:`friend`})),r=[...e,...t,...n].map(e=>({...e,unread:this.unreadMessages[e.name]||0,mentions:this.mentionsByChannel[e.name]||0})),i=this.quickSwitcher.mode===`share`?``:this.currentChannel;return nl(r,this.quickSwitcher.query,{current:i})},quickSwitcherInput(){this.quickSwitcher.index=0},quickSwitcherMove(e){let t=this.quickSwitcherItems().length;t&&(this.quickSwitcher.index=(this.quickSwitcher.index+e+t)%t)},quickSwitcherConfirm(e=null){let t=e||this.quickSwitcherItems()[this.quickSwitcher.index];if(!t)return;let n=this.pendingShare;this.closeQuickSwitcher(),t.kind===`channel`?this.switchChannel(t.name):this.sendPrivateMessage(t.name),n&&this.$nextTick?.(()=>this.applyShare(n))}}}function al(e,t){this.v=e,this.k=t}function ol(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function sl(e){if(Array.isArray(e))return e}function cl(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function ll(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ul(e,t){return sl(e)||cl(e,t)||dl(e,t)||ll()}function dl(e,t){if(e){if(typeof e==`string`)return ol(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ol(e,t):void 0}}function fl(e){var t,n;function r(t,n){try{var a=e[t](n),o=a.value,s=o instanceof al;Promise.resolve(s?o.v:o).then(function(n){if(s){var c=t===`return`&&o.k?t:`next`;if(!o.k||n.done)return r(c,n);n=e[c](n).value}i(!!a.done,n)},function(e){r(`throw`,e)})}catch(e){i(2,e)}}function i(e,i){e===2?t.reject(i):t.resolve({value:i,done:e}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(e,i){return new Promise(function(a,o){var s={key:e,arg:i,resolve:a,reject:o,next:null};n?n=n.next=s:(t=n=s,r(e,i))})},typeof e.return!=`function`&&(this.return=void 0)}fl.prototype[typeof Symbol==`function`&&Symbol.asyncIterator||`@@asyncIterator`]=function(){return this},fl.prototype.next=function(e){return this._invoke(`next`,e)},fl.prototype.throw=function(e){return this._invoke(`throw`,e)},fl.prototype.return=function(e){return this._invoke(`return`,e)};var pl=Object.entries,ml=Object.keys,hl=Object.setPrototypeOf,gl=Object.isFrozen,_l=Object.getPrototypeOf,vl=Object.getOwnPropertyDescriptor,B=Object.freeze,V=Object.seal,yl=Object.create,bl=typeof Reflect<`u`&&Reflect,xl=bl.apply,Sl=bl.construct;B||=function(e){return e},V||=function(e){return e},xl||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},Sl||=function(e){return new e(...[...arguments].slice(1))};var Cl=W(Array.prototype.forEach),wl=W(Array.prototype.lastIndexOf),Tl=W(Array.prototype.pop),El=W(Array.prototype.push),Dl=W(Array.prototype.slice),Ol=W(Array.prototype.splice),kl=Array.isArray,Al=Kl(Set),jl=W(Set.prototype.add),Ml=W(Set.prototype.has),Nl=W(String.prototype.toLowerCase),Pl=W(String.prototype.toString),Fl=W(String.prototype.match),Il=W(String.prototype.replace),Ll=W(String.prototype.indexOf),Rl=W(String.prototype.trim),zl=W(Number.prototype.toString),Bl=W(Boolean.prototype.toString),Vl=typeof BigInt>`u`?null:W(BigInt.prototype.toString),Hl=typeof Symbol>`u`?null:W(Symbol.prototype.toString),H=W(Object.prototype.hasOwnProperty),Ul=W(Object.prototype.toString),Wl=RegExp.prototype.test,U=function(e,t){return e instanceof RegExp&&(e.lastIndex=0),xl(Wl,e,[t])},Gl=Kl(TypeError);function W(e){return function(t){var n=[...arguments].slice(1);return xl(e,t,n)}}function Kl(e){return function(){return Sl(e,[...arguments])}}function G(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Nl;if(hl&&hl(e,null),!kl(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(gl(t)||(t[r]=e),i=e)}e[i]=!0}return e}function ql(e){for(let t=0;t<e.length;t++)H(e,t)||(e[t]=null);return e}function Jl(e){let t=yl(null);for(let r of pl(e)){var n=ul(r,2);let i=n[0],a=n[1];H(e,i)&&(t[i]=kl(a)?ql(a):a&&typeof a==`object`&&a.constructor===Object?Jl(a):a)}return t}function Yl(e){let t=yl(null),n=ml(e),r=n.length;for(;r--;)t[n[r]]=e[n[r]];return t}function Xl(e){switch(typeof e){case`string`:return e;case`number`:return zl(e);case`boolean`:return Bl(e);case`bigint`:return Vl?Vl(e):`0`;case`symbol`:return Hl?Hl(e):`Symbol()`;case`undefined`:return Ul(e);case`function`:case`object`:{if(e===null)return Ul(e);let t=e,n=Zl(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:Ul(e)}return Ul(e)}default:return Ul(e)}}function Zl(e,t){for(;e!==null;){let n=vl(e,t);if(n){if(n.get)return W(n.get);if(typeof n.value==`function`)return W(n.value)}e=_l(e)}function n(){return null}return n}function Ql(e,t){for(;e!==null;){let n=vl(e,t);if(n)return n.get?W(n.get):null;e=_l(e)}return null}function $l(e){if(!e)return!1;try{return U(e,``),!0}catch{return!1}}var eu=B(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),tu=B(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.filter.font.g.glyph.glyphref.hkern.image.line.lineargradient.marker.mask.metadata.mpath.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),nu=B([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),ru=B([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),iu=B(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),au=B([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),ou=B([`#text`]),su=B(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),cu=B(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),lu=B(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),uu=B([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),du=V(/{{[\w\W]*|^[\w\W]*}}/g),fu=V(/<%[\w\W]*|^[\w\W]*%>/g),pu=V(/\${[\w\W]*/g),mu=V(/{{|}}|\${|<%|%>|&lt;%|%&gt;/),hu=V(/^data-[\-\w.\u00B7-\uFFFF]+$/),gu=V(/^aria-[\-\w]+$/),_u=V(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),vu=V(/^(?:\w+script|data):/i),yu=V(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),bu=V(/^html$/i),xu=V(/^[a-z][.\w]*(-[.\w]+)+$/i),Su=V(/<[/\w!]/g),Cu=V(/<[/\w]/g),wu=V(/<\/no(script|embed|frames)/i),Tu=V(/\/>/i),Eu=V(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i),Du=V(/^[\r\n\t ]+/),K={element:1,text:3,processingInstruction:7,comment:8,document:9,documentFragment:11},Ou=B(G({},[`style`,`script`,`xmp`,`iframe`,`noembed`,`noframes`,`plaintext`,`noscript`])),ku=function(){return typeof window>`u`?null:window},Au=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},ju=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},Mu=function(e,t,n,r){return H(e,t)&&kl(e[t])?G(r.base?Yl(r.base):{},e[t],r.transform):n},Nu=function(e,t,n){let r=H(e,t)?e[t]:void 0;return r&&typeof r==`object`?Jl(r):n};function Pu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ku(),t=e=>Pu(e);if(t.version=`3.4.18`,t.removed=[],!e||!e.document||e.document.nodeType!==K.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript,a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter,l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=Zl(d,`cloneNode`),p=Zl(d,`remove`),m=Zl(d,`removeAttributeNode`),h=Zl(d,`nextSibling`),g=Zl(d,`childNodes`),_=Zl(d,`parentNode`),v=Zl(d,`shadowRoot`),y=Zl(d,`attributes`),b=o&&o.prototype?Zl(o.prototype,`nodeType`):null,x=o&&o.prototype?Zl(o.prototype,`nodeName`):null,ee=o&&o.prototype?Zl(o.prototype,`ownerDocument`):null,S=function(e){return b?b(e):e.nodeType},te=function(e){return x?x(e):e.nodeName},ne=Ql(d,`namespaceURI`),re=function(e){return ne?ne(e):e.namespaceURI};if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let C,w=``,ie,ae=!1,oe=0,se=function(){if(oe>0)throw Gl(`A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`)},ce=function(e){se(),oe++;try{return C.createHTML(e)}finally{oe--}},le=function(e){return C&&Ke?ce(e):e},ue=function(e){se(),oe++;try{return C.createScriptURL(e)}finally{oe--}},de=function(){return ae||=(ie=Au(u,i),!0),ie},fe=n,pe=fe.implementation,me=fe.createNodeIterator,he=fe.createDocumentFragment,ge=fe.getElementsByTagName,_e=r.importNode,T=ju();t.isSupported=typeof pl==`function`&&typeof _==`function`&&pe&&pe.createHTMLDocument!==void 0;let ve=du,ye=fu,be=pu,xe=hu,Se=gu,Ce=vu,we=yu,Te=xu,Ee=_u,E=null,De=G({},[...eu,...tu,...nu,...iu,...ou]),D=null,Oe=G({},[...su,...cu,...lu,...uu]),ke=null,Ae=null,je=null,Me=Object.seal(yl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ne=!0,Pe=!0,Fe=!1,Ie=!0,Le=!1,Re=!0,ze=!1,Be=!1,Ve=null,He=null,Ue=!1,We=!1,Ge=!1,Ke=!1,qe=!0,Je=!1,Ye=`user-content-`,Xe=!0,Ze=!1,Qe=null,$e=!1,et=null,tt=G({},`annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp`.split(`.`)),nt=null,rt=G({},[`audio`,`video`,`img`,`source`,`image`,`track`]),it=null,at=G({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),ot=`http://www.w3.org/1998/Math/MathML`,st=`http://www.w3.org/2000/svg`,ct=`http://www.w3.org/1999/xhtml`,lt=ct,ut=!1,dt=null,ft=G({},[ot,st,ct],Pl),pt=B(G({},[`mi`,`mo`,`mn`,`ms`,`mtext`])),mt=null,ht=B(G({},[`annotation-xml`])),gt=null,_t=B(yl(null)),vt=G({},[`title`,`style`,`font`,`a`,`script`]),O=null,yt=[`application/xhtml+xml`,`text/html`],k=null,bt=null,xt=n.createElement(`form`),St=function(e){return e instanceof RegExp||e instanceof Function},Ct=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};e&&typeof e==`object`||(e={}),e=Jl(e),O=yt.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,k=O===`application/xhtml+xml`?Pl:Nl,E=Mu(e,`ALLOWED_TAGS`,De,{transform:k}),D=Mu(e,`ALLOWED_ATTR`,Oe,{transform:k}),dt=Mu(e,`ALLOWED_NAMESPACES`,ft,{transform:Pl}),it=Mu(e,`ADD_URI_SAFE_ATTR`,at,{transform:k,base:at}),nt=Mu(e,`ADD_DATA_URI_TAGS`,rt,{transform:k,base:rt}),et=Mu(e,`FORBID_CONTENTS`,tt,{transform:k}),Ae=Mu(e,`FORBID_TAGS`,yl(null),{transform:k}),je=Mu(e,`FORBID_ATTR`,yl(null),{transform:k}),$e=H(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?Jl(e.USE_PROFILES):e.USE_PROFILES:!1,Ne=e.ALLOW_ARIA_ATTR!==!1,Pe=e.ALLOW_DATA_ATTR!==!1,Fe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Ie=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Le=e.SAFE_FOR_TEMPLATES||!1,Re=e.SAFE_FOR_XML!==!1,ze=e.WHOLE_DOCUMENT||!1,We=e.RETURN_DOM||!1,Ge=e.RETURN_DOM_FRAGMENT||!1,Ke=e.RETURN_TRUSTED_TYPE||!1,Ue=e.FORCE_BODY||!1,qe=e.SANITIZE_DOM!==!1,Je=e.SANITIZE_NAMED_PROPS||!1,Xe=e.KEEP_CONTENT!==!1,Ze=e.IN_PLACE||!1,Ee=$l(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:_u,lt=typeof e.NAMESPACE==`string`?e.NAMESPACE:ct,mt=Nu(e,`MATHML_TEXT_INTEGRATION_POINTS`,pt),gt=Nu(e,`HTML_INTEGRATION_POINTS`,ht);let t=Nu(e,`CUSTOM_ELEMENT_HANDLING`,_t);if(ke=yl(null),H(t,`tagNameCheck`)&&St(t.tagNameCheck)&&(ke.tagNameCheck=t.tagNameCheck),H(t,`attributeNameCheck`)&&St(t.attributeNameCheck)&&(ke.attributeNameCheck=t.attributeNameCheck),H(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(ke.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),V(ke),Le&&(Pe=!1),Ge&&(We=!0),$e&&((H(e,`ALLOWED_TAGS`)||H(e,`ALLOWED_ATTR`))&&typeof console<`u`&&typeof console.warn==`function`&&console.warn(`DOMPurify: USE_PROFILES overrides ALLOWED_TAGS and ALLOWED_ATTR. Do not use these options together.`),E=G({},ou),D=yl(null),$e.html===!0&&(G(E,eu),G(D,su)),$e.svg===!0&&(G(E,tu),G(D,cu),G(D,uu)),$e.svgFilters===!0&&(G(E,nu),G(D,cu),G(D,uu)),$e.mathMl===!0&&(G(E,iu),G(D,lu),G(D,uu))),Me.tagCheck=null,Me.attributeCheck=null,H(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?Me.tagCheck=e.ADD_TAGS:kl(e.ADD_TAGS)&&(E===De&&(E=Yl(E)),G(E,e.ADD_TAGS,k))),H(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?Me.attributeCheck=e.ADD_ATTR:kl(e.ADD_ATTR)&&(D===Oe&&(D=Yl(D)),G(D,e.ADD_ATTR,k))),H(e,`ADD_FORBID_CONTENTS`)&&kl(e.ADD_FORBID_CONTENTS)&&(et===tt&&(et=Yl(et)),G(et,e.ADD_FORBID_CONTENTS,k)),Xe&&(E[`#text`]=!0),ze&&G(E,[`html`,`head`,`body`]),E.table&&(E.tbody=!0,delete Ae.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw Gl(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw Gl(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=C;C=e.TRUSTED_TYPES_POLICY;try{w=ce(``)}catch(e){throw C=t,e}}else e.TRUSTED_TYPES_POLICY===null?(C=void 0,w=``):(C===void 0&&(C=de()),C&&typeof w==`string`&&(w=ce(``)));bt=B(e)},wt=G({},[...tu,...nu,...ru]),Tt=G({},[...iu,...au]),Et=function(e,t,n){return t===ct?e===`svg`:t===ot?e===`svg`&&(n===`annotation-xml`||mt[n]):!!wt[e]},Dt=function(e,t,n){return t===ct?e===`math`:t===st?e===`math`&&gt[n]:!!Tt[e]},Ot=function(e,t,n){return t===st&&!gt[n]||t===ot&&!mt[n]?!1:!Tt[e]&&(vt[e]||!wt[e])},kt=function(e){let t=re(e),n=Nl(te(e)),r=_(e),i=lt,a=`template`;return r&&S(r)===K.element&&(i=re(r),a=Nl(te(r))),dt[t]?t===st?Et(n,i,a):t===ot?Dt(n,i,a):t===ct?Ot(n,i,a):O===`application/xhtml+xml`:!1},At=function(e){El(t.removed,{element:e});try{_(e).removeChild(e)}catch{if(p(e),!_(e))throw Gl(`a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place`)}},jt=function(e,t,n){try{m(e,t)}catch{try{e.removeAttribute(n)}catch{}}},Mt=function(e){Ft(e);let t=g(e);t&&Cl(Dl(t),e=>{try{p(e)}catch{}}),S(e)===K.element&&Nt(e,!1)},A=function(e,n,r){if(!r)try{r=n.getAttributeNode(e)}catch{r=null}if(El(t.removed,{attribute:r||null,from:n}),r)jt(n,r,e);else try{n.removeAttribute(e)}catch{}if(e===`is`){if(We||Ge)try{At(n)}catch{}else try{n.setAttribute(e,``)}catch{}}},Nt=function(e,t){let n=y(e);if(n)for(let r=n.length-1;r>=0;--r){let i=n[r],a=i&&i.name;typeof a==`string`&&!(t&&D[k(a)])&&jt(e,i,a)}},Pt=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0&&arguments[2],r=[e];for(;r.length>0;){let e=r.pop();if(t(e)===!1)continue;if(n&&S(e)===K.element){let t=v(e);Zt(t)&&r.push(t)}let i=g(e);if(i)for(let e=i.length-1;e>=0;--e)r.push(i[e])}},Ft=function(e){Pt(e,e=>{S(e)===K.element&&Nt(e,!0)})},It=function(e){let t=[];return Pt(e,e=>{t.push(e)},!0),t},Lt=function(e,t){let n=Al();Cl(It(e),e=>{S(e)===K.element&&jl(n,e)}),Cl(t,e=>{S(e)===K.element&&!Ml(n,e)&&Nt(e,!0)})},Rt=function(e,n){let r=!1;return Cl(t.removed,t=>{t.element&&(r||=t.element===e,Ft(t.element))}),Lt(e,n),r},zt=function(e,t){let n=Qe,r=null,i=()=>(r||(r=Al(),Cl(t,e=>{jl(r,e)})),r);for(let t=0;;t++){let r=It(e),a=[e],o=!1;if(Cl(r,e=>{S(e)===K.documentFragment?El(a,e):!o&&!Ml(n,e)&&(o=Ml(i(),e))}),!o)return;if(t>=8)throw Gl(`the tree kept changing during in-place sanitization; refusing to return it`);Cl(a,(t,n)=>{Bt(t,n>0,e,i())})}},Bt=function(e,t,n,r){let i=Gt(e),a;for(;a=i.nextNode();)Ml(r,a)&&!Ml(Qe,a)&&(t&&j(T.uponSanitizeShadowNode,a,null),fn(a,n))},Vt=function(e){Qe&&jl(Qe,e)},Ht=function(e,t){return Re?e===`patchsrc`||e===`for`&&t!==`label`&&t!==`output`:!1},Ut=function(e){Re&&Pt(e,e=>{let t=S(e);if(t===K.processingInstruction||t===K.comment&&U(Cu,e.data)){try{p(e)}catch{}return!1}if(t===K.element){let t=e,n=k(te(e));try{t.hasAttribute&&t.hasAttribute(`patchsrc`)&&t.removeAttribute(`patchsrc`),t.hasAttribute&&t.hasAttribute(`for`)&&Ht(`for`,n)&&t.removeAttribute(`for`)}catch{}}return!0})},Wt=function(e){let t=null,r=null;if(Ue)e=`<remove></remove>`+e;else{let t=Fl(e,Du);r=t&&t[0]}O===`application/xhtml+xml`&&lt===ct&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=C?ce(e):e;if(lt===ct)try{t=new l().parseFromString(i,O)}catch{}if(!t||!t.documentElement){t=pe.createDocument(lt,`template`,null);try{t.documentElement.innerHTML=ut?w:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),lt===ct?ge.call(t,ze?`html`:`body`)[0]:ze?t.documentElement:a},Gt=function(e){let t=arguments.length>1&&arguments[1]!==void 0&&arguments[1],n=ee?ee(e):e.ownerDocument;return me.call(n||e,e,(t?0:c.SHOW_ELEMENT)|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Kt=function(e){return e=Il(e,ve,` `),e=Il(e,ye,` `),e=Il(e,be,` `),e},qt=function(e){Jt(e);let t=e.querySelectorAll?.call(e,`template`);t&&Cl(t,e=>{Zt(e.content)&&qt(e.content)})},Jt=function(e){e.normalize();let t=Gt(e,!0),n=t.nextNode();for(;n;)n.data=Kt(n.data),n=t.nextNode()},Yt=function(e){let t=x?x(e):null;return typeof t!=`string`||k(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==y(e)||typeof e.removeAttribute!=`function`||typeof e.removeAttributeNode!=`function`||typeof e.getAttributeNode!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==b(e)||e.childNodes!==g(e)},Xt=function(e){if(!b||typeof e!=`object`||!e)return null;try{let t=b(e);return typeof t==`number`?t:null}catch{return null}},Zt=function(e){return Xt(e)===K.documentFragment},Qt=function(e){return Xt(e)!==null};function j(e,n,r){e.length!==0&&Cl(e,e=>{e.call(t,n,r,bt)})}let $t=function(e,t,n){return!!(Re&&n===K.element&&e.hasChildNodes()&&!Qt(e.firstElementChild)&&U(Su,e.textContent)&&U(Su,e.innerHTML)||Re&&Ou[t]&&n===K.element&&re(e)===ct&&(Qt(e.firstElementChild)||typeof e.textContent==`string`&&U(Su,e.textContent))||n===K.processingInstruction||Re&&n===K.comment&&U(Cu,e.data))},en=function(e,t){return e instanceof RegExp?U(e,t):e instanceof Function&&!!e(t,...[...arguments].slice(2))},tn=function(e,t,n){if(!Ae[t]&&sn(t)&&en(ke.tagNameCheck,t))return!1;if(Xe&&!et[t]&&!et[Nl(t)]){let t=_(e),r=g(e);if(r&&t){let i=r.length;for(let a=i-1;a>=0;--a){let i=e===n?f(r[a],!0):r[a];t.insertBefore(i,h(e))}}}return At(e),!0},nn=function(e,t,n,r){return e.length===0?t:t===n||t===r?Yl(t):t},rn=function(e,t){return e===t||_(e)!==null?!1:(Ze&&Ft(e),!0)},M=function(e,n){if(Vt(e),j(T.beforeSanitizeElements,e,null),rn(e,n))return!0;if(Yt(e))return At(e),!0;let r=k(te(e)),i=S(e);if(E=nn(T.uponSanitizeElement,E,De,Ve),j(T.uponSanitizeElement,e,{tagName:r,allowedTags:E}),rn(e,n))return!0;if($t(e,r,i))return At(e),!0;if(Ae[r]||!(Me.tagCheck instanceof Function&&Me.tagCheck(r))&&!E[r]){let t=tn(e,r,n);return t===!1&&(j(T.afterSanitizeElements,e,null),rn(e,n))?!0:t}if(i===K.element&&!kt(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&U(wu,e.innerHTML))return At(e),!0;if(Le&&i===K.text){let n=e.textContent,r=Kt(n);n!==r&&(El(t.removed,{element:e.cloneNode()}),e.textContent=r)}return j(T.afterSanitizeElements,e,null),rn(e,n)},an=function(e,t,r){if(je[t]||Ht(t,e)||qe&&(t===`id`||t===`name`)&&(r in n||r in xt))return!1;let i=D[t]||Me.attributeCheck instanceof Function&&Me.attributeCheck(t,e);if(Pe&&U(xe,t)||Ne&&U(Se,t))return!0;if(!i)return sn(e)&&en(ke.tagNameCheck,e)&&en(ke.attributeNameCheck,t,e)||t===`is`&&ke.allowCustomizedBuiltInElements&&en(ke.tagNameCheck,r);if(it[t])return!0;let a=Il(r,we,``);return U(Ee,a)||(t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&Ll(r,`data:`)===0&&nt[e]||Fe&&!U(Ce,a)?!0:!r},on=G({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),sn=function(e){return!on[Nl(e)]&&U(Te,e)},cn=function(e,t,n,r){if(C&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!n)switch(u.getAttributeType(e,t)){case`TrustedHTML`:return ce(r);case`TrustedScriptURL`:return ue(r)}return r},ln=function(e,t,n,r){try{return n?e.setAttributeNS(n,t,r):e.setAttribute(t,r),!Yt(e)||(At(e),!1)}catch{return A(t,e),!1}},un=function(e,t){return Re&&U(Eu,t)?!0:Nl(e)===`attributename`&&Ll(t,`href`)!==-1},dn=function(e,n){if(j(T.beforeSanitizeAttributes,e,null),rn(e,n))return;let r=e.attributes;if(!r||Yt(e))return;D=nn(T.uponSanitizeAttribute,D,Oe,He);let i={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:D,forceKeepAttr:void 0},a=r.length,o=k(te(e));for(;a--;){let n=r[a],s=n.name,c=n.namespaceURI,l=n.value,u=k(s),d=l,f=s===`value`?d:Rl(d),p=!1;i.attrName=u,i.attrValue=f,i.keepAttr=!0,i.forceKeepAttr=void 0,j(T.uponSanitizeAttribute,e,i),f=i.attrValue,Je&&(u===`id`||u===`name`)&&Ll(f,Ye)!==0&&(A(s,e,n),f=Ye+f,p=!0),un(s,f)?A(s,e,n):i.forceKeepAttr||(i.keepAttr?!Ie&&U(Tu,f)?A(s,e,n):(Le&&(f=Kt(f)),an(o,u,f)?(f=cn(o,u,c,f),f!==d&&ln(e,s,c,f)&&p&&Tl(t.removed)):A(s,e,n)):A(s,e,n))}j(T.afterSanitizeAttributes,e,null),rn(e,n)},fn=function(e,t){M(e,t),dn(e,t),Zt(e.content)&&pn(e.content)},pn=function(e){let t=null,n=Gt(e);for(j(T.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(j(T.uponSanitizeShadowNode,t,null),fn(t,e),S(t)===K.element){let e=v(t);Zt(e)&&(mn(e),pn(e))}Le&&Jt(e),j(T.afterSanitizeShadowDOM,e,null)},mn=function(e){let t=[{node:e,shadow:null}];for(;t.length>0;){let e=t.pop();if(e.shadow){pn(e.shadow);continue}let n=e.node,r=S(n)===K.element,i=g(n);if(i)for(let e=i.length-1;e>=0;--e)t.push({node:i[e],shadow:null});if(r){let e=x?x(n):null;if(typeof e==`string`&&k(e)===`template`){let e=n.content;Zt(e)&&t.push({node:e,shadow:null})}}if(r){let e=v(n);Zt(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(ut=!e,ut&&(e=`<!-->`),typeof e!=`string`&&!Qt(e)&&(e=Xl(e),typeof e!=`string`))throw Gl(`dirty is not a string, aborting`);if(!t.isSupported)return e;Be?(E=Ve,D=He):Ct(n),t.removed=[];let c=Ze&&typeof e!=`string`&&Qt(e),l=[],u=Qe;if(c){Ut(e);let t=te(e);if(typeof t==`string`){let n=k(t);if(!E[n]||Ae[n])throw Mt(e),Gl(`root node is forbidden and cannot be sanitized in-place`)}if(Yt(e))throw Mt(e),Gl(`root node is clobbered and cannot be sanitized in-place`);l=It(e),Qe=Al()}else if(Qt(e))i=Wt(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===K.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),mn(i);else{if(!We&&!Le&&!ze&&e.indexOf(`<`)===-1)return le(e);if(i=Wt(e),!i)return We?null:Ke?w:``}i&&Ue&&At(i.firstChild);let d=c?e:i;try{c&&mn(e);let t=Gt(d);for(;o=t.nextNode();)fn(o,d);c&&zt(e,l)}catch(t){throw c&&(Mt(e),Rt(e,l)),t}finally{Qe=u}if(c){if(Rt(e,l))throw Gl(`a node selected for removal could not be safely returned; refusing to sanitize in place`);return Le&&qt(e),e}if(We){if(Le&&qt(i),Ge)for(s=he.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(D.shadowroot||D.shadowrootmode)&&(s=_e.call(r,s,!0)),s}let f=()=>ze?i.outerHTML:i.innerHTML,p=f();return Le&&U(mu,p)&&(Jt(i),p=f()),ze&&E[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&U(bu,i.ownerDocument.doctype.name)&&(p=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+p),le(p)},t.setConfig=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ct(e),Be=!0,Ve=E,He=D},t.clearConfig=function(){bt=null,Be=!1,Ve=null,He=null,C=ie,w=``},t.isValidAttribute=function(e,t,n){bt||Ct({});let r=k(e),i=k(t);return typeof n==`string`&&(un(t,n)||!Ie&&U(Tu,n))?!1:an(r,i,n)},t.addHook=function(e,t){typeof t==`function`&&H(T,e)&&El(T[e],t)},t.removeHook=function(e,t){if(H(T,e)){if(t!==void 0){let n=wl(T[e],t);return n===-1?void 0:Ol(T[e],n,1)[0]}return Tl(T[e])}},t.removeHooks=function(e){H(T,e)&&(T[e]=[])},t.removeAllHooks=function(){T=ju()},t}var Fu=Pu(),Iu=`aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos6kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12b0cam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2`,Lu=`ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2`,Ru=`numeric`,zu=`ascii`,Bu=`alpha`,Vu=`asciinumeric`,Hu=`alphanumeric`,Uu=`domain`,Wu=`emoji`,Gu=`scheme`,Ku=`slashscheme`,qu=`whitespace`;function Ju(e,t){return e in t||(t[e]=[]),t[e]}function Yu(e,t,n){t[Ru]&&(t[Vu]=!0,t[Hu]=!0),t[zu]&&(t[Vu]=!0,t[Bu]=!0),t[Vu]&&(t[Hu]=!0),t[Bu]&&(t[Hu]=!0),t[Hu]&&(t[Uu]=!0),t[Wu]&&(t[Uu]=!0);for(let r in t){let t=Ju(r,n);t.indexOf(e)<0&&t.push(e)}}function Xu(e,t){let n={};for(let r in t)t[r].indexOf(e)>=0&&(n[r]=!0);return n}function q(e=null){this.j={},this.jr=[],this.jd=null,this.t=e}q.groups={},q.prototype={accepts(){return!!this.t},go(e){let t=this,n=t.j[e];if(n)return n;for(let n=0;n<t.jr.length;n++){let r=t.jr[n][0],i=t.jr[n][1];if(i&&r.test(e))return i}return t.jd},has(e,t=!1){return t?e in this.j:!!this.go(e)},ta(e,t,n,r){for(let i=0;i<e.length;i++)this.tt(e[i],t,n,r)},tr(e,t,n,r){r||=q.groups;let i;return t&&t.j?i=t:(i=new q(t),n&&r&&Yu(t,n,r)),this.jr.push([e,i]),i},ts(e,t,n,r){let i=this,a=e.length;if(!a)return i;for(let t=0;t<a-1;t++)i=i.tt(e[t]);return i.tt(e[a-1],t,n,r)},tt(e,t,n,r){r||=q.groups;let i=this;if(t&&t.j)return i.j[e]=t,t;let a=t,o,s=i.go(e);return s?(o=new q,Object.assign(o.j,s.j),o.jr.push.apply(o.jr,s.jr),o.jd=s.jd,o.t=s.t):o=new q,a&&(r&&(o.t&&typeof o.t==`string`?Yu(a,Object.assign(Xu(o.t,r),n),r):n&&Yu(a,n,r)),o.t=a),i.j[e]=o,o}};var J=(e,t,n,r,i)=>e.ta(t,n,r,i),Y=(e,t,n,r,i)=>e.tr(t,n,r,i),Zu=(e,t,n,r,i)=>e.ts(t,n,r,i),X=(e,t,n,r,i)=>e.tt(t,n,r,i),Qu=`WORD`,$u=`UWORD`,ed=`ASCIINUMERICAL`,td=`ALPHANUMERICAL`,nd=`LOCALHOST`,rd=`TLD`,id=`UTLD`,ad=`SCHEME`,od=`SLASH_SCHEME`,sd=`NUM`,cd=`WS`,ld=`NL`,ud=`OPENBRACE`,dd=`CLOSEBRACE`,fd=`OPENBRACKET`,pd=`CLOSEBRACKET`,md=`OPENPAREN`,hd=`CLOSEPAREN`,gd=`OPENANGLEBRACKET`,_d=`CLOSEANGLEBRACKET`,vd=`FULLWIDTHLEFTPAREN`,yd=`FULLWIDTHRIGHTPAREN`,bd=`LEFTCORNERBRACKET`,xd=`RIGHTCORNERBRACKET`,Sd=`LEFTWHITECORNERBRACKET`,Cd=`RIGHTWHITECORNERBRACKET`,wd=`FULLWIDTHLESSTHAN`,Td=`FULLWIDTHGREATERTHAN`,Ed=`AMPERSAND`,Dd=`APOSTROPHE`,Od=`ASTERISK`,kd=`AT`,Ad=`BACKSLASH`,jd=`BACKTICK`,Md=`CARET`,Nd=`COLON`,Pd=`COMMA`,Fd=`DOLLAR`,Id=`DOT`,Ld=`EQUALS`,Rd=`EXCLAMATION`,zd=`HYPHEN`,Bd=`PERCENT`,Vd=`PIPE`,Hd=`PLUS`,Ud=`POUND`,Wd=`QUERY`,Gd=`QUOTE`,Kd=`FULLWIDTHMIDDLEDOT`,qd=`SEMI`,Jd=`SLASH`,Yd=`TILDE`,Xd=`UNDERSCORE`,Zd=`EMOJI`,Qd=`SYM`,$d=Object.freeze({__proto__:null,ALPHANUMERICAL:td,AMPERSAND:Ed,APOSTROPHE:Dd,ASCIINUMERICAL:ed,ASTERISK:Od,AT:kd,BACKSLASH:Ad,BACKTICK:jd,CARET:Md,CLOSEANGLEBRACKET:_d,CLOSEBRACE:dd,CLOSEBRACKET:pd,CLOSEPAREN:hd,COLON:Nd,COMMA:Pd,DOLLAR:Fd,DOT:Id,EMOJI:Zd,EQUALS:Ld,EXCLAMATION:Rd,FULLWIDTHGREATERTHAN:Td,FULLWIDTHLEFTPAREN:vd,FULLWIDTHLESSTHAN:wd,FULLWIDTHMIDDLEDOT:Kd,FULLWIDTHRIGHTPAREN:yd,HYPHEN:zd,LEFTCORNERBRACKET:bd,LEFTWHITECORNERBRACKET:Sd,LOCALHOST:nd,NL:ld,NUM:sd,OPENANGLEBRACKET:gd,OPENBRACE:ud,OPENBRACKET:fd,OPENPAREN:md,PERCENT:Bd,PIPE:Vd,PLUS:Hd,POUND:Ud,QUERY:Wd,QUOTE:Gd,RIGHTCORNERBRACKET:xd,RIGHTWHITECORNERBRACKET:Cd,SCHEME:ad,SEMI:qd,SLASH:Jd,SLASH_SCHEME:od,SYM:Qd,TILDE:Yd,TLD:rd,UNDERSCORE:Xd,UTLD:id,UWORD:$u,WORD:Qu,WS:cd}),ef=/[a-z]/,tf=/[a-z]/i,nf=/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]|\u{FE0F}/u;try{tf=RegExp(`\\p{L}`,`u`),nf=RegExp(`\\p{Emoji}`,`u`)}catch{}var rf=/\d/,af=/\s/,of=`\r`,sf=`
`,cf=`️`,lf=`‍`,uf=`￼`,df=null,ff=null;function pf(e=[]){let t={};q.groups=t;let n=new q;df??=_f(Iu),ff??=_f(Lu),X(n,`'`,Dd),X(n,`{`,ud),X(n,`}`,dd),X(n,`[`,fd),X(n,`]`,pd),X(n,`(`,md),X(n,`)`,hd),X(n,`<`,gd),X(n,`>`,_d),X(n,`（`,vd),X(n,`）`,yd),X(n,`「`,bd),X(n,`」`,xd),X(n,`『`,Sd),X(n,`』`,Cd),X(n,`＜`,wd),X(n,`＞`,Td),X(n,`&`,Ed),X(n,`*`,Od),X(n,`@`,kd),X(n,"`",jd),X(n,`^`,Md),X(n,`:`,Nd),X(n,`,`,Pd),X(n,`$`,Fd),X(n,`.`,Id),X(n,`=`,Ld),X(n,`!`,Rd),X(n,`-`,zd),X(n,`%`,Bd),X(n,`|`,Vd),X(n,`+`,Hd),X(n,`#`,Ud),X(n,`?`,Wd),X(n,`"`,Gd),X(n,`/`,Jd),X(n,`;`,qd),X(n,`~`,Yd),X(n,`_`,Xd),X(n,`\\`,Ad),X(n,`・`,Kd);let r=Y(n,rf,sd,{[Ru]:!0});Y(r,rf,r);let i=Y(r,ef,ed,{[Vu]:!0}),a=Y(r,tf,td,{[Hu]:!0}),o=Y(n,ef,Qu,{[zu]:!0});Y(o,rf,i),Y(o,ef,o),Y(i,rf,i),Y(i,ef,i);let s=Y(n,tf,$u,{[Bu]:!0});Y(s,ef),Y(s,rf,a),Y(s,tf,s),Y(a,rf,a),Y(a,ef),Y(a,tf,a);let c=X(n,sf,ld,{[qu]:!0}),l=X(n,of,cd,{[qu]:!0}),u=Y(n,af,cd,{[qu]:!0});X(n,uf,u),X(l,sf,c),X(l,uf,u),Y(l,af,u),X(u,of),X(u,sf),Y(u,af,u),X(u,uf,u);let d=Y(n,nf,Zd,{[Wu]:!0});X(d,`#`),Y(d,nf,d),X(d,cf,d);let f=X(d,lf);X(f,`#`),Y(f,nf,d);let p=[[ef,o],[rf,i]],m=[[ef,null],[tf,s],[rf,a]];for(let e=0;e<df.length;e++)gf(n,df[e],rd,Qu,p);for(let e=0;e<ff.length;e++)gf(n,ff[e],id,$u,m);Yu(rd,{tld:!0,ascii:!0},t),Yu(id,{utld:!0,alpha:!0},t),gf(n,`file`,ad,Qu,p),gf(n,`mailto`,ad,Qu,p),gf(n,`http`,od,Qu,p),gf(n,`https`,od,Qu,p),gf(n,`ftp`,od,Qu,p),gf(n,`ftps`,od,Qu,p),Yu(ad,{scheme:!0,ascii:!0},t),Yu(od,{slashscheme:!0,ascii:!0},t),e=e.sort((e,t)=>e[0]>t[0]?1:-1);for(let t=0;t<e.length;t++){let r=e[t][0],i=e[t][1]?{[Gu]:!0}:{[Ku]:!0};r.indexOf(`-`)>=0?i[Uu]=!0:ef.test(r)?rf.test(r)?i[Vu]=!0:i[zu]=!0:i[Ru]=!0,Zu(n,r,r,i)}return Zu(n,`localhost`,nd,{ascii:!0}),n.jd=new q(Qd),{start:n,tokens:Object.assign({groups:t},$d)}}function mf(e,t){let n=hf(t.replace(/[A-Z]/g,e=>e.toLowerCase())),r=n.length,i=[],a=0,o=0;for(;o<r;){let s=e,c=null,l=0,u=null,d=-1,f=-1;for(;o<r&&(c=s.go(n[o]));)s=c,s.accepts()?(d=0,f=0,u=s):d>=0&&(d+=n[o].length,f++),l+=n[o].length,a+=n[o].length,o++;a-=d,o-=f,l-=d,i.push({t:u.t,v:t.slice(a-l,a),s:a-l,e:a})}return i}function hf(e){let t=[],n=e.length,r=0;for(;r<n;){let i=e.charCodeAt(r),a,o=i<55296||i>56319||r+1===n||(a=e.charCodeAt(r+1))<56320||a>57343?e[r]:e.slice(r,r+2);t.push(o),r+=o.length}return t}function gf(e,t,n,r,i){let a,o=t.length;for(let n=0;n<o-1;n++){let o=t[n];e.j[o]?a=e.j[o]:(a=new q(r),a.jr=i.slice(),e.j[o]=a),e=a}return a=new q(n),a.jr=i.slice(),e.j[t[o-1]]=a,a}function _f(e){let t=[],n=[],r=0;for(;r<e.length;){let i=0;for(;`0123456789`.indexOf(e[r+i])>=0;)i++;if(i>0){t.push(n.join(``));for(let t=parseInt(e.substring(r,r+i),10);t>0;t--)n.pop();r+=i}else n.push(e[r]),r++}return t}var vf={defaultProtocol:`http`,events:null,format:bf,formatHref:bf,nl2br:!1,tagName:`a`,target:null,rel:null,validate:!0,truncate:1/0,className:null,attributes:null,ignoreTags:[],ignoreClasses:[],render:null};function yf(e,t=null){let n=Object.assign({},vf);e&&(n=Object.assign(n,e instanceof yf?e.o:e));let r=n.ignoreTags,i=[];for(let e=0;e<r.length;e++)i.push(r[e].toUpperCase());this.o=n,t&&(this.defaultRender=t),this.ignoreTags=i,this.ignoreClasses=n.ignoreClasses.slice()}yf.prototype={o:vf,ignoreTags:[],ignoreClasses:[],isIgnoredClass(e){if(typeof e!=`string`||this.ignoreClasses.length===0)return!1;let t=e.split(/\s+/);for(let e=0;e<t.length;e++)if(this.ignoreClasses.indexOf(t[e])>=0)return!0;return!1},defaultRender(e){return e},check(e){return this.get(`validate`,e.toString(),e)},get(e,t,n){let r=t!=null,i=this.o[e];return i&&(typeof i==`object`?(i=n.t in i?i[n.t]:vf[e],typeof i==`function`&&r&&(i=i(t,n))):typeof i==`function`&&r&&(i=i(t,n.t,n)),i)},getObj(e,t,n){let r=this.o[e];return typeof r==`function`&&t!=null&&(r=r(t,n.t,n)),r},render(e){let t=e.render(this);return(this.get(`render`,null,e)||this.defaultRender)(t,e.t,e)}};function bf(e){return e}function xf(e,t){this.t=`token`,this.v=e,this.tk=t}xf.prototype={isLink:!1,toString(){return this.v},toHref(e){return this.toString()},toFormattedString(e){let t=this.toString(),n=e.get(`truncate`,t,this),r=e.get(`format`,t,this);return n&&r.length>n?r.substring(0,n)+`…`:r},toFormattedHref(e){return e.get(`formatHref`,this.toHref(e.get(`defaultProtocol`)),this)},startIndex(){return this.tk[0].s},endIndex(){return this.tk[this.tk.length-1].e},toObject(e=vf.defaultProtocol){return{type:this.t,value:this.toString(),isLink:this.isLink,href:this.toHref(e),start:this.startIndex(),end:this.endIndex()}},toFormattedObject(e){return{type:this.t,value:this.toFormattedString(e),isLink:this.isLink,href:this.toFormattedHref(e),start:this.startIndex(),end:this.endIndex()}},validate(e){return e.get(`validate`,this.toString(),this)},render(e){let t=this,n=this.toHref(e.get(`defaultProtocol`)),r=e.get(`formatHref`,n,this),i=e.get(`tagName`,n,t),a=this.toFormattedString(e),o={},s=e.get(`className`,n,t),c=e.get(`target`,n,t),l=e.get(`rel`,n,t),u=e.getObj(`attributes`,n,t),d=e.getObj(`events`,n,t);return o.href=r,s&&(o.class=s),c&&(o.target=c),l&&(o.rel=l),u&&Object.assign(o,u),{tagName:i,attributes:o,content:a,eventListeners:d}}};function Sf(e,t){class n extends xf{constructor(t,n){super(t,n),this.t=e}}for(let e in t)n.prototype[e]=t[e];return n.t=e,n}var Cf=Sf(`email`,{isLink:!0,toHref(){return`mailto:`+this.toString()}}),wf=Sf(`text`),Tf=Sf(`nl`),Ef=Sf(`url`,{isLink:!0,toHref(e=vf.defaultProtocol){return this.hasProtocol()?this.v:`${e}://${this.v}`},hasProtocol(){let e=this.tk;return e.length>=2&&e[0].t!==nd&&e[1].t===Nd}}),Df=e=>new q(e);function Of({groups:e}){let t=e.domain.concat([Ed,Od,kd,Ad,jd,Md,Fd,Ld,zd,sd,Bd,Vd,Hd,Ud,Jd,Qd,Yd,Xd]),n=[Dd,Nd,Pd,Id,Rd,Bd,Wd,Gd,qd,gd,_d,ud,dd,pd,fd,md,hd,vd,yd,bd,xd,Sd,Cd,wd,Td],r=[Ed,Dd,Od,Ad,jd,Md,Fd,Ld,zd,ud,dd,Bd,Vd,Hd,Ud,Wd,Jd,Qd,Yd,Xd],i=Df(),a=X(i,Yd);J(a,r,a),J(a,e.domain,a);let o=Df(),s=Df(),c=Df();J(i,e.domain,o),J(i,e.scheme,s),J(i,e.slashscheme,c),J(o,r,a),J(o,e.domain,o);let l=X(o,kd);X(a,kd,l),X(s,kd,l),X(c,kd,l);let u=X(a,Id);J(u,r,a),J(u,e.domain,a);let d=Df();J(l,e.domain,d),J(d,e.domain,d);let f=X(d,Id);J(f,e.domain,d);let p=Df(Cf);J(f,e.tld,p),J(f,e.utld,p),X(l,nd,p);let m=X(d,zd);X(m,zd,m),J(m,e.domain,d),J(p,e.domain,d),X(p,Id,f),X(p,zd,m);let h=X(o,zd),g=X(o,Id);X(h,zd,h),J(h,e.domain,o),J(g,r,a),J(g,e.domain,o);let _=Df(Ef);J(g,e.tld,_),J(g,e.utld,_),J(_,e.domain,o),J(_,r,a),X(_,Id,g),X(_,zd,h),X(_,kd,l);let v=X(_,Nd),y=Df(Ef);J(v,e.numeric,y);let b=Df(Ef),x=Df();J(b,t,b),J(b,n,x),J(x,t,b),J(x,n,x),X(_,Jd,b),X(y,Jd,b),X(_,Wd,x),X(_,Ud,b),X(y,Wd,x),X(y,Ud,b);let ee=X(s,Nd),S=X(X(X(c,Nd),Jd),Jd);J(s,e.domain,o),X(s,Id,g),X(s,zd,h),J(c,e.domain,o),X(c,Id,g),X(c,zd,h),J(ee,e.domain,b),X(ee,Jd,b),X(ee,Wd,b),J(S,e.domain,b),J(S,t,b),X(S,Jd,b);let te=[[ud,dd],[fd,pd],[md,hd],[gd,_d],[vd,yd],[bd,xd],[Sd,Cd],[wd,Td]];for(let e=0;e<te.length;e++){let[r,i]=te[e],a=X(b,r);X(x,r,a);let o=Df(Ef);J(a,t,o);let s=Df();J(a,n,s),X(a,i,b),J(o,t,o),J(o,n,s),J(s,t,o),J(s,n,s),X(o,i,b),X(s,i,b)}return X(i,nd,_),X(i,ld,Tf),{start:i,tokens:$d}}function kf(e,t,n){let r=n.length,i=0,a=[],o=[],s=[];for(;i<r;){let c=e,l=null,u=null,d=0,f=null,p=-1,m=[];for(;i<r&&!(l=c.go(n[i].t));)o.push(n[i++]);for(;i<r&&(u=l||c.go(n[i].t));)if(l=null,c=u,i++,d++,c.accepts())p=0,f=c,m=[];else if(p>=0&&p++,m.push(c),s[i]&&s[i].has(c))break;for(let e=0,t=i-m.length+1;e<m.length;e++,t++)(s[t]||(s[t]=new Set)).add(m[e]);if(p<0)i-=d,i<r&&(o.push(n[i]),i++);else{o.length>0&&(a.push(Af(wf,t,o)),o=[]),i-=p,d-=p;let e=f.t,r=n.slice(i-d,i);a.push(Af(e,t,r))}}return o.length>0&&a.push(Af(wf,t,o)),a}function Af(e,t,n){let r=n[0].s,i=n[n.length-1].e;return new e(t.slice(r,i),n)}var Z={scanner:null,parser:null,tokenQueue:[],pluginQueue:[],customSchemes:[],initialized:!1};function jf(){Z.scanner=pf(Z.customSchemes);for(let e=0;e<Z.tokenQueue.length;e++)Z.tokenQueue[e][1]({scanner:Z.scanner});Z.parser=Of(Z.scanner.tokens);for(let e=0;e<Z.pluginQueue.length;e++)Z.pluginQueue[e][1]({scanner:Z.scanner,parser:Z.parser});return Z.initialized=!0,Z}function Mf(e){return Z.initialized||jf(),kf(Z.parser.start,e,mf(Z.scanner.start,e))}Mf.scan=mf;var Nf={amp:`&`,gt:`>`,lt:`<`,nbsp:`\xA0`,quot:`"`},Pf=/^#[xX]([A-Fa-f0-9]+)$/,Ff=/^#([0-9]+)$/,If=/^([A-Za-z0-9]+)$/,Lf=function(){function e(e){this.named=e}return e.prototype.parse=function(e){if(e){var t=e.match(Pf);if(t)return String.fromCharCode(parseInt(t[1],16));if(t=e.match(Ff),t)return String.fromCharCode(parseInt(t[1],10));if(t=e.match(If),t)return this.named[t[1]]||`&`+t[1]+`;`}},e}(),Rf=/[\t\n\f ]/,zf=/[A-Za-z]/,Bf=/\r\n?/g;function Q(e){return Rf.test(e)}function Vf(e){return zf.test(e)}function Hf(e){return e.replace(Bf,`
`)}var Uf=function(){function e(e,t,n){n===void 0&&(n=`precompile`),this.delegate=e,this.entityParser=t,this.mode=n,this.state=`beforeData`,this.line=-1,this.column=-1,this.input=``,this.index=-1,this.tagNameBuffer=``,this.states={beforeData:function(){var e=this.peek();if(e===`<`&&!this.isIgnoredEndTag())this.transitionTo(`tagOpen`),this.markTagStart(),this.consume();else{if(this.mode===`precompile`&&e===`
`){var t=this.tagNameBuffer.toLowerCase();(t===`pre`||t===`textarea`)&&this.consume()}this.transitionTo(`data`),this.delegate.beginData()}},data:function(){var e=this.peek(),t=this.tagNameBuffer;e===`<`&&!this.isIgnoredEndTag()?(this.delegate.finishData(),this.transitionTo(`tagOpen`),this.markTagStart(),this.consume()):e===`&`&&t!==`script`&&t!==`style`?(this.consume(),this.delegate.appendToData(this.consumeCharRef()||`&`)):(this.consume(),this.delegate.appendToData(e))},tagOpen:function(){var e=this.consume();e===`!`?this.transitionTo(`markupDeclarationOpen`):e===`/`?this.transitionTo(`endTagOpen`):(e===`@`||e===`:`||Vf(e))&&(this.transitionTo(`tagName`),this.tagNameBuffer=``,this.delegate.beginStartTag(),this.appendToTagName(e))},markupDeclarationOpen:function(){var e=this.consume();e===`-`&&this.peek()===`-`?(this.consume(),this.transitionTo(`commentStart`),this.delegate.beginComment()):e.toUpperCase()+this.input.substring(this.index,this.index+6).toUpperCase()===`DOCTYPE`&&(this.consume(),this.consume(),this.consume(),this.consume(),this.consume(),this.consume(),this.transitionTo(`doctype`),this.delegate.beginDoctype&&this.delegate.beginDoctype())},doctype:function(){Q(this.consume())&&this.transitionTo(`beforeDoctypeName`)},beforeDoctypeName:function(){var e=this.consume();Q(e)||(this.transitionTo(`doctypeName`),this.delegate.appendToDoctypeName&&this.delegate.appendToDoctypeName(e.toLowerCase()))},doctypeName:function(){var e=this.consume();Q(e)?this.transitionTo(`afterDoctypeName`):e===`>`?(this.delegate.endDoctype&&this.delegate.endDoctype(),this.transitionTo(`beforeData`)):this.delegate.appendToDoctypeName&&this.delegate.appendToDoctypeName(e.toLowerCase())},afterDoctypeName:function(){var e=this.consume();if(!Q(e)){if(e===`>`)this.delegate.endDoctype&&this.delegate.endDoctype(),this.transitionTo(`beforeData`);else{var t=e.toUpperCase()+this.input.substring(this.index,this.index+5).toUpperCase(),n=t.toUpperCase()===`PUBLIC`,r=t.toUpperCase()===`SYSTEM`;(n||r)&&(this.consume(),this.consume(),this.consume(),this.consume(),this.consume(),this.consume()),n?this.transitionTo(`afterDoctypePublicKeyword`):r&&this.transitionTo(`afterDoctypeSystemKeyword`)}}},afterDoctypePublicKeyword:function(){var e=this.peek();Q(e)?(this.transitionTo(`beforeDoctypePublicIdentifier`),this.consume()):e===`"`?(this.transitionTo(`doctypePublicIdentifierDoubleQuoted`),this.consume()):e===`'`?(this.transitionTo(`doctypePublicIdentifierSingleQuoted`),this.consume()):e===`>`&&(this.consume(),this.delegate.endDoctype&&this.delegate.endDoctype(),this.transitionTo(`beforeData`))},doctypePublicIdentifierDoubleQuoted:function(){var e=this.consume();e===`"`?this.transitionTo(`afterDoctypePublicIdentifier`):e===`>`?(this.delegate.endDoctype&&this.delegate.endDoctype(),this.transitionTo(`beforeData`)):this.delegate.appendToDoctypePublicIdentifier&&this.delegate.appendToDoctypePublicIdentifier(e)},doctypePublicIdentifierSingleQuoted:function(){var e=this.consume();e===`'`?this.transitionTo(`afterDoctypePublicIdentifier`):e===`>`?(this.delegate.endDoctype&&this.delegate.endDoctype(),this.transitionTo(`beforeData`)):this.delegate.appendToDoctypePublicIdentifier&&this.delegate.appendToDoctypePublicIdentifier(e)},afterDoctypePublicIdentifier:function(){var e=this.consume();Q(e)?this.transitionTo(`betweenDoctypePublicAndSystemIdentifiers`):e===`>`?(this.delegate.endDoctype&&this.delegate.endDoctype(),this.transitionTo(`beforeData`)):e===`"`?this.transitionTo(`doctypeSystemIdentifierDoubleQuoted`):e===`'`&&this.transitionTo(`doctypeSystemIdentifierSingleQuoted`)},betweenDoctypePublicAndSystemIdentifiers:function(){var e=this.consume();Q(e)||(e===`>`?(this.delegate.endDoctype&&this.delegate.endDoctype(),this.transitionTo(`beforeData`)):e===`"`?this.transitionTo(`doctypeSystemIdentifierDoubleQuoted`):e===`'`&&this.transitionTo(`doctypeSystemIdentifierSingleQuoted`))},doctypeSystemIdentifierDoubleQuoted:function(){var e=this.consume();e===`"`?this.transitionTo(`afterDoctypeSystemIdentifier`):e===`>`?(this.delegate.endDoctype&&this.delegate.endDoctype(),this.transitionTo(`beforeData`)):this.delegate.appendToDoctypeSystemIdentifier&&this.delegate.appendToDoctypeSystemIdentifier(e)},doctypeSystemIdentifierSingleQuoted:function(){var e=this.consume();e===`'`?this.transitionTo(`afterDoctypeSystemIdentifier`):e===`>`?(this.delegate.endDoctype&&this.delegate.endDoctype(),this.transitionTo(`beforeData`)):this.delegate.appendToDoctypeSystemIdentifier&&this.delegate.appendToDoctypeSystemIdentifier(e)},afterDoctypeSystemIdentifier:function(){var e=this.consume();Q(e)||e===`>`&&(this.delegate.endDoctype&&this.delegate.endDoctype(),this.transitionTo(`beforeData`))},commentStart:function(){var e=this.consume();e===`-`&&this.peek()===`-`?this.transitionTo(`commentStartDash`):e===`>`?(this.delegate.finishComment(),this.transitionTo(`beforeData`)):(this.delegate.appendToCommentData(e),this.transitionTo(`comment`))},commentStartDash:function(){var e=this.consume();e===`-`?this.transitionTo(`commentEnd`):e===`>`?(this.delegate.finishComment(),this.transitionTo(`beforeData`)):(this.delegate.appendToCommentData(`-`),this.transitionTo(`comment`))},comment:function(){var e=this.consume();e===`-`?this.transitionTo(`commentEndDash`):this.delegate.appendToCommentData(e)},commentEndDash:function(){var e=this.consume();e===`-`&&this.peek()===`-`?this.delegate.appendToCommentData(e):e===`-`?this.transitionTo(`commentEnd`):(this.delegate.appendToCommentData(`-`+e),this.transitionTo(`comment`))},commentEnd:function(){var e=this.consume();e===`>`?(this.delegate.finishComment(),this.transitionTo(`beforeData`)):(this.delegate.appendToCommentData(`--`+e),this.transitionTo(`comment`))},tagName:function(){var e=this.consume();Q(e)?this.transitionTo(`beforeAttributeName`):e===`/`?this.transitionTo(`selfClosingStartTag`):e===`>`?(this.delegate.finishTag(),this.transitionTo(`beforeData`)):this.appendToTagName(e)},endTagName:function(){var e=this.consume();Q(e)?(this.transitionTo(`beforeAttributeName`),this.tagNameBuffer=``):e===`/`?(this.transitionTo(`selfClosingStartTag`),this.tagNameBuffer=``):e===`>`?(this.delegate.finishTag(),this.transitionTo(`beforeData`),this.tagNameBuffer=``):this.appendToTagName(e)},beforeAttributeName:function(){var e=this.peek();Q(e)?this.consume():e===`/`?(this.transitionTo(`selfClosingStartTag`),this.consume()):e===`>`?(this.consume(),this.delegate.finishTag(),this.transitionTo(`beforeData`)):e===`=`?(this.delegate.reportSyntaxError(`attribute name cannot start with equals sign`),this.transitionTo(`attributeName`),this.delegate.beginAttribute(),this.consume(),this.delegate.appendToAttributeName(e)):(this.transitionTo(`attributeName`),this.delegate.beginAttribute())},attributeName:function(){var e=this.peek();Q(e)?(this.transitionTo(`afterAttributeName`),this.consume()):e===`/`?(this.delegate.beginAttributeValue(!1),this.delegate.finishAttributeValue(),this.consume(),this.transitionTo(`selfClosingStartTag`)):e===`=`?(this.transitionTo(`beforeAttributeValue`),this.consume()):e===`>`?(this.delegate.beginAttributeValue(!1),this.delegate.finishAttributeValue(),this.consume(),this.delegate.finishTag(),this.transitionTo(`beforeData`)):e===`"`||e===`'`||e===`<`?(this.delegate.reportSyntaxError(e+` is not a valid character within attribute names`),this.consume(),this.delegate.appendToAttributeName(e)):(this.consume(),this.delegate.appendToAttributeName(e))},afterAttributeName:function(){var e=this.peek();Q(e)?this.consume():e===`/`?(this.delegate.beginAttributeValue(!1),this.delegate.finishAttributeValue(),this.consume(),this.transitionTo(`selfClosingStartTag`)):e===`=`?(this.consume(),this.transitionTo(`beforeAttributeValue`)):e===`>`?(this.delegate.beginAttributeValue(!1),this.delegate.finishAttributeValue(),this.consume(),this.delegate.finishTag(),this.transitionTo(`beforeData`)):(this.delegate.beginAttributeValue(!1),this.delegate.finishAttributeValue(),this.transitionTo(`attributeName`),this.delegate.beginAttribute(),this.consume(),this.delegate.appendToAttributeName(e))},beforeAttributeValue:function(){var e=this.peek();Q(e)?this.consume():e===`"`?(this.transitionTo(`attributeValueDoubleQuoted`),this.delegate.beginAttributeValue(!0),this.consume()):e===`'`?(this.transitionTo(`attributeValueSingleQuoted`),this.delegate.beginAttributeValue(!0),this.consume()):e===`>`?(this.delegate.beginAttributeValue(!1),this.delegate.finishAttributeValue(),this.consume(),this.delegate.finishTag(),this.transitionTo(`beforeData`)):(this.transitionTo(`attributeValueUnquoted`),this.delegate.beginAttributeValue(!1),this.consume(),this.delegate.appendToAttributeValue(e))},attributeValueDoubleQuoted:function(){var e=this.consume();e===`"`?(this.delegate.finishAttributeValue(),this.transitionTo(`afterAttributeValueQuoted`)):e===`&`?this.delegate.appendToAttributeValue(this.consumeCharRef()||`&`):this.delegate.appendToAttributeValue(e)},attributeValueSingleQuoted:function(){var e=this.consume();e===`'`?(this.delegate.finishAttributeValue(),this.transitionTo(`afterAttributeValueQuoted`)):e===`&`?this.delegate.appendToAttributeValue(this.consumeCharRef()||`&`):this.delegate.appendToAttributeValue(e)},attributeValueUnquoted:function(){var e=this.peek();Q(e)?(this.delegate.finishAttributeValue(),this.consume(),this.transitionTo(`beforeAttributeName`)):e===`/`?(this.delegate.finishAttributeValue(),this.consume(),this.transitionTo(`selfClosingStartTag`)):e===`&`?(this.consume(),this.delegate.appendToAttributeValue(this.consumeCharRef()||`&`)):e===`>`?(this.delegate.finishAttributeValue(),this.consume(),this.delegate.finishTag(),this.transitionTo(`beforeData`)):(this.consume(),this.delegate.appendToAttributeValue(e))},afterAttributeValueQuoted:function(){var e=this.peek();Q(e)?(this.consume(),this.transitionTo(`beforeAttributeName`)):e===`/`?(this.consume(),this.transitionTo(`selfClosingStartTag`)):e===`>`?(this.consume(),this.delegate.finishTag(),this.transitionTo(`beforeData`)):this.transitionTo(`beforeAttributeName`)},selfClosingStartTag:function(){this.peek()===`>`?(this.consume(),this.delegate.markTagAsSelfClosing(),this.delegate.finishTag(),this.transitionTo(`beforeData`)):this.transitionTo(`beforeAttributeName`)},endTagOpen:function(){var e=this.consume();(e===`@`||e===`:`||Vf(e))&&(this.transitionTo(`endTagName`),this.tagNameBuffer=``,this.delegate.beginEndTag(),this.appendToTagName(e))}},this.reset()}return e.prototype.reset=function(){this.transitionTo(`beforeData`),this.input=``,this.tagNameBuffer=``,this.index=0,this.line=1,this.column=0,this.delegate.reset()},e.prototype.transitionTo=function(e){this.state=e},e.prototype.tokenize=function(e){this.reset(),this.tokenizePart(e),this.tokenizeEOF()},e.prototype.tokenizePart=function(e){for(this.input+=Hf(e);this.index<this.input.length;){var t=this.states[this.state];if(t!==void 0)t.call(this);else throw Error(`unhandled state `+this.state)}},e.prototype.tokenizeEOF=function(){this.flushData()},e.prototype.flushData=function(){this.state===`data`&&(this.delegate.finishData(),this.transitionTo(`beforeData`))},e.prototype.peek=function(){return this.input.charAt(this.index)},e.prototype.consume=function(){var e=this.peek();return this.index++,e===`
`?(this.line++,this.column=0):this.column++,e},e.prototype.consumeCharRef=function(){var e=this.input.indexOf(`;`,this.index);if(e!==-1){var t=this.input.slice(this.index,e),n=this.entityParser.parse(t);if(n){for(var r=t.length;r;)this.consume(),r--;return this.consume(),n}}},e.prototype.markTagStart=function(){this.delegate.tagOpen()},e.prototype.appendToTagName=function(e){this.tagNameBuffer+=e,this.delegate.appendToTagName(e)},e.prototype.isIgnoredEndTag=function(){var e=this.tagNameBuffer;return e===`title`&&this.input.substring(this.index,this.index+8)!==`</title>`||e===`style`&&this.input.substring(this.index,this.index+8)!==`</style>`||e===`script`&&this.input.substring(this.index,this.index+9)!==`<\/script>`},e}(),Wf=function(){function e(e,t){t===void 0&&(t={}),this.options=t,this.token=null,this.startLine=1,this.startColumn=0,this.tokens=[],this.tokenizer=new Uf(this,e,t.mode),this._currentAttribute=void 0}return e.prototype.tokenize=function(e){return this.tokens=[],this.tokenizer.tokenize(e),this.tokens},e.prototype.tokenizePart=function(e){return this.tokens=[],this.tokenizer.tokenizePart(e),this.tokens},e.prototype.tokenizeEOF=function(){return this.tokens=[],this.tokenizer.tokenizeEOF(),this.tokens[0]},e.prototype.reset=function(){this.token=null,this.startLine=1,this.startColumn=0},e.prototype.current=function(){var e=this.token;if(e===null)throw Error(`token was unexpectedly null`);if(arguments.length===0)return e;for(var t=0;t<arguments.length;t++)if(e.type===arguments[t])return e;throw Error(`token type was unexpectedly `+e.type)},e.prototype.push=function(e){this.token=e,this.tokens.push(e)},e.prototype.currentAttribute=function(){return this._currentAttribute},e.prototype.addLocInfo=function(){this.options.loc&&(this.current().loc={start:{line:this.startLine,column:this.startColumn},end:{line:this.tokenizer.line,column:this.tokenizer.column}}),this.startLine=this.tokenizer.line,this.startColumn=this.tokenizer.column},e.prototype.beginDoctype=function(){this.push({type:`Doctype`,name:``})},e.prototype.appendToDoctypeName=function(e){this.current(`Doctype`).name+=e},e.prototype.appendToDoctypePublicIdentifier=function(e){var t=this.current(`Doctype`);t.publicIdentifier===void 0?t.publicIdentifier=e:t.publicIdentifier+=e},e.prototype.appendToDoctypeSystemIdentifier=function(e){var t=this.current(`Doctype`);t.systemIdentifier===void 0?t.systemIdentifier=e:t.systemIdentifier+=e},e.prototype.endDoctype=function(){this.addLocInfo()},e.prototype.beginData=function(){this.push({type:`Chars`,chars:``})},e.prototype.appendToData=function(e){this.current(`Chars`).chars+=e},e.prototype.finishData=function(){this.addLocInfo()},e.prototype.beginComment=function(){this.push({type:`Comment`,chars:``})},e.prototype.appendToCommentData=function(e){this.current(`Comment`).chars+=e},e.prototype.finishComment=function(){this.addLocInfo()},e.prototype.tagOpen=function(){},e.prototype.beginStartTag=function(){this.push({type:`StartTag`,tagName:``,attributes:[],selfClosing:!1})},e.prototype.beginEndTag=function(){this.push({type:`EndTag`,tagName:``})},e.prototype.finishTag=function(){this.addLocInfo()},e.prototype.markTagAsSelfClosing=function(){this.current(`StartTag`).selfClosing=!0},e.prototype.appendToTagName=function(e){this.current(`StartTag`,`EndTag`).tagName+=e},e.prototype.beginAttribute=function(){this._currentAttribute=[``,``,!1]},e.prototype.appendToAttributeName=function(e){this.currentAttribute()[0]+=e},e.prototype.beginAttributeValue=function(e){this.currentAttribute()[2]=e},e.prototype.appendToAttributeValue=function(e){this.currentAttribute()[1]+=e},e.prototype.finishAttributeValue=function(){this.current(`StartTag`).attributes.push(this._currentAttribute)},e.prototype.reportSyntaxError=function(e){this.current().syntaxError=e},e}();function Gf(e,t){return new Wf(new Lf(Nf),t).tokenize(e)}var Kf=`LinkifyResult`,qf=`StartTag`,Jf=`EndTag`,Yf=`Chars`,Xf=`Comment`,Zf=`Doctype`;function Qf(e,t={}){let n=Gf(e),r=[],i=[],a=new yf(t,tp);for(let e=0;e<n.length;e++){let t=n[e];if(t.type===qf){r.push(t);let i=t.tagName.toUpperCase();if(!(i===`A`||a.ignoreTags.indexOf(i)>=0||a.isIgnoredClass(op(t.attributes,`class`)))||t.selfClosing)continue;let o=r.length;ep(i,n,++e,r),e+=r.length-o-1}else if(t.type!==Yf)r.push(t);else{let e=$f(t.chars,a);r.push.apply(r,e)}}for(let e=0;e<r.length;e++){let t=r[e];switch(t.type){case Kf:i.push(t.rendered);break;case qf:{let e=`<`+t.tagName;t.attributes.length>0&&(e+=` `+ap(t.attributes).join(` `)),t.selfClosing&&(e+=` /`),e+=`>`,i.push(e);break}case Jf:i.push(`</${t.tagName}>`);break;case Yf:i.push(np(t.chars));break;case Xf:i.push(`<!--${np(t.chars)}-->`);break;case Zf:{let e=`<!DOCTYPE ${t.name}`;t.publicIdentifier&&(e+=` PUBLIC "${t.publicIdentifier}"`),t.systemIdentifier&&(e+=` "${t.systemIdentifier}"`),e+=`>`,i.push(e);break}}}return i.join(``)}function $f(e,t){let n=Mf(e),r=[];for(let e=0;e<n.length;e++){let i=n[e];i.t===`nl`&&t.get(`nl2br`)?r.push({type:qf,tagName:`br`,attributes:[],selfClosing:!0}):!i.isLink||!t.check(i)?r.push({type:Yf,chars:i.toString()}):r.push({type:Kf,rendered:t.render(i)})}return r}function ep(e,t,n,r){let i=1;for(;n<t.length&&i>0;){let a=t[n];a.type===qf&&a.tagName.toUpperCase()===e?i++:a.type===Jf&&a.tagName.toUpperCase()===e&&i--,r.push(a),n++}return r}function tp({tagName:e,attributes:t,content:n}){return`<${e} ${ip(t)}>${np(n)}</${e}>`}function np(e){return e.replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function rp(e){return e.replace(/"/g,`&quot;`)}function ip(e){let t=[];for(let n in e){let r=e[n]+``;t.push(`${n}="${rp(r)}"`)}return t.join(` `)}function ap(e){let t=[];for(let n=0;n<e.length;n++){let r=e[n][0],i=e[n][1]+``;t.push(`${r}="${rp(i)}"`)}return t}function op(e,t){for(let n=0;n<e.length;n++)if(e[n][0].toLowerCase()===t)return e[n][1];return null}var sp=[`chime`,`drop`,`ping`,`system`,`off`],cp=`chime`,lp={},up=.7,dp=.35,fp={chime:[{start:0,duration:.35,freq:784,type:`sine`},{start:.11,duration:.55,freq:1175,type:`sine`},{start:.11,duration:.3,freq:2350,type:`sine`,gain:.15}],drop:[{start:0,duration:.22,freq:1500,to:520,type:`sine`},{start:.12,duration:.25,freq:1100,to:700,type:`sine`,gain:.35}],ping:[{start:0,duration:.45,freq:1568,type:`triangle`},{start:0,duration:.2,freq:3136,type:`sine`,gain:.12}]};function pp(e){return sp.includes(e)?e:cp}function mp(e){return!!(fp[e]||lp[e])}var hp=new Map;function gp(e){if(typeof globalThis.Audio!=`function`)return!1;try{let t=hp.get(e);return t||(t=new globalThis.Audio(e),t.preload=`auto`,hp.set(e,t)),t.volume=up,t.currentTime=0,t.play()?.catch?.(()=>{}),!0}catch{return!1}}var _p=null;function vp(){let e=globalThis.AudioContext||globalThis.webkitAudioContext;return e?(_p&&_p.state!==`closed`||(_p=new e),_p):null}function yp(e,t,n){let r=e.currentTime+n.start,i=r+n.duration,a=e.createOscillator(),o=e.createGain();a.type=n.type,a.frequency.setValueAtTime(n.freq,r),n.to&&a.frequency.exponentialRampToValueAtTime(n.to,r+n.duration*.6),o.gain.setValueAtTime(1e-4,r),o.gain.exponentialRampToValueAtTime(n.gain??1,r+.01),o.gain.exponentialRampToValueAtTime(1e-4,i),a.connect(o).connect(t),a.start(r),a.stop(i+.02)}function bp(e){if(lp[e])return gp(lp[e]);let t=fp[e];if(!t)return!1;let n=vp();if(!n)return!1;try{n.state===`suspended`&&n.resume().catch(()=>{});let e=n.createGain();return e.gain.value=dp,e.connect(n.destination),t.forEach(t=>yp(n,e,t)),!0}catch{return!1}}var xp=new WeakMap;function Sp(e,t=`auto`){if(xp.get(e)?.(),xp.delete(e),t===`dark`||t===`light`){e.setAttribute(`data-bs-theme`,t);return}let n=globalThis.matchMedia?.(`(prefers-color-scheme: light)`),r=()=>e.setAttribute(`data-bs-theme`,n?.matches?`light`:`dark`);r(),n?.addEventListener&&(n.addEventListener(`change`,r),xp.set(e,()=>n.removeEventListener(`change`,r)))}var Cp=/\.(jpe?g|png|gif|webp)(\?.*)?$/i,wp=/\.(mp4|webm|mp3)(\?.*)?$/i,Tp=/(?:youtube\.com\/watch\?v=|youtu\.be\/)([-\w]+)/,Ep=24,Dp=new Set([`=scene=`,`umgebung`,`=umgebung=`]),Op=`starchat:`;function kp(e){return`${Op}${String(e||``).toLowerCase()}`}function Ap(e,t){if(typeof e!=`string`||!e||!t)return!1;try{let n=new URL(e);return n.protocol===`https:`&&n.origin===new URL(t).origin}catch{return!1}}var jp=new WeakMap;function Mp(e){try{return decodeURIComponent(new URL(e).pathname.split(`/`).pop()||e)}catch{return e}}function Np(){return{nickHueOf(e){return this.customNickHue?.(e)??ve(e)},getNickColor(e){return`hsl(${this.nickHueOf(e)} 70% 65%)`},nickStyle(e){return`--nick-hue: ${this.nickHueOf(e)}`},nickInitial(e){return(String(e||`?`).replace(/^[^A-Za-z0-9]+/,``)[0]||`?`).toUpperCase()},avatarUrl(e){return this.avatarUrls[String(e||``).toLowerCase()]||``},setUserAvatar(e,t){this.hasFeature(`profiles`)&&Ap(t,this.connection?.apiBaseUrl)?this.avatarUrls[e.toLowerCase()]=t:this.clearUserAvatar(e)},clearUserAvatar(e){delete this.avatarUrls[String(e||``).toLowerCase()]},renameUserAvatar(e,t){let n=this.avatarUrl(e);this.clearUserAvatar(e),n&&this.setUserAvatar(t,n)},formatClock(e){return e?ge(e,this.t(`locale`)):``},formatFullTimestamp(e){return e?new Date(e).toLocaleString(this.t(`locale`)):``},parseMircFormatting(e){return oe(e,this.mircColors)},formatChatMessage(e){let t=oe(e,this.mircColors).replace(/\r\n|\r|\n/g,`<br>`);return t=t.replace(/https?:\/\/[^\s<]+/g,e=>{let t=e.replace(/&amp;/g,`&`),n=e;if(this.isUploadUrl?.(t)||Cp.test(t))return`<span class="media-wrapper"><a href="${n}" target="_blank" rel="noopener noreferrer"><img class="chat-media" src="${n}" alt="image" loading="lazy"></a></span>`;if(wp.test(t))return`<span class="media-wrapper"><a href="${n}" class="media-play-card" data-media-type="${/\.mp3(\?.*)?$/i.test(t)?`audio`:`video`}" target="_blank" rel="noopener noreferrer"><i class="bi bi-play-circle-fill"></i><span>${Mp(t).replace(/[<>"&]/g,``)}</span></a></span>`;let r=t.match(Tp);if(r){let e=r[1];return`<span class="media-wrapper"><a href="https://www.youtube.com/watch?v=${e}" class="youtube-card" data-youtube-id="${e}" target="_blank" rel="noopener noreferrer"><img class="chat-media youtube-thumbnail" src="https://img.youtube.com/vi/${e}/mqdefault.jpg" alt="YouTube" loading="lazy"><i class="bi bi-play-btn-fill youtube-play-icon"></i></a></span>`}return`<a href="${n}" target="_blank" rel="noopener noreferrer">${n}</a>`}),t=Qf(t,{target:`_blank`,rel:`noopener noreferrer`}),t=Fu.sanitize(t,{ADD_ATTR:[`target`]}),this.decorateTextNodes(t)},decorateTextNodes(e){let t=document.createElement(`template`);t.innerHTML=e;let n=document.createTreeWalker(t.content,NodeFilter.SHOW_TEXT),r=[];for(;n.nextNode();)n.currentNode.parentElement?.closest(`a`)||r.push(n.currentNode);let i={nick:this.nickname,emotes:this.emoteMap,highlightWords:this.highlightWords||[]};for(let e of r){let t=he(e.nodeValue,i);if(t===e.nodeValue)continue;let n=document.createElement(`template`);n.innerHTML=t,e.replaceWith(n.content)}return t.innerHTML},renderMessageHtml(e){let t=this.rawOf(e),n=jp.get(t),r=(this.highlightWords||[]).join(`
`);if(n&&n.nick===this.nickname&&n.words===r&&n.text===t.text)return n.html;let i=this.formatChatMessage(t.text||``);return jp.set(t,{nick:this.nickname,words:r,text:t.text,html:i}),i},messageKind(e){return e?Dp.has(String(e.user||``).toLowerCase())?`umgebung`:e.isJoinPart?`joinpart`:e.user===`System`||e.user===`Server`?`system`:e.isAction?`action`:`text`:null},systemIcon(e){return{join:`bi-arrow-right-short text-success`,part:`bi-arrow-left-short text-danger`,kick:`bi-door-open text-danger`,nick:`bi-pencil`}[e.joinPartType]||`bi-info-circle`},hasMediaInMessage(e){return!e||typeof e!=`string`?!1:(e.match(/https?:\/\/[^\s]+/g)||[]).some(e=>this.isUploadUrl?.(e)||Cp.test(e)||wp.test(e)||Tp.test(e))},scrollToBottom(){this.$nextTick(()=>{requestAnimationFrame(()=>{let e=this.$refs.chatMessages||document.querySelector(`.chat-messages`);e&&(e.scrollTop=e.scrollHeight)})})},jumpToLatest(){this.scrollToBottom(),this.isScrolledUp=!1,this.newWhileScrolledUp=0},handleChatScroll(e){let t=e.target;this.isScrolledUp=t.scrollHeight-t.scrollTop-t.clientHeight>150,this.isScrolledUp||(this.newWhileScrolledUp=0),this.currentChannel&&this.supportsChathistory&&t.scrollTop<80&&this.requestHistoryBefore(this.currentChannel)},renderMessageInto(e,t){let n=this.renderMessageHtml(t);e._renderedMessageHtml!==n&&(e._renderedMessageHtml=n,e.innerHTML=n)},setupStickToBottom(){let e=document.querySelector(`.chat-messages`);if(!e||e._stickToBottomBound)return;e._stickToBottomBound=!0;let t=e.scrollHeight,n=e.clientHeight,r=new ResizeObserver(()=>{let r=t-e.scrollTop-n<=Ep;t=e.scrollHeight,n=e.clientHeight,r&&(e.scrollTop=e.scrollHeight,t=e.scrollHeight)});r.observe(e),[...e.children].forEach(e=>r.observe(e)),new MutationObserver(e=>{for(let t of e)t.addedNodes.forEach(e=>{e.nodeType===1&&r.observe(e)}),t.removedNodes.forEach(e=>{e.nodeType===1&&r.unobserve(e)})}).observe(e,{childList:!0}),e.addEventListener(`scroll`,()=>{t=e.scrollHeight,n=e.clientHeight},{passive:!0})},setupMediaPlayers(){let e=document.querySelector(`.chat-messages`);e&&!e._mediaPlayersBound&&(e._mediaPlayersBound=!0,e.addEventListener(`click`,e=>{let t=e.target.closest?.(`.media-play-card`),n=e.target.closest?.(`.youtube-card`);if(!t&&!n)return;e.preventDefault(),e.stopPropagation();let r=document.createElement(t?t.dataset.mediaType===`audio`?`audio`:`video`:`iframe`);if(r.className=`chat-media-player`,t)r.controls=!0,r.autoplay=!0,r.src=t.href;else{let e=n.dataset.youtubeId;if(!/^[-\w]+$/.test(e||``))return;r.src=`https://www.youtube.com/embed/${e}?autoplay=1`,r.allow=`autoplay; encrypted-media; picture-in-picture`,r.allowFullscreen=!0}(t||n).replaceWith(r)}))},toggleColorPicker(){this.showColorPicker=!this.showColorPicker,this.showEmojiPicker=!1,this.showGifPicker=!1},toggleEmojiPicker(){this.showEmojiPicker=!this.showEmojiPicker,this.showColorPicker=!1,this.showGifPicker=!1},toggleGifPicker(){this.showGifPicker=!this.showGifPicker,this.showColorPicker=!1,this.showEmojiPicker=!1},openColorPicker(){this.toggleColorPicker()},insertAtCursor(e,t=``){let n=this.$refs.messageInput;if(!n){this.newMessage+=e+t;return}let r=n.selectionStart??this.newMessage.length,i=n.selectionEnd??r,a=this.newMessage.slice(r,i);this.newMessage=this.newMessage.slice(0,r)+e+a+t+this.newMessage.slice(i),this.$nextTick(()=>{n.focus();let t=r+e.length+a.length;n.setSelectionRange(t,t)})},insertColor(e){let t=`\u0003${String(e).padStart(2,`0`)}`;this.insertAtCursor(t,this.$refs.messageInput?.selectionStart===this.$refs.messageInput?.selectionEnd?``:``),this.showColorPicker=!1},insertEmoji(e){this.insertAtCursor(e),this.showEmojiPicker=!1},applyFormat(e){let t={b:``,i:``,u:``,s:``};t[e]&&this.insertAtCursor(t[e],t[e])},showUserOptions(e,t){this.selectedUser=e,this.showingUserOptions=!0,this._userMenuAnchor=t.target.getBoundingClientRect(),this.loadProfileCard?.(e),setTimeout(()=>this.positionUserMenu(),10)},positionUserMenu(){let e=this.$refs.userMenu,t=this._userMenuAnchor;if(!e||!t||!this.showingUserOptions)return;let n=e.offsetWidth,r=t.right+n>window.innerWidth?t.left-n-10:t.right+10,i=Math.min(t.top,window.innerHeight-e.offsetHeight-10);e.style.top=`${Math.max(10,i)}px`,e.style.left=`${Math.max(10,r)}px`},notifyMention(e,t,n){let r=mp(this.notificationSound);typeof Notification<`u`&&Notification.permission===`granted`&&new Notification(this.t(`notification_mention_title`,{sender:e,channel:t}),{body:n,tag:kp(t),silent:this.notificationSound!==`system`}),r&&this.playHighlightSound(),this.notifyHost(`mention-update`,{hasMentions:!0,mentionCount:this.mentionCount})},playHighlightSound(){let e=Date.now();return e-(this._lastHighlightSoundAt||0)<1500?!1:(this._lastHighlightSoundAt=e,bp(this.notificationSound))},resetMentions(){this.hasMentions=!1,this.mentionCount=0,this.notifyHost(`mention-update`,{hasMentions:!1,mentionCount:0})},emitUnreadState(){let e=Object.entries(this.unreadMessages||{}).reduce((e,[t,n])=>{let r=this.channelNotifyLevel?.(t)||`all`;if(r===`mute`)return e;let i=r===`mentions`?this.mentionsByChannel?.[t]:n,a=Number.isFinite(Number(i))?Number(i):0;return e+Math.max(0,a)},0);this.notifyHost(`unread-state-update`,{totalUnread:e})},applyTheme(e){Sp(this.$root?.parentElement||document.documentElement,e)}}}var Pp=new Set([`276`,`301`,`307`,`311`,`312`,`313`,`317`,`318`,`319`,`320`,`330`,`338`,`378`,`379`,`401`,`671`]),Fp=5e3;function Ip(e){return String(e??``).replace(/[\u0000-\u001F\u007F]+/g,` `).replace(/\s+/g,` `).trim()}function Lp(e=``){return{nick:e,account:null,realname:``,awayMessage:``,isOperator:!1,isOnline:!0,whoisDone:!1,loading:!1,profile:null}}function Rp(){return{profileCard:Lp(),_profileWhoisPending:new Set,_profileWhoisTimers:new Map,userStatus(e){return this.userStatuses[String(e||``).toLowerCase()]||``},setUserStatus(e,t){let n=String(e||``).toLowerCase();if(!n)return;let r=Ip(t).slice(0,256);r?this.userStatuses[n]=r:delete this.userStatuses[n]},renameUserStatus(e,t){let n=this.userStatus(e);this.setUserStatus(e,``),n&&this.setUserStatus(t,n)},syncOwnStatus(){this.setUserStatus(this.nickname,this.ownStatus),this.supportsMetadata&&this.canSendChat()&&this.sendRaw(this.ownStatus?`METADATA * SET status :${this.ownStatus}`:`METADATA * SET status`)},loadProfileCard(e){if(this.profileCard=Lp(e),!e||/\s/.test(e)||!this.isRegistered){this.profileCard.whoisDone=!0;return}let t=e.toLowerCase();this._profileWhoisPending.add(t),clearTimeout(this._profileWhoisTimers.get(t)),this._profileWhoisTimers.set(t,setTimeout(()=>this.finishProfileWhois(t),Fp)),this.sendRaw(`WHOIS ${e}`)},consumeProfileWhois(e){if(!this._profileWhoisPending.size||!Pp.has(e.command))return!1;let t=String(e.params[1]||``).toLowerCase();if(!this._profileWhoisPending.has(t))return!1;let n=this.profileCard.nick.toLowerCase()===t?this.profileCard:null,r=e.params[e.params.length-1]||``;switch(e.command){case`311`:n&&(n.realname=r);break;case`313`:n&&(n.isOperator=!0);break;case`330`:n&&(n.account=e.params[2]||null);break;case`401`:n&&(n.isOnline=!1);break;case`301`:this.activeUsers.setAway(e.params[1],!0),n&&(n.awayMessage=r);break;case`318`:this.finishProfileWhois(t)}return!0},finishProfileWhois(e){if(clearTimeout(this._profileWhoisTimers.get(e)),this._profileWhoisTimers.delete(e),!this._profileWhoisPending.delete(e))return;let t=this.profileCard;t.nick.toLowerCase()===e&&(t.whoisDone=!0,t.account&&this.hasFeature(`profiles`)&&this.fetchProfileCard?.(t.nick,t.account),this.$nextTick(()=>this.positionUserMenu()))},profileCardAvatar(){return this.avatarUrl(this.selectedUser)||this.profileCardProfileAvatar?.()||``},profileCardUser(){let e=this.reactiveUsers?.[this.currentChannel]||[],t=String(this.selectedUser||``).toLowerCase();return e.find(e=>e.name.toLowerCase()===t)||null},profileCardStatusText(){return this.userStatus(this.selectedUser)||Ip(this.profileCard.profile?.status)},profileCardStatus(){return this.profileCard.isOnline?this.profileCard.awayMessage||this.profileCardUser()?.isAway?`away`:`online`:`offline`},profileCardRole(){return{"~":`Owner`,"&":`Admin`,"@":`Operator`,"%":`Half-Op`,"+":`Voice`}[this.profileCardUser()?.role]||``},isOwnProfileCard(){return String(this.selectedUser||``).toLowerCase()===String(this.nickname||``).toLowerCase()}}}var zp=`starchat.login`;function Bp(e){let t=String(e??``).trim();if(!t)return``;let n=/^[#&]/.test(t)?t:`#${t}`;return/^[#&][^\s,\x07]{1,49}$/.test(n)?n.toLowerCase():null}function Vp(e){return String(e??``).trim().toLowerCase().replace(/^[a-z][a-z0-9+.-]*:\/\//,``).replace(/[/?#].*$/,``).replace(/:\d+$/,``)}function Hp(){try{let e=JSON.parse(localStorage.getItem(zp)||`null`);return e&&typeof e==`object`?e:{}}catch{return{}}}function Up({servers:e=[],primaryServerId:t=``,defaultChannel:n=``,openServerConnection:r=null}={}){let i=Hp(),a=e.some(e=>e.id===i.serverId),o=i.serverId===`__other__`||a?i.serverId:t;return{serverOptions:e,selectedServerId:o,customServerDomain:o===`__other__`?String(i.domain||``):``,customWebsocketUrl:o===`__other__`?String(i.websocket||``):``,startChannel:typeof i.channel==`string`?i.channel:n,loginNickPreset:typeof i.nick==`string`?i.nick:``,showAdvancedLogin:!1,_openServerConnection:r,serverOptionLabel(e){let t=(e.languages||[]).join(`, `);return t?`${e.name} (${t})`:e.name},loginSummary(){let e=this.selectedServerId===`__other__`?Vp(this.customServerDomain)||this.t(`login_server_other`):this.serverOptions.find(e=>e.id===this.selectedServerId)?.name||this.serverName,t=Bp(this.startChannel);return t?`${e} · ${t}`:e},selectedServerEntry(){if(this.selectedServerId!==`__other__`)return this.serverOptions.find(e=>e.id===this.selectedServerId)||this.connection?.server;let e=Ge(Vp(this.customServerDomain),this.serverOptions);if(!e)throw Error(`server_invalid_domain`);let t=this.customWebsocketUrl.trim();if(!t)return e;if(!Re(t,`wss:`))throw Error(`server_invalid_websocket`);return{...e,websocket:t}},async prepareSelectedConnection(){let e=this.selectedServerEntry(),t=this.connection?.server;if(e&&t&&e.id===t.id&&e.websocket===t.websocket)return this.connection;if(!e||!this._openServerConnection)throw Error(`server_unreachable`);return this.connection=await this._openServerConnection(e),this.serverName=this.connection.name,this.switchPreferenceScope(e.id),this.switchDraftScope(e.id),this.stores.messages.set({}),this.stores.channelTopics.set({}),this.activeUsers.clearAll(),this.unreadMessages={},this.mentionsByChannel={},this.unreadMarkerByChannel={},this.connection},applyStartChannel(){let e=Bp(this.startChannel);if(e===null)throw Error(`login_start_channel_invalid`);this.availableChannels=e?[e]:[],this.lobbyChannel=e,e?this.currentChannel=e:(this.messageManager.ensure(`Server`),this.currentChannel=`Server`)},rememberLogin(){try{localStorage.setItem(zp,JSON.stringify({serverId:this.selectedServerId,domain:this.selectedServerId===`__other__`?Vp(this.customServerDomain):``,websocket:this.selectedServerId===`__other__`?this.customWebsocketUrl.trim():``,channel:this.startChannel.trim(),nick:this.nickname}))}catch{}}}}var $=Object.freeze({App:`app`,Device:`device`,Connection:`connection`,Account:`account`}),Wp=Object.freeze([`toggle`,`select`,`list`,`text`,`path`,`action`,`custom`]);function Gp(e,t){return typeof e.when!=`function`||!!e.when(t)}function Kp(e,t){return(e.order??100)-(t.order??100)}function qp(){let e=new Map,t=new Map;return{registerSection(t){if(!t?.id||!t.label)throw Error(`A settings section needs an id and a label`);return e.set(t.id,{icon:`bi-gear`,...t}),this},registerSetting(e){if(!e?.id||!e.section||!e.label)throw Error(`A setting needs an id, a section and a label`);if(!Wp.includes(e.type))throw Error(`Unknown setting type "${e.type}" for ${e.id}`);if(!Object.values($).includes(e.scope))throw Error(`Unknown setting scope "${e.scope}" for ${e.id}`);return t.set(e.id,e),this},get(e){return t.get(e)||null},sectionsFor(t){return[...e.values()].filter(e=>Gp(e,t)).filter(e=>this.settingsFor(e.id,t).length>0).sort(Kp)},settingsFor(n,r){return[...t.values()].filter(e=>e.section===n&&Gp(e,r)).filter(t=>Gp(e.get(t.section)||{},r)).sort(Kp)},search(e,t,n=e=>e){let r=String(e??``).trim().toLowerCase();return r?this.sectionsFor(t).flatMap(e=>this.settingsFor(e.id,t).filter(t=>[n(t.label),t.hint?n(t.hint):``,t.group?n(t.group):``,n(e.label),...t.keywords||[]].join(` `).toLowerCase().includes(r))):[]}}}var Jp=qp(),Yp=e=>e.shell===`desktop`,Xp=e=>!e.shell,Zp=e=>e.shell===`mobile`;function Qp(e,t){return{get:n=>!!n.shellSettings?.[e]?.[t],set:(n,r)=>n.setShellSetting(e,t,!!r)}}function $p(e=Jp){return e.registerSection({id:`notifications`,label:`settings_section_notifications`,icon:`bi-bell`,order:20}).registerSection({id:`appearance`,label:`settings_section_appearance`,icon:`bi-palette`,order:30}).registerSection({id:`chat`,label:`settings_section_chat`,icon:`bi-chat-left-text`,order:40}).registerSection({id:`media`,label:`settings_section_media`,icon:`bi-music-note-beamed`,order:50,when:Yp}).registerSection({id:`logging`,label:`settings_section_logging`,icon:`bi-journal-text`,order:60,when:Yp}).registerSection({id:`diagnostics`,label:`settings_section_diagnostics`,icon:`bi-bug`,order:80,when:Yp}),e.registerSetting({id:`notifications.highlightWords`,section:`notifications`,type:`list`,scope:$.Connection,accountSync:!0,order:10,label:`highlight_words`,hint:`highlight_words_hint`,placeholder:`highlight_add_placeholder`,limit:20,keywords:[`highlight`,`mention`,`erwähnung`,`keyword`],get:e=>e.highlightWords,add:(e,t)=>e.addHighlightWords(t),remove:(e,t)=>e.removeHighlightWord(t)}),e.registerSetting({id:`notifications.sound`,section:`notifications`,type:`select`,scope:$.Device,order:15,label:`settings_notification_sound`,hint:`settings_notification_sound_hint`,get options(){return sp.map(e=>({value:e,label:`settings_notification_sound_${e}`}))},keywords:[`ton`,`sound`,`klang`,`highlight`,`erwähnung`,`mention`,`leise`],get:e=>e.notificationSound,set:(e,t)=>e.setNotificationSound(t)}),e.registerSetting({id:`notifications.dmPopup`,section:`notifications`,type:`toggle`,scope:$.App,group:`settings_group_popups`,order:20,when:Yp,label:`settings_notify_dm`,...Qp(`app`,`notifyDmPopup`)}),e.registerSetting({id:`notifications.mentionPopup`,section:`notifications`,type:`toggle`,scope:$.App,group:`settings_group_popups`,order:21,when:Yp,label:`settings_notify_mention`,...Qp(`app`,`notifyMentionPopup`)}),e.registerSetting({id:`notifications.minimized`,section:`notifications`,type:`toggle`,scope:$.App,group:`settings_group_popups`,order:22,when:Yp,label:`settings_notify_minimized`,hint:`settings_notify_minimized_hint`,...Qp(`app`,`notifyAnyWhenMinimized`)}),e.registerSetting({id:`notifications.browser`,section:`notifications`,type:`action`,scope:$.Device,order:20,when:Xp,label:`settings_browser_notifications`,hint:`settings_browser_notifications_hint`,actionLabel:`settings_browser_notifications_enable`,status:e=>e.browserNotificationStatus(),run:e=>e.requestBrowserNotifications()}),e.registerSetting({id:`notifications.mobileSettings`,section:`notifications`,type:`action`,scope:$.Device,order:31,when:Zp,label:`settings_android_notifications`,hint:`settings_android_notifications_hint`,actionLabel:`settings_android_notifications_open`,keywords:[`ton`,`sound`,`vibration`,`kanal`,`channel`,`leise`,`laut`],run:e=>e.shellAction(`open-notification-settings`)}),e.registerSetting({id:`appearance.theme`,section:`appearance`,type:`select`,scope:$.App,order:10,when:Yp,label:`settings_theme`,options:[{value:`dark`,label:`settings_theme_dark`},{value:`light`,label:`settings_theme_light`}],keywords:[`dark`,`light`,`hell`,`dunkel`,`design`],get:e=>e.shellSettings?.app?.theme||`dark`,set:(e,t)=>e.setShellSetting(`app`,`theme`,t)}),e.registerSetting({id:`appearance.themeBrowser`,section:`appearance`,type:`select`,scope:$.Device,order:10,when:Xp,label:`settings_theme`,options:[{value:`auto`,label:`settings_theme_auto`},{value:`dark`,label:`settings_theme_dark`},{value:`light`,label:`settings_theme_light`}],keywords:[`dark`,`light`,`hell`,`dunkel`,`design`,`system`],get:e=>e.webTheme,set:(e,t)=>e.setWebTheme(t)}),e.registerSetting({id:`appearance.showJoinPart`,section:`appearance`,type:`toggle`,scope:$.Device,order:20,label:`settings_show_join_part`,hint:`settings_show_join_part_hint`,keywords:[`join`,`part`,`quit`],get:e=>!e.hideJoinPart,set:(e,t)=>{e.hideJoinPart===!!t&&e.toggleJoinPart()}}),e.registerSetting({id:`appearance.userList`,section:`appearance`,type:`toggle`,scope:$.Device,order:30,label:`settings_show_user_list`,keywords:[`nicklist`,`benutzer`,`users`],get:e=>e.userListOpen,set:(e,t)=>e.setUserListOpen(t)}),e.registerSetting({id:`chat.ignoredUsers`,section:`chat`,type:`list`,scope:$.Connection,accountSync:!0,order:10,label:`settings_ignore_list`,hint:`settings_ignore_list_hint`,placeholder:`settings_ignore_placeholder`,limit:100,keywords:[`ignore`,`block`,`blockieren`],get:e=>e.ignoredUsers,add:(e,t)=>e.setIgnoredUsers([...e.ignoredUsers,...Vs(t)]),remove:(e,t)=>e.unignoreUser(t)}),e.registerSetting({id:`chat.autojoinChannels`,section:`chat`,type:`list`,scope:$.Connection,accountSync:!0,order:15,label:`settings_autojoin`,hint:`settings_autojoin_hint`,placeholder:`settings_autojoin_placeholder`,limit:50,keywords:[`autojoin`,`channel`,`kanal`,`start`,`betreten`,`join`],get:e=>e.autojoinChannels,add:(e,t)=>e.addAutojoinChannels(t),remove:(e,t)=>e.removeAutojoinChannel(t)}),e.registerSetting({id:`chat.quitMessage`,section:`chat`,type:`text`,scope:$.Connection,accountSync:!0,order:20,label:`settings_quit_message`,hint:`settings_quit_message_hint`,placeholder:`settings_quit_message_placeholder`,maxLength:200,keywords:[`quit`,`abschied`,`verlassen`,`goodbye`],get:e=>e.quitMessage,set:(e,t)=>e.setQuitMessage(t)}),e.registerSetting({id:`media.richPresence`,section:`media`,type:`toggle`,scope:$.App,order:10,label:`settings_rich_presence`,hint:`settings_rich_presence_hint`,keywords:[`now playing`,`musik`,`player`],...Qp(`app`,`playerRichPresence`)}),e.registerSetting({id:`media.systemMedia`,section:`media`,type:`toggle`,scope:$.App,order:20,label:`settings_system_media`,hint:`settings_system_media_hint`,keywords:[`spotify`,`now playing`,`musik`],...Qp(`app`,`systemMediaRichPresence`)}),e.registerSetting({id:`logging.enabled`,section:`logging`,type:`toggle`,scope:$.Connection,order:10,label:`settings_logging_enable`,hint:`settings_logging_enable_hint`,keywords:[`log`,`protokoll`],...Qp(`connection`,`loggingEnabled`)}),e.registerSetting({id:`logging.path`,section:`logging`,type:`path`,scope:$.Connection,order:20,label:`settings_log_directory`,actionLabel:`settings_log_change`,keywords:[`ordner`,`folder`,`verzeichnis`],get:e=>e.shellSettings?.connection?.logPath||``,run:e=>e.shellAction(`change-log-path`)}),e.registerSetting({id:`logging.viewer`,section:`logging`,type:`action`,scope:$.Connection,order:30,label:`settings_log_viewer`,actionLabel:`settings_log_viewer_open`,run:e=>e.shellAction(`open-log-viewer`)}),e.registerSetting({id:`diagnostics.errorReport`,section:`diagnostics`,type:`action`,scope:$.App,order:10,label:`settings_error_report`,hint:`settings_error_report_hint`,keywords:[`fehler`,`error`,`bug`,`absturz`,`crash`,`bericht`,`report`],status:e=>e.shellSettings?.app?.errorReportCopied?`settings_error_report_copied`:{key:`settings_error_report_count`,replacements:{count:e.shellSettings?.app?.errorReportCount||0}},actionLabel:`settings_error_report_copy`,run:e=>e.shellAction(`copy-error-report`)}),e.registerSetting({id:`diagnostics.clearErrorReport`,section:`diagnostics`,type:`action`,scope:$.App,order:20,label:`settings_error_report_clear_label`,actionLabel:`settings_error_report_clear`,run:e=>e.shellAction(`clear-error-report`)}),e}$p();var em=`chat.theme`,tm=[`auto`,`dark`,`light`],nm=`chat.notificationSound`;function rm(e){try{return localStorage.getItem(e)}catch{return null}}function im(e,t){try{localStorage.setItem(e,t)}catch{}}function am({defaultTheme:e=`auto`}={}){let t=rm(em);return{settingsWindow:{show:!1,section:null,query:``},shellSettings:{app:{},connection:{}},webTheme:tm.includes(t)?t:e,_webThemeChosen:tm.includes(t),notificationSound:pp(rm(nm)),listInputs:{},syncsWithAccount(){return!1},settingsEnv(){return{shell:this.shell,hasFeature:e=>this.hasFeature(e),hasAccount:!!this.canUseProfiles?.(),connectionsApi:!!this.shellSettings?.app?.connectionsApi}},settingsSections(){return Jp.sectionsFor(this.settingsEnv())},activeSettingsSection(){return this.settingsSections().find(e=>e.id===this.settingsWindow.section)||null},visibleSettings(){let e=this.settingsEnv();return this.settingsWindow.query.trim()?Jp.search(this.settingsWindow.query,e,e=>this.t(e)):Jp.settingsFor(this.settingsWindow.section,e)},settingStartsGroup(e,t){let n=e[t]?.group;return!!n&&e[t-1]?.group!==n},settingSectionLabel(e){let t=this.settingsSections().find(t=>t.id===e.section);return t?this.t(t.label):``},openSettings(e=null){let t=this.settingsSections(),n=t.find(t=>t.id===e)||t.find(e=>e.id===`notifications`)||t[0];this.showingUserOptions=!1,this.settingsWindow={show:!0,section:n?.id||null,query:``},this.requestShellSettings(),this.settingsSectionOpened?.(n?.id)},selectSettingsSection(e){this.settingsSectionClosed?.(this.settingsWindow.section),this.settingsWindow.section=e,this.settingsWindow.query=``,this.settingsSectionOpened?.(e)},closeSettings(){this.settingsSectionClosed?.(this.settingsWindow.section),this.settingsWindow.show=!1,this.focusMessageInput?.()},settingValue(e){return e.get?e.get(this):void 0},updateSetting(e,t){e.set?.(this,t)},runSetting(e){e.run?.(this)},settingActionLabel(e){let t=e.actionLabelFor?e.actionLabelFor(this):e.actionLabel;return t?this.t(t):``},settingStatus(e){let t=e.status?.(this);return t?typeof t==`object`?this.t(t.key,t.replacements||{}):this.t(t):``},listInput(e){return this.listInputs[e.id]||``},setListInput(e,t){this.listInputs={...this.listInputs,[e.id]:t}},addListEntry(e){let t=this.listInput(e).trim();t&&!this.isListFull(e)&&(e.add?.(this,t),this.setListInput(e,``))},removeListEntry(e,t){e.remove?.(this,t)},isListFull(e){return!!e.limit&&(this.settingValue(e)||[]).length>=e.limit},settingScope(e){let t=this.shell===`desktop`;return e.scope===$.App?{icon:`bi-window-stack`,label:this.t(`settings_scope_app`)}:e.scope===$.Device?t?{icon:`bi-window-stack`,label:this.t(`settings_scope_app`)}:{icon:`bi-laptop`,label:this.t(`settings_scope_browser`)}:e.scope===$.Account?{icon:`bi-person-check`,label:this.t(`settings_scope_account`)}:e.accountSync&&this.syncsWithAccount()?{icon:`bi-cloud-check`,label:this.t(`settings_scope_synced`)}:{icon:`bi-plug`,label:this.t(`settings_scope_connection`)}},requestShellSettings(){this.shell&&this.notifyHost(`settings-get`)},setShellSetting(e,t,n){this.shellSettings={...this.shellSettings,[e]:{...this.shellSettings[e]||{},[t]:n}},this.notifyHost(`settings-set`,{scope:e,key:t,value:n})},shellAction(e){this.notifyHost(`settings-action`,{action:e})},applyShellSettings(e){this.shellSettings={app:{...e?.app||{}},connection:{...e?.connection||{}}}},applyWebTheme(){!this.shell&&this._webThemeChosen&&this.applyTheme(this.webTheme)},setWebTheme(e){this.webTheme=tm.includes(e)?e:`auto`,this._webThemeChosen=!0,im(em,this.webTheme),this.applyWebTheme()},setNotificationSound(e){this.notificationSound=pp(e),im(nm,this.notificationSound),bp(this.notificationSound)},browserNotificationStatus(){let e=globalThis.Notification?.permission;return e===`granted`?`settings_browser_notifications_granted`:e===`denied`?`settings_browser_notifications_denied`:`settings_browser_notifications_default`},async requestBrowserNotifications(){globalThis.Notification?.permission==="default"&&(await Notification.requestPermission(),this.settingsWindow={...this.settingsWindow})},applyDevicePreferenceChange(e,t){e===`chat.hideJoinPart`?this.hideJoinPart=t===`1`:e===`chat.userListOpen`?this.userListOpen=t!==`0`:e===`chat.theme`&&tm.includes(t)&&(this.webTheme=t,this._webThemeChosen=!0,this.applyWebTheme())}}}var om=3e3;function sm(e,t){return!e._hidden&&!e.isJoinPart&&!e.isSystem&&e.user?.toLowerCase()!==t?.toLowerCase()}function cm(){return{isTargetVisible(e){return!e||e!==this.currentChannel||this.sidebarMode===`uploads`||this.sidebarMode===`friends`&&!this.selectedFriendName?!1:this.shell===`mobile`?!document.hidden&&!this.appInBackground:!document.hidden&&document.hasFocus()},lastReadTs(e){let t=Date.parse(this._lastRead?.[e]||``);return Number.isFinite(t)?t:null},touchLastRead(e){e&&e!==`Server`&&(this._lastRead=this._lastRead||{},this._lastRead[e]=new Date().toISOString(),this.sendReadMarker(e))},latestMessageTs(e){let t=this.messageManager.get(e);for(let e=t.length-1;e>=0;e--){let n=t[e]._ts;if(!t[e]._hidden&&Number.isFinite(n)&&n>0)return n}return null},sendReadMarker(e){if(!this.supportsReadMarker||!this.isRegistered||!e||e===`Server`)return;let t=this.latestMessageTs(e);if(t===null)return;this._readMarkerSent=this._readMarkerSent||{};let n=e.toLowerCase();(this._readMarkerSent[n]||0)>=t||(this._readMarkerSent[n]=t,this.sendRaw(`MARKREAD ${e} timestamp=${new Date(t).toISOString()}`))},scheduleReadMarker(e){this.supportsReadMarker&&e&&(this._readMarkerTimers=this._readMarkerTimers||{},this._readMarkerTimers[e]||(this._readMarkerTimers[e]=setTimeout(()=>{delete this._readMarkerTimers[e],this.isTargetVisible(e)&&this.touchLastRead(e)},om)))},applyReadMarker(e,t){if(!e||typeof t!=`string`||!t.startsWith(`timestamp=`))return;let n=Date.parse(t.slice(10));if(!Number.isFinite(n))return;let r=this.resolveTargetKey(e);this._readMarkerSent=this._readMarkerSent||{},this._readMarkerSent[r.toLowerCase()]=Math.max(this._readMarkerSent[r.toLowerCase()]||0,n);let i=this.lastReadTs(r);i!==null&&i>=n||(this._lastRead=this._lastRead||{},this._lastRead[r]=new Date(n).toISOString(),this.isTargetVisible(r)||(this.recountUnread(r),Object.values(this.mentionsByChannel).some(e=>e>0)||this.resetMentions(),this.scheduleChatStateSave?.()))},requestReadMarker(e){this.supportsReadMarker&&this.isRegistered&&e&&!e.startsWith(`#`)&&e!==`Server`&&this.sendRaw(`MARKREAD ${e}`)},recountUnread(e){let t=this.lastReadTs(e);if(t===null)return;let n=0,r=0;for(let i of this.messageManager.get(e))i._ts<=t||!sm(i,this.nickname)||(n++,e.startsWith(`#`)&&this.isHighlightedText(i.text)&&r++);this.unreadMessages[e]=n,e.startsWith(`#`)&&(this.mentionsByChannel[e]=r),this.emitUnreadState()},placeUnreadMarker(e){let t=this._markerSinceByChannel[e];if(t==null)return;let n=this.messageManager.get(e).find(e=>e._ts>t&&sm(e,this.nickname));n&&(this.unreadMarkerByChannel[e]=n.id)},enterTarget(e){let t=this.unreadMessages[e]||0,n=this.lastReadTs(e);if(delete this.unreadMarkerByChannel[e],this._markerSinceByChannel[e]=n,n!==null)this.placeUnreadMarker(e);else if(t>0){let n=this.messageManager.get(e).filter(e=>sm(e,this.nickname)),r=n[Math.max(0,n.length-t)];r&&(this.unreadMarkerByChannel[e]=r.id)}this.unreadMessages[e]=0,this.mentionsByChannel[e]=0,this.touchLastRead(e),this.emitUnreadState()},leaveTarget(e){e&&(this.touchLastRead(e),delete this.unreadMarkerByChannel[e],delete this._markerSinceByChannel[e])},markCurrentChannelAsRead(){let e=this.currentChannel;e&&(this.touchLastRead(e),(this.unreadMessages[e]||this.mentionsByChannel[e])&&(this.unreadMessages[e]=0,this.mentionsByChannel[e]=0,this.emitUnreadState()))},scrollToUnreadOrBottom(e=this.currentChannel){this.unreadMarkerByChannel[e]==null?this.scrollToBottom():this.$nextTick(()=>requestAnimationFrame(()=>{let e=this.$refs.chatMessages||document.querySelector(`.chat-messages`),t=e?.querySelector(`.unread-separator`);!e||!t?this.scrollToBottom():(e.scrollTop=Math.max(0,t.offsetTop-e.clientHeight/3),this.isScrolledUp=e.scrollHeight-e.scrollTop-e.clientHeight>150)}))},markTargetRead(e){e&&(this.touchLastRead(e),this.unreadMessages[e]=0,this.mentionsByChannel[e]=0,this.emitUnreadState(),this.scheduleChatStateSave?.(),this.contextMenu.show=!1)},mentionCountFor(e){return this.mentionsByChannel[e]||0},hasUnread(e){return(this.unreadMessages[e]||0)>0}}}var lm=/^(@\S+ )?(PRIVMSG|NOTICE|BATCH) /i,um=200,dm=3e5,fm=3,pm=5,mm=`Guest`,hm=3,gm=[`😀`,`😂`,`😍`,`🔥`,`💯`,`🚀`,`💡`,`🎉`,`👍`,`❤️`,`😎`,`🤖`,`😜`];function _m(e,t){try{let n=localStorage.getItem(e);return n===null?t:n===`1`}catch{return t}}function vm(e){return!!e?.isJoinPart&&(e.joinPartType===`join`||e.joinPartType===`part`)}function ym(e,t){return typeof e==`string`&&typeof t==`string`&&e.toLowerCase()===t.toLowerCase()}function bm(e,t){let n=0;return function(...r){let i=Date.now();i-n>=t&&(n=i,e.apply(this,r))}}function xm(){return`${mm}${Math.floor(1e3+Math.random()*9e3)}`}function Sm(e){let{connection:t,stores:r,t:i,nickname:a=``,password:o=``,defaultChannel:s=``,shell:u=null,publishesNowPlaying:d=!1,defaultQuitMessage:f=``,ctcpVersion:p=`StarChat`,notifyHost:m=()=>{},rawOf:v=e=>e,modules:y=[],mixins:b=[],servers:x=[],openServerConnection:ee=null,connectSocket:S=h,defaultTheme:te=`auto`,bearer:ne=null}=e,re=t?.server||null,C=t?.server?.id||``,ie=new Set(y);return{t:i,stores:r,connection:t,rawOf:v,shell:u,publishesNowPlaying:d,nickname:a,newMessage:``,availableChannels:s?[s.toLowerCase()]:[],lobbyChannel:s.toLowerCase(),currentChannel:s.toLowerCase(),connectionStatus:``,connectionState:`connecting`,reconnectAttempt:0,reconnectDelay:0,unreadMessages:{},mentionsByChannel:{},isRegistered:!1,activeUsers:D(r.users),channelManager:Oe(r.channelTopics),messageManager:Se(r.messages),showingUserOptions:!1,selectedUser:``,_userMenuAnchor:null,showColorPicker:!1,showEmojiPicker:!1,showGifPicker:!1,userListOpen:_m(`chat.userListOpen`,!0),hideJoinPart:_m(`chat.hideJoinPart`,!1),expandedEventGroups:{},contextMenu:{show:!1,x:0,y:0,channel:null},friendContextMenu:{show:!1,x:0,y:0,friendId:null,friendName:``},commandSuggestions:[],emoteMap:_,mircColors:g,emojiList:gm,showIdentifyPrompt:!1,identifyPassword:``,defaultChannel:s.toLowerCase(),requestedChannels:[],isAuthenticated:!1,loginUsername:a,loginPassword:o,rememberMe:!1,loginError:``,isLoading:!1,performLogout:!1,_saslPassword:o,_bearer:null,hasMentions:!1,mentionCount:0,ctcpVersionString:p,quickReactions:jc,supportsChathistory:!1,supportsMetadata:!1,metadataVersion:0,supportsReadMarker:!1,supportsMultiline:!1,supportsMessageTags:!1,supportsRedaction:!1,supportsEchoMessage:!1,multilineMaxBytes:4096,multilineMaxLines:0,multilineBatchById:{},activeBatches:new Set,isScrolledUp:!1,newWhileScrolledUp:0,unreadMarkerByChannel:{},_markerSinceByChannel:{},_outgoingQueue:[],_joinedChannels:new Set,_bulkJoining:0,_pendingActiveChannel:null,_ownPlaying:``,ownAvatarUrl:``,avatarUrls:{},ownStatus:``,userStatuses:{},serverChannels:[],isListing:!1,exploreSearch:``,lastChannelBeforeDM:null,lastDMBeforeChannel:null,sidebarMode:`channels`,selectedFriendName:``,serverName:t?.name||``,userInVoice:()=>!1,canReportMessage:()=>!1,canUseProfiles:()=>!1,handlePasteUpload(){},handleInputDrop(){},handleInputBackspace(){},...tc(),...cm(),...fc(),...zc(),...Cs(),...Es(),...Qc(),...Qs({storageScope:C}),...Gs({storageScope:C,defaultQuitMessage:f}),...Ac(),...Np(),...Xc(),...il(),...As(),...rc(),...Wc(),...ws(),...Rp(),...am({defaultTheme:te}),...Up({servers:x,primaryServerId:t?.server?.id||``,defaultChannel:s,openServerConnection:ee}),...Object.assign({},...b),init(){this.setupMobileLayout(),window.addEventListener(`focus`,()=>{this.sidebarMode===`channels`&&this.markCurrentChannelAsRead()}),window.addEventListener(`storage`,e=>this.handlePreferenceStorageEvent(e)),document.addEventListener(`keydown`,e=>this.handleGlobalKeydown(e)),document.addEventListener(`visibilitychange`,()=>{document.hidden||(this.sidebarMode===`channels`&&this.markCurrentChannelAsRead(),this.scrollToBottom())}),window.addEventListener(`online`,()=>this.socket?.resume?.()),window.addEventListener(`pagehide`,()=>this.socket?.quit?.()),window.addEventListener(`pageshow`,e=>{e.persisted&&window.location.reload()}),this.initModules?.(),this.loginUsername||=this.loginNickPreset,this.applyWebTheme(),ne?this.bearerLogin():this.nickname&&this.connect()},hasFeature(e){return ie.has(e)&&!!this.connection?.hasFeature(e)},hasModule(e){return ie.has(e)},notifyHost(e,t={}){m(e,t)},login(){let e=String(this.loginUsername||``).trim();if(!e)this.loginError=this.t(`login_nick_required`);else return this.nickname=e,this._saslPassword=this.loginPassword||``,this._bearer=null,this.connect()},guestLogin(){return this.nickname=String(this.loginUsername||``).trim()||xm(),this._saslPassword=``,this._bearer=null,this.connect()},async bearerLogin(){if(ne&&!this.isLoading){this.isLoading=!0;try{if(!await this.refreshBearer())return}finally{this.isLoading=!1}return this.selectedServerId=re?.id||this.selectedServerId,this._saslPassword=``,this.nickname=this._bearer.nickname||this._bearer.account||this.nickname||xm(),this.connect()}},async refreshBearer(){try{let e=await ne?.();e?.token&&(this._bearer=e)}catch(e){console.warn(`Token from the embedding page failed:`,e)}return!!this._bearer},usesBearer(){let e=this.connection?.server;return!!(this._bearer&&re&&e&&e.id===re.id&&e.websocket===re.websocket)},loginMechanism(){return this.usesBearer()?l(()=>this._bearer.account||``,()=>this._bearer.token,this._bearer.tokenType||`jwt`):this._saslPassword?c(this.nickname,this._saslPassword):null},async connect(){if(!this.isLoading){this.isLoading=!0,this.loginError=``;try{if(!(await this.prepareSelectedConnection()).websocketUrl)throw Error(`server_no_websocket`);this.applyStartChannel()}catch(e){this.loginError=this.t(e.message);return}finally{this.isLoading=!1}this.rememberLogin(),this.isAuthenticated=!0,this.performLogout=!1,this._registeredOnce=!1,this._failedConnects=0,this.restoreCurrentDraft(),this.socket=S({url:this.connection.websocketUrl,nickname:this.nickname,sasl:this.loginMechanism(),beforeReconnect:this.usesBearer()&&ne?()=>this.refreshBearer():void 0,ctx:this,onMessage:this.handleMessage.bind(this),onStatusUpdate:e=>this.handleSocketStatus(e),quitMessage:this.effectiveQuitMessage()}),this.$nextTick(()=>{this.setupMediaPlayers(),this.setupStickToBottom()})}},handleSocketStatus(e){this.updateStatus(e===`error`?this.t(`connection_error`):``),e!==`disconnected`||this._registeredOnce||this.performLogout||(this._failedConnects=(this._failedConnects||0)+1,this._failedConnects<hm||(this.logout(),this.loginError=this.t(`server_unreachable`)))},logout(){this.isAuthenticated=!1,this.performLogout=!0,this._outgoingQueue=[],this.notifyHost(`logout`),this.socket?.close()},onSaslFailure(){this.loginError=this.t(`login_sasl_failed`),this.logout(),this.notifyHost(`sasl-failure`)},onCapabilities({offered:e,enabled:t}){this.offeredCapabilities=e,this.enabledCapabilities=t},canSendChat(){return!!this.socket&&this.isRegistered&&this.connectionState===`connected`},sendRaw(e){return lm.test(e)&&!this.canSendChat()?(this._outgoingQueue.length<um&&this._outgoingQueue.push(e),!1):!this.socket||this.connectionState===`reconnecting`?!1:(this.socket.send(e),!0)},setOwnPlaying(e){let t=String(e||``).trim();this._ownPlaying=t,t?this.activeUsers.setPlaying(this.nickname,t):this.activeUsers.clearPlaying(this.nickname),this.syncOwnPlaying()},syncOwnPlaying(){this.supportsMetadata&&this.canSendChat()&&this.sendRaw(this._ownPlaying?`METADATA * SET playing :${this._ownPlaying}`:`METADATA * SET playing`)},syncOwnAvatar(){this.supportsMetadata&&this.canSendChat()&&(this.sendRaw(this.ownAvatarUrl?`METADATA * SET avatar :${this.ownAvatarUrl}`:`METADATA * SET avatar`),this.setUserAvatar(this.nickname,this.ownAvatarUrl))},flushOutgoingQueue(){this._outgoingQueue.splice(0).forEach(e=>this.socket?.send(e)),Object.values(this.stores.messages.get()||{}).forEach(e=>{e.content.forEach(e=>{e.pending&&=!1})})},updatePresence(){this.isRegistered&&this.currentChannel?.startsWith(`#`)&&this.sendRaw(`WHO ${this.currentChannel}`)},updateStatus(e){this.connectionStatus=e},setConnectionState(e,t=0,n=0){this.connectionState=e,this.reconnectAttempt=t,this.reconnectDelay=Math.round(n/1e3),clearInterval(this._reconnectCountdown),this._reconnectCountdown=null,e===`reconnecting`&&this.reconnectDelay>0&&(this._reconnectCountdown=setInterval(()=>{this.reconnectDelay>0&&this.reconnectDelay--,this.reconnectDelay<=0&&(clearInterval(this._reconnectCountdown),this._reconnectCountdown=null)},1e3)),e===`reconnecting`&&(this.isRegistered=!1),e===`connected`&&(this._registeredOnce=!0),this.notifyHost(`connection-state`,{state:e})},sendPrivateMessage(e){e&&(this.sidebarMode=`friends`,this.switchChannel(e),this.selectedFriendName=this.currentChannel,this.showingUserOptions=!1)},toggleIgnoreUser(e){this.isIgnored(e)?(this.unignoreUser(e),this.updateStatus(`${e} has been unignored.`)):(this.ignoreUser(e),this.updateStatus(`${e} has been ignored.`)),this.showingUserOptions=!1},identifyWithNickServ(){this.identifyPassword&&(this.sendRaw(`PRIVMSG NickServ :IDENTIFY ${this.identifyPassword}`),this.updateStatus(`Attempting NickServ identification...`))},toggleIdentifyPrompt(){this.showIdentifyPrompt=!this.showIdentifyPrompt,this.showIdentifyPrompt||(this.identifyPassword=``)},openChannelContextMenu(e,t){this.friendContextMenu.show=!1;let n=this.clampMenuPosition(t.clientX,t.clientY);this.contextMenu.show=!0,this.contextMenu.x=n.x,this.contextMenu.y=n.y,this.contextMenu.channel=e},handleInput(){!this.newMessage.startsWith(`/`)&&this.isChatTarget()&&this.notifyTyping(),this.saveDraft(this.currentChannel,this.newMessage),this.commandSuggestions=this.newMessage.startsWith(`/`)?Object.keys(st).filter(e=>e.startsWith(this.newMessage.slice(1).toLowerCase())):[]},completeCommand(e){this.newMessage=`/${e} `,this.commandSuggestions=[],this.$refs.messageInput?.focus()},notifyTyping:bm(function(){if(this.isRegistered&&this.isChatTarget()&&this.canUseClientTag(`typing`)){let e=this.newMessage.length>0;this.sendRaw(`@+typing=${e?`active`:`done`} TAGMSG ${this.currentChannel}`),this.activeUsers.setTyping(this.currentChannel,this.nickname,e)}},3e3),sendTypingDone(){this.isRegistered&&this.isChatTarget()&&this.canUseClientTag(`typing`)&&(this.sendRaw(`@+typing=done TAGMSG ${this.currentChannel}`),this.activeUsers.setTyping(this.currentChannel,this.nickname,!1))},async sendMessage(){let e=this.newMessage.trim();if(e||this.pendingMediaFile){if(this.recordInputHistory(this.currentChannel,e),this.pendingMediaFile&&this.sendPendingMediaMessage)try{await this.sendPendingMediaMessage(e)&&(this.newMessage=``,this.commandSuggestions=[])}finally{this.endMediaUpload?.()}else{if(e.startsWith(`/`)){let[t,...n]=e.slice(1).split(` `);this.newMessage=``,this.commandSuggestions=[];let r=st[t.toLowerCase()];r?r(n,this):this.sendServerCommand(e.slice(1))}else this.isServerWindow()?this.sendServerCommand(e):(this.sendOwnMessage(this.currentChannel,e,{tags:this.activeReplyTag()}),this.replyingTo=null);delete this.unreadMarkerByChannel[this.currentChannel],this.sendTypingDone(),this.clearDraft(this.currentChannel),this.newMessage=``,this.commandSuggestions=[],this.resetInputHeight(),this.scrollToBottom(),this.isScrolledUp=!1,this.newWhileScrolledUp=0,this.markCurrentChannelAsRead()}}},splitByByteLength(e,t){let n=new TextEncoder;if(n.encode(e).length<=t)return[e];let r=[],i=``,a=0;for(let o of e){let e=n.encode(o).length;a+e>t&&i!==``&&(r.push(i),i=``,a=0),i+=o,a+=e}return i!==``&&r.push(i),r},sendChatText(e,t,r=null){let i=[];t.split(`
`).forEach(e=>{this.splitByByteLength(e,400).forEach((e,t)=>{i.push({text:e,concat:t>0})})});let a=r&&Object.keys(r).length?Object.entries(r).map(([e,t])=>`${e}=${n(t)}`).join(`;`):``,o=e=>a?`@${a} ${e}`:e;if(i.length<=1)return this.sendRaw(o(`PRIVMSG ${e} :${t}`)),[t];if(!this.supportsMultiline){let t=i.filter(e=>e.text!==``).map(e=>e.text);return t.forEach((t,n)=>this.sendRaw(n===0?o(`PRIVMSG ${e} :${t}`):`PRIVMSG ${e} :${t}`)),t}let s=this.multilineMaxLines>0?this.multilineMaxLines:i.length,c=[];for(let t=0;t<i.length;t+=s){let n=i.slice(t,t+s);c.push(n.map((e,t)=>(t===0||e.concat?``:`
`)+e.text).join(``));let r=`ml${Date.now().toString(36)}${Math.floor(Math.random()*1e6).toString(36)}`,a=`BATCH +${r} draft/multiline ${e}`;this.sendRaw(t===0?o(a):a),n.forEach((t,n)=>{let i=t.concat&&n>0;this.sendRaw(`${i?`@batch=${r};draft/multiline-concat`:`@batch=${r}`} PRIVMSG ${e} :${t.text}`)}),this.sendRaw(`BATCH -${r}`)}return c},sendOwnMessage(e,t,{isAction:n=!1,tags:r=null}={}){let i=this.canSendChat(),a;n?(this.sendRaw(`PRIVMSG ${e} :\u0001ACTION ${t}\u0001`),a=[t]):a=this.sendChatText(e,t,r);let o=this.ensureSeenMessageBucket(e);o.add(this.getMessageDedupKey(e,this.nickname,t,!1,{})),o.add(`${e}|text|${this.nickname}|${t}`);let s=this.messageManager.add(e,{user:this.nickname,text:t,isAction:n,isJoinPart:!1,replyTo:r?.[`+draft/reply`]||null,nickColor:this.getNickColor(this.nickname),timestamp:new Date().toLocaleTimeString(),_ts:Date.now(),isHistorical:!1,pending:!i});return this.supportsEchoMessage&&this.expectEcho(e,a,s,n),s},resetInputHeight(){let e=this.$refs.messageInput;e&&e.tagName===`TEXTAREA`&&(e.style.height=`auto`)},autoGrowInput(e){e&&(e.style.height=`auto`,e.value&&e.offsetWidth&&(e.style.height=`${Math.min(e.scrollHeight,160)}px`))},escapeHtml:w,get showUserList(){return(this.isMobileLayout?this.mobileUserListOpen:this.userListOpen)&&this.sidebarMode===`channels`&&!!this.currentChannel?.startsWith(`#`)},get currentMessages(){return this.stores.messages.get()[this.currentChannel]?.content||[]},get messageRows(){let e=this.unreadMarkerByChannel[this.currentChannel],t={today:this.t(`today`),yesterday:this.t(`yesterday`),locale:this.t(`locale`)},n=[],r=null;if(this.isServerWindow())return this.serverWindowRows(t);let i=this.currentMessages.filter(e=>!e._hidden&&!(this.hideJoinPart&&vm(e)));for(let a=0;a<i.length;a++){let o=i[a],s=this.messageKind(o),c=!r||T(r._ts)!==T(o._ts),l=e!=null&&o.id===e;if(vm(o)){let e=a;for(;e+1<i.length&&vm(i[e+1])&&T(i[e+1]._ts)===T(o._ts);)e++;if(e-a+1>=fm){let s=i.slice(a,e+1);n.push({key:`events-${o.id}`,message:s[s.length-1],kind:`events`,events:s,summary:this.eventGroupSummary(s),expanded:!!this.expandedEventGroups[o.id],groupId:o.id,grouped:!1,dayLabel:c?_e(o._ts,t):null,showUnreadSeparator:l,isMention:!1}),r=s[s.length-1],a=e;continue}}let u=!c&&!l&&s===`text`&&!o.replyTo&&this.messageKind(r)===`text`&&ym(r.user,o.user)&&!!r.isNotice==!!o.isNotice&&o._ts-r._ts<dm;n.push({key:o.id,message:o,kind:s,grouped:u,dayLabel:c?_e(o._ts,t):null,showUnreadSeparator:l,isMention:(s===`text`||s===`action`)&&!ym(o.user,this.nickname)&&this.isHighlightedText(o.text)}),r=o}return n},serverWindowRows(e){let t=null;return this.currentMessages.map(n=>{let r=!t||T(t._ts)!==T(n._ts);return t=n,{key:n.id,message:n,kind:`server`,grouped:!1,dayLabel:r?_e(n._ts,e):null,showUnreadSeparator:!1,isMention:!1}})},eventGroupSummary(e){let t=new Set,n=new Set;for(let r of e)(r.joinPartType===`join`?t:n).add(r.user);let r=[t.size?this.t(`events_joined`,{count:t.size}):null,n.size?this.t(`events_left`,{count:n.size}):null].filter(Boolean).join(` · `),i=[...new Set(e.map(e=>e.user))];return{counts:r,names:i.slice(0,pm).join(`, `)+(i.length>pm?` +${i.length-pm}`:``)}},toggleEventGroup(e){this.expandedEventGroups[e]?delete this.expandedEventGroups[e]:this.expandedEventGroups[e]=!0},toggleJoinPart(){this.hideJoinPart=!this.hideJoinPart;try{localStorage.setItem(`chat.hideJoinPart`,this.hideJoinPart?`1`:`0`)}catch{}},get privateMessageKeys(){return this.messageManager.privateKeys()},get channelTopic(){return this.parseMircFormatting(this.channelManager.getTopic(this.currentChannel))},get reactiveUsers(){return this.stores.users.get()},get unreadDirectMessageCount(){return this.privateMessageKeys.filter(e=>e!==ic).reduce((e,t)=>e+(this.unreadMessages[t]||0),0)},get pendingFriendRequestCount(){return this.incomingFriendRequests?.length||0},get friendsIndicatorCount(){return this.unreadDirectMessageCount+this.pendingFriendRequestCount},get homeChannels(){let e=this.availableChannels.filter(e=>e.startsWith(`#`)),t=this.lobbyChannel,n=e.filter(e=>e!==t).sort((e,t)=>e.localeCompare(t,void 0,{sensitivity:`base`}));return[...t&&e.includes(t)?[t]:[],...n]},isHomeChannel(e){return this.availableChannels.includes(e)},get channelListEntries(){return this.channelEntries?.()||this.homeChannels.map(e=>({name:e,joined:!0}))},get sortedChannels(){return this.channelListEntries.filter(e=>e.joined).map(e=>e.name)},get channelsMentionCount(){return this.homeChannels.reduce((e,t)=>e+(this.mentionsByChannel[t]||0),0)},get channelsHaveUnread(){return this.homeChannels.some(e=>this.hasUnread(e))},get filteredServerChannels(){let e=(this.exploreSearch||``).toLowerCase().trim(),t=[...this.serverChannels||[]];return e&&(t=t.filter(t=>t.name.toLowerCase().includes(e)||(t.topic||``).toLowerCase().includes(e))),t.sort((e,t)=>(t.users||0)-(e.users||0))}}}function Cm(e){return{emojiSearch:``,activeCategory:`smileys`,categories:{smileys:{label:`😀`,title:e(`emoji_category_smileys`),emojis:`😀.😁.😂.🤣.😃.😄.😅.😆.😉.😊.😋.😎.😍.🥰.😘.😗.😙.😚.🙂.🤗.🤩.🤔.🤨.😐.😑.😶.🙄.😏.😣.😥.😮.🤐.😯.😪.😫.🥱.😴.😌.😛.😜.😝.🤤.😒.😓.😔.😕.🙃.🤑.😲.☹️.🙁.😖.😞.😟.😤.😢.😭.😦.😧.😨.😩.🤯.😬.😰.😱.🥵.🥶.😳.🤪.😵.🥴.😠.😡.🤬.😷.🤒.🤕.🤢.🤮.🤧.🥳.🥸.🤠.🥺.😇.🤓.🧐.😈.👿.👻.💀.☠️.👽.👾.🤖.💩.😺.😸.😹.😻.😼.😽.🙀.😿.😾`.split(`.`)},gestures:{label:`👋`,title:e(`emoji_category_gestures`),emojis:`👋.🤚.🖐.✋.🖖.👌.🤌.🤏.✌️.🤞.🤟.🤘.🤙.👈.👉.👆.🖕.👇.☝️.👍.👎.✊.👊.🤛.🤜.👏.🙌.🤲.🤝.🙏.✍️.💅.🤳.💪.🦾.🦿.🦵.🦶.👂.🦻.👃.👀.👁.👅.👄.💋.🦷.👶.🧒.👦.👧.🧑.👱.👨.🧔.👩.🧓.👴.👵.🙍.🙎.🙅.🙆.💁.🙋.🧏.🙇.🤦.🤷`.split(`.`)},nature:{label:`🐶`,title:e(`emoji_category_nature`),emojis:`🐶.🐱.🐭.🐹.🐰.🦊.🐻.🐼.🐨.🐯.🦁.🐮.🐷.🐽.🐸.🐵.🙈.🙉.🙊.🐔.🐧.🐦.🐤.🦆.🦅.🦉.🦇.🐺.🐗.🐴.🦄.🐝.🐛.🦋.🐌.🐞.🐜.🦟.🦗.🦂.🐢.🐍.🦎.🦖.🦕.🐙.🦑.🦐.🦞.🦀.🐡.🐠.🐟.🐬.🐳.🐋.🦈.🐊.🐅.🐆.🦓.🦍.🦧.🐘.🦛.🦏.🐪.🐫.🦒.🦘.🐃.🐂.🐄.🐎.🐖.🐏.🐑.🦙.🐐.🦌.🐕.🐩.🦮.🐈.🐓.🦃.🦚.🦜.🦢.🦩.🕊️.🐇.🦝.🦨.🦡.🦫.🦦.🦥.🐁.🐀.🐿️.🦔.🌵.🎄.🌲.🌳.🌴.🌱.🌿.☘️.🍀.🎍.🎋.🍃.🍂.🍁.🍄.🌾.💐.🌷.🌹.🥀.🌺.🌸.🌼.🌻.🌞.⭐.🌟.💫.✨.🔥.🌈.🌊`.split(`.`)},food:{label:`🍕`,title:e(`emoji_category_food`),emojis:`🍏.🍎.🍐.🍊.🍋.🍌.🍉.🍇.🍓.🫐.🍒.🍑.🥭.🍍.🥥.🥝.🍅.🍆.🥑.🥦.🥬.🥒.🌶️.🌽.🥕.🧄.🧅.🥔.🍠.🥐.🥯.🍞.🥖.🥨.🧀.🥚.🍳.🧈.🥞.🧇.🥓.🥩.🍗.🍖.🌭.🍔.🍟.🍕.🌮.🌯.🥙.🧆.🥘.🍲.🥫.🍱.🍘.🍙.🍚.🍛.🍜.🍝.🍢.🍣.🍤.🍥.🥮.🍡.🥟.🥠.🥡.🍦.🍧.🍨.🍩.🍪.🎂.🍰.🧁.🥧.🍫.🍬.🍭.🍮.🍯.🍼.🥛.☕.🫖.🍵.🧃.🥤.🧋.🍶.🍺.🍻.🥂.🍷.🥃.🍸.🍹.🧉.🍾`.split(`.`)},travel:{label:`✈️`,title:e(`emoji_category_travel`),emojis:`🚗.🚕.🚙.🚌.🚎.🏎️.🚓.🚑.🚒.🚐.🛻.🚚.🚛.🚜.🏍️.🛵.🚲.🛴.🛹.⚓.⛵.🚤.🛥️.🛳️.🚢.✈️.🛩️.🚀.🛸.🚁.🪂.🏔️.⛰️.🌋.🗻.🏕️.🏖️.🏜️.🏝️.🏞️.🏟️.🏛️.🏗️.🧱.🏘️.🏠.🏡.🏢.🏣.🏤.🏥.🏦.🏨.🏩.🏪.🏫.🏬.🏭.🏯.🏰.💒.🗼.🗽.⛪.🕌.🛕.🕍.⛩️.🕋.⛲.⛺.🌁.🌃.🏙️.🌄.🌅.🌆.🌇.🌉`.split(`.`)},activities:{label:`⚽`,title:e(`emoji_category_activities`),emojis:`⚽.🏀.🏈.⚾.🥎.🎾.🏐.🏉.🥏.🎱.🪀.🏓.🏸.🏒.🥍.🏑.🥊.🥋.🎽.🛹.🛷.⛸️.🥌.🎿.⛷️.🏂.🏋️.🤼.🤸.⛹️.🤺.🤾.🏌️.🏇.🧘.🏄.🏊.🤽.🚣.🧗.🚵.🚴.🏆.🥇.🥈.🥉.🏅.🎖️.🎪.🤹.🎭.🩰.🎨.🎬.🎤.🎧.🎼.🎵.🎶.🎹.🥁.🪘.🎷.🎺.🎸.🪕.🎻.🎲.♟️.🎯.🎳.🎮.🎰.🧩`.split(`.`)},objects:{label:`💡`,title:e(`emoji_category_objects`),emojis:`💡.🔦.🕯️.🪔.💰.💵.💸.💳.🪙.📈.📉.📊.📋.📌.📍.📎.🖇️.📏.📐.✂️.🗃️.🗄️.🗑️.🔒.🔓.🔑.🗝️.🔨.🪓.⛏️.⚒️.🛠️.⚔️.🔫.🪃.🏹.🛡️.🔧.🪛.🔩.⚙️.🗜️.🔗.⛓️.🪝.🧰.🧲.🪜.⚗️.🔭.🔬.🩺.💊.🩹.🌡️.🚪.🪑.🛋️.🚿.🛁.🧴.🧷.🧹.🧺.🧻.🧼.🫧.🪥.🧽.🪣.🧯.🛒.📱.💻.⌨️.🖥️.🖨️.🖱️.💾.💿.📷.📸.📞.☎️.📺.📻.⏰.⌚.⏱️.📡.🔋.🔌.💡`.split(`.`)},symbols:{label:`❤️`,title:e(`emoji_category_symbols`),emojis:`❤️.🧡.💛.💚.💙.💜.🖤.🤍.🤎.💔.❤️‍🔥.❤️‍🩹.❣️.💕.💞.💓.💗.💖.💘.💝.💟.☮️.✝️.☪️.🕉️.☸️.✡️.🔯.🕎.☯️.☦️.🛐.⛎.♈.♉.♊.♋.♌.♍.♎.♏.♐.♑.♒.♓.🎉.🎊.🎈.🎁.🔔.🔕.🔇.🔈.🔉.🔊.📢.📣.🔴.🟠.🟡.🟢.🔵.🟣.⚫.⚪.🟤.❌.✅.⚠️.🚫.💯.❗.❓.‼️.⁉️.♻️.✔️.➕.➖.➗.✖️.💠.🌀.➿.🔱.🔰.⭕.🛑.⛔.📛`.split(`.`)}},names:{"😀":`lachen grinsen happy smile smiley`,"😁":`grinsen teeth happy`,"😂":`tränen lachen crying laugh tears joy`,"🤣":`rolling lachen floor`,"😃":`lächeln open mouth smile`,"😄":`lächeln augen smile eyes`,"😅":`schweiss sweat smile erleichterung relief`,"😆":`xd lachen squinting laugh`,"😉":`zwinkern wink`,"😊":`lächeln blush smile`,"😋":`lecker yummy tongue`,"😎":`cool sonnenbrille sunglasses`,"😍":`verliebt herzaugen heart eyes love`,"🥰":`verliebt smiling hearts love`,"😘":`kuss kiss`,"😗":`kuss whistle kiss`,"😙":`kuss smile kiss`,"😚":`kuss closed kiss`,"🙂":`leichtes lächeln slight smile`,"🤗":`umarmen hug`,"🤩":`sternaugen star eyes begeistert excited`,"🤔":`nachdenken thinking hmm`,"😐":`neutral gesicht face`,"😑":`ausdruckslos expressionless`,"😶":`ohne mund no mouth`,"🙄":`augen drehen roll eyes`,"😏":`grinsen smirk`,"😣":`leiden anguish`,"😥":`traurig sad tear`,"😮":`überrascht surprised open mouth`,"🤐":`mund zu zip mouth`,"😯":`überrascht hushed`,"😪":`schläfrig sleepy`,"😫":`müde tired`,"🥱":`gähnen yawn`,"😴":`schlafen sleeping zzz`,"😌":`erleichtert relieved`,"😛":`zunge tongue`,"😜":`zwinkern zunge wink tongue`,"😝":`zunge augen tongue`,"🤤":`sabber drool`,"😒":`unzufrieden unamused`,"😓":`schweiss sweat`,"😔":`nachdenklich pensive`,"😕":`verwirrt confused`,"🙃":`auf dem kopf upside down`,"🤑":`dollar geld money`,"😲":`erstaunt astonished`,"☹️":`traurig sad frown`,"🙁":`unzufrieden sad`,"😖":`verwirrt confounded`,"😞":`enttäuscht disappointed`,"😟":`besorgt worried`,"😤":`wut steam face`,"😢":`weinen cry tear sad`,"😭":`weinen cry sob tränen`,"😦":`bestürzt frowning`,"😧":`ängstlich anguished`,"😨":`ängstlich fearful`,"😩":`müde weary`,"🤯":`platzt kopf exploding head`,"😬":`zähne grimace`,"😰":`angstschweiß cold sweat`,"😱":`schreien scream fear`,"🥵":`heiss hot`,"🥶":`kalt cold`,"😳":`erröten flushed`,"🤪":`verrückt zany`,"😵":`schwindelig dizzy`,"🥴":`taumeln woozy`,"😠":`wütend angry`,"😡":`wut rage rot red`,"🤬":`schimpfen cursing`,"😷":`krank maske mask sick`,"🤒":`krank thermometer sick`,"🤕":`krank verletzt sick hurt`,"🤢":`übel nausea`,"🤮":`kotzen vomit`,"🤧":`niesen sneeze`,"🥳":`party feiern celebrate`,"🥸":`verkleidet disguise`,"🤠":`cowboy hat`,"🥺":`bitte pleading`,"😇":`engel angel halo`,"🤓":`nerd brille glasses`,"🧐":`monokel monocle`,"😈":`teufel devil böse`,"👿":`teufel angry devil`,"👻":`geist ghost`,"💀":`totenkopf skull tod death`,"☠️":`totenkopf skull crossbones`,"👽":`alien`,"👾":`monster alien game`,"🤖":`roboter robot`,"💩":`haufen poop`,"😺":`katze cat lachen`,"😸":`katze cat grinsen`,"😹":`katze cat lachen cry`,"😻":`katze cat herzaugen love`,"😼":`katze cat smirk`,"😽":`katze cat kuss kiss`,"🙀":`katze cat scream shock`,"😿":`katze cat weinen cry`,"😾":`katze cat wut angry`,"👋":`winken wave hallo hello`,"🤚":`hand stop`,"🖐️":`hand finger stop`,"✋":`hand stop high five`,"🖖":`vulcan spock`,"👌":`ok gut perfect`,"🤌":`italia pinch`,"🤏":`wenig small`,"✌️":`frieden peace victory`,"🤞":`daumen drücken fingers crossed glück luck`,"🤟":`liebe love hand`,"🤘":`rock metal`,"🤙":`ruf mich call`,"👈":`links left zeigen point`,"👉":`rechts right zeigen point`,"👆":`hoch up zeigen point`,"🖕":`mittelfinger middle finger`,"👇":`runter down zeigen point`,"☝️":`zeigen point up`,"👍":`daumen hoch like gut thumbs up`,"👎":`daumen runter dislike schlecht thumbs down`,"✊":`faust fist`,"👊":`schlagen punch`,"🤛":`faust links left fist`,"🤜":`faust rechts right fist`,"👏":`klatschen clap`,"🙌":`hände hands celebration`,"🤲":`hände hands`,"🤝":`handschlag handshake`,"🙏":`bitte please danke thanks beten pray`,"✍️":`schreiben writing pen`,"💅":`nagellack nails`,"🤳":`selfie`,"💪":`muskel muscle stark strong`,"🦵":`bein leg`,"🦶":`fuß foot`,"👂":`ohr ear`,"👃":`nase nose`,"👀":`augen eyes look`,"👁️":`auge eye`,"👅":`zunge tongue`,"👄":`lippen lips mund mouth`,"💋":`kuss kiss lippen`,"🦷":`zahn tooth`,"👶":`baby`,"🧒":`kind child`,"👦":`junge boy`,"👧":`mädchen girl`,"🧑":`person`,"👱":`blond person`,"👨":`mann man`,"🧔":`bart beard`,"👩":`frau woman`,"🧓":`alt old person`,"👴":`opa grandpa alter mann old man`,"👵":`oma grandma alte frau old woman`,"🤦":`facepalm`,"🤷":`achselzucken shrug`,"🐶":`hund dog`,"🐱":`katze cat`,"🐭":`maus mouse`,"🐹":`hamster`,"🐰":`hase rabbit`,"🦊":`fuchs fox`,"🐻":`bär bear`,"🐼":`panda`,"🐨":`koala`,"🐯":`tiger`,"🦁":`löwe lion`,"🐮":`kuh cow`,"🐷":`schwein pig`,"🐽":`schwein nase pig nose`,"🐸":`frosch frog`,"🐵":`affe monkey`,"🙈":`affe sehen see no evil`,"🙉":`affe hören hear no evil`,"🙊":`affe sprechen speak no evil`,"🐔":`huhn chicken`,"🐧":`pinguin penguin`,"🐦":`vogel bird`,"🐤":`küken chick`,"🦆":`ente duck`,"🦅":`adler eagle`,"🦉":`eule owl`,"🦇":`fledermaus bat`,"🐺":`wolf`,"🐗":`wildschwein boar`,"🐴":`pferd horse`,"🦄":`einhorn unicorn`,"🐝":`biene bee`,"🐛":`raupe caterpillar`,"🦋":`schmetterling butterfly`,"🐌":`schnecke snail`,"🐞":`marienkäfer ladybug`,"🐜":`ameise ant`,"🦟":`mücke mosquito`,"🦗":`grille cricket`,"🦂":`skorpion scorpion`,"🐢":`schildkröte turtle`,"🐍":`schlange snake`,"🦎":`eidechse lizard`,"🦖":`dino dinosaur trex`,"🦕":`dino dinosaur`,"🐙":`oktopus octopus`,"🦑":`tintenfisch squid`,"🦐":`garnele shrimp`,"🦞":`hummer lobster`,"🦀":`krabbe crab`,"🐡":`kugelfisch puffer fish`,"🐠":`tropenfisch tropical fish`,"🐟":`fisch fish`,"🐬":`delfin dolphin`,"🐳":`wal whale`,"🐋":`wal whale`,"🦈":`hai shark`,"🐊":`krokodil crocodile`,"🐘":`elefant elephant`,"🦛":`nilpferd hippo`,"🦏":`nashorn rhino`,"🐪":`kamel camel`,"🐫":`kamel camel`,"🦒":`giraffe`,"🦘":`känguru kangaroo`,"🦙":`lama llama`,"🦔":`igel hedgehog`,"🐕":`hund dog`,"🐩":`pudel poodle`,"🦮":`blindenhund guide dog`,"🐈":`katze cat`,"🦚":`pfau peacock`,"🦜":`papagei parrot`,"🦢":`schwan swan`,"🦩":`flamingo`,"🐇":`hase rabbit`,"🦝":`waschbär raccoon`,"🦨":`stinktier skunk`,"🦡":`dachs badger`,"🦫":`biber beaver`,"🦦":`otter`,"🦥":`faultier sloth`,"🌵":`kaktus cactus`,"🎄":`weihnachtsbaum christmas tree`,"🌲":`baum tree`,"🌳":`baum tree`,"🌴":`palme palm`,"🌱":`pflanze sprout plant`,"🌿":`blatt herb leaf`,"☘️":`kleeblatt shamrock`,"🍀":`glücksklee four leaf clover`,"🍄":`pilz mushroom`,"🌾":`weizen wheat`,"💐":`blumenstrauß bouquet`,"🌷":`tulpe tulip`,"🌹":`rose`,"🥀":`verwelkt wilted rose`,"🌺":`hibiskus hibiscus`,"🌸":`kirschblüte blossom`,"🌼":`blume flower`,"🌻":`sonnenblume sunflower`,"🌞":`sonne sun`,"⭐":`stern star`,"🌟":`stern star glowing`,"💫":`stern star dizzy`,"✨":`glitzer sparkle`,"🔥":`feuer fire`,"🌈":`regenbogen rainbow`,"🌊":`welle wave ocean`,"🍏":`apfel grüner apple green`,"🍎":`apfel roter apple red`,"🍐":`birne pear`,"🍊":`orange mandarine`,"🍋":`zitrone lemon`,"🍌":`banane banana`,"🍉":`wassermelone watermelon`,"🍇":`trauben grapes`,"🍓":`erdbeere strawberry`,"🫐":`blaubeere blueberry`,"🍒":`kirsche cherry`,"🍑":`pfirsich peach`,"🥭":`mango`,"🍍":`ananas pineapple`,"🥥":`kokosnuss coconut`,"🥝":`kiwi`,"🍅":`tomate tomato`,"🍆":`aubergine eggplant`,"🥑":`avocado`,"🥦":`brokkoli broccoli`,"🥬":`salat lettuce`,"🥒":`gurke cucumber`,"🌶️":`chili pepper scharf hot`,"🌽":`mais corn`,"🥕":`karotte carrot`,"🧄":`knoblauch garlic`,"🧅":`zwiebel onion`,"🥔":`kartoffel potato`,"🍠":`süßkartoffel sweet potato`,"🥐":`croissant`,"🥯":`bagel`,"🍞":`brot bread`,"🥖":`baguette`,"🥨":`brezel pretzel`,"🧀":`käse cheese`,"🥚":`ei egg`,"🍳":`ei braten fried egg pan`,"🧈":`butter`,"🥞":`pfannkuchen pancake`,"🧇":`waffel waffle`,"🥓":`speck bacon`,"🥩":`fleisch meat steak`,"🍗":`hähnchen chicken leg`,"🍖":`fleisch meat bone`,"🌭":`hotdog`,"🍔":`burger hamburger`,"🍟":`pommes fries`,"🍕":`pizza`,"🌮":`taco`,"🌯":`wrap`,"🥙":`sandwich pita`,"🥘":`pfanne pan`,"🍲":`topf pot stew eintopf`,"🥫":`dose can`,"🍜":`nudeln noodles ramen`,"🍝":`pasta spaghetti nudeln`,"🍣":`sushi`,"🍱":`bento box`,"🍦":`softeis ice cream`,"🍧":`sorbet eis`,"🍨":`eis ice cream`,"🍩":`donut`,"🍪":`keks cookie`,"🎂":`torte geburtstag birthday cake`,"🍰":`kuchen cake`,"🧁":`muffin cupcake`,"🍫":`schokolade chocolate`,"🍬":`bonbon candy`,"🍭":`lutscher lollipop`,"🍺":`bier beer`,"🍻":`bier prost beer cheers`,"🥂":`champagner sekt prosecco toast`,"🍷":`wein wine rot red`,"🥃":`whiskey scotch`,"🍸":`cocktail martini`,"🍹":`cocktail tropical`,"🧋":`bubble tea boba`,"☕":`kaffee coffee`,"🍵":`tee tea`,"🧃":`saft juice`,"🥤":`limonade softdrink`,"🍾":`champagner sekt flasche bottle`,"🚗":`auto car fahren drive`,"🚕":`taxi`,"🚙":`suv auto car`,"🚌":`bus`,"🏎️":`rennwagen race car`,"🚓":`polizei police car`,"🚑":`krankenwagen ambulance`,"🚒":`feuerwehr fire truck`,"🚲":`fahrrad bicycle`,"🛴":`roller scooter`,"✈️":`flugzeug airplane fliegen fly`,"🚀":`rakete rocket`,"🛸":`ufo`,"🚢":`schiff ship boot`,"⛵":`segelboot sailboat`,"🚁":`hubschrauber helicopter`,"🪂":`fallschirm parachute`,"🏔️":`berg mountain`,"🌋":`vulkan volcano`,"🏕️":`camping zelt tent`,"🏖️":`strand beach`,"🏜️":`wüste desert`,"🏝️":`insel island`,"🏠":`haus house`,"🏡":`haus house garten`,"🏢":`büro office building`,"🏥":`krankenhaus hospital`,"🏦":`bank`,"🏨":`hotel`,"🏪":`laden shop`,"🏫":`schule school`,"🏭":`fabrik factory`,"🏯":`burg castle`,"🏰":`schloss castle`,"⛪":`kirche church`,"🕌":`moschee mosque`,"🕍":`synagoge synagogue`,"🕋":`kaaba`,"⚽":`fußball soccer ball`,"🏀":`basketball`,"🏈":`american football`,"⚾":`baseball`,"🎾":`tennis`,"🏐":`volleyball`,"🥊":`boxen boxing gloves`,"🥋":`kampfsport martial arts`,"🏆":`pokal trophy gewinner winner`,"🥇":`gold medal erste first`,"🥈":`silber silver medal`,"🥉":`bronze medal`,"🎮":`gaming spielen controller`,"🎲":`würfel dice spiel game`,"🎯":`ziel target`,"🎨":`kunst art malen paint`,"🎬":`film kino movie`,"🎤":`mikrofon microphone singen sing`,"🎧":`kopfhörer headphones musik music`,"🎵":`note musik music`,"🎶":`noten musik music`,"🎹":`klavier piano`,"🎷":`saxofon saxophone`,"🎺":`trompete trumpet`,"🎸":`gitarre guitar`,"🎻":`geige violin`,"🥁":`trommel drum`,"🎮":`controller gaming`,"💡":`idee idea lampe light bulb`,"🔦":`taschenlampe flashlight`,"🕯️":`kerze candle`,"💰":`geld money euro dollar sack`,"💵":`dollar schein bill`,"💸":`geld money fliegen`,"💳":`kreditkarte credit card`,"🪙":`münze coin`,"🔒":`schloss lock`,"🔓":`offen unlock open`,"🔑":`schlüssel key`,"🗝️":`alter schlüssel old key`,"🔨":`hammer`,"🛠️":`werkzeug tools`,"⚔️":`schwert sword`,"🔫":`pistole gun waffe`,"🛡️":`schild shield`,"🔧":`schraubenzieher wrench`,"🔩":`schraube screw`,"⚙️":`zahnrad gear`,"🧲":`magnet`,"🔭":`teleskop telescope`,"🔬":`mikroskop microscope`,"💊":`pille pill medizin`,"🩹":`pflaster bandage`,"🌡️":`thermometer`,"🚪":`tür door`,"🛋️":`sofa couch`,"🚿":`dusche shower`,"🛁":`badewanne bath`,"🧴":`lotion flasche`,"🧹":`besen broom`,"🧺":`korb basket`,"🧻":`klopapier toilet paper`,"🧼":`seife soap`,"🗑️":`mülleimer trash`,"📱":`handy smartphone phone`,"💻":`laptop computer`,"⌨️":`tastatur keyboard`,"🖥️":`monitor desktop computer`,"📷":`kamera camera`,"📸":`kamera foto camera photo`,"📞":`telefon phone`,"📺":`fernseher tv television`,"📻":`radio`,"⏰":`wecker alarm clock`,"⌚":`uhr watch`,"📡":`antenne satellite`,"❤️":`herz heart liebe love rot red`,"🧡":`herz heart orange`,"💛":`herz heart gelb yellow`,"💚":`herz heart grün green`,"💙":`herz heart blau blue`,"💜":`herz heart lila purple`,"🖤":`herz heart schwarz black`,"🤍":`herz heart weiß white`,"🤎":`herz heart braun brown`,"💔":`gebrochenes herz broken heart`,"❤️‍🔥":`brennendes herz burning heart leidenschaft`,"❤️‍🩹":`herz heilen healing heart`,"❣️":`ausrufezeichen herz heart exclamation`,"💕":`herzen hearts liebe`,"💞":`herzen rotating hearts`,"💓":`herz heart pulsierend`,"💗":`wachsendes herz growing heart`,"💖":`funkelndes herz sparkling heart`,"💘":`herz pfeil heart arrow cupid liebe`,"💝":`herz schleife heart ribbon`,"🎉":`party konfetti feier celebrate`,"🎊":`konfetti confetti feier`,"🎈":`ballon balloon party`,"🎁":`geschenk present gift`,"🔔":`glocke bell`,"❌":`x kreuz cross nein no`,"✅":`haken check ok ja yes`,"⚠️":`warnung warning`,"🚫":`verboten forbidden nein no`,"💯":`hundert hundred percent ok`,"❗":`ausrufezeichen exclamation`,"❓":`fragezeichen question`,"♻️":`recycling umwelt`,"🔴":`rot red kreis circle`,"🟠":`orange kreis circle`,"🟡":`gelb yellow kreis circle`,"🟢":`grün green kreis circle`,"🔵":`blau blue kreis circle`,"🟣":`lila purple kreis circle`,"⚫":`schwarz black kreis circle`,"⚪":`weiß white kreis circle`},filteredEmojis(){let e=this.emojiSearch.toLowerCase().trim();if(!e)return this.categories[this.activeCategory]?.emojis||[];let t=new Set;return Object.values(this.categories).flatMap(e=>e.emojis).filter(n=>!t.has(n)&&(t.add(n),(this.names[n]||``).includes(e)||n===e))}}}async function wm(e,t={}){let{Alpine:n=Ss,primaryServer:r=null,serverList:i=`default`,locale:a=globalThis.navigator?.languages?.length?globalThis.navigator.languages:globalThis.navigator?.language,theme:o=`auto`,overrides:s={},appName:c=`StarChat`,onHostMessage:l=()=>{},...u}=t,d=typeof e==`string`?document.querySelector(e):e;if(!d)throw Error(`mountChat: ${e} not found`);Sp(d,o);let f=dt({locale:a,overrides:s,appName:c}),{primary:p,servers:m}=await qe({primaryServer:r,serverList:i});if(!p)throw Error(`mountChat: no server to connect to`);let h=await it(p);for(let[e,t]of Object.entries({messages:{},users:{},channelTopics:{},channelManagement:Ts()}))n.store(e)||n.store(e,t);let g=Object.fromEntries([`messages`,`users`,`channelTopics`,`channelManagement`].map(e=>[e,ye(n,e)]));return n.data(`chatComponent`,()=>Sm({...u,connection:h,stores:g,t:f,defaultTheme:o,servers:i===!1?[p]:m,openServerConnection:e=>it(e),notifyHost:l,rawOf:e=>n.raw(e)})),n.data(`emojiPicker`,()=>Cm(f)),d.innerHTML=gt(`chat`,f),t.Alpine||globalThis.__starchatAlpineStarted?n.initTree(d):(globalThis.__starchatAlpineStarted=!0,n.start()),{connection:h,servers:m}}var Tm=new URLSearchParams(window.location.search);wm(`#chat`,{primaryServer:Tm.get(`server`)||`st-city.net`,serverList:`default`,defaultChannel:`#starchat`,locale:Tm.get(`lang`)||void 0,theme:Tm.get(`theme`)||`auto`,ctcpVersion:`StarChat (demo) https://getstarchat.net`}).catch(e=>{let t=document.createElement(`div`);t.className=`demo-error`,t.textContent=`The chat could not be started: ${e.message}`,document.getElementById(`chat`).replaceChildren(t)});