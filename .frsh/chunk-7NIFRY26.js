import{a as d}from"./chunk-Y6O4XDOQ.js";import{a as u}from"./chunk-RIS4BGSQ.js";import{a as r}from"./chunk-RGUTNEWM.js";import{a as o}from"./chunk-CWWC2ZZK.js";import{a as i}from"./chunk-6TYW3VO2.js";import{g as t}from"./chunk-QSF6UWS7.js";function b({icon:a}){let{displaySearchbar:e}=i();return t(o,{class:"btn-square btn-ghost w-auto","aria-label":"search icon button",onClick:()=>{e.value=!e.peek()},children:t(r,{id:a??"MagnifyingGlass",width:20,height:19,strokeWidth:.1})})}function g({icon:a}){let{displayMenu:e}=i();return t(o,{class:"btn-square btn-ghost w-auto","aria-label":"open menu",onClick:()=>{e.value=!0},children:t(r,{id:a??"Bars3",width:23,height:28,strokeWidth:.01})})}function y({icon:a}){let{displayCart:e}=i(),{loading:v,cart:n,mapItemsToAnalyticsItems:m}=u(),s=n.value?.items.length||null,f=n.value?.storePreferencesData.currencyCode,c=n.value?.totalizers.find(l=>l.id==="Items"),h=n.value?.totalizers.find(l=>l.id==="Discounts"),p=()=>{e.value=!0,d({name:"view_cart",params:{currency:n.value?f:"",value:c?.value?(c?.value-(h?.value??0))/100:0,items:n.value?m(n.value):[]}})};return t(o,{class:"btn-square btn-ghost relative w-auto","aria-label":"open cart","data-deco":e.value&&"open-cart",loading:v.value,onClick:p,children:t("div",{class:"indicator",children:[s&&t("span",{class:"indicator-item badge badge-secondary badge-sm",children:s>9?"9+":s}),t(r,{id:a??"ShoppingCart",width:20,height:22,strokeWidth:2})]})})}function I({variant:a,icon:e}){return a==="cart"?t(y,{icon:e}):a==="search"?t(b,{icon:e}):a==="menu"?t(g,{icon:e}):null}var C=I;export{C as a};
