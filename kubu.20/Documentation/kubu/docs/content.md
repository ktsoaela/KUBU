# Content

## Type scale

Scan first, then read: muted metadata, body text, then the title.

```html
<h1 class="title">Orders</h1>
<p>Body text, 16px with a 1.75 line height.</p>
<p><small>Updated 31 October 2026</small></p>
```

Tokens: `--font-size-xs` (0.75rem) to `--font-size-xxxl` (3.25rem), `--font-family-sans`, `--font-family-serif`, `--font-family-mono`. One `h1` per page, headings in order.

## Lists

```html
<ul class="list-unstyled">…</ul>
<ul class="list-inline"><li>Atoms</li><li>Molecules</li></ul>
<dl class="description-list">
  <dt class="description-term">Block</dt><dd class="description-definition">A standalone component.</dd>
</dl>
```

## Cards

A card is composed from its parts; use the ones you need.

```html
<article class="card">
  <img class="card__image" src="tour.jpg" alt="The dam wall at sunrise">
  <header class="card__header"><h2 class="card__title">Katse Dam tour</h2></header>
  <div class="card__body"><p>A day trip with a guide and lunch.</p></div>
  <footer class="card__footer"><a class="button button--primary" href="/tours/katse">Book a seat</a></footer>
</article>
```

## Tables

```html
<div class="table-container">
  <table class="table">
    <caption class="table__caption">Orders this week</caption>
    <thead class="table__header"><tr><th class="table__header-cell" scope="col">Order</th><th class="table__header-cell table__cell--align-right" scope="col">Total</th></tr></thead>
    <tbody><tr class="table__row table__row--hoverable"><td class="table__cell">1042</td><td class="table__cell table__cell--align-right">R 4 300.00</td></tr></tbody>
  </table>
</div>
```

## Badges

```html
<span class="badge badge--safe">Paid</span>
<span class="badge badge--danger">Overdue</span>
```

Write the status as a word. Colour supports it; it never carries it alone.

## Icons

```html
<svg class="icon" aria-hidden="true"><use href="kubu-framework/img/icons.svg#download"></use></svg>
```

Icons sit beside a word. Only a standard close control may be icon-only, and it needs `aria-label`.
