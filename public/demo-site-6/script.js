(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var nav = $('#nav'), burger = $('.burger');
  burger.addEventListener('click', function () { nav.classList.toggle('open'); });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); }); });

  var lang = $('.lang');
  $('.lang > button').addEventListener('click', function (e) { e.stopPropagation(); lang.classList.toggle('open'); });
  document.addEventListener('click', function () { lang.classList.remove('open'); });

  $$('.trk button').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.trk').forEach(function (t) { t.classList.remove('on'); });
      b.parentNode.classList.add('on');
    });
  });

  var q = $('#q'), none = $('#none'), pieces = $$('.piece');
  q.addEventListener('input', function () {
    var v = q.value.trim().toLowerCase(), n = 0;
    pieces.forEach(function (p) {
      var ok = !v || p.getAttribute('data-q').indexOf(v) > -1;
      p.style.display = ok ? '' : 'none';
      if (ok) n++;
    });
    none.hidden = n > 0;
  });
  pieces.forEach(function (p) { p.addEventListener('click', function () { p.classList.toggle('on'); }); });

  var still = /[?&]static/.test(location.search) || matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!still && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, to = +el.getAttribute('data-n'), s = el.getAttribute('data-s') || '', t0 = performance.now();
        (function tick(t) {
          var k = Math.min(1, (t - t0) / 1100), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
          el.textContent = v + s;
          if (k < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: .6 });
    $$('.stat b').forEach(function (b) { b.textContent = '0' + (b.getAttribute('data-s') || ''); io.observe(b); });
  }

  // scroll-linked reveal (as on the reference site): blocks fade in and rise 24px (sheet 60px), hero text fades out upward
  var still2 = /[?&]static/.test(location.search) || matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!still2) {
    var items = [];
    function add(sel, amt) { $$(sel).forEach(function (el) { el.classList.add('rv'); items.push({ el: el, amt: amt }); }); }
    add('.sheet', 60);
    add('.intro, .stats, .listen .album, .listen .player, .shead, .clist, .packs, .rep > div, .pqs, .rvs, .mems, .posts, .faqw > div, .close-in h2, .foot-in .fbrand', 24);
    add('.close-in p, .close-in .cta', 16);
    var heroIn = $('.hero-in'), nextc = $('.nextc');
    function ease(t) { return t * t; }
    var ticking = false;
    function frame() {
      ticking = false;
      var vh = innerHeight, y = scrollY;
      items.forEach(function (it) {
        var top = it.el.getBoundingClientRect().top;
        var lin = Math.min(1, Math.max(0, (vh + 80 - top) / (vh * 0.88 + 80)));
        var p = ease(lin);
        if (p >= 0.999) { it.el.style.opacity = ''; it.el.style.transform = ''; }
        else { it.el.style.opacity = p.toFixed(3); it.el.style.transform = 'translateY(' + ((1 - p) * it.amt).toFixed(1) + 'px)'; }
      });
      var h = Math.min(1, y / 420);
      heroIn.style.opacity = (1 - h).toFixed(3);
      heroIn.style.transform = 'translateY(' + (-40 * h).toFixed(1) + 'px)';
      if (nextc) nextc.style.opacity = (1 - Math.min(1, y / 520)).toFixed(3);
    }
    function req() { frame(); }
    addEventListener('scroll', req, { passive: true });
    addEventListener('resize', req);
    frame();
  }
})();
