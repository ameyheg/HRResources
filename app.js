/* ===== HR Resources — Shared App Logic ===== */

// ── Sidebar HTML (injected into every page) ──
const SIDEBAR_HTML = `
<div class="sidebar-brand">
  <a href="index.html" style="text-decoration:none;color:inherit">
    <h1>HR Resources</h1>
    <span class="brand-sub">India &bull; Goa</span>
  </a>
</div>
<nav class="sidebar-nav">
  <div class="nav-group-label">Overview</div>
  <a class="nav-link" href="index.html" data-page="index"><span class="nav-icon">🏠</span> Home</a>

  <div class="nav-group-label">Core Reference</div>
  <a class="nav-link" href="templates.html" data-page="templates"><span class="nav-icon">📄</span> HR Templates <span class="nav-count">20+</span></a>
  <a class="nav-link" href="policies.html" data-page="policies"><span class="nav-icon">📋</span> Policy Frameworks <span class="nav-count">8</span></a>
  <a class="nav-link" href="lifecycle.html" data-page="lifecycle"><span class="nav-icon">🔄</span> Employee Lifecycle</a>
  <a class="nav-link" href="compliance.html" data-page="compliance"><span class="nav-icon">📅</span> Compliance &amp; Filings</a>

  <div class="nav-group-label">Regional</div>
  <a class="nav-link" href="goa.html" data-page="goa"><span class="nav-icon">🏖️</span> Goa Reference</a>

  <div class="nav-group-label">Tools &amp; Resources</div>
  <a class="nav-link" href="hr-toolkit.html" data-page="toolkit"><span class="nav-icon">🧰</span> HR Toolkit</a>
  <a class="nav-link" href="resources.html" data-page="resources"><span class="nav-icon">🔗</span> Resources &amp; Glossary</a>
</nav>
<div class="theme-toggle-wrap">
  <button class="theme-toggle-btn" id="themeToggle">
    <span class="toggle-icon">🌙</span>
    <span class="toggle-label">Dark Mode</span>
    <span class="toggle-track"></span>
  </button>
</div>
<div class="sidebar-footer"><p>Indicative reference only. Not legal advice.</p></div>
`;

// ── Footer HTML ──
const FOOTER_HTML = `
<div class="footer-inner">
  <div class="footer-disclaimer"><strong>Disclaimer:</strong> This resource is indicative and for reference purposes only. It should be adapted as per organisational policy and applicable laws. The information presented here does not constitute legal advice. HR professionals are encouraged to exercise their own judgment and consult appropriate professionals.</div>
  <div class="footer-meta">HR Resources — India &amp; Goa &bull; For informational and reference purposes only &bull; Last updated: February 2026</div>
</div>
`;

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  // Inject sidebar
  const sidebarEl = document.getElementById('sidebar');
  if (sidebarEl) sidebarEl.innerHTML = SIDEBAR_HTML;

  // Inject footer
  const footerEl = document.getElementById('globalFooter');
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  // Highlight active page
  const page = document.body.getAttribute('data-page');
  document.querySelectorAll('.nav-link[data-page]').forEach(l => {
    l.classList.toggle('active', l.getAttribute('data-page') === page);
  });

  initTheme();
  initMobile();
  initParticles();
  initProgressBar();
  initScrollReveal();
  initCounters();
  initTabs();
  initSearch();
  initBackToTop();
});

// ═══════════════════════════════════
//  DARK MODE
// ═══════════════════════════════════
function initTheme() {
  const theme = localStorage.getItem('hr-theme') || 'light';
  applyTheme(theme);
  document.addEventListener('click', e => {
    if (e.target.closest('#themeToggle')) {
      const cur = document.documentElement.getAttribute('data-theme');
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    }
  });
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('hr-theme', t);
  const icon = document.querySelector('#themeToggle .toggle-icon');
  const label = document.querySelector('#themeToggle .toggle-label');
  if (icon) icon.textContent = t === 'dark' ? '☀️' : '🌙';
  if (label) label.textContent = t === 'dark' ? 'Light Mode' : 'Dark Mode';
}

// ═══════════════════════════════════
//  MOBILE SIDEBAR
// ═══════════════════════════════════
function initMobile() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('mobileToggle');
  const overlay = document.getElementById('sidebarOverlay');
  if (!toggle) return;

  const open = () => { sidebar.classList.add('open'); overlay.classList.add('open'); overlay.style.display = 'block'; requestAnimationFrame(() => overlay.style.opacity = '1'); };
  const close = () => { sidebar.classList.remove('open'); overlay.style.opacity = '0'; setTimeout(() => { overlay.classList.remove('open'); overlay.style.display = 'none'; }, 250); };

  toggle.addEventListener('click', () => sidebar.classList.contains('open') ? close() : open());
  overlay.addEventListener('click', close);
}

// ═══════════════════════════════════
//  PARTICLES
// ═══════════════════════════════════
function initParticles() {
  const c = document.getElementById('particleCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let pts = [];

  function resize() { c.width = innerWidth; c.height = innerHeight; }
  function create() {
    pts = [];
    for (let i = 0; i < 35; i++) pts.push({ x: Math.random() * c.width, y: Math.random() * c.height, s: Math.random() * 2 + 0.5, dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3, o: Math.random() * 0.4 + 0.1 });
  }
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const rgb = dark ? '200,180,120' : '20,30,60';
    pts.forEach(p => {
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0; if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); ctx.fillStyle = `rgba(${rgb},${p.o})`; ctx.fill();
    });
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
      if (d < 140) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(${rgb},${0.05 * (1 - d / 140)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  resize(); create(); draw();
  addEventListener('resize', () => { resize(); create(); });
}

// ═══════════════════════════════════
//  READING PROGRESS
// ═══════════════════════════════════
function initProgressBar() {
  const bar = document.getElementById('readingProgress');
  if (!bar) return;
  addEventListener('scroll', () => {
    const pct = (scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}

// ═══════════════════════════════════
//  SCROLL REVEAL
// ═══════════════════════════════════
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.section').forEach(s => obs.observe(s));
}

// ═══════════════════════════════════
//  COUNTER ANIMATION
// ═══════════════════════════════════
function initCounters() {
  let done = false;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !done) {
        done = true;
        document.querySelectorAll('.counter').forEach(el => {
          const target = +el.dataset.target;
          const start = performance.now();
          (function upd(now) {
            const p = Math.min((now - start) / 1500, 1);
            el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
            if (p < 1) requestAnimationFrame(upd);
          })(start);
        });
      }
    });
  }, { threshold: 0.3 });
  const hero = document.getElementById('home');
  if (hero) obs.observe(hero);
}

// ═══════════════════════════════════
//  TABS
// ═══════════════════════════════════
function initTabs() {
  document.querySelectorAll('.tab-nav').forEach(nav => {
    nav.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.tab;
        const container = nav.parentElement;
        container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = container.querySelector('#' + id);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

// ═══════════════════════════════════
//  SEARCH (page-level sections)
// ═══════════════════════════════════
function initSearch() {
  const input = document.getElementById('searchInput');
  const info = document.getElementById('searchInfo');
  if (!input) return;
  let t;
  input.addEventListener('input', () => {
    clearTimeout(t); t = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      const sections = document.querySelectorAll('.section');
      if (!q || q.length < 2) { sections.forEach(s => { s.classList.remove('search-hidden'); s.classList.add('revealed') }); if (info) info.style.display = 'none'; return; }
      let n = 0;
      sections.forEach(s => { if (s.textContent.toLowerCase().includes(q)) { s.classList.remove('search-hidden'); s.classList.add('revealed'); n++; } else { s.classList.add('search-hidden'); } });
      if (info) { info.textContent = n ? `${n} section${n > 1 ? 's' : ''} matching "${input.value.trim()}"` : `No results for "${input.value.trim()}"`; info.style.display = 'block'; }
    }, 200);
  });

  document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); input.focus(); } });
}

// ═══════════════════════════════════
//  BACK TO TOP
// ═══════════════════════════════════
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  addEventListener('scroll', () => btn.classList.toggle('visible', scrollY > 500), { passive: true });
  btn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}

// ═══════════════════════════════════
//  TOAST
// ═══════════════════════════════════
function showToast(msg, dur) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur || 2500);
}

// ═══════════════════════════════════
//  ACCORDION (global)
// ═══════════════════════════════════
function toggleAccordion(trigger) {
  const c = trigger.nextElementSibling;
  const open = c.classList.contains('open');
  trigger.classList.toggle('open', !open);
  c.classList.toggle('open', !open);
}

// Expand all / collapse all
function expandAll(container) {
  container.querySelectorAll('.accordion-trigger').forEach(t => { t.classList.add('open'); t.nextElementSibling.classList.add('open'); });
}
function collapseAll(container) {
  container.querySelectorAll('.accordion-trigger').forEach(t => { t.classList.remove('open'); t.nextElementSibling.classList.remove('open'); });
}

// ═══════════════════════════════════
//  COPY TEMPLATE
// ═══════════════════════════════════
function copyTemplate(btn) {
  const block = btn.closest('.template-block');
  if (!block) return;
  const clone = block.cloneNode(true);
  clone.querySelector('.copy-btn')?.remove();
  clone.querySelector('.template-label')?.remove();
  const text = clone.textContent.trim().replace(/\n{3,}/g, '\n\n');
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✅ Copied!'; btn.classList.add('copied');
    showToast('📋 Template copied to clipboard');
    setTimeout(() => { btn.textContent = '📋 Copy'; btn.classList.remove('copied'); }, 2000);
  }).catch(() => showToast('⚠️ Could not copy'));
}
