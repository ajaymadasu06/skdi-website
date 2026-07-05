/* ============================================
   Sri Kanaka Durga Iron — Product Data
   Edit this file to add / change products
   ============================================ */

var products = [
  /* ── IRON RODS ── */
  { id: 1,  name: 'TMT Rebar 8mm',       cat: 'Iron Rods',  price: 32,  unit: 'rod',       desc: 'High-tensile TMT Fe500 rebar for light concrete reinforcement.',   featured: false },
  { id: 2,  name: 'TMT Rebar 12mm',      cat: 'Iron Rods',  price: 48,  unit: 'rod',       desc: 'Standard TMT Fe500 rebar for residential construction.',            featured: true  },
  { id: 3,  name: 'TMT Rebar 16mm',      cat: 'Iron Rods',  price: 72,  unit: 'rod',       desc: 'Heavy-duty 16mm TMT rebar for structural projects and columns.',    featured: true  },
  { id: 4,  name: 'TMT Rebar 20mm',      cat: 'Iron Rods',  price: 95,  unit: 'rod',       desc: 'High-load 20mm rebar for bridges, flyovers and heavy structures.',  featured: false },

  /* ── CEMENT (50kg bags only) ── */
  { id: 9,  name: 'Ambuja Cement 50kg',        cat: 'Cement', price: 12,  unit: 'bag', desc: '50kg cement bag — Ambuja Cement.',              featured: true  },
  { id: 10, name: 'ACC Cement 50kg',           cat: 'Cement', price: 12,  unit: 'bag', desc: '50kg cement bag — ACC Cement.',                 featured: true  },
  { id: 11, name: 'Deccan Cement 50kg',        cat: 'Cement', price: 11,  unit: 'bag', desc: '50kg cement bag — Deccan Cement.',              featured: false },
  { id: 12, name: 'Sri Chakra Cement 50kg',    cat: 'Cement', price: 11,  unit: 'bag', desc: '50kg cement bag — Sri Chakra Cement.',          featured: false },
  { id: 13, name: 'UltraTech OPC Cement 50kg', cat: 'Cement', price: 13,  unit: 'bag', desc: '50kg cement bag — UltraTech, OPC type.',        featured: true  },
  { id: 14, name: 'UltraTech PPC Cement 50kg', cat: 'Cement', price: 12,  unit: 'bag', desc: '50kg cement bag — UltraTech, PPC type.',        featured: false },
  { id: 15, name: 'UltraTech Super Cement 50kg', cat: 'Cement', price: 14, unit: 'bag', desc: '50kg cement bag — UltraTech, Super type.',     featured: false },

  /* ── IRON ROOFING SHEETS ──
     Starter prices below — update these from Admin → Update Rates */
  { id: 20, name: 'GI Roofing Sheet — Plain',       cat: 'Iron Roofing Sheets', price: 450, unit: 'sheet', desc: 'Galvanised iron corrugated roofing sheet, plain finish, weatherproof.', featured: true  },
  { id: 21, name: 'GI Roofing Sheet — Corrugated',  cat: 'Iron Roofing Sheets', price: 480, unit: 'sheet', desc: 'Heavy-gauge corrugated GI sheet for sheds, godowns and roofing.',        featured: false },

  /* ── CEMENT ROOFING SHEETS ──
     Starter prices below — update these from Admin → Update Rates */
  { id: 22, name: 'Cement Roofing Sheet — Standard',    cat: 'Cement Roofing Sheets', price: 380, unit: 'sheet', desc: 'Fibre cement corrugated roofing sheet, durable and weather-resistant.', featured: true  },
  { id: 23, name: 'Cement Roofing Sheet — Heavy Duty',  cat: 'Cement Roofing Sheets', price: 420, unit: 'sheet', desc: 'Reinforced fibre cement sheet for larger spans and industrial sheds.', featured: false }
];

/* ── Load saved daily rates from localStorage ── */
(function () {
  var saved = localStorage.getItem('skdi_rates');
  if (saved) {
    var rates = JSON.parse(saved);
    products.forEach(function (p) {
      if (rates[p.id] !== undefined) p.price = rates[p.id];
    });
  }
})();

/* ── Rate last-updated label ── */
var rateDate = localStorage.getItem('skdi_rate_date') || 'Not yet updated';

/* ── Sample orders (stored in localStorage) ── */
var orders = JSON.parse(localStorage.getItem('skdi_orders') || JSON.stringify([
  { id: 'ORD-001', customer: 'Ravi Kumar',  items: 'TMT 12mm x10, UltraTech OPC 50kg x20',  total: 'Rs.740',  status: 'delivered',  date: '2025-01-10' },
  { id: 'ORD-002', customer: 'Sita Reddy', items: 'TMT 16mm x5, GI Roofing Sheet x6', total: 'Rs.3240', status: 'processing', date: '2025-01-15' },
  { id: 'ORD-003', customer: 'Mahesh B.',  items: 'Ambuja Cement 50kg x30, Cement Roofing Sheet x4', total: 'Rs.1880', status: 'pending',    date: '2025-01-18' }
]));

/* ── Cart ── */
var cart = JSON.parse(localStorage.getItem('skdi_cart') || '[]');
