(function(){
  var root=document.documentElement;
  // 主題：<head> 內的 inline script 已先套用（URL ?theme= 優先，其次 localStorage），這裡負責保存與帶到站內連結
  function saveTheme(t){try{localStorage.setItem('wifi8-theme',t);}catch(e){}}
  function linkTheme(t){
    [].forEach.call(document.querySelectorAll('a[href]'),function(a){
      var h=a.getAttribute('href'), m=h.match(/^([\w-]+\.html)(?:\?[^#]*)?(#.*)?$/);
      if(m) a.setAttribute('href',m[1]+(t?'?theme='+t:'')+(m[2]||''));
    });
  }
  var t0=root.getAttribute('data-theme');
  if(t0){saveTheme(t0);linkTheme(t0);}
  var tb=document.getElementById('themeBtn');
  if(tb) tb.addEventListener('click',function(){
    var cur=root.getAttribute('data-theme');
    var dark=cur? cur==='dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    var next=dark?'light':'dark'; root.setAttribute('data-theme',next);
    saveTheme(next); linkTheme(next);
    try{if(/[?&]theme=/.test(location.search))history.replaceState(null,'',location.pathname+'?theme='+next+location.hash);}catch(e){}
  });
  var toc=document.getElementById('toc'), mb=document.getElementById('menuBtn');
  if(!toc) return;
  if(mb) mb.addEventListener('click',function(){var o=toc.classList.toggle('open');mb.setAttribute('aria-expanded',o);});
  var links=[].slice.call(toc.querySelectorAll('ol a'));
  links.forEach(function(a){a.addEventListener('click',function(){toc.classList.remove('open');});});
  var map={}; links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(l){l.classList.remove('active')}); var a=map[e.target.id]; if(a)a.classList.add('active');}
    });},{rootMargin:'-20% 0px -70% 0px'});
    document.querySelectorAll('main section').forEach(function(s){io.observe(s);});
  }
  var q=document.getElementById('gq');
  if(q) q.addEventListener('input',function(){var v=q.value.trim().toLowerCase();
    document.querySelectorAll('#gloss > div').forEach(function(d){d.style.display=!v||d.textContent.toLowerCase().indexOf(v)>-1?'':'none';});});
})();
