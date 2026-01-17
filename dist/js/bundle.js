function ne(){try{const e=(location.pathname||"/").replace(/\/+$/,"").split("/").filter(Boolean);if(e.length===0)return"index.html";const o=e[0];if(o==="blog")return"blog.html";if(o==="project")return"project.html";if(o==="connect")return"connect.html";if(o==="showcase")return"showcase.html";if(o==="carte")return"carte.html";const l=e[e.length-1];return l&&l.includes(".")?l:"index.html"}catch{return"index.html"}}function se(t){if(!t)return 1;const e=t.trim().split(/\s+/).length;return Math.ceil(e/200)}function ie(t){if(!t)return"";try{const e=new Date(t);return isNaN(e)?"":e.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}catch{return""}}function ae(){const t=document.getElementById("project-modal"),e=document.getElementById("modal-close"),o=document.getElementById("modal-backdrop");if(!t)return;const l=n=>{n.preventDefault();const r=n.currentTarget;if(r.dataset.title){const b=document.getElementById("modal-title");b&&(b.textContent=r.dataset.title)}[{idBase:"modal-iframe-main",idVideo:"modal-video-main",idImg:"modal-img-main",src:r.getAttribute("data-video-main")},{idBase:"modal-iframe-1",idVideo:"modal-video-1",idImg:"modal-img-1",src:r.getAttribute("data-video-1")},{idBase:"modal-iframe-2",idVideo:"modal-video-2",idImg:"modal-img-2",src:r.getAttribute("data-video-2")},{idBase:"modal-iframe-3",idVideo:"modal-video-3",idImg:"modal-img-3",src:r.getAttribute("data-video-3")},{idBase:"modal-iframe-4",idVideo:"modal-video-4",idImg:"modal-img-4",src:r.getAttribute("data-video-4")}].forEach(b=>{const x=document.getElementById(b.idVideo),L=document.getElementById(b.idImg),j=b.src||"";if(x&&(x.classList.add("hidden"),x.pause(),x.removeAttribute("src"),x.load()),L&&(L.classList.add("hidden"),L.src=""),j){const W=decodeURIComponent(j);if(/\.(png|jpg|jpeg|webp|gif|svg)$/i.test(W))L&&(L.src=j,L.classList.remove("hidden"));else if(x){x.classList.remove("hidden");const B=j.replace(/\.webm$/i,"_poster.jpg");x.poster=B,x.src=j,x.load();const M=x.play();M!==void 0&&M.catch(P=>{})}}});const c=document.getElementById("modal-website-btn"),p=document.getElementById("modal-website-label"),v=r.getAttribute("data-link"),C=r.getAttribute("data-link-label")||"Visit Website";c&&(v?(c.href=v,c.classList.remove("hidden"),p&&(p.textContent=C)):c.classList.add("hidden")),t.classList.remove("hidden"),document.body.style.overflow="hidden"},i=()=>{t.classList.add("hidden"),document.body.style.overflow="",t.querySelectorAll("video").forEach(r=>{r.pause(),r.removeAttribute("src"),r.load()})};document.querySelectorAll('a.group[href^="/showcase"], a.group[href^="/project"], a[data-trigger="modal"]').forEach(n=>n.addEventListener("click",l)),e&&e.addEventListener("click",i),o&&o.addEventListener("click",i),document.addEventListener("keydown",n=>{n.key==="Escape"&&!t.classList.contains("hidden")&&i()})}function le(){const t=document.getElementById("sidebar-root");if(!t)return;const e=ne(),o=e==="connect.html",l=e==="blog.html"||e==="article.html"||location.pathname.startsWith("/blog/")||location.pathname.includes("article.html"),i=!o&&!l&&e==="index.html",s=location.pathname.includes("/blog/"),n=E=>s?"../index.html":E,r="block w-fit px-6 py-2 text-lg font-medium transition-colors rounded-full",m="bg-black text-white dark:bg-white dark:text-black",c="text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white",p=`${r} ${i?m:c}`,v=`${r} ${o?m:c}`,C=`${r} ${l?m:c}`,b="block w-full text-center py-4 rounded-full text-2xl font-medium transition-colors",x="bg-black text-white dark:bg-white dark:text-black",L="text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900",j=`${b} ${i?x:L}`,W=`${b} ${o?x:L}`,F=`${b} ${l?x:L}`,B=(E=!1)=>{const O=E?"px-6 py-16 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 space-y-10":"mt-12 space-y-8",A=E?"h-8":"h-6",_=E?"p-2 -m-2 opacity-60 hover:opacity-100 transition-opacity dark:invert":"opacity-40 hover:opacity-100 transition-opacity dark:invert",G=E?"text-base font-medium text-zinc-500 dark:text-zinc-400 mb-4":"text-sm text-zinc-500 dark:text-zinc-400 mb-3",K=E?"text-sm":"text-xs",a=E?"w-4 h-4":"w-3 h-3",u=g=>s?`../${g}`:g;return`
    <div class="${O}">
        <div class="flex gap-8 ${K} font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
          <a href="https://medium.com/@wirawibisana" target="_blank" rel="noopener" class="hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors py-2">Medium <img src="${u("assets/Sidebar Icons/Arrow Up Icon.svg")}" class="${a} dark:invert"></a>
          <a href="https://drive.google.com/uc?export=download&id=1yYLOBPcRKCmqCmS25Kql7Hf--xY9Ep_L" class="hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors py-2">Resume <img src="${u("assets/Sidebar Icons/Arrow Up Icon.svg")}" class="${a} dark:invert"></a>
        </div>

        <hr class="border-zinc-200 dark:border-zinc-800">

        <div>
          <p class="${G}">I post videos about design</p>
          <div class="flex gap-6">
            <a href="https://www.instagram.com/wira.wibisana/reels/" target="_blank" rel="noopener" class="${_}"><img src="${u("assets/Sidebar Icons/Instagram SVG Icon.svg")}" class="${A} w-auto"></a>
            <a href="https://www.youtube.com/@wiraa.wibisana7777" target="_blank" rel="noopener" class="${_}"><img src="${u("assets/Sidebar Icons/YouTube SVG Icons (1).svg")}" class="${A} w-auto"></a>
            <a href="https://www.tiktok.com/@wira.wibisana" target="_blank" rel="noopener" class="${_}"><img src="${u("assets/Sidebar Icons/Tiktok SVG Icons (1).svg")}" class="${A} w-auto"></a>
          </div>
        </div>

        <div>
          <p class="${G}">Contact me here!</p>
          <div class="flex gap-6">
            <a href="https://linkedin.com/in/wira29" target="_blank" rel="noopener" class="${_}"><img src="${u("assets/Sidebar Icons/LinkedIn SVG Icon.svg")}" class="${A} w-auto"></a>
            <a href="mailto:atmanawiera@gmail.com" class="${_}"><img src="${u("assets/Sidebar Icons/Mail SVG Icon (1).svg")}" class="${A} w-auto"></a>
          </div>
        </div>

        <hr class="border-zinc-200 dark:border-zinc-800">

        <button id="${E?"theme-toggle-mobile":"theme-toggle"}" class="opacity-40 hover:opacity-100 transition-opacity p-2 -m-2">
          <img src="${u("assets/Sidebar Icons/Moon Stars Icon.svg")}" class="${A} w-6 dark:hidden">
          <img src="${u("assets/Sidebar Icons/Sun SVG Icon.svg")}" class="${A} w-6 hidden dark:block invert">
        </button>
      </div>
  `};t.innerHTML=`
    <!-- Desktop Sidebar (Hidden on Mobile) -->
    <aside class="hidden lg:flex fixed top-0 left-0 w-[348px] h-screen bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex-col p-12 overflow-y-auto z-50 transition-colors duration-300">
      <!-- Header -->
      <a href="/" class="mb-12 block group">
        <h1 class="text-3xl font-semibold text-black dark:text-white tracking-tight mb-2 group-hover:opacity-70 transition-opacity">Wira Wibisana</h1>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 group-hover:opacity-70 transition-opacity">Product Designer</p>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 group-hover:opacity-70 transition-opacity">Based in Bali</p>
      </a>

      <hr class="border-zinc-200 dark:border-zinc-800 mb-12">

      <!-- Nav -->
      <nav class="space-y-4 flex-1">
        <a href="/" class="${p}">Projects</a>
        <a href="/connect.html" class="${v}">Why Hire Me?</a>
        <a href="/blog/" class="${C}">Blog & Case Studies</a>
      </nav>

      <!-- Bottom Details (Desktop) -->
      ${B(!1)}
    </aside>

    <!-- Mobile Top Bar (Hidden on Desktop) -->
    <header class="lg:hidden fixed top-0 left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 z-[60] px-6 py-4 flex justify-between items-center transition-colors">
      <a href="${n("index.html")}" class="font-semibold text-lg text-black dark:text-white">Wira Wibisana</a>
      <button id="mobile-menu-btn" class="p-2 -mr-2 text-black dark:text-white focus:outline-none">
        <!-- Menu Icon -->
        <svg id="icon-menu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        <!-- Close Icon (Hidden) -->
        <svg id="icon-close" class="hidden w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </header>

    <!-- Mobile Menu Dropdown (Hugs content) -->
     <div id="mobile-menu-overlay" class="lg:hidden fixed top-[69px] left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 z-[55] hidden flex-col p-6 space-y-4 transition-all shadow-xl">
       <nav class="space-y-2 flex flex-col w-full">
        <a href="/" class="${j}">Projects</a>
        <a href="/connect.html" class="${W}">Why Hire Me?</a>
        <a href="/blog/" class="${F}">Blog & Case Studies</a>
      </nav>
    </div>
  `;const M=document.getElementById("mobile-footer-root");M&&(M.innerHTML=B(!0));const P=()=>{document.documentElement.classList.toggle("dark");try{localStorage.setItem("theme",document.documentElement.classList.contains("dark")?"dark":"light")}catch{}},R=document.getElementById("theme-toggle");R&&R.addEventListener("click",P);const V=document.getElementById("theme-toggle-mobile");V&&V.addEventListener("click",P),localStorage.theme==="dark"||!("theme"in localStorage)&&window.matchMedia("(prefers-color-scheme: dark)").matches?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark");const H=document.getElementById("mobile-menu-btn"),q=document.getElementById("mobile-menu-overlay"),N=document.getElementById("icon-menu"),U=document.getElementById("icon-close");H&&q&&H.addEventListener("click",()=>{!q.classList.contains("hidden")?(q.classList.add("hidden"),N.classList.remove("hidden"),U.classList.add("hidden")):(q.classList.remove("hidden"),N.classList.add("hidden"),U.classList.remove("hidden"))}),ae()}const ce="modulepreload",de=function(t){return"/"+t},X={},ue=function(e,o,l){let i=Promise.resolve();if(o&&o.length>0){let c=function(p){return Promise.all(p.map(v=>Promise.resolve(v).then(C=>({status:"fulfilled",value:C}),C=>({status:"rejected",reason:C}))))};var n=c;document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),m=r?.nonce||r?.getAttribute("nonce");i=c(o.map(p=>{if(p=de(p),p in X)return;X[p]=!0;const v=p.endsWith(".css"),C=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${C}`))return;const b=document.createElement("link");if(b.rel=v?"stylesheet":ce,v||(b.as="script"),b.crossOrigin="",b.href=p,m&&b.setAttribute("nonce",m),document.head.appendChild(b),v)return new Promise((x,L)=>{b.addEventListener("load",x),b.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${p}`)))})}))}function s(r){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=r,window.dispatchEvent(m),!m.defaultPrevented)throw r}return i.then(r=>{for(const m of r||[])m.status==="rejected"&&s(m.reason);return e().catch(s)})},me="90c23362a6384ffabd3fd5a5978de250";async function ge(t){const e=await fetch(t);if(!e.ok)throw new Error(`Fetch error: ${e.status}`);return e.json()}async function D(t,e={}){const o=new URL(`https://cdn.builder.io/api/v2/content/${t}`);return o.searchParams.set("apiKey",me),(s=>{for(const[n,r]of Object.entries(s))o.searchParams.set(n,r)})(e),e.limit||o.searchParams.set("limit",100),(await ge(o.toString())).results||[]}function Z(t){const e=t?.data||{},o=e["Blog title"]||e.blogTitle||e.title||e.name||"Untitled",l=e["Blog description"]||e.blogDescription||e.description||"",i=e["Blog date"]||e.blogDate||e.date||t?.lastUpdated||t?.firstPublished||null,s=e.slug||e.Slug||e.url||e.Url||"";let n=e["Blog tags"]||e.blogTags||e.tags||[];Array.isArray(n)?n=n.map(m=>typeof m=="string"?m:m?.value||m?.name||"").map(m=>(m||"").trim()).filter(Boolean):n=[];let r=e.Thumbnail||e.thumbnail||e.coverImage||e.image||"";return r&&typeof r=="object"&&(r=r.url||r.src||""),typeof r!="string"&&(r=""),{id:t.id,title:o,description:l,date:i,slug:s,thumbnail:r,tags:n,links:pe(e.Links||e.links)}}function pe(t){if(!t)return[];if(!Array.isArray(t))return[];const e=[];return t.forEach(o=>{!o||typeof o!="object"||Object.entries(o).forEach(([l,i])=>{if(!i||typeof i!="string")return;const s=l.toLowerCase();let n="Link";s.includes("appstore")||s.includes("app store")||s.includes("apple")?n="App Store":s.includes("figma")?n="Figma":s.includes("github")?n="GitHub":s.includes("website")||s.includes("web")?n="Website":s.includes("prototype")?n="Prototype":s.includes("demo")?n="Demo":s.includes("youtube")?n="YouTube":s.includes("link")&&(n=l.replace(/link/gi,"").replace(/([A-Z])/g," $1").trim()||"Link"),e.push({url:String(i),label:n})})}),e}function oe(t){const e=t.thumbnail,o=t.slug?`/article.html?slug=${encodeURIComponent(t.slug)}`:`/article.html?id=${encodeURIComponent(t.id)}`,l=ie(t.date),i=t.tags&&t.tags[0]?t.tags[0]:"Article",s=Math.max(3,se(t.description||""));return`
    <article class="py-12 first:pt-0 last:pb-0">
      <a href="${o}" class="group grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-6 md:gap-10 items-start">
        <!-- Thumbnail -->
        <div class="aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/50 dark:border-zinc-800 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1">
           ${e?`<img src="${e}" alt="${t.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">`:'<div class="w-full h-full flex items-center justify-center text-zinc-300"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'}
        </div>
        
        <!-- Content -->
        <div class="flex flex-col gap-3 group-hover:-translate-y-1 transition-transform duration-500">
           <div class="flex items-center gap-3 text-xs font-medium">
             <span class="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 capitalize">${i.toLowerCase()}</span>
             <span class="text-zinc-400">${l} • ${s} min read</span>
           </div>
           
           <h2 class="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-tight transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
             ${t.title}
           </h2>
           
           <p class="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 md:line-clamp-2 lg:line-clamp-3">
             ${t.description||"No description available."}
           </p>
           
           <div class="mt-2 text-sm font-medium text-black dark:text-white underline decoration-zinc-300 underline-offset-4 group-hover:decoration-black dark:group-hover:decoration-white transition-all">
             Read Article
           </div>
        </div>
      </a>
    </article>
  `}async function re(){const t=document.getElementById("blogs-list");if(t){t.innerHTML=`<div class="animate-pulse space-y-12">
    <div class="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full"></div>
    <div class="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full"></div>
  </div>`;try{const e=await D("blogs",{limit:100}),o=i=>{const n=(i.data||{}).date||i.createdDate;return n?new Date(n).getTime():0};e.sort((i,s)=>o(s)-o(i));const l=e.map(Z);t.innerHTML=l.map(oe).join("")}catch{t.innerHTML='<p class="text-red-500">Failed to load articles.</p>'}}}const fe=Object.freeze(Object.defineProperty({__proto__:null,blogRowHTML:oe,loadBlogsAndRender:re,normalizeBlog:Z},Symbol.toStringTag,{value:"Module"}));function he(t){return t?t.isPinned===!0||t["is pinned"]===!0:!1}async function be(){const t=document.getElementById("home-pinned-grid");if(!t)return;function e(){return`
      <div class="py-12 first:pt-0 last:pb-0 animate-pulse">
         <div class="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-6 md:gap-10 items-start">
           <div class="aspect-video md:aspect-[4/3] rounded-2xl bg-zinc-200 dark:bg-zinc-800"></div>
           <div class="flex flex-col gap-4 w-full">
             <div class="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4"></div>
             <div class="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
             <div class="space-y-2">
                <div class="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                <div class="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
             </div>
           </div>
         </div>
      </div>`}t.innerHTML=e()+e();try{let l=(await D("blogs",{limit:100})).filter(n=>he(n.data));const i=n=>{const m=(n.data||{}).date||n.createdDate;return m?new Date(m).getTime():0};if(l.sort((n,r)=>i(r)-i(n)),l.length===0){t.innerHTML="";return}const{blogRowHTML:s}=await ue(async()=>{const{blogRowHTML:n}=await Promise.resolve().then(()=>fe);return{blogRowHTML:n}},void 0);t.innerHTML=l.map(n=>s(Z(n))).join("")}catch{t.innerHTML=""}}const I={all:[],filtered:[],activeTag:"ALL"};function ve(t){const e=t?.data||{},o=e.title||e.Name||"Untitled Project",l=e.description||"";let i=Array.isArray(e.projectTags)?e.projectTags:Array.isArray(e.tags)?e.tags:[];i=i.map(n=>typeof n=="string"?n:n?.value||n?.name||"").filter(Boolean);let s=typeof e.thumbnail=="string"?e.thumbnail:e.thumbnail?.url||e.coverImage?.url||e.image?.url||"";return{id:t.id,title:o,description:l,thumbnail:s,tags:i,link:e.link||""}}function xe(t){const e=t.thumbnail||"",o=t.title||"Untitled",l=t.tags?.length?t.tags.join(" · "):"";return`
    <div class="relative overflow-hidden">
      ${e?`<img src="${e}" alt="${o}" loading="lazy"
               class="block w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-[1.03]" />`:'<div class="aspect-square w-full bg-zinc-300"></div>'}
      <div class="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"></div>
      <div class="absolute inset-x-0 bottom-0 p-4 text-white transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
         <p class="text-sm font-medium opacity-90 mb-1">${l}</p>
         <h3 class="text-xl font-bold leading-tight">${o}</h3>
      </div>
    </div>
  `}function Q(t){const e=document.getElementById("projects-grid-3col");e&&(e.innerHTML=t.map(o=>`
      <a href="${o.link||`/project/${o.id}`}" class="group block bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden" data-card="project-card">
         ${xe(o)}
      </a>
    `).join(""))}function ke(t){const e=new Set;return t.forEach(o=>{Array.isArray(o.tags)&&o.tags.forEach(l=>e.add(l.trim()))}),Array.from(e).sort()}function we(t){const e=document.getElementById("project-filters");if(!e)return;const l=["ALL",...ke(t)],i=()=>{e.innerHTML=`<div class="flex flex-wrap gap-2 justify-center">
      ${l.map(s=>{const r=s===I.activeTag?"bg-black text-white dark:bg-white dark:text-black border-black dark:border-white":"bg-transparent text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600";return`<button data-tag="${s}" class="px-4 py-2 rounded-full border text-sm font-medium transition-all ${r}">${s}</button>`}).join("")}
    </div>`,e.querySelectorAll("button").forEach(s=>{s.onclick=()=>{I.activeTag=s.dataset.tag,i(),I.activeTag==="ALL"?Q(I.all):Q(I.all.filter(n=>n.tags&&n.tags.includes(I.activeTag)))}})};i()}async function ye(){const t=document.getElementById("projects-grid-3col");if(t){t.innerHTML=[1,2,3].map(()=>'<div class="aspect-square bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>').join("");try{const e=await D("projects",{limit:100});I.all=e.map(ve),I.filtered=I.all,we(I.all),Q(I.all)}catch{t.innerHTML="Error loading projects."}}}function Y(t,e=0){if(!t||!t.length)return;let o=document.getElementById("lightbox-overlay");o||(o=document.createElement("div"),o.id="lightbox-overlay",o.className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center opacity-0 transition-opacity duration-300 pointer-events-none",o.innerHTML=`
      <button id="lb-close" class="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-[102]">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      <button id="lb-prev" class="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-[102] hidden md:block">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button id="lb-next" class="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-[102] hidden md:block">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="relative w-full h-full p-4 md:p-12 flex items-center justify-center">
         <img id="lb-img" class="max-w-full max-h-full object-contain shadow-2xl transition-transform duration-300 scale-95 opacity-0" src="" alt=""/>
         <div id="lb-counter" class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tracking-widest uppercase"></div>
      </div>
    `,document.body.appendChild(o),o.querySelector("#lb-close").onclick=m,o.querySelector("#lb-prev").onclick=c=>{c.stopPropagation(),n(l-1)},o.querySelector("#lb-next").onclick=c=>{c.stopPropagation(),n(l+1)},o.onclick=c=>{c.target===o&&m()});let l=e;const i=o.querySelector("#lb-img"),s=o.querySelector("#lb-counter");function n(c){c<0&&(c=t.length-1),c>=t.length&&(c=0),l=c,i.style.transform="scale(0.95)",i.style.opacity="0",setTimeout(()=>{i.src=t[l],s.textContent=`${l+1} / ${t.length}`,i.onload=()=>{i.style.transform="scale(1)",i.style.opacity="1"}},150)}function r(c){c.key==="Escape"&&m(),c.key==="ArrowLeft"&&n(l-1),c.key==="ArrowRight"&&n(l+1)}function m(){o.classList.remove("opacity-100","pointer-events-auto"),o.classList.add("opacity-0","pointer-events-none"),document.removeEventListener("keydown",r),document.body.style.overflow=""}o.classList.remove("opacity-0","pointer-events-none"),o.classList.add("opacity-100","pointer-events-auto"),document.addEventListener("keydown",r),document.body.style.overflow="hidden",n(l)}function J(t){let e=(t||"").toString();if(!e)return"";if(e=e.replace(/&lt;(img\b[^>]*?)\/?&gt;/gi,"<$1>"),e=e.replace(/&lt;(img\b[^>]*?)\s*\/?&gt;/gi,"<$1>"),!/<[^>]+>/.test(e)){e=e.replace(/!\[(.*?)\]\((https?:[^\s)]+)\)/g,(n,r,m)=>`<img src="${m}" alt="${r||""}">`),e=e.replace(/(https?:\/\/[^\s)]+\.(?:png|jpe?g|gif|webp|svg|avif)(?:[?][^\s)]+)?)/gi,n=>`<img src="${n}" alt="">`);const s=e.split(/\n{2,}/).map(n=>n.trim()).filter(Boolean);s.length&&(e=s.map(n=>`<p class="dark:text-zinc-300">${n.replace(/\n/g,"<br/>")}</p>`).join(""))}let l=0;e=e.replace(/<h1\b[^>]*>(.*?)<\/h1>/gi,(s,n)=>(l++,`<h1 class="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mt-16 mb-3 border-none select-none">${l.toString().padStart(2,"0")} / ${n}</h1>`)),e=e.replace(/<h2\b[^>]*>(.*?)<\/h2>/gi,(s,n)=>`<h2 class="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1.05] mb-8 mt-2">${n}</h2>`),e=e.replace(/<ol\b[^>]*>([\s\S]*?)<\/ol>/gi,(s,n)=>`<ol class="editorial-ordered not-prose">${n.replace(/<ul\b/gi,'<ul class="editorial-nested"')}</ol>`),e=e.replace(/<ul(?![^>]*class=["']editorial-nested["'])\b[^>]*>([\s\S]*?)<\/ul>/gi,(s,n)=>`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-10 not-prose">${n.replace(/<li\b[^>]*>(.*?)<\/li>/gi,(m,c)=>`
        <div class="group relative flex items-center bg-[#F5F5F7] dark:bg-zinc-800 rounded-2xl p-5 overflow-hidden transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700">
          <!-- Accent Line (Inside) -->
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
          <!-- Text -->
          <div class="text-base font-medium text-zinc-900 dark:text-zinc-100 leading-snug pl-3">
            ${c.trim()}
          </div>
        </div>
      `)}</div>`);const i=(s="")=>{const n="mx-auto block max-w-full h-auto md:max-h-[80vh] object-contain rounded-lg shadow-sm",r=/\bclass\s*=\s*"([^"]*)"/i,m=s.match(r);if(m){const p=`${m[1]||""} ${n}`.trim();return s.replace(r,`class="${p}"`)}return`${s} class="${n}"`};return e=e.replace(/<img\b([^>]*)>/gi,(s,n)=>`<img ${i((n||"").trim())}>`),e=e.replace(/<p((?![^>]*dark:text-)[^>]*)>/gi,(s,n)=>/class="/.test(n)?`<p${n.replace('class="','class="dark:text-zinc-300 ')}>`:`<p class="dark:text-zinc-300"${n}>`),e}async function ze(){const t=document.getElementById("project-detail")||document.getElementById("blog-detail");if(!t)return;const e=new URLSearchParams(location.search);let o=e.get("slug"),l=e.get("id");if(!o&&!l)try{const a=location.pathname.split("/").filter(Boolean);a.length>1&&(o=a[a.length-1])}catch{}if(!o&&!l){document.querySelector("meta[data-demo]")||(t.innerHTML='<p class="px-6 py-8 text-zinc-600">Missing slug or id.</p>');return}let i=[];try{if(o&&(i=await D("blogs",{limit:1,"query.data.slug":o})),(!i||!i.length)&&l&&(i=await D("blogs",{limit:1,id:l})),!i||!i.length){const a=await D("blogs",{limit:200,includeUnpublished:!0});o?i=a.filter(u=>(u.data.slug||"").toString().toLowerCase()===o.toLowerCase()):l&&(i=a.filter(u=>u.id===l))}}catch{}if(!i||!i.length){t.innerHTML='<p class="px-6 py-8 text-zinc-600">Article not found.</p>';return}const s=i[0],n=Z(s),r=s?.data||{},m=typeof r["Blog article"]=="string"?r["Blog article"]:typeof r.blogArticle=="string"?r.blogArticle:"",c=Array.isArray(r["Blog content"])&&r["Blog content"].length?r["Blog content"][0]:Array.isArray(r.blogContent)&&r.blogContent.length?r.blogContent[0]:null;function p(a){return a?typeof a=="string"?a:typeof a=="object"&&(a.url||a.src||a.image?.url)||"":""}const v=c?[p(c["Blog image 0"]),p(c["Blog image 1"]),p(c["Blog image 2"]),p(c["Blog image 3"]),p(c["Blog image 4"])].filter(Boolean):[];let C="";if(v.length===1)C=`
      <section class="w-full md:w-4/5 md:mx-auto lg:w-3/4 xl:w-2/3 md:px-6 lg:px-8 py-12">
        <div class="rounded-xl overflow-hidden">
          <button data-idx="1" class="relative block w-full aspect-square">
            <img src="${v[0]}" alt="Blog image" class="block w-full h-full object-cover"/>
          </button>
        </div>
      </section>`;else if(v.length>=2){const a=`
      <button data-idx="1" class="relative block w-full aspect-square overflow-hidden md:rounded-l-xl rounded-t-xl md:rounded-tr-none">
        <img src="${v[0]}" alt="Blog image" class="block w-full h-full object-cover"/>
      </button>`,u=v.slice(1,4).map((g,k,f)=>{const $=k+2,w=k===0,S=k===2||k===f.length-1,y=w?"md:rounded-tr-xl":S?"md:rounded-br-xl":"",d=k===2&&v.length>4?`<div class="absolute inset-0 bg-black/60 text-white grid place-items-center text-2xl font-medium">+${v.length-4}</div>`:"";return`
        <button data-idx="${$}" class="relative block w-full aspect-square overflow-hidden ${y}">
          <img src="${g}" alt="Blog image" class="block w-full h-full object-cover"/>
          ${d}
        </button>`}).join("");C=`
      <section class="w-full md:w-4/5 md:mx-auto lg:w-3/4 xl:w-2/3 md:px-6 lg:px-8 py-12">
        <div class="rounded-xl overflow-hidden">
          <div class="hidden md:grid md:grid-cols-[3fr_1fr] md:gap-0">
            <div>${a}</div>
            <div class="grid grid-rows-3 md:gap-0">${u}</div>
          </div>
          <div class="md:hidden">
            ${a}
            <div class="grid grid-cols-3 gap-1 mt-1">${u}</div>
          </div>
        </div>
      </section>`}const b=[["overview","Overview"],["background","Background"],["empathize","Empathize"],["desk-research","Desk research"],["user-interview","User interview"],["ideate","Ideate"],["prototype","Prototype"],["final-result","Final result"],["reflections","Reflections"]];function x(a,u){if(!c)return"";const g=(h="")=>h.toString().toLowerCase().replace(/[\s_-]+([a-z0-9])/g,(z,T)=>T.toUpperCase()),k=(h="")=>{const z=g(h);return z&&z[0].toUpperCase()+z.slice(1)},f=(u||"").toString().toLowerCase(),$=(u||"").toString().replace(/\s+/g,""),w=(a||"").toString().replace(/[-_]+/g," "),S=[u,f,$,f.replace(/\s+/g,"-"),f.replace(/\s+/g,"_"),g(u),k(u),a,w,g(w),k(w),w.replace(/\s+/g,""),w.replace(/\s+/g,"_"),w.replace(/\s+/g,"-")].filter(Boolean);let y="";for(const h of S)if(Object.prototype.hasOwnProperty.call(c,h)&&c[h]){y=c[h];break}if(!y)return"";let d="";return typeof y=="string"?d=y:y&&typeof y=="object"&&(d=y.html||y.text||y.value||""),d?`
      <section id="${a}" class="scroll-mt-24 pt-10 mt-10">
        <div class="my-8">
          <div class="w-2/3 border-b-2 border-black pb-1 dark:border-zinc-700">
            <h2 class="text-left text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-black dark:text-white">${u}</h2>
          </div>
        </div>
        <div class="prose max-w-none dark:prose-invert text-zinc-600 dark:text-zinc-300">${J(d)}</div>
      </section>`:""}const L=b.map(([a,u])=>x(a,u)).filter(Boolean).join(""),j=J(m)||"",F=`${j?`<div class="pt-10 mt-8 md:pt-12 md:mt-10">${j}</div>`:""}${C}${L}`||(n.description?`<p>${n.description}</p>`:"<p></p>"),B=a=>a?typeof a=="string"?a.trim():typeof a=="object"?(a.text||a.html||a.value||"").toString().trim():"":"",M=B(r.myRole||r.role||r["My Role"]),P=B(r.team||r.Team),R=B(r.timeline||r.Timeline),V=a=>(a||"").toString().split(/\s*[-,]\s+|\n+/).map(u=>u.trim()).filter(Boolean);let H=[];Array.isArray(r.skills)&&r.skills.forEach(a=>{typeof a=="string"&&H.push(...V(a))}),["skill1","skill2","skill3"].forEach(a=>{const u=B(r[a]);u&&H.push(...V(u))});const q=new Set;H=H.filter(a=>q.has(a.toLowerCase())?!1:(q.add(a.toLowerCase()),!0));function N(a){if(!a||!a.length)return"";const u=(g,k)=>{const f=(g||"").toLowerCase(),$=(k||"").toLowerCase();return f.includes("apps.apple.com")||$.includes("app store")?'<svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.09-.48-3.08.35-1.06.91-2.09.91-3.08-.35-4.85-6.21-1.87-11.45 2.15-11.64.95-.05 1.77.53 2.53.53.7 0 1.91-1 3.23-.74 1.48.28 2.37 1.09 3.23 2.15-2.61 1.48-2.09 5.86.35 6.91-.49 1.41-1.41 3.41-2.26 4.41l.01-.01zM13.03 5.48c-.7.84-1.84 1.41-2.84 1.27-.14-1.2.56-2.61 1.48-3.41.84-.77 2.29-1.34 2.99-1.12.18 1.44-.81 2.64-1.63 3.26z"/></svg>':f.includes("figma.com")||$.includes("figma")?'<svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 38 57" fill="none"><path d="M19 28.5C19 25.9863 20.0179 23.5755 21.8297 21.798C23.6415 20.0204 26.0989 19.0219 28.6615 19.0219C31.2242 19.0219 33.6816 20.0204 35.4934 21.798C37.3052 23.5755 38.3231 25.9863 38.3231 28.5C38.3231 31.0137 37.3052 33.4245 35.4934 35.202C33.6816 36.9796 31.2242 37.9781 28.6615 37.9781L19 37.9781V28.5Z" fill="#1ABCFE"/><path d="M0 47.4781C0 44.9644 1.01786 42.5536 2.82966 40.7761C4.64146 38.9985 7.09893 38 9.66154 38C12.2241 38 14.6816 38.9985 16.4934 40.7761C18.3052 42.5536 19.3231 44.9644 19.3231 47.4781C19.3231 50.0827 18.271 52.5413 16.3242 54.4507C14.5422 56.1264 12.1873 57.0396 9.66154 56.9562C4.34893 56.9562 0 52.6898 0 47.4781Z" fill="#0ACF83"/><path d="M19 0V18.9781L28.6615 18.9781C31.2242 18.9781 33.6816 17.9796 35.4934 16.202C37.3052 14.4245 38.3231 12.0137 38.3231 9.5C38.3231 6.9863 37.3052 4.57548 35.4934 2.79796C33.6816 1.02045 31.2242 0.021946 28.6615 0L19 0Z" fill="#FF7262"/><path d="M0 9.5C0 12.0137 1.01786 14.4245 2.82966 16.202C4.64146 17.9796 7.09893 18.9781 9.66154 18.9781L19 18.9781V0L9.66154 0C7.09893 0.021946 4.64146 1.02045 2.82966 2.79796C1.01786 4.57548 0 6.9863 0 9.5Z" fill="#F24E1E"/><path d="M0 28.5C0 31.0137 1.01786 33.4245 2.82966 35.202C4.64146 36.9796 7.09893 37.9781 9.66154 37.9781L19 37.9781V19.0219L9.66154 19.0219C7.09893 19.0219 4.64146 20.0204 2.82966 21.798C1.01786 23.5755 0 25.9863 0 28.5Z" fill="#A259FF"/></svg>':'<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>'};return`
      <div class="flex flex-wrap gap-3 pt-3">
        ${a.map(g=>{const k=(g.url||"").toLowerCase(),f=(g.label||"").toLowerCase(),w=k.includes("apps.apple.com")||f.includes("app store")||f.includes("download")||f.includes("get app")?"inline-flex items-center gap-2.5 rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80 shadow-sm":"inline-flex items-center gap-2.5 rounded-full bg-white text-zinc-900 border border-zinc-200 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-50 dark:bg-zinc-900 dark:text-white dark:border-white/10 dark:hover:bg-zinc-800";return`
               <a href="${g.url}" target="_blank" rel="noopener" class="${w}">
                  ${u(g.url,g.label)}
                  <span>${g.label}</span>
               </a>`}).join("")}
      </div>`}const U=N(n.links);let E="";const O=r.projectOverviewGrid||r["Project overview grid"]||r.projectOverview;if(Array.isArray(O)&&O.length>0){const a=O[0],u=($,w)=>{for(const S of w)if($[S])return B($[S]);return""};let g=u(a,["challengeText","Challenge text","challenge","Challenge"]),k=u(a,["solutionText","Solution text","solution","Solution"]),f=u(a,["impactText","Impact text","impact","Impact"]);if(g||(g=B(r.Challenge)),k||(k=B(r.Solution)),f||(f=B(r.Impact)),g||k||f){const $=(w,S,y=!1)=>S?`
             <div class="flex-1 min-w-[240px] rounded-2xl border ${y?"bg-zinc-900 text-white border-zinc-900 dark:bg-black dark:border-zinc-800":"bg-white text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"} p-6 md:p-8 flex flex-col gap-4">
               <span class="${y?"text-zinc-400":"text-zinc-400 dark:text-zinc-500"} text-xs font-bold uppercase tracking-wider">${w}</span>
               <div class="text-sm md:text-base leading-relaxed ${y?"text-zinc-200":"text-zinc-600 dark:text-zinc-300"}">
                 ${J(S)}
               </div>
             </div>
           `:"";E=`
             <div class="mb-8 md:mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
               ${$("Challenge",g)}
               ${$("Solution",k)}
               ${$("Impact",f,!0)}
             </div>
           `}}const A=p(r.heroImage||r["Hero image"]),_=A?`<div class="w-full aspect-video rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/50 dark:border-zinc-800"><img src="${A}" alt="" class="w-full h-full object-cover" loading="eager" /></div>`:"",G="/assets/Chevron%20Icon.png";t.innerHTML=`
    <div class="min-h-screen pb-48 md:pb-32 lg:ml-[348px]">
       <!-- Sticky Breadcrumb Nav -->
      <div class="sticky top-[60px] md:top-0 z-[100] w-full bg-white/80 backdrop-blur-md backdrop-saturate-150 border-b border-zinc-200/50 transition-all dark:bg-zinc-900/80 dark:border-white/5">
         <div class="mx-auto w-full max-w-4xl px-6 sm:px-8 md:px-12 py-3 flex items-center gap-4">
            <a href="/blog" aria-label="Back to Blogs" id="back-button"
               class="group inline-flex items-center justify-center -ml-2 p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800">
              <img src="${G}" alt="" class="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity dark:invert" draggable="false"/>
            </a>
            <span class="font-medium text-sm text-zinc-900 truncate pr-4 dark:text-white">${n.title}</span>
         </div>
      </div>

      <div class="mx-auto w-full max-w-4xl px-6 sm:px-8 md:px-12 pt-12 pb-8 md:pt-24 md:pb-16 relative">
      
        <div id="back-sentinel" class="hidden md:block h-0"></div>

        <header class="mb-8 md:mb-12">
            <div class="space-y-5 md:space-y-6">
                ${_}

                <!-- Title & Subtitle Group -->
                <div class="space-y-4">
                   <p class="text-sm font-medium text-zinc-400 uppercase tracking-wider dark:text-zinc-500">${ie(n.date)}</p>
                   <h1 class="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-zinc-900 leading-[1.1] text-balance dark:text-white">${n.title}</h1>
                   ${n.description?`<p class="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-3xl text-balance dark:text-zinc-400">${n.description}</p>`:""}
                </div>

                 <!-- Meta Data Chips Row -->
                ${M||P||R?`
                  <div class="flex flex-wrap gap-3 text-sm">
                    ${M?`
                    <div class="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                       <span class="text-zinc-400 font-medium whitespace-nowrap">Role</span>
                       <span class="text-zinc-900 font-semibold whitespace-nowrap dark:text-zinc-100">${M}</span>
                    </div>`:""}
                    ${P?`
                    <div class="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                       <span class="text-zinc-400 font-medium whitespace-nowrap">Team</span>
                       <span class="text-zinc-900 font-semibold whitespace-nowrap dark:text-zinc-100">${P}</span>
                    </div>`:""}
                    ${R?`
                    <div class="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                       <span class="text-zinc-400 font-medium whitespace-nowrap">Timeline</span>
                       <span class="text-zinc-900 font-semibold whitespace-nowrap dark:text-zinc-100">${R}</span>
                    </div>`:""}
                  </div>
                `:""}

                <div class="flex flex-wrap items-center gap-4 pt-2">
                  ${H.length?`<div class="flex flex-wrap gap-2">${H.map(a=>`<span class="inline-flex items-center rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-500">${a}</span>`).join("")}</div>`:""}
                  ${U?`<div class="">${U}</div>`:""}
                </div>

            </div>
        </header>

        ${E}

        <section class="prose prose-zinc prose-lg max-w-none dark:prose-invert text-zinc-600 dark:text-zinc-300">
           ${F}
        </section>

        <!-- Fixed floating TOC (Desktop) -->
        <aside class="hidden xl:block">
          <div id="toc-floating" class="group fixed top-1/2 -translate-y-1/2 right-6 z-50 w-12 hover:w-72 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] py-6 overflow-hidden">
             <p class="text-xs uppercase tracking-wide text-zinc-400 mb-4 pl-5 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-75">Contents</p>
             <nav id="toc-links" class="relative flex flex-col space-y-3 text-sm border-l border-zinc-200 ml-6"></nav>
          </div>
        </aside>

      </div>
    </div>
  `,setTimeout(()=>{const a=document.getElementById("toc-links");if(a){const u=d=>(d||"").toString().trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"sec",g=Array.from(t.querySelectorAll("section[id]")).filter(d=>b.some(h=>h[0]===d.id)),k=Array.from(t.querySelectorAll(".prose h2"));let f=[];g.forEach(d=>f.push({id:d.id,label:d.querySelector("h2")?.textContent||d.id,el:d})),k.forEach(d=>{d.id||(d.id=u(d.textContent)),f.push({id:d.id,label:d.textContent,el:d})}),f=f.filter((d,h,z)=>z.findIndex(T=>T.id===d.id)===h),a.innerHTML=f.map(d=>`
                <a href="#${d.id}" data-id="${d.id}" class="group/link flex items-center pl-4 relative text-zinc-500 hover:text-black transition-colors dark:text-zinc-400 dark:hover:text-white">
                    <span class="toc-dot absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-zinc-200 border-2 border-white ring-1 ring-zinc-200 transition-all duration-300 group-hover/link:bg-zinc-300 group-hover/link:ring-zinc-300 dark:bg-zinc-700 dark:border-zinc-900 dark:ring-zinc-700 dark:group-hover/link:bg-zinc-500 dark:group-hover/link:ring-zinc-500"></span>
                    <span class="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75 whitespace-nowrap">${d.label}</span>
                </a>`).join(""),a.addEventListener("click",d=>{const h=d.target.closest("a");if(h){d.preventDefault();const z=h.dataset.id,T=document.getElementById(z);T&&T.scrollIntoView({behavior:"smooth"})}});const $={root:null,rootMargin:"-20% 0px -70% 0px",threshold:0};let w=null;const S=d=>{if(w===d)return;w=d,a.querySelectorAll("a").forEach(z=>{z.classList.remove("text-black","dark:text-white","font-medium"),z.classList.add("text-zinc-500","dark:text-zinc-400");const T=z.querySelector(".toc-dot");T&&(T.classList.remove("bg-black","ring-black","dark:bg-white","dark:ring-white"),T.classList.add("bg-zinc-200","ring-zinc-200","dark:bg-zinc-700","dark:ring-zinc-700"))});const h=a.querySelector(`a[data-id="${d}"]`);if(h){h.classList.remove("text-zinc-500","dark:text-zinc-400"),h.classList.add("text-black","dark:text-white","font-medium");const z=h.querySelector(".toc-dot");z&&(z.classList.remove("bg-zinc-200","ring-zinc-200","dark:bg-zinc-700","dark:ring-zinc-700"),z.classList.add("bg-black","ring-black","dark:bg-white","dark:ring-white"))}},y=new IntersectionObserver(d=>{d.forEach(h=>{h.isIntersecting&&S(h.target.id)})},$);f.forEach(d=>{d.el&&y.observe(d.el)})}},100);const K=[n.thumbnail,...v].filter(Boolean);t.querySelectorAll("img").forEach(a=>{a.closest("button")||a.closest(".prose")&&(a.style.cursor="pointer",a.addEventListener("click",()=>Y([a.src],0)))}),t.querySelectorAll("button[data-idx]").forEach(a=>{a.addEventListener("click",()=>{const u=parseInt(a.dataset.idx||"0");Y(K,Math.max(0,u-1));const g=a.querySelector("img");g&&Y([g.src],0)})})}function $e(){const t=document.getElementById("connect-accordions");if(!t)return;const e=t.querySelectorAll(".accordion-item"),o=document.getElementById("connect-portrait"),l=o?o.getAttribute("src"):"";e.forEach(i=>{i.querySelector(".accordion-header").addEventListener("click",()=>{const n=i.classList.contains("open");if(e.forEach(r=>{r.classList.remove("open"),r.querySelector(".accordion-body").style.maxHeight="0"}),n)o&&(o.src=l);else{i.classList.add("open");const r=i.querySelector(".accordion-body");r.style.maxHeight=r.scrollHeight+"px";const m=i.dataset.img;m&&o&&(o.src=m)}})})}function Le(){const t=document.getElementById("testimonials-container"),e=document.getElementById("testimonials-prev"),o=document.getElementById("testimonials-next");if(!t||!e||!o)return;const l=()=>{const i=t.querySelector(".snap-start");return i?i.offsetWidth+16:320};e.addEventListener("click",()=>{t.scrollBy({left:-l(),behavior:"smooth"})}),o.addEventListener("click",()=>{t.scrollBy({left:l(),behavior:"smooth"})})}const ee=()=>window.matchMedia("(max-width: 1023px)").matches;function te(){const t=document.querySelectorAll("video[data-src]");if(!t.length)return;const e={root:null,rootMargin:"100px",threshold:0},o=i=>{const s=i.dataset.src;s&&(i.src=s,i.removeAttribute("data-src"),i.load(),!ee()&&i.hasAttribute("autoplay")&&i.play().catch(()=>{}))},l=new IntersectionObserver(i=>{i.forEach(s=>{s.isIntersecting&&(o(s.target),l.unobserve(s.target))})},e);t.forEach(i=>{if(ee()){i.removeAttribute("autoplay"),i.setAttribute("preload","none");const s=i.parentElement;if(s&&!s.querySelector(".video-play-overlay")){const n=document.createElement("button");n.className="video-play-overlay absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity z-10",n.innerHTML=`
                    <div class="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg class="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                `,n.setAttribute("aria-label","Play video"),n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),o(i),i.play(),n.remove()}),getComputedStyle(s).position==="static"&&(s.style.position="relative"),s.appendChild(n)}}l.observe(i)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",te):te();function Ee(){const t=()=>{const e=document.querySelectorAll('aside a[href^="/"], a[href^="/"]'),o=new Set;e.forEach(l=>{let i=l.getAttribute("href");if(!i||i.startsWith("http")||i.startsWith("#")||i.startsWith("javascript")||(i.endsWith("/")&&i.length>1&&(i=i+"index.html"),o.has(i)))return;o.add(i);const s=document.createElement("link");s.rel="prefetch",s.href=i,document.head.appendChild(s)})};document.readyState==="complete"?setTimeout(t,1e3):window.addEventListener("load",()=>setTimeout(t,1e3))}document.addEventListener("DOMContentLoaded",()=>{le(),Ee(),ne(),document.getElementById("home-pinned-grid")&&be(),document.getElementById("projects-grid-3col")&&ye(),document.getElementById("blogs-list")&&re(),(document.getElementById("project-detail")||document.getElementById("blog-detail"))&&ze(),document.getElementById("connect-accordions")&&$e(),document.getElementById("testimonials-container")&&Le()});
//# sourceMappingURL=bundle.js.map
