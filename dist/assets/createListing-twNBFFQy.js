import{c as i,h as c}from"./headers-DqursC6B.js";import{d as l}from"./place-BSjMR1GP.js";import{d,o as m}from"./notFound-C6B2C-C6.js";function u(s){const t=new FormData(s),r=t.getAll("urls"),a=t.getAll("alts");return{title:t.get("title")||"",description:t.get("description"),tags:t.get("tags")?t.get("tags").split(",").map(n=>n.trim()):[],media:r.map((n,o)=>({url:n,alt:a[o]||""})),endsAt:t.get("endsAt")}}async function p(s){try{const t=u(s),r=await fetch(i,{method:"POST",headers:c(),body:JSON.stringify(t)});if(r.ok){const a=await r.json(),e=document.createElement("div");return e.innerHTML="Listing created successfully!<br> Please wait...",document.body.appendChild(e),e.classList.add("text-green-500","bg-black","absolute","text-3xl","left-1/2","top-1/2","transform","-translate-x-1/2","-translate-y-1/2","z-50"),setTimeout(()=>{window.location.href="/my_listings/"},3e3),a}else return r.json().then(a=>{const e=JSON.stringify(a).slice(22,-44);throw l(e),new Error(`Failed to create listing: ${e}`)})}catch(t){throw new Error(`HTTP error: ${t.message}`)}}function A(){const s=document.getElementById("create-form");s&&s.addEventListener("submit",t=>{t.preventDefault(),p(s)})}function E(){const s=document.getElementById("Add-image-button");s&&s.addEventListener("click",()=>{const t=document.getElementById("create-form"),r=document.getElementById("url-container"),a=document.getElementById("alt-container"),e=document.createElement("input");e.setAttribute("type","url"),e.setAttribute("name","urls"),e.setAttribute("placeholder","Image URL"),e.setAttribute("class","input"),t.appendChild(e);const n=document.createElement("input");n.setAttribute("type","text"),n.setAttribute("name","alts"),n.setAttribute("placeholder","Image Alt"),n.setAttribute("class","input"),r.appendChild(e),a.appendChild(n),e.classList.add("input-styles","mt-2","mb-2"),n.classList.add("input-styles","mt-2","mb-2")})}A();E();d();m();
