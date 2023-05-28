import{a as h}from"./chunk-2EII6G2X.js";import{a as p}from"./chunk-C35ITEQR.js";import{a as A}from"./chunk-EWNLP24S.js";import{a as c}from"./chunk-7NIFRY26.js";import"./chunk-Y6O4XDOQ.js";import"./chunk-RIS4BGSQ.js";import"./chunk-DQXTXKTS.js";import"./chunk-AK4CW2VE.js";import{a as k}from"./chunk-MZUMWITR.js";import"./chunk-5XUYS6Q3.js";import{a as S}from"./chunk-RGUTNEWM.js";import"./chunk-CWWC2ZZK.js";import"./chunk-ZW2F42CV.js";import"./chunk-G2WUBQOQ.js";import{a as f,b as N}from"./chunk-7IFZXXPN.js";import"./chunk-WMAGUVW7.js";import"./chunk-FFVHBWQO.js";import"./chunk-6TYW3VO2.js";import"./chunk-U37GBM4D.js";import"./chunk-LZXS3K3K.js";import{b as w}from"./chunk-SZB65BFH.js";import{a as I,f as y,g as e}from"./chunk-QSF6UWS7.js";import"./chunk-CRNLDV6W.js";import{c as d}from"./chunk-GGCEL3NW.js";function C({alerts:t=[],interval:r=5}){let o=y();return e("div",{id:o,children:[e(h,{class:"carousel carousel-center bg-secondary gap-6 scrollbar-none",children:t.map((s,a)=>e(h.Item,{index:a,class:"carousel-item",children:e("span",{class:"text-sm text-secondary-content flex justify-center items-center w-screen h-[38px]",children:s})}))}),e(A,{rootId:o,interval:r&&r*1e3})]})}var P=C;function $({item:t}){let{href:r,label:o,children:s,image:a}=t;return e("li",{class:"group flex items-center py-[34px]",children:[e("a",{href:r,class:"px-4 py-3",children:e("span",{class:"group-hover:underline group-hover:font-semibold text-lg",children:o})}),s&&s.length>0&&e("div",{class:"hidden absolute top-full left-0 hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen",children:[a?.src&&e(p,{class:"p-6",src:a.src,alt:a.alt,width:300,height:332,loading:"lazy"}),e("ul",{class:"flex items-start justify-center gap-6",children:s.map(l=>e("li",{class:"p-6",children:[e("a",{class:"hover:underline",href:l.href,children:e("span",{children:l.label})}),e("ul",{class:"flex flex-col gap-1 mt-4",children:l.children?.map(i=>e("li",{children:e("a",{class:"hover:underline",href:i.href,children:e("span",{class:"text-xs",children:i.label})})}))})]}))})]})]})}var L=$;function T({logo:t,navButtons:r,items:o,searchbar:s,alignment:a}){let l=()=>a==="center"?"0 auto":a==="right"?"0 0 0 auto":"0";return e(d,{children:[e("div",{class:"lg:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-4 pr-2 gap-2",children:[e("a",{href:"/",class:"flex-grow inline-flex items-center w-full",style:{minHeight:f},"aria-label":"Store logo",children:e(p,{class:"w-full sm:max-w-[70%] lg:max-w-[340px]",src:t.srcMobile,alt:t.alt,width:180,height:18,loading:"eager"})}),e("div",{class:"flex gap-4 w-full justify-center",children:[e(c,{variant:"search",icon:r?.searchbar}),e(c,{variant:"cart",icon:r?.shoppingCart}),e(c,{variant:"menu",icon:r?.mobileMenu})]})]}),e("div",{class:"hidden relative lg:flex flex-row justify-between items-center w-full px-[46px]",children:[e("div",{class:"flex w-full items-center",children:[e("a",{href:"/","aria-label":"Store logo",class:"block",children:e(p,{class:"w-full sm:max-w-[70%] lg:max-w-[340px] mr-[30px]",src:t.srcDesktop,alt:t.alt,width:340,loading:"eager"})}),e("div",{class:"flex justify-center",style:{margin:l()},children:o.map(i=>e(L,{item:i}))})]}),e("div",{class:"flex-none w-44 flex items-center justify-end gap-2",children:[e(c,{variant:"search",icon:r?.searchbar}),e(N,{searchbar:s}),e("a",{class:"btn btn-square btn-ghost",href:"/login","aria-label":"Log in",children:e(S,{id:r?.login??"User",width:20,height:20,strokeWidth:.4})}),e(c,{variant:"cart",icon:r?.shoppingCart})]})]})]})}var M=T;function D({logo:t,navButtons:r,alerts:o,searchbar:s,products:a,navAlignment:l,navItems:i=[],suggestions:H,transparent:b,transparencyLevel:u,onScrollTransparencyLevel:v}){let m=w(!1),x={...s,products:a,suggestions:H};return I(()=>{let n=document.querySelector("header");if(!n)return;let g=()=>{globalThis.scrollY>5?window?.matchMedia("(min-width: 1024px)")?.matches?n.style.backgroundColor=`rgba(255,255,255,${(100-(v?.desktop??100))/100})`:n.style.backgroundColor=`rgba(255,255,255,${(100-(v?.mobile??100))/100})`:n.style.backgroundColor=m.value?"white":""};if(m.value){if(n){n.style.backgroundColor="white";return}}else g();return globalThis.addEventListener("scroll",g,{passive:!0}),()=>globalThis.removeEventListener("scroll",g)},[m.value]),e(d,{children:[e("style",{dangerouslySetInnerHTML:{__html:`
            header {
              min-height: ${f};
              background-color: ${b?`rgba(255,255,255,${(100-(u?.mobile??100))/100})`:"white"};
            }
            
            ${b&&`
            @media screen and (min-width: 1024px) {
              header {
                background-color: rgba(255,255,255,${(100-(u?.desktop??100))/100})`}
          `}}),e("header",{class:"fixed w-full z-50",onMouseEnter:()=>m.value=!0,onMouseLeave:()=>m.value=!1,children:[e(P,{alerts:o}),e(M,{alignment:l,navButtons:r,logo:t,items:i,searchbar:x}),e(k,{menu:{items:i},searchbar:x})]})]})}var E=D;export{E as default};
