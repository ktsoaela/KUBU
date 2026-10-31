# kubu-web

A Vue front end for KUBU. It uses the framework exactly as a project would: one stylesheet, the same BEM class names, the same pages and wording as the docs site.

- CSS: `src/main.js` imports `../../../kubu-framework/dist/kubu.css`. There is no second copy of the CSS in this app; rebuild the framework (`node scripts/build.mjs` in `kubu-framework`) and this app picks it up.
- Download: the webpack config copies `kubu-framework/dist/` and `kubu-framework/img/icons.svg` to `static/kubu/`, so the Download page links the built files.
- Navigation: the same seven header links as the docs (`src/site.js`). The router uses history mode, so the server must send `index.html` for unknown paths.
- Component pages link to the static docs in `kubu-framework/pages/`. Set `docsBase` in `src/site.js` to where those are served.

## Run

```bash
npm install
npm run dev     # http://localhost:8080
npm run build   # dist/
```

Run the docs site from `kubu-framework` on another port if you want the component links to work locally, or change `docsBase`.
