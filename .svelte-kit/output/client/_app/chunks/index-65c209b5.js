function B(){}function F(t,n){for(const e in n)t[e]=n[e];return t}function L(t){return t()}function C(){return Object.create(null)}function p(t){t.forEach(L)}function H(t){return typeof t=="function"}function ct(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let g;function lt(t,n){return g||(g=document.createElement("a")),g.href=n,t===g.href}function I(t){return Object.keys(t).length===0}function ot(t,n,e,i){if(t){const c=T(t,n,e,i);return t[0](c)}}function T(t,n,e,i){return t[1]&&i?F(e.ctx.slice(),t[1](i(n))):e.ctx}function ut(t,n,e,i){if(t[2]&&i){const c=t[2](i(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const f=[],l=Math.max(n.dirty.length,c.length);for(let o=0;o<l;o+=1)f[o]=n.dirty[o]|c[o];return f}return n.dirty|c}return n.dirty}function ft(t,n,e,i,c,f){if(c){const l=T(n,e,i,f);t.p(l,c)}}function at(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let w=!1;function G(){w=!0}function J(){w=!1}function K(t,n,e,i){for(;t<n;){const c=t+(n-t>>1);e(c)<=i?t=c+1:n=c}return t}function W(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let u=0;u<n.length;u++){const s=n[u];s.claim_order!==void 0&&r.push(s)}n=r}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let c=0;for(let r=0;r<n.length;r++){const u=n[r].claim_order,s=(c>0&&n[e[c]].claim_order<=u?c+1:K(1,c,y=>n[e[y]].claim_order,u))-1;i[r]=e[s]+1;const a=s+1;e[a]=r,c=Math.max(a,c)}const f=[],l=[];let o=n.length-1;for(let r=e[c]+1;r!=0;r=i[r-1]){for(f.push(n[r-1]);o>=r;o--)l.push(n[o]);o--}for(;o>=0;o--)l.push(n[o]);f.reverse(),l.sort((r,u)=>r.claim_order-u.claim_order);for(let r=0,u=0;r<l.length;r++){for(;u<f.length&&l[r].claim_order>=f[u].claim_order;)u++;const s=u<f.length?f[u]:null;t.insertBefore(l[r],s)}}function Q(t,n){if(w){for(W(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function st(t,n,e){w&&!e?Q(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function R(t){t.parentNode.removeChild(t)}function _t(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function U(t){return document.createElement(t)}function v(t){return document.createTextNode(t)}function dt(){return v(" ")}function ht(){return v("")}function mt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function pt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function V(t){return Array.from(t.childNodes)}function X(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function O(t,n,e,i,c=!1){X(t);const f=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const o=t[l];if(n(o)){const r=e(o);return r===void 0?t.splice(l,1):t[l]=r,c||(t.claim_info.last_index=l),o}}for(let l=t.claim_info.last_index-1;l>=0;l--){const o=t[l];if(n(o)){const r=e(o);return r===void 0?t.splice(l,1):t[l]=r,c?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,o}}return i()})();return f.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,f}function Y(t,n,e,i){return O(t,c=>c.nodeName===n,c=>{const f=[];for(let l=0;l<c.attributes.length;l++){const o=c.attributes[l];e[o.name]||f.push(o.name)}f.forEach(l=>c.removeAttribute(l))},()=>i(n))}function yt(t,n,e){return Y(t,n,e,U)}function Z(t,n){return O(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>v(n),!0)}function gt(t){return Z(t," ")}function xt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function bt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}let m;function h(t){m=t}function N(){if(!m)throw new Error("Function called outside component initialization");return m}function $t(t){N().$$.on_mount.push(t)}function wt(t){N().$$.after_update.push(t)}function Et(t,n){N().$$.context.set(t,n)}const d=[],M=[],b=[],q=[],P=Promise.resolve();let k=!1;function z(){k||(k=!0,P.then(D))}function kt(){return z(),P}function j(t){b.push(t)}const E=new Set;let x=0;function D(){const t=m;do{for(;x<d.length;){const n=d[x];x++,h(n),tt(n.$$)}for(h(null),d.length=0,x=0;M.length;)M.pop()();for(let n=0;n<b.length;n+=1){const e=b[n];E.has(e)||(E.add(e),e())}b.length=0}while(d.length);for(;q.length;)q.pop()();k=!1,E.clear(),h(t)}function tt(t){if(t.fragment!==null){t.update(),p(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(j)}}const $=new Set;let _;function jt(){_={r:0,c:[],p:_}}function vt(){_.r||p(_.c),_=_.p}function nt(t,n){t&&t.i&&($.delete(t),t.i(n))}function Nt(t,n,e,i){if(t&&t.o){if($.has(t))return;$.add(t),_.c.push(()=>{$.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}}function At(t,n){const e={},i={},c={$$scope:1};let f=t.length;for(;f--;){const l=t[f],o=n[f];if(o){for(const r in l)r in o||(i[r]=1);for(const r in o)c[r]||(e[r]=o[r],c[r]=1);t[f]=o}else for(const r in l)c[r]=1}for(const l in i)l in e||(e[l]=void 0);return e}function St(t){return typeof t=="object"&&t!==null?t:{}}function Ct(t){t&&t.c()}function Mt(t,n){t&&t.l(n)}function et(t,n,e,i){const{fragment:c,on_mount:f,on_destroy:l,after_update:o}=t.$$;c&&c.m(n,e),i||j(()=>{const r=f.map(L).filter(H);l?l.push(...r):p(r),t.$$.on_mount=[]}),o.forEach(j)}function it(t,n){const e=t.$$;e.fragment!==null&&(p(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function rt(t,n){t.$$.dirty[0]===-1&&(d.push(t),z(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function qt(t,n,e,i,c,f,l,o=[-1]){const r=m;h(t);const u=t.$$={fragment:null,ctx:null,props:f,update:B,not_equal:c,bound:C(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(r?r.$$.context:[])),callbacks:C(),dirty:o,skip_bound:!1,root:n.target||r.$$.root};l&&l(u.root);let s=!1;if(u.ctx=e?e(t,n.props||{},(a,y,...A)=>{const S=A.length?A[0]:y;return u.ctx&&c(u.ctx[a],u.ctx[a]=S)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](S),s&&rt(t,a)),y}):[],u.update(),s=!0,p(u.before_update),u.fragment=i?i(u.ctx):!1,n.target){if(n.hydrate){G();const a=V(n.target);u.fragment&&u.fragment.l(a),a.forEach(R)}else u.fragment&&u.fragment.c();n.intro&&nt(t.$$.fragment),et(t,n.target,n.anchor,n.customElement),J(),D()}h(r)}class Bt{$destroy(){it(this,1),this.$destroy=B}$on(n,e){const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const c=i.indexOf(e);c!==-1&&i.splice(c,1)}}$set(n){this.$$set&&!I(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{St as A,it as B,F as C,kt as D,B as E,ot as F,ft as G,at as H,ut as I,Q as J,lt as K,mt as L,_t as M,p as N,Bt as S,V as a,pt as b,yt as c,R as d,U as e,bt as f,st as g,Z as h,qt as i,xt as j,dt as k,ht as l,gt as m,jt as n,Nt as o,vt as p,nt as q,Et as r,ct as s,v as t,wt as u,$t as v,Ct as w,Mt as x,et as y,At as z};
