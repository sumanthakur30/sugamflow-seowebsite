(function () {
  var data = window.SF_PRODUCT;
  var root = document.querySelector('[data-sf-home-industries]');
  if (!data || !root) {
    return;
  }
  if (root.children.length) {
    return;
  }
  data.industries.forEach(function (industry) {
    var card = document.createElement('a');
    card.className = 'sf-card';
    card.href = industry.href;
    card.setAttribute('data-reveal', '');
    var ico = document.createElement('span');
    ico.className = 'sf-ico';
    ico.textContent = industry.ico || industry.nav.slice(0, 2).toUpperCase();
    var h = document.createElement('h3');
    h.textContent = industry.name;
    var p = document.createElement('p');
    p.textContent = industry.headline;
    var ul = document.createElement('ul');
    (industry.chips || []).slice(0, 2).forEach(function (chip) {
      var li = document.createElement('li');
      li.textContent = chip;
      ul.appendChild(li);
    });
    var more = document.createElement('span');
    more.className = 'sf-more';
    more.textContent = industry.hrefLabel || 'Explore →';
    card.appendChild(ico);
    card.appendChild(h);
    card.appendChild(p);
    card.appendChild(ul);
    card.appendChild(more);
    root.appendChild(card);
  });
  var also = document.querySelector('[data-sf-also]');
  if (also) {
    data.alsoShipped.forEach(function (item) {
      var card = document.createElement('a');
      card.className = 'sf-card';
      card.href = item.href;
      var h = document.createElement('h3');
      h.textContent = item.name;
      var p = document.createElement('p');
      p.textContent = item.note;
      card.appendChild(h);
      card.appendChild(p);
      also.appendChild(card);
    });
  }
})();
