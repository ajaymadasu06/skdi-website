/* ============================================
   Sri Kanaka Durga Iron — Product Data
   Edit this file to add / change products
   ============================================ */

var products = [
  /* ── IRON & STEEL ── */
  { id: 1,  name: 'TMT Rebar 8mm',       cat: 'Iron',  price: 32,  unit: 'rod',       desc: 'High-tensile TMT Fe500 rebar for light concrete reinforcement.',   featured: false },
  { id: 2,  name: 'TMT Rebar 12mm',      cat: 'Iron',  price: 48,  unit: 'rod',       desc: 'Standard TMT Fe500 rebar for residential construction.',            featured: true  },
  { id: 3,  name: 'TMT Rebar 16mm',      cat: 'Iron',  price: 72,  unit: 'rod',       desc: 'Heavy-duty 16mm TMT rebar for structural projects and columns.',    featured: true  },
  { id: 4,  name: 'TMT Rebar 20mm',      cat: 'Iron',  price: 95,  unit: 'rod',       desc: 'High-load 20mm rebar for bridges, flyovers and heavy structures.',  featured: false },
  { id: 5,  name: 'Angle Iron (MS)',     cat: 'Iron',  price: 35,  unit: 'piece',     desc: 'Hot-rolled mild steel angle for frames, supports and fabrication.', featured: false },
  { id: 6,  name: 'Steel I-Beam 6m',    cat: 'Iron',  price: 280, unit: 'beam',      desc: 'Structural I-beam for heavy load-bearing construction work.',       featured: true  },
  { id: 7,  name: 'GI Pipe 1 inch',     cat: 'Iron',  price: 22,  unit: 'pipe',      desc: 'Galvanised iron pipe, corrosion-resistant, suitable for plumbing.', featured: false },
  { id: 8,  name: 'Binding Wire 1kg',   cat: 'Iron',  price: 8,   unit: 'kg',        desc: 'Annealed black wire for tying reinforcement bars on site.',          featured: false },

  /* ── CEMENT & CONCRETE ── */
  { id: 9,  name: 'OPC 53 Cement 50kg', cat: 'Cement',price: 12,  unit: 'bag',       desc: 'Ordinary Portland Cement Grade 53 for all RCC construction.',       featured: true  },
  { id: 10, name: 'PPC Cement 50kg',    cat: 'Cement',price: 11,  unit: 'bag',       desc: 'Portland Pozzolana Cement, ideal for mass concrete and waterproofing.', featured: true  },
  { id: 11, name: 'White Cement 40kg',  cat: 'Cement',price: 19,  unit: 'bag',       desc: 'High purity white cement for finishing and decorative plasterwork.',  featured: false },
  { id: 12, name: 'Rapid Cement 50kg',  cat: 'Cement',price: 16,  unit: 'bag',       desc: 'Fast-setting cement for urgent repair and construction work.',        featured: false },
  { id: 13, name: 'River Sand (Fine)',  cat: 'Cement',price: 55,  unit: 'cubic mtr', desc: 'Natural river sand for concrete mix and plastering work.',           featured: false },
  { id: 14, name: 'M-Sand',            cat: 'Cement',price: 42,  unit: 'cubic mtr', desc: 'Manufactured sand as eco-friendly alternative to river sand.',       featured: false },
  { id: 15, name: 'Blue Metal 20mm',   cat: 'Cement',price: 60,  unit: 'cubic mtr', desc: 'Crushed granite aggregate for concrete mix.',                        featured: false },

  /* ── TOOLS & EQUIPMENT ── */
  { id: 16, name: 'Concrete Mixer 200L',cat: 'Tools', price: 450, unit: 'unit',      desc: 'Heavy-duty electric concrete mixer for large site batches.',         featured: true  },
  { id: 17, name: 'Trowel Set (5pcs)', cat: 'Tools', price: 28,  unit: 'set',       desc: 'Professional plastering trowel set with stainless steel blades.',    featured: false },
  { id: 18, name: 'Spirit Level 60cm', cat: 'Tools', price: 18,  unit: 'unit',      desc: 'Precision spirit level for accurate leveling on construction sites.', featured: false },
  { id: 19, name: 'Wheelbarrow 100L',  cat: 'Tools', price: 85,  unit: 'unit',      desc: 'Heavy-duty steel wheelbarrow for transporting materials on site.',   featured: false }
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
  { id: 'ORD-001', customer: 'Ravi Kumar',  items: 'TMT 12mm x10, OPC x20',        total: 'Rs.720',  status: 'delivered',  date: '2025-01-10' },
  { id: 'ORD-002', customer: 'Sita Reddy', items: 'I-Beam x2, Wheelbarrow x1',     total: 'Rs.645',  status: 'processing', date: '2025-01-15' },
  { id: 'ORD-003', customer: 'Mahesh B.',  items: 'PPC Cement x30, Trowel Set x2', total: 'Rs.386',  status: 'pending',    date: '2025-01-18' }
]));

/* ── Cart ── */
var cart = JSON.parse(localStorage.getItem('skdi_cart') || '[]');
