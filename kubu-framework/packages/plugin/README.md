# packages/plugin: htmx patterns

No script and no CSS file. These are patterns for your HTML and your server's responses, built from htmx attributes and KUBU classes. They are the patterns the docs already run on [EventDelegation](../../pages/utility-event-delegation.html) and [Toasts](../../pages/organism-toasts.html).

## Toasts out of band

Put one empty container in the layout:

```html
<div class="toast-container" id="toasts" role="status"></div>
```

Any response can then add a toast with `hx-swap-oob="beforeend"`, whatever else it swaps. See `fragments/toast.html`.

```html
<button class="button button--primary" hx-post="/drafts" hx-swap="none">Save draft</button>
```

Without htmx, make the button part of a form that saves and returns the page with the toast already in it.

## One listener on a parent

Set the target, the swap and any handler once on the parent. `hx-*` attributes are inherited and htmx events bubble, so every row, including rows added later, uses them.

```html
<ul class="list-group list-group--panel"
    hx-target="closest li" hx-swap="outerHTML"
    hx-on::after-request="document.getElementById('status').textContent = 'Order archived.'">
  <li><form class="list-group-item" action="/orders" method="post" hx-post="/orders/1043/archive">
    Order 1043 <button class="button button--plain button--small">Archive order 1043</button>
  </form></li>
</ul>
<p id="status" role="status"></p>
```

The server returns one row, like `fragments/row-archived.html`. Without htmx each row is a normal form post.

## Boosted pages

The site-wide version of the same idea: `<body>` sets `hx-boost`, `hx-target` and `hx-select` once for every link. `packages/web` is a working example.
