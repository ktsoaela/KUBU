# packages/js: the optional JavaScript layer

KUBU components are CSS and work without JavaScript. This package holds small ES modules for what HTML cannot do alone: building a component from data, autoplay for a carousel, opening an accordion panel from code, a live progress value. No component needs it to look right.

## Load it

```html
<!-- The framework: every component, themed for dark and light -->
<link rel="stylesheet" href="kubu-framework/dist/kubu.min.css">

<!-- Only if you use the JS components: their few extra styles -->
<link rel="stylesheet" href="kubu-framework/packages/js/css/main.css">

<!-- The JS entry: wires every [data-kubu] element on load and after each htmx swap -->
<script type="module" src="kubu-framework/packages/js/src/main.js"></script>
```

## Use it

Mark an element and let `main.js` set it up:

```html
<div class="carousel" data-kubu="carousel" data-autoplay tabindex="0" aria-label="Featured trips">
  <article class="carousel-item">…</article>
</div>
```

Or import a class and call it yourself:

```js
import { Modal } from './kubu-framework/packages/js/src/main.js';
const modal = new Modal('#confirm');
modal.open();
```

## Files

```text
packages/js/
├── index.html          # demo of every JS component
├── css/main.css        # _atoms, _molecules, _organisms, _helpers: styles the JS components add
├── docs/               # these guides
└── src/
    ├── main.js         # exports every class, and autoInit() for [data-kubu]
    ├── atoms/          # Badge, Button, CloseButton, Placeholder, Spinner, Tooltip
    ├── molecules/      # Alert, Breadcrumb, ButtonGroup, ListGroup, Pagination, ProgressBar, ToggleButton
    └── organisms/      # Accordion, Card, Carousel, Modal, Navbar
```

## Guides

1. [Getting started](docs/getting-started.md)
2. [Customization and themes](docs/customization.md)
3. [Layout](docs/layout.md)
4. [Content](docs/content.md)
5. [Forms](docs/forms.md)
6. [Components](docs/components.md)
7. [Helpers](docs/helpers.md)
8. [Utilities and htmx](docs/utils.md)
9. [JavaScript API](docs/javascript.md)
10. [Server templates and htmx](docs/frontend-integration.md)
