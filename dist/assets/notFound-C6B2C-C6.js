const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./home-Css8lwHo.js","./read-DY2rRJ_5.js","./headers-DqursC6B.js","./read-BNWd3mxs.js","./place-BSjMR1GP.js","./auth-CSRlmi9r.js","./listing-DYc5deuX.js","./myListings-CY-6AwcK.js","./edit-C3rJwrlT.js","./createListing-twNBFFQy.js","./editListing-CoUcvv5z.js","./myBids-C4aOthFD.js","./profile-Ccr-ri0w.js"])))=>i.map(i=>d[i]);
(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const I="modulepreload",b=function(e,i){return new URL(e,i).href},p={},l=function(i,n,c){let t=Promise.resolve();if(n&&n.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),g=a?.nonce||a?.getAttribute("nonce");t=Promise.allSettled(n.map(r=>{if(r=b(r,c),r in p)return;p[r]=!0;const u=r.endsWith(".css"),N=u?'[rel="stylesheet"]':"";if(!!c)for(let m=o.length-1;m>=0;m--){const L=o[m];if(L.href===r&&(!u||L.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${N}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":I,u||(d.as="script"),d.crossOrigin="",d.href=r,g&&d.setAttribute("nonce",g),document.head.appendChild(d),u)return new Promise((m,L)=>{d.addEventListener("load",m),d.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${r}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return t.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return i().catch(s)})};async function A(e=window.location.pathname){switch(e){case"/":await l(()=>import("./home-Css8lwHo.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url);break;case"/auth/":await l(()=>import("./auth-CSRlmi9r.js"),__vite__mapDeps([5,2,4]),import.meta.url);break;case"/listing/":await l(()=>import("./listing-DYc5deuX.js"),__vite__mapDeps([6,1,2,3,4]),import.meta.url);break;case"/my_listings/":await l(()=>import("./myListings-CY-6AwcK.js"),__vite__mapDeps([7,2,3,4,8]),import.meta.url);break;case"/listing/create/":await l(()=>import("./createListing-twNBFFQy.js"),__vite__mapDeps([9,2,4]),import.meta.url);break;case"/listing/edit/":await l(()=>import("./editListing-CoUcvv5z.js"),__vite__mapDeps([10,8,2]),import.meta.url);break;case"/my_bids/":await l(()=>import("./myBids-C4aOthFD.js"),__vite__mapDeps([11,2,3,4]),import.meta.url);break;case"/profile/":await l(()=>import("./profile-Ccr-ri0w.js"),__vite__mapDeps([12,2]),import.meta.url);break;default:await l(()=>Promise.resolve().then(()=>V),void 0,import.meta.url)}}const _=document.querySelector(".sign-out-btn-li");function T(){_.addEventListener("click",O)}function O(){localStorage.removeItem("accessToken"),window.location.href="/"}function k(){const e=localStorage.getItem("accessToken");e?(_.classList.remove("hidden"),_.classList.add("sidebar-li-layout")):e||(_.classList.remove("sidebar-li-layout"),_.classList.add("hidden"))}const f=document.getElementById("sign-in-link-nav"),S=document.getElementById("reg-link-nav"),E=document.getElementById("my-listings-link-nav"),v=document.getElementById("profile-link-nav"),y=document.getElementById("my-bids-link-nav"),h=document.getElementById("create-listing-link-nav");function w(){const e=localStorage.getItem("accessToken");e?(f.classList.remove("sidebar-li-layout"),f.classList.add("hidden")):e||(f.classList.remove("hidden"),f.classList.add("sidebar-li-layout"))}function C(){localStorage.getItem("accessToken")?S.style.display="none":S.classList.add("sidebar-li-layout")}function P(){localStorage.getItem("accessToken")?E.classList.add("sidebar-li-layout"):(E.classList.remove("sidebar-li-layout"),E.classList.add("hidden"))}function B(){localStorage.getItem("accessToken")?v.classList.add("sidebar-li-layout"):(v.classList.remove("sidebar-li-layout"),v.classList.add("hidden"))}function R(){localStorage.getItem("accessToken")?y.classList.add("sidebar-li-layout"):(y.classList.remove("sidebar-li-layout"),y.classList.add("hidden"))}function K(){localStorage.getItem("accessToken")?h.classList.add("sidebar-li-layout"):(h.classList.remove("sidebar-li-layout"),h.classList.add("hidden"))}function M(){const e=document.getElementById("nav-menu"),i=document.querySelector(".side-bar");document.getElementById("hamburger-btn").addEventListener("click",()=>{e.classList.contains("hidden")?(i.classList.remove("sidebar-height-when-closed"),i.classList.add("sidebar-height-when-open"),e.classList.remove("hidden"),e.classList.add("nav-styles")):(e.classList.add("hidden"),i.classList.remove("sidebar-height-when-open"),i.classList.add("sidebar-height-when-closed"),e.classList.remove("nav-styles"))})}function q(){const e=document.querySelectorAll(".nav-link"),i=document.querySelectorAll(".span-text"),n=document.querySelector(".nav"),c=document.getElementById("nav-menu");e.forEach(t=>{t.addEventListener("mouseover",()=>{i.forEach(s=>{s.classList.remove("hidden"),s.classList.add("span-text-hover"),n.classList.add("nav-hover"),c.classList.add("nav-styles-hover")})}),t.addEventListener("mouseout",()=>{i.forEach(s=>{s.classList.remove("span-text-hover"),s.classList.add("hidden"),n.classList.remove("nav-hover"),c.classList.remove("nav-styles-hover")})})})}await A(window.location.pathname);P();k();T();w();C();B();R();K();const V=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{M as d,q as o};
