function E(v){(function(e){let a=new URLSearchParams(window.location.search),r=()=>a.has("disablePartytown")||a.has("gtm_debug")?(console.debug("\u{1F389} Running partytown scripts on main thread"),document.querySelectorAll('script[type="text/partytown"]').forEach(s=>{s.remove(),s.setAttribute("type","text/javascript"),document.body.appendChild(s)}),{...e,forward:void 0}):a.has("debugPartytown")?{...e,debug:!0}:e;window.partytown=r()})(v),function(t,e,a,r){r=t[e]=t[e]||{},r[a]=r[a]||[]}(window,"partytown","forward"),function(t,e,a,r,s,o,c,y,w,i,l,m){function f(){m||(m=1,(c=(o.lib||"/~partytown/")+(o.debug?"debug/":""))[0]=="/"&&(w=e.querySelectorAll('script[type="text/partytown"]'),r!=t?r.dispatchEvent(new CustomEvent("pt1",{detail:t})):(y=setTimeout(g,1e4),e.addEventListener("pt0",b),s?h(1):a.serviceWorker?a.serviceWorker.register(c+(o.swPath||"partytown-sw.js"),{scope:c}).then(function(n){n.active?h():n.installing&&n.installing.addEventListener("statechange",function(p){p.target.state=="activated"&&h()})},console.error):g())))}function h(n){i=e.createElement(n?"script":"iframe"),n||(i.setAttribute("style","display:block;width:0;height:0;border:0;visibility:hidden"),i.setAttribute("aria-hidden",!0)),i.src=c+"partytown-"+(n?"atomics.js?v=0.8.0":"sandbox-sw.html?"+Date.now()),e.querySelector(o.sandboxParent||"body").appendChild(i)}function g(n,p){for(b(),r==t&&(o.forward||[]).map(function(d){delete t[d.split(".")[0]]}),n=0;n<w.length;n++)(p=e.createElement("script")).innerHTML=w[n].innerHTML,e.head.appendChild(p);i&&i.parentNode.removeChild(i)}function b(){clearTimeout(y)}o=t.partytown||{},r==t&&(o.forward||[]).map(function(n){l=t,n.split(".").map(function(p,d,u){l=l[u[d]]=d+1<u.length?u[d+1]=="push"?[]:l[u[d]]||{}:function(){(t._ptf=t._ptf||[]).push(u,arguments)}})}),e.readyState=="complete"?f():(t.addEventListener("DOMContentLoaded",f),t.addEventListener("load",f))}(window,document,navigator,top,window.crossOriginIsolated)}export{E as default};
