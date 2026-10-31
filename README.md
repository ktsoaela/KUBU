# KUBU

KUBU is a CSS framework for server-rendered HTML. Components are CSS with BEM class names, sorted by Atomic Design. The browser supplies the behaviour with `<details>`, `<dialog>`, `popover`, `:target`, radio buttons and checkboxes, so every component looks and works with scripts turned off.

- `kubu-framework/`: the framework (`css/`), the bundle (`dist/`) and the docs site (`pages/`)
- `kubu.20/`: the optional JavaScript component layer and its demo
- `kubu-web/`: a Vue front end that uses the same classes

## Use it

KUBU is not published to npm. Take the CSS from this repository.

### The whole framework

Copy `kubu-framework/dist/kubu.min.css` into your project and link it:

```html
<link rel="stylesheet" href="/css/kubu.min.css">
```

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

The docs are one htmx site made of static pages: every component has a page with a live example, its BEM parts and the markup.

## Design rules

- **Semantic HTML.** Real `button`, `a`, `form`, `label`, `dialog`, `details`, `table` and `nav` elements, landmarks, one `h1` per page.
- **BEM composition.** A component is a block with named parts: `dialog.modal` holds `.modal__header`, `.modal__title`, `.modal__body` and `.modal__footer`. Use the parts you need; there are no options to configure.
- **htmx boost.** Each address is a full page. With htmx, `hx-boost` swaps only the content and keeps the URL, the title and the Back button right. Without it, links are normal navigations.
- **Dark-master tokens, OS-aware scheme.** Colours are authored for dark first and paired with light values through `light-dark()`. With no saved choice the page follows the system. A theme is an override of the `--kubu-*` variables in `css/atoms/colors.css`.
- **44px targets.** Every control is at least 44 by 44 pixels and shows a `:focus-visible` ring. Colour is never the only signal: errors carry an icon and a sentence that says how to fix them.
- **CSS motion.** Transitions and animations use `transform` and `opacity` only, and stop for `prefers-reduced-motion`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [DEV_NOTES.md](DEV_NOTES.md).

## License

MIT. See [LICENSE.md](LICENSE.md).
