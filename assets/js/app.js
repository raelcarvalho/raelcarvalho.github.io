/* ==========================================================================
   Portfólio — Rafael Carvalho
   Sem framework. Tudo que o site "lembra" fica no localStorage deste navegador.
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const LENS_NAMES = { rec: 'Recrutador', dev: 'Dev', cli: 'Cliente' };
  const tr = (s) => (window.I18N ? window.I18N.t(s) : s);

  /* Links internos rolam até a seção sem colocar "#secao" na URL */
  const cleanUrl = () => history.replaceState(null, '', location.pathname + location.search);
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const id = decodeURIComponent(a.getAttribute('href').slice(1));
    const target = id ? document.getElementById(id) : document.body;
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    if (target.tabIndex < 0 && !/^(A|BUTTON|INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (location.hash) cleanUrl();
  });
  // Quem chega por um link antigo com #: o navegador rola até a seção e a URL fica limpa
  if (location.hash) addEventListener('load', () => setTimeout(cleanUrl, 0), { once: true });

  /* ------------------------------------------------------------------------
     Dados
     ------------------------------------------------------------------------ */
  const PROJECT = {
    o: { name: 'OrdenaHub', c: 'var(--violet-400)' },
    v: { name: 'Vetnix', c: 'var(--mint-400)' },
    m: { name: 'Mix Awards', c: 'var(--gold-400)' },
  };

  // Commits de maior impacto: [projeto, hash, data, mensagem, atividade do repositório nas 5 semanas ao redor]
  const COMMITS = [
    ['o', '4cbc724', '2026-10-15', 'prévia completa da DANFE antes de emitir', '00020000000003100200000000100000202'],
    ['v', '04b9095', '2026-07-12', 'vacinação e carteira do pet no portal do tutor', '00000000000010000000000001021010200'],
    ['o', 'bc9c26f', '2026-10-09', 'NFS-e das assinaturas emitida via Asaas', '42000000002000000000310020000000010'],
    ['m', '1b8adcd', '2026-07-12', 'cerimônia de encerramento da temporada', '00030000000200001000000001004000000'],
    ['o', 'cde93c4', '2026-08-27', 'contingência de NFC-e e painel de NFS-e', '00030333122400141220212010020021200'],
    ['v', 'feff02a', '2026-07-11', 'boletim humanizado enviado por WhatsApp', '00000000000000000001000000000000102'],
    ['o', '4b8b5d4', '2026-08-22', 'webhooks duráveis na integração fiscal', '30210000003033312240014122021201002'],
    ['m', '675be46', '2026-07-23', 'ranking de duplas vitoriosas', '00002000010000000010040000000210300'],
    ['o', 'a1ee974', '2026-08-10', 'conciliação de pagamentos no extrato bancário', '12224203021000000303331224001412202'],
    ['v', '5f430e0', '2026-07-16', 'assinatura mensal por clínica', '00000000000010000000000001021010200'],
    ['o', '08d2a50', '2026-09-26', 'bloqueio de acesso por mensalidade em atraso', '00212001001000420000000020000000003'],
    ['m', '6322635', '2026-05-20', 'nova arquitetura: API, web e migrations', '00000000000000000000000000000002100'],
    ['v', 'f40d231', '2026-07-09', 'receituário com exportação em PDF', '00000000000000000001000000000000102'],
    ['m', '9662575', '2026-06-25', 'missões com reroll para os jogadores', '00003000010000000120000030000000200'],
  ];

  // Quadro de contribuições do GitHub (raelcarvalho), 12 meses a partir de 19/10/2025 (domingo).
  const HEAT_START = '2025-10-19';
  const HEAT = '000010000000000000000000000000000000002120003301000010000000000000000000000000000000010000000000000100000000000000000000000000000000000000000000000000111000110100110000000000000000000000000000000001002300211410042230000010100000000001222001100000000020001101000000000001000000000001100000000000000002001110100011110001010020032100042200011001421121000010310000041300020';

  // Conhecimentos: I Itaú via TCS, S seguros, C Cadastra, P produtos próprios
  const PLACES = {
    I: { name: 'Itaú via TCS', c: 'var(--sky-400)', when: 'de 2020 a 2024' },
    S: { name: 'Mercadinho do Zé', c: 'var(--sky-200)', when: 'de 2024 a 2025' },
    C: { name: 'Cadastra', c: 'var(--ember-400)', when: 'de 2025 até hoje' },
    P: { name: 'Produtos próprios', c: 'var(--lime-400)', when: 'de 2025 até hoje' },
  };
  const STACK = [
    { g: 'Linguagens', items: [['Java', 'I'], ['TypeScript', 'SCP'], ['JavaScript', 'SCP'], ['Python', 'IC'], ['SQL', 'ISCP']] },
    { g: 'Back-end', items: [['Spring Boot', 'I'], ['JPA e Hibernate', 'I'], ['Node.js', 'SCP'], ['AdonisJS', 'SCP'], ['Express e Fastify', 'C'], ['APIs REST', 'ISCP'], ['Lucid e Prisma', 'SCP'], ['OAuth2', 'SC'], ['JWT', 'ICP']] },
    { g: 'Mensageria e eventos', items: [['Kafka', 'I'], ['AWS SQS', 'IS'], ['AWS EventBridge', 'S'], ['Webhooks', 'SCP'], ['Filas e workers', 'ISP']] },
    { g: 'Dados', items: [['PostgreSQL', 'ISCP'], ['DynamoDB', 'IS'], ['MongoDB', 'I'], ['Redis', 'C']] },
    { g: 'Cloud e DevOps', items: [['AWS Lambda', 'IS'], ['AWS EC2, RDS e S3', 'ISC'], ['GCP', 'C'], ['Terraform', 'I'], ['Docker', 'IC'], ['GitHub Actions', 'I'], ['Jenkins', 'S'], ['Nginx e PM2', 'CP']] },
    { g: 'Arquitetura e qualidade', items: [['Microsserviços', 'I'], ['Arquitetura hexagonal', 'I'], ['Orientação a eventos', 'IS'], ['SaaS multi-tenant', 'P'], ['Testes unitários e de integração', 'IP'], ['Grafana, Splunk e CloudWatch', 'I']] },
    { g: 'Front-end', items: [['React', 'CP'], ['Svelte', 'C'], ['Vue.js', 'C'], ['Tailwind CSS', 'CP'], ['Vite', 'CP'], ['TanStack Query', 'P'], ['Framer Motion', 'P']] },
    { g: 'Inteligência artificial', items: [['LLMs', 'C'], ['Agentes e orquestração', 'C'], ['MCP', 'C'], ['RAG', 'C'], ['Tool calling', 'C'], ['Skills', 'C']] },
    { g: 'Domínios de negócio', items: [['Antifraude', 'I'], ['Pagamentos', 'ISP'], ['Dados regulatórios BACEN', 'I'], ['Seguros e apólices', 'S'], ['Emissão fiscal SEFAZ', 'P'], ['Marketing e mídia', 'C']] },
  ];

  // Perguntas e respostas do "Pergunte ao portfólio" ficam em portfolio-kb.js.
  const ASSIST = window.PortfolioKB;

  /* ------------------------------------------------------------------------
     Memória da visita
     ------------------------------------------------------------------------ */
  const KEY = 'rc-portfolio-memory-v3';
  const blank = () => ({ visits: 0, firstSeen: Date.now(), lastSeen: 0, lens: null, seen: [], lastSection: null, chat: [], capsules: 0, best: null });
  let mem = blank();
  try { mem = { ...blank(), ...(JSON.parse(localStorage.getItem(KEY)) || {}) }; } catch { /* sem storage: segue sem memória */ }
  const previous = { lastSection: mem.lastSection, visits: mem.visits, lens: mem.lens, chat: mem.chat.slice() };
  const newVisit = !mem.lastSeen || Date.now() - mem.lastSeen > 30 * 60 * 1000;
  if (newVisit) mem.visits += 1;
  mem.lastSeen = Date.now();
  const returning = previous.visits > 0;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch { /* ignore */ } renderMemorySummary(); };

  /* ------------------------------------------------------------------------
     Abertura
     ------------------------------------------------------------------------ */
  const SCRAMBLE = '!<>-_\\/[]{}=+*^?#01';
  function scrambleTo(el, text, duration = 700) {
    if (reduced) { el.textContent = text; return Promise.resolve(); }
    const from = el.textContent;
    const len = Math.max(from.length, text.length);
    const q = [];
    for (let i = 0; i < len; i++) {
      const start = Math.floor(Math.random() * (duration * 0.4));
      q.push({ from: from[i] || '', to: text[i] || '', start, end: start + duration * 0.3 + Math.random() * duration * 0.3 });
    }
    return new Promise((resolve) => {
      const t0 = performance.now();
      const tick = (now) => {
        const t = now - t0;
        let out = '', done = 0;
        for (const c of q) {
          if (t >= c.end) { done++; out += c.to; }
          else if (t >= c.start) out += `<span class="glyph">${SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0]}</span>`;
          else out += c.from;
        }
        el.innerHTML = out;
        if (done === q.length) { el.textContent = text; resolve(); } else requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  async function boot() {
    const el = $('.boot');
    document.body.classList.add('is-booting');
    if (reduced) { el.remove(); document.body.classList.remove('is-booting'); document.body.classList.add('is-ready'); return; }
    const status = $('[data-boot-status]'), name = $('[data-boot-name]');
    requestAnimationFrame(() => el.classList.add('is-loading'));
    if (returning) {
      status.textContent = newVisit ? `bem-vindo de volta · visita nº ${mem.visits}` : 'retomando de onde você estava…';
      await scrambleTo(name, 'rafael.carvalho', 420);
      await sleep(250);
    } else {
      name.textContent = '';
      await scrambleTo(name, 'rafael.carvalho', 700);
      for (const s of ['carregando carreira…', 'conectando agentes…', 'pronto.']) { status.textContent = s; await sleep(260); }
    }
    el.classList.add('is-done');
    document.body.classList.remove('is-booting');
    document.body.classList.add('is-ready');
    setTimeout(() => el.remove(), 1100);
  }

  /* ------------------------------------------------------------------------
     Relógio, modo de leitura e chip de memória
     ------------------------------------------------------------------------ */
  function clock() {
    const el = $('[data-clock]');
    const fmt = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
    const tick = () => { el.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 15000);
  }

  function setLens(lens, { remember = true } = {}) {
    document.body.dataset.lens = lens;
    $$('[data-lens-switch] button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lens === lens)));
    if (remember) { mem.lens = lens; save(); }
    renderSuggestions();
  }
  const setChip = (html) => { $('[data-memory-text]').innerHTML = html; };

  function lensSwitch() {
    $$('[data-lens-switch] button').forEach((b) => b.addEventListener('click', () => {
      const first = !mem.lens;
      setLens(b.dataset.lens);
      setChip(first
        ? `Anotado: modo ${LENS_NAMES[b.dataset.lens]}. Na próxima visita a página já abre assim.`
        : `Modo ${LENS_NAMES[b.dataset.lens]}. A apresentação e os projetos mudaram junto.`);
    }));
    if (mem.lens) setLens(mem.lens, { remember: false });
  }

  function initialChip() {
    if (!returning) return;
    const parts = newVisit ? [`Bem-vindo de volta, visita nº ${mem.visits}.`] : [];
    if (previous.lens) parts.push(`Mantive o modo ${LENS_NAMES[previous.lens]}.`);
    const last = previous.lastSection && document.getElementById(previous.lastSection);
    if (last && previous.lastSection !== 'inicio') parts.push(`Da última vez você parou em <button type="button" data-resume>${last.dataset.chapter}</button>.`);
    if (!parts.length) return;
    setChip(parts.join(' '));
    $('[data-resume]')?.addEventListener('click', () => last.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }));
  }

  /* ------------------------------------------------------------------------
     Palavra que gira na apresentação
     ------------------------------------------------------------------------ */
  function rotator() {
    const el = $('[data-rotator]');
    const words = ['sistemas financeiros.', 'produtos SaaS.', 'agentes de IA.', 'integrações de ponta a ponta.'];
    let i = 0;
    // Ao trocar o idioma, a frase atual já aparece no idioma novo.
    if (window.I18N) window.I18N.onChange(() => { el.textContent = tr(words[i]); });
    if (reduced) return;
    setInterval(async () => {
      if (document.hidden) return;
      i = (i + 1) % words.length;
      await scrambleTo(el, tr(words[i]), 800);
      el.textContent = tr(words[i]); // se o idioma mudou no meio da animação
    }, 3400);
  }

  /* ------------------------------------------------------------------------
     Campo de partículas: ruído que vira ordem.
     O cursor organiza a região por onde passa e a ordem demora a se desfazer,
     como um rastro de memória. Rolar a página organiza tudo.
     ------------------------------------------------------------------------ */
  function field() {
    const canvas = $('[data-field]');
    const ctx = canvas.getContext('2d');
    const hero = $('#inicio');
    let W = 0, H = 0, pts = [], visible = true, raf = 0;
    const mouse = { x: -9999, y: -9999 };
    let accent = '#c8f560';

    function build() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = hero.clientWidth; H = hero.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = W < 720 ? 34 : 30;
      pts = [];
      const cols = Math.ceil(W / gap) + 1, rows = Math.ceil(H / gap) + 1;
      const ox = (W - (cols - 1) * gap) / 2, oy = (H - (rows - 1) * gap) / 2;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        pts.push({ gx: ox + c * gap, gy: oy + r * gap, sx: (Math.random() - 0.5) * 140, sy: (Math.random() - 0.5) * 140, p1: Math.random() * 6.28, p2: Math.random() * 6.28, sp: 0.4 + Math.random() * 0.8, o: 0 });
      }
    }

    function draw(t) {
      raf = 0;
      if (!visible) return;
      const time = t / 1000;
      const scrollOrder = Math.min(1, Math.max(0, window.scrollY / (H * 0.55)));
      ctx.clearRect(0, 0, W, H);
      const R = 210;
      for (const p of pts) {
        const dx = p.gx - mouse.x, dy = p.gy - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const local = d < R ? 1 - d / R : 0;
        const target = Math.max(scrollOrder, local * 1.15);
        p.o += target > p.o ? (target - p.o) * 0.12 : (target - p.o) * 0.008; // organiza rápido, desorganiza devagar
        const chaos = 1 - Math.min(1, p.o);
        const x = p.gx + (Math.sin(time * p.sp + p.p1) * 18 + p.sx) * chaos;
        const y = p.gy + (Math.cos(time * p.sp * 0.8 + p.p2) * 18 + p.sy) * chaos;
        const s = 1.6 + p.o * 1.6;
        if (p.o > 0.5) {
          ctx.globalAlpha = Math.min(1, 0.45 + (p.o - 0.5) * 1.2);
          ctx.fillStyle = accent;
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        } else {
          ctx.globalAlpha = 0.32 + p.o * 0.3;
          ctx.fillStyle = '#b2b3a9';
          ctx.beginPath(); ctx.arc(x, y, s * 0.5, 0, 6.283); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(draw);
    }

    build();
    if (reduced) { pts.forEach((p) => (p.o = 1)); draw(0); return; }
    addEventListener('resize', build);
    hero.addEventListener('pointermove', (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(draw); }).observe(hero);
    setInterval(() => { accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || accent; }, 400);
    raf = requestAnimationFrame(draw);
  }

  /* ------------------------------------------------------------------------
     Ticker de commits e quadro de contribuições
     ------------------------------------------------------------------------ */
  const parseDay = (d) => new Date(`${d}T12:00:00`);
  const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

  function ticker() {
    const track = $('[data-ticker]');
    const html = COMMITS.map(([p, , , msg]) => `<span class="ticker__item" style="--c:${PROJECT[p].c}"><i class="dot"></i><b>${PROJECT[p].name}</b> ${msg}</span>`).join('');
    track.innerHTML = html + html;
  }

  function heatmap() {
    const box = $('[data-heat]');
    if (!box) return;
    const start = parseDay(HEAT_START);
    const weeks = Math.ceil(HEAT.length / 7);
    let months = '', lastM = -1;
    for (let w = 0; w < weeks; w++) {
      const d = new Date(start); d.setDate(d.getDate() + w * 7);
      const m = d.getMonth();
      months += `<span>${m !== lastM && w < weeks - 2 ? MONTHS[m] : ''}</span>`;
      lastM = m;
    }
    const cells = [...HEAT].map((l, i) => `<i data-l="${l}" style="--w:${(i / 7) | 0}"></i>`).join('');
    box.style.setProperty('--weeks', weeks);
    box.innerHTML = `
      <div class="heat__top"><p><strong>384 contribuições</strong> no GitHub nos últimos 12 meses, com picos de 23 num único dia.</p><a href="https://github.com/raelcarvalho" target="_blank" rel="noopener">github.com/raelcarvalho ↗</a></div>
      <div class="heat__months" aria-hidden="true">${months}</div>
      <div class="heat__grid" aria-hidden="true">${cells}</div>
      <div class="heat__legend" aria-hidden="true">menos <i style="background:var(--heat-0)"></i><i style="background:var(--heat-1)"></i><i style="background:var(--heat-2)"></i><i style="background:var(--heat-3)"></i><i style="background:var(--heat-4)"></i> mais</div>`;
    box.scrollLeft = box.scrollWidth;
  }

  /* ------------------------------------------------------------------------
     Títulos divididos em palavras, revelações e contadores
     ------------------------------------------------------------------------ */
  function splitWords() {
    $$('.split').forEach((el) => {
      let i = 0;
      const wrap = (inner) => `<span class="w"><span style="--i:${i++}">${inner}</span></span>`;
      const out = [];
      el.childNodes.forEach((n) => {
        if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach((part) => { if (part) out.push(/^\s+$/.test(part) ? ' ' : wrap(part)); });
        else if (n.nodeName === 'BR') out.push('<br />');
        else out.push(wrap(n.outerHTML));
      });
      el.innerHTML = out.join('');
    });
  }

  function reveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        if (e.target.matches('.metric')) countUp($('[data-count]', e.target));
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal, .split, .metric').forEach((el) => io.observe(el));
    $$('.metrics__grid, .ai__points, .caps, .stack__grid').forEach((g) => [...g.children].forEach((c, i) => c.style.setProperty('--d', `${(i % 4) * 90}ms`)));
  }

  function countUp(el) {
    if (!el || el.dataset.done) return;
    el.dataset.done = '1';
    const to = parseFloat(el.dataset.count);
    const fmt = new Intl.NumberFormat('pt-BR');
    const suf = el.dataset.suffix || '';
    if (reduced) { el.textContent = fmt.format(to) + suf; return; }
    const t0 = performance.now(), dur = 1600;
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = fmt.format(Math.round(to * (k === 1 ? 1 : 1 - Math.pow(2, -10 * k)))) + suf;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------------
     Capítulos: cor da página, trilho lateral, navegação e memória
     ------------------------------------------------------------------------ */
  function chapters() {
    const sections = $$('[data-chapter]');
    const root = document.documentElement;
    const railNum = $('[data-rail-num]'), railLabel = $('[data-rail-label]');
    const navOf = { ordenahub: 'projetos', vetnix: 'projetos', mixawards: 'projetos' };
    const activate = (sec) => {
      const cs = getComputedStyle(sec);
      const tone = cs.getPropertyValue('--tone').trim(), soft = cs.getPropertyValue('--tone-soft').trim();
      if (tone) { root.style.setProperty('--accent', tone); root.style.setProperty('--accent-soft', soft); }
      railNum.textContent = String(sections.indexOf(sec) + 1).padStart(2, '0');
      railLabel.textContent = sec.dataset.chapter;
      $$('.case').forEach((c) => c.classList.toggle('is-active', c === sec));
      const navId = navOf[sec.id] || sec.id;
      $$('.nav a').forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${navId}`));
      if (!mem.seen.includes(sec.id)) mem.seen.push(sec.id);
      mem.lastSection = sec.id;
      save();
    };
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && activate(e.target)), { rootMargin: '-48% 0px -48% 0px' });
    sections.forEach((s) => io.observe(s));
  }

  let journeyDraw = () => {};
  function scrollChrome() {
    const bar = $('.progress span'), fill = $('[data-rail-fill]'), header = $('.header');
    let lastY = scrollY, ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      const k = max > 0 ? scrollY / max : 0;
      bar.style.transform = `scaleX(${k})`;
      fill.style.transform = `scaleY(${k})`;
      header.classList.toggle('is-hidden', scrollY > lastY && scrollY > 300);
      lastY = scrollY;
      journeyDraw();
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------------
     Carreira: linha desenhada pela rolagem e blueprint conduzido pelo cargo
     que cruza o centro da tela. A geometria fica em cache (coordenadas do
     documento) e só é medida de novo em resize, fontes e ResizeObserver.
     ------------------------------------------------------------------------ */
  function journey() {
    const wrap = $('.journey__wrap'), svg = $('.journey__line'), path = $('[data-journey-path]');
    if (!wrap || !svg || !path) return;
    const items = $$('.jr', wrap);
    const stage = $('[data-career-stage]');
    const renderer = window.CareerBlueprint && stage
      ? window.CareerBlueprint.create(stage, { reducedMotion: reduced, snapshotTargets: items })
      : null;
    let len = 0, wrapTop = 0, wrapH = 0, itemTops = [], metrics = [];
    let current = 0, goal = 0, raf = 0, first = true;
    // Ponto lido no centro da tela: cargo e fração dentro dele. Depois de um
    // reflow (resize, fontes) esse ponto volta ao centro, e a fase não salta.
    let reading = null, dirty = false;

    // Um único rAF aproxima o progresso atual do alvo e para quando chega.
    const tick = () => {
      current += (goal - current) * 0.16;
      if (Math.abs(goal - current) < 0.002) current = goal;
      renderer.setProgress(current);
      raf = current === goal ? 0 : requestAnimationFrame(tick);
    };
    const steer = (progress) => {
      goal = progress;
      if (reduced || first) {
        first = false;
        cancelAnimationFrame(raf); raf = 0;
        current = goal;
        renderer.setProgress(current);
        return;
      }
      if (!raf && goal !== current) raf = requestAnimationFrame(tick);
    };

    const layout = () => {
      if (renderer) renderer.setLayout(window.CareerBlueprint.chooseLayout(innerWidth, innerHeight));
      const y = scrollY, box = wrap.getBoundingClientRect();
      wrapTop = box.top + y;
      wrapH = box.height;
      svg.setAttribute('viewBox', `0 0 2 ${wrapH}`);
      svg.style.height = `${wrapH}px`;
      path.setAttribute('d', `M1 0 V${wrapH}`);
      len = wrapH;
      path.style.strokeDasharray = `${len}`;
      const boxes = items.map((it) => it.getBoundingClientRect());
      itemTops = boxes.map((b) => b.top + y);
      metrics = boxes.map((b) => ({ center: b.top + y + b.height / 2, height: b.height }));
      if (dirty && reading) {
        const keep = itemTops[reading.index] + reading.offset * metrics[reading.index].height - innerHeight * 0.5;
        if (Math.abs(keep - scrollY) > 1) scrollTo({ top: keep, behavior: 'instant' });
      }
      dirty = false;
      journeyDraw();
    };

    journeyDraw = () => {
      if (!len || dirty) return;
      const y = scrollY;
      const k = Math.min(1, Math.max(0, (y + innerHeight * 0.6 - wrapTop) / wrapH));
      path.style.strokeDashoffset = `${len * (1 - k)}`;
      const tip = wrapTop + wrapH * k;
      items.forEach((it, i) => it.classList.toggle('is-lit', itemTops[i] + 14 < tip));
      // Do mais recente ao mais antigo: 0 = Cadastra … 3 = suporte.
      const anchor = y + innerHeight * 0.5;
      const index = metrics.findIndex((m, i) => anchor >= itemTops[i] && anchor < itemTops[i] + m.height);
      reading = index < 0 ? null : { index, offset: (anchor - itemTops[index]) / metrics[index].height };
      if (renderer) steer(window.CareerBlueprint.computeProgress(metrics, anchor));
    };

    let queued = 0;
    const relayout = () => {
      dirty = true;
      if (!queued) queued = requestAnimationFrame(() => { queued = 0; layout(); });
    };
    addEventListener('resize', relayout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
    if ('ResizeObserver' in window) new ResizeObserver(relayout).observe(wrap);
    else addEventListener('load', relayout);

    // Efeitos ambientais (órbitas, pulsos) só rodam com a seção na tela.
    if (stage && 'IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => stage.classList.toggle('is-idle', !entry.isIntersecting)).observe(wrap);
    }
    layout();
  }

  /* ------------------------------------------------------------------------
     IA: orquestração com três níveis de confiança
     ------------------------------------------------------------------------ */
  function agentDemo() {
    const box = $('[data-agent-demo]');
    const list = $('[data-agent-steps]'), result = $('[data-agent-result]'), hint = $('[data-trust-hint]');
    const HINTS = {
      1: 'Mostra cada passo, o raciocínio e pede aprovação antes de qualquer ação com efeito real.',
      2: 'Mostra o raciocínio só onde há incerteza ou ação irreversível. O resto acontece em silêncio.',
      3: 'Age sozinho e entrega o resultado, com desfazer a um clique. Essa confiança foi conquistada nos níveis anteriores.',
    };
    const STEPS = [
      { t: 'Orquestrador entende o pedido', why: 'Três tarefas: coletar os dados de mídia, montar o dashboard e enviar ao cliente.', conf: 0.97 },
      { t: 'Agente de mídia', tool: 'midia.campanhas', why: 'Investimento, cliques e conversões de 4 plataformas na última semana.', conf: 0.95 },
      { t: 'Agente de dados', tool: 'analytics.cruzar', why: 'Uma campanha está sem conversões rastreadas. Marquei para revisão.', conf: 0.82 },
      { t: 'Agente de dashboards', tool: 'artefato.dashboard', why: 'Dashboard interativo no padrão visual da marca, publicado no espaço do cliente.', conf: 0.94, effect: true },
      { t: 'Enviar ao cliente', tool: 'email.enviar', why: 'Envio externo: sai da empresa e não dá para desfazer depois.', conf: 0.93, irreversible: true },
    ];
    let trust = 1, run = 0, started = false;

    const stepEl = (s, mode) => {
      const li = document.createElement('li');
      li.className = 'step is-running';
      const showWhy = mode === 1 || (mode === 2 && (s.conf < 0.9 || s.irreversible));
      if (!showWhy) li.classList.add('is-quiet');
      li.innerHTML = `
        <span class="step__icon" aria-hidden="true"></span>
        <div><span class="step__title">${s.t}${s.tool ? ` <code>${s.tool}</code>` : ''}</span>${showWhy ? `<span class="step__why">${s.why}</span>` : ''}</div>
        ${showWhy ? `<span class="step__conf">${Math.round(s.conf * 100)}% <i style="--c:${s.conf * 100}%"></i></span>` : '<span></span>'}`;
      return li;
    };

    const waitApproval = (li, id) => new Promise((resolve) => {
      li.classList.remove('is-running'); li.classList.add('is-wait');
      $('.step__icon', li).textContent = '!';
      const holder = document.createElement('div');
      holder.className = 'step__approve';
      holder.innerHTML = '<button type="button">Aprovar</button><button type="button">Revisar</button>';
      $('div', li).appendChild(holder);
      const [ok, review] = $$('button', holder);
      ok.addEventListener('click', () => { holder.remove(); li.classList.remove('is-wait'); resolve(true); });
      review.addEventListener('click', () => {
        holder.innerHTML = '<span class="step__why">Prévia aberta para revisão antes de seguir.</span>';
        setTimeout(() => { if (id === run) { holder.remove(); li.classList.remove('is-wait'); resolve(true); } }, 1600);
      });
    });

    async function play() {
      const id = ++run;
      list.innerHTML = ''; result.hidden = true; result.innerHTML = '';
      for (const s of STEPS) {
        if (id !== run) return;
        const li = stepEl(s, trust);
        list.appendChild(li);
        await sleep(trust === 3 ? 380 : 700);
        if (id !== run) return;
        const needs = (trust === 1 && (s.irreversible || s.effect)) || (trust === 2 && s.irreversible);
        if (needs) { await waitApproval(li, id); if (id !== run) return; }
        li.classList.remove('is-running'); li.classList.add('is-done');
        $('.step__icon', li).textContent = '✓';
      }
      if (id !== run) return;
      result.hidden = false;
      if (trust === 3) {
        result.innerHTML = '<span>Pronto: dashboard publicado e relatório enviado ao cliente.</span><button type="button" data-undo>Desfazer</button>';
        $('[data-undo]', result).addEventListener('click', () => { result.innerHTML = '<span>Envio cancelado a tempo. Nas próximas 5 vezes vou pedir sua aprovação antes de enviar para fora.</span>'; });
      } else {
        result.innerHTML = `<span>Concluído em 5 passos, ${trust === 1 ? '2 aprovações' : '1 aprovação'}.</span><button type="button" data-next-trust>Confiar mais →</button>`;
        $('[data-next-trust]', result).addEventListener('click', () => setTrust(trust + 1));
      }
    }

    function setTrust(n) {
      trust = n;
      $$('[data-trust]', box).forEach((b) => b.setAttribute('aria-checked', String(Number(b.dataset.trust) === n)));
      hint.textContent = HINTS[n];
      play();
    }

    $$('[data-trust]', box).forEach((b) => b.addEventListener('click', () => setTrust(Number(b.dataset.trust))));
    $('[data-agent-replay]', box).addEventListener('click', play);
    new IntersectionObserver(([e], obs) => { if (e.isIntersecting && !started) { started = true; play(); obs.disconnect(); } }, { threshold: 0.35 }).observe(box);
  }

  /* ------------------------------------------------------------------------
     OrdenaHub: cada empresa logada liga os módulos do seu ramo e um registro
     anda pelo fluxo etapa por etapa (status, log e indicadores em sincronia).
     Troca de ramo sozinho até a pessoa clicar; pausa fora da tela.
     ------------------------------------------------------------------------ */
  function ordenahub() {
    const root = $('[data-oh]');
    if (!root) return;
    const MODS = ['Ordens de serviço', 'Orçamentos', 'Vendas', 'Compras', 'Estoque', 'Financeiro', 'Notas fiscais', 'Lojas e técnicos', 'Relatórios'];
    const ERP = ['Orçamentos', 'Vendas', 'Compras', 'Estoque', 'Financeiro', 'Notas fiscais', 'Relatórios'];
    // flow: [etapa, status do registro, cor, linha do log]; cards: [rótulo, valor, % barra, incremento ao concluir]
    const RAMOS = {
      assistencia: {
        emp: 'Cell Fix', label: 'Assistência técnica', on: ['Ordens de serviço', 'Financeiro', 'Lojas e técnicos', 'Relatórios'], tag: 'OS',
        flow: [['Pré-OS', 'pré-OS aberta', 'y', 'pré-OS criada no balcão'], ['Aprovação do cliente', 'aguardando cliente', 'y', 'link de aprovação enviado ao cliente'], ['Execução', 'em execução', 'v', 'técnico iniciou o reparo'], ['Concluída', 'concluída', 'g', 'OS concluída, cliente avisado'], ['Recebido', 'recebido', 'g', 'pagamento baixado no caixa']],
        recs: ['Oficina Lima, troca de tela', 'Cell Center, reparo de placa', 'João Prado, bateria', 'Ana Souza, conector de carga'], id: 1042,
        cards: [['OS abertas', 126, 46, 0], ['aguardando aprovação', 18, 22, 0], ['concluídas no mês', 342, 78, 1]],
      },
      usinagem: {
        emp: 'Tornearia Paes', label: 'Usinagem', on: ERP, tag: 'ORC',
        flow: [['Orçamento técnico', 'orçamento', 'y', 'orçamento técnico com desenho anexo'], ['Aprovação', 'aprovado', 'g', 'cliente aprovou o orçamento'], ['Venda', 'venda gerada', 'v', 'venda gerada a partir do orçamento'], ['Contas a receber', 'a receber', 'y', '3 parcelas lançadas no financeiro'], ['NF-e autorizada', 'NF-e autorizada', 'g', 'NF-e autorizada pela SEFAZ']],
        recs: ['Eixo em aço 1045, 40 un.', 'Flange em inox, 12 un.', 'Bucha em bronze, 80 un.'], id: 187,
        cards: [['orçamentos abertos', 23, 40, 0], ['pedidos no mês', 38, 52, 1], ['notas no mês', 61, 58, 1]],
      },
      comercio: {
        emp: 'Mercado Bom Preço', label: 'Comércio', on: ERP, tag: 'VND',
        flow: [['Venda no balcão', 'venda aberta', 'v', 'itens lançados no PDV'], ['Baixa no estoque', 'estoque baixado', 'v', 'saldo de estoque atualizado'], ['Recebimento', 'pago no PIX', 'g', 'PIX confirmado'], ['Financeiro', 'conciliado', 'g', 'lançado no fluxo de caixa'], ['NFC-e emitida', 'NFC-e emitida', 'g', 'NFC-e autorizada pela SEFAZ']],
        recs: ['Consumidor final, 3 itens', 'Mercado Bom Preço, 18 itens', 'Consumidor final, 1 item'], id: 5520,
        cards: [['vendas hoje', 64, 64, 1], ['itens em estoque', 1284, 82, -3], ['estoque crítico', 4, 12, 0]],
      },
      distribuidora: {
        emp: 'Distribuidora Gás', label: 'Distribuidora', on: ERP, tag: 'PED',
        flow: [['Pedido', 'pedido recebido', 'v', 'pedido do representante recebido'], ['Separação', 'em separação', 'y', 'itens reservados no estoque'], ['Faturamento', 'faturado', 'v', 'venda faturada em 30/60 dias'], ['NF-e', 'NF-e autorizada', 'g', 'NF-e autorizada, DANFE gerada'], ['Entrega', 'entregue', 'g', 'pedido marcado como entregue']],
        recs: ['Rede Super Ideal, 42 caixas', 'Empório Central, 16 caixas', 'Atacado Norte, 120 caixas'], id: 3310,
        cards: [['pedidos hoje', 27, 54, 1], ['em separação', 9, 30, 0], ['faturado no mês', 214, 70, 1]],
      },
      oficina: {
        emp: 'Auto Center Lima', label: 'Oficina mecânica', on: ['Ordens de serviço', 'Orçamentos', 'Estoque', 'Financeiro', 'Notas fiscais', 'Relatórios'], tag: 'OS',
        flow: [['Check-in', 'veículo recebido', 'v', 'checklist de entrada do veículo'], ['Orçamento', 'aguardando cliente', 'y', 'orçamento de peças e mão de obra'], ['Serviço', 'em serviço', 'v', 'peças baixadas do estoque'], ['Entrega', 'entregue', 'g', 'veículo entregue ao cliente'], ['NFS-e', 'NFS-e emitida', 'g', 'NFS-e da mão de obra emitida']],
        recs: ['Gol 2018, revisão 60 mil', 'Hilux 2021, freios', 'Onix 2020, embreagem'], id: 820,
        cards: [['carros no pátio', 11, 44, 0], ['aguardando peça', 3, 15, 0], ['entregues no mês', 96, 66, 1]],
      },
      servicos: {
        emp: 'Nunes Serviços', label: 'Prestação de serviços', on: ['Orçamentos', 'Vendas', 'Financeiro', 'Notas fiscais', 'Relatórios'], tag: 'PRP',
        flow: [['Proposta', 'proposta enviada', 'y', 'proposta enviada ao cliente'], ['Aprovação', 'aprovada', 'g', 'proposta aprovada'], ['Execução', 'em andamento', 'v', 'serviço em andamento'], ['Faturamento', 'faturado', 'v', 'conta a receber gerada'], ['NFS-e', 'NFS-e emitida', 'g', 'NFS-e emitida na prefeitura']],
        recs: ['Clínica Vida, manutenção mensal', 'Escritório Nunes, consultoria', 'Condomínio Aurora, limpeza'], id: 412,
        cards: [['contratos ativos', 58, 62, 0], ['propostas abertas', 14, 28, 0], ['faturado no mês', 47, 55, 1]],
      },
    };
    const KEYS = Object.keys(RAMOS);
    const hostEl = $('[data-oh-host]');
    const tenantsEl = $('[data-oh-tenants]');
    const modsEl = $('[data-oh-mods]');
    const pipeEl = $('[data-oh-pipe]');
    const rowsEl = $('[data-oh-rows]');
    const logEl = $('[data-oh-log]');
    const cardsEl = $('[data-oh-cards]');
    const fmt = (n) => n.toLocaleString(document.documentElement.lang.startsWith('en') ? 'en-US' : 'pt-BR');
    const now = () => new Date().toTimeString().slice(0, 8);
    const STEP_MS = 1500, HOLD_MS = 2400;

    tenantsEl.innerHTML = KEYS.map((k) => `<button type="button" class="vf__tenant" aria-pressed="false" data-ramo="${k}">${RAMOS[k].label}</button>`).join('');

    let key = KEYS[0], step = -1, seq = 0, timer = 0, typing = 0, visible = false, auto = true, history = [], state = {};

    const typeHost = (txt) => {
      clearInterval(typing);
      if (reduced) { hostEl.textContent = txt; return; }
      let i = 0;
      hostEl.textContent = '';
      typing = setInterval(() => { hostEl.textContent = txt.slice(0, ++i); if (i >= txt.length) clearInterval(typing); }, 45);
    };

    const drawRows = () => {
      const r = RAMOS[key];
      const [, st, c] = step >= 0 ? r.flow[step] : ['', 'na fila', 'y'];
      const rows = [[state.rec.id, state.rec.name, st, c, true], ...history.slice(0, 2)];
      rowsEl.innerHTML = rows.map(([a, b, s, cc, isLive], i) =>
        `<div class="vf__row${isLive ? ' is-live' : ''}" style="--r:${i}"><span class="mono">${a}</span><span>${b}</span><em class="vf__st vf__st--${cc}" data-st>${s}</em></div>`).join('');
    };

    const drawPipe = () => {
      const last = RAMOS[key].flow.length - 1;
      pipeEl.style.setProperty('--p', Math.max(step, 0) / last);
      pipeEl.classList.toggle('is-started', step >= 0);
      $$('.vf__node', pipeEl).forEach((n, i) => {
        n.classList.toggle('is-done', i < step || (step === last && i === step));
        n.classList.toggle('is-active', i === step && step < last);
      });
    };

    const drawCards = () => {
      cardsEl.innerHTML = state.cards.map(([l, v, w], i) =>
        `<div class="vf__card" style="--r:${i}"><span class="mono dim">${l}</span><b>${fmt(v)}</b><span class="vf__bar"><i style="--w:${Math.min(w, 96)}%"></i></span></div>`).join('');
    };

    const log = (txt) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="dim">${now()}</span><span class="vf__log-id">${state.rec.id}</span><span>${txt}</span>`;
      logEl.prepend(li);
      while (logEl.children.length > 3) logEl.lastElementChild.remove();
    };

    const newRecord = () => {
      const r = RAMOS[key];
      state.rec = { id: `${r.tag} ${r.id + seq}`, name: r.recs[seq % r.recs.length] };
      seq += 1;
    };

    const render = (k) => {
      key = k; step = -1; seq = 0; history = [];
      const r = RAMOS[k];
      state = { cards: r.cards.map((c) => [...c]) };
      $$('[data-ramo]', tenantsEl).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.ramo === k)));
      typeHost(tr(r.emp));
      modsEl.innerHTML = MODS.map((m, i) => `<span class="vf__mod${r.on.includes(m) ? '' : ' is-off'}" style="--r:${i}">${m}</span>`).join('');
      pipeEl.innerHTML = '<span class="vf__track"><i></i></span>' + r.flow.map(([p], i) => `<div class="vf__node" style="--n:${i}"><i></i><span>${p}</span></div>`).join('');
      logEl.innerHTML = '';
      newRecord();
      drawPipe(); drawRows(); drawCards();
    };

    // registro concluído: indicadores sobem e ele vai para o histórico
    const finish = () => {
      state.cards.forEach((c) => { c[1] += c[3]; if (c[3]) c[2] += 2; });
      drawCards();
      $$('.vf__card', cardsEl).forEach((el, i) => { if (state.cards[i][3]) el.classList.add('is-bump'); });
      const last = RAMOS[key].flow.at(-1);
      history.unshift([state.rec.id, state.rec.name, last[1], last[2], false]);
    };

    const tick = () => {
      clearTimeout(timer);
      if (!visible) return;
      const r = RAMOS[key];
      const last = r.flow.length - 1;
      if (step < last) {
        step += 1;
        drawPipe(); drawRows();
        log(r.flow[step][3]);
        $('.is-live [data-st]', rowsEl)?.classList.add('is-flip');
        if (step === last) finish();
        timer = setTimeout(tick, step === last ? HOLD_MS : STEP_MS);
        return;
      }
      // fim do ciclo: próximo ramo (automático) ou próximo registro do mesmo ramo
      if (auto) { render(KEYS[(KEYS.indexOf(key) + 1) % KEYS.length]); timer = setTimeout(tick, 900); return; }
      step = -1; newRecord(); drawPipe(); drawRows();
      timer = setTimeout(tick, 700);
    };

    const showDone = () => { const r = RAMOS[key]; step = r.flow.length - 1; drawPipe(); drawRows(); r.flow.forEach((f) => log(f[3])); };

    tenantsEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-ramo]');
      if (!b) return;
      auto = false;
      clearTimeout(timer);
      render(b.dataset.ramo);
      if (reduced) showDone(); else timer = setTimeout(tick, 500);
    });

    render(key);

    // sem movimento: mostra o fluxo inteiro concluído e só troca de ramo no clique
    if (reduced) { showDone(); return; }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => {
        visible = en.isIntersecting;
        clearTimeout(timer);
        if (visible) timer = setTimeout(tick, 500);
      }, { threshold: 0.35 }).observe(root);
    } else { visible = true; tick(); }
  }

  /* ------------------------------------------------------------------------
     Vetnix: contagem para a próxima dose e carteira digital do pet
     ------------------------------------------------------------------------ */
  function vetnix() {
    const el = $('[data-countdown]');
    let s = 12 * 60;
    setInterval(() => { s = s <= 0 ? 12 * 60 : s - 1; el.textContent = `${String((s / 60) | 0).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }, 1000);

    const TABS = {
      vacinas: `
        <div class="vv__item"><i class="ok">✓</i><div><b>V10</b><small>Aplicada em 12/03/2026</small></div></div>
        <div class="vv__item"><i class="ok">✓</i><div><b>Antirrábica</b><small>Aplicada em 12/03/2026</small></div></div>
        <div class="vv__item"><i class="next">!</i><div><b>Giárdia</b><small>Próxima dose em 18/11/2026</small></div></div>
        <div class="vv__item"><i class="next">!</i><div><b>Gripe canina</b><small>Próxima dose em 02/01/2027</small></div></div>`,
      boletins: `
        <div class="vv__note"><b>Hoje, 07h40</b>O Thor passou bem a noite, comeu sozinho e os sinais vitais estão estáveis. A previsão de alta é amanhã à tarde.</div>
        <div class="vv__note"><b>Ontem, 19h10</b>Cirurgia concluída sem intercorrências. Ele segue em observação.</div>`,
      consultas: `
        <div class="vv__item"><i class="ok">20</i><div><b>Cirurgia</b><small>Out 2026, Dra. Paula</small></div></div>
        <div class="vv__item"><i class="ok">14</i><div><b>Retorno com exames</b><small>Out 2026</small></div></div>
        <div class="vv__item"><i class="ok">02</i><div><b>Check-up anual</b><small>Set 2026</small></div></div>`,
    };
    const panel = $('[data-vx-panel]');
    const show = (k) => {
      $$('[data-vx-tab]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.vxTab === k)));
      panel.innerHTML = TABS[k];
      panel.style.animation = 'none'; void panel.offsetWidth; panel.style.animation = '';
    };
    $$('[data-vx-tab]').forEach((b) => b.addEventListener('click', () => show(b.dataset.vxTab)));
    show('vacinas');
  }

  /* ------------------------------------------------------------------------
     Mix Awards: figurinha holográfica e cápsula
     ------------------------------------------------------------------------ */
  function holo() {
    const area = $('[data-holo]'), card = $('[data-holo-card]'), log = $('[data-capsule-log]');
    // Figurinhas reais do álbum, copiadas para o portfólio (sem apontar para o site do Mix).
    // Cada raridade tem sempre a mesma figurinha; a Normal sorteia entre 3 fixas.
    const RAR = [
      { id: 'normal', name: 'Normal', p: 70, img: ['c1', 'c2', 'c3'] },
      { id: 'epica', name: 'Épica', p: 20, img: ['c4'] },
      { id: 'lendaria', name: 'Lendária', p: 7, img: ['c5'] },
      { id: 'mitica', name: 'Mítica', p: 2.5, img: ['c6'] },
      { id: 'god', name: 'GOD', p: 0.5, img: ['c7'] },
    ];
    const img = $('[data-holo-img]');
    RAR.flatMap((r) => r.img).forEach((f) => { new Image().src = `assets/img/stickers/${f}.webp`; });
    const rank = (id) => RAR.findIndex((r) => r.id === id);

    if (!reduced) {
      area.addEventListener('pointermove', (e) => {
        const r = area.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', `${(px - 0.5) * 22}deg`); card.style.setProperty('--rx', `${(0.5 - py) * 22}deg`);
        card.style.setProperty('--mx', `${px * 100}%`); card.style.setProperty('--my', `${py * 100}%`);
      });
      area.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    }
    if (mem.capsules) log.textContent = `${mem.capsules} cápsula${mem.capsules > 1 ? 's' : ''} aberta${mem.capsules > 1 ? 's' : ''} · sua melhor: ${RAR[rank(mem.best)]?.name ?? '—'}`;

    const btn = $('[data-capsule]');
    let busy = false;
    const openPack = async () => {
      if (busy) return;
      busy = true;
      if (area.classList.contains('is-open')) {
        // Fecha o pacote anterior e traz um novo
        area.classList.remove('is-open');
        await sleep(reduced ? 0 : 450);
      }
      area.classList.add('is-shaking');
      await sleep(reduced ? 0 : 650);
      area.classList.remove('is-shaking');
      reveal();
      area.classList.add('is-open');
      btn.textContent = 'Abrir outro pacote';
      await sleep(reduced ? 0 : 900);
      busy = false;
    };
    $('[data-pack]').addEventListener('click', openPack);
    btn.addEventListener('click', openPack);

    function reveal() {
      let roll = Math.random() * 100, pick = RAR[0];
      for (const r of RAR) { if (roll < r.p) { pick = r; break; } roll -= r.p; }
      card.classList.remove('is-flip'); void card.offsetWidth; card.classList.add('is-flip');
      setTimeout(() => {
        card.dataset.rarity = pick.id;
        $('[data-holo-rarity]').textContent = pick.name;
        img.src = `assets/img/stickers/${pick.img[(Math.random() * pick.img.length) | 0]}.webp`;
      }, 420);
      mem.capsules += 1;
      if (!mem.best || rank(pick.id) > rank(mem.best)) mem.best = pick.id;
      save();
      log.textContent = `Você tirou: ${pick.name} (${String(pick.p).replace('.', ',')}% de chance) · melhor até agora: ${RAR[rank(mem.best)].name}`;
    }
  }

  /* ------------------------------------------------------------------------
     Conhecimentos com filtro por experiência
     ------------------------------------------------------------------------ */
  /* Conhecimentos como inventário: cada tecnologia é um item, e a raridade
     vem de quantas fases da carreira a usaram. */
  function stack() {
    const bag = $('[data-stack-bag]'), detail = $('[data-stack-detail]'), sec = $('#stack');
    if (!bag || !detail) return;
    const ABBR = {
      TypeScript: 'TS', JavaScript: 'JS', Python: 'Py', Java: 'Jv', 'Spring Boot': 'SB', 'JPA e Hibernate': 'JPA', 'Node.js': 'NODE',
      AdonisJS: 'ADO', 'Express e Fastify': 'EXP', 'APIs REST': 'API', 'Lucid e Prisma': 'ORM', OAuth2: 'OA2', JWT: 'JWT', GCP: 'GCP', SQL: 'SQL', Kafka: 'KFK',
      'AWS SQS': 'SQS', 'AWS EventBridge': 'EVB', Webhooks: 'HOOK', 'Filas e workers': 'FILA', PostgreSQL: 'PG', DynamoDB: 'DDB',
      MongoDB: 'MDB', Redis: 'RDS', 'AWS Lambda': 'λ', 'AWS EC2, RDS e S3': 'EC2', Terraform: 'TF', Docker: 'DKR',
      'GitHub Actions': 'GHA', Jenkins: 'JNK', 'Nginx e PM2': 'NGX', 'Microsserviços': 'MS', 'Arquitetura hexagonal': 'HEX',
      'Orientação a eventos': 'EDA', 'SaaS multi-tenant': 'SaaS', 'Testes unitários e de integração': 'TEST',
      'Grafana, Splunk e CloudWatch': 'OBS', React: 'RCT', Svelte: 'SV', 'Vue.js': 'VUE', 'Tailwind CSS': 'TW', Vite: 'VT',
      'TanStack Query': 'TQ', 'Framer Motion': 'FM', LLMs: 'LLM', 'Agentes e orquestração': 'AGT', 'Tool calling': 'TOOL',
      Skills: 'SKL', Antifraude: 'AF', Pagamentos: 'PAY', 'Dados regulatórios BACEN': 'BCB', 'Seguros e apólices': 'SEG',
      'Emissão fiscal SEFAZ': 'NFe', 'Marketing e mídia': 'MKT',
    };
    const RARITY = ['comum', 'incomum', 'rara', 'lendária'];
    const abbr = (name) => ABBR[name] || name.split(/\s+/).map((w) => w[0]).join('').slice(0, 3).toUpperCase();
    const total = STACK.reduce((n, g) => n + g.items.length, 0);
    const idle = () => {
      detail.innerHTML = '<p class="inv__hint">Passe o mouse ou toque num item para ver onde e quando eu usei.</p>' +
        '<p class="inv__count mono"><b>' + total + '</b> itens · <b>' + STACK.length + '</b> categorias</p>';
    };

    bag.innerHTML = STACK.map((g) => '<section class="inv__cat reveal"><h3 class="inv__cat-title mono">' + g.g +
      '<span>' + String(g.items.length).padStart(2, '0') + '</span></h3><div class="inv__slots">' +
      g.items.map(([name, p]) => '<button type="button" class="slot r' + p.length + '" data-p="' + p + '" data-name="' + name +
        '" data-group="' + g.g + '"><span class="slot__icon" aria-hidden="true">' + abbr(name) + '</span><span class="slot__name">' + name +
        '</span><span class="slot__pips" aria-hidden="true">' + [...p].map((c) => '<i style="background:' + PLACES[c].c + '"></i>').join('') +
        '</span></button>').join('') + '</div></section>').join('');

    let filter = 'all', pinned = null;
    const show = (slot) => {
      const p = slot.dataset.p;
      detail.innerHTML = '<p class="inv__rarity r' + p.length + ' mono">' + RARITY[p.length - 1] + ' · ' + slot.dataset.group + '</p>' +
        '<p class="inv__name">' + slot.dataset.name + '</p><ul class="inv__where">' +
        [...p].map((c) => '<li><i style="background:' + PLACES[c].c + '"></i>' + PLACES[c].name + '<small>' + PLACES[c].when + '</small></li>').join('') + '</ul>';
    };
    const summary = () => {
      if (filter === 'all') return idle();
      const count = $$('.slot', bag).filter((s) => s.dataset.p.includes(filter)).length;
      detail.innerHTML = '<p class="inv__rarity mono" style="color:' + PLACES[filter].c + '">fase equipada</p><p class="inv__name">' + PLACES[filter].name +
        '</p><p class="inv__hint">' + PLACES[filter].when + ': <b>' + count + '</b> itens usados no dia a dia.</p>';
    };
    $$('.slot', bag).forEach((slot) => {
      slot.addEventListener('mouseenter', () => show(slot));
      slot.addEventListener('focus', () => show(slot));
      slot.addEventListener('mouseleave', () => (pinned ? show(pinned) : summary()));
      slot.addEventListener('blur', () => (pinned ? show(pinned) : summary()));
      slot.addEventListener('click', () => {
        pinned = pinned === slot ? null : slot;
        $$('.slot', bag).forEach((s) => s.classList.toggle('is-pinned', s === pinned));
        pinned ? show(pinned) : summary();
      });
    });
    $$('[data-filter]', sec).forEach((b) => b.addEventListener('click', () => {
      filter = b.dataset.filter; pinned = null;
      $$('[data-filter]', sec).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      sec.classList.toggle('is-filtered', filter !== 'all');
      sec.style.setProperty('--f', PLACES[filter]?.c || 'var(--accent)');
      $$('.slot', bag).forEach((s) => { s.classList.remove('is-pinned'); s.classList.toggle('is-match', filter !== 'all' && s.dataset.p.includes(filter)); });
      $$('.inv__cat', bag).forEach((c) => c.classList.toggle('is-empty', filter !== 'all' && !$('.is-match', c)));
      summary();
    }));
    idle();
  }

  /* ------------------------------------------------------------------------
     Contato e aviso
     ------------------------------------------------------------------------ */
  function toast(msg) {
    const t = $('[data-toast]');
    t.textContent = msg; t.classList.add('is-on');
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('is-on'), 2600);
  }
  function copy() {
    $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy); toast('E-mail copiado'); $('[data-copy-label]', b).textContent = 'copiado ✓'; }
      catch { location.href = `mailto:${b.dataset.copy}`; }
    }));
  }

  /* ------------------------------------------------------------------------
     Pergunte ao portfólio (Ctrl K)
     ------------------------------------------------------------------------ */
  const dock = $('[data-dock]'), log = $('[data-dock-log]'), input = $('[data-dock-input]');
  let lastFocus = null, typing = 0;
  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function renderSuggestions() {
    const box = $('[data-dock-suggest]');
    if (!box) return;
    const lens = document.body.dataset.lens || 'rec';
    const asked = mem.chat.map((m) => m.id);
    box.innerHTML = ASSIST.suggestions(lens, asked).map((id) => {
      const k = ASSIST.KB.find((x) => x.id === id);
      return `<button type="button" data-q="${id}" class="${asked.includes(id) ? 'is-asked' : ''}">${k.q}</button>`;
    }).join('');
    $$('[data-q]', box).forEach((b) => b.addEventListener('click', () => ask(ASSIST.KB.find((x) => x.id === b.dataset.q).q)));
  }

  const answer = (q) => ASSIST.answer(q);

  function bubble(role, html) {
    const d = document.createElement('div');
    d.className = `msg msg--${role}`; d.innerHTML = html;
    log.appendChild(d); log.scrollTop = log.scrollHeight;
    return d;
  }

  async function stream(el, text, id) {
    if (reduced) { el.textContent = text; return; }
    for (let i = 0; i <= text.length; i += 3) {
      if (id !== typing) { el.textContent = text; return; }
      el.innerHTML = `${text.slice(0, i)}<span class="msg__cursor"></span>`;
      log.scrollTop = log.scrollHeight;
      await sleep(11);
    }
    el.textContent = text;
  }

  async function ask(q) {
    q = q.trim(); if (!q) return;
    bubble('me', escapeHtml(q));
    const r = answer(q), id = ++typing;
    const d = bubble('bot', '<p></p>');
    await sleep(220);
    await stream($('p', d), tr(r.a), id);
    const meta = document.createElement('div');
    meta.className = 'msg__meta';
    meta.innerHTML = `confiança ${r.conf} · fonte ${r.src.map(([l, h]) => `<a href="${h}" data-close-agent>${l}</a>`).join('')}`;
    d.appendChild(meta);
    $$('[data-close-agent]', meta).forEach((a) => a.addEventListener('click', closeDock));
    mem.chat.push({ q, id: r.id, at: Date.now() }); mem.chat = mem.chat.slice(-10);
    save(); renderSuggestions();
    log.scrollTop = log.scrollHeight;
  }

  function openDock() {
    if (!dock.hidden) return;
    lastFocus = document.activeElement;
    dock.hidden = false; document.body.style.overflow = 'hidden';
    if (!log.children.length) {
      const lastQ = previous.chat.at(-1);
      bubble('bot', `<p>${lastQ
        ? `Oi de novo. Da última vez você perguntou "${escapeHtml(lastQ.q)}". Quer continuar de onde parou?`
        : `Oi! Pergunte sobre a carreira, os projetos ou a disponibilidade do Rafael. As sugestões mudam conforme o modo de leitura: agora estou no modo ${LENS_NAMES[document.body.dataset.lens]}.`}</p>`);
    }
    renderSuggestions();
    setTimeout(() => input.focus(), 50);
  }
  function closeDock() {
    if (dock.hidden) return;
    dock.hidden = true; document.body.style.overflow = '';
    lastFocus?.focus?.();
  }
  function dockInit() {
    $$('[data-open-agent]').forEach((b) => b.addEventListener('click', openDock));
    $$('[data-close-agent]', dock).forEach((b) => b.addEventListener('click', closeDock));
    $('[data-dock-form]').addEventListener('submit', (e) => { e.preventDefault(); const q = input.value; input.value = ''; ask(q); });
    addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); dock.hidden ? openDock() : closeDock(); }
      else if (e.key === 'Escape') closeDock();
      else if (e.key === '/' && dock.hidden && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); openDock(); }
    });
    dock.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const f = $$('button, input, a[href]', $('.dock__panel')).filter((x) => x.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
      else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
    });
  }

  /* ------------------------------------------------------------------------
     Rodapé: o que o site lembra + esquecer
     ------------------------------------------------------------------------ */
  function renderMemorySummary() {
    const el = $('[data-memory-summary]');
    if (!el) return;
    const since = new Date(mem.firstSeen).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const names = mem.seen.map((id) => document.getElementById(id)?.dataset.chapter).filter(Boolean);
    const bits = [
      `Visita nº ${mem.visits}, desde ${since}.`,
      `Modo de leitura: ${mem.lens ? LENS_NAMES[mem.lens] : 'ainda não escolhido'}.`,
      `Seções vistas: ${names.length} de ${$$('[data-chapter]').length}${names.length ? ` (${names.slice(-4).join(', ')}${names.length > 4 ? '…' : ''})` : ''}.`,
    ];
    if (mem.chat.length) bits.push(`Perguntas feitas: ${mem.chat.length}.`);
    if (mem.capsules) bits.push(`Cápsulas abertas: ${mem.capsules}.`);
    el.textContent = bits.join(' ');
  }
  function forget() {
    $('[data-forget]').addEventListener('click', () => {
      try { localStorage.removeItem(KEY); } catch { /* ignore */ }
      mem = blank(); mem.visits = 1; mem.lastSeen = Date.now();
      previous.chat = []; previous.lastSection = null; previous.lens = null;
      log.innerHTML = '';
      setLens('rec', { remember: false });
      setChip('Memória apagada. Para este site, você é uma visita nova.');
      $('[data-capsule-log]').textContent = 'clique no pacote para abrir';
      save(); toast('Memória apagada');
    });
  }

  /* ------------------------------------------------------------------------
     Início
     ------------------------------------------------------------------------ */
  splitWords();
  ticker();
  heatmap();
  stack();
  lensSwitch();
  initialChip();
  clock();
  reveals();
  chapters();
  journey();
  scrollChrome();
  field();
  rotator();
  agentDemo();
  ordenahub();
  vetnix();
  holo();
  copy();
  dockInit();
  forget();
  renderMemorySummary();
  save();
  boot();
})();
