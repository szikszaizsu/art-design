// demo-site-2: menu, about tabs, review slider, FAQ accordion, demo call-back form, reveal
const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
const bur = $('.burger'), menu = $('#menu');
bur.addEventListener('click', () => { const o = menu.classList.toggle('open'); bur.setAttribute('aria-expanded', o); });
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); bur.setAttribute('aria-expanded', false); }));

$$('.tabs button').forEach((b, i) => b.addEventListener('click', () => {
  $$('.tabs button').forEach((x, k) => x.classList.toggle('on', k === i));
  $$('.tpane').forEach((p, k) => p.classList.toggle('on', k === i));
}));

const qs = [...$$('.te-q figure')]; let qi = 0, qt;
const show = i => { qi = (i + qs.length) % qs.length; qs.forEach((f, k) => f.classList.toggle('on', k === qi)); };
const auto = () => { clearInterval(qt); qt = setInterval(() => show(qi + 1), 7000); };
$('.te-prev').onclick = () => { show(qi - 1); auto(); };
$('.te-next').onclick = () => { show(qi + 1); auto(); };
auto();

$$('.acc details').forEach(d => d.addEventListener('toggle', () => { if (d.open) $$('.acc details').forEach(o => o !== d && (o.open = false)); }));

const form = $('.form');
form.addEventListener('submit', e => { e.preventDefault(); form.classList.add('sent'); form.reset(); });

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
$$('.reveal').forEach(el => location.search.includes('static') ? el.classList.add('in') : io.observe(el));
const nav = $('.nav'); addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });
