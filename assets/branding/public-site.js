(function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (reg) {
        var script = (reg.active && reg.active.scriptURL) || (reg.installing && reg.installing.scriptURL) || '';
        if (script.indexOf('ngsw-worker') !== -1) {
          reg.unregister();
        }
      });
    });
  }
  var header = document.querySelector('[data-sf-header]');
  var toggle = document.querySelector('[data-sf-menu]');
  var drawer = document.querySelector('[data-sf-drawer]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = drawer.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('sf-nav-lock', open);
    });
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('sf-nav-lock');
      });
    });
  }
  document.addEventListener('click', function (event) {
    document.querySelectorAll('.sf-drop[open]').forEach(function (drop) {
      if (!drop.contains(event.target)) {
        drop.removeAttribute('open');
      }
    });
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('is-in');
    });
  }
})();
