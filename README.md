# KUBU

KUBU is a CSS framework for server-rendered HTML. Components are CSS with BEM class names, sorted by Atomic Design. The browser supplies the behaviour with `<details>`, `<dialog>`, `popover`, `:target`, radio buttons and checkboxes, so every component looks and works with scripts turned off.

Kubu is the hippo. It holds the page: one stylesheet, named parts, and a layout that still works when the script is gone.

There is no UI library to install. One stylesheet is the framework; htmx, if you use it, only swaps pages. `kubu-framework/pages/v2.html` states the whole 2.0 contract on one page.

- `kubu-framework/`: the CSS (`css/`), the bundle (`dist/`), the docs site (`pages/`), the build scripts (`scripts/`) and the optional packages (`packages/`)
- `kubu-framework/packages/`: a starter site (`web`), typography and icon slices, htmx patterns (`plugin`) and optional JS modules (`js`)
- `kubu-framework/stories/`: an HTML Storybook that reuses the docs examples

## Use it

### The whole framework

Copy `kubu-framework/dist/kubu.min.css` into your project and link it. The readable build is `dist/kubu.css`. The same file is attached to the [v2.0.0 release](https://github.com/ktsoaela/KUBU/releases/tag/v2.0.0).

```html
<link rel="stylesheet" href="/css/kubu.min.css">
```

From a clone, the Download page also saves those two files: `kubu-framework/pages/download.html`.

### From a package manager

The manifests are ready for both registries under the name `kubu-css`:

```bash
npm install kubu-css   # node_modules/kubu-css/dist/kubu.min.css
pip install kubu-css   # Django: add "kubu_css" to INSTALLED_APPS, then {% static 'kubu/kubu.min.css' %}
```

The pip package holds only static files; see `kubu-framework/python/README.md` for Flask.

### Packages

Each folder in `kubu-framework/packages/` has one job, and none is needed for a component to look right.

| Folder | What it holds |
| --- | --- |
| `web/` | A starter site: three pages that link `kubu.min.css` and swap `#content` with `hx-boost` |
| `typography/` | Colours, spacing, type and the reset, without components (npm: `kubu-typography`) |
| `icons/` | The `.icon` classes and the SVG sprite (npm: `kubu-icons`) |
| `plugin/` | htmx patterns: out-of-band toasts and one listener on a parent |
| `js/` | Optional ES modules (`data-kubu`) for what HTML cannot do alone |

### Only the parts you use

Every atom, molecule and organism is its own file. Load the four base files, then only the components on the page:

```html
<link rel="stylesheet" href="kubu/css/atoms/colors.css">
<link rel="stylesheet" href="kubu/css/atoms/spacing.css">
<link rel="stylesheet" href="kubu/css/atoms/typography.css">
<link rel="stylesheet" href="kubu/css/atoms/Reset.css">
<link rel="stylesheet" href="kubu/css/atoms/Buttons.css">
<link rel="stylesheet" href="kubu/css/organisms/Card.css">
```

Or list those files as `@import` lines in your own entry file and bundle it:

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

## Docs

```bash
cd kubu-framework
npm install
npm run dev     # serves the repository and opens http://localhost:8080/kubu-framework/pages/index.html
```

The docs are one htmx site made of static pages in `kubu-framework/pages/`. Each address is a full HTML file. With htmx, the header stays and `#frame` (sidebar and main) swaps. Without htmx, the same links are normal navigations.

| Prefix | What it is |
| --- | --- |
| `index.html`, `papers.html`, `use-cases.html`, `icons.html`, `showcases.html`, `news.html`, `download.html` | The seven header pages |
| `v2.html` | The 2.0 contract: one CSS file, BEM parts, page endpoints, optional packages |
| `start-*.html` | Jumping In: intro, contents, browsers, JavaScript, plus grid and theming |
| `atom-*.html`, `molecule-*.html`, `organism-*.html`, `utility-*.html` | One component page each |
| `page-*.html` | Example pages: home, about, product, contact |
| `snippet-*.html`, `template-main.html` | Header, footer, forms snippet, and the main template |

The menu itself lives in `kubu-framework/scripts/site.mjs`. `node scripts/pages.mjs` stamps the header, sidebar, footer and code samples into every page.

Storybook is a workshop beside the docs. Each story is the live example markup from a docs page, on a canvas that loads `dist/kubu.min.css`:

```bash
cd kubu-framework
npm run storybook   # http://localhost:6006
```

## Design rules

- **Semantic HTML.** Real `button`, `a`, `form`, `label`, `dialog`, `details`, `table` and `nav` elements, landmarks, one `h1` per page.
- **BEM composition.** A component is a block with named parts: `dialog.modal` holds `.modal__header`, `.modal__title`, `.modal__body` and `.modal__footer`. Use the parts you need; there are no options to configure.
- **htmx boost.** Each address is a full page. With htmx, `hx-boost` swaps only `#frame` and keeps the URL, the title and the Back button right.
- **Dark-master tokens, OS-aware scheme.** Colours are authored for dark first (`--dark-*`) and paired with light (`--light-*`) through `light-dark()`. With no saved choice the page follows the system. A theme is an override of the `--kubu-*` variables in `css/atoms/colors.css`.
- **44px targets.** Every control is at least 44 by 44 pixels and shows a `:focus-visible` ring. Colour is never the only signal: errors carry an icon and a sentence that says how to fix them.
- **CSS motion.** Transitions and animations use `transform` and `opacity` only, and stop for `prefers-reduced-motion`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [DEV_NOTES.md](DEV_NOTES.md). The file-by-file map is `kubu-framework/DEVNOTES.md`.

## License

MIT. See [LICENSE.md](LICENSE.md).
