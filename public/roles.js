(() => {
  const hero = document.querySelector('.role-hero');
  if (!hero) return;

  const copy = {
    hu: {
      artist: { label: 'Művész', eyebrow: '01 · Művész', title: 'Kézzel alkotott történetek.', description: 'Gyöngyfűzés, tojásírás és személyes művek, ahol minden részletnek jelentése van.', cta: 'Hagyományos technikák', href: 'hagyomanyos-munkak/' },
      designer: { label: 'Tervező', eyebrow: '02 · Tervező', title: 'Ötletből vizuális élmény.', description: 'Vizuális kampányok, márkaképek és digitális illusztrációk, amelyek világosan mesélnek történetet.', cta: 'Digitális munkák', href: 'digitalis-munkak/' }
    },
    en: {
      artist: { label: 'Artist', eyebrow: '01 · Artist', title: 'Stories made by hand.', description: 'Beadwork, wax-resist egg decorating and personal pieces where every detail has meaning.', cta: 'Traditional techniques', href: 'hagyomanyos-munkak/' },
      designer: { label: 'Designer', eyebrow: '02 · Designer', title: 'Ideas become visual experiences.', description: 'Visual campaigns, brand imagery and digital illustrations that tell a story with clarity.', cta: 'Digital work', href: 'digitalis-munkak/' }
    },
    ro: {
      artist: { label: 'Artistă', eyebrow: '01 · Artistă', title: 'Povești create de mână.', description: 'Lucrări din mărgele, încondeierea ouălor și piese personale, în care fiecare detaliu are un sens.', cta: 'Tehnici tradiționale', href: 'hagyomanyos-munkak/' },
      designer: { label: 'Designer', eyebrow: '02 · Designer', title: 'Ideile devin experiențe vizuale.', description: 'Campanii vizuale, imagini de brand și ilustrații digitale care spun o poveste clară.', cta: 'Lucrări digitale', href: 'digitalis-munkak/' }
    }
  };

  const buttons = [...hero.querySelectorAll('.role-choice')];
  const eyebrow = hero.querySelector('[data-role-eyebrow]');
  const title = hero.querySelector('[data-role-title]');
  const description = hero.querySelector('[data-role-description]');
  const link = hero.querySelector('[data-role-link]');
  let role = 'artist';

  function render() {
    const lang = ['hu', 'en', 'ro'].includes(document.documentElement.lang) ? document.documentElement.lang : 'hu';
    const content = copy[lang][role];
    hero.dataset.role = role;
    buttons.forEach(button => {
      const selected = button.dataset.role === role;
      button.textContent = copy[lang][button.dataset.role].label;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-selected', String(selected));
    });
    eyebrow.textContent = content.eyebrow;
    title.textContent = content.title;
    description.textContent = content.description;
    link.href = content.href;
    link.innerHTML = `${content.cta} <span aria-hidden="true">↗</span>`;
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    role = button.dataset.role;
    render();
  }));
  window.addEventListener('portfolio-language-change', render);
  render();
})();
