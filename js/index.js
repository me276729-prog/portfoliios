
(function(){
  var root=document.documentElement;
  // Theme
  var saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
  if(saved)root.setAttribute('data-theme',saved);
  document.getElementById('themeBtn').addEventListener('click',function(){
    var dark=root.getAttribute('data-theme')==='dark'||(!root.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme: dark)').matches);
    var next=dark?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
  });

  // Mobile menu
  var menu=document.getElementById('menuBtn'),links=document.getElementById('links');
  function setMenu(o){links.classList.toggle('open',o);menu.setAttribute('aria-expanded',o)}
  menu.addEventListener('click',function(){setMenu(!links.classList.contains('open'))});
  links.addEventListener('click',function(e){if(e.target.tagName==='A')setMenu(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});

  // Typing effect
  var words=['Full Stack Developer','Data Analyst','Graphic Designer'],wi=0,ci=0,del=false,el=document.getElementById('typed');
  var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function type(){
    var w=words[wi];
    el.textContent=w.slice(0,ci);
    if(!del&&ci===w.length){del=true;return setTimeout(type,1500)}
    if(del&&ci===0){del=false;wi=(wi+1)%words.length}
    ci+=del?-1:1;
    setTimeout(type,del?45:90);
  }
  if(still){el.textContent=words[0]}else{type()}

  // Reveal panels + fill skill bars
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;
    e.target.classList.add('show');
    e.target.querySelectorAll('.fill').forEach(function(f){f.style.width=f.dataset.w+'%'});
    io.unobserve(e.target);
  })},{threshold:.25});
  document.querySelectorAll('.reveal').forEach(function(n){io.observe(n)});

  // Active nav link
  var anchors=[].slice.call(links.querySelectorAll('a'));
  var so=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){anchors.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)})}
  })},{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('main section').forEach(function(s){so.observe(s)});

  // Contact form: opens the visitor's email app
  document.getElementById('form').addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('name').value.trim(),m=document.getElementById('email').value.trim(),t=document.getElementById('msg').value.trim(),s=document.getElementById('status');
    if(!n||!/^\S+@\S+\.\S+$/.test(m)||!t){s.textContent='Please enter your name, a valid email and a message.';return}
    s.textContent='Opening your email app...';
    location.href='mailto:you@example.com?subject='+encodeURIComponent('Portfolio message from '+n)+'&body='+encodeURIComponent(t+'\n\n'+n+' ('+m+')');
  });

  // Skill logos
  var S=function(v,b,x){return '<svg viewBox="'+v+'" '+b+'>'+x+'</svg>'};
  var L={
    'HTML5':{b:'#e44d26',c:'#fff',m:'5'},
    'CSS3':{b:'#1572b6',c:'#fff',m:'3'},
    'JavaScript':{b:'#f7df1e',c:'#222',m:'JS'},
    'TypeScript':{b:'#3178c6',c:'#fff',m:'TS'},
    'Bootstrap':{b:'#7952b3',c:'#fff',m:'B'},
    'Tailwind CSS':{b:'#0f172a',s:S('0 0 24 24','fill="#38bdf8"','<path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6C13.7 10.6 15 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.200 15 4.800 12 4.800zM6 12c-3.200 0-5.200 1.600-6 4.800 1.200-1.600 2.600-2.200 4.200-1.800.9.200 1.600.9 2.300 1.600 1.200 1.200 2.500 2.600 5.500 2.600 3.200 0 5.200-1.600 6-4.800-1.200 1.600-2.600 2.200-4.200 1.800-.9-.2-1.600-.9-2.300-1.600C10.300 13.400 9 12 6 12z"/>')},
    'React.js':{b:'#20232a',s:S('-12 -12 24 24','fill="none" stroke="#61dafb" stroke-width="1.2"','<ellipse rx="10" ry="4"/><ellipse rx="10" ry="4" transform="rotate(60)"/><ellipse rx="10" ry="4" transform="rotate(120)"/><circle r="1.7" fill="#61dafb" stroke="none"/>')},
    'Next.js':{b:'#000',c:'#fff',m:'N'},
    'Redux Toolkit':{b:'#764abc',c:'#fff',m:'R'},
    'Axios':{b:'#5a29e4',c:'#fff',m:'A'},
    'REST API':{b:'#0d9488',c:'#fff',m:'{ }'},
    'Responsive Design':{b:'#6366f1',s:S('0 0 24 24','fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"','<rect x="2" y="4" width="14" height="10" rx="1.5"/><path d="M6 18h6M9 14v4"/><rect x="18" y="8" width="4" height="9" rx="1"/>')},
    'PHP':{b:'#777bb4',c:'#fff',m:'php'},
    'Laravel':{b:'#ff2d20',c:'#fff',m:'L'},
    'SQL':{b:'#0b7285',s:S('0 0 24 24','fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"','<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.700 3.100 3 7 3s7-1.300 7-3V6M5 12c0 1.700 3.100 3 7 3s7-1.300 7-3"/>')},
    'Python':{b:'linear-gradient(135deg,#3776ab 50%,#ffd43b 50%)',c:'#fff',m:'Py'},
    'Excel':{b:'#217346',c:'#fff',m:'X'},
    'Power BI':{b:'#f2c811',s:S('0 0 24 24','fill="#222"','<rect x="4" y="11" width="4" height="9" rx="1"/><rect x="10" y="6" width="4" height="14" rx="1"/><rect x="16" y="3" width="4" height="17" rx="1"/>')},
    'Git':{b:'#f05032',s:S('0 0 24 24','fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"','<circle cx="7" cy="5.500" r="2" fill="#fff"/><circle cx="7" cy="18.500" r="2" fill="#fff"/><circle cx="17" cy="10" r="2" fill="#fff"/><path d="M7 7.500v9M7 14c0-3 10-1 10-4"/>')},
    'GitHub':{b:'#181717',s:S('0 0 24 24','fill="#fff"','<path d="M12 .5a11.500 11.500 0 0 0-3.640 22.410c.580.100.790-.250.790-.560v-2c-3.200.700-3.880-1.540-3.880-1.540-.520-1.330-1.280-1.690-1.280-1.690-1.050-.720.080-.700.080-.700 1.160.080 1.770 1.190 1.770 1.190 1.030 1.770 2.700 1.260 3.360.960.100-.750.400-1.260.730-1.550-2.550-.290-5.240-1.280-5.240-5.690 0-1.260.450-2.280 1.180-3.090-.120-.290-.510-1.460.110-3.050 0 0 .970-.310 3.170 1.180a11 11 0 0 1 5.770 0c2.200-1.490 3.170-1.180 3.170-1.180.630 1.590.230 2.760.110 3.050.740.810 1.180 1.830 1.180 3.090 0 4.420-2.690 5.390-5.250 5.680.410.360.780 1.060.780 2.140v3.170c0 .310.210.670.800.560A11.500 11.500 0 0 0 12 .5z"/>')}
  };
  document.querySelectorAll('.chip').forEach(function(c){
    var d=L[c.textContent.trim()];if(!d)return;
    var t=document.createElement('i');t.className='lg';t.setAttribute('aria-hidden','true');
    t.style.background=d.b;if(d.c)t.style.color=d.c;t.innerHTML=d.s||d.m;
    c.insertBefore(t,c.firstChild);
  });

  // Project image preview
  var lb=document.getElementById('lb'),lbImg=lb.querySelector('img'),lastBtn=null;
  function closeLb(){lb.classList.remove('open');document.body.style.overflow='';if(lastBtn)lastBtn.focus()}
  document.querySelectorAll('button.shot').forEach(function(b){b.addEventListener('click',function(){
    var im=b.querySelector('img');lbImg.src=im.src;lbImg.alt=im.alt;lastBtn=b;
    lb.classList.add('open');document.body.style.overflow='hidden';lb.querySelector('.lb-x').focus();
  })});
  lb.addEventListener('click',closeLb);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('open'))closeLb()});

  document.getElementById('year').textContent=new Date().getFullYear();
})();

