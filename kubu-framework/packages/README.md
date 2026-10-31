# packages

Each folder has one job. None is needed for a component to look right: `dist/kubu.min.css` alone is the framework.

| Folder | Job | npm name |
| --- | --- | --- |
| `web/` | A starter site: three pages, one stylesheet, htmx navigation | ships inside `kubu-css` |
| `typography/` | Colours, spacing, type and the reset, no components | `kubu-typography` |
| `icons/` | The `.icon` classes and the SVG sprite | `kubu-icons` |
| `plugin/` | htmx patterns: out-of-band toasts, one listener on a parent | ships inside `kubu-css` |
| `js/` | Optional ES modules for what HTML cannot do alone | ships inside `kubu-css` |

The slices import from `../../css`, so there is one copy of every rule. Their `npm run build` bundles that into their own `dist/`, which git ignores.
