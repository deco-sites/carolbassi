import{a as n}from"./chunk-LX4UZ4HT.js";import"./chunk-LZXS3K3K.js";import{b as s}from"./chunk-SZB65BFH.js";import{g as e}from"./chunk-QSF6UWS7.js";import"./chunk-CRNLDV6W.js";import"./chunk-GGCEL3NW.js";var r=n.create("deco-sites/std/actions/vtex/newsletter/subscribe.ts");function i(){let t=s(!1);return e("div",{class:"flex flex-col sm:flex-row items-center gap-6 sm:gap-20",children:[e("div",{class:"flex flex-col gap-2 max-w-[400px]",children:[e("span",{class:"font-medium text-2xl text-primary-content",children:"Cadastre-se"}),e("span",{class:"text-sm text-primary-content",children:"Fique por dentro das novidades e ganhe 15% de desconto na primeira compra. Para mais informa\xE7\xF5es clique aqui."})]}),e("form",{class:"font-body text-body w-full sm:w-[408px] form-control",onSubmit:async a=>{a.preventDefault();try{t.value=!0;let l=a.currentTarget.elements.namedItem("email")?.value;await r({email:l})}finally{t.value=!1}},children:e("div",{class:"input-group",children:[e("input",{name:"email",class:"flex-grow input input-primary",placeholder:"Seu e-mail"}),e("button",{class:"btn disabled:loading",disabled:t,children:"Cadastrar"})]})})]})}var o=i;export{o as default};
