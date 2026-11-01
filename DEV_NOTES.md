# Developer notes

How KUBU is put together, and why.

## Layers

| Layer | Where | Needs |
| --- | --- | --- |
| CSS components | `kubu-framework/css/` | Nothing. Each file stands alone on the four base atoms. |
| Bundle | `kubu-framework/dist/kubu.css`, `kubu.min.css` | Built by `node scripts/build.mjs` (Lightning CSS) and committed. |
| Docs site | `kubu-framework/pages/` | Static files. htmx is optional. The menu is `scripts/site.mjs`. |
| Packages | `kubu-framework/packages/` | Optional slices, one job each: `web`, `typography`, `icons`, `plugin`, `js`. |
| JavaScript components | `kubu-framework/packages/js/src/` | Optional, for what HTML cannot do alone. |
| Storybook | `kubu-framework/.storybook/`, `stories/` | A workshop only. Stories read the previews from `pages/`. |

People get KUBU by cloning [github.com/ktsoaela/KUBU](https://github.com/ktsoaela/KUBU) and copying `dist/kubu.min.css`, by saving it from `pages/download.html`, or from the GitHub release.

## Packages and distribution

- KUBU has no UI-library layer. There is no Vue, React or other component kit; pages depend only on class names.
- `packages/web` is a static starter: three pages, `dist/kubu.min.css`, `hx-boost` swapping `#content`.
- `packages/typography` and `packages/icons` are entry files that `@import` from `../../css`. Their `npm run build` runs `scripts/build.mjs` into their own `dist/`, which git ignores. There is one copy of every rule.
- `packages/plugin` is documentation and fragments only: htmx patterns, no script, no CSS.
- `packages/js` holds the optional modules. `css/main.css` there has only the styles the modules add; link it after `kubu.min.css`.
- npm: `kubu-framework/package.json` is `kubu-css` and ships `dist`, `css`, `packages`, `img` and `js/htmx.min.js`. `prepublishOnly` rebuilds the bundle. The slices publish separately from their folders as `kubu-icons` and `kubu-typography`.
- pip: `kubu-framework/pyproject.toml` (hatchling) builds a data-only wheel. `python/kubu_css/__init__.py` is a docstring; the CSS lands in `kubu_css/static/kubu/` for Django's app static finder or a Flask blueprint.
- GitHub: release notes for each tag live in `.github/releases/`. Attach `dist/kubu.min.css` and `dist/kubu.css` to the release.

## CSS

- Files follow Atomic Design: `atoms/`, `molecules/`, `organisms/`, then `utilities/` and `snippets/`. Templates and pages are HTML in `templates/` and `pages/`.
- Class names follow BEM: `.block`, `.block__element`, `.block--modifier`. The names describe the DOM, so the parts list on each docs page is the API. The full map is `kubu-framework/DEVNOTES.md`.
- Components read only semantic tokens (`--kubu-bg`, `--kubu-surface`, `--kubu-text`, `--kubu-primary`, `--kubu-focus` and the rest) from `atoms/colors.css`. Dark values are `--dark-*` and light values are `--light-*`. Each `--kubu-*` token is `light-dark(var(--light-*), var(--dark-*))`.
- `:root { color-scheme: light dark }` follows the system. `[data-theme="dark"|"light"]` on `<html>`, or the theme radios (`#auto-mode`, `#dark-mode`, `#light-mode`, read with `:has()` in `utilities/Darkmode.css`), override it.
- Interactive parts use native HTML: `<details>` (dropdowns, collapse, dismissible alerts, the month picker), `<dialog>` (modal), `popover` (popovers), `:target` or a checkbox (offcanvas), radio buttons (tabs, accordion, rating, theme).
- Controls are at least `--kubu-target` (44px). `Reset.css` draws the `:focus-visible` ring and turns motion off for `prefers-reduced-motion`.
- `utilities/Ajax.css` styles htmx: `.htmx-indicator`, `.htmx-request`, `.htmx-swapping` and the `.skeleton` placeholders.
- Event delegation has no CSS file. It is htmx on a parent (`hx-on`, `hx-target`), documented on `utility-event-delegation.html`.

## Docs site

- Every page is a complete HTML file directly in `kubu-framework/pages/`, so a relative link means the same on every page. There is no `pages/docs/` folder.
- Names follow the menu: `index.html` and the other six header pages, then `start-`, `atom-`, `molecule-`, `organism-`, `utility-`, `page-`, `snippet-`, and `template-main.html`.
- You write a page's `<main class="doc" id="main" tabindex="-1">`. `node scripts/pages.mjs` writes everything around it from `scripts/site.mjs`: the head, the header, `#frame` with the sidebar, and the footer, with `aria-current="page"` on the right links.
- The same script writes each code sample from the live preview above it (escaped, colour-coded spans; see `scripts/highlight.mjs`) and builds the Contents page. The browser runs no highlighter. Leave `<details class="doc-code"></details>` empty in the source you edit; the script fills it.
- `<body>` carries `hx-boost="true" hx-target="#frame" hx-select="#frame" hx-swap="outerHTML" hx-push-url="true"`, `hx-ext="head-support"` for the `<title>`, and `hx-select-oob="#site-links"` for the header highlight.
- `js/docs.js` is optional: it remembers the theme, shows Copy code, polyfills `commandfor`, and moves focus to `#main` after a swap. Pages must still work with that file removed.
- In-page htmx demos load fragments from `kubu-framework/templates/` with `hx-select="unset"` and `hx-push-url="false"`.

## Checks

```bash
cd kubu-framework
node scripts/pages.mjs --check   # links, one h1, #frame, banned classes and markup
node scripts/smoke.mjs           # Chrome, Edge, Firefox and WebKit (Safari): swaps, Back, 44px targets, focus, no-JS behaviour
node scripts/build.mjs           # the bundle still builds
```

`npm test` in `kubu-framework` runs the page check and the smoke test. The smoke test also covers `pages/v2.html` and the `packages/web` starter. `npm run build-storybook` checks that every story still finds its docs page.

## Not in KUBU, on purpose

No utility-class engine, no Vue or React component kit, no animation library, no client-side router, no WebGL. A component that needs JavaScript to look right does not belong in `css/`.
