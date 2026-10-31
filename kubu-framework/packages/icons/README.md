# kubu-icons

The line icons from the KUBU [Icon Pack](../../pages/icons.html): one SVG sprite and the `.icon` classes. Icons draw with `currentColor`, so they follow the text colour and the theme.

```html
<link rel="stylesheet" href="dist/icons.min.css">

<svg class="icon" aria-hidden="true"><use href="dist/icons.svg#download"></use></svg>
```

- Sizes: `.icon--sm`, `.icon--lg`, `.icon--xl`.
- Keep the icon `aria-hidden`. An icon-only control needs its own `aria-label`.

`icons.css` imports `css/atoms/Icons.css`, and the sprite is `img/icons.svg`, the same files the docs use. `npm run build` here writes `dist/icons.css`, `dist/icons.min.css` and copies the sprite to `dist/icons.svg`. Publishing runs the build first.
