# Where to put your photos

Drop your photos into this folder using these **exact filenames** (lowercase, `.jpg`).
The website will automatically pick them up — no code changes needed.

## Category photos (`images/categories/`) — ✅ already added

| Filename                                  | Used for                     |
|--------------------------------------------|-------------------------------|
| `categories/iron-rods.jpg`                | Iron Rods category card       |
| `categories/cement.jpg`                   | Cement category card          |
| `categories/iron-roofing-sheets.jpg`      | Iron Roofing Sheets category card |
| `categories/cement-roofing-sheets.jpg`    | Cement Roofing Sheets category card |

## Homepage / store photos (put directly in `images/`)

| Filename              | Used for                                |
|------------------------|------------------------------------------|
| `hero-shop.jpg`        | Big banner photo on the homepage         |
| `shop-front.jpg`       | "Visit Our Store" — shop front photo     |
| `shop-shelves.jpg`     | "Visit Our Store" — stock/shelves photo  |
| `shop-yard.jpg`        | "Visit Our Store" — loading yard photo   |

## Product photos (put inside `images/products/`)

Each product looks for a file named after the product (spaces → hyphens, lowercase).
Until a photo exists, that product automatically shows a placeholder icon instead —
nothing breaks, so you can add photos gradually.

```
images/products/tmt-rebar-8mm.jpg
images/products/tmt-rebar-12mm.jpg
images/products/tmt-rebar-16mm.jpg
images/products/tmt-rebar-20mm.jpg
images/products/cement-50kg-brand-1.jpg
images/products/cement-50kg-brand-2.jpg
images/products/gi-roofing-sheet-plain.jpg
images/products/gi-roofing-sheet-corrugated.jpg
images/products/cement-roofing-sheet-standard.jpg
images/products/cement-roofing-sheet-heavy-duty.jpg
```

Note: once you tell me the real cement brand names, I'll rename the "Cement 50kg —
Brand 1 / Brand 2" entries (and their expected image filenames) to match.

If you add a new product later through the Admin panel, use the same rule for its
filename: lowercase the name and replace spaces/punctuation with hyphens.

## Tips for good photos

- Landscape orientation works best for `hero-shop.jpg` (wide shots).
- Square-ish photos work best for product and category images (they get cropped to fill the box).
- Keep file sizes reasonable (under ~500KB each) so the site loads fast — most phone
  cameras produce much larger files, so resize/compress before uploading if needed.
