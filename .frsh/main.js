import{c as p}from"./chunk-FBNNJVX6.js";import"./chunk-CRNLDV6W.js";import{a as s,b as f,f as h}from"./chunk-GGCEL3NW.js";function T(o,n){n=[].concat(n);let r=n[n.length-1].nextSibling;function e(t,i){o.insertBefore(t,i||r)}return o.__k={nodeType:1,parentNode:o,firstChild:n[0],childNodes:n,insertBefore:e,appendChild:e,removeChild:function(t){o.removeChild(t)}}}var g=o=>{"scheduler"in window?window.scheduler.postTask(o):setTimeout(o,0)};function b(o,n){function r(e){let t=e.nodeType===8&&(e.data.match(/^\s*frsh-(.*)\s*$/)||[])[1],i=null;if(t){let c=e,l=[],v=e.parentNode;for(;(e=e.nextSibling)&&e.nodeType!==8;)l.push(e);c.parentNode.removeChild(c);let[m,N]=t.split(":");g(()=>{performance.mark(t),h(f(o[m],n[Number(N)]),T(v,l)),performance.measure(`hydrate: ${m}`,t)}),i=e}let a=e.nextSibling,d=e.firstChild;i&&i.parentNode?.removeChild(i),a&&r(a),d&&r(d)}performance.mark("revive-start"),r(document.body),performance.measure("revive","revive-start")}var u=s.vnode;s.vnode=o=>{p(o),u&&u(o)};export{b as revive};
