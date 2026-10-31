# kubu-framework

The KUBU CSS, organised by Atomic Design and named with BEM.

## Atomic Design: where a file goes

Brad Frost's Atomic Design sorts interface parts by size. KUBU uses it for its folders:

| Folder | What lives there | Examples |
| --- | --- | --- |
| `css/atoms/` | The smallest parts and the base: tokens, type, spacing, reset | `colors.css`, `typography.css`, `Buttons.css`, `Badge.css` |
| `css/molecules/` | A few atoms working as one unit | `FormGroups.css`, `Dropdowns.css`, `Navbar.css`, `Pagination.css` |
| `css/organisms/` | A section of an interface | `Modal.css`, `Card.css`, `Tabs.css`, `Forms.css`, `Tables.css` |
| `css/utilities/` | Helpers that cut across sizes | `Ajax.css` (htmx states), `Grid.css`, `Darkmode.css`, `Helpers.css` |
| `css/snippets/` | Shared site pieces | `Header.css`, `Footer.css`, `Forms.css` (bare elements) |
| `templates/` | HTML layouts and server fragments | `main-template.html`, `breadcrumb-template.html` |
| `pages/` | The docs site, including the example pages | `index.html`, `page-contact.html` |

`styles.css` imports every file in order; `dist/kubu.css` is the bundled build.

## BEM: how a class is named

- **Block**: a standalone component. `.card`, `.modal`, `.tabs`.
- **Element**: a part of a block, joined with two underscores. `.card__title`, `.modal__footer`, `.tabs__panel`.
- **Modifier**: a variation, joined with two hyphens. `.button--primary`, `.alert--danger`, `.nav--pills`.

The names match the DOM, so a component is composed from its parts:

```html
<dialog class="modal" id="confirm" aria-labelledby="confirm-title">
  <header class="modal__header">
    <h2 class="modal__title" id="confirm-title">Delete this file?</h2>
    <form method="dialog"><button class="modal__close" aria-label="Close">&times;</button></form>
  </header>
  <div class="modal__body"><p>This cannot be undone.</p></div>
  <form class="modal__footer" method="dialog">
    <button class="button button--outline" value="cancel">Keep file</button>
    <button class="button button--danger" value="delete">Delete file</button>
  </form>
</dialog>
<button class="button button--danger" commandfor="confirm" command="show-modal">Delete file</button>
```

## Load it

- Everything: `dist/kubu.min.css`, or `styles.css` while developing.
- Only what a page uses: the four base files (`atoms/colors.css`, `atoms/spacing.css`, `atoms/typography.css`, `atoms/Reset.css`) and the component files. See `templates/selective-import.html` and `pages/download.html`.

## Scripts

```bash
npm install
npm run build    # node scripts/build.mjs: dist/kubu.css and dist/kubu.min.css
npm run pages    # node scripts/pages.mjs --check: stamp and check the docs pages
npm run smoke    # node scripts/smoke.mjs: browser smoke test (Chrome or Edge)
npm run dev      # serve the docs at http://localhost:8080
```
