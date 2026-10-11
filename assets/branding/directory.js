(function () {
  var list = document.getElementById('sf-dir-list');
  var status = document.getElementById('sf-dir-status');
  var detail = document.getElementById('sf-dir-detail');
  var form = document.getElementById('sf-dir-form');
  if (!list) {
    return;
  }
  var rows = [];
  var q = document.getElementById('sf-dir-q');
  var type = document.getElementById('sf-dir-type');
  var industry = document.getElementById('sf-dir-industry');

  function text(value) {
    return String(value || '');
  }

  function escapeHtml(value) {
    return text(value).replace(/[&<>"]/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch];
    });
  }

  function loadIndustries() {
    fetch('/api/v1/public/industries', { headers: { Accept: 'application/json' } })
      .then(function (res) { return res.ok ? res.json() : []; })
      .then(function (items) {
        (items || []).forEach(function (item) {
          var option = document.createElement('option');
          option.value = item.code;
          option.textContent = item.navLabel;
          industry.appendChild(option);
        });
      })
      .catch(function () {});
  }

  function card(row) {
    var logo = row.logoUrl ? '<img src="' + escapeHtml(row.logoUrl) + '" alt="">' : '';
    var site = row.website ? '<a href="' + escapeHtml(row.website) + '" rel="noopener noreferrer">Website</a>' : '';
    return '<article class="sf-dir__card"><a href="#/' + escapeHtml(row.slug) + '">' + logo + '<h2>' + escapeHtml(row.displayName) + '</h2></a><p>' + escapeHtml(row.shortDescription) + '</p><p>' + escapeHtml(row.organizationType) + (row.locationLabel ? ' · ' + escapeHtml(row.locationLabel) : '') + '</p>' + site + '</article>';
  }

  function render() {
    var query = text(q.value).trim().toLowerCase();
    var visible = rows.filter(function (row) {
      if (type.value && row.organizationType !== type.value) return false;
      if (industry.value && row.industryCode !== industry.value) return false;
      if (!query) return true;
      return (text(row.displayName) + ' ' + text(row.organizationName) + ' ' + text(row.shortDescription)).toLowerCase().indexOf(query) !== -1;
    });
    list.innerHTML = visible.map(card).join('');
    status.textContent = visible.length ? visible.length + ' published organization' + (visible.length === 1 ? '' : 's') + '.' : 'No published organization matches. Draft records stay private.';
  }

  function showDetail() {
    var slug = decodeURIComponent((location.hash || '').replace(/^#\/?/, ''));
    if (!slug) {
      detail.hidden = true;
      return;
    }
    var row = rows.find(function (item) { return item.slug === slug; });
    if (!row) {
      detail.hidden = false;
      detail.innerHTML = '<h2>Not published</h2><p>This organization is not on the public directory.</p>';
      return;
    }
    document.title = (row.seoTitle || row.displayName) + ' | SugamFlow';
    var site = row.website ? '<p><a href="' + escapeHtml(row.website) + '" rel="noopener noreferrer">' + escapeHtml(row.website) + '</a></p>' : '';
    detail.hidden = false;
    detail.innerHTML = '<p class="sf-kicker">' + escapeHtml(row.organizationType) + '</p><h2>' + escapeHtml(row.displayName) + '</h2><p>' + escapeHtml(row.detailText || row.shortDescription) + '</p>' + site + (row.publicContact ? '<p>' + escapeHtml(row.publicContact) + '</p>' : '') + (row.locationLabel ? '<p>' + escapeHtml(row.locationLabel) + '</p>' : '');
  }

  fetch('/api/v1/public/directory/organizations', { headers: { Accept: 'application/json' } })
    .then(function (res) {
      if (!res.ok) throw new Error('status');
      return res.json();
    })
    .then(function (items) {
      rows = items || [];
      render();
      showDetail();
    })
    .catch(function () {
      status.textContent = 'The directory could not be loaded. Nothing is shown until the public list is available.';
    });

  loadIndustries();
  q.addEventListener('input', render);
  type.addEventListener('change', render);
  industry.addEventListener('change', render);
  window.addEventListener('hashchange', showDetail);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());
    var note = document.getElementById('sf-dir-form-status');
    note.textContent = 'Sending…';
    fetch('/api/v1/public/directory/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error('status');
      form.reset();
      note.textContent = 'Enquiry received. It does not create an account.';
    }).catch(function () {
      note.textContent = 'The enquiry was not saved. Check the fields and try again.';
    });
  });
})();
