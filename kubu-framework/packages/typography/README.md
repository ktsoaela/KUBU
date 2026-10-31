# kubu-typography

KUBU's colours, spacing, type scale and reset, without any components. Use it for a page that wants KUBU's look for text and tokens and nothing else.

It is not a second design system: `typography.css` imports the same four files that `kubu.min.css` starts with, from `css/atoms/`.

| File | What it gives you |
| --- | --- |
| `colors.css` | The `--kubu-*` tokens, dark first, paired with light through `light-dark()` |
| `spacing.css` | The `--space-*` scale |
| `typography.css` | Font families and the type scale from metadata to the page title |
| `Reset.css` | Page colours, the focus ring and reduced motion |

## Use it

```html
<link rel="stylesheet" href="dist/typography.min.css">
```

`npm run build` here writes `dist/typography.css` and `dist/typography.min.css`. Publishing runs the build first.

Need components later? Swap this file for `kubu.min.css`. Nothing else changes.
