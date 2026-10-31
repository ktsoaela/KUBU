# Components

Each component is a BEM block built from named parts. All of these work with HTML and CSS alone. The docs site (`kubu-framework/pages/`) has a live example and the parts list for each.

## Buttons

```html
<button class="button button--primary" type="button">Save changes</button>
<button class="button button--outline" type="button">Preview</button>
<button class="button button--primary" type="button" disabled>Publish</button>
<button class="button button--primary" type="button" aria-busy="true" aria-disabled="true">Saving</button>
<a class="button button--secondary button--large" href="/trial">Start trial</a>
```

Modifiers: `--primary`, `--secondary`, `--outline`, `--plain`, `--dark`; tones `--danger`, `--safe`, `--hazard`, `--risk`, `--info`; sizes `--small`, `--large`, `--xlarge`. Every button is at least 44px; `aria-busy="true"` shows the loading ring.

## Button group

```html
<div class="button-group" role="group" aria-label="Invoice actions">
  <button class="button button--outline" type="button">Edit</button>
  <button class="button button--outline" type="button">Duplicate</button>
</div>
```

## Dropdown

```html
<details class="dropdown">
  <summary class="button button--primary">Account menu</summary>
  <ul class="dropdown-content">
    <li><a class="dropdown-item" href="/profile">Profile</a></li>
  </ul>
</details>
```

## Modal

```html
<button class="button button--danger" commandfor="confirm" command="show-modal">Delete file</button>
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
```

## Tabs

```html
<div class="tabs" role="group" aria-label="Product information">
  <input class="tabs__input" type="radio" name="product" id="t-desc" checked>
  <label class="tabs__tab" for="t-desc">Description</label>
  <div class="tabs__panel">…</div>
  <input class="tabs__input" type="radio" name="product" id="t-size">
  <label class="tabs__tab" for="t-size">Size</label>
  <div class="tabs__panel">…</div>
</div>
```

## Accordion and collapse

```html
<section class="accordion" aria-label="Questions">
  <div class="tab">
    <input type="checkbox" id="q1">
    <label class="tab__label" for="q1">How long does delivery take?</label>
    <div class="tab__content"><p>Two to four working days.</p></div>
  </div>
</section>

<details class="collapse-details">
  <summary>Show the delivery options</summary>
  <p>…</p>
</details>
```

`.accordion--radio` with radio inputs opens one panel at a time.

## Alerts

```html
<div class="alert alert--danger" role="alert"><p>We could not save the invoice. Check your connection and try again.</p></div>
<details class="alert alert--info" open>
  <summary class="alert-close" aria-label="Dismiss message">&times;</summary>
  <p>New: export invoices as CSV.</p>
</details>
```

Tones: `--success`, `--info`, `--warning`, `--danger`, each with its own icon.

## Offcanvas

```html
<a class="button button--primary" id="filters-open" href="#filters">Open filters</a>
<aside class="offcanvas" id="filters" aria-label="Filters">
  <a class="close-btn" href="#filters-open" aria-label="Close filters">&times;</a>
  <div class="content">…</div>
</aside>
<a class="offcanvas-overlay" href="#filters-open" tabindex="-1" aria-hidden="true"></a>
```

## Popover and tooltip

```html
<button class="button button--outline" popovertarget="shipping">Shipping costs</button>
<div class="popover-native" id="shipping" popover>…</div>

<span class="tooltip">
  <button class="button button--outline" aria-describedby="vat">Price incl. VAT</button>
  <span class="tooltiptext" id="vat" role="tooltip">VAT is 15%.</span>
</span>
```

## Carousel

```html
<section class="carousel" tabindex="0" aria-label="Featured trips, scroll sideways">
  <article class="carousel-item" id="slide-1">…</article>
  <article class="carousel-item" id="slide-2">…</article>
</section>
```

## Navigation

```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb__item"><a class="breadcrumb__link" href="/">Home</a></li>
    <li class="breadcrumb__item breadcrumb__item--active" aria-current="page">Orders</li>
  </ol>
</nav>

<nav class="nav nav--tabs" aria-label="Account">
  <a class="nav__link" href="/account" aria-current="page">Profile</a>
  <a class="nav__link" href="/account/billing">Billing</a>
</nav>

<nav aria-label="Orders, pages">
  <ul class="pagination">
    <li class="pagination__item"><a class="pagination__link" href="?page=2" aria-current="page">2</a></li>
  </ul>
</nav>
```

## Toasts

```html
<div class="toast-container" id="toasts" role="status">
  <div class="toast toast-success"><p class="toast__body">Invoice sent.</p></div>
</div>
```

Add one from any htmx response with `<div id="toasts" hx-swap-oob="beforeend">…</div>`.

## Progress, stepper and rating

```html
<div class="progress" role="progressbar" aria-label="Upload" aria-valuemin="0" aria-valuemax="100" aria-valuenow="75">
  <div class="progress-bar progress-bar-75"></div>
</div>

<ol class="stepper list-unstyled" aria-label="Checkout progress">
  <li class="stepper__step active" aria-current="step"><span class="stepper__number">1</span><span class="stepper__label">Cart</span></li>
</ol>

<fieldset class="rating">
  <legend class="visually-hidden">Rate this</legend>
  <input type="radio" name="r" id="r1" value="1"><label for="r1"><span class="visually-hidden">1 star</span></label>
</fieldset>
```

## Accessibility, everywhere

- Real elements: `button`, `a`, `dialog`, `details`, `nav`, `table`.
- Every control has a visible text name and is at least 44 by 44 pixels.
- `:focus-visible` rings come from `Reset.css`; never remove them without a replacement.
- Colour is never the only signal.
