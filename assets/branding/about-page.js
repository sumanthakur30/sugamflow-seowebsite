(function () {
  var data = window.SF_PRODUCT;
  if (!data || !data.industries) {
    return;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (text) {
      node.textContent = text;
    }
    return node;
  }

  function renderIndustry(industry) {
    var root = document.querySelector('[data-sf-industry-panel]');
    if (!root || !industry) {
      return;
    }
    root.replaceChildren();
    root.setAttribute('aria-live', 'polite');

    var kicker = el('p', 'sf-kicker', industry.kicker);
    var h = el('h3', 'sf-explorer__title', industry.headline);
    var p = el('p', 'sf-explorer__lede', industry.description);
    var chips = el('div', 'sf-chips');
    (industry.chips || []).forEach(function (chip) {
      chips.appendChild(el('span', 'sf-chip', chip));
    });

    var feats = el('div', 'sf-feat-grid');
    (industry.features || []).forEach(function (feat) {
      var card = el('article', 'sf-feat');
      card.appendChild(el('span', 'sf-feat__label', feat.label));
      card.appendChild(el('h4', '', feat.title));
      card.appendChild(el('p', '', feat.text));
      feats.appendChild(card);
    });

    var flowWrap = el('div', 'sf-flow');
    flowWrap.appendChild(el('p', 'sf-flow__label', 'How it flows'));
    var ol = el('ol', 'sf-flow__list');
    (industry.workflow || []).forEach(function (step) {
      ol.appendChild(el('li', '', step));
    });
    flowWrap.appendChild(ol);

    var more = el('a', 'sf-more', industry.hrefLabel || 'Explore →');
    more.href = industry.href || '/features';

    root.appendChild(kicker);
    root.appendChild(h);
    root.appendChild(p);
    root.appendChild(chips);
    root.appendChild(feats);
    root.appendChild(flowWrap);
    root.appendChild(more);
  }

  function activate(id, pushHash) {
    var industry = data.industries.find(function (row) {
      return row.id === id;
    }) || data.industries[0];
    document.querySelectorAll('[data-sf-industry]').forEach(function (btn) {
      var on = btn.getAttribute('data-sf-industry') === industry.id;
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderIndustry(industry);
    if (pushHash) {
      history.replaceState(null, '', '#industry-' + industry.id);
    }
  }

  var nav = document.querySelector('[data-sf-industry-nav]');
  var tabs = document.querySelector('[data-sf-industry-tabs]');
  if (nav) {
    data.industries.forEach(function (industry, index) {
      var btn = el('button', 'sf-explorer__nav-btn', industry.nav);
      btn.type = 'button';
      btn.setAttribute('data-sf-industry', industry.id);
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      btn.addEventListener('click', function () {
        activate(industry.id, true);
      });
      nav.appendChild(btn);
      if (tabs) {
        var chip = el('button', 'sf-explorer__tab', industry.nav);
        chip.type = 'button';
        chip.setAttribute('data-sf-industry', industry.id);
        chip.addEventListener('click', function () {
          activate(industry.id, true);
        });
        tabs.appendChild(chip);
      }
    });
  }

  var fromHash = (location.hash || '').replace('#industry-', '');
  var start = data.industries.some(function (row) {
    return row.id === fromHash;
  })
    ? fromHash
    : data.industries[0].id;
  activate(start, false);

  var why = document.querySelector('[data-sf-why]');
  if (why) {
    data.differentiators.forEach(function (item, i) {
      var card = el('article', 'sf-why');
      card.appendChild(el('span', 'sf-feat__label', item.label));
      card.appendChild(el('strong', 'sf-why__n', String(i + 1).padStart(2, '0')));
      card.appendChild(el('h3', '', item.title));
      card.appendChild(el('p', '', item.text));
      why.appendChild(card);
    });
  }

  var platform = document.querySelector('[data-sf-platform]');
  if (platform) {
    data.platform.forEach(function (item) {
      var card = el('article', 'sf-feat');
      card.appendChild(el('span', 'sf-feat__label', item.label));
      card.appendChild(el('h4', '', item.title));
      card.appendChild(el('p', '', item.text));
      platform.appendChild(card);
    });
  }

  var also = document.querySelector('[data-sf-also]');
  if (also) {
    data.alsoShipped.forEach(function (item) {
      var card = el('a', 'sf-card');
      card.href = item.href;
      card.appendChild(el('h3', '', item.name));
      card.appendChild(el('p', '', item.note));
      also.appendChild(card);
    });
  }
})();
