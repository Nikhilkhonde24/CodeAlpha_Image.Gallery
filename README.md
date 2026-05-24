# LUMINA — Image Gallery

A responsive, filterable image gallery with lightbox viewer, smooth transitions, hover effects, and live CSS image filters.

---

## Features

| Feature | Details |
|---|---|
| **Responsive grid** | 4 → 3 → 2 → 1 column layout via CSS Grid |
| **Category filters** | All / Nature / Architecture / Abstract / Portrait |
| **Hover effects** | Image zoom + animated overlay text reveal |
| **Lightbox viewer** | Full-screen view with prev/next navigation |
| **Keyboard nav** | Arrow keys to navigate, Esc to close |
| **Touch / swipe** | Swipe left/right on mobile |
| **Image filters** | Original, B&W, Sepia, Vivid, Invert Hue, Matte |
| **Smooth transitions** | CSS transitions & staggered entry animations |

---

## Project Structure

```
image-gallery/
├── index.html          ← Main page (structure + content)
├── css/
│   └── style.css       ← All styles, layout, animations, responsive
├── js/
│   └── gallery.js      ← Filtering, lightbox, navigation, image filters
├── images/             ← (optional) Place your own images here
└── README.md           ← This file
```

---

## How to Run Locally

Just open `index.html` in any modern browser — no build tools or server needed.

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a simple dev server (requires Node.js)
npx serve .

# Option 3: Python server
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## How Files Connect

```
index.html
  │
  ├── <link rel="stylesheet" href="css/style.css">   ← loads all styles
  │
  └── <script src="js/gallery.js"></script>          ← loads at bottom of <body>
```

- **`index.html`** defines the HTML structure: header, hero, filter bar, gallery grid, lightbox overlay, and footer. Every `data-category` attribute on `.gallery-item` elements drives the filter logic.
- **`css/style.css`** handles all visual styling, layout (CSS Grid), hover transitions, lightbox appearance, and responsive breakpoints.
- **`js/gallery.js`** reads the DOM, wires up click/keyboard/touch events, handles category filtering (show/hide items), drives the lightbox (open/close/navigate), and applies CSS `filter` values to the lightbox image.

---

## How to Add Your Own Images

1. Put your image files in the `images/` folder.
2. In `index.html`, find any `.gallery-item` block and change the `<img src="...">`:
   ```html
   <!-- Before (Unsplash) -->
   <img src="https://images.unsplash.com/..." />

   <!-- After (local) -->
   <img src="images/my-photo.jpg" alt="My Photo" />
   ```
3. Update `data-category`, `alt`, and overlay text to match.

---

## Pushing to GitHub

### First time setup

```bash
# 1. Go into the project folder
cd image-gallery

# 2. Initialize git
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit: LUMINA image gallery"

# 5. Create a repo on GitHub (github.com → New repository)
#    Copy the remote URL, then:

git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 6. Push
git branch -M main
git push -u origin main
```

### Enable GitHub Pages (free live hosting)

1. Go to your repo on GitHub
2. **Settings → Pages**
3. Source: **Deploy from a branch → main → / (root)**
4. Save — your gallery will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Updating later

```bash
git add .
git commit -m "Update gallery images"
git push
```

---

## Customization

| What | Where |
|---|---|
| Colors & fonts | CSS variables at top of `style.css` (`:root { }`) |
| Grid row height | `.gallery-grid { grid-auto-rows: 260px; }` |
| Add a category | Add `data-filter="yourcategory"` button + matching `data-category` on items |
| Add image filter preset | Add a `.filter-pill` in `index.html` with `data-css-filter="..."` |

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Requires no external dependencies beyond Google Fonts (loaded via CDN).
