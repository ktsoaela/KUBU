# Developer notes

How KUBU is put together, and why.

## Layers

| Layer | Where | Needs |
| --- | --- | --- |
| CSS components | `kubu-framework/css/` | Nothing. Each file stands alone on the four base atoms. |
| Bundle | `kubu-framework/dist/kubu.css`, `kubu.min.css` | Built by `node scripts/build.mjs` (Lightning CSS). |
| Docs site | `kubu-framework/pages/` | Static files. htmx is optional. |
| JavaScript components | `kubu.20/Documentation/kubu/src/js/` | Optional, for what HTML cannot do alone. |
| Vue site | `kubu-web/frontend/` | Uses the bundle and the same class names. |

## CSS

- Files follow Atomic Design: `atoms/`, `molecules/`, `organisms/`, then `utilities/` and `snippets/`. Templates and pages are HTML in `templates/` and `pages/`.
- Class names follow BEM: `.block`, `.block__element`, `.block--modifier`. The names describe the DOM, so the parts list on each docs page is the API.
- Components read only semantic tokens (`--kubu-bg`, `--kubu-surface`, `--kubu-text`, `--kubu-primary`, `--kubu-focus` and the rest) from `atoms/colors.css`. Each token is `light-dark(var(--light-x), var(--dark-x))`; the dark value is the master.
- `:root { color-scheme: light dark }` follows the system. `[data-theme="dark"|"light"]` on `<html>` or the theme radios (`#auto-mode`, `#dark-mode`, `#light-mode`, read with `:has()` in `utilities/Darkmode.css`) override it.
- Interactive parts use native HTML: `<details>` (dropdowns, collapse, dismissible alerts, the month picker), `<dialog>` with `commandfor` (modal), `popover` (popovers), `:target` or a checkbox (offcanvas, the CSS modal), radio buttons (tabs, accordion, rating, theme).
- Controls are at least `--kubu-target` (44px). `Reset.css` draws the `:focus-visible` ring and turns motion off for `prefers-reduced-motion`.
- `utilities/Ajax.css` styles htmx: `.htmx-indicator`, `.htmx-request`, `.htmx-swapping` and the `.skeleton` placeholders.

## Docs site

- Every page is a complete HTML file in `kubu-framework/pages/`, all in one folder, so a relative link means the same on every page.
- You write a page's `<main class="doc" id="main" tabindex="-1">`. `node scripts/pages.mjs` writes everything around it from `scripts/site.mjs`: the head, the header, `#frame` with the sidebar, and the footer, with `aria-current="page"` on the right links.
- The same script writes each code sample from the live preview above it (escaped, colour-coded spans; see `scripts/highlight.mjs`) and builds the Contents page. The browser runs no highlighter.
- `<body>` carries `hx-boost="true" hx-target="#frame" hx-select="#frame" hx-swap="outerHTML" hx-push-url="true"`, `hx-ext="head-support"` for the `<title>`, and `hx-select-oob="#site-links"` for the header highlight.
- `js/docs.js` is optional: it remembers the theme, shows Copy code, polyfills `commandfor`, and moves focus to `#main` after a swap.
- In-page htmx demos load fragments from `kubu-framework/templates/` with `hx-select="unset"` and `hx-push-url="false"`.

## Checks

```bash
cd kubu-framework
node scripts/pages.mjs --check   # links, one h1, #frame, banned classes and markup
node scripts/smoke.mjs           # headless Chrome or Edge: swaps, Back, 44px targets, focus, no-JS behaviour
node scripts/build.mjs           # the bundle still builds
```

## Not in KUBU, on purpose

No utility-class engine, no React component kit, no animation library, no client-side router, no WebGL. A component that needs JavaScript to look right does not belong in `css/`.
