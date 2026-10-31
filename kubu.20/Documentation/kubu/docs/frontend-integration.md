# Front-end frameworks

KUBU is class names on HTML, so it works the same whether the HTML comes from a server template, htmx, or a component framework.

## Server templates and htmx (the main path)

Write the BEM classes in your templates and link `dist/kubu.css`. With htmx, return fragments that use the same classes; `utilities/Ajax.css` styles the loading and swap states.

## Vue, React, Svelte or Angular

- Import the CSS once at the root: `import 'kubu/dist/kubu.css'` (copy the file into your project first).
- Use the same class names in your components. Do not wrap them in a prop API: compose the parts in the template.
- Keep native elements: render `<dialog class="modal">` and call `showModal()` on a ref, render `<details class="dropdown">` for menus.
- Let the framework manage state, and KUBU the look.

Vue example, matching `kubu-web/frontend`:

```vue
<template>
  <article class="card">
    <header class="card__header">
      <h2 class="card__title">{{ order.title }}</h2>
      <span class="badge" :class="order.paid ? 'badge--safe' : 'badge--hazard'">{{ order.paid ? 'Paid' : 'Pending' }}</span>
    </header>
    <div class="card__body"><p>{{ order.total }}</p></div>
    <footer class="card__footer"><a class="button button--primary" :href="`/orders/${order.id}`">View order</a></footer>
  </article>
</template>
```

## The KUBU 2.0 classes

They are plain ES modules. In a framework, call them from a mounted hook on an element ref, and let the framework own the DOM they do not touch:

```js
import { Carousel } from 'kubu.20/Documentation/kubu/src/js/main.js';
onMounted(() => new Carousel(carouselRef.value, { autoplay: false }));
```

Prefer the framework's own state for anything that changes often; reach for KUBU 2.0 when a component already exists as KUBU markup.
