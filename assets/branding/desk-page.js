(function () {
  var desks = window.SF_DESKS;
  if (!desks) {
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

  function paintScreen(host, screen) {
    host.replaceChildren();
    host.appendChild(el('h3', '', screen.title));
    host.appendChild(el('p', '', screen.subtitle));
    var kpis = el('div', 'sf-desk__kpis');
    (screen.kpis || []).forEach(function (kpi) {
      var box = el('div', 'sf-desk__kpi');
      box.appendChild(el('small', '', kpi.label));
      box.appendChild(el('strong', '', kpi.value));
      kpis.appendChild(box);
    });
    host.appendChild(kpis);
    var table = el('div', 'sf-desk__table');
    var head = el('div', '');
    ['Row', 'Status', 'Note', 'Value'].forEach(function (h) {
      head.appendChild(el('span', '', h));
    });
    table.appendChild(head);
    (screen.rows || []).forEach(function (row) {
      var line = el('div', '');
      row.forEach(function (cell) {
        line.appendChild(el('span', '', cell));
      });
      table.appendChild(line);
    });
    host.appendChild(table);
  }

  function renderWorkspace(mount, desk) {
    mount.replaceChildren();
    var wrap = el('div', 'sf-desk');
    var side = el('aside', 'sf-desk__side');
    side.appendChild(el('div', 'sf-desk__brand', 'SugamFlow'));
    (desk.sidebar || []).forEach(function (group, gi) {
      side.appendChild(el('div', 'sf-desk__group', group.group));
      (group.items || []).forEach(function (item, ii) {
        var btn = el('button', 'sf-desk__item' + (gi === 0 && ii === 0 ? ' is-on' : ''), item);
        btn.type = 'button';
        btn.addEventListener('click', function () {
          side.querySelectorAll('.sf-desk__item').forEach(function (b) {
            b.classList.remove('is-on');
          });
          btn.classList.add('is-on');
          var screen = Object.assign({}, desk.screen, { title: item });
          paintScreen(main.querySelector('.sf-desk__screen'), screen);
        });
        side.appendChild(btn);
      });
    });
    var main = el('div', 'sf-desk__main');
    var top = el('div', 'sf-desk__top');
    (desk.header || []).forEach(function (tab) {
      top.appendChild(el('span', '', tab));
    });
    var screen = el('div', 'sf-desk__screen');
    paintScreen(screen, desk.screen);
    main.appendChild(top);
    main.appendChild(screen);
    wrap.appendChild(side);
    wrap.appendChild(main);
    mount.appendChild(wrap);
    mount.appendChild(el('p', 'sf-desk-note', 'Workspace preview: sidebar and header labels match the signed-in app. Figures are samples — live numbers stay after login.'));
  }

  var grid = document.querySelector('[data-sf-modules]');
  if (grid && !grid.children.length) {
    desks.modules.forEach(function (mod) {
      var card = el('a', 'sf-card');
      card.href = mod.href;
      var ico = el('span', 'sf-ico', mod.ico);
      card.appendChild(ico);
      card.appendChild(el('h3', '', mod.name));
      card.appendChild(el('p', '', mod.summary));
      var more = el('span', 'sf-more', 'Open desk →');
      card.appendChild(more);
      grid.appendChild(card);
    });
  }

  var detail = document.querySelector('[data-sf-desk]');
  if (detail) {
    var id = detail.getAttribute('data-desk-id');
    var desk = desks.modules.find(function (row) {
      return row.id === id;
    });
    if (desk) {
      renderWorkspace(detail, desk);
    }
  }

  var pills = document.querySelector('[data-sf-dash-pills]');
  var preview = document.querySelector('[data-sf-dash-preview]');
  if (pills && preview && desks.dashboards) {
    function showDash(dash) {
      pills.querySelectorAll('.sf-dash-pill').forEach(function (p) {
        p.classList.toggle('is-on', p.getAttribute('data-dash') === dash.id);
      });
      preview.replaceChildren();
      preview.appendChild(el('h3', '', dash.name));
      var metric = el('strong', '', dash.metric);
      preview.appendChild(metric);
      preview.appendChild(el('small', '', dash.metricLabel));
      preview.appendChild(el('p', '', dash.text));
      var right = el('div', 'sf-panel__bars');
      ['48%', '62%', '41%', '78%', '66%', '88%', '55%'].forEach(function (h) {
        var i = document.createElement('i');
        i.style.height = h;
        right.appendChild(i);
      });
      preview.appendChild(right);
    }
    desks.dashboards.forEach(function (dash, i) {
      var btn = el('button', 'sf-dash-pill' + (i === 0 ? ' is-on' : ''), dash.name);
      btn.type = 'button';
      btn.setAttribute('data-dash', dash.id);
      btn.addEventListener('click', function () {
        showDash(dash);
      });
      pills.appendChild(btn);
    });
    showDash(desks.dashboards[0]);
  }
})();
