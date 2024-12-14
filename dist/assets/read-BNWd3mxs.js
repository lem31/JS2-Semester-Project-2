import{p as de}from"./place-BSjMR1GP.js";function Le(e){const d=document.createElement("div"),s=document.createElement("div");s.id="image-container";const t=document.createElement("form"),n=document.createElement("div"),i=document.createElement("h2"),E=document.createElement("input"),u=document.createElement("label"),L=document.createElement("img"),w=document.createElement("div"),m=document.createElement("button"),b=document.createElement("button"),M=document.createElement("div"),v=document.createElement("div"),C=document.createElement("div"),I=document.createElement("div"),B=document.createElement("img");L.src="/images/icons8-coins-64.png",B.src="/images/icons8-coins-64.png",t.style.display="none",E.placeholder="Enter bid amount",b.textContent="Place bid",b.type="submit",m.textContent="X",m.type="button",i.textContent="Place Bid",u.textContent="Your bid",v.appendChild(b),w.appendChild(m),t.appendChild(w),n.appendChild(i),t.appendChild(n),C.appendChild(u),t.appendChild(C),t.appendChild(I),I.appendChild(B),I.appendChild(E),t.appendChild(v),M.appendChild(t),ae(e,s);const x=document.createElement("p"),f=document.createElement("img"),h=document.createElement("div"),O=document.createElement("h2"),S=document.createElement("p"),P=document.createElement("p"),y=document.createElement("p"),_=document.createElement("div"),r=document.createElement("button"),T=document.createElement("button"),l=document.createElement("div"),a=document.createElement("div"),N=document.createElement("p"),Y=document.createElement("p"),q=document.createElement("img"),W=document.createElement("p"),R=document.createElement("button"),X=document.createElement("div"),z=document.createElement("div"),j=document.createElement("div"),K=document.getElementById("all-auction-listings"),g=document.createElement("button"),p=document.createElement("button"),c=document.createElement("img"),D=document.createElement("img"),U=document.createElement("div");c.src="/images/icons8-left-100.png",D.src="/images/icons8-right-100.png";const G=document.createElement("div");R.dataset.id=e.id,r.addEventListener("click",()=>{if(!V()){alert("You need to be logged in to place a bid.");return}t.style.display==="none"?t.style.display="block":t.style.display="none"}),t.addEventListener("submit",A=>{A.preventDefault();const o=t.querySelector(".place-bid-input").value;de(e.id,o,A)}),R.textContent="View Listing",x.textContent=`Seller: ${e.seller.name}`,f.src=e.seller&&e.seller.avatar?e.seller.avatar.url:"",r.textContent="Place Bid",r.dataset.id=e.id,V()&&e._count&&e._count.bids!==void 0&&(N.textContent=`No. of bids: ${e._count.bids}`),Y.textContent=e.bids&&e.bids.length>0?`Bidder: ${e.bids[0].bidder.name}`:"No bidders",q.src=e.bids&&e.bids.length>0?e.bids[0].bidder.avatar.url:"",W.textContent=e.bids&&e.bids.length>0?`Bid amount: ${e.bids[0].amount}`:"No bids",T.textContent="View Bids",O.textContent=e.title||"No title available",S.textContent=e.description||"No description available";const F=new Date(e.endsAt),H={weekday:"long",year:"numeric",month:"long",day:"numeric"},$=F.toLocaleDateString("en-US",H),le=F.toLocaleTimeString("en-US",{hour:"numeric",minute:"numeric",hour12:!0});y.textContent=`Ends At: ${le} on ${$}`||"No end date available",p.appendChild(D),g.appendChild(c),new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(e.title)||l.appendChild(O),l.appendChild(U),V()&&U.appendChild(L),U.appendChild(N),l.appendChild(S),l.appendChild(P),l.appendChild(y),l.appendChild(h),l.appendChild(X),_.appendChild(r),X.appendChild(R),_.appendChild(T),l.appendChild(_),j.appendChild(s),z.appendChild(j),h.appendChild(f),h.appendChild(x),l.appendChild(a),s.appendChild(g),s.appendChild(p),d.appendChild(z),d.appendChild(s),d.appendChild(l),d.appendChild(t),G.appendChild(d),e.bids&&e.bids.length>0&&e.bids.forEach(A=>{const o=document.createElement("div"),k=document.createElement("div"),Q=document.createElement("div"),Z=document.createElement("p"),ee=document.createElement("img"),te=document.createElement("p");Z.textContent=`Bidder: ${A.bidder.name}`,ee.src=A.bidder.avatar.url||"",te.textContent=`Bid amount: ${A.amount}`;const J=document.createElement("img");J.src="/images/icons8-coins-64.png",J.alt="Coin icon",J.classList.add("coin-icon"),k.appendChild(ee),k.appendChild(Z),o.appendChild(k),Q.appendChild(J),Q.appendChild(te),o.appendChild(Q),a.appendChild(o),Z.classList.add("labels"),k.classList.add("flex-row-center"),te.classList.add("labels"),ee.classList.add("seller-avatar-img"),J.classList.add("w-[30px]","h-[30px]","md:w-[50px]","md:h-[50px]"),Q.classList.add("flex-row-center")}),K.appendChild(G),R.addEventListener("click",A=>{const o=A.target.closest(".view-listing-btn");o&&pe(o.dataset.id)}),T.addEventListener("click",()=>{if(!V()){alert("You need to be logged in to view bids.");return}const A=document.querySelector(".view-bids-box");if(A&&A!==a){const o=document.createElement("p");o.textContent="Please close the current bids before opening another.",o.classList.add("error-message","no-bids-message","absolute","left-1/2","top-1/2","transform","-translate-x-1/2","-translate-y-1/2","bg-white","text-red-500","z-50","text-xl"),d.appendChild(o);const k=event.target.getBoundingClientRect();o.style.top=`${k.top+window.scrollY}px`,o.style.left=`${k.left+window.scrollX}px`,setTimeout(()=>{o.remove()},3e3);return}if(e.bids&&e.bids.length>0)a.classList.contains("hidden")||!a.classList.contains("view-bids-box")?(a.classList.remove("hidden"),a.classList.add("view-bids-box")):(a.classList.add("hidden"),a.classList.remove("view-bids-box"));else{const o=document.createElement("p");o.textContent="No bids available.",o.classList.add("no-bids-message","bg-white","text-red-500","absolute","text-xl","z-50"),d.appendChild(o),setTimeout(()=>{o.remove()},3e3)}}),ce(x,O,N,y,P,r,G,d,s,j,t,E,b,m,g,p,l,T,f,R,a,h,U,K,L,i,u,M,n,v,C,I,_,c,D,B),m.addEventListener("click",A=>se(A,t)),re(s,g,p),ie(d,g,p,s.querySelectorAll(".carouselItem")),ne(d)}function ce(e,d,s,t,n,i,E,u,L,w,m,b,M,v,C,I,B,x,f,h,O,S,P,y,_,r,T,l,a,N,Y,q,W,R,X,z){e.classList.add("labels"),d.classList.add("h2-styles"),s.classList.add("labels"),t.classList.add("labels","max-w-[150px]","mb-2"),n.classList.add("h2-styles"),i.classList.add("display-place-bid-form-btn"),E.classList.add("inner-container-styles"),L.classList.add("image-container","imageContainer"),w.classList.add("carouselInner","carousel-inner"),u.classList.add("listing-container-styles","listing-box"),m.classList.add("place-bid-form","form-styles","w-[280px]","h-[218px]","absolute"),v.classList.add("close-btn","button-styles","pl-2","pr-2","p-t-1","p-b-1"),r.classList.add("h2-styles","form-title-styles"),C.classList.add("carousel-control-left"),I.classList.add("carousel-control-right"),B.classList.add("flex-col-center-layout"),x.classList.add("view-bids-btn","button-styles","pl-3","pr-3","pt-1","pb-1"),f.classList.add("seller-avatar-img"),i.classList.add("display-place-bid-form-btn","button-styles","pl-3","pr-3","pt-1","pb-1"),h.classList.add("button-styles","view-listing-btn","pl-3","pr-3","pt-1","pb-1","mb-2"),O.classList.add("hidden"),S.classList.add("flex-row-center"),P.classList.add("flex-row-center"),y.classList.add("outer-container"),_.classList.add("w-[30px]","h-[30px]","md:w-[50px]","md:h-[50px]"),z.classList.add("w-[30px]","h-[30px]","md:w-[50px]","md:h-[50px]"),T.classList.add("gold-labels","ml-8"),M.classList.add("place-bid-submit","button-styles","mt-4","pl-3","pr-3","pt-1","pb-1"),l.classList.add("relative"),a.classList.add("flex-row-center","mb-4","text-center","mt-[-18px]"),N.classList.add("flex-row-center"),Y.classList.add("flex","flex-col"),b.classList.add("place-bid-input","input-styles"),q.classList.add("flex-row-center"),W.classList.add("flex-row-center","gap-4","mt-3","mb-3"),oe(R,X)}function oe(e,d){const s=n=>{n.style.boxShadow="0 14px 18px rgba(0, 0, 0, 0.5)",n.style.backgroundColor="white"},t=n=>{n.style.boxShadow="none",n.style.backgroundColor="transparent"};e.addEventListener("mouseover",()=>s(e)),e.addEventListener("mouseout",()=>t(e)),d&&(d.addEventListener("mouseover",()=>s(d)),d.addEventListener("mouseout",()=>t(d)))}function ie(e,d,s,t){t.length>1?(e.addEventListener("mouseover",()=>{d.style.display="block",s.style.display="block"}),e.addEventListener("mouseout",()=>{d.style.display="none",s.style.display="none"})):(d.style.display="none",s.style.display="none")}function ne(e){e.addEventListener("mouseover",()=>{e.classList.add("z-12"),e.classList.add("bg-black")}),e.addEventListener("mouseout",()=>{e.classList.remove("z-12"),e.classList.remove("bg-black")})}function V(){return localStorage.getItem("accessToken")!==null}function se(e,d){e.preventDefault(),d.style.display="none"}function re(e,d,s){let t=0;const n=e.querySelectorAll(".carouselItem");function i(E){n.forEach((u,L)=>{u.style.display=L===E?"block":"none"})}d.addEventListener("click",()=>{t=(t-1+n.length)%n.length,i(t)}),s.addEventListener("click",()=>{t=(t+1)%n.length,i(t)}),i(t)}function ae(e,d){const s=e.media||[];if(s.length===0){const t=document.createElement("img");t.src="../../../../images/no-photos.jpg",t.alt="No image available",t.classList.add("listing-image"),t.classList.add("carouselItem"),d.appendChild(t);return}s.forEach(t=>{if(t.url){const n=document.createElement("img");n.src=t.url||"../../../../images/no-photos.jpg",n.alt=t.alt||"No image available",n.classList.add("listing-image"),n.classList.add("carouselItem"),n.onerror=()=>{n.src="../../../../images/no-photos.jpg",n.alt="Image not available",n.style.display="none"},d.appendChild(n)}})}function be(e){const d=document.createElement("div");d.classList.add("listing-box");const s=document.createElement("div"),t=document.createElement("div"),n=document.createElement("form"),i=document.createElement("div"),E=document.createElement("h2"),u=document.createElement("input"),L=document.createElement("label"),w=document.createElement("div"),m=document.createElement("button"),b=document.createElement("button"),M=document.createElement("div"),v=document.createElement("div"),C=document.createElement("div"),I=document.createElement("div"),B=document.createElement("img");B.src="/images/icons8-coins-64.png",n.style.display="none",u.placeholder="Enter bid amount",b.textContent="Place bid",b.type="submit",m.textContent="X",m.type="button",E.textContent="Place Bid",L.textContent="Your bid",v.appendChild(b),w.appendChild(m),n.appendChild(w),i.appendChild(E),n.appendChild(i),C.appendChild(L),C.appendChild(I),I.appendChild(B),I.appendChild(u),n.appendChild(C),n.appendChild(v),M.appendChild(n);const x=document.createElement("p"),f=document.createElement("img"),h=document.createElement("div"),O=document.createElement("h2"),S=document.createElement("p"),P=document.createElement("p"),y=document.createElement("p"),_=document.createElement("div"),r=document.createElement("button"),T=document.createElement("button"),l=document.createElement("div"),a=document.createElement("div"),N=document.createElement("p"),Y=document.createElement("p"),q=document.createElement("img"),W=document.createElement("p");r.addEventListener("click",()=>{if(!V()){alert("You need to be logged in to place a bid.");return}n.style.display==="none"?n.style.display="block":n.style.display="none"}),n.addEventListener("submit",p=>{p.preventDefault();const c=n.querySelector(".place-bid-input").value;de(e.id,c,p)}),x.textContent=`Seller: ${e.seller.name}`,f.src=e.seller&&e.seller.avatar?e.seller.avatar.url:"",r.textContent="Place Bid",r.dataset.id=e.id,V()&&e._count&&e._count.bids!==void 0&&(N.textContent=`No. of bids: ${e._count.bids}`),Y.textContent=e.bids&&e.bids.length>0?`Bidder: ${e.bids[0].bidder.name}`:"No bidders",q.src=e.bids&&e.bids.length>0?e.bids[0].bidder.avatar.url:"",W.textContent=e.bids&&e.bids.length>0?`Bid amount: ${e.bids[0].amount}`:"No bids",T.textContent="View Bids",O.textContent=e.title||"No title available",S.textContent=e.description||"No description available";const R=new Date(e.endsAt),X={weekday:"long",year:"numeric",month:"long",day:"numeric"},z=R.toLocaleDateString("en-US",X),j=R.toLocaleTimeString("en-US",{hour:"numeric",minute:"numeric",hour12:!0});y.textContent=`Ends At: ${j} on ${z}`||"No end date available",l.appendChild(O),l.appendChild(S),l.appendChild(P),l.appendChild(y),l.appendChild(N),l.appendChild(h),h.appendChild(f),h.appendChild(x),d.appendChild(l),ae(e,s),d.appendChild(s),d.appendChild(_),_.appendChild(r),_.appendChild(T),d.appendChild(a),d.appendChild(n),a.classList.add("hidden"),e.bids&&e.bids.length>0&&e.bids.forEach(p=>{const c=document.createElement("div"),D=document.createElement("div"),U=document.createElement("div"),G=document.createElement("p"),F=document.createElement("img"),H=document.createElement("p");G.textContent=`Bidder: ${p.bidder.name}`,F.src=p.bidder.avatar.url||"",H.textContent=`Bid amount: ${p.amount}`;const $=document.createElement("img");$.src="/images/icons8-coins-64.png",$.alt="Coin icon",$.classList.add("coin-icon"),a.appendChild(c),D.appendChild(F),D.appendChild(G),c.appendChild(D),U.appendChild($),U.appendChild(H),c.appendChild(U),a.appendChild(c),G.classList.add("labels"),D.classList.add("flex-row-center"),H.classList.add("labels"),F.classList.add("seller-avatar-img"),$.classList.add("w-[30px]","h-[30px]","md:w-[50px]","md:h-[50px]"),U.classList.add("flex-row-center")});const K=s.querySelectorAll("img"),g=document.getElementById("all-auction-listings");if(g)g.appendChild(d);else throw new Error("Error: 'listing-container' element not found.");T.addEventListener("click",()=>{if(!V()){alert("You need to be logged in to view bids.");return}const p=document.querySelector(".view-bids-box");if(p&&p!==a){const c=document.createElement("p");c.textContent="Please close the current bids before opening another.",c.classList.add("error-message","no-bids-message","absolute","left-1/2","top-1/2","transform","-translate-x-1/2","-translate-y-1/2","bg-white","text-red-500","z-50","text-xl"),d.appendChild(c);const D=event.target.getBoundingClientRect();c.style.top=`${D.top+window.scrollY}px`,c.style.left=`${D.left+window.scrollX}px`,setTimeout(()=>{c.remove()},3e3);return}if(e.bids&&e.bids.length>0)a.classList.contains("hidden")||!a.classList.contains("view-bids-box")?(a.classList.remove("hidden"),a.classList.add("view-bids-box")):(a.classList.add("hidden"),a.classList.remove("view-bids-box"));else{const c=document.createElement("p");c.textContent="No bids available.",c.classList.add("no-bids-message","bg-white","text-red-500","absolute","text-xl","z-50"),d.appendChild(c),setTimeout(()=>{c.remove()},3e3)}}),g.appendChild(t),ne(s),me(l,O,S,P,y,f,x,h,s,d,K,r,T,_,n,u,b,m,E,i,I,v,B,a,C,L,M,N,g)}function pe(e){window.location.href=`/listing/?id=${e}`}function me(e,d,s,t,n,i,E,u,L,w,m,b,M,v,C,I,B,x,f,h,O,S,P,y,_,r,T,l,a){C.classList.add("place-bid-form","form-styles","w-[280px]","h-[218px]","absolute"),T.classList.add("relative"),I.classList.add("place-bid-input","input-styles"),B.classList.add("place-bid-submit","button-styles","mt-4","pl-3","pr-3","pt-1","pb-1"),x.classList.add("close-btn","button-styles","pl-2","pr-2","p-t-1","p-b-1"),f.classList.add("h2-styles","form-title-styles"),h.classList.add("flex-row-center","mb-4","text-center","mt-[-18px]"),P.classList.add("w-[30px]","h-[30px]","md:w-[50px]","md:h-[50px]"),S.classList.add("flex-row-center"),r.classList.add("gold-labels","ml-8"),O.classList.add("flex-row-center"),_.classList.add("flex","flex-col"),y.classList.add("hidden"),e.classList.add("flex-col-center-layout"),d.classList.add("h2-styles"),s.classList.add("body-text-styles"),t.classList.add("h2-styles"),n.classList.add("labels","max-w-[200px]","md:max-w-[400px]"),l.classList.add("labels"),i.classList.add("seller-avatar-img"),E.classList.add("labels"),u.classList.add("flex-row-center"),L.classList.add("image-container-individual-listing"),w.classList.add("listing-container-individual-listing"),m.forEach(N=>{N.classList.add("listing-images-individual-listing")}),b.classList.add("button-styles","pl-3","pr-3","pt-1","pb-1"),M.classList.add("button-styles","pl-3","pr-3","pt-1","pb-1"),v.classList.add("flex-row-center","gap-4","mt-3","mb-3"),x.addEventListener("click",N=>se(N,C)),a.classList.add("outer-container")}export{be as a,ne as b,Le as c,se as d,oe as e,ae as f,V as i,ie as s,re as t};
