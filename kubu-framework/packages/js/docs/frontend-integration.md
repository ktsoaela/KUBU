# Server templates and htmx

KUBU is class names on HTML. It does not ship components for a UI library, and it does not need one: the HTML can come from a server template, a static file or an htmx response, and it looks the same.

## Templates

Write the BEM classes in your templates and link `dist/kubu.min.css` once in the layout. Compose the parts you need; there are no props or options.

```html
<!-- Jinja, Django or any template language -->
<article class="card">
  <header class="card__header">
    <h2 class="card__title">{{ order.title }}</h2>
    <span class="badge {% if order.paid %}badge--safe{% else %}badge--hazard{% endif %}">{% if order.paid %}Paid{% else %}Pending{% endif %}</span>
  </header>
  <div class="card__body"><p>{{ order.total }}</p></div>
  <footer class="card__footer"><a class="button button--primary" href="/orders/{{ order.id }}">View order</a></footer>
</article>
```

Keep native elements: `<dialog class="modal">` with a `commandfor` button, `<details class="dropdown">` for menus, radio buttons for tabs.

## htmx

Every page is an endpoint that returns a whole HTML page. Put `hx-boost` on `<body>` and htmx swaps only the region you name, keeps the URL right, and falls back to a normal link with scripts off. Fragments for in-page updates use the same classes; `utilities/Ajax.css` styles the loading and swap states.

```html
<body hx-boost="true" hx-target="#content" hx-select="#content" hx-swap="outerHTML" hx-push-url="true">
```

The starter in `packages/web` is a working copy of this.

## The JS layer with htmx

The modules in `src/` are plain ES modules. `main.js` sets up every `[data-kubu]` element on load and again after each swap (`htmx:afterSettle`), so markup that htmx brings in is wired up without extra code.

```js
import { Carousel } from './kubu-framework/packages/js/src/main.js';
new Carousel('#featured', { autoplay: false });
```

Reach for a module only when the component already works as KUBU markup and you need something HTML cannot do alone.
