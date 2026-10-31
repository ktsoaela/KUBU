# Customization and themes

A theme is an override of the tokens in `kubu-framework/css/atoms/colors.css`. Components read only these tokens, so a change reaches every part.

## Dark is the master theme

Each colour is authored for dark first and paired with a light value. `light-dark()` picks one from the page's `color-scheme`.

```css
:root {
  color-scheme: light dark;   /* follow the system */
  --dark-primary: #2a77b5;
  --light-primary: #002d4c;
  --kubu-primary: light-dark(var(--light-primary), var(--dark-primary));
}
```

## The tokens

| Token | Use |
| --- | --- |
| `--kubu-bg`, `--kubu-surface`, `--kubu-surface-2` | Page, cards and fields, hover rows |
| `--kubu-text`, `--kubu-text-muted`, `--kubu-heading` | Body text, metadata, headings |
| `--kubu-border` | Lines and outlines |
| `--kubu-primary`, `--kubu-primary-hover`, `--kubu-on-primary` | Actions and the current item, and text on them |
| `--kubu-link` | Links and outline buttons |
| `--kubu-focus` | The focus ring |
| `--color-danger`, `--color-hazard`, `--color-safe`, `--color-info` | Status. Keep their meaning in both schemes |
| `--kubu-shadow-sm`, `-md`, `-lg`, `--kubu-overlay` | Depth, used quietly |
| `--kubu-target` | The smallest touch target, 44px |

## Override for a brand

```css
:root {
  --dark-primary: #b0652a;
  --light-primary: #7a3e10;
  --dark-link: #f0b46c;
  --light-link: #7a3e10;
}
```

Or scope a theme to one section:

```css
.theme-earth {
  --kubu-primary: light-dark(#7a3e10, #b0652a);
  --kubu-link: light-dark(#7a3e10, #f0b46c);
}
```

## Choosing the scheme

- Do nothing: the page follows the system.
- Render `<html data-theme="dark">` or `"light"` from a saved preference.
- Offer radio buttons with the ids `auto-mode`, `dark-mode` and `light-mode`. `utilities/Darkmode.css` reads them with `:has()`, so they work with scripts off.

```html
<fieldset class="theme-switch-list">
  <legend class="visually-hidden">Colour theme</legend>
  <input type="radio" name="theme" id="auto-mode" checked><label for="auto-mode">Auto</label>
  <input type="radio" name="theme" id="dark-mode"><label for="dark-mode">Dark</label>
  <input type="radio" name="theme" id="light-mode"><label for="light-mode">Light</label>
</fieldset>
```

## Rules

- Text needs 4.5:1 contrast and the focus ring 3:1, in both schemes.
- Keep the brand colour for actions and links.
- Never force dark on a visitor whose system is light.
