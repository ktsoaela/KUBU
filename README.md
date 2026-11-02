<div align="center">
  <img src="assets/images/hippo_light.png" alt="KUBU" width="128" style="background:#1a1a1a;padding:16px;border-radius:12px" />

  <h1>KUBU</h1>

  <p><strong>One stylesheet for server-rendered HTML. It still works with scripts turned off.</strong></p>

  <p>
    <a href="LICENSE.md"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-375348?style=flat-square" /></a>
    <a href="kubu-framework/pages/v2.html"><img alt="Docs" src="https://img.shields.io/badge/docs-v2-547f72?style=flat-square" /></a>
    <img alt="Stack" src="https://img.shields.io/badge/CSS-htmx-436659?style=flat-square" />
  </p>
</div>

**Author:** [Khotso Tsoaela](https://github.com/ktsoaela) (`@ktsoaela`)

---

Kubu is the hippo. It holds the page: one stylesheet, named parts, and a layout that still works when the script is gone.

**KUBU** is a CSS framework for server-rendered HTML. Components are CSS with BEM class names, sorted by Atomic Design. The browser supplies the behaviour with `<details>`, `<dialog>`, `popover`, `:target`, radio buttons and checkboxes. The stylesheet is the framework. htmx, if you use it, only swaps pages.

`kubu-framework/pages/v2.html` states the whole 2.0 contract on one page.

---

## Why KUBU

- **Semantic HTML.** Real `button`, `a`, `form`, `label`, `dialog`, `details`, `table` and `nav` elements, landmarks, and one `h1` per page.
- **BEM parts.** A block with named parts: `.card__header`, `.modal__body`, `.button--primary`. Use the parts you need.
- **One file, or only the parts on the page.** `dist/kubu.min.css` is the whole framework. Each atom, molecule and organism is also its own file.
- **Native behaviour.** Interaction comes from the elements themselves. With htmx, `hx-boost` swaps `#frame` and keeps the URL, the title and the Back button.
- **Dark-first colour.** Tokens are authored for dark (`--dark-*`) and paired with light (`--light-*`) through `light-dark()`. With no saved choice the page follows the system.
- **Readable without colour alone.** Errors carry an icon and a sentence that says how to fix them. Motion uses `transform` and `opacity`, and stops for `prefers-reduced-motion`.

---

## Quick start

**Requirements:** a browser. Node.js if you are building the CSS or running the docs.

Copy `kubu-framework/dist/kubu.min.css` into your project and link it. The readable build is `dist/kubu.css`. The same file is on the [v2.0.0 release](https://github.com/ktsoaela/KUBU/releases/tag/v2.0.0). From a clone, `kubu-framework/pages/download.html` saves both files.

```html
<link rel="stylesheet" href="/css/kubu.min.css">
```

| Goal | Command |
|------|---------|
| Whole framework | Copy `kubu-framework/dist/kubu.min.css` |
| npm | `npm install kubu-css` → `node_modules/kubu-css/dist/kubu.min.css` |
| pip / Django | `pip install kubu-css`, then add `"kubu_css"` to `INSTALLED_APPS` |
| Docs and sample desk | `cd kubu-framework && npm install && npm run dev` |
| Storybook | `cd kubu-framework && npm run storybook` → http://localhost:6006 |

`npm run dev` serves the docs at http://localhost:8080/kubu-framework/pages/index.html and the Acme Corp desk at http://localhost:3000. The desk is sample data on the one stylesheet: accounts, invoices, a team of desks, and settings. Records reset when that server restarts.

The pip package holds only static files. Flask notes are in [kubu-framework/python/README.md](kubu-framework/python/README.md).

### Only the parts you use

Load the four base files, then the components on the page:

```html
<link rel="stylesheet" href="kubu/css/atoms/colors.css">
<link rel="stylesheet" href="kubu/css/atoms/spacing.css">
<link rel="stylesheet" href="kubu/css/atoms/typography.css">
<link rel="stylesheet" href="kubu/css/atoms/Reset.css">
<link rel="stylesheet" href="kubu/css/atoms/Buttons.css">
<link rel="stylesheet" href="kubu/css/organisms/Card.css">
```

Or list those files as `@import` lines and bundle them:

```bash
cd kubu-framework
npm install
node scripts/build.mjs my-kubu.css   # writes dist/my-kubu.css and dist/my-kubu.min.css
```

### Write HTML

```html
<article class="card">
  <header class="card__header">
    <h2 class="card__title">Invoice 1042</h2>
    <span class="badge badge--safe">Paid</span>
  </header>
  <div class="card__body"><p>R 4 300.00, paid on 28 October 2026.</p></div>
  <footer class="card__footer"><a class="button button--primary" href="/invoices/1042">View invoice</a></footer>
</article>
```

---

## Packages

Each folder in `kubu-framework/packages/` has one job. A component looks right without any of them.

| Folder | What it holds |
|--------|----------------|
| `web/` | A starter site: three pages that link `kubu.min.css` and swap `#content` with `hx-boost` |
| `typography/` | Colours, spacing, type and the reset, without components (`kubu-typography`) |
| `icons/` | The `.icon` classes and the SVG sprite (`kubu-icons`) |
| `plugin/` | htmx patterns: out-of-band toasts and one listener on a parent |
| `js/` | Optional ES modules (`data-kubu`) for what HTML cannot do alone |

The source tree:

- `kubu-framework/css/` — atoms, molecules, organisms, utilities
- `kubu-framework/dist/` — `kubu.css` and `kubu.min.css`
- `kubu-framework/pages/` — the docs site
- `kubu-framework/scripts/` — build and page stamps
- `kubu-framework/stories/` — an HTML Storybook that reuses the docs examples

---

## Docs

The docs are static HTML in `kubu-framework/pages/`. Each address is a full page. With htmx, the header stays and `#frame` (sidebar and main) swaps. The same links are normal navigations when htmx is absent.

| Prefix | What it is |
|--------|------------|
| `index.html`, `papers.html`, `use-cases.html`, `icons.html`, `showcases.html`, `news.html`, `download.html` | The seven header pages |
| `v2.html` | The 2.0 contract: one CSS file, BEM parts, page endpoints, optional packages |
| `start-*.html` | Jumping In: intro, contents, browsers, JavaScript, grid, theming |
| `atom-*.html`, `molecule-*.html`, `organism-*.html`, `utility-*.html` | One component page each |
| `page-*.html` | Example pages: home, about, product, contact |
| `snippet-*.html`, `template-main.html` | Header, footer, forms snippet, and the main template |

The menu lives in `kubu-framework/scripts/site.mjs`. `node scripts/pages.mjs` stamps the header, sidebar, footer and code samples into every page.

---

## Design rules

- **44px targets.** Every control is at least 44 by 44 pixels, padding included, and shows a `:focus-visible` ring.
- **Type sizes.** Labels and fields are 14px. A badge is 12px in sentence case. An alert is 13px.
- **Cards.** 20px of padding and a thin border.
- **Themes.** A theme overrides the `--kubu-*` variables in `css/atoms/colors.css`.

---

## Documentation map

| Doc | Purpose |
|-----|---------|
| [kubu-framework/pages/v2.html](kubu-framework/pages/v2.html) | The 2.0 contract |
| [kubu-framework/README.md](kubu-framework/README.md) | Where a file goes, and how a class is named |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Development and pull requests |
| [DEV_NOTES.md](DEV_NOTES.md) | Notes for working on KUBU |
| [kubu-framework/DEVNOTES.md](kubu-framework/DEVNOTES.md) | File-by-file map |
| [LICENSE.md](LICENSE.md) | MIT |

---

## License

MIT. Copyright 2026 KUBU.
