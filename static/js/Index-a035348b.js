import{_ as d,r as l,c,w as B,l as F,m as E,q as D,s as g,u as i,v as p,x as f,y as m,z as C,A as _,B as v,o as A,b as U,d as a,t,f as x}from"./index-2faba407.js";const R={setup(){let e=l(0),n=l(0),s=c(()=>e.value*2);const u=()=>{e.value++,n.value++};return B(e,async o=>{console.log("watch",o)},{immediate:!0}),F(()=>{console.log("\u7EC4\u4EF6\u6302\u8F7D\u524D--\u300BonBeforeMount")}),E(()=>{console.log("\u7EC4\u4EF6\u6302\u8F7D\u540E--onMounted")}),D(()=>{console.log("\u7EC4\u4EF6\u8DDF\u65B0\u540E\u4E4B\u524D-onBeforeUpdate")}),g(()=>{console.log("\u7EC4\u4EF6\u8DDF\u65B0\u4E4B\u540E--onUpdated")}),i(()=>{console.log("\u7EC4\u4EF6\u9500\u6BC1\u4E4B\u524D--onBeforeUnmount")}),p(()=>{console.log("\u7EC4\u4EF6\u9500\u6BC1\u4E4B\u540E--onUnmounted")}),f(()=>{}),m(()=>{}),C(()=>{}),_(o=>{console.log("\u72B6\u6001\u8DDF\u8E2A\u94A9\u5B50\u51FD\u6570onRenderTracked------->>>>>>>>"),console.log(o)}),v(o=>{console.log("\u5355\u4E2A\u72B6\u6001\u8DDF\u8E2A\u94A9\u5B50\u51FD\u6570onRenderTriggered-->>>>>>>>"),console.log(o)}),{count:e,count1:n,numResult:s,addCount:u}}},k=x(" \u751F\u547D\u5468\u671F('\u770B\u63A7\u5236\u53F0') ");function T(e,n,s,u,o,M){return A(),U("div",null,[a("span",{class:"add",onClick:n[0]||(n[0]=(...r)=>u.addCount&&u.addCount(...r))},"\u70B9\u51FB\u6211\u6570\u5B57+1"),a("span",null,"\uFF08"+t(u.count)+"\uFF09",1),a("span",null,"\uFF08"+t(u.count1)+"\uFF09",1),a("span",null,t(u.numResult),1),k])}var y=d(R,[["render",T]]);export{y as default};
