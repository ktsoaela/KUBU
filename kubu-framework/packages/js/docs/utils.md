# Utilities and htmx

## htmx states (`utilities/Ajax.css`)

htmx adds classes while a request runs; KUBU styles them, so feedback shows before the reply.

| Class | Added by | Effect |
| --- | --- | --- |
| `.htmx-indicator` | you | Hidden until a request runs |
| `.htmx-request` | htmx | Shows the indicator; a button gets the progress cursor |
| `.htmx-swapping` | htmx | Fades the old content out over 150ms |
| `.skeleton`, `.skeleton__line`, `.skeleton__line--short`, `.skeleton__block` | you | Placeholders for a region that waits |
| `.ajax-progress` | you | A thin moving bar |
| `.ajax-success`, `.ajax-error` | you or the server | A tinted result message |

```html
<button class="button button--outline" hx-get="/orders/latest" hx-target="#orders" hx-indicator="#orders-skeleton">Load the latest orders</button>
<div class="skeleton htmx-indicator" id="orders-skeleton" aria-hidden="true">
  <span class="skeleton__line"></span>
  <span class="skeleton__line skeleton__line--short"></span>
</div>
<div id="orders" aria-live="polite">…</div>
```

Use skeletons for regions, not a full-page spinner.

## Event delegation with htmx

Set behaviour once on a parent. `hx-*` attributes are inherited and htmx events bubble:

```html
<ul class="list-group list-group--panel" hx-target="closest li" hx-swap="outerHTML"
    hx-on::after-request="document.getElementById('status').textContent = 'Order archived.'">
  <li><form class="list-group-item" action="/orders/1043/archive" method="post" hx-post="/orders/1043/archive">
    Order 1043 <button class="button button--plain button--small">Archive order 1043</button>
  </form></li>
</ul>
<p id="status" role="status"></p>
```

## A site as one htmx app

Every URL is a full page; `hx-boost` swaps only the content:

```html
<body hx-boost="true" hx-target="#frame" hx-select="#frame" hx-swap="outerHTML" hx-push-url="true">
```

See `kubu-framework/pages/start-javascript.html` for the full setup, including the `<title>` and the current-page highlight.

## Motion (`utilities/Animations.css`)

`.fade-in`, `.slide-in-left`, `.slide-in-right` use only `transform` and `opacity`, and stop with `prefers-reduced-motion`.

## Notifications (`utilities/Notifications.css`)

```html
<div class="notification success" role="status">Settings saved.</div>
<div class="notification error" role="alert">The file is too large. Choose one under 5 MB.</div>
```
