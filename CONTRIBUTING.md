# Contributing to KUBU

Thank you for helping. Bug reports, ideas and pull requests are all welcome on GitHub.

## Set up

```bash
git clone https://github.com/ktsoaela/KUBU.git
cd KUBU/kubu-framework
npm install
npm run dev
```

`npm run dev` serves the repository and opens the docs at `http://localhost:8080/kubu-framework/pages/index.html`.

## Change a component

1. Edit its file in `kubu-framework/css/` (an atom, molecule, organism, utility or snippet). Keep BEM names: `.block`, `.block__element`, `.block--modifier`.
2. Read colours only from the `--kubu-*` tokens in `css/atoms/colors.css`, so dark and light both follow.
3. Keep it working without JavaScript. Use `<details>`, `<dialog>`, `popover`, `:target`, radio buttons or checkboxes.
4. Make every control at least 44 by 44 pixels, keep the `:focus-visible` ring, and pair any status colour with an icon and text.
5. Animate only `transform` and `opacity`.

## Change a docs page

1. Edit the `<main>` of the page in `kubu-framework/pages/`. For a new page, add it to `scripts/site.mjs` and create the file with just its `<main class="doc" id="main" tabindex="-1">`.
2. For an example, write the live markup in `<div class="doc-example__preview">` and leave `<details class="doc-code"></details>` empty after it.
3. Run `node scripts/pages.mjs`. It writes the header, sidebar, footer and the code sample into the page.

## Before you open a pull request

```bash
cd kubu-framework
node scripts/pages.mjs --check   # stamps pages, checks links and markup
node scripts/smoke.mjs           # needs Chrome or Edge
node scripts/build.mjs           # rebuilds dist/kubu.css and dist/kubu.min.css
```

Commit the rebuilt `dist/` files with your change.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/): an imperative subject, a lowercase type, an optional scope, no full stop.

```text
feat(pages): add the stepper page
fix(css): pair form errors with an icon and text
docs: align markdown with BEM class names
```

Keep unrelated changes in separate commits.

## Code of conduct

Be kind and assume good intent. Harassment of any kind is not tolerated.
