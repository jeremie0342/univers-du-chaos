
(function(){
const b=document.querySelector('.menu-btn');if(b)b.onclick=()=>document.body.classList.toggle('menu');
const i=document.getElementById('q'),r=document.getElementById('res');let idx=null,sel=-1;
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
async function charge(){if(!idx){try{idx=await (await fetch('recherche.json')).json();idx.forEach(p=>{p.n=norm(p.t);p.c=norm(p.x)})}catch(e){idx=[]}}return idx}
function esc(s){return s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
i.addEventListener('input',async()=>{const q=norm(i.value.trim());await charge();sel=-1;
 if(q.length<2){r.style.display='none';return}
 const mots=q.split(/\s+/),out=[];
 for(const p of idx){let s=0,ok=true;for(const m of mots){if(p.n.includes(m))s+=10;else if(p.c.includes(m))s+=1;else{ok=false;break}}if(ok)out.push([s,p])}
 out.sort((a,b)=>b[0]-a[0]);
 r.innerHTML=out.slice(0,25).map(([s,p])=>{let e='';const k=p.c.indexOf(mots[0]);if(k>=0)e=p.x.slice(Math.max(0,k-50),k+90);
  return `<a href="${p.u}">${esc(p.t)}<small>${esc(p.d)}${e?' · …'+esc(e)+'…':''}</small></a>`}).join('')||'<a>Aucun résultat</a>';
 r.style.display='block'});
i.addEventListener('keydown',e=>{const a=[...r.querySelectorAll('a[href]')];if(!a.length)return;
 if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();sel=(sel+(e.key==='ArrowDown'?1:-1)+a.length)%a.length;a.forEach((x,k)=>x.classList.toggle('sel',k===sel))}
 if(e.key==='Enter'){location.href=a[Math.max(sel,0)].getAttribute('href')}
 if(e.key==='Escape'){r.style.display='none';i.blur()}});
document.addEventListener('click',e=>{if(!e.target.closest('.recherche'))r.style.display='none'});
document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement!==i){e.preventDefault();i.focus()}});
const ici=document.querySelector('nav.cote a.ici'),nv=document.querySelector('nav.cote');if(ici&&nv)nv.scrollTop=ici.offsetTop-nv.clientHeight/2;
})();
