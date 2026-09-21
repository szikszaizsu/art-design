(() => {
  const parameters = new URLSearchParams(location.search);
  if (parameters.get('own-visit') === '1') localStorage.setItem('portfolio-exclude-visits', '1');
  if (parameters.get('own-visit') === '0') localStorage.removeItem('portfolio-exclude-visits');
  const excluded = localStorage.getItem('portfolio-exclude-visits') === '1';
  const footer = document.querySelector('.footer-bottom');
  if (!footer) return;
  const counter = document.createElement('p');
  counter.className = 'visit-counter';
  counter.hidden = true;
  footer.append(counter);
  let count;
  function render() {
    if (count === undefined) return;
    const english = document.documentElement.lang === 'en';
    const romanian = document.documentElement.lang === 'ro';
    counter.textContent = `${romanian ? 'Vizite' : english ? 'Visits' : 'Látogatások'}: ${new Intl.NumberFormat(document.documentElement.lang).format(count)}`;
    counter.title = romanian ? 'Vizite de la activarea contorului. O nouă vizită începe după 30 de minute fără încărcarea unei pagini.' : english ? 'Visits since the counter was launched. A new visit starts after 30 minutes without loading a page.' : 'Látogatások a számláló indítása óta. Új látogatásnak számít, ha legalább 30 percig nem töltöttél be oldalt.';
    counter.hidden = false;
  }
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  fetch('/api/visits', { method: excluded ? 'GET' : 'POST', headers: excluded ? {} : { 'X-Visit-Counter': '1' }, credentials: 'same-origin', cache: 'no-store' })
    .then(response => { if (!response.ok) throw new Error('Unavailable'); return response.json(); })
    .then(data => { if (Number.isSafeInteger(data.count) && data.count >= 0) { count = data.count; render(); } })
    .catch(() => { /* Never display an invented count if the service is unavailable. */ });
})();
