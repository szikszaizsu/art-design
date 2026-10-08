// Beúszás: a főmondat szavai betöltéskor egyenként, enyhe elmosódásból élesednek ki, utána a többi szöveg is.
// A fordítás (language.js) után fut, ezért a már lefordított mondatot bontja szavakra.
(() => {
  const hero = document.querySelector('.hv-hero-solo');
  const lead = hero && hero.querySelector('.hv-lead');
  if (!lead || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const words = lead.textContent.trim().split(/\s+/);
  lead.setAttribute('aria-label', lead.textContent.trim());
  lead.innerHTML = words.map((w, i) => `<span class="hv-w" aria-hidden="true" style="--i:${i}">${w}</span>`).join(' ');
  hero.classList.add('hv-intro');
})();
