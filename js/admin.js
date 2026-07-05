/* ============================================
   Sri Kanaka Durga Iron — Admin Panel Script
   This file is only loaded by admin.html.
   It is never linked from the public website.
   ============================================ */

/* ─────────────────────────────────────
   SIMPLE LOGIN GATE
   NOTE: This is a basic client-side password
   check meant to keep casual visitors out and
   keep the panel out of public navigation.
   It is NOT real security — anyone who views the
   page source can find the password. Do not use
   this panel for sensitive data. For real
   protection, this page should sit behind server-
   side authentication (ask your developer / me
   about adding that later).
───────────────────────────────────── */
var ADMIN_PASSWORD = 'skdi2025'; /* change this to your own password */

function checkAdminLogin() {
  var input = document.getElementById('admin-pass-input');
  var err   = document.getElementById('admin-login-error');
  if (input.value === ADMIN_PASSWORD) {
    sessionStorage.setItem('skdi_admin_ok', '1');
    document.getElementById('admin-login-screen').style.display = 'none';
    document.getElementById('admin-app').style.display = 'block';
    renderAdmin('overview');
  } else {
    err.style.display = 'block';
    input.value = '';
    input.focus();
  }
}

function adminLogout() {
  sessionStorage.removeItem('skdi_admin_ok');
  location.reload();
}

(function initAdminGate() {
  document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('skdi_admin_ok') === '1') {
      document.getElementById('admin-login-screen').style.display = 'none';
      document.getElementById('admin-app').style.display = 'block';
      renderAdmin('overview');
    } else {
      document.getElementById('admin-pass-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') checkAdminLogin();
      });
    }
  });
})();

/* ─────────────────────────────────────
   ADMIN DASHBOARD
───────────────────────────────────── */
function renderAdmin(tab) {
  var c = document.getElementById('admin-content');
  if (!c) return;

  /* ── Overview ── */
  if (tab === 'overview') {
    var rev  = orders.reduce(function (s, o) { return s + parseFloat(o.total.replace(/[Rs.,]/g, '') || 0); }, 0);
    var pend = orders.filter(function (o) { return o.status === 'pending'; }).length;

    var recentRows = orders.slice(-5).reverse().map(function (o) {
      return '<tr>'
        + '<td><strong>' + o.id + '</strong></td>'
        + '<td>' + o.customer + '</td>'
        + '<td>' + o.total + '</td>'
        + '<td><span class="status-badge status-' + o.status + '">'
        + o.status.charAt(0).toUpperCase() + o.status.slice(1)
        + '</span></td>'
        + '<td>' + o.date + '</td>'
        + '</tr>';
    }).join('');

    c.innerHTML = '<div class="admin-stats">'
      + '<div class="stat-card"><div class="lbl">Products</div><div class="val">' + products.length + '</div><div class="chg">Active</div></div>'
      + '<div class="stat-card"><div class="lbl">Orders</div><div class="val">' + orders.length + '</div><div class="chg">All time</div></div>'
      + '<div class="stat-card"><div class="lbl">Revenue</div><div class="val">Rs.' + Math.round(rev / 1000) + 'K</div><div class="chg">Total</div></div>'
      + '<div class="stat-card"><div class="lbl">Pending</div><div class="val">' + pend + '</div><div class="chg" style="color:#aa8000;">Awaiting</div></div>'
      + '</div>'
      + '<div class="admin-panel"><div class="admin-panel-header"><h4>Recent Orders</h4></div>'
      + '<table class="admin-table"><thead><tr><th>ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>'
      + '<tbody>' + recentRows + '</tbody></table></div>';
  }

  /* ── Update Rates ── */
  if (tab === 'rates') {
    var today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    var rateRows = products.map(function (p) {
      return '<div class="rate-row">'
        + '<div><div class="rate-row-name">' + p.name + ' <span style="color:var(--muted);font-weight:400;">(' + p.cat + ')</span></div><div class="rate-row-unit">per ' + p.unit + '</div></div>'
        + '<div style="display:flex;align-items:center;gap:6px;">'
        + '<span style="font-size:.8rem;color:var(--muted);">Rs.</span>'
        + '<input type="number" id="rate-' + p.id + '" value="' + p.price + '" min="1" />'
        + '</div></div>';
    }).join('');

    c.innerHTML = '<div class="admin-panel">'
      + '<div class="admin-panel-header"><h4>Update Today\'s Iron &amp; Cement Rates</h4>'
      + '<span style="font-size:.78rem;color:var(--muted);">Last: <strong>' + rateDate + '</strong></span></div>'
      + '<div style="padding:12px 20px;background:var(--yellow-pale);border-bottom:1.5px solid var(--border);font-size:.83rem;color:#7a6000;">'
      + '<strong>How to use:</strong> Update the prices below every morning and click Save. All pages, the rate popup and estimates will update automatically.</div>'
      + '<div class="rate-grid">' + rateRows + '</div>'
      + '<div class="rate-save-bar"><p>After saving, prices update instantly across the whole website.</p>'
      + '<button class="admin-btn" onclick="saveRates()">Save Today\'s Rates (' + today + ')</button>'
      + '</div></div>';
  }

  /* ── Products ── */
  if (tab === 'products') {
    var prodRows = products.map(function (p) {
      return '<tr>'
        + '<td>' + p.name + '</td>'
        + '<td>' + p.cat + '</td>'
        + '<td>Rs.' + p.price + ' / ' + p.unit + '</td>'
        + '<td><button class="admin-btn danger sm" onclick="deleteProd(' + p.id + ')">Delete</button></td>'
        + '</tr>';
    }).join('');

    c.innerHTML = '<div class="admin-panel">'
      + '<div class="admin-panel-header"><h4>Products (' + products.length + ')</h4>'
      + '<button class="admin-btn" onclick="adminTab(\'add\', null)">Add Product</button></div>'
      + '<table class="admin-table"><thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Action</th></tr></thead>'
      + '<tbody>' + prodRows + '</tbody></table></div>';
  }

  /* ── Orders ── */
  if (tab === 'orders') {
    var ordRows = orders.map(function (o) {
      return '<tr>'
        + '<td><strong>' + o.id + '</strong></td>'
        + '<td>' + o.customer + '</td>'
        + '<td>' + o.total + '</td>'
        + '<td><span class="status-badge status-' + o.status + '">'
        + o.status.charAt(0).toUpperCase() + o.status.slice(1) + '</span></td>'
        + '<td><select onchange="updateOrd(\'' + o.id + '\', this.value)" '
        + 'style="font-size:.82rem;padding:5px;border:1.5px solid var(--border);border-radius:4px;">'
        + '<option value="pending"'   + (o.status === 'pending'    ? ' selected' : '') + '>Pending</option>'
        + '<option value="processing"'+ (o.status === 'processing' ? ' selected' : '') + '>Processing</option>'
        + '<option value="delivered"' + (o.status === 'delivered'  ? ' selected' : '') + '>Delivered</option>'
        + '</select></td>'
        + '</tr>';
    }).join('');

    c.innerHTML = '<div class="admin-panel">'
      + '<div class="admin-panel-header"><h4>All Orders (' + orders.length + ')</h4></div>'
      + '<table class="admin-table"><thead><tr><th>ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Update</th></tr></thead>'
      + '<tbody>' + ordRows + '</tbody></table></div>';
  }

  /* ── Add Product ── */
  if (tab === 'add') {
    c.innerHTML = '<div class="admin-panel">'
      + '<div class="admin-panel-header"><h4>Add New Product</h4></div>'
      + '<div class="add-form">'
      + '<div class="form-group"><label>Product Name</label><input type="text" id="ap-name" placeholder="e.g. TMT Rebar 25mm" /></div>'
      + '<div class="form-group"><label>Category</label><select id="ap-cat"><option>Iron Rods</option><option>Cement</option><option>Iron Roofing Sheets</option><option>Cement Roofing Sheets</option></select></div>'
      + '<div class="form-group"><label>Price (Rs.)</label><input type="number" id="ap-price" placeholder="0" /></div>'
      + '<div class="form-group"><label>Unit</label><input type="text" id="ap-unit" placeholder="bag / rod / unit" /></div>'
      + '<div class="form-group full"><label>Description</label><textarea id="ap-desc" placeholder="Product description..." style="min-height:70px;"></textarea></div>'
      + '<div class="form-group full"><button class="admin-btn" onclick="addProd()">Add Product</button></div>'
      + '</div></div>';
  }
}

function adminTab(tab, el) {
  document.querySelectorAll('.admin-menu a').forEach(function (a) { a.classList.remove('active'); });
  if (el) el.classList.add('active');
  renderAdmin(tab);
}

function saveRates() {
  var rates = {};
  products.forEach(function (p) {
    var inp = document.getElementById('rate-' + p.id);
    if (inp) {
      var v = parseFloat(inp.value);
      if (v > 0) { p.price = v; rates[p.id] = v; }
    }
  });
  localStorage.setItem('skdi_rates', JSON.stringify(rates));
  var now = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  rateDate = now;
  localStorage.setItem('skdi_rate_date', now);
  showToast('Rates saved! All prices updated.', 'success');
}

function deleteProd(id) {
  if (!confirm('Delete this product?')) return;
  products = products.filter(function (p) { return p.id !== id; });
  renderAdmin('products');
  showToast('Product deleted', 'info');
}

function addProd() {
  var name  = document.getElementById('ap-name').value.trim();
  var price = parseFloat(document.getElementById('ap-price').value);
  var unit  = document.getElementById('ap-unit').value.trim();
  var desc  = document.getElementById('ap-desc').value.trim();
  var cat   = document.getElementById('ap-cat').value;
  if (!name || !price || !unit) { showToast('Please fill in name, price and unit', 'info'); return; }
  products.push({ id: Date.now(), name: name, cat: cat, price: price, unit: unit, desc: desc, featured: false });
  showToast('"' + name + '" added!', 'success');
  renderAdmin('products');
}

function updateOrd(id, status) {
  var o = orders.find(function (x) { return x.id === id; });
  if (o) { o.status = status; localStorage.setItem('skdi_orders', JSON.stringify(orders)); }
  showToast('Order ' + id + ' updated to ' + status, 'success');
}

/* ─────────────────────────────────────
   TOAST NOTIFICATION (admin copy)
───────────────────────────────────── */
function showToast(msg, type) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.className   = 'show ' + (type || 'info');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(function () { t.className = ''; }, 2600);
}
