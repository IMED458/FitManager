/* Fit Manager visual and motion layer. */
(() => {
  'use strict';
  const root = document.getElementById('app');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  let lastMain = null;
  let smooth = null;

  function qrArt() {
    let out = '';
    for (let y=0; y<15; y++) for (let x=0; x<15; x++) {
      const marker=(a,b)=>x>=a&&x<a+5&&y>=b&&y<b+5&&(x===a||x===a+4||y===b||y===b+4||(x===a+2&&y===b+2));
      const filled=marker(0,0)||marker(10,0)||marker(0,10)||((x*7+y*13+x*y*3)%11<5&&x+y>7);
      out += `<i class="${filled?'active':''}"></i>`;
    }
    return `<span class="v5-qr" aria-hidden="true">${out}</span>`;
  }
  function decorateCards(main) {
    const cards=main.querySelectorAll('.overview-rail>div');
    if(cards.length!==3)return;
    cards[0].insertAdjacentHTML('afterbegin',`<div class="v5-bento-art v5-art-member" aria-hidden="true"><img src="/assets/dumbbell-chrome.webp" alt=""><span class="v5-status-check">✓</span></div>`);
    cards[1].insertAdjacentHTML('afterbegin',`<div class="v5-bento-art v5-art-checkin" aria-hidden="true"><div class="v5-calendar"><span class="v5-cal-head">ნოემბერი <i>••</i></span><div class="v5-cal-days">${Array.from({length:28},(_,i)=>`<i class="${[3,7,15,18,24].includes(i)?'hit':''}">${i+1}</i>`).join('')}</div></div><div class="v5-qr-pass"><strong>fitmanager</strong>${qrArt()}<span>აქტიური</span></div></div>`);
    cards[2].insertAdjacentHTML('afterbegin',`<div class="v5-bento-art v5-art-finance" aria-hidden="true"><div class="v5-bars">${[39,58,49,76,94].map((n,i)=>`<i style="--bar:${n}%;--bar-index:${i}"></i>`).join('')}</div><div class="v5-chart-shadow"></div></div>`);
    cards.forEach(card=>card.classList.add('v5-tilt'));
  }
  function decorateHero(main) {
    const art=main.querySelector('.hero-art');
    if(art)art.insertAdjacentHTML('beforeend','<span class="v5-hero-orbit" aria-hidden="true"></span>');
  }
  function initializeMotion(main) {
    if(reduced){main.querySelectorAll('.reveal').forEach(el=>el.classList.add('shown'));return;}
    if(window.gsap&&window.ScrollTrigger){
      const {gsap,ScrollTrigger}=window;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.getAll().forEach(trigger=>trigger.kill());
      if(!smooth&&window.Lenis&&!matchMedia('(pointer: coarse)').matches){
        smooth=new window.Lenis({autoRaf:false,duration:1.15,smoothWheel:true});
        smooth.on('scroll',ScrollTrigger.update);
        gsap.ticker.add(time=>smooth.raf(time*1000));
        gsap.ticker.lagSmoothing(0);
      }
      if(main.querySelector('.hero')){
        gsap.from(main.querySelectorAll('.hero-text > *'),{opacity:0,y:16,stagger:.095,duration:.75,ease:'power3.out',clearProps:'all'});
        gsap.from(main.querySelectorAll('.overview-rail>div'),{opacity:0,y:25,stagger:.1,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.overview-rail',start:'top 83%'},clearProps:'opacity,transform'});
        if(fine&&innerWidth>=960){
          gsap.to('.v5-art-member img',{y:-15,rotation:-3,ease:'none',scrollTrigger:{trigger:'.overview-rail',start:'top bottom',end:'bottom top',scrub:1}});
          gsap.to('.v5-qr-pass',{y:20,rotation:2,ease:'none',scrollTrigger:{trigger:'.overview-rail',start:'top bottom',end:'bottom top',scrub:1}});
          gsap.to('.v5-bars',{y:-14,ease:'none',scrollTrigger:{trigger:'.overview-rail',start:'top bottom',end:'bottom top',scrub:1}});
        }
      }
      if(main.querySelector('.journey-stage')){
        gsap.from(main.querySelector('.journey-stage'),{opacity:0,y:20,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'.journey-layout',start:'top 82%'},clearProps:'all'});
      }
      if(main.querySelector('.plan-grid')){
        gsap.from(main.querySelectorAll('.plan'),{opacity:0,y:20,stagger:.09,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.plan-grid',start:'top 85%'},clearProps:'all'});
      }
      ScrollTrigger.refresh();
    }
    if(fine&&innerWidth>=900){
      main.querySelectorAll('.v5-tilt').forEach(card=>{
        card.addEventListener('pointermove',e=>{
          const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
          card.style.setProperty('--tilt-x',`${(-y*3.8).toFixed(2)}deg`);
          card.style.setProperty('--tilt-y',`${(x*4.5).toFixed(2)}deg`);
        });
        card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});
      });
    }
  }
  function enhance() {
    const main=root.querySelector('main');
    if(!main||main===lastMain)return;
    lastMain=main;
    decorateHero(main);decorateCards(main);
    if(document.documentElement.lang==='en') window.FitManagerI18n?.translate(main);
    requestAnimationFrame(()=>initializeMotion(main));
  }
  new MutationObserver(enhance).observe(root,{childList:true});
  enhance();
})();
