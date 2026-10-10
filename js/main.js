const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const px=(i,w=1400)=>`https://images.pexels.com/photos/${i}/pexels-photo-${i}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
$$('[data-px]').forEach(e=>e.src=px(e.dataset.px,1000));
$$('[data-bg]').forEach(e=>e.style.backgroundImage=`url(${px(e.dataset.bg,1800)})`);
$$('[data-own]').forEach(e=>e.src='https://gotyoursixcounseling.net/wp-content/uploads/'+e.dataset.own);
const hd=$('#hd'),nv=$('#nv'),cur=location.pathname.split('/').pop()||'index.html';
$$('nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')===cur));
$('#bg').onclick=()=>nv.classList.toggle('o');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
$$('.rv').forEach(e=>io.observe(e));
setTimeout(()=>document.body.classList.add('ready'),100);
/* veterans toggle + tilt */
const vt=$('#vt');
if(vt){const T=["Visit our Northern Virginia office. The Veterans Administration, through Optum, creates an authorization for you to see one of our veteran-focused clinicians in person.","Outside our service area? See a veteran-focused clinician through our telehealth platform. Optum creates your VA authorization, so you can get care wherever you are."];
$$('.tabs button').forEach(b=>b.onclick=()=>{$$('.tabs button').forEach(x=>x.classList.toggle('on',x===b));vt.style.opacity=0;setTimeout(()=>{vt.textContent=T[b.dataset.v];vt.style.opacity=1},250)});
const fr=$('#fr'),w=fr.parentNode;w.onpointermove=e=>{const r=fr.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;fr.style.transform=`rotateY(${x*12}deg) rotateX(${-y*12}deg)`};w.onpointerleave=()=>fr.style.transform=''}
/* scroll: header, hex parallax, pinned clinicians */
const hx=$$('.hex'),sc=$('#sc'),cb=$$('.cb'),dt=$('#dt');
if(sc){dt.innerHTML=cb.map(()=>'<i></i>').join('');sc.style.setProperty('--n',cb.length)}
function sp(){hx.forEach(h=>h.style.transform=`translateY(${scrollY*h.dataset.s*3}px) rotate(${scrollY*h.dataset.s*.2}deg)`);
if(sc){const r=sc.getBoundingClientRect(),p=Math.min(.999,Math.max(0,-r.top/(sc.offsetHeight-innerHeight))),i=Math.floor(p*cb.length);cb.forEach((c,k)=>c.classList.toggle('on',k===i));[...dt.children].forEach((d,k)=>d.classList.toggle('on',k===i))}}
addEventListener('scroll',sp,{passive:true});sp();
$$('.pt[data-photo]').forEach(a=>{const i=new Image();i.onload=()=>a.appendChild(i);i.alt='';i.src=a.dataset.photo});
/* looping slider */
const tk=$('#tk');
if(tk){let busy=0,au,sx=0;const stp=()=>tk.firstElementChild.offsetWidth+20;
const nx=()=>{if(busy)return;busy=1;tk.style.transition='transform .6s';tk.style.transform=`translateX(${-stp()}px)`;setTimeout(()=>{tk.style.transition='none';tk.appendChild(tk.firstElementChild);tk.style.transform='none';busy=0},620)};
const pv=()=>{if(busy)return;busy=1;tk.style.transition='none';tk.insertBefore(tk.lastElementChild,tk.firstElementChild);tk.style.transform=`translateX(${-stp()}px)`;requestAnimationFrame(()=>requestAnimationFrame(()=>{tk.style.transition='transform .6s';tk.style.transform='none'}));setTimeout(()=>busy=0,620)};
$('#nx').onclick=nx;$('#pv').onclick=pv;const run=()=>au=setInterval(nx,4500);run();
tk.parentNode.onmouseenter=()=>clearInterval(au);tk.parentNode.onmouseleave=run;
tk.onpointerdown=e=>sx=e.clientX;tk.onpointerup=e=>{const d=e.clientX-sx;if(d<-40)nx();else if(d>40)pv()}}
