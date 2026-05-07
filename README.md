# Sri Kanaka Durga Iron — Website

A complete business website for Sri Kanaka Durga Iron shop.
Built with plain HTML, CSS and JavaScript — no frameworks, no installation required.

---

## How to Open in VS Code

1. Open VS Code
2. Go to **File → Open Folder**
3. Select the **skdi-website** folder
4. Right-click on **index.html** → **Open with Live Server**
   (Install the "Live Server" extension if you don't have it)

OR simply double-click **index.html** to open it in your browser.

---

## Folder Structure

```
skdi-website/
│
├── index.html          ← Main website file (open this)
│
├── css/
│   └── style.css       ← All styles and colours
│
├── js/
│   ├── data.js         ← Product list and prices (edit here)
│   └── app.js          ← All website functions
│
├── images/             ← Add your shop photos here (optional)
│
└── README.md           ← This file
```

---

## Pages Available

| Page       | Description                                      |
|------------|--------------------------------------------------|
| Home       | Hero banner, categories, featured products       |
| Products   | Full product catalogue with filter buttons       |
| Estimate   | Online estimation portal — generates price bill  |
| Cart       | Shopping cart with order summary                 |
| Contact    | Message form + shop contact details              |
| Admin      | Dashboard, daily rate update, product management |

---

## How to Update Daily Iron & Cement Rates

1. Open the website
2. Click **Admin** in the navbar
3. Click **Update Rates** in the left sidebar
4. Change the prices for each item
5. Click **Save Today's Rates**

That's it! All product pages, the "Today's Rates" popup and the estimation portal will show the new prices immediately.

---

## How to Add / Change Products

**Option 1 — Through Admin Panel (easy):**
1. Open Admin → Add Product
2. Fill in the details and click Add

**Option 2 — Edit the code directly:**
Open `js/data.js` and add a new entry to the `products` array:

```javascript
{ id: 20, name: 'Your Product Name', cat: 'Iron', price: 50, unit: 'rod',
  desc: 'Product description here.', featured: false }
```

- `cat` must be: `'Iron'`, `'Cement'` or `'Tools'`
- `featured: true` will show it on the Home page

---

## How to Change Shop Details

Open `index.html` and search for:
- **Phone number** — find `+91 98765 43210` and replace
- **Address** — find `Near Bus Stand` and replace
- **Email** — find `sales@srikanakadurgairon.com` and replace
- **Shop name** — find `Sri Kanaka Durga Iron` and replace

---

## Features

- Browse Products with Iron / Cement / Tools filter
- Add to Cart and place orders
- Online Estimation Portal — customers get instant bill with GST
- Today's Rates popup in navbar
- Admin dashboard with:
  - Daily rate update panel
  - Product inventory management
  - Order tracking and status update
- All data saved in browser (localStorage) — no server needed
- Print / Save PDF for estimate bills
- Fully responsive (works on mobile, tablet, desktop)

---

## Technologies Used

- HTML5
- CSS3 (no frameworks)
- Vanilla JavaScript (no libraries)
- Google Fonts (Source Serif 4 + Source Sans 3)
- localStorage for data persistence

---

*Built for Sri Kanaka Durga Iron — Est. 2009*
