# Acme Corp: an enterprise demo of KUBU

A working back-office application built on `dist/kubu.min.css`. It covers accounts, invoicing, a team with roles and permissions, an audit trail, settings and search. It exists to show what sets KUBU apart, inside a real app rather than on a slide.

```bash
cd kubu-framework
npm run demo            # or: node demo/server.mjs
# open http://localhost:3000   (PORT=4000 npm run demo to change the port)
```

Node 20 or later. No dependencies and no build step. The data lives in memory, is seeded the same way on every start, and is dated from today.

## What it shows

| Differentiator | Where to see it |
| --- | --- |
| Components need no JavaScript | Dialogs (`<dialog>` + `commandfor`), menus (`<details>`), tabs (radios), the invite panel (`:target` offcanvas), switches, chips, toasts |
| The whole app works with JavaScript off | **Run without JavaScript** in the sidebar. The server stops sending every `<script>` and each screen still works |
| htmx is an enhancement, not a dependency | Live search, swap-on-change role select, a polled status panel. All of it uses the same routes as the no-JS version |
| Server-rendered and backend-agnostic | Every screen is a whole HTML page from a route. POST then redirect. Validation and permissions live on the server |
| Dark-first tokens | Theme buttons in the top bar. The server writes `data-theme`, so the wrong theme never flashes. The charcoal-and-amber look is one block of token overrides at the top of `app.css` |
| Small and measured | **Compare frameworks** reads and gzips the real files on each request, and counts the classes in the code samples |
| Accessible by default | 44px targets, an error summary that links to each field, `aria-invalid`, `aria-sort`, `aria-current`, a skip link, and status shown in words as well as colour |
| Readable BEM markup | Open **How this screen is built** at the foot of any screen |

Things to try: sign in as the **Viewer** desk (Settings, then Sign in as) and watch the edit actions disappear. Submit an empty **New account** form. Build an invoice in three steps with JavaScript off. Export the filtered accounts as CSV. The records use role names and `@acme.example` addresses. They are sample data, not people.

## Files

```text
demo/
├── server.mjs          # node:http server and the route table
├── lib/
│   ├── html.mjs        # an escaping html`` template, plus formatting helpers
│   ├── http.mjs        # cookies, form bodies, redirects, flash messages
│   ├── db.mjs          # seeded in-memory data, permissions and the audit log
│   └── layout.mjs      # the app shell, page head, pagination and form fields
├── views/              # one module per area: dashboard, accounts, invoices, team, workspace, why
└── public/
    ├── app.css         # a theme (KUBU token overrides only), the shell, and app-specific blocks
    └── app.js          # optional: moves focus to <main> after an htmx swap
```

The server only serves `dist/`, `js/` and `img/` from the framework. That way the demo runs against the published build, not the source files.

## Reusing it as a template

Each view returns `{ title, body, built, status }`, and `layout()` wraps it. To start a new screen, copy a view, add a route, and add a link to `nav` in `lib/layout.mjs`. To move to Django, Rails, Laravel or Go, port the templates as they are. The markup only needs `kubu.min.css`.
