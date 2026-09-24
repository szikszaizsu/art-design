const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#main-nav');

document.querySelectorAll('img').forEach((image) => {
  image.draggable = false;
  image.addEventListener('contextmenu', (event) => event.preventDefault());
  image.addEventListener('dragstart', (event) => event.preventDefault());
});

// Discourage copying: no context menu, dragging or save/source/print shortcuts anywhere on the page.
const isFormField = (target) => target instanceof Element && target.closest('input, textarea, select');
document.addEventListener('contextmenu', (event) => { if (!isFormField(event.target)) event.preventDefault(); });
document.addEventListener('dragstart', (event) => event.preventDefault());
document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if ((event.ctrlKey || event.metaKey) && ['s', 'u', 'p'].includes(key)) event.preventDefault();
});

const galleryPreview = document.querySelector('.gallery-preview');
const galleryPreviewImage = galleryPreview?.querySelector('img');

if (galleryPreview && galleryPreviewImage) {
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const galleryItems = [...document.querySelectorAll('.gallery-item')];
  const galleryCounter = document.createElement('span');
  galleryCounter.className = 'gallery-counter';
  galleryPreview.append(galleryCounter);
  let currentIndex = 0;

  const showImage = (index) => {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const sourceImage = galleryItems[currentIndex].querySelector('img');
    galleryPreviewImage.src = sourceImage.currentSrc || sourceImage.src;
    galleryPreviewImage.alt = sourceImage.alt;
    galleryCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
  };

  const closePreview = () => {
    galleryPreview.classList.remove('open');
    galleryPreview.setAttribute('aria-hidden', 'true');
    galleryPreviewImage.style.transform = '';
    galleryPreviewImage.style.opacity = '';
  };

  galleryItems.forEach((item, index) => {
    const openPreview = () => {
      showImage(index);
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

  // Touch: swipe left/right to page through the gallery, tap to close.
  const slideTransition = 'transform .22s ease, opacity .22s ease';
  let touchStartX = 0;
  let touchStartY = 0;
  let touchDeltaX = 0;
  let suppressClick = false;

  galleryPreview.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    touchDeltaX = 0;
    suppressClick = false;
    galleryPreviewImage.style.transition = 'none';
  }, { passive: true });

  galleryPreview.addEventListener('touchmove', (event) => {
    touchDeltaX = event.touches[0].clientX - touchStartX;
    const deltaY = event.touches[0].clientY - touchStartY;
    if (Math.abs(touchDeltaX) > Math.abs(deltaY)) {
      galleryPreviewImage.style.transform = `translateX(${touchDeltaX}px)`;
    }
  }, { passive: true });

  galleryPreview.addEventListener('touchend', () => {
    galleryPreviewImage.style.transition = slideTransition;
    if (Math.abs(touchDeltaX) > 10) suppressClick = true;
    if (Math.abs(touchDeltaX) < 50 || galleryItems.length < 2) {
      galleryPreviewImage.style.transform = '';
      return;
    }
    const direction = touchDeltaX < 0 ? 1 : -1;
    galleryPreviewImage.style.transform = `translateX(${-direction * 100}vw)`;
    galleryPreviewImage.style.opacity = '0';
    setTimeout(() => {
      showImage(currentIndex + direction);
      galleryPreviewImage.style.transition = 'none';
      galleryPreviewImage.style.transform = `translateX(${direction * 100}vw)`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        galleryPreviewImage.style.transition = slideTransition;
        galleryPreviewImage.style.transform = '';
        galleryPreviewImage.style.opacity = '';
      }));
    }, 200);
  });

  galleryPreview.addEventListener('click', () => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    closePreview();
  });
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

const hero = document.querySelector('.hero');
const heroCopy = hero?.querySelector('.hero-copy');
if (hero && heroCopy) {
  const syncHeroHeight = () => hero.style.setProperty('--hero-copy-height', `${heroCopy.offsetHeight}px`);
  syncHeroHeight();
  if ('ResizeObserver' in window) new ResizeObserver(syncHeroHeight).observe(heroCopy);
  else window.addEventListener('resize', syncHeroHeight);
}

const sectionLinks =[...document.querySelectorAll('#main-nav a[href^="#"]')];
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

