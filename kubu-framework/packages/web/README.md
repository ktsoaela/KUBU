# packages/web: a starter site

Three HTML pages, one stylesheet and, optionally, htmx. No build step and no UI library.

```text
packages/web/
├── index.html     # hero and cards
├── about.html     # list group and a <details> disclosure
└── contact.html   # form with forgiving validation
```

Open `index.html` through a local server (`npm run dev` in `kubu-framework`, then go to `/kubu-framework/packages/web/index.html`).

## How it works

- Every page links `dist/kubu.min.css`. That is the whole framework.
- `<body hx-boost="true" hx-target="#content" hx-select="#content" …>` makes each link fetch the next page and swap only `<main id="content">`. The header stays, the URL and title update, and Back works.
- `hx-select-oob="#site-nav"` swaps the header menu too, so `aria-current="page"` moves to the right link.
- With JavaScript off, the same links load the whole page. The menu is a checkbox, the disclosure is `<details>`, and the form checks itself with `:user-invalid`.

## Make it yours

1. Copy the folder and `kubu.min.css` (and `htmx.min.js` if you want the swaps) into your project.
2. Change the `href` of the stylesheet and the script to where you put them.
3. Rename the pages, replace the text, and add a link to `#site-nav` for each new page.
4. On a server, render the same HTML from your templates. Each route returns a whole page; htmx picks out `#content`.
