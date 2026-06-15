/* ====================================================
   VOV ENHANCE — JS: Breaking News Ticker + Lazy Load
   ==================================================== */
(function () {
  'use strict';

  /* ── BREAKING NEWS TICKER ── */
  function initTicker() {
    // Gather article links already on the page
    var links = [];
    var selectors = [
      '.title-news a', '.card-title a', '.article-title a',
      'h3 a', 'h2 a', '.node-title a'
    ];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        var text = el.textContent.trim();
        if (text.length > 20 && links.length < 12) {
          links.push({ text: text, href: el.href || '#' });
        }
      });
    });

    if (links.length === 0) return; // nothing to show

    // Build ticker HTML
    var bar = document.createElement('div');
    bar.id = 'vov-ticker-bar';

    var label = document.createElement('span');
    label.className = 'ticker-label';
    label.textContent = '🔴 VOV | Tin mới';
    bar.appendChild(label);

    var textWrap = document.createElement('span');
    textWrap.className = 'ticker-text';

    links.forEach(function (item, idx) {
      var span = document.createElement('span');
      span.className = 'ticker-item' + (idx === 0 ? ' active' : '');
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = '▶ ' + item.text;
      span.appendChild(a);
      textWrap.appendChild(span);
    });

    bar.appendChild(textWrap);

    // Insert before main content
    var insertTarget =
      document.getElementById('main-content') ||
      document.querySelector('.vovvn-body') ||
      document.querySelector('main') ||
      document.querySelector('.layout-container') ||
      document.body.firstElementChild;

    if (insertTarget && insertTarget.parentNode) {
      insertTarget.parentNode.insertBefore(bar, insertTarget);
    } else {
      document.body.insertBefore(bar, document.body.firstChild);
    }

    // Auto-cycle every 4 seconds
    var current = 0;
    var items = bar.querySelectorAll('.ticker-item');
    setInterval(function () {
      items[current].classList.remove('active');
      current = (current + 1) % items.length;
      items[current].classList.add('active');
    }, 4000);
  }

  /* ── LAZY LOADING ── */
  function initLazyLoad() {
    if (!('IntersectionObserver' in window)) return;
    var imgs = document.querySelectorAll('img:not([loading])');
    var aboveFold = window.innerHeight;
    imgs.forEach(function (img) {
      var rect = img.getBoundingClientRect();
      if (rect.top > aboveFold) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }

  /* ── ACTIVE NAV ITEM on scroll ── */
  function initActiveNav() {
    var navLinks = document.querySelectorAll('.vovvn-navbar .nav-link, .main-menu .nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        navLinks.forEach(function (l) { l.style.borderBottom = ''; });
        this.style.borderBottom = '2px solid #c0392b';
        this.style.color = '#c0392b';
      });
      link.addEventListener('mouseleave', function () {
        this.style.borderBottom = '';
        if (!this.classList.contains('active')) this.style.color = '';
      });
    });
  }

  /* ── SMOOTH IMAGE REVEAL on scroll ── */
  function initImageReveal() {
    if (!('IntersectionObserver' in window)) return;
    var style = document.createElement('style');
    style.textContent = [
      '.vov-img-hidden { opacity: 0; transform: translateY(10px); transition: opacity .4s ease, transform .4s ease; }',
      '.vov-img-visible { opacity: 1; transform: none; }'
    ].join('');
    document.head.appendChild(style);

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.replace('vov-img-hidden', 'vov-img-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    // Only apply to images below the fold
    var aboveFold = window.innerHeight;
    document.querySelectorAll('img').forEach(function (img) {
      var rect = img.getBoundingClientRect();
      if (rect.top > aboveFold + 100) {
        img.classList.add('vov-img-hidden');
        obs.observe(img);
      }
    });
  }

  /* ── INIT ── */
  function init() {
    initTicker();
    initLazyLoad();
    initActiveNav();
    initImageReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
