/* Fit Manager — marketing pages, navigation and demo request. */
(() => {
  const root = document.getElementById('app');
  // Web3Forms access key (public by design; bound to the info@fitmanager.ge inbox).
  // While empty, the form falls back to opening the visitor's email app.
  const LEAD_ACCESS_KEY = 'f862cf38-957d-41b1-9f88-f6f260a7957c';
  const LEAD_ENDPOINT = 'https://api.web3forms.com/submit';
  const links = [
    ['home', 'მთავარი'], ['features', 'ფუნქციები'], ['how', 'როგორ მუშაობს'], ['portals', 'კაბინეტები'],
    ['pricing', 'ფასები'], ['faq', 'კითხვები']
  ];
  const allRoutes = new Set(['home', 'features', 'how', 'portals', 'pricing', 'faq', 'contact']);
  function readLang() {
    const requested = new URLSearchParams(location.search).get('lang');
    if (requested === 'en' || requested === 'ka') return requested;
    try { return localStorage.getItem('fitmanager-language') === 'en' ? 'en' : 'ka'; }
    catch { return 'ka'; }
  }
  const state = { page: readPage(), menu: false, portal: 'member', lang: readLang() };
  const path = p => p === 'home' ? (state.lang === 'en' ? '/?lang=en' : '/') : `/?page=${p}${state.lang === 'en' ? '&lang=en' : ''}`;
  function readPage() { const p = new URLSearchParams(location.search).get('page') || 'home'; return p === 'app' ? 'contact' : (allRoutes.has(p) ? p : 'home'); }
  if (new URLSearchParams(location.search).get('page') === 'app') history.replaceState({page:'contact'}, '', path('contact'));
  function safe(s) { return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
  function symbol(name) {
    const shapes = {
      users:'<path d="M16 20v-2.2a4.8 4.8 0 0 0-4.8-4.8H6.8A4.8 4.8 0 0 0 2 17.8V20"/><circle cx="9" cy="6.5" r="3.5"/><path d="M21.5 20v-2.2a4.7 4.7 0 0 0-3.4-4.5M15.9 3.4a3.6 3.6 0 0 1 0 6.4"/>',
      ticket:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 5v14M11 9h6M11 13h5"/>',
      scan:'<path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3M3 12h18"/>',
      chart:'<path d="M3 3v18h18"/><path d="M7 16l5-5 3 2 5-7"/>',
      wallet:'<rect x="2.5" y="5" width="19" height="15" rx="2"/><path d="M17 13h4.5M5 5V3h13"/>',
      box:'<path d="m12 2 9 5-9 5-9-5 9-5ZM3 7v10l9 5 9-5V7M12 12v10"/>',
      calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
      check:'<path d="m5 12 4 4L19 6"/>',
      close:'<path d="M5 5 19 19M19 5 5 19"/>',
      menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
      chevron:'<path d="m7 10 5 5 5-5"/>',
      settings:'<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/>',
      phone:'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>',
      pilates:'<path d="M12 3v18M5 8c2 4 5 5 7 5s5-1 7-5M3 17h18"/>',
      yoga:'<circle cx="12" cy="5" r="2"/><path d="M12 8v7m-7-6 7 3 7-3M4 19l8-4 8 4M8 21l4-6 4 6"/>',
      boxing:'<path d="M7 3h8l4 5v6l-3 3H7l-3-4V8l3-5Z M7 17v4h9v-4M10 3v7"/>',
      dance:'<path d="M9 17V5l11-2v12M9 9l11-2"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
      swim:'<path d="M2 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M4 22c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2M12 12l4-4 4 3M6 14l3-6 5 2"/>',
      academy:'<path d="M5 4h14v5c0 4-3 7-7 7s-7-3-7-7V4ZM5 6H2v3c0 3 3 4 5 4M19 6h3v3c0 3-3 4-5 4M12 16v5M7 21h10"/>'
    };
    return `<svg class="line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name] || shapes.chart}</svg>`;
  }
  function logo() {
    return `<a class="brand" data-page="home" href="${path('home')}" aria-label="Fit Manager — მთავარი">
      <img class="brand-logo" src="/assets/fitmanager-brand.png" alt="Fit Manager" width="190" height="64" />
    </a>`;
  }
  function button(p, t, kind = 'dark') { return `<a class="action action-${kind}" href="${path(p)}" data-page="${p}"><span>${t}</span><span class="action-end" aria-hidden="true"></span></a>`; }
  function header() {
    return `<header class="topbar">
      <div class="topbar-inner frame">
        ${logo()}
        <nav class="main-nav" aria-label="მთავარი მენიუ">
          ${links.map(([p,t]) => `<a href="${path(p)}" data-page="${p}" class="${state.page === p ? 'is-current' : ''}">${t}</a>`).join('')}
        </nav>
        <div class="topbar-actions"><a class="nav-contact" href="${path('contact')}" data-page="contact">მოითხოვე დემო</a></div>
        <div class="language-switch" role="group" aria-label="${state.lang === 'en' ? 'Choose language' : 'ენის არჩევა'}">
          <button type="button" data-lang="ka" lang="ka" aria-label="ქართული" aria-pressed="${state.lang === 'ka'}" class="${state.lang === 'ka' ? 'selected' : ''}">KA</button>
          <span aria-hidden="true" class="language-divider"></span>
          <button type="button" data-lang="en" lang="en" aria-label="English" aria-pressed="${state.lang === 'en'}" class="${state.lang === 'en' ? 'selected' : ''}">EN</button>
        </div>
        <button class="hamburger" type="button" data-menu aria-expanded="${state.menu}" aria-label="${state.menu ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}">${symbol(state.menu ? 'close' : 'menu')}</button>
      </div>
      <nav class="mobile-nav ${state.menu ? 'is-open' : ''}" aria-label="მობილური მენიუ">
        ${links.map(([p,t]) => `<a data-page="${p}" href="${path(p)}">${t}</a>`).join('')}
        <a data-page="contact" href="${path('contact')}" class="mobile-demo-link">მოითხოვე დემო</a>
      </nav>
    </header>`;
  }
  function footer() {
    return `<footer class="page-footer"><div class="frame">
      <div class="footer-top">
        <div class="footer-intro">${logo()}<p>სპორტული სივრცეების მართვის პროგრამა</p></div>
        <div class="footer-column"><span class="footer-label">პლატფორმა</span><a data-page="features" href="${path('features')}">ფუნქციები</a><a data-page="how" href="${path('how')}">როგორ მუშაობს</a><a data-page="portals" href="${path('portals')}">კაბინეტები</a></div>
        <div class="footer-column"><span class="footer-label">დამატებით</span><a data-page="pricing" href="${path('pricing')}">ფასები</a><a data-page="faq" href="${path('faq')}">კითხვები</a><a data-page="contact" href="${path('contact')}">მოითხოვე დემო</a></div>
      </div>
      <div class="footer-bottom"><span>© Fit Manager · 2026</span><a href="mailto:info@fitmanager.ge">info@fitmanager.ge</a><a data-page="contact" href="${path('contact')}">მოითხოვე დემო</a></div>
    </div></footer>`;
  }
  function dotLabel(s) { return `<div class="section-label"><span class="square-dot"></span><span>${s}</span></div>`; }
  function hairline(s) { return `<div class="tiny-rule"><span>${s}</span><i></i></div>`; }
  function bars() { return [40,56,44,68,52,78,59,65,87,66,75,98,73,89].map((h,i) => `<span class="${i===11?'is-accent':''}" style="height:${h}%"></span>`).join(''); }
  function dashboardPreview() {
    return `<div class="product-preview" role="img" aria-label="Fit Manager-ის მართვის პანელი">
      <aside class="preview-sidebar"><div class="preview-sidebar-brand"><span class="preview-mini-mark">fm</span><b>fitmanager</b></div>
        <div class="preview-workspace">კლუბის მართვა <span>⌄</span></div>
        <div class="preview-menu"><div class="chosen">${symbol('chart')}<span>მიმოხილვა</span></div><div>${symbol('users')}<span>წევრები</span></div><div>${symbol('ticket')}<span>აბონემენტები</span></div><div>${symbol('scan')}<span>შესვლები</span></div><div>${symbol('wallet')}<span>გადახდები</span></div><div>${symbol('box')}<span>პროდუქტები</span></div></div>
        <div class="preview-sidebar-foot"><span class="mini-avatar">მ</span><span>მენეჯერი<br><small>მართვის პანელი</small></span></div>
      </aside>
      <div class="preview-main">
        <div class="preview-head"><div><span>მართვის პანელი</span><strong>მიმოხილვა</strong></div><div class="preview-date">ბოლო 30 დღე ${symbol('calendar')}</div></div>
        <div class="preview-metrics"><div><small>აქტიური წევრები</small><b>186</b><span>მიმდინარე სტატუსით</span></div><div><small>ვიზიტები დღეს</small><b>42</b><span>შესვლის ჩანაწერები</span></div><div><small>შემოსავალი</small><b>3 240 ₾</b><span>ამ თვის გადახდები</span></div></div>
        <div class="preview-dashboard-grid">
          <div class="preview-chart"><div class="preview-panel-head"><b>ვიზიტების დინამიკა</b><span>ბოლო 14 დღე</span></div><div class="preview-bars">${bars()}</div><div class="preview-axis"><span>ორშ</span><span>ოთხ</span><span>პარ</span><span>კვი</span></div></div>
          <div class="preview-activity"><div class="preview-panel-head"><b>ბოლო შესვლები</b><span>დღეს</span></div>
            <div><i>ნბ</i><span>ნინო ბერიძე<small>ულიმიტო აბონემენტი</small></span><time>09:42</time></div>
            <div><i>გმ</i><span>გიორგი მჭედლიძე<small>12 ვიზიტი</small></span><time>09:18</time></div>
            <div><i>თჯ</i><span>თაკო ჯაფარიძე<small>დილის აბონემენტი</small></span><time>08:56</time></div>
          </div>
        </div>
      </div>
    </div>`;
  }
  function qrPattern() {
    let out = '';
    for (let y=0;y<17;y++) for (let x=0;x<17;x++) {
      const finder=(ox,oy)=>x>=ox&&y>=oy&&x<ox+5&&y<oy+5&&((x-ox===0)||(x-ox===4)||(y-oy===0)||(y-oy===4)||(x-ox===2&&y-oy===2));
      const v=finder(0,0)||finder(12,0)||finder(0,12)||((x*13+y*7+x*y)%11<5&&x+y>6);
      out += `<i class="${v?'on':''}"></i>`;
    }
    return `<div class="qr-pattern" role="img" aria-label="QR კოდი">${out}</div>`;
  }
  const journeySteps = [
    ['წევრის რეგისტრაცია','სახელი, საკონტაქტო ინფორმაცია და აბონემენტის ისტორია ერთ პროფილში ინახება.'],
    ['აბონემენტის გააქტიურება','მიუთითეთ პაკეტი, ვადა და გადახდის ინფორმაცია. სტატუსი წევრის პროფილზე გამოჩნდება.'],
    ['შესვლის დაფიქსირება','წევრი შესასვლელთან განთავსებულ QR კოდს თავისი კაბინეტიდან სკანირებს. საჭიროების შემთხვევაში შესვლას ადმინისტრატორიც აფიქსირებს.'],
    ['დღის შედეგების ნახვა','მართვის პანელზე გადახედეთ ვიზიტებს, გადახდებსა და წევრების აქტივობას.']
  ];
  function scenePanel(i) {
    if(i===0) return `<div class="scene-card member"><div class="scene-top">წევრის პროფილი <span>FM-1001</span></div><div class="scene-person"><i>ნბ</i><div><b>ნინო ბერიძე</b><small>წევრი 2026 წლიდან</small></div><span class="scene-status">აქტიური</span></div><div class="scene-fields"><div>წევრის კოდი<b>FM-1001</b></div><div>აბონემენტი<b>ულიმიტო</b></div><div>ვადა<b>13.12.2026</b></div></div><div class="scene-bottom">ვიზიტების ისტორია <b>ყველა ჩანაწერი</b></div></div>`;
    if(i===1) return `<div class="scene-card subscription"><div class="scene-top">აბონემენტი <span>დადასტურებულია</span></div><div class="subscription-name">ულიმიტო <small>30 დღე</small></div><div class="subscription-progress"><span></span></div><div class="subscription-dates"><div>გააქტიურება<b>14 ნოემბერი</b></div><div>მოქმედებს<b>14 დეკემბრამდე</b></div></div><div class="scene-bottom">გადახდა <b>140 ₾ · ბარათი</b></div></div>`;
    if(i===2) return `<div class="scanner-scene"><div class="entrance-checkin"><div class="entrance-qr-board"><span>FIT MANAGER</span>${qrPattern()}<b>შესვლის QR კოდი</b><small>დაასკანერე შენი კაბინეტიდან</small></div><div class="member-scan-phone"><span>ჩემი კაბინეტი</span><div class="scan-phone-frame">${symbol('scan')}</div><small>QR სკანერი</small></div></div><div class="scan-result"><span class="result-icon">${symbol('check')}</span><div><b>შესვლა დადასტურდა</b><small>ვიზიტი დაფიქსირდა</small></div></div></div>`;
    return `<div class="scene-card reports"><div class="scene-top">დღის ანგარიში <span>დღეს</span></div><div class="report-figure">42 <span>ვიზიტი</span></div><div class="report-bars">${bars()}</div><div class="report-row"><span>დაფიქსირებული გადახდები</span><b>620 ₾</b></div><div class="report-row"><span>ახალი წევრები</span><b>6</b></div></div>`;
  }
  function journey(theme='light') {
    return `<section class="journey-section ${theme==='dark'?'journey-dark':''}" id="journey">
      <div class="frame">
        <div class="journey-heading">${dotLabel('ყოველდღიური სამუშაო')}<h2>როგორ მუშაობს<br>Fit Manager</h2><p>წევრის რეგისტრაციიდან შესვლის კონტროლამდე და დღის ანგარიშამდე — ყველაფერი თანმიმდევრულად.</p></div>
        <div class="journey-layout"><div class="journey-visual"><div class="journey-stage"><div class="stage-cap"><span>FIT MANAGER / WORKFLOW</span><span class="stage-count">01 / 04</span></div>
          <div class="scene-track">${journeySteps.map((_,i)=>`<div class="scene-panel ${i===0?'active':''}" data-scene="${i}">${scenePanel(i)}</div>`).join('')}</div>
          <div class="stage-bottom"><span>წევრები · შესვლები · ანგარიშები</span><div class="stage-dashes"><i class="active"></i><i></i><i></i><i></i></div></div>
        </div></div>
        <div class="journey-steps">${journeySteps.map(([t,d],i)=>`<article class="journey-step ${i===0?'active':''}" data-journey-step="${i}"><div class="journey-number">0${i+1}</div><div><h3>${t}</h3><p>${d}</p></div></article>`).join('')}</div></div>
      </div>
    </section>`;
  }
  function bottomCta() { return `<section class="contact-band"><div class="frame contact-band-grid"><div>${dotLabel('გინდა ნახო პროგრამა?')}<h2>ნახე, როგორ იმუშავებს<br>Fit Manager შენს სივრცეში</h2></div><div><p>მოგვწერე შენი ბიზნესის შესახებ და გამოგიგზავნით დემოს, რომ ფუნქციები თავად ნახო.</p><div class="band-actions">${button('contact','მოითხოვე დემო','lime')}</div></div></div></section>`; }
  const audiences = [
    ['pilates','Pilates / Reformer','პილატესისა და რეფორმერის სტუდიები'],
    ['yoga','იოგას სტუდიები','აბონემენტები, ვიზიტები და გაკვეთილების განრიგი'],
    ['boxing','საბრძოლო ხელოვნების კლუბები','კრივი, სხვადასხვა დისციპლინა და მწვრთნელები'],
    ['dance','ცეკვის სტუდიები','მოსწავლეების აღრიცხვა და დასწრება'],
    ['swim','საცურაო აუზები და სკოლები','საშვები, გაკვეთილები და ვიზიტების კონტროლი'],
    ['academy','სპორტული აკადემიები','სპორტსმენები, მწვრთნელები და ფინანსები']
  ];
  function audienceSection() { return `<section class="audience-section" id="who-uses"><div class="frame"><div class="audience-head"><div>${dotLabel('ვისთვის არის Fit Manager')}<h2>სპორტდარბაზებისთვის<br>და სხვა სპორტული სივრცეებისთვის</h2></div><p>სადაც წევრებს, გაკვეთილებსა და აბონემენტებს მართავ, Fit Manager ყოველდღიურ საქმეს ერთ სისტემაში აერთიანებს.</p></div><div class="audience-grid">${audiences.map(([icon,title,detail])=>`<article class="audience-card reveal"><div class="audience-icon">${symbol(icon)}</div><div><h3>${title}</h3><p>${detail}</p></div></article>`).join('')}</div><div class="audience-bottom"><span>მართე შენი სივრცე Fit Manager-ით</span>${button('contact','მოითხოვე დემო','dark')}</div></div></section>`; }
  function home() {
    return `<section class="hero">
      <div class="frame hero-grid">
        <div class="hero-text">${dotLabel('სპორტული სივრცეების მართვის პროგრამა')}<h1>სპორტული სივრცის <br><em>მართვა ერთ სისტემაში</em></h1>
          <p>წევრები, აბონემენტები, შესვლები, ტრენერები და ფინანსები — ყველაფერი, რაც ყოველდღიურ მუშაობას სჭირდება, ერთ ადგილას.</p>
          <div class="hero-buttons">${button('contact','მოითხოვე დემო','lime')}${button('how','როგორ მუშაობს','outline')}</div>
          <div class="hero-assurance"><span class="tiny-dot"></span>14-დღიანი უფასო საცდელი პერიოდი</div>
        </div>
        <div class="hero-art"><div class="art-index"><span>01 / 03</span><span>MANAGEMENT OVERVIEW</span></div><div class="art-sheet">${dashboardPreview()}</div><div class="hero-product-shadow"></div></div>
      </div>
      <div class="hero-bottom frame"><span>ერთი პროგრამა ძირითადი პროცესებისთვის</span><span>წევრები <i></i> აბონემენტები <i></i> შესვლები <i></i> ფინანსები</span></div>
    </section>
    <section class="overview-section"><div class="frame"><div class="overview-header">${dotLabel('01 / ერთი სისტემა')}<h2>ინფორმაცია იმ ადგილზე,<br>სადაც მუშაობთ</h2><p>აღარ გჭირდებათ წევრების, აბონემენტებისა და გადახდების ცალკე სიებში ძებნა. თითოეული ჩანაწერი შესაბამის განყოფილებაშია თავმოყრილი.</p></div>
      <div class="overview-rail"><div><span class="rail-num">01</span>${symbol('users')}<h3>წევრები</h3><p>პროფილი, აბონემენტი, საკონტაქტო მონაცემები და ვიზიტების ისტორია</p></div><div><span class="rail-num">02</span>${symbol('scan')}<h3>შესვლები</h3><p>აბონემენტის შემოწმება და თითოეული ვიზიტის დაფიქსირება</p></div><div><span class="rail-num">03</span>${symbol('wallet')}<h3>ფინანსები</h3><p>გადახდები, პროდუქტის გაყიდვები და ყოველდღიური შეჯამება</p></div></div>
    </div></section>
    ${journey()}
    <section class="feature-editorial"><div class="frame editorial-grid"><div class="editorial-left">${dotLabel('02 / შესაძლებლობები')}<h2>რისი მართვა შეგიძლიათ<br>Fit Manager-ში</h2><p>ძირითადი ფუნქციები დაკავშირებულია ერთმანეთთან, ამიტომ ერთი ჩანაწერის ხელახლა შეტანა სხვადასხვა განყოფილებაში საჭირო არ არის.</p>${button('features','ყველა ფუნქციის ნახვა','dark')}</div>
      <div class="editorial-right"><div class="editorial-item"><div>${symbol('ticket')}<span>01 / წევრები</span></div><h3>აბონემენტის ისტორია და სტატუსები</h3><p>ვადები, განახლებები და ვიზიტები წევრის პროფილთან ერთად</p></div><div class="editorial-item"><div>${symbol('box')}<span>02 / გაყიდვები</span></div><h3>პროდუქტის გაყიდვა და მარაგი</h3><p>ფასები, რაოდენობები და სალაროში დაფიქსირებული ოპერაციები</p></div><div class="editorial-item"><div>${symbol('chart')}<span>03 / ანგარიშები</span></div><h3>მონაცემები ყოველდღიური გადაწყვეტილებებისთვის</h3><p>წევრების, ვიზიტებისა და ფინანსების მაჩვენებლები ერთ ხედში</p></div></div></div></section>
    ${audienceSection()}
    ${bottomCta()}`;
  }
  function pageIntro(label,title,desc,index) { return `<section class="inner-hero"><div class="frame inner-hero-grid"><div>${dotLabel(label)}<h1>${title}</h1></div><div class="inner-aside"><span class="page-index">${index}</span><p>${desc}</p></div></div></section>`; }
  const featureData=[
    ['users','წევრების ბაზა','პროფილში თავმოყრილია საკონტაქტო ინფორმაცია, აბონემენტები და ვიზიტების ისტორია.','წევრები'],
    ['ticket','აბონემენტები','შექმენით სხვადასხვა ტიპის აბონემენტი, მიუთითეთ ვადა და აკონტროლეთ წევრის სტატუსი.','აბონემენტები'],
    ['scan','შესვლა QR-ით ან ადმინისტრატორთან','შესასვლელთან განთავსებულ QR კოდს წევრი თავისი კაბინეტიდან სკანირებს. ვიზიტის დაფიქსირება ადმინისტრატორსაც შეუძლია.','შესვლის კონტროლი'],
    ['wallet','გადახდები და სალარო','აღრიცხეთ აბონემენტების გადახდები, პროდუქტის გაყიდვები და სალაროს ოპერაციები.','ფინანსები'],
    ['box','პროდუქტები და მარაგი','დაამატეთ პროდუქტი, ფასი და რაოდენობა. გაყიდვისას განაახლეთ ნაშთი.','მარაგი'],
    ['chart','ანგარიშები','ნახეთ აქტიური წევრების რაოდენობა, ვიზიტები და შემოსავლები საჭირო პერიოდში.','ანგარიშგება'],
    ['settings','თანამშრომლების წვდომა','გამოყავით თანამშრომლების როლები და მათი სამუშაო უფლებები.','როლები'],
    ['calendar','წევრისა და ტრენერის კაბინეტები','ვარჯიშისა და კვების გეგმები, პროგრესის კონტროლი, უკუკავშირი და პირადი მიმოწერა.','კაბინეტები']
  ];
  function features() { return `${pageIntro('პროგრამის შესაძლებლობები','ყველა ძირითადი ფუნქცია<br>ერთ სამუშაო გარემოში','წევრების, ვიზიტების, გადახდებისა და მწვრთნელობისთვის საჭირო ინსტრუმენტები ერთად.','01 / პროდუქტი')}
    <section class="features-section"><div class="frame features-layout"><div class="features-anchor"><span class="small-caps">FIT MANAGER / MODULES</span><h2>ყველაფერი იწყება<br>წევრის პროფილით</h2><p>ერთმანეთთან დაკავშირებული მონაცემები აადვილებს ანგარიშგებას და ყოველდღიურ ადმინისტრირებას.</p><div class="features-graphic"><div class="orbital-center">fm</div><span>წევრი</span><span>აბონემენტი</span><span>ვიზიტი</span><span>გადახდა</span></div></div>
      <div class="features-rows">${featureData.map(([i,t,d,tag],n)=>`<article class="feature-row reveal"><div class="row-index">${String(n+1).padStart(2,'0')}</div><div class="row-icon">${symbol(i)}</div><div><span class="row-tag">${tag}</span><h3>${t}</h3><p>${d}</p></div></article>`).join('')}</div>
    </div></section>${audienceSection()}${bottomCta()}`; }
  function how() { return `${pageIntro('სამუშაო პროცესი','პროგრამის გამოყენება<br>ოთხ ნაბიჯში','წევრის დამატება, აბონემენტის გააქტიურება, შესვლის დაფიქსირება და დღის ანგარიშის ნახვა.','02 / პროცესი')}${journey('dark')}<section class="how-detail"><div class="frame how-grid"><div>${dotLabel('წევრისა და ტრენერის კაბინეტები')}<h2>ვარჯიშის გეგმა, კვება<br>და პროგრესი ერთად</h2></div><p>ტრენერი ადგენს ინდივიდუალურ პროგრამას, წევრი კი საკუთარ კაბინეტში ხედავს გეგმას, აფიქსირებს შესრულებულ ვარჯიშებსა და ცვლილებებს. ორივეს შეუძლია შედეგებზე მიმოწერა.<br><a data-page="portals" href="${path('portals')}">კაბინეტების ნახვა</a></p></div></section>${bottomCta()}`; }
  function portalPhone(trainer=false) { return `<div class="phone-case"><div class="phone-notch"></div><div class="phone-content"><div class="phone-app-head"><span class="mini-brand">fm</span><span>${trainer?'ტრენერი':'წევრი'}</span></div><div class="phone-greeting">გამარჯობა,<br><b>${trainer?'ლევან':'ნინო'}</b></div>
    ${trainer?`<div class="phone-pass trainer-pass"><small>ვარჯიშის პროგრამები</small><b>წევრების პროგრესი</b><div class="phone-session"><span>დღეს</span><strong>ანა მაისურაძე</strong></div><div class="phone-session"><span>გეგმა</span><strong>გიორგი მჭედლიძე</strong></div></div><div class="phone-facts"><div><b>18</b><span>კლიენტი</span></div><div><b>24</b><span>სესია თვეში</span></div></div>`:`<div class="phone-pass"><small>ჩემი დღე</small><b>დღევანდელი ვარჯიში</b><div class="phone-session"><span>✓</span><strong>პროგრამა მზადაა</strong></div><div class="phone-session"><span>QR</span><strong>შესვლის სკანერი</strong></div></div><div class="phone-facts"><div><b>12</b><span>დღე აბონემენტში</span></div><div><b>8</b><span>ვიზიტი ამ თვეში</span></div></div>`}
  </div></div>`; }
  const portalCapabilities = {
    trainer: [
      ['calendar','ვარჯიშის დაგეგმვა',[
        ['ვარჯიშის პროგრამების შექმნა','ინდივიდუალური გეგმა სავარჯიშო დღეებით, სეტებით, გამეორებებით, დატვირთვითა და დასვენების დროით.'],
        ['პროგრამების შაბლონები','შეინახე და შეცვალე პროგრამები, შემდეგ კი სხვა წევრებსაც მიანიჭე.'],
        ['სავარჯიშოების ბაზა','აირჩიე სავარჯიშოები ბაზიდან და დაამატე პროგრამაში.'],
        ['ვარჯიშის ისტორია','ნახე შესრულებული ვარჯიშები, გამეორებები და გამოყენებული წონები.']
      ]],
      ['box','კვების გეგმები',[
        ['კვების პროგრამები','შეადგინე კვების განრიგი პროდუქტებით, ულუფებითა და კალორიებით.'],
        ['ქართული პროდუქტების ბაზა','აირჩიე ადგილობრივი პროდუქტები და დაითვალე საორიენტაციო კალორიები, ცილები, ცხიმები და ნახშირწყლები.']
      ]],
      ['chart','მიზნები და პროგრესი',[
        ['წევრის მიზნები','განსაზღვრე წონის კლების, კუნთოვანი მასის ზრდისა და სხვა მიზნები.'],
        ['წონის კონტროლი','ნახე მიმდინარე და მიზნობრივი წონა, ცვლილებების ისტორია და გრაფიკები.'],
        ['სხეულის გაზომვები','აკონტროლე წელის, თეძოსა და მკერდის ზომები.'],
        ['პროგრესის ფოტოები','შეადარე წევრის მიერ ატვირთული ფოტოები.']
      ]],
      ['users','უკუკავშირი და ანალიტიკა',[
        ['ყოველკვირეული შეფასებები','გაეცანი წევრის ენერგიის, ძილისა და გეგმის შესრულების შეფასებებს.'],
        ['ტრენერის უკუკავშირი','უპასუხე შეფასებებს და გაუგზავნე რეკომენდაციები.'],
        ['პირადი მიმოწერა','გქონდეს პირდაპირი მიმოწერა შენს წევრებთან.'],
        ['წევრების ანალიტიკა','ერთად ნახე პროგრამები, ბოლო გაზომვები და შეფასებები.']
      ]]
    ],
    member: [
      ['calendar','ჩემი დღე და ვარჯიში',[
        ['ჩემი დღე','დღევანდელი ვარჯიში, კვება, წყალი და აქტივობა ერთ ხედში.'],
        ['ჩემი ვარჯიშის პროგრამა','ნახე ტრენერის მიერ შენთვის შედგენილი პროგრამა.'],
        ['ვარჯიშის აღრიცხვა','ჩაწერე შესრულებული სეტები, გამეორებები და გამოყენებული წონები.']
      ]],
      ['box','კვება და წყალი',[
        ['ჩემი კვების გეგმა','ნახე ტრენერის მიერ შედგენილი მენიუ და კალორიული მიზნები.'],
        ['კვების დღიური','აღრიცხე პროდუქტები, კალორიები, ცილები, ცხიმები და ნახშირწყლები.'],
        ['წყლის კონტროლი','მიუთითე დღის განმავლობაში მიღებული წყლის რაოდენობა.']
      ]],
      ['chart','წონა და სხეულის პროგრესი',[
        ['წონის დღიური','დაამატე წონა ყოველდღიურად ან შენთვის მოსახერხებელი სიხშირით.'],
        ['წონის გრაფიკი','დააკვირდი ცვლილებებსა და მიზნამდე დარჩენილ გზას.'],
        ['სხეულის გაზომვები','ჩაწერე წელის, მკერდისა და თეძოს ზომები.'],
        ['პროგრესის ფოტოები','ატვირთე ფოტოები და შეადარე შედეგები.']
      ]],
      ['users','აქტივობა და ტრენერთან კავშირი',[
        ['ძილის კონტროლი','აღრიცხე ძილის ხანგრძლივობა.'],
        ['აქტივობის კონტროლი','შეიტანე ნაბიჯები და აქტივობის წუთები.'],
        ['კვირის ანგარიში','შეავსე ყოველკვირეული შეფასება და გაუგზავნე ტრენერს.'],
        ['შეხსენებები','მიიღე შეხსენებები აწონვისა და ყოველკვირეული შეფასებისთვის.'],
        ['ტრენერთან მიმოწერა','დასვი კითხვები და მიიღე პასუხები საკუთარ კაბინეტში.']
      ]]
    ]
  };
  const portalFlows = [
    ['ვარჯიშის გეგმა','ტრენერი ადგენს პროგრამას','წევრი ხედავს გეგმას და აფიქსირებს შესრულებას'],
    ['შესრულებული ვარჯიშები','წევრი წერს სეტებსა და წონებს','ტრენერი აკვირდება შედეგებს'],
    ['კვების პროგრამა','ტრენერი ადგენს ინდივიდუალურ მენიუს','წევრი ხედავს მენიუს და ავსებს კვების დღიურს'],
    ['სხეულის პროგრესი','წევრი ამატებს წონასა და გაზომვებს','ტრენერი ხედავს ცვლილებების ისტორიას'],
    ['კვირის შეფასება','წევრი აფასებს გასულ კვირას','ტრენერი პასუხობს და უზიარებს რეკომენდაციებს']
  ];
  function portalDetails() { const trainer=state.portal==='trainer'; return `<section class="portal-capabilities" id="portal-capabilities"><div class="frame"><div class="portal-capabilities-head">${dotLabel('კაბინეტის ფუნქციები')}<h2>${trainer?'ყველაფერი, რაც ტრენერს სჭირდება':'ყველაფერი, რაც წევრს სჭირდება'}</h2><p>${trainer?'პროგრამების შექმნა, კვება, პროგრესის მონიტორინგი და წევრებთან კომუნიკაცია.':'დღის გეგმა, ვარჯიშისა და კვების აღრიცხვა, მიზნები და ტრენერთან კავშირი.'}</p></div><div class="portal-detail-grid">${portalCapabilities[state.portal].map(([icon,title,items],i)=>`<details class="portal-detail" ${i===0?'open':''}><summary><span class="portal-detail-icon">${symbol(icon)}</span><strong>${title}</strong><span class="portal-detail-toggle" aria-hidden="true">+</span></summary><ul>${items.map(([t,d])=>`<li><b>${t}</b><p>${d}</p></li>`).join('')}</ul></details>`).join('')}</div></div></section>`; }
  function portals() { const trainer=state.portal==='trainer'; return `${pageIntro('პირადი კაბინეტები','ტრენერისა და წევრის<br>სრული სამუშაო გარემო','ვარჯიშის პროგრამები, კვების გეგმები, წონის კონტროლი და შედეგები ერთმანეთთან არის დაკავშირებული.','03 / კაბინეტები')}
    <section class="portals-section"><div class="frame portals-grid"><div class="portals-copy">${dotLabel('ორი სამუშაო გარემო')}<div class="portal-toggle" role="tablist" aria-label="კაბინეტის არჩევა"><button data-portal="member" role="tab" aria-selected="${!trainer}" class="${!trainer?'chosen':''}">წევრი</button><button data-portal="trainer" role="tab" aria-selected="${trainer}" class="${trainer?'chosen':''}">ტრენერი</button></div>
      <h2>${trainer?'შეადგინე პროგრამა და აკონტროლე პროგრესი':'შენი გეგმა და შედეგები ერთ ადგილას'}</h2><p>${trainer?'ტრენერი აწყობს ვარჯიშისა და კვების გეგმებს, აკვირდება ცვლილებებს და წევრებს საკუთარ კაბინეტში პასუხობს.':'წევრი ხედავს ვარჯიშისა და კვების გეგმებს, აღრიცხავს პროგრესს და ურთიერთობს ტრენერთან.'}</p>
      <ul class="portal-list">${(trainer?['ინდივიდუალური პროგრამები და შაბლონები','კვების გეგმები და ქართული პროდუქტების ბაზა','მიზნები, გაზომვები და უკუკავშირი']:['ვარჯიშისა და კვების დღიურები','წონის, წყლის, ძილისა და აქტივობის კონტროლი','შესასვლელის QR სკანერი და ტრენერთან მიმოწერა']).map(t=>`<li>${symbol('check')}${t}</li>`).join('')}</ul>
      ${button('contact','მოითხოვე დემო','dark')}</div>
      <div class="portals-stage"><div class="portal-stage-meta"><span>${trainer?'TRAINER VIEW':'MEMBER VIEW'}</span><span>${trainer?'ტრენერის კაბინეტი':'წევრის კაბინეტი'}</span></div>${portalPhone(trainer)}<div class="portal-stage-caption">${trainer?'პროგრამებისა და წევრების მიმოხილვა':'დღიური გეგმა და შესვლა'}</div></div></div></section>
    ${portalDetails()}
    <section class="portal-flow-section"><div class="frame"><div class="portal-flow-heading">${dotLabel('ერთიანი სამუშაო პროცესი')}<h2>ტრენერი გეგმავს, წევრი ასრულებს</h2><p>შედეგები ორივე კაბინეტში აისახება, ამიტომ მუშაობის გაგრძელება იქიდან შეგიძლიათ, სადაც შეჩერდით.</p></div><div class="portal-flow-list">${portalFlows.map(([title,from,to])=>`<div class="portal-flow-row"><strong>${title}</strong><span>${from}</span><i aria-hidden="true">→</i><span>${to}</span></div>`).join('')}</div></div></section>
    <section class="roles-section"><div class="frame">${dotLabel('წვდომა როლის მიხედვით')}<h2>ყველას თავისი სამუშაო სივრცე აქვს</h2><div class="role-rail"><div><span>01</span><h3>ადმინისტრატორი</h3><p>წევრები, აბონემენტები, შესვლები, გადახდები და ანგარიშები</p></div><div><span>02</span><h3>წევრი</h3><p>QR-ით შესვლა, გეგმები, დღიურები და საკუთარი პროგრესი</p></div><div><span>03</span><h3>ტრენერი</h3><p>პროგრამები, კვება, წევრების ანალიტიკა და უკუკავშირი</p></div></div></div></section>${bottomCta()}`; }
  const plans = [
    {n:'Basic',p:'99',d:'მცირე სპორტული სივრცისთვის',limits:'200 წევრამდე · 2 თანამშრომელი',list:['წევრების ბაზა','აბონემენტები','QR-ით შესვლა','ძირითადი ანგარიშები']},
    {n:'Growth',p:'179',d:'მზარდი კლუბისთვის ან სტუდიისთვის',limits:'700 წევრამდე · 5 თანამშრომელი',list:['Basic-ის ფუნქციები','პროდუქტები და მარაგი','ფინანსური ანგარიშები','წევრის კაბინეტი']},
    {n:'Pro',p:'299',d:'გაფართოებული მართვისთვის',limits:'2 000 წევრამდე · 15 თანამშრომელი',list:['Growth-ის ფუნქციები','ტრენერის კაბინეტი','პერსონალური სესიები','გაფართოებული ანგარიშები']},
    {n:'Enterprise',p:'499',d:'რამდენიმე ლოკაციისთვის',limits:'ინდივიდუალური პირობები',list:['რამდენიმე ლოკაცია','მიგრაციის დახმარება','ინდივიდუალური ინტეგრაციები','მხარდაჭერის პირობები']}
  ];
  function pricing() {return `${pageIntro('პაკეტები და ფასები','აირჩიე პაკეტი<br>შენი სივრცისთვის','შეადარე ფუნქციები და წევრების ლიმიტები. შეგიძლია დაიწყო მცირე პაკეტით და გაზარდო საჭიროების მიხედვით.','04 / პაკეტები')}
    <section class="pricing-section"><div class="frame">${hairline('თვიური ტარიფები')}<div class="plan-grid">${plans.map((p,i)=>`<article class="plan"><div class="plan-top"><span>0${i+1}</span><span>${p.n}</span></div><div class="plan-heading"><h3>${p.n}</h3><p>${p.d}</p></div><div class="plan-price">${state.lang==='en'&&i===3?'<small class="price-from">from</small>':''}<b>${state.lang==='en'?'₾':''}${p.p}</b><span>${state.lang==='en'?'/ month':(i===3?'₾-დან / თვე':'₾ / თვე')}</span></div><div class="plan-limits">${p.limits}</div><ul>${p.list.map(v=>`<li>${symbol('check')}${v}</li>`).join('')}</ul>${button('contact','მოითხოვე დემო',i===1?'dark':'plain')}</article>`).join('')}</div>
      <div class="pricing-notice"><b>14-დღიანი უფასო საცდელი პერიოდი</b><p>გინდა პროგრამა ჯერ გამოსცადო? <a data-page="contact" href="${path('contact')}">მოითხოვე დემო</a> და დაგეხმარებით დაწყებაში. პაკეტის შერჩევასთან დაკავშირებული კითხვებისთვის მოგვწერე ელფოსტაზე: <a href="mailto:info@fitmanager.ge">info@fitmanager.ge</a></p></div></div></section>${bottomCta()}`; }
  const faqs = [
    ['ვისთვის არის Fit Manager?','სპორტდარბაზებთან ერთად პროგრამა გამოდგება Pilates / Reformer და იოგას სტუდიებისთვის, საბრძოლო ხელოვნებისა და ცეკვის კლუბებისთვის, საცურაო სკოლებისა და სპორტული აკადემიებისთვის.'],
    ['როგორ ხდება QR-ით შესვლა?','შესასვლელთან განთავსებულ QR კოდს წევრი საკუთარი კაბინეტიდან სკანირებს. პროგრამა ამოწმებს აბონემენტს და აფიქსირებს ვიზიტს. საჭიროების შემთხვევაში წევრის შესვლას ადმინისტრატორიც აფიქსირებს.'],
    ['არის თუ არა საცდელი პერიოდი?','დიახ. Fit Manager შეგიძლია 14 დღის განმავლობაში უფასოდ გამოსცადო. მოგვწერე დემოს მოთხოვნა და დაწყებაში დაგეხმარებით.'],
    ['შესაძლებელია ძველი წევრების ბაზის გადმოტანა?','Enterprise პაკეტში მონაცემების გადმოტანაშიც დაგეხმარებით. სხვა პაკეტებისთვის შესაძლებლობები ინდივიდუალურად განვიხილოთ.'],
    ['რას ხედავს წევრი თავის კაბინეტში?','წევრი ხედავს აბონემენტს, შესვლის QR სკანერს, ვარჯიშისა და კვების გეგმებს, წონის გრაფიკებსა და საკუთარ პროგრესს.'],
    ['რა ფუნქციები აქვს ტრენერის კაბინეტს?','ტრენერი ადგენს ვარჯიშისა და კვების პროგრამებს, იყენებს შაბლონებსა და პროდუქტების ბაზას, აკვირდება წონასა და გაზომვებს და იღებს წევრების შეფასებებს.'],
    ['შეიძლება პროგრამის მობილურიდან გამოყენება?','დიახ. Fit Manager-ის კაბინეტები მორგებულია ტელეფონისა და პლანშეტის ეკრანებზე.'],
    ['როგორ მოვითხოვო დემო?','შეავსე მოთხოვნის ფორმა ან მოგვწერე info@fitmanager.ge-ზე. დემოს ბმულს ელფოსტით გამოგიგზავნით.']
  ];
  function faq() {return `${pageIntro('ხშირად დასმული კითხვები','რაც უნდა იცოდეთ<br>პროგრამის შერჩევამდე','პასუხები ძირითად კითხვებზე — ფუნქციების, წვდომის, პაკეტებისა და საცდელი პერიოდის შესახებ.','05 / კითხვები')}
    <section class="faq-section"><div class="frame faq-layout"><div class="faq-note">${dotLabel('კიდევ გაქვს კითხვა?')}<h2>მოგვწერე და დაგეხმარებით</h2><p>გაინტერესებს კონკრეტული ფუნქცია ან პაკეტი? მოგვწერე შენს საჭიროებებზე და ყველაფერს აგიხსნით.</p>${button('contact','მოითხოვე დემო','dark')}</div><div class="faq-list">${faqs.map(([q,a],i)=>`<article class="faq-item ${i===0?'open':''}"><button type="button" class="faq-q" data-faq aria-expanded="${i===0}"><span>${String(i+1).padStart(2,'0')}</span><b>${q}</b>${symbol('chevron')}</button><div class="faq-a"><p>${a}</p></div></article>`).join('')}</div></div></section>`; }
  function contact() { return `${pageIntro('მოითხოვე დემო','ნახე Fit Manager<br>შენი ბიზნესისთვის','მოგვწერე რას მართავ და რომელი ფუნქციები გაინტერესებს. დემოს ბმულს შენს ელფოსტაზე გამოგიგზავნით.','06 / დემო')}
    <section class="request-section"><div class="frame request-layout"><div class="request-info"><div>${dotLabel('დაგვიკავშირდი')}<h2>მოგვწერე შენი სივრცის შესახებ</h2><p class="request-intro">დემო დაგეხმარება ნახო, როგორ მართავ წევრებს, შესვლებს, გადახდებსა და ტრენერების სამუშაოს ერთ სისტემაში.</p></div><div class="request-points"><div><span>01</span><b>შეავსე მოკლე ფორმა</b></div><div><span>02</span><b>${LEAD_ACCESS_KEY?'გამოგვიგზავნე მოთხოვნა':'მოთხოვნა გამოგვიგზავნე ელფოსტით'}</b></div><div><span>03</span><b>დემოს ბმულს გამოგიგზავნით</b></div></div><div class="request-email"><span>ელფოსტა</span><a href="mailto:info@fitmanager.ge?subject=Fit%20Manager%20%E2%80%94%20%E1%83%93%E1%83%94%E1%83%9B%E1%83%9D%E1%83%A1%20%E1%83%9B%E1%83%9D%E1%83%97%E1%83%AE%E1%83%9D%E1%83%95%E1%83%9C%E1%83%90">info@fitmanager.ge</a></div></div>
      <form class="request-form demo-request-form" data-demo-form><div class="form-heading"><span>დემოს მოთხოვნა</span><span>FIT MANAGER</span></div><div class="form-fields">
        <label for="demo-name">სახელი და გვარი<input id="demo-name" name="name" type="text" autocomplete="name" placeholder="შენი სახელი" required maxlength="100"></label>
        <label for="demo-email">ელფოსტა<input id="demo-email" name="email" type="email" autocomplete="email" placeholder="name@example.com" required maxlength="150"></label>
        <label for="demo-phone">ტელეფონის ნომერი<input id="demo-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+995 5XX XX XX XX" required minlength="9" maxlength="25" pattern="[+]?[0-9][0-9 ()-]{7,23}"></label>
        <label for="demo-business">სივრცის სახელი<input id="demo-business" name="business" type="text" placeholder="კლუბი ან სტუდია" required maxlength="140"></label>
        <label for="demo-type">სივრცის ტიპი<select id="demo-type" name="type" required><option value="" disabled selected>აირჩიე</option><option>სპორტდარბაზი / ფიტნესკლუბი</option><option>Pilates / Reformer სტუდია</option><option>იოგას სტუდია</option><option>კრივისა და საბრძოლო ხელოვნების კლუბი</option><option>ცეკვის სტუდია</option><option>საცურაო აუზი ან სკოლა</option><option>სპორტული აკადემია</option><option>სხვა</option></select></label>
        <label for="demo-message" class="form-full">რა გაინტერესებს? <span class="field-optional">(არასავალდებულო)</span><textarea id="demo-message" name="message" rows="4" maxlength="2000" placeholder="მოგვწერე, რაში გჭირდება Fit Manager"></textarea></label>
      </div><input type="checkbox" name="botcheck" hidden tabindex="-1" autocomplete="off" aria-hidden="true"><button type="submit" class="action form-submit"><span>მოითხოვე დემო</span></button><p class="form-privacy">${LEAD_ACCESS_KEY?'მონაცემებს დემოს მოთხოვნაზე პასუხისთვის გამოვიყენებთ. ფორმა Web3Forms-ის მეშვეობით იგზავნება.':'ღილაკზე დაჭერის შემდეგ გაიხსნება შენი ელფოსტის აპი მზა წერილით. მოთხოვნის გასაგზავნად დააჭირე „გაგზავნას“.'}</p><p class="form-send-note" role="status" aria-live="polite"></p></form>
    </div></section>`; }
  const pages={home,features,how,portals,pricing,faq,contact};
  const titles={home:'მთავარი',features:'ფუნქციები',how:'როგორ მუშაობს',portals:'კაბინეტები',pricing:'ფასები',faq:'კითხვები',contact:'მოითხოვე დემო'};
  let pageObserver=null, journeyObserver=null;
  function activateScene(index) {
    document.querySelectorAll('[data-scene]').forEach(el=>el.classList.toggle('active',Number(el.dataset.scene)===index));
    document.querySelectorAll('[data-journey-step]').forEach(el=>el.classList.toggle('active',Number(el.dataset.journeyStep)===index));
    const count=document.querySelector('.stage-count');if(count)count.textContent=`${String(index+1).padStart(2,'0')} / 04`;
    document.querySelectorAll('.stage-dashes i').forEach((el,i)=>el.classList.toggle('active',i===index));
  }
  const compact=window.matchMedia('(max-width:760px)');
  // Phones: the four scenes are a swipeable row instead of a scroll-driven stage.
  function showScene(index,reveal) {
    const track=document.querySelector('.scene-track');if(!track)return;
    const still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({left:index*track.clientWidth,behavior:still?'instant':'smooth'});
    activateScene(index);
    if(reveal){const visual=document.querySelector('.journey-visual');const top=visual.getBoundingClientRect().top+window.scrollY-84;window.scrollTo({top,behavior:still?'instant':'smooth'});}
  }
  function mountSceneTrack() {
    const track=document.querySelector('.scene-track');if(!track)return;
    let timer;
    track.addEventListener('scroll',()=>{if(!compact.matches)return;clearTimeout(timer);timer=setTimeout(()=>activateScene(Math.round(track.scrollLeft/Math.max(1,track.clientWidth))),70);},{passive:true});
  }
  function setMenu(open) {
    state.menu=open;
    const button=root.querySelector('[data-menu]');
    root.querySelector('.mobile-nav')?.classList.toggle('is-open',open);
    if(!button)return;
    const label=open?'მენიუს დახურვა':'მენიუს გახსნა';
    button.setAttribute('aria-expanded',String(open));
    button.setAttribute('aria-label',state.lang==='en'?(window.FitManagerI18n?.en[label]||label):label);
    button.innerHTML=symbol(open?'close':'menu');
  }
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.menu)setMenu(false);});
  document.addEventListener('click',e=>{if(state.menu&&e.target.isConnected&&!e.target.closest('.topbar'))setMenu(false);});
  function mountPage() {
    mountSceneTrack();
    if(pageObserver)pageObserver.disconnect();if(journeyObserver)journeyObserver.disconnect();
    if('IntersectionObserver' in window) {
      pageObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('shown');pageObserver.unobserve(e.target);}}),{threshold:.09});
      document.querySelectorAll('.reveal').forEach(el=>pageObserver.observe(el));
      journeyObserver=new IntersectionObserver(es=>{for(const e of es)if(e.isIntersecting&&!compact.matches)activateScene(Number(e.target.dataset.journeyStep));},{rootMargin:'-34% 0px -34% 0px',threshold:0});
      document.querySelectorAll('[data-journey-step]').forEach(el=>journeyObserver.observe(el));
    } else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('shown'));
  }
  function render() {
    const english = state.lang === 'en';
    document.documentElement.lang = state.lang;
    const pageName = english ? (window.FitManagerI18n?.en[titles[state.page]] || titles[state.page]) : titles[state.page];
    document.title = english ? `${pageName} | Fit Manager — Fitness Business Management` : `${pageName} | Fit Manager — სპორტული სივრცეების მართვის პროგრამა`;
    const description = english
      ? 'Fit Manager helps gyms, studios and sports clubs manage memberships, check-ins, trainers, nutrition plans, payments and reporting in one place.'
      : 'Fit Manager — სპორტდარბაზების, სტუდიებისა და სპორტული კლუბების მართვის სისტემა. წევრები, აბონემენტები, შესვლები, ტრენერები, კვება და ფინანსები ერთ სივრცეში.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', english ? 'Fit Manager — Fitness Business Management' : 'Fit Manager — სპორტული სივრცეების მართვის პროგრამა');
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    root.innerHTML=`${header()}<main id="main">${pages[state.page]()}</main>${footer()}`;
    if(english) window.FitManagerI18n?.translate(root);
    mountPage();requestAnimationFrame(moveProduct);
  }
  function go(p) { if(!allRoutes.has(p))return;state.page=p;state.menu=false;history.pushState({page:p},'',path(p));render();window.scrollTo({top:0,behavior:'instant'}); }
  root.addEventListener('click',e=>{
    const a=e.target.closest('[data-page]');if(a){e.preventDefault();go(a.dataset.page);return;}
    const lang=e.target.closest('[data-lang]');if(lang){
      const next=lang.dataset.lang;if(next!== 'en' && next!== 'ka' || next===state.lang)return;
      state.lang=next;
      try{localStorage.setItem('fitmanager-language',next);}catch{}
      history.replaceState({page:state.page,lang:next},'',path(state.page));
      render();return;
    }
    const menu=e.target.closest('[data-menu]');if(menu){setMenu(!state.menu);return;}
    const step=e.target.closest('[data-journey-step]');if(step&&compact.matches){showScene(Number(step.dataset.journeyStep),true);return;}
    const p=e.target.closest('[data-portal]');if(p){state.portal=p.dataset.portal;const y=window.scrollY;render();window.scrollTo(0,y);return;}
    const faq=e.target.closest('[data-faq]');if(faq){const row=faq.closest('.faq-item');const open=row.classList.toggle('open');faq.setAttribute('aria-expanded',String(open));return;}
  });
  async function sendLead(form,status,subject,body,english) {
    if(form.dataset.sending)return;
    const fields=new FormData(form);
    const submit=form.querySelector('.form-submit');
    const say=text=>{if(status)status.textContent=text;};
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),20000);
    form.dataset.sending='1';submit.disabled=true;
    say(english?'Sending…':'იგზავნება…');
    try {
      // Form-encoded body: a simple CORS request, so no preflight can block it.
      const payload=new FormData();
      const values={access_key:LEAD_ACCESS_KEY,subject,from_name:'Fit Manager',replyto:String(fields.get('email')||'').trim(),message:body};
      Object.entries(values).forEach(([key,value])=>payload.append(key,value));
      if(fields.has('botcheck'))payload.append('botcheck','on');
      const response=await fetch(LEAD_ENDPOINT,{method:'POST',signal:controller.signal,headers:{Accept:'application/json'},body:payload});
      const result=await response.json().catch(()=>null);
      if(!response.ok||!result?.success)throw new Error(`Lead delivery failed: ${response.status}`);
      form.reset();
      say(english?'Thank you! Your request has been sent. We’ll email you the demo link.':'გმადლობთ! მოთხოვნა გაგზავნილია. დემოს ბმულს ელფოსტით გამოგიგზავნით.');
    } catch {
      say(english?'Your request could not be sent. Please try again or email us at info@fitmanager.ge.':'მოთხოვნა ვერ გაიგზავნა. სცადე თავიდან ან მოგვწერე info@fitmanager.ge-ზე.');
    } finally {
      clearTimeout(timer);delete form.dataset.sending;submit.disabled=false;
    }
  }
  root.addEventListener('submit',e=>{
    const form=e.target.closest('[data-demo-form]');
    if(!form)return;
    e.preventDefault();
    const fields=new FormData(form);
    const english=state.lang==='en';
    const subject=english ? `Fit Manager — Demo Request — ${String(fields.get('business')||'').trim()}` : `Fit Manager — დემოს მოთხოვნა — ${String(fields.get('business')||'').trim()}`;
    const body=english ? [
      'Hello,',
      '',
      'I would like to request a Fit Manager demo.',
      '',
      `Full name: ${String(fields.get('name')||'').trim()}`,
      `Email: ${String(fields.get('email')||'').trim()}`,
      `Phone number: ${String(fields.get('phone')||'').trim()}`,
      `Business: ${String(fields.get('business')||'').trim()}`,
      `Business type: ${String(fields.get('type')||'').trim()}`,
      '',
      'Additional details:',
      String(fields.get('message')||'').trim() || '—'
    ].join('\n') : [
      'გამარჯობა,',
      '',
      'მინდა Fit Manager-ის დემოს მიღება.',
      '',
      `სახელი და გვარი: ${String(fields.get('name')||'').trim()}`,
      `ელფოსტა: ${String(fields.get('email')||'').trim()}`,
      `ტელეფონის ნომერი: ${String(fields.get('phone')||'').trim()}`,
      `სივრცის სახელი: ${String(fields.get('business')||'').trim()}`,
      `სივრცის ტიპი: ${String(fields.get('type')||'').trim()}`,
      '',
      'დამატებითი ინფორმაცია:',
      String(fields.get('message')||'').trim() || '—'
    ].join('\n');
    const status=form.querySelector('.form-send-note');
    if(LEAD_ACCESS_KEY){sendLead(form,status,subject,body,english);return;}
    if(status)status.textContent=english ? 'Press Send in your email app. If it doesn’t open, email us directly at info@fitmanager.ge.' : 'ელფოსტის აპში დააჭირე „გაგზავნას“. თუ აპი არ გაიხსნა, მოგვწერე პირდაპირ info@fitmanager.ge-ზე.';
    window.location.href=`mailto:info@fitmanager.ge?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  window.addEventListener('popstate',()=>{state.page=readPage();state.lang=readLang();state.menu=false;render();});
  let ticking=false;
  function moveProduct(){ticking=false;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const art=document.querySelector('.art-sheet');if(art){const rect=document.querySelector('.hero').getBoundingClientRect();const t=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height)));art.style.setProperty('--scroll-shift',`${t*22}px`);}const scan=document.querySelector('.scanner-3d');if(scan){const rect=document.querySelector('.journey-section').getBoundingClientRect();const t=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height)));scan.style.setProperty('--scan-rot',`${-13+25*t}deg`);}}
  window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(moveProduct);}},{passive:true});
  render();
})();
