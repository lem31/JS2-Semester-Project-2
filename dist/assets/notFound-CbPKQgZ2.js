const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/home-B2uFn65P.js","assets/read-DY2rRJ_5.js","assets/headers-DqursC6B.js","assets/read-BNWd3mxs.js","assets/place-BSjMR1GP.js","assets/auth-DJ7uQYfl.js","assets/listing-Z7qCWBhf.js","assets/myListings-Cng4zNQ0.js","assets/edit-C3rJwrlT.js","assets/createListing-uIYC7mxE.js","assets/editListing-CoUcvv5z.js","assets/myBids-C4aOthFD.js","assets/profile-DcKObrau.js"])))=>i.map(i=>d[i]);
(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const p="modulepreload",I=function(e){return"/JS2-Semester-Project-2/"+e},y={},r=function(o,n,d){let t=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),a=i?.nonce||i?.getAttribute("nonce");t=Promise.allSettled(n.map(c=>{if(c=I(c),c in y)return;y[c]=!0;const m=c.endsWith(".css"),g=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${g}`))return;const l=document.createElement("link");if(l.rel=m?"stylesheet":p,m||(l.as="script"),l.crossOrigin="",l.href=c,a&&l.setAttribute("nonce",a),document.head.appendChild(l),m)return new Promise((S,N)=>{l.addEventListener("load",S),l.addEventListener("error",()=>N(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(i){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i}return t.then(i=>{for(const a of i||[])a.status==="rejected"&&s(a.reason);return o().catch(s)})};async function b(e=window.location.pathname){switch(e){case"/":await r(()=>import("./home-B2uFn65P.js"),__vite__mapDeps([0,1,2,3,4]));break;case"/auth/":await r(()=>import("./auth-DJ7uQYfl.js"),__vite__mapDeps([5,2,4]));break;case"/listing/":await r(()=>import("./listing-Z7qCWBhf.js"),__vite__mapDeps([6,1,2,3,4]));break;case"/my_listings/":await r(()=>import("./myListings-Cng4zNQ0.js"),__vite__mapDeps([7,2,3,4,8]));break;case"/listing/create/":await r(()=>import("./createListing-uIYC7mxE.js"),__vite__mapDeps([9,2,4]));break;case"/listing/edit/":await r(()=>import("./editListing-CoUcvv5z.js"),__vite__mapDeps([10,8,2]));break;case"/my_bids/":await r(()=>import("./myBids-C4aOthFD.js"),__vite__mapDeps([11,2,3,4]));break;case"/profile/":await r(()=>import("./profile-DcKObrau.js"),__vite__mapDeps([12,2]));break;default:await r(()=>Promise.resolve().then(()=>R),void 0)}}const u=document.querySelector(".sign-out-btn-li");function A(){u.addEventListener("click",T)}function T(){localStorage.removeItem("accessToken"),window.location.href="/"}function O(){const e=localStorage.getItem("accessToken");e?(u.classList.remove("hidden"),u.classList.add("sidebar-li-layout")):e||(u.classList.remove("sidebar-li-layout"),u.classList.add("hidden"))}const _=document.getElementById("sign-in-link-nav"),h=document.getElementById("reg-link-nav"),L=document.getElementById("my-listings-link-nav"),E=document.getElementById("profile-link-nav"),f=document.getElementById("my-bids-link-nav"),v=document.getElementById("create-listing-link-nav");function k(){const e=localStorage.getItem("accessToken");e?(_.classList.remove("sidebar-li-layout"),_.classList.add("hidden")):e||(_.classList.remove("hidden"),_.classList.add("sidebar-li-layout"))}function C(){localStorage.getItem("accessToken")?h.style.display="none":h.classList.add("sidebar-li-layout")}function w(){localStorage.getItem("accessToken")?L.classList.add("sidebar-li-layout"):(L.classList.remove("sidebar-li-layout"),L.classList.add("hidden"))}function P(){localStorage.getItem("accessToken")?E.classList.add("sidebar-li-layout"):(E.classList.remove("sidebar-li-layout"),E.classList.add("hidden"))}function B(){localStorage.getItem("accessToken")?f.classList.add("sidebar-li-layout"):(f.classList.remove("sidebar-li-layout"),f.classList.add("hidden"))}function K(){localStorage.getItem("accessToken")?v.classList.add("sidebar-li-layout"):(v.classList.remove("sidebar-li-layout"),v.classList.add("hidden"))}function V(){const e=document.getElementById("nav-menu"),o=document.querySelector(".side-bar");document.getElementById("hamburger-btn").addEventListener("click",()=>{e.classList.contains("hidden")?(o.classList.remove("sidebar-height-when-closed"),o.classList.add("sidebar-height-when-open"),e.classList.remove("hidden"),e.classList.add("nav-styles")):(e.classList.add("hidden"),o.classList.remove("sidebar-height-when-open"),o.classList.add("sidebar-height-when-closed"),e.classList.remove("nav-styles"))})}function D(){const e=document.querySelectorAll(".nav-link"),o=document.querySelectorAll(".span-text"),n=document.querySelector(".nav"),d=document.getElementById("nav-menu");e.forEach(t=>{t.addEventListener("mouseover",()=>{o.forEach(s=>{s.classList.remove("hidden"),s.classList.add("span-text-hover"),n.classList.add("nav-hover"),d.classList.add("nav-styles-hover")})}),t.addEventListener("mouseout",()=>{o.forEach(s=>{s.classList.remove("span-text-hover"),s.classList.add("hidden"),n.classList.remove("nav-hover"),d.classList.remove("nav-styles-hover")})})})}await b(window.location.pathname);w();O();A();k();C();P();B();K();const R=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{V as d,D as o};
