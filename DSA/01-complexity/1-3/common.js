document.querySelectorAll('.copybtn').forEach(function (b) {
  b.addEventListener('click', function () {
    var txt = b.closest('.code-block').querySelector('pre').innerText;
    function done() { b.textContent = '✓ Copied'; b.classList.add('done'); setTimeout(function () { b.textContent = '📋 Copy'; b.classList.remove('done'); }, 1400); }
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, done); else done();
  });
});
document.getElementById('openAll').addEventListener('click', function () { document.querySelectorAll('details.tp').forEach(function (d) { d.open = true; }); });
document.getElementById('closeAll').addEventListener('click', function () { document.querySelectorAll('details.tp').forEach(function (d) { d.open = false; }); });

(() => {
 'use strict';
 const directory=document.getElementById('topic-index');
 const cards=directory?[...directory.querySelectorAll('.topic-link')]:[];
 if(directory){
  const search=document.getElementById('topic-search');
  const groups=[...directory.querySelectorAll('.index-group')];
  const count=document.getElementById('index-count');
  const empty=document.getElementById('index-empty');
  const normalize=value=>value.normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim();
  const labels=new Map(cards.map(card=>[card,normalize(card.textContent+' '+card.dataset.keywords)]));
  function filterTopics(){
   const terms=normalize(search.value).split(' ').filter(Boolean);
   let total=0;
   groups.forEach(group=>{
    let visible=0;
    group.querySelectorAll('.topic-link').forEach(card=>{
     const match=terms.every(term=>labels.get(card).includes(term));
     card.hidden=!match;if(match){visible++;total++;}
    });
    group.hidden=visible===0;
   });
   empty.hidden=total!==0;
   count.textContent=total+' of '+cards.length+' items';
  }
  search.addEventListener('input',filterTopics);
  search.addEventListener('keydown',event=>{if(event.key==='Escape'){search.value='';filterTopics();}});
  document.getElementById('clear-index').addEventListener('click',()=>{search.value='';filterTopics();search.focus();});
  filterTopics();
 }
 function navigateToHash(focus=false){
  let id;
  try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
  if(!id)return;
  const target=document.getElementById(id);if(!target)return;
  for(let node=target;node;node=node.parentElement)if(node.tagName==='DETAILS')node.open=true;
  cards.forEach(card=>{if(card.getAttribute('href')==='#'+id)card.setAttribute('aria-current','location');else card.removeAttribute('aria-current');});
  requestAnimationFrame(()=>{
   const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   target.scrollIntoView({behavior:reduce?'instant':'smooth',block:'start'});
   if(focus){
    const destination=target.tagName==='DETAILS'?target.querySelector('summary'):target;
    if(!destination.hasAttribute('tabindex')&&destination.tagName!=='SUMMARY')destination.setAttribute('tabindex','-1');
    destination.focus({preventScroll:true});
   }
  });
 }
 document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const href=link.getAttribute('href');
  if(!href||href==='#')return;
  let target;try{target=document.getElementById(decodeURIComponent(href.slice(1)));}catch{return;}
  if(!target)return;
  event.preventDefault();
  if(location.hash!==href)location.hash=href;else navigateToHash(true);
 }));
 window.addEventListener('hashchange',()=>navigateToHash(true));
 if(location.hash)navigateToHash(false);
})();
