import{a as r}from"./chunk-GGCEL3NW.js";var a,o,m,H,v=0,b=[],s=[],y=r.__b,E=r.__r,V=r.diffed,x=r.__c,g=r.unmount;function h(t,_){r.__h&&r.__h(o,t,v||_),v=0;var n=o.__H||(o.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({__V:s}),n.__[t]}function k(t,_){var n=h(a++,3);!r.__s&&C(n.__H,_)&&(n.__=t,n.i=_,o.__H.__h.push(n))}function T(t){return v=5,F(function(){return{current:t}},[])}function F(t,_){var n=h(a++,7);return C(n.__H,_)?(n.__V=t(),n.i=_,n.__h=t,n.__V):n.__}function I(t,_){return v=8,F(function(){return t},_)}function P(t){var _=o.context[t.__c],n=h(a++,9);return n.c=t,_?(n.__==null&&(n.__=!0,_.sub(o)),_.props.value):t.__}function R(){var t=h(a++,11);if(!t.__){for(var _=o.__v;_!==null&&!_.__m&&_.__!==null;)_=_.__;var n=_.__m||(_.__m=[0,0]);t.__="P"+n[0]+"-"+n[1]++}return t.__}function A(){for(var t;t=b.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(l),t.__H.__h.forEach(p),t.__H.__h=[]}catch(_){t.__H.__h=[],r.__e(_,t.__v)}}r.__b=function(t){o=null,y&&y(t)},r.__r=function(t){E&&E(t),a=0;var _=(o=t.__c).__H;_&&(m===o?(_.__h=[],o.__h=[],_.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=s,n.__N=n.i=void 0})):(_.__h.forEach(l),_.__h.forEach(p),_.__h=[])),m=o},r.diffed=function(t){V&&V(t);var _=t.__c;_&&_.__H&&(_.__H.__h.length&&(b.push(_)!==1&&H===r.requestAnimationFrame||((H=r.requestAnimationFrame)||q)(A)),_.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==s&&(n.__=n.__V),n.i=void 0,n.__V=s})),m=o=null},r.__c=function(t,_){_.some(function(n){try{n.__h.forEach(l),n.__h=n.__h.filter(function(u){return!u.__||p(u)})}catch(u){_.some(function(i){i.__h&&(i.__h=[])}),_=[],r.__e(u,n.__v)}}),x&&x(t,_)},r.unmount=function(t){g&&g(t);var _,n=t.__c;n&&n.__H&&(n.__H.__.forEach(function(u){try{l(u)}catch(i){_=i}}),n.__H=void 0,_&&r.__e(_,n.__v))};var N=typeof requestAnimationFrame=="function";function q(t){var _,n=function(){clearTimeout(u),N&&cancelAnimationFrame(_),setTimeout(t)},u=setTimeout(n,100);N&&(_=requestAnimationFrame(n))}function l(t){var _=o,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),o=_}function p(t){var _=o;t.__c=t.__(),o=_}function C(t,_){return!t||t.length!==_.length||_.some(function(n,u){return n!==t[u]})}var U=0;function W(t,_,n,u,i,D){var c,e,f={};for(e in _)e=="ref"?c=_[e]:f[e]=_[e];var d={type:t,props:f,key:n,ref:c,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--U,__source:i,__self:D};if(typeof t=="function"&&(c=t.defaultProps))for(e in c)f[e]===void 0&&(f[e]=c[e]);return r.vnode&&r.vnode(d),d}export{k as a,T as b,F as c,I as d,P as e,R as f,W as g};
