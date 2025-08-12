// ===== CONFIG =====
const API_BASE = 'https://script.google.com/macros/s/AKfycbyDT4iTuMXoeeJ4xnnlt2tc-0DCuaJjn2K6TrNBZxHbOeuWeB5a-xAwDUI10xQDIxC2/exec'; // e.g., https://script.google.com/macros/s/AKfycb.../exec

// ===== Helpers =====
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

function toast(msgEl, text, ok=true){
  if(!msgEl) return;
  msgEl.textContent = text;
  msgEl.className = ok ? 'text-sm text-green-600' : 'text-sm text-red-600';
  setTimeout(() => { msgEl.textContent = ''; }, 5000);
}

async function getJSON(url){
  const r = await fetch(url, { method: 'GET' });
  if(!r.ok) throw new Error('HTTP '+r.status);
  return r.json();
}

async function postJSON(url, payload){
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if(!r.ok) throw new Error('HTTP '+r.status);
  return r.json();
}

// ===== Theme =====
function initTheme(){
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved === 'dark'){ html.classList.add('dark'); }
  $('#themeToggle')?.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  });
}

// ===== i18n =====
const I18N = {
  mn: {
    title_home: "Executive Portfolio — Захиралын Портфолио",
    title_projects: "Төслийн сан — Executive Portfolio",
    title_news: "Мэдээ — Цаг товлох / Санал — Executive Portfolio",
    nav_home:"Нүүр", nav_projects:"Төсөл", nav_news:"Мэдээ", nav_book:"⏰ Цаг товлох",
    badge_exec:"Executive Профайл",
    hero_title:"Стратеги удирдлага, <span class='grad'>чанарын гүйцэтгэл</span> дээр төвлөрсөн портфолио",
    hero_desc:"Бид томоохон дэд бүтэц, орон сууц, нийтийн зориулалттай төслүүдийг төлөвлөлтөөс хүлээлгэн өгөх хүртэл иж бүрэн менежментээр удирддаг.",
    cta_meeting:"⏰ Уулзалт товлох", cta_projects:"Төслийн санг үзэх",
    kpi_exp_n:"12+ жил", kpi_exp_t:"Туршлага", kpi_done_n:"85+ төсөл", kpi_done_t:"Дуусгасан", kpi_cs_n:"98%", kpi_cs_t:"Харилцагчийн сэтгэл ханамж",
    bio_title:"Захирлын товч намтар", bio_name:"Б. Бат-Эрдэнэ", bio_role:"Гүйцэтгэх захирал",
    bio_download:"Профайл татах (PDF)",
    bio_desc:"Барилга, дэд бүтцийн салбарт 12+ жилийн туршлага. Эрсдэлийн удирдлага, чанарын баталгаажуулалт, олон талт түншлэл, хөрөнгө оруулалтын хөтөлбөрүүдийн удирдлагад мэргэшсэн.",
    bio_point1:"PMI, LEED AP сертификатууд",
    bio_point2:"Төсөл хөтөлбөрийн 98% хугацаандаа",
    bio_point3:"ISO 9001/45001 дотоод аудит",
    bio_point4:"Түншлэл, хөрөнгө оруулалтын хэлэлцээр",
    featured_title:"Онцлох төслүүд", featured_all:"Бүгдийг харах →", latest_news:"Сүүлийн мэдээ", latest_news_desc:"Шинэ нийтлэлүүд мэдээний хуудсаас автоматаар татагдана.", see_all_news:"Бүгдийг харах →",
    projects_title:"Төслийн сан", projects_desc:"Google Sheets-ээс автоматаар уншина.",
    all_categories:"Бүх ангилал", all_status:"Бүх төлөв", view_grid:"Grid", view_list:"List",
    news_title:"Мэдээ мэдээлэл", news_desc:"Sheets-ээс автоматаар татагдана. Картууд skeleton-анимацтай.",
    tab_news:"Мэдээ", tab_book:"Цаг товлох", tab_feedback:"Санал",
    no_results:"Илэрц олдсонгүй.", all:"Бүгд",
    search:"Хайлт...", name_ph:"Нэр *", phone_ph:"Утас *", email_ph:"И-мэйл",
    detail_ph:"Дэлгэрэнгүй...", send:"Илгээх",
    name_opt_ph:"Нэр", phone_opt_ph:"Утас", email_opt_ph:"И-мэйл", fb_ph:"Таны санал...",
    rating:"Үнэлгээ:",
    book_title:"⏰ Цаг товлох",
    avail_ok:"Энэ цаг боломжтой.", avail_full:"Тухайн цаг дүүрсэн байна.", avail_closed:"Тухайн цаг нээлттэй бус байна.", avail_err:"Тохиргооны алдаа эсвэл сүлжээ тасарлаа."
  },
  en: {
    title_home:"Executive Portfolio — CEO Portfolio",
    title_projects:"Projects — Executive Portfolio",
    title_news:"News — Booking / Feedback — Executive Portfolio",
    nav_home:"Home", nav_projects:"Projects", nav_news:"News", nav_book:"⏰ Book a meeting",
    badge_exec:"Executive Profile",
    hero_title:"Portfolio focused on strategy and <span class='grad'>quality delivery</span>",
    hero_desc:"We manage complex infrastructure, residential and public projects end‑to‑end—from planning to handover.",
    cta_meeting:"⏰ Book a meeting", cta_projects:"Browse projects",
    kpi_exp_n:"12+ yrs", kpi_exp_t:"Experience", kpi_done_n:"85+ projects", kpi_done_t:"Delivered", kpi_cs_n:"98%", kpi_cs_t:"Client satisfaction",
    bio_title:"Executive Bio", bio_name:"B. Bat-Erdene", bio_role:"Chief Executive Officer",
    bio_download:"Download profile (PDF)",
    bio_desc:"12+ years in construction & infrastructure. Specialized in risk management, quality assurance, partnerships and investment programs.",
    bio_point1:"PMI, LEED AP certifications",
    bio_point2:"98% on-time delivery",
    bio_point3:"ISO 9001/45001 internal audits",
    bio_point4:"Partnership & investment negotiations",
    featured_title:"Featured Projects", featured_all:"View all →", latest_news:"Latest News", latest_news_desc:"Newest posts are pulled from the news page.", see_all_news:"View all →",
    projects_title:"Projects", projects_desc:"Loaded automatically from Google Sheets.",
    all_categories:"All categories", all_status:"All status", view_grid:"Grid", view_list:"List",
    news_title:"News & Updates", news_desc:"Pulled from Sheets with skeleton loading.",
    tab_news:"News", tab_book:"Booking", tab_feedback:"Feedback",
    no_results:"No results.", all:"All",
    search:"Search...", name_ph:"Name *", phone_ph:"Phone *", email_ph:"Email",
    detail_ph:"Details...", send:"Send",
    name_opt_ph:"Name", phone_opt_ph:"Phone", email_opt_ph:"Email", fb_ph:"Your feedback...",
    rating:"Rating:",
    book_title:"⏰ Book a meeting",
    avail_ok:"This slot is available.", avail_full:"This slot is full.", avail_closed:"This slot is closed.", avail_err:"Availability error or network issue."
  }
};

function applyI18n(){
  const lang = localStorage.getItem('lang') || 'mn';
  // text nodes
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const html = I18N[lang]?.[key];
    if(html != null){ el.innerHTML = html; }
  });
  // placeholders
  $$('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const val = I18N[lang]?.[key];
    if(val != null){ el.setAttribute('placeholder', val); }
  });
  // title
  const tkey = $('title')?.getAttribute('data-i18n');
  if(tkey && I18N[lang]?.[tkey]) document.title = I18N[lang][tkey];
  // button label
  const btn = $('#langToggle'); if(btn) btn.textContent = (lang==='mn' ? 'MN' : 'EN');
}

function initLang(){
  applyI18n();
  $('#langToggle')?.addEventListener('click', () => {
    const cur = localStorage.getItem('lang') || 'mn';
    const next = cur === 'mn' ? 'en' : 'mn';
    localStorage.setItem('lang', next);
    applyI18n();
  });
}

// ===== Skeletons =====
function newsSkeleton(n=6){
  return Array.from({length:n}).map(()=>`
    <article class="news-card">
      <div class="skel" style="height:180px"></div>
      <div class="news-body">
        <div class="skel" style="height:14px;width:60%"></div>
        <div class="skel" style="height:18px;width:85%;margin-top:10px"></div>
        <div class="skel" style="height:60px;width:100%;margin-top:10px"></div>
      </div>
    </article>
  `).join('');
}

function projectSkeletonGrid(n=6){
  return Array.from({length:n}).map(()=>`
    <article class="news-card">
      <div class="skel" style="height:180px"></div>
      <div class="news-body">
        <div class="skel" style="height:18px;width:70%"></div>
        <div class="skel" style="height:14px;width:40%;margin-top:8px"></div>
      </div>
    </article>
  `).join('');
}

function projectSkeletonList(n=6){
  return Array.from({length:n}).map(()=>`
    <div class="row">
      <div class="skel" style="width:80px;height:56px;border-radius:.5rem"></div>
      <div class="skel" style="height:18px;width:60%"></div>
      <div class="skel" style="height:14px;width:40%"></div>
      <div class="skel" style="height:14px;width:40%"></div>
      <div class="skel" style="height:14px;width:60px"></div>
    </div>
  `).join('');
}

// ===== News =====
async function loadNews(){
  const grid = $('#newsGrid');
  const empty = $('#newsEmpty');
  if(!grid) return;
  grid.innerHTML = newsSkeleton(6);
  try{
    const q = $('#q')?.value?.trim()?.toLowerCase() || '';
    const catVal = $('#cat')?.value || '';
    const res = await getJSON(`${API_BASE}?action=listNews`);
    const all = res?.data ?? [];
    // categories
    const cats = Array.from(new Set(all.map(x => x.category).filter(Boolean)));
    if($('#cat')){
      const lang = localStorage.getItem('lang') || 'mn';
      const allTxt = I18N[lang].all;
      $('#cat').innerHTML = `<option value="">${allTxt}</option>` + cats.map(c => `<option ${c===catVal?'selected':''}>${c}</option>`).join('');
    }
    // filter
    const items = all.filter(x => (catVal ? x.category===catVal : true))
                     .filter(x => (q ? (x.title?.toLowerCase().includes(q) || x.summary?.toLowerCase().includes(q)) : true));
    if(items.length === 0){
      grid.innerHTML = '';
      empty?.classList.remove('hidden');
      return;
    }
    empty?.classList.add('hidden');
    grid.innerHTML = items.map(item => {
      const img = item.image || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop';
      const link = item.link || '#';
      const date = item.date || '';
      return `
      <article class="news-card">
        <img class="news-cover" src="${img}" alt="cover">
        <div class="news-body">
          <div class="news-meta">${date} • ${item.category || 'Мэдээ'}</div>
          <h3 class="news-title mt-1">${item.title || 'Гарчиг'}</h3>
          <p class="text-gray-600 mt-2">${item.summary || ''}</p>
          <a class="inline-block mt-3 text-blue-600 font-semibold" href="${link}" target="_blank" rel="noopener">Дэлгэрэнгүй →</a>
        </div>
      </article>`;
    }).join('');
  }catch(e){
    console.error(e);
    grid.innerHTML = '';
    empty?.classList.remove('hidden');
  }
}

// ===== Projects =====
async function loadProjects(){
  const g = $('#projectsGrid');
  const l = $('#projectsList');
  if(!g && !l) return;
  const isGrid = !l || l.classList.contains('hidden');
  if(g) g.innerHTML = projectSkeletonGrid(6);
  if(l && !isGrid) l.innerHTML = projectSkeletonList(6);
  try{
    const q = $('#p_q')?.value?.trim()?.toLowerCase() || '';
    const catVal = $('#p_cat')?.value || '';
    const statusVal = $('#p_status')?.value || '';
    const res = await getJSON(`${API_BASE}?action=listProjects`);
    const all = res?.data ?? [];
    // fill cats
    const cats = Array.from(new Set(all.map(x => x.category).filter(Boolean)));
    if($('#p_cat')){
      const lang = localStorage.getItem('lang') || 'mn';
      const allTxt = I18N[lang].all_categories;
      $('#p_cat').innerHTML = `<option value="">${allTxt}</option>` + cats.map(c => `<option ${c===catVal?'selected':''}>${c}</option>`).join('');
    }
    // filter
    const items = all.filter(x => (catVal ? x.category===catVal : true))
                     .filter(x => (statusVal ? x.status===statusVal : true))
                     .filter(x => (q ? (x.title?.toLowerCase().includes(q) || x.location?.toLowerCase().includes(q)) : true));

    if(items.length === 0){
      if(g) g.innerHTML = '';
      if(l) l.innerHTML = '';
      $('#p_empty')?.classList.remove('hidden');
      return;
    }
    $('#p_empty')?.classList.add('hidden');

    if(g) g.innerHTML = items.map(it => projectCard(it)).join('');
    if(l) l.innerHTML = items.map(it => projectRow(it)).join('');
  }catch(e){
    console.error(e);
    if(g) g.innerHTML = '';
    if(l) l.innerHTML = '';
    $('#p_empty')?.classList.remove('hidden');
  }
}

function projectCard(p){
  const img = p.cover || 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop';
  const link = p.link || '#';
  return `
  <article class="news-card">
    <img class="news-cover" src="${img}" alt="${p.title||'project'}">
    <div class="news-body">
      <div class="news-meta">${p.startDate||''} • ${p.status||''} • ${p.category||''}</div>
      <h3 class="news-title mt-1">${p.title || 'Project'}</h3>
      <p class="text-gray-600 mt-2">${p.location || ''}</p>
      <a class="inline-block mt-3 text-blue-600 font-semibold" href="${link}" target="_blank" rel="noopener">Дэлгэрэнгүй →</a>
    </div>
  </article>`;
}

function projectRow(p){
  const img = p.cover || 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop';
  const link = p.link || '#';
  return `
  <div class="row">
    <img src="${img}" alt="${p.title||'project'}"/>
    <div class="font-bold">${p.title || 'Project'} <div class="text-sm text-gray-500">${p.location||''}</div></div>
    <div class="text-sm">${p.category||''}</div>
    <div class="text-sm">${p.status||''}</div>
    <div class="text-right"><a class="text-blue-600 font-semibold" href="${link}" target="_blank" rel="noopener">Link</a></div>
  </div>`;
}

// Featured on homepage
async function loadFeatured(){
  const el = $('#featuredGrid');
  if(!el) return;
  el.innerHTML = projectSkeletonGrid(3);
  try{
    const res = await getJSON(`${API_BASE}?action=listProjects`);
    const items = (res?.data ?? []).filter(x => x.featured === true).slice(0,3);
    if(items.length === 0){ el.innerHTML = ''; return; }
    el.innerHTML = items.map(projectCard).join('');
  }catch(e){
    console.error(e);
    el.innerHTML = '';
  }
}

// ===== Availability =====
async function checkAvailability(){
  const date = $('[name="date"]')?.value;
  const time = $('[name="time"]')?.value;
  const service = $('[name="service"]')?.value || '';
  const msg = $('#availMsg');
  if(!date || !time){ msg.textContent=''; return; }
  try{
    const res = await postJSON(API_BASE, { action:'checkAvailability', payload:{ date, time, service } });
    const lang = localStorage.getItem('lang') || 'mn';
    if(res.ok){
      msg.className = 'text-sm text-green-600';
      msg.textContent = I18N[lang].avail_ok;
      $('#bookBtn')?.removeAttribute('disabled');
    }else{
      msg.className = 'text-sm text-red-600';
      msg.textContent = res.message || I18N[lang].avail_full;
      $('#bookBtn')?.setAttribute('disabled','true');
    }
  }catch(e){
    const lang = localStorage.getItem('lang') || 'mn';
    msg.className = 'text-sm text-orange-600';
    msg.textContent = I18N[lang].avail_err;
  }
}

// ===== Booking & Feedback =====
function bindBooking(){
  const form = $('#bookForm'); if(!form) return;
  const btn = $('#bookBtn'); const msg = $('#bookMsg');
  $('[name="date"]')?.addEventListener('change', checkAvailability);
  $('[name="time"]')?.addEventListener('change', checkAvailability);
  $('[name="service"]')?.addEventListener('change', checkAvailability);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    if(!payload.name || !payload.phone || !payload.date || !payload.time || !payload.service){
      const lang = localStorage.getItem('lang') || 'mn';
      toast(msg, lang==='mn' ? 'Шаардлагатай талбаруудыг бөглөнө үү.' : 'Please fill required fields.', false);
      return;
    }
    btn.disabled = true; btn.textContent = (localStorage.getItem('lang')==='en' ? 'Sending...' : 'Илгээж байна...');
    try{
      // server re-checks availability
      const res = await postJSON(API_BASE, { action: 'bookAppointment', payload: { ...payload, page: location.pathname } });
      if(res.ok){ form.reset(); toast(msg,'Амжилттай илгээгдлээ.'); $('#availMsg').textContent=''; }
      else { toast(msg, res.message || 'Алдаа гарлаа.', false); }
    }catch(err){ toast(msg,'Сүлжээний алдаа.', false); }
    finally{ btn.disabled=false; btn.textContent=I18N[localStorage.getItem('lang')||'mn'].send; }
  });
}

function bindFeedback(){
  const form = $('#feedbackForm'); if(!form) return;
  const btn = $('#fbBtn'); const msg = $('#fbMsg');
  const stars = $('#stars'); let rating=5;
  stars?.addEventListener('click', (e) => {
    if(e.target.closest('.star')){
      rating = Number(e.target.dataset.v);
      $$('[data-v]', stars).forEach(b => b.classList.toggle('active', Number(b.dataset.v) <= rating));
      form.querySelector('[name="rating"]').value = String(rating);
    }
  });
  $$('[data-v]', stars).forEach(b => b.classList.add('active'));
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    btn.disabled = true; btn.textContent = I18N[localStorage.getItem('lang')||'mn'].send + '...';
    try{
      const res = await postJSON(API_BASE, { action: 'submitFeedback', payload: { ...payload, page: location.pathname } });
      if(res.ok){ form.reset(); $$('[data-v]', stars).forEach(b => b.classList.add('active')); toast(msg,'Санал амжилттай илгээгдлээ.'); }
      else { toast(msg, res.message || 'Алдаа гарлаа.', false); }
    }catch(err){ toast(msg,'Сүлжээний алдаа.', false); }
    finally{ btn.disabled=false; btn.textContent=I18N[localStorage.getItem('lang')||'mn'].send; }
  });
}

// ===== Tabs =====
function initTabs(){
  const tabs = $$('.tab');
  if(!tabs.length) return;
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const id = t.dataset.tab;
    $$('.tab-pane').forEach(p => p.classList.add('hidden'));
    $('#'+id)?.classList.remove('hidden');
  }));
}

// ===== View toggles =====
function initProjectViewToggle(){
  const gbtn = $('#viewGrid'); const lbtn = $('#viewList');
  const g = $('#projectsGrid'); const l = $('#projectsList');
  if(!gbtn || !lbtn) return;
  gbtn.addEventListener('click', () => {
    gbtn.classList.add('active'); lbtn.classList.remove('active');
    g?.classList.remove('hidden'); l?.classList.add('hidden');
    loadProjects();
  });
  lbtn.addEventListener('click', () => {
    lbtn.classList.add('active'); gbtn.classList.remove('active');
    l?.classList.remove('hidden'); g?.classList.add('hidden');
    loadProjects();
  });
}

// ===== Page Init =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLang();
  initTabs();
  initProjectViewToggle();

  // Wire inputs
  $('#q')?.addEventListener('input', loadNews);
  $('#cat')?.addEventListener('change', loadNews);
  $('#p_q')?.addEventListener('input', loadProjects);
  $('#p_cat')?.addEventListener('change', loadProjects);
  $('#p_status')?.addEventListener('change', loadProjects);

  // Load data
  loadNews();
  loadProjects();
  loadFeatured();

  // Forms
  bindBooking();
  // Homepage news
  loadHomeNews();
  bindFeedback();
});


// ===== Home Latest News =====
async function loadHomeNews(){
  const el = $('#homeNewsGrid');
  if(!el) return;
  el.innerHTML = newsSkeleton(3);
  try{
    const res = await getJSON(`${API_BASE}?action=listNews`);
    const items = (res?.data ?? []).slice(0,3);
    if(items.length === 0){ el.innerHTML = ''; return; }
    el.innerHTML = items.map(item => {
      const img = item.image || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop';
      const link = item.link || '#';
      const date = item.date || '';
      return `
      <article class="news-card">
        <img class="news-cover" src="${img}" alt="cover">
        <div class="news-body">
          <div class="news-meta">${date} • ${item.category || 'News'}</div>
          <h3 class="news-title mt-1">${item.title || 'Untitled'}</h3>
          <p class="text-gray-600 mt-2">${item.summary || ''}</p>
          <a class="inline-block mt-3 text-blue-600 font-semibold" href="${link}" target="_blank" rel="noopener">Read more →</a>
        </div>
      </article>`;
    }).join('');
  }catch(e){
    console.error(e);
    el.innerHTML = '';
  }
}
