import{h as l}from"./headers-DqursC6B.js";async function m(e){e.preventDefault();const i=new URLSearchParams(window.location.search).get("id"),t=document.getElementById("edit-form"),a=new FormData(t),o=a.getAll("urls"),c=a.getAll("alts"),r={title:document.getElementById("title").value,description:document.getElementById("description").value,tags:document.getElementById("tags").value.split(",").map(s=>s.trim()),endsAt:document.getElementById("endsAt").value,media:o.map((s,d)=>({url:s,alt:c[d]||""}))};try{const s=await fetch(`https://v2.api.noroff.dev/auction/listings/${i}`,{method:"PUT",headers:l(),body:JSON.stringify(r)});if(s.ok)alert("Post edited successfully"),setTimeout(()=>{window.location.href="/my_listings/"},3e3);else{const d=await s.json();throw new Error(d.message||"Failed to edit post")}}catch(s){const d=document.createElement("div");d.textContent=s.message,d.style.color="red",document.body.appendChild(d)}}async function E(){const n=new URLSearchParams(window.location.search).get("id");if(n)try{const i=await fetch(`https://v2.api.noroff.dev/auction/listings/${n}`,{headers:l()});if(!i.ok){const o=document.createElement("div");throw o.textContent="Failed to fetch listing",o.style.color="red",document.body.appendChild(o),new Error("Failed to fetch listing")}const t=await i.json();document.getElementById("title").value=t.data.title||"",document.getElementById("description").value=t.data.description||"",document.getElementById("tags").value=t.data.tags?t.data.tags.join(", "):"",document.getElementById("endsAt").value=t.data.endsAt?t.data.endsAt.slice(0,16):"";const a=document.getElementById("mediaInputs");t.data.media&&Array.isArray(t.data.media)&&t.data.media.forEach(o=>{const c=document.createElement("input");c.value=o.url,c.setAttribute("name","urls"),a.appendChild(c);const r=document.createElement("input");r.value=o.alt||"",r.setAttribute("name","alts"),a.appendChild(r)})}catch(i){throw new Error("Error fetching listing: "+i.message)}}function g(e){const n=e.target.dataset.id;window.location.href=`/listing/edit/?id=${n}`}function A(){const e=document.getElementById("Add-image-button-edit");e&&e.addEventListener("click",n=>{n.preventDefault();const i=document.getElementById("edit-form"),t=document.createElement("input");t.setAttribute("type","url"),t.setAttribute("name","urls"),t.setAttribute("placeholder","Image URL"),t.setAttribute("class","input"),i.appendChild(t);const a=document.createElement("input");a.setAttribute("type","text"),a.setAttribute("name","alts"),a.setAttribute("placeholder","Image Alt"),a.setAttribute("class","input"),i.insertBefore(t,e),i.insertBefore(a,t)})}function p(){const e=document.getElementById("edit-form");if(e)e.addEventListener("submit",async n=>{n.preventDefault(),m(n)});else throw new Error("Edit form not found")}function I(){const e=document.getElementById("cancel-btn");e&&e.addEventListener("click",n=>{n.preventDefault(),window.location.href="/my_listings/"})}export{p as a,I as b,g as d,A as o,E as p};
