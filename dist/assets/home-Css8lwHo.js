import{g as c}from"./read-DY2rRJ_5.js";import{h as a}from"./headers-DqursC6B.js";import{c as l}from"./read-BNWd3mxs.js";import{d as u,o as d}from"./notFound-C6B2C-C6.js";import"./place-BSjMR1GP.js";function h(r){const e=document.querySelector(`.category[data-category="${r}"]`);if(e)e.addEventListener("click",async t=>{t.preventDefault();const o=document.getElementById("all-auction-listings");o&&(o.innerHTML="");try{if(r){const n=await E(r);i(n)}else throw new Error("Category is empty")}catch(n){throw new Error("Error fetching listings:",n)}});else throw new Error(`Element not found for category: ${r}`)}const f=["photography","sculpture","modern","contemporary"];f.forEach(r=>{h(r)});function m(){document.getElementById("search-button").addEventListener("click",async()=>{const e=document.getElementById("search-bar").value,t=await g(e);i(t)})}async function E(r){const e=`https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(r)}&_seller=true&_bids=true&_active=true}`;try{const t=await fetch(e,{method:"GET",headers:a()});if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return(await t.json()).data.filter(s=>s.tags.includes("ArtAuctionApp"))}catch(t){throw new Error("Error fetching listings:",t)}}async function g(r){const e=`https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(r)}&_seller=true&_bids=true&_active=true`;try{const t=await fetch(e,{method:"GET",headers:a()});if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return(await t.json()).data.filter(s=>s.tags.includes("ArtAuctionApp"))}catch(t){throw new Error("Error searching listings:",t)}}function i(r){const e=document.getElementById("all-auction-listings");e.innerHTML="",r&&r.length>0&&r.forEach(t=>{l(t)})}c();m();u();d();
