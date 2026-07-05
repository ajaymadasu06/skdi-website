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
├── admin.html          ← Staff-only admin panel (password protected, not linked publicly)
├── estimation.html     ← Online estimation portal
│
├── css/
│   └── style.css       ← All styles and colours
│
├── js/
│   ├── data.js         ← Product list and prices (edit here)
│   ├── app.js          ← Public website functions
│   └── admin.js        ← Admin panel functions + login (only loaded by admin.html)
│
├── images/             ← Add your shop and product photos here (see images/README.md)
│   └── products/       ← Individual product photos
│
└── README.md           ← This file
```

---

## Pages Available

| Page       | Description                                      |
|------------|--------------------------------------------------|
| Home       | Hero banner, categories, featured products, store gallery |
| Products   | Full product catalogue with filter buttons       |
| Estimate   | Online estimation portal — generates price bill  |
| Cart       | Shopping cart with order summary                 |
| Contact    | Message form + shop contact details              |

The **Admin panel is a separate page** (`admin.html`) — see below. It is not
linked anywhere on the public site, so ordinary visitors won't see or find it.

---

## Admin Panel (staff only)

The admin dashboard now lives on its own page: **`admin.html`**.

- It is **not linked from the public navbar or footer** — customers browsing
  the site have no way to stumble onto it.
- To open it, go directly to `admin.html` in the browser (e.g.
  `yourdomain.com/admin.html`), or open the file directly if testing locally.
- It's protected by a password screen. The default password is:

  ```
  skdi2025
  ```

  **Change this before putting the site online.** Open `js/admin.js` and edit
  the line near the top:

  ```javascript
  var ADMIN_PASSWORD = 'skdi2025'; /* change this to your own password */
  ```

  ⚠️ **Important:** this is a simple client-side password check — good enough
  to keep casual visitors and search engines out of the admin panel, but
  anyone who inspects the page's source code could find the password. It is
  **not real security**. Don't rely on it for sensitive data. If you need
  proper protection (e.g. because the site will handle real customer orders
  or payments), the admin page should eventually sit behind server-side
  login — happy to help set that up when you're ready to add a backend.

---

## Adding Your Own Photos

The site is set up to use **your real photos** — see `images/README.md` for
the exact filenames to use for the homepage banner, the "Visit Our Store"
gallery, and each product. Until a photo is added, that spot automatically
shows a clean placeholder instead, so nothing looks broken in the meantime.

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

- `cat` must be: `'Iron Rods'`, `'Cement'`, `'Iron Roofing Sheets'` or `'Cement Roofing Sheets'`
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

- Browse Products with Iron Rods / Cement / Iron Roofing Sheets / Cement Roofing Sheets filter
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
