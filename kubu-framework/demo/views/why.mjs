import { readFileSync, readdirSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { html, raw, icon } from '../lib/html.mjs';
import { pageHead } from '../lib/layout.mjs';

const root = path.resolve(import.meta.dirname, '..', '..');

function measure(file) {
    try {
        const bytes = readFileSync(path.join(root, file));
        return { raw: bytes.length, gzip: gzipSync(bytes, { level: 9 }).length };
    } catch {
        return { raw: 0, gzip: 0 };
    }
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

function componentCount() {
    let n = 0;
    for (const dir of ['atoms', 'molecules', 'organisms']) n += readdirSync(path.join(root, 'css', dir)).filter((f) => f.endsWith('.css')).length;
    return n;
}

const classCount = (code) => [...code.matchAll(/class="([^"]*)"/g)].reduce((n, [, c]) => n + c.trim().split(/\s+/).length, 0);
const attrCount = (code, re) => (code.match(re) || []).length;

// The same confirmation dialog, written three ways, each in the style its project documents;
// the counts beside them are computed from the text, not typed in.
const samples = {
    kubu: `<button class="button button--danger" commandfor="confirm" command="show-modal">Delete file</button>
<dialog class="modal" id="confirm" aria-labelledby="confirm-title">
  <header class="modal__header">
    <h2 class="modal__title" id="confirm-title">Delete this file?</h2>
    <form method="dialog"><button class="modal__close" aria-label="Close">&times;</button></form>
  </header>
  <div class="modal__body"><p>This cannot be undone.</p></div>
  <form class="modal__footer" method="dialog">
    <button class="button button--outline">Keep file</button>
    <button class="button button--danger" value="delete">Delete file</button>
  </form>
</dialog>`,
    bootstrap: `<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirm">Delete file</button>
<div class="modal fade" id="confirm" tabindex="-1" aria-labelledby="confirm-title" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="confirm-title">Delete this file?</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">This cannot be undone.</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Keep file</button>
        <button type="button" class="btn btn-danger">Delete file</button>
      </div>
    </div>
  </div>
</div>
<script src="bootstrap.bundle.min.js"></script>`,
    tailwind: `<button class="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Delete file</button>
<!-- Opening, closing, focus and Escape are yours to write,
     or come from a separate library such as Headless UI (React or Vue). -->
<div class="relative z-10" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
  <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-base font-semibold text-gray-900" id="confirm-title">Delete this file?</h3>
          <p class="mt-2 text-sm text-gray-500">This cannot be undone.</p>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete file</button>
          <button class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Keep file</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
};

const matrix = [
    ['Modal, menus, tabs and accordion work with JavaScript turned off', ['yes', 'Native <dialog>, <details>, popover and radio buttons'], ['no', 'Needs bootstrap.bundle.js'], ['no', 'No components; you write the behaviour'], ['no', 'React renders every component']],
    ['No build step to start', ['yes', 'Link one CSS file'], ['yes', 'Link the CDN files'], ['no', 'A compiler scans your templates for classes'], ['no', 'A React app and a bundler']],
    ['Ready-made components', ['yes', `${componentCount()} atoms, molecules and organisms`], ['yes', 'Large set'], ['part', 'Utilities only; component kits are separate'], ['yes', 'Large set']],
    ['Dark and light from one set of tokens, following the OS', ['yes', 'light-dark() tokens; one attribute overrides'], ['yes', 'data-bs-theme, from 5.3'], ['part', 'A dark: variant on each class'], ['yes', 'A theme object in JavaScript']],
    ['Class names describe the part, not the style', ['yes', 'BEM: .modal__title, .button--danger'], ['part', '.modal-title, plus utilities like fs-5'], ['no', 'Class lists describe styles'], ['na', 'Styles live in JSX props']],
    ['Server-rendered HTML stays interactive without hydration', ['yes', 'Any backend: Django, Rails, Laravel, Go, Node'], ['yes', 'After its script loads'], ['yes', 'Styling only'], ['no', 'Interactive only after hydration']],
    ['44px minimum touch target on every control', ['yes', '--kubu-target, WCAG 2.2 enhanced'], ['no', 'Not by default'], ['no', 'Not by default'], ['no', 'Not by default']],
    ['Partial page updates without writing JavaScript', ['yes', 'htmx-ready: indicator, swap and skeleton states styled'], ['no', 'Not covered'], ['no', 'Not covered'], ['part', 'Through React state']],
];

const mark = { yes: ['✓', 'Yes', 'cmp--yes'], no: ['✕', 'No', 'cmp--no'], part: ['◐', 'Partly', 'cmp--part'], na: ['–', 'Not applicable', 'cmp--na'] };

function cell([value, note]) {
    const [symbol, word, cls] = mark[value];
    return html`<td class="table__cell ${cls}"><span class="cmp__mark" aria-hidden="true">${symbol}</span> <strong>${word}</strong><br><small>${note}</small></td>`;
}

function codeCard(title, code, notes) {
    return html`
    <article class="card col-12 lg:col-4 code-card">
        <h3 class="card__title">${title}</h3>
        <ul class="list-inline code-card__facts">${notes.map((n) => html`<li><span class="badge">${n}</span></li>`)}</ul>
        <pre class="code"><code>${code}</code></pre>
    </article>`;
}

export function why(ctx) {
    const css = measure('dist/kubu.min.css');
    const htmx = measure('js/htmx.min.js');
    const appCss = measure('demo/public/app.css');
    const appJs = measure('demo/public/app.js');

    const body = html`
    ${pageHead({
        title: 'Why KUBU',
        lead: 'This console is the argument. Below are the numbers from this server and the same component written three ways.',
        actions: html`<a class="button button--primary" href="/no-js">${icon('code')} Try it without JavaScript</a>`,
    })}

    <h2 class="section-title">Measured on this server, now</h2>
    <div class="grid">
        <div class="card stat col-12 sm:col-6 lg:col-3"><span class="stat__label">The whole framework</span><span class="stat__value">${kb(css.gzip)}</span><span class="stat__note">kubu.min.css, gzipped (${kb(css.raw)} raw). Every component, both themes.</span></div>
        <div class="card stat col-12 sm:col-6 lg:col-3"><span class="stat__label">Component JavaScript</span><span class="stat__value">0 KB</span><span class="stat__note">Dialogs, menus, tabs, panels and switches are HTML.</span></div>
        <div class="card stat col-12 sm:col-6 lg:col-3"><span class="stat__label">Optional htmx</span><span class="stat__value">${kb(htmx.gzip)}</span><span class="stat__note">Partial page swaps. ${ctx.prefs.nojs ? 'Off for you right now.' : 'Turn it off and nothing breaks.'}</span></div>
        <div class="card stat col-12 sm:col-6 lg:col-3"><span class="stat__label">This app's own code</span><span class="stat__value">${kb(appCss.gzip + appJs.gzip)}</span><span class="stat__note">app.css ${kb(appCss.gzip)} for the shell and charts, app.js ${kb(appJs.gzip)} to move focus after a swap.</span></div>
    </div>

    <h2 class="section-title">Side by side</h2>
    <p>KUBU's column is what this console does. The others describe each project's default, documented approach; check their current releases for your own decision.</p>
    <div class="table-container">
        <table class="table cmp">
            <caption class="visually-hidden">KUBU compared with Bootstrap 5, Tailwind CSS and MUI</caption>
            <thead class="table__header"><tr>
                <th class="table__header-cell" scope="col">What you get</th>
                <th class="table__header-cell cmp__us" scope="col">KUBU 2.0</th>
                <th class="table__header-cell" scope="col">Bootstrap 5</th>
                <th class="table__header-cell" scope="col">Tailwind CSS</th>
                <th class="table__header-cell" scope="col">MUI (React)</th>
            </tr></thead>
            <tbody>${matrix.map(([what, ...cols]) => html`<tr class="table__row"><th class="table__cell" scope="row">${what}</th>${cols.map(cell)}</tr>`)}</tbody>
        </table>
    </div>

    <h2 class="section-title">One confirmation dialog, three ways</h2>
    <div class="live-demo card">
        <div>
            <p class="stat__label">Live, on this page</p>
            <p>This is the KUBU version. It opens, traps focus, closes on Escape and returns focus to the button, all from the browser's own <code>&lt;dialog&gt;</code>.</p>
        </div>
        <button class="button button--danger" type="button" commandfor="cmp-confirm" command="show-modal">${icon('trash')} Delete file</button>
        <dialog class="modal" id="cmp-confirm" aria-labelledby="cmp-confirm-title">
            <header class="modal__header">
                <h2 class="modal__title" id="cmp-confirm-title">Delete this file?</h2>
                <form method="dialog"><button class="modal__close" aria-label="Close">&times;</button></form>
            </header>
            <div class="modal__body"><p>This cannot be undone. (It is a demo: nothing is deleted.)</p></div>
            <form class="modal__footer" method="dialog">
                <button class="button button--outline">Keep file</button>
                <button class="button button--danger" value="delete">Delete file</button>
            </form>
        </dialog>
    </div>
    <div class="grid">
        ${codeCard('KUBU', samples.kubu, [`${classCount(samples.kubu)} class names`, `${attrCount(samples.kubu, /data-|<script/g)} script hooks`, 'Works without JS'])}
        ${codeCard('Bootstrap 5', samples.bootstrap, [`${classCount(samples.bootstrap)} class names`, `${attrCount(samples.bootstrap, /data-bs-|<script/g)} script hooks`, 'Needs its JS'])}
        ${codeCard('Tailwind CSS', samples.tailwind, [`${classCount(samples.tailwind)} class names`, 'Behaviour not included', 'Needs a build'])}
    </div>

    <h2 class="section-title">What that means for a team</h2>
    <div class="grid">
        ${[
            ['Your backend stays in charge', 'Every screen here is an HTML page returned by a route. There is no client state to keep in sync, no API layer to build for the UI, and no hydration step.'],
            ['Accessible by construction', 'Native elements bring keyboard support, focus handling and screen-reader roles that a script would otherwise have to re-create. Controls are at least 44px. Status is never colour alone.'],
            ['Readable markup', 'A class like .invoice__head or .button--danger says what the thing is. A reviewer can read a template without a style reference beside it.'],
            ['Nothing to upgrade in lockstep', 'One CSS file, versioned by a simple contract: a fix is 2.0.1, a new part is 2.1.0, a break is 3.0.0. No component runtime to keep pace with.'],
        ].map(([title, text]) => html`<article class="card col-12 md:col-6"><h3 class="card__title">${title}</h3><p>${text}</p></article>`)}
    </div>`;

    return {
        title: 'Why KUBU',
        body,
        built: [
            ['Sizes', 'Read from the real files on disk and gzipped on each request'],
            ['Class counts', 'Counted from the code samples shown'],
            ['Live dialog', '<dialog> with commandfor'],
        ],
    };
}

export function noJs(ctx) {
    const on = !ctx.prefs.nojs;
    const body = html`
    ${pageHead({
        title: 'Run without JavaScript',
        lead: on ? 'htmx is on. Pages swap in place and search updates as you type.' : 'JavaScript is off. Every page is now a plain server round trip, and the console still does everything.',
    })}
    <section class="card">
        <header class="card__header">
            <h2 class="card__title">Right now</h2>
            <span class="presence ${on ? 'presence--on' : 'presence--away'}"><span class="presence__dot" aria-hidden="true"></span>${on ? 'htmx loaded' : 'No scripts on the page'}</span>
        </header>
        <form action="/prefs" method="post" hx-boost="false">
            <input type="hidden" name="back" value="/no-js">
            <input type="hidden" name="nojs" value="${on ? '1' : '0'}">
            <button class="button ${on ? 'button--danger' : 'button--primary'}" type="submit">${on ? 'Turn JavaScript off for this session' : 'Turn htmx back on'}</button>
        </form>
        <p class="mt-2 muted">This stops the server from sending any script tag. You can also switch JavaScript off in your browser's developer tools; the result is the same.</p>
    </section>
    <section class="card">
        <h2 class="card__title">What changes, and what does not</h2>
        <div class="table-container">
            <table class="table">
                <thead class="table__header"><tr><th class="table__header-cell" scope="col">Feature</th><th class="table__header-cell" scope="col">With htmx</th><th class="table__header-cell" scope="col">Without JavaScript</th></tr></thead>
                <tbody>
                    ${[
                        ['Moving between pages', 'Only the page region is swapped; the URL, title and Back stay right', 'A normal page load'],
                        ['Account search', 'Results update as you type', 'Press Enter or Apply filters'],
                        ['Saving a form', 'Posted in the background, then the new page swaps in', 'Posted, then redirected'],
                        ['Changing a role on the Team page', 'Saves when you choose', 'Choose, then press Save role'],
                        ['System status on the dashboard', 'Refreshes every 15 seconds', 'A snapshot from page load'],
                        ['Dialogs, menus, tabs, panels, theme, toasts', 'Native HTML and CSS', 'The same: native HTML and CSS'],
                        ['Validation, permissions, CSV export', 'On the server', 'The same: on the server'],
                    ].map(([f, a, b]) => html`<tr class="table__row"><th class="table__cell" scope="row">${f}</th><td class="table__cell">${a}</td><td class="table__cell">${b}</td></tr>`)}
                </tbody>
            </table>
        </div>
    </section>
    <section class="card">
        <h2 class="card__title">Try these with it off</h2>
        <ul>
            <li><a href="/accounts?status=trial">Filter accounts</a>, sort a column, then press Back.</li>
            <li><a href="/invoices/new">Create an invoice</a> in three steps, adding a line on the way.</li>
            <li><a href="/accounts/new">Submit a new account</a> with the name left empty to see the server's errors.</li>
            <li>Open an account and use the <strong>Delete</strong> dialog, or the Invite panel on <a href="/team">Team</a>.</li>
        </ul>
    </section>`;
    return { title: 'Run without JavaScript', body, built: [['The switch', 'A cookie; the server leaves out every <script> when it is set']] };
}

export { raw };
