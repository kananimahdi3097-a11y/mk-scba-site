// Mobile menu
(function(){
  var b=document.querySelector('.burger'),m=document.querySelector('.mnav');
  if(b&&m)b.addEventListener('click',function(){m.classList.toggle('open')});
})();

// Scroll reveal
(function(){
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});
})();

// 3D tilt on product card (mouse + phone gyroscope)
(function(){
  var t=document.querySelector('.tilt');if(!t)return;
  var st=t.parentElement;
  function set(rx,ry){t.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)'}
  st.addEventListener('mousemove',function(e){var r=st.getBoundingClientRect();var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;set(-y*16,x*20)});
  st.addEventListener('mouseleave',function(){set(0,0)});
  var a=0;(function idle(){if(!st.matches(':hover')){a+=.012;set(Math.sin(a)*4,Math.cos(a)*7)}requestAnimationFrame(idle)})();
})();

// Animated air-particle background in hero
(function(){
  var c=document.querySelector('.hero canvas');if(!c)return;
  var x=c.getContext('2d'),W,H,P=[];
  function rs(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight}
  rs();window.addEventListener('resize',rs);
  for(var i=0;i<70;i++)P.push({x:Math.random(),y:Math.random(),r:Math.random()*2+.6,s:Math.random()*.0006+.0002});
  (function d(){x.clearRect(0,0,W,H);
    P.forEach(function(p){p.y-=p.s;if(p.y<0){p.y=1;p.x=Math.random()}
      x.beginPath();x.arc(p.x*W,p.y*H,p.r,0,6.3);x.fillStyle='rgba(160,205,255,.55)';x.fill()});
    for(var i=0;i<P.length;i++)for(var j=i+1;j<P.length;j++){var dx=(P[i].x-P[j].x)*W,dy=(P[i].y-P[j].y)*H,dd=dx*dx+dy*dy;
      if(dd<9000){x.strokeStyle='rgba(120,180,255,'+(.18*(1-dd/9000))+')';x.beginPath();x.moveTo(P[i].x*W,P[i].y*H);x.lineTo(P[j].x*W,P[j].y*H);x.stroke()}}
    requestAnimationFrame(d)})();
})();

// Count-up numbers
(function(){
  document.querySelectorAll('[data-count]').forEach(function(el){
    var n=+el.dataset.count,suf=el.dataset.suf||'',done=false;
    var io=new IntersectionObserver(function(e){if(e[0].isIntersecting&&!done){done=true;var t0=null;
      (function f(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1200,1);el.textContent=Math.round(n*p)+suf;if(p<1)requestAnimationFrame(f)})(performance.now())}});
    io.observe(el);
  });
})();

// Quote form -> WhatsApp
(function(){
  var f=document.getElementById('qf');if(!f)return;
  f.addEventListener('submit',function(e){e.preventDefault();
    var v=function(id){var el=document.getElementById(id);return el?el.value.trim():''};
    var lines=['Hello M.K Enterprise,','Name: '+v('n'),'Company/City: '+v('c')];
    if(v('m'))lines.push('Mobile: '+v('m'));
    lines.push('Requirement: '+v('p'));
    if(v('q'))lines.push('Quantity: '+v('q'));
    if(v('d'))lines.push('Details: '+v('d'));
    window.open('https://wa.me/919913911614?text='+encodeURIComponent(lines.join('\n')),'_blank');
  });
})();
