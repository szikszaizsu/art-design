const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#main-nav');

document.querySelectorAll('img').forEach((image) => {
  image.draggable = false;
  image.addEventListener('contextmenu', (event) => event.preventDefault());
  image.addEventListener('dragstart', (event) => event.preventDefault());
});

const galleryPreview = document.querySelector('.gallery-preview');
const galleryPreviewImage = galleryPreview?.querySelector('img');

if (galleryPreview && galleryPreviewImage) {
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const closePreview = () => {
    galleryPreview.classList.remove('open');
    galleryPreview.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('.gallery-item').forEach((item) => {
    const sourceImage = item.querySelector('img');
    const openPreview = () => {
      galleryPreviewImage.src = sourceImage.currentSrc || sourceImage.src;
      galleryPreviewImage.alt = sourceImage.alt;
      galleryPreview.classList.add('open');
      galleryPreview.setAttribute('aria-hidden', 'false');
    };

    if (hasFinePointer) {
      item.addEventListener('mouseenter', openPreview);
      item.addEventListener('mouseleave', closePreview);
      item.addEventListener('focusin', openPreview);
      item.addEventListener('focusout', closePreview);
    } else {
      item.addEventListener('click', openPreview);
    }
  });

  galleryPreview.addEventListener('click', closePreview);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePreview();
  });
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const sectionLinks = [...document.querySelectorAll('#main-nav a[href^="#"]')];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

window.addEventListener('load', () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  target?.scrollIntoView({ block: 'start' });
});

const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    const data = new FormData(form);
    const english = document.documentElement.lang === 'en';
    const romanian = document.documentElement.lang === 'ro';
    form.elements._subject.value = `${romanian ? 'Mesaj de pe site' : english ? 'Website enquiry' : 'Weboldalas megkeresés'} — ${data.get('service')}`;
  });
}

