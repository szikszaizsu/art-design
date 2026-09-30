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
