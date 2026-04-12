# Keysight Network Test Solutions — Sales Enablement Hub

A filterable use case explorer mapping Keysight NTS products to customer verticals and real business challenges. Built for partner and internal sales enablement.

---

## 🚀 Hosting on GitHub Pages

### First-time setup

1. **Fork or clone this repository**
   ```bash
   git clone https://github.com/YOUR-ORG/keysight-nts-hub.git
   cd keysight-nts-hub
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repo → **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` / `root`
   - Click **Save**
   - Your site will be live at: `https://YOUR-ORG.github.io/keysight-nts-hub/`

> **No build step required.** The app uses React via CDN and Babel Standalone, so GitHub Pages serves it as-is.

---

## 📁 Directory Structure

```
keysight-nts-hub/
│
├── index.html              # Entry point — loads all scripts in order
│
├── css/
│   └── styles.css          # All styles (Keysight brand tokens + layout)
│
├── assets/
│   ├── keysight-logo.jpg   # Official Keysight horizontal logo
│   └── hero-bg.png         # Hero section background image
│
├── data/
│   ├── config.js           # ← EDIT: verticals, products, colors
│   └── use-cases.js        # ← EDIT: add/update use cases here
│
├── js/
│   ├── App.jsx             # Main app — state, filtering, layout
│   └── components/
│       ├── Layout.jsx      # Logo, wave SVG
│       ├── UseCaseCard.jsx # Individual use case card
│       └── MatrixView.jsx  # Product × Vertical matrix view
│
└── README.md
```

---

## ➕ Adding a New Use Case

Open `data/use-cases.js` and add a new entry to the `USE_CASES` array:

```js
{
  id: 9999,                          // Unique integer — increment from the last one
  cat: 'Core',                       // 'Core' | 'Tier-2' | 'Strategic'
  vert: 'Federal',                   // Must exactly match a vertical in config.js
  prods: ['IxNetwork', 'AresONE'],   // Array — must match products in config.js
  prob: 'Short problem statement (shown as card title)',
  trigger: 'What event creates buying urgency for this customer',
  challenge: 'What the customer is struggling with — their perspective',
  solution: 'How Keysight solves it — specific product actions',
  caps: [
    'Technical capability 1',
    'Technical capability 2',
    'Technical capability 3',
  ],
  outcome: 'The measurable business result the customer achieves',
},
```

**Tip:** Group new entries under the existing vertical comment blocks for readability.

---

## ➕ Adding a New Vertical

1. **Add to `data/config.js`** — under the correct tier in `CATEGORY_CONFIG`:
   ```js
   'My New Vertical': {
     label: 'My New Vertical',
     icon: '🏭',
     cls: 'core',        // 'core' | 'tier2' | 'strategic'
     dotCls: 'dot-core',
     desc: 'Brief description shown in the category header',
     verticals: ['My New Vertical'],
   },
   ```
   Or add it to an existing tier's `verticals` array.

2. **Add a color** in `VERTICAL_COLORS` in `data/config.js`:
   ```js
   'My New Vertical': {
     bg: '#2D6A9F',
     light: 'rgba(45,106,159,0.10)',
     border: 'rgba(45,106,159,0.28)',
     text: '#1E5585',
   },
   ```

3. **Add use cases** in `data/use-cases.js` referencing the exact vertical name.

---

## ➕ Adding a New Product

Open `data/config.js` and add the product name to the relevant group in `PRODUCT_GROUPS`:

```js
{ group: 'L1-3 Software', products: ['IxNetwork', 'IxChariot', 'KAI Data Center Builder', 'KENG', 'IxANVL', 'MyNewProduct'] },
```

Then reference `'MyNewProduct'` in use cases via the `prods` array.

---

## 🎨 Branding

Brand tokens are defined as CSS variables at the top of `css/styles.css`:

```css
:root {
  --ks-red:       #E90029;
  --ks-dark-blue: #071D49;
  --ks-web-teal:  #3A828A;
  /* ... */
}
```

To swap the hero background image, replace `assets/hero-bg.png` with your image (keep the same filename, or update the reference in `css/styles.css`).

---

## 🗂 Vertical Tiers

| Tier | Verticals | Sales Motion |
|---|---|---|
| **Core** | Federal, Enterprise, Financial, Service Provider, Hyperscaler | Direct, high-volume |
| **Tier-2** | Healthcare, Manufacturing, Retail, Technology Companies, Energy | Partner-led |
| **Strategic Growth** | AI Infrastructure Providers, Colocation / Data Centers | Targeted investment |

---

## 📋 For Partner Use Only

This tool is for internal and partner sales enablement. Not for external customer distribution.

*Keysight Technologies · Network Test Solutions · 2026*
