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

  window.scrollTo(0, 0);
}

/* ─────────────────────────────────────
   PRODUCT HELPERS
───────────────────────────────────── */
function getBadge(cat) {
  if (cat === 'Iron Rods')             return '<span class="product-badge badge-iron">Iron Rods</span>';
  if (cat === 'Cement')                return '<span class="product-badge badge-cement">Cement</span>';
  if (cat === 'Iron Roofing Sheets')   return '<span class="product-badge badge-iron-roof">Iron Roofing Sheets</span>';
  if (cat === 'Cement Roofing Sheets') return '<span class="product-badge badge-cement-roof">Cement Roofing Sheets</span>';
  return '<span class="product-badge">' + cat + '</span>';
}

function getProductSVG(cat) {
  if (cat === 'Iron Rods') {
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
  if (cat === 'Iron Roofing Sheets' || cat === 'Cement Roofing Sheets') {
    var wave = cat === 'Iron Roofing Sheets' ? '#AAB2BD' : '#B7ADA0';
    var line = cat === 'Iron Roofing Sheets' ? '#8B939E' : '#948A7C';
    var label = cat === 'Iron Roofing Sheets' ? 'GI ROOFING SHEET' : 'CEMENT ROOFING SHEET';
    return '<svg viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg">'
      + '<path d="M8 30 Q18 20 28 30 T48 30 T68 30 T88 30 T108 30 T128 30 V45 Q118 55 108 45 T88 45 T68 45 T48 45 T28 45 T8 45 Z" fill="' + wave + '"/>'
      + '<path d="M8 30 Q18 20 28 30 T48 30 T68 30 T88 30 T108 30 T128 30" stroke="' + line + '" stroke-width="1.5" fill="none"/>'
      + '<text x="70" y="70" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#888">' + label + '</text>'
      + '</svg>';
  }
  return '<svg viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg">'
    + '<rect x="8" y="38" width="124" height="16" rx="4" fill="#C9A000"/>'
    + '<rect x="8" y="38" width="124" height="5" rx="3" fill="#F5C400"/>'
    + '<rect x="58" y="20" width="24" height="50" rx="3" fill="#AAAAAA"/>'
    + '<rect x="58" y="20" width="24" height="8" rx="2" fill="#CCCCCC"/>'
    + '<text x="70" y="82" text-anchor="middle" font-family="sans-serif" font-size="8" fill="#888">' + cat + '</text>'
    + '</svg>';
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function buildCard(p) {
  return '<div class="product-card">'
    + '<div class="product-img">'
    + '<img src="images/products/' + slugify(p.name) + '.jpg" alt="' + p.name + '" '
    + 'onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';" />'
    + '<div class="product-img-fallback" style="display:none;">' + getProductSVG(p.cat) + '</div>'
    + '</div>'
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
    var map = {
      All: 'fb-all',
      'Iron Rods': 'fb-iron-rods',
      Cement: 'fb-cement',
      'Iron Roofing Sheets': 'fb-iron-roofing',
      'Cement Roofing Sheets': 'fb-cement-roofing'
    };
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
  iron:   products.filter(function (p) { return p.cat === 'Iron Rods'; }),
  cement: products.filter(function (p) { return p.cat === 'Cement'; }),
  tools:  products.filter(function (p) { return p.cat === 'Iron Roofing Sheets' || p.cat === 'Cement Roofing Sheets'; })
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
    + makeSection(iron,  'Iron Rods')
    + makeSection(cem,   'Cement')
    + makeSection(tools, 'Roofing Sheets')
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
