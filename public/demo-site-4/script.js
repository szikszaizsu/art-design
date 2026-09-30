// Mobile menu
const burger = document.querySelector('.burger'), menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('open'); });

// Stories slider: one story per view, arrows wrap around
const track = document.querySelector('.track');
const go = dir => {
  const w = track.clientWidth + 16, max = track.scrollWidth - track.clientWidth - 2;
  let x = track.scrollLeft + dir * w;
  if (x > max + w / 2) x = 0; else if (x < -w / 2) x = max;
  track.scrollTo({ left: x, behavior: 'smooth' });
};
document.querySelector('.stories .prev').addEventListener('click', () => go(-1));
document.querySelector('.stories .next').addEventListener('click', () => go(1));

// FAQ: keep one answer open at a time
document.querySelectorAll('.acc details').forEach(d => d.addEventListener('toggle', () => {
  if (d.open) document.querySelectorAll('.acc details').forEach(o => { if (o !== d) o.open = false; });
}));

// Scroll reveal: blocks fade up 24px, photos/cards scale in from .96, siblings stagger by 0.1s.
// <html class="js"> is set in <head>; it is skipped for ?static screenshots and prefers-reduced-motion.
if (document.documentElement.classList.contains('js')) {
  const groups = {
    up: ['.head', '.why-text > *', '.fam-text > *', '.sto-head > *', '.dr-head', '.d-cols li', '.dr-foot', '.acc details', '.o-in', '.f-top > div'],
    media: ['.s-grid article', '.nums', '.why-top figure', '.team article', '.plan', '.track', '.dr-stage', '.faq figure'],
  };
  const all = [];
  for (const [kind, sels] of Object.entries(groups))
    document.querySelectorAll(sels.join(',')).forEach(el => { el.dataset.reveal = kind; all.push(el); });
  all.forEach(el => {
    const sibs = [...el.parentElement.children].filter(c => c.dataset.reveal);
    el.style.setProperty('--d', Math.min(sibs.indexOf(el), 5) * 0.1 + 's');
  });
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  all.forEach(el => io.observe(el));
}
