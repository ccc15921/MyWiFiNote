/* 規格摘要搜尋 / 瀏覽元件。用法：SpecSearch({data: window.SPEC_BE, p: 'be'})
   頁面需有 id：<p>Count, <p>q, <p>Sel, <p>Meta, <p>List（p 為前綴，例如 be / bf）。 */
function SpecSearch(o){
  var D=o.data, p=o.p; if(!D) return;
  var list=document.getElementById(p+'List'), q=document.getElementById(p+'q'),
      sel=document.getElementById(p+'Sel'), meta=document.getElementById(p+'Meta'),
      cnt=document.getElementById(p+'Count');
  if(!list||!q||!sel||!meta) return;
  if(cnt) cnt.textContent=D.units.length;
  function grp(id){return id.replace(/^Annex\s+/,'').split('.')[0];}
  var titles={}; D.toc.forEach(function(e){var k=grp(e.id); if(e.id.replace(/^Annex\s+/,'')===k && !titles[k]) titles[k]=e.t;});
  var groups=[],seen={};
  D.units.forEach(function(u){u._g=grp(u.id); if(!seen[u._g]){seen[u._g]=1;groups.push(u._g);}
    u._h=(u.id+' '+u.t+' '+u.s+' '+u.w+' '+u.k.join(' ')).toLowerCase();});
  function label(g){return (/^\d+$/.test(g)?'Clause ':'Annex ')+g+(titles[g]?' '+titles[g]:'');}
  var op0=document.createElement('option'); op0.value=''; op0.textContent='全部章節'; sel.appendChild(op0);
  groups.forEach(function(g){var op=document.createElement('option'); op.value=g; op.textContent=label(g); sel.appendChild(op);});
  function el(t,c,x){var e=document.createElement(t); if(c)e.className=c; if(x!=null)e.textContent=x; return e;}
  function card(u){
    var d=el('details','spec-item'), s=el('summary');
    s.appendChild(el('span','sid',u.id)); s.appendChild(document.createTextNode(u.t));
    s.appendChild(el('span','pg','p.'+u.p[0]+(u.p[1]>u.p[0]?'–'+u.p[1]:'')));
    d.appendChild(s);
    d.appendChild(el('div','',u.s||'（無摘要）'));
    if(u.k.length){var ul=el('ul','pts'); u.k.forEach(function(x){ul.appendChild(el('li','',x));}); d.appendChild(ul);}
    if(u.f) d.appendChild(el('div','fig','圖表：'+u.f));
    if(u.w){var k=el('div','kws'); u.w.split(/[,，]\s*/).forEach(function(w){if(w)k.appendChild(el('span','chip',w));}); d.appendChild(k);}
    return d;
  }
  var res=[],shown=0,PAGE=30;
  function more(){
    var b=list.querySelector('.spec-more'); if(b) b.remove();
    var end=Math.min(shown+PAGE,res.length);
    for(;shown<end;shown++) list.appendChild(card(res[shown]));
    if(shown<res.length){var m=el('button','spec-more','顯示更多（剩 '+(res.length-shown)+' 筆）'); m.type='button'; m.addEventListener('click',more); list.appendChild(m);}
  }
  function run(){
    var toks=q.value.trim().toLowerCase().split(/\s+/).filter(Boolean), g=sel.value;
    res=D.units.filter(function(u){
      if(g&&u._g!==g) return false;
      for(var i=0;i<toks.length;i++) if(u._h.indexOf(toks[i])<0) return false;
      return true;});
    list.textContent=''; shown=0;
    meta.textContent=(toks.length||g)?'符合 '+res.length+' / '+D.units.length+' 筆':'共 '+D.units.length+' 筆，依規格書順序排列';
    if(!res.length){list.appendChild(el('div','card','沒有符合的條文，請換個關鍵字。'));return;}
    more();
  }
  var tm; q.addEventListener('input',function(){clearTimeout(tm);tm=setTimeout(run,150);});
  sel.addEventListener('change',run);
  run();
}
