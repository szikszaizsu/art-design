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
})();
