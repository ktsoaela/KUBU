# JavaScript API

KUBU 2.0 is optional. Every class below enhances markup that already works without it.

## Load

```html
<link rel="stylesheet" href="kubu-framework/dist/kubu.css">
<script type="module" src="kubu.20/Documentation/kubu/src/js/main.js"></script>
```

`main.js` runs `autoInit()` on load and after every htmx swap (`htmx:afterSettle`). It sets up each element with a `data-kubu` value it knows, once.

| `data-kubu` | Class | Extra attributes |
| --- | --- | --- |
| `modal` | `Modal` | Openers: `data-kubu-open="#id"`; closers inside: `data-kubu-close` |
| `carousel` | `Carousel` | `data-autoplay` (skipped with reduced motion) |
| `navbar` | `Navbar` | A `.navbar__toggle` button with `aria-controls` |
| `accordion` | `Accordion` | none |
| `progress` | `ProgressBar` | `data-value` |
| `tooltip` | `Tooltip` | `data-tooltip`, `data-position`; needs an `id` |

## Organisms

```js
import { Accordion, Card, Carousel, Modal, Navbar } from './main.js';

new Modal('#confirm', { closeOnBackdrop: true, onClose: (value) => console.log(value) }).open();
new Accordion('#faq').open(1);                     // also close(i), toggle(i), closeAll()
new Carousel('#featured', { autoplay: true, interval: 5000 }).go(2);
new Card('#invoice', { title: 'Invoice 1042', text: 'R 4 300.00', image: 'paid.svg', imageAlt: '' });
new Navbar('.navbar');
```

`Modal` wraps a native `<dialog class="modal">`: the browser keeps focus inside, closes on Esc and draws the backdrop. `Card` renders `.card__image`, `.card__header`, `.card__title`, `.card__body` and `.card__footer` and escapes the text it is given.

## Molecules

```js
import { Alert, BreadCrumb, ButtonGroup, ListGroup, Pagination, ProgressBar, ToggleButton } from './main.js';

new Alert('#notice', { message: 'Your changes were saved.', type: 'success', dismissible: true });
const crumbs = new BreadCrumb('#crumbs');
crumbs.addItem('Home', '/');
crumbs.addItem('Orders', '/orders');

const pager = new Pagination('#pages', { totalPages: 5, currentPage: 1 });
document.querySelector('#pages').addEventListener('kubu:page', (e) => console.log(e.detail.page));

new ProgressBar('#upload', { value: 40, max: 100, label: 'Upload' }).setValue(75);
new ButtonGroup('#views');      // one .active button at a time
new ListGroup('#mailbox');      // one .active row at a time
new ToggleButton('#mute', { activeClass: 'active' });
```

`Alert` renders `.alert alert--success` (or `--info`, `--warning`, `--danger` for `type: 'error'`), with its icon. `Pagination` renders `.pagination__link` buttons and fires `kubu:page`.

## Atoms

```js
import { Badge, Button, CloseButton, Placeholder, Spinner, Tooltip } from './main.js';

new Button('#save', { text: 'Save changes', variant: 'primary', size: 'large', onClick: save });
new Badge('#status', { text: 'Paid', variant: 'safe' });
new CloseButton('#dismiss', { target: '#notice' });
new Spinner('#loading', { size: 'small' });
new Placeholder('#name', { type: 'animation', width: '160px', height: '1rem' });
new Tooltip('#vat', { message: 'VAT is 15%', position: 'top' });
```

Classes map to the CSS: `Button` adds `.button`, `.button--{variant}` and `.button--{size}`; `Badge` adds `.badge--{variant}`.

## Rules for new components

- Enhance working HTML; never be the only way to use a control.
- Keep focus visible and keyboard behaviour native.
- Respect `prefers-reduced-motion`.
- Re-run setup after htmx swaps by registering in `main.js`.
