# Helpers

Small classes from `kubu-framework/css/utilities/Helpers.css` and `css/atoms/spacing.css`.

## Screen-reader text

```html
<a href="/orders/1042">View order<span class="visually-hidden"> 1042</span></a>
<a class="visually-hidden visually-hidden--focusable" href="#main">Skip to content</a>
```

## Accent borders and dividers

```html
<p class="border_left">A callout with a left accent.</p>
<hr class="border-hr">
<section class="section">Even space above and below.</section>
```

`.border_left`, `.border_right`, `.border_top` and `.border_bottom` draw a 6px accent on one side.

## Spacing helpers

`.m-0` to `.m-6`, `.mt-*`, `.mr-*`, `.mb-*`, `.ml-*`, `.mx-*`, `.my-*` for margin, and the same with `p` for padding, in 5px steps. They override component spacing, so prefer `gap` on a parent and use these sparingly.

## Demo boxes

`.demo_product` (a tinted box) and `.demo_code` (a dark code panel) are used by the docs to frame examples.
