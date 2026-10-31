# Layout

## Container

`.container` centres the content, at most 1200px wide, with fluid side padding.

## Grid

`.grid` has twelve columns. Children span all twelve until they get a `.col-*` class; `sm:`, `md:` and `lg:` apply from 640, 768 and 1024 pixels up.

```html
<div class="grid">
  <article class="col-12 md:col-8">Article</article>
  <aside class="col-12 md:col-4" aria-label="Related">Aside</aside>
</div>
```

`.grid--auto` fits as many columns of at least 16rem as the space allows:

```html
<ul class="grid grid--auto list-unstyled">
  <li class="card">…</li>
  <li class="card">…</li>
</ul>
```

## Page layout with sidebars

From `utilities/Flexbox.css`:

```html
<div class="page-layout">
  <aside class="sidebar left-sidebar" aria-label="Sections">…</aside>
  <div class="main-content">…</div>
  <aside class="sidebar right-sidebar" aria-label="Related">…</aside>
</div>
```

`body` is a full-height flex column, so a `.footer` stays at the bottom of short pages.

## Spacing

Use the `--space-*` scale for gaps and padding: `--space-xs` 4px, `--space-sm` 8px, `--space-md` 16px, `--space-lg` 32px, `--space-xl` 64px. Prefer `gap` on the parent over margins on each child.

## Full page

`kubu-framework/templates/main-template.html` puts the header snippet, a breadcrumb, sidebars, the content and the footer together.
