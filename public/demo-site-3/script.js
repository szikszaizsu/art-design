// Mobile menu
const burger = document.querySelector('.burger'), menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('open'); });

// Stories slider arrows
const track = document.querySelector('.track');
const step = () => track.querySelector('.story').offsetWidth + 16;
document.querySelector('.stories .prev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
document.querySelector('.stories .next').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

// Demo form: never sends data
document.querySelector('.form').addEventListener('submit', e => { e.preventDefault(); e.target.classList.add('sent'); });

// Scroll reveal (WestHills-style): blocks fade up 24px, photos scale in from .96, siblings stagger by 0.1s.
// <html class="js"> is set in <head>; it is skipped for ?static screenshots and prefers-reduced-motion.
if (document.documentElement.classList.contains('js')) {
  const groups = {
    up: ['.about .ab-text > *', '.panel > .kick', '.panel > h2', '.panel > .sub', '.cm-head', '.st-head > *', '.nums',
         '.sto-head > *', '.dr', '.fq-left > .kick', '.fq-left > h2', '.fq-left > .fq-who', '.msg', '.ct-form', '.big', '.f-info > div'],
    media: ['.ab-bento > *', '.p-grid article', '.menu-card', '.st-grid article', '.story', '.fq-left figure', '.ct-photo', '.dr .d-frame'],
  };
  const all = [];
  for (const [kind, sels] of Object.entries(groups))
    document.querySelectorAll(sels.join(',')).forEach(el => { el.dataset.reveal = kind; all.push(el); });
  // stagger siblings that reveal together (cards in a row, chat bubbles, ...)
  all.forEach(el => {
    const sibs = [...el.parentElement.children].filter(c => c.dataset.reveal);
    el.style.setProperty('--d', Math.min(sibs.indexOf(el), 5) * 0.1 + 's');
  });
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  all.forEach(el => io.observe(el));
}
