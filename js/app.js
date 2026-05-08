/* ============================================
   Sri Kanaka Durga Iron — Main Application
   ============================================ */

var currentFilter = 'All';
var estC = { iron: 0, cement: 0, tools: 0 };
var lastEst = [];

/* ─────────────────────────────────────
   PAGE NAVIGATION
───────────────────────────────────── */
function showPage(page) {
  document.querySelectorAll('.page').forEach(function (x) { x.classList.remove('active'); });
  document.querySelectorAll('.nav-links a').forEach(function (x) { x.classList.remove('active'); });

  var pg = document.getElementById('page-' + page);
  if (pg) pg.classList.add('active');

  var na = document.getElementById('nav-' + page);
  if (na) na.classList.add('active');

  if (page === 'home')     renderFeatured();
  if (page === 'products') renderProducts(currentFilter);
  if (page === 'cart')     renderCart();
  if (page === 'admin')    renderAdmin('overview');

  window.scrollTo(0, 0);
}

/* ─────────────────────────────────────
   PRODUCT HELPERS
───────────────────────────────────── */
function getBadge(cat) {
  if (cat === 'Iron')   return '<span class="product-badge badge-iron">Iron &amp; Steel</span>';
  if (cat === 'Cement') return '<span class="product-badge badge-cement">Cement</span>';
  return '<span class="product-badge badge-tools">Tools</span>';
}

function getProductSVG(cat) {
  if (cat === 'Iron') {
    return '<svg viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg">'
      + '<rect x="5" y="20" width="130" height="10" rx="3" fill="#C9A000"/>'
      + '<rect x="5" y="20" width="130" height="4" rx="2" fill="#F5C400"/>'
      + '<rect x="5" y="35" width="130" height="10" rx="3" fill="#B8860B"/>'
      + '<rect x="5" y="35" width="130" height="4" rx="2" fill="#F5C400"/>'
      + '<rect x="5" y="50" width="130" height="10" rx="3" fill="#C9A000"/>'
      + '<rect x="5" y="50" width="130" height="4" rx="2" fill="#DAA520"/>'
      + '<text x="70" y="78" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#888">TMT REBAR — Fe500</text>'
      + '</svg>';
  }
  if (cat === 'Cement') {
    return '<svg viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg">'
      + '<rect x="25" y="10" width="90" height="65" rx="6" fill="#E8E0C8"/>'
      + '<rect x="25" y="10" width="90" height="12" rx="4" fill="#D4C89A"/>'
      + '<rect x="30" y="28" width="80" height="2" fill="#BBB"/>'
      + '<text x="70" y="50" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#444">CEMENT</text>'
      + '<text x="70" y="63" text-anchor="middle" font-family="sans-serif" font-size="7" fill="#666">QUALITY GRADE</text>'
      + '<rect x="30" y="67" width="80" height="2" fill="#BBB"/>'
      + '</svg>';
  }
  return '<svg viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg">'
    + '<rect x="8" y="38" width="124" height="16" rx="4" fill="#C9A000"/>'
    + '<rect x="8" y="38" width="124" height="5" rx="3" fill="#F5C400"/>'
    + '<rect x="58" y="20" width="24" height="50" rx="3" fill="#AAAAAA"/>'
    + '<rect x="58" y="20" width="24" height="8" rx="2" fill="#CCCCCC"/>'
    + '<text x="70" y="82" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#888">TOOLS &amp; EQUIPMENT</text>'
    + '</svg>';
}

function buildCard(p) {
  return '<div class="product-card">'
    + '<div class="product-img">' + getProductSVG(p.cat) + '</div>'
    + '<div class="product-body">'
    + getBadge(p.cat)
    + '<div class="product-name">' + p.name + '</div>'
    + '<div class="product-desc">' + p.desc + '</div>'
    + '<div class="rate-tag">Rate as of: ' + rateDate + '</div>'
    + '<div class="product-footer">'
    + '<div class="product-price">Rs.' + p.price + '<small> / ' + p.unit + '</small></div>'
    + '<button class="add-to-cart" onclick="addToCart(' + p.id + ')">+ Add</button>'
    + '</div>'
    + '</div>'
    + '</div>';
}

function renderFeatured() {
  var el = document.getElementById('featured-grid');
  if (!el) return;
  el.innerHTML = products.filter(function (p) { return p.featured; }).map(buildCard).join('');
}

function renderProducts(filter) {
  currentFilter = filter;
  var el = document.getElementById('products-grid');
  if (!el) return;
  var list = filter === 'All' ? products : products.filter(function (p) { return p.cat === filter; });
  el.innerHTML = list.map(buildCard).join('');
}

function applyFilter(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  renderProducts(filter);
}

function filterAndGo(filter) {
  currentFilter = filter;
  showPage('products');
  /* Highlight correct filter button after page switch */
  setTimeout(function () {
    document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
    var map = { All: 'fb-all', Iron: 'fb-iron', Cement: 'fb-cement', Tools: 'fb-tools' };
    var btn = document.getElementById(map[filter]);
    if (btn) btn.classList.add('active');
  }, 50);
}

/* ─────────────────────────────────────
   CART
───────────────────────────────────── */
function addToCart(id) {
  var p  = products.find(function (x) { return x.id === id; });
  var ex = cart.find(function (x) { return x.id === id; });
  if (ex) {
    ex.qty++;
  } else {
    cart.push({ id: id, name: p.name, price: p.price, unit: p.unit, qty: 1 });
  }
  localStorage.setItem('skdi_cart', JSON.stringify(cart));
  updateCartCount();
  showToast('Added: ' + p.name, 'success');
}

function updateCartCount() {
  var total = cart.reduce(function (s, i) { return s + i.qty; }, 0);
  document.getElementById('cart-count').textContent = total;
}

function renderCart() {
  var el = document.getElementById('cart-content');
  if (!el) return;

  if (!cart.length) {
    el.innerHTML = '<div class="empty-cart">'
      + '<div style="font-size:3.5rem;">🛒</div>'
      + '<p>Your cart is empty.</p>'
      + '<button class="btn-yellow" onclick="showPage(\'products\')">Browse Products</button>'
      + '</div>';
    return;
  }

  var sub = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  var del = sub >= 10000 ? 0 : 500;
  var delDisplay = del === 0
    ? '<span style="color:var(--success);font-weight:700;">FREE</span>'
    : 'Rs.' + del;

  var rows = cart.map(function (i) {
    return '<tr>'
      + '<td><div class="cart-prod-name">' + i.name + '</div>'
      + '<div style="font-size:.75rem;color:var(--muted);">per ' + i.unit + '</div></td>'
      + '<td>Rs.' + i.price + '</td>'
      + '<td><div class="qty-ctrl">'
      + '<button class="qty-btn" onclick="changeQty(' + i.id + ',-1)">-</button>'
      + '<span class="qty-val">' + i.qty + '</span>'
      + '<button class="qty-btn" onclick="changeQty(' + i.id + ',1)">+</button>'
      + '</div></td>'
      + '<td><strong>Rs.' + (i.price * i.qty).toLocaleString('en-IN') + '</strong></td>'
      + '<td><button class="remove-btn" onclick="removeItem(' + i.id + ')">✕</button></td>'
      + '</tr>';
  }).join('');

  el.innerHTML = '<div class="cart-layout">'
    + '<div class="cart-box"><table><thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr></thead>'
    + '<tbody>' + rows + '</tbody></table></div>'
    + '<div class="cart-summary"><h3>Order Summary</h3>'
    + '<div class="sum-row"><span>Subtotal</span><span>Rs.' + sub.toLocaleString('en-IN') + '</span></div>'
    + '<div class="sum-row"><span>Delivery</span><span>' + delDisplay + '</span></div>'
    + (del > 0 ? '<div style="font-size:.74rem;color:var(--muted);padding:4px 0;">Free delivery on orders above Rs.10,000</div>' : '')
    + '<div class="sum-row total"><span>Total</span><span>Rs.' + (sub + del).toLocaleString('en-IN') + '</span></div>'
    + '<button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>'
    + '</div></div>';
}

function changeQty(id, delta) {
  var i = cart.find(function (c) { return c.id === id; });
  if (!i) return;
  i.qty += delta;
  if (i.qty <= 0) cart = cart.filter(function (c) { return c.id !== id; });
  localStorage.setItem('skdi_cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(function (c) { return c.id !== id; });
  localStorage.setItem('skdi_cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function checkout() {
  var sub = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  var del = sub >= 10000 ? 0 : 500;
  var newOrder = {
    id:       'ORD-' + String(orders.length + 1).padStart(3, '0'),
    customer: 'Customer',
    items:    cart.map(function (i) { return i.name + ' x' + i.qty; }).join(', '),
    total:    'Rs.' + (sub + del).toLocaleString('en-IN'),
    status:   'pending',
    date:     new Date().toISOString().split('T')[0]
  };
  orders.push(newOrder);
  localStorage.setItem('skdi_orders', JSON.stringify(orders));
  cart = [];
  localStorage.setItem('skdi_cart', JSON.stringify(cart));
  updateCartCount();
  document.getElementById('checkout-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('checkout-modal').classList.remove('open');
  showPage('home');
}

/* ─────────────────────────────────────
   CONTACT
───────────────────────────────────── */
function submitContact() {
  var name  = document.getElementById('f-name').value.trim();
  var email = document.getElementById('f-email').value.trim();
  if (!name || !email) { showToast('Please fill in name and email', 'info'); return; }
  showToast('Message sent. We will contact you soon.', 'success');
  ['f-name', 'f-email', 'f-phone', 'f-message'].forEach(function (id) {
    document.getElementById(id).value = '';
  });
}

/* ─────────────────────────────────────
   ESTIMATION
───────────────────────────────────── */
var estProducts = {
  iron:   products.filter(function (p) { return p.cat === 'Iron'; }),
  cement: products.filter(function (p) { return p.cat === 'Cement'; }),
  tools:  products.filter(function (p) { return p.cat === 'Tools'; })
};

function addEstItem(type) {
  var id   = type + '_' + (++estC[type]);
  var opts = estProducts[type].map(function (p) {
    return '<option value="' + p.price + '|||' + p.unit + '|||' + p.name + '">'
      + p.name + ' - Rs.' + p.price + ' / ' + p.unit + '</option>';
  }).join('');

  var row = '<div class="est-item-row" id="row-' + id + '">'
    + '<select id="sel-' + id + '" onchange="onSelChange(\'' + id + '\')">'
    + '<option value="">-- Select --</option>' + opts
    + '</select>'
    + '<input type="number" id="qty-' + id + '" min="1" value="1" />'
    + '<input type="text" id="unit-' + id + '" readonly placeholder="unit" '
    + 'style="background:var(--yellow-pale);color:var(--muted);cursor:default;" />'
    + '<button class="est-remove" onclick="removeRow(\'' + id + '\')">✕</button>'
    + '</div>';

  document.getElementById(type + '-items').insertAdjacentHTML('beforeend', row);
}

function onSelChange(id) {
  var sel = document.getElementById('sel-' + id);
  if (sel.value) {
    document.getElementById('unit-' + id).value = sel.value.split('|||')[1];
  }
}

function removeRow(id) {
  var el = document.getElementById('row-' + id);
  if (el) el.remove();
}

function getSection(type) {
  var items = [];
  var container = document.getElementById(type + '-items');
  if (!container) return items;
  container.querySelectorAll('.est-item-row').forEach(function (row) {
    var rid  = row.id.replace('row-', '');
    var sel  = document.getElementById('sel-'  + rid);
    var qty  = parseFloat(document.getElementById('qty-' + rid).value) || 0;
    if (!sel || !sel.value || qty <= 0) return;
    var parts = sel.value.split('|||');
    items.push({
      name:  parts[2],
      price: parseFloat(parts[0]),
      unit:  parts[1],
      qty:   qty,
      total: parseFloat(parts[0]) * qty
    });
  });
  return items;
}

function generateBill() {
  var iron  = getSection('iron');
  var cem   = getSection('cement');
  var tools = getSection('tools');
  var all   = iron.concat(cem).concat(tools);

  if (!all.length) { showToast('Please add at least one item', 'info'); return; }
  lastEst = all;

  var cname  = document.getElementById('est-cname').value.trim() || 'Customer';
  var cphone = document.getElementById('est-phone').value.trim() || '-';
  var caddr  = document.getElementById('est-addr').value.trim()  || '-';
  var sub    = all.reduce(function (s, i) { return s + i.total; }, 0);
  var gst    = sub * 0.18;
  var grand  = sub + gst;
  var estNo  = 'EST-' + Date.now().toString().slice(-6);
  var today  = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  function makeRows(items) {
    return items.map(function (i) {
      return '<tr>'
        + '<td>' + i.name + '</td>'
        + '<td style="text-align:center;">' + i.qty + '</td>'
        + '<td style="color:var(--muted);">' + i.unit + '</td>'
        + '<td>Rs.' + i.total.toLocaleString('en-IN', { minimumFractionDigits: 2 }) + '</td>'
        + '</tr>';
    }).join('');
  }

  function makeSection(items, label) {
    if (!items.length) return '';
    return '<tr class="bill-cat"><td colspan="4">' + label + '</td></tr>' + makeRows(items);
  }

  var addrRow = caddr !== '-'
    ? '<div style="width:100%;"><div class="lbl">Site Address</div><div class="val">' + caddr + '</div></div>'
    : '';

  var html = '<div class="bill-header"><h2>Sri Kanaka Durga Iron</h2><p>Iron and Cement Specialists — Est. 2009</p></div>'
    + '<div class="bill-meta">'
    + '<div><div class="lbl">Estimate No.</div><div class="val">' + estNo + '</div></div>'
    + '<div><div class="lbl">Date</div><div class="val">' + today + '</div></div>'
    + '<div><div class="lbl">Customer</div><div class="val">' + cname + '</div></div>'
    + '<div><div class="lbl">Phone</div><div class="val">' + cphone + '</div></div>'
    + addrRow
    + '</div>'
    + '<table class="bill-table"><thead><tr>'
    + '<th>Material</th><th style="text-align:center;">Qty</th><th>Unit</th><th style="text-align:right;">Amount (Rs.)</th>'
    + '</tr></thead><tbody>'
    + makeSection(iron,  'Iron and Steel')
    + makeSection(cem,   'Cement and Concrete')
    + makeSection(tools, 'Tools and Equipment')
    + '</tbody></table>'
    + '<div class="bill-totals">'
    + '<div class="bill-tr"><span>Subtotal</span><span>Rs.' + sub.toLocaleString('en-IN', { minimumFractionDigits: 2 }) + '</span></div>'
    + '<div class="bill-tr"><span>GST at 18%</span><span>Rs.' + gst.toLocaleString('en-IN', { minimumFractionDigits: 2 }) + '</span></div>'
    + '<div class="bill-tr grand"><span>Grand Total</span><span>Rs.' + grand.toLocaleString('en-IN', { minimumFractionDigits: 2 }) + '</span></div>'
    + '</div>'
    + '<div class="bill-note">Note: This is an estimated bill only. Prices are based on rates as of '
    + today + '. Final prices may vary based on transport charges. Valid for 1 day. Contact us to confirm your order.</div>';

  document.getElementById('bill-box').innerHTML = html;
  document.getElementById('bill-actions').classList.add('show');
  showToast('Estimate bill generated!', 'success');

  if (window.innerWidth < 1050) {
    setTimeout(function () {
      document.getElementById('bill-box').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

function printBill() {
  if (!document.getElementById('bill-box').querySelector('.bill-header')) {
    showToast('Please generate a bill first', 'info');
    return;
  }
  window.print();
}

function estToCart() {
  if (!lastEst.length) { showToast('Please generate estimate first', 'info'); return; }
  lastEst.forEach(function (item) {
    var ex = cart.find(function (c) { return c.name === item.name; });
    if (ex) {
      ex.qty += item.qty;
    } else {
      cart.push({ id: Date.now() + Math.random(), name: item.name, price: item.price, unit: item.unit, qty: item.qty });
    }
  });
  localStorage.setItem('skdi_cart', JSON.stringify(cart));
  updateCartCount();
  showToast('All estimate items added to cart', 'success');
  setTimeout(function () { showPage('cart'); }, 800);
}

function resetEst() {
  ['iron-items', 'cement-items', 'tools-items'].forEach(function (id) {
    var el = document.getElementById(id); if (el) el.innerHTML = '';
  });
  estC = { iron: 0, cement: 0, tools: 0 };
  lastEst = [];
  ['est-cname', 'est-phone', 'est-addr'].forEach(function (id) {
    var el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('bill-box').innerHTML =
    '<div class="bill-ph"><div class="ic">📋</div><h4>Your Estimate Bill</h4>'
    + '<p>Add materials on the left and click<br /><strong>Generate Estimate Bill</strong></p></div>';
  document.getElementById('bill-actions').classList.remove('show');
  showToast('Estimate reset', 'info');
}

/* ─────────────────────────────────────
   TODAY'S RATES MODAL
───────────────────────────────────── */
function openRates() {
  var today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  document.getElementById('rates-date').textContent = today;
  document.getElementById('rates-updated-label').textContent = 'Last updated: ' + rateDate;

  var iron = products.filter(function (p) { return p.cat === 'Iron'; });
  var cem  = products.filter(function (p) { return p.cat === 'Cement'; });

  function rows(list) {
    return list.map(function (p) {
      return '<tr><td>' + p.name + '</td><td>per ' + p.unit + '</td><td>Rs.' + p.price + '</td></tr>';
    }).join('');
  }

  document.getElementById('rates-table-body').innerHTML =
    '<thead><tr><th>Material</th><th>Unit</th><th style="text-align:right;">Rate (Rs.)</th></tr></thead>'
    + '<tbody>'
    + '<tr class="rates-cat"><td colspan="3">Iron &amp; Steel</td></tr>' + rows(iron)
    + '<tr class="rates-cat"><td colspan="3">Cement &amp; Concrete</td></tr>' + rows(cem)
    + '</tbody>';

  document.getElementById('rates-overlay').classList.add('open');
}

function closeRates() {
  document.getElementById('rates-overlay').classList.remove('open');
}

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
    var ironCem = products.filter(function (p) { return p.cat === 'Iron' || p.cat === 'Cement'; });
    var rateRows = ironCem.map(function (p) {
      return '<div class="rate-row">'
        + '<div><div class="rate-row-name">' + p.name + '</div><div class="rate-row-unit">per ' + p.unit + '</div></div>'
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
      + '<div class="form-group"><label>Category</label><select id="ap-cat"><option>Iron</option><option>Cement</option><option>Tools</option></select></div>'
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
  products.filter(function (p) { return p.cat === 'Iron' || p.cat === 'Cement'; }).forEach(function (p) {
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
  /* Refresh estimation product list */
  estProducts.iron   = products.filter(function (p) { return p.cat === 'Iron'; });
  estProducts.cement = products.filter(function (p) { return p.cat === 'Cement'; });
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
   TOAST NOTIFICATION
───────────────────────────────────── */
function showToast(msg, type) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.className   = 'show ' + (type || 'info');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(function () { t.className = ''; }, 2600);
}

/* ─────────────────────────────────────
   INITIALISE
───────────────────────────────────── */
updateCartCount();
renderFeatured();

/* Close rates modal when clicking outside */
document.getElementById('rates-overlay').addEventListener('click', function (e) {
  if (e.target === this) closeRates();
});
