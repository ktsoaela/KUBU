// Smoke test for the docs site in real browsers. The same checks run in every engine found:
//
//   Chrome and Edge   launched directly, driven over the DevTools protocol   (scripts/browsers/cdp.mjs)
//   Firefox           launched directly, driven over WebDriver BiDi        (scripts/browsers/bidi.mjs)
//   WebKit            Safari's engine, through Playwright's WebKit build    (scripts/browsers/webkit.mjs)
//
//   node scripts/smoke.mjs                      # every engine that is installed
//   node scripts/smoke.mjs firefox webkit       # only these (chrome, edge, firefox, webkit)
//   CHROME=… EDGE=… FIREFOX=… node scripts/smoke.mjs   # point at a browser in another place
//
// Real Safari cannot be driven on Windows or Linux, so Safari is covered through WebKit. Chrome,
// Edge and Firefox are skipped with a note when they are not installed; WebKit is skipped when
// playwright-core or its WebKit download is missing. The run fails if no engine runs at all.
//
// It serves the repository on a free port, then checks, in each engine:
//   - with scripts on: header and sidebar links swap #frame, update the URL, the title and
//     aria-current, keep the header, move focus to #main, and Back returns to the last page;
//   - a fresh load of a page has the right aria-current;
//   - controls are at least 44 by 44 pixels, text meets WCAG AA contrast, and Tab shows a focus
//     ring, in dark and light;
//   - with scripts off: the dialog, a disclosure, tabs, the theme radios and the code
//     samples work, and links are normal navigations.

import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cdp from './browsers/cdp.mjs';
import * as bidi from './browsers/bidi.mjs';
import * as webkit from './browsers/webkit.mjs';
import { allPages } from './site.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.mjs': 'text/javascript' };

const server = createServer((req, res) => {
    const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) {
        res.writeHead(404).end('not found');
        return;
    }
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
    createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/kubu-framework/pages/`;

// Throwaway browser profiles live in node_modules/.cache, which git ignores.
const cache = path.join(root, 'kubu-framework/node_modules/.cache');
mkdirSync(cache, { recursive: true });

const find = (...paths) => paths.filter(Boolean).find((p) => existsSync(p));
const engines = {
    chrome: () => {
        const exe = find(process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium');
        return exe ? { driver: cdp, exe } : 'not installed (set CHROME=/path/to/chrome)';
    },
    edge: () => {
        const exe = find(process.env.EDGE, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/usr/bin/microsoft-edge');
        return exe ? { driver: cdp, exe } : 'not installed (set EDGE=/path/to/msedge)';
    },
    firefox: () => {
        const exe = find(process.env.FIREFOX, 'C:/Program Files/Mozilla Firefox/firefox.exe', 'C:/Program Files (x86)/Mozilla Firefox/firefox.exe', '/Applications/Firefox.app/Contents/MacOS/firefox', '/usr/bin/firefox');
        return exe ? { driver: bidi, exe } : 'not installed (set FIREFOX=/path/to/firefox)';
    },
    webkit: async () => (await webkit.available()) ?? { driver: webkit },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- the checks: one run in one browser -------------------------------------------------------
async function run(b, ok, skip) {
    const evaluate = (expression) => b.evaluate(expression);
    // A navigation that never finishes fails the run with a message instead of hanging it.
    // A busy machine can stall one load, so each load gets one retry.
    const load = async (url) => {
        for (let attempt = 1; ; attempt++) {
            const timeout = sleep(20000).then(() => 'timeout');
            if ((await Promise.race([b.load(url).then(() => 'loaded'), timeout])) === 'loaded') return;
            if (attempt === 2) throw new Error(`load timed out twice: ${url}`);
        }
    };
    const waitFor = async (expression, ms = 5000) => {
        const end = Date.now() + ms;
        while (Date.now() < end) {
            if (await evaluate(expression).catch(() => false)) return true;
            await sleep(50);
        }
        return false;
    };
    // A real pointer click in the middle of the element, as a visitor would make it.
    const click = async (selector) => {
        const [x, y] = await evaluate(`(() => {
            const el = document.querySelector(${JSON.stringify(selector)});
            el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' });
            const r = el.getBoundingClientRect();
            return [r.x + r.width / 2, r.y + r.height / 2];
        })()`);
        await b.click(x, y);
        await sleep(150);
    };
    const hasAttr = (selector, name) => evaluate(`document.querySelector(${JSON.stringify(selector)}).hasAttribute(${JSON.stringify(name)})`);
    const style = (selector, prop) => evaluate(`getComputedStyle(document.querySelector(${JSON.stringify(selector)})).getPropertyValue(${JSON.stringify(prop)})`);

    // --- with scripts on ---
    await load(`${base}index.html`);
    ok(await waitFor('!!window.htmx'), 'htmx is loaded');
    await evaluate(`window.__header = document.querySelector('.site-header'); window.__marker = 1`);

    const visit = async (href, title) => {
        await evaluate(`document.querySelector('#frame a[href="${href}"], #site-links a[href="${href}"]').click()`);
        const arrived = await waitFor(`location.pathname.endsWith('/${href}') && document.title === ${JSON.stringify(title)} && !document.querySelector('.htmx-request')`);
        ok(arrived, `${href}: URL and title "${title}" after the swap`);
        ok(await evaluate('window.__marker === 1'), `${href}: no full reload`);
        ok(await evaluate('document.querySelector(".site-header") === window.__header'), `${href}: header kept`);
        const current = await evaluate(`[...document.querySelectorAll('[aria-current="page"]')].filter(a => a.closest('#docs-sidebar, #site-links')).map(a => a.getAttribute('href'))`);
        ok(current.length >= 1 && current.every((h) => h === href), `${href}: aria-current on ${current.join(', ')}`);
        ok(await waitFor('document.activeElement && document.activeElement.id === "main"', 2000), `${href}: focus moved to #main`);
        // Let htmx finish settling and process the new links before the next click. A click inside that
        // window is a normal page load, which works, but would not test the swap.
        await waitFor('!document.querySelector(".htmx-settling, .htmx-swapping, .htmx-added")', 2000);
        await sleep(100);
    };

    await visit('atom-buttons.html', 'Buttons · KUBU');
    await visit('v2.html', 'KUBU 2.0 · KUBU');
    await visit('papers.html', 'Papers · KUBU');
    await visit('organism-modal.html', 'Modal · KUBU');

    await evaluate('history.back()');
    ok(await waitFor(`location.pathname.endsWith('/papers.html') && document.title === 'Papers · KUBU'`), 'Back returns to Papers');
    ok(await waitFor(`document.querySelector('#site-links a[href="papers.html"]').getAttribute('aria-current') === 'page'`), 'Back restores the header highlight');

    await load(`${base}organism-tabs.html`);
    ok(await evaluate(`document.querySelector('#docs-sidebar a[aria-current="page"]').getAttribute('href') === 'organism-tabs.html'`), 'refresh: full page with aria-current on Tabs');

    // In-page htmx: a form swaps only its result, and the URL stays.
    await load(`${base}organism-forms.html`);
    await waitFor('!!window.htmx');
    ok(await evaluate(`getComputedStyle(document.querySelector('.form-container--guarded .form-submit')).opacity === '0.55'`), 'forms: send stays dimmed while required fields are empty');
    await evaluate(`document.querySelector('#fm-news').value = 'palesa@example.com'; document.querySelector('#fm-subscribe').click()`);
    ok(await waitFor(`document.querySelector('#fm-result').textContent.includes('You are on the list')`), 'forms: hx-get fills the result area');
    ok(await evaluate(`location.pathname.endsWith('/organism-forms.html') && !!document.querySelector('#docs-sidebar')`), 'forms: URL and page stay');

    await load(`${base}organism-toasts.html`);
    await waitFor('!!window.htmx');
    await evaluate(`document.querySelector('[hx-get$="toast-saved.html"]').click()`);
    ok(await waitFor(`document.querySelectorAll('#toasts .toast').length === 1`), 'toasts: hx-swap-oob adds a toast to #toasts');

    await load(`${base}index.html`);
    const error = await evaluate(`(() => { const e = document.querySelector('#home-email-error'); return [getComputedStyle(e, '::before').content, e.textContent.length, document.querySelector('#home-email').getAttribute('aria-describedby')]; })()`);
    ok(error[0] === '"!"' && error[1] > 20 && error[2] === 'home-email-error', 'home: the form error has an icon, a sentence and is linked to its field');

    // The starter in packages/web: the same boost pattern on its own pages, swapping #content.
    const web = base.replace('/pages/', '/packages/web/');
    await load(`${web}index.html`);
    ok(await waitFor('!!window.htmx'), 'starter: htmx is loaded');
    await evaluate(`window.__header = document.querySelector('header.header'); window.__marker = 1`);
    await evaluate(`document.querySelector('#site-nav a[href="about.html"]').click()`);
    ok(await waitFor(`location.pathname.endsWith('/packages/web/about.html') && document.title === 'About · Your site' && !document.querySelector('.htmx-request')`), 'starter: About swaps in with its URL and title');
    ok(await evaluate('window.__marker === 1 && document.querySelector("header.header") === window.__header'), 'starter: no full reload, header kept');
    ok(await evaluate(`document.querySelector('#site-nav [aria-current="page"]').getAttribute('href') === 'about.html'`), 'starter: aria-current moves to About');
    await waitFor('!document.querySelector(".htmx-settling, .htmx-swapping, .htmx-added")', 2000);
    await sleep(100);
    await evaluate('history.back()');
    ok(await waitFor(`location.pathname.endsWith('/packages/web/index.html') && document.title === 'Your site'`), 'starter: Back returns Home');

    // Targets: every button, summary, form control label and menu link is at least 44 by 44.
    const starterPages = ['index.html', 'about.html', 'contact.html'].map((p) => `../packages/web/${p}`);
    for (const page of [...allPages, ...starterPages]) {
        await load(`${base}${page}`);
        await evaluate(`document.querySelectorAll('details').forEach(d => d.open = true)`);
        const small = await evaluate(`[...document.querySelectorAll('button, summary, .button, .nav-link, .list-item, .dropdown-item, .pagination__link, .tabs__tab, .theme-switch__label, .rating label, .footer__link, input:not([type=radio]):not([type=checkbox]):not([type=hidden]), select')]
            .filter(el => el.offsetParent && !el.closest('dialog:not([open]), .doc-code__pre, [popover]:not(:popover-open), .offcanvas'))
            .map(el => [el, el.getBoundingClientRect()])
            .filter(([, r]) => r.width > 0 && (Math.round(r.height) < 44 || Math.round(r.width) < 44))
            .map(([el, r]) => el.tagName.toLowerCase() + '.' + el.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height))`);
        ok(small.length === 0, `${page}: targets at least 44px${small.length ? ': ' + small.slice(0, 5).join('; ') : ''}`);
    }

    // Text contrast (WCAG AA): 4.5:1, or 3:1 for large text, against the nearest opaque background,
    // on every page in both schemes. Disabled controls and hidden text are exempt.
    for (const scheme of ['dark', 'light']) {
        await b.setScheme(scheme);
        const failing = [];
        for (const page of allPages) {
            await load(`${base}${page}`);
            await evaluate(`document.querySelectorAll('main details').forEach(d => d.open = true)`);
            await sleep(50);
            for (const f of await evaluate(CONTRAST)) failing.push(`${page}: ${f}`);
        }
        ok(failing.length === 0, `${scheme}: text contrast meets WCAG AA on every page${failing.length ? `\n      ${failing.slice(0, 25).join('\n      ')}${failing.length > 25 ? `\n      …and ${failing.length - 25} more` : ''}` : ''}`);
    }
    await b.setScheme(null);

    // Buttons: hover, active, disabled and loading look different from default.
    await load(`${base}atom-buttons.html`);
    const states = await evaluate(`(() => {
        const [def, dis, busy] = document.querySelectorAll('.doc-example__preview .button');
        const s = (el) => getComputedStyle(el);
        const after = getComputedStyle(busy, '::after');
        return { disabled: s(dis).opacity !== s(def).opacity, busy: after.content !== 'none' && after.animationName !== 'none' };
    })()`);
    ok(states.disabled, 'buttons: disabled state is distinct');
    ok(states.busy, 'buttons: loading state draws a spinner');

    // Focus ring in both schemes, and Auto follows the system setting.
    for (const scheme of ['dark', 'light']) {
        await b.setScheme(scheme);
        await load(`${base}index.html`);
        for (let i = 0; i < 4; i++) await b.pressTab();
        // Headless Firefox on Windows never gives its window focus, so no element can match :focus.
        // Tab still moves document.activeElement; the ring itself is then reported as skipped.
        const [ring, moved, windowFocus] = await evaluate(`(() => { const e = document.activeElement; const s = getComputedStyle(e); return [s.outlineStyle + ' ' + s.outlineWidth, e !== document.body, document.hasFocus()]; })()`);
        ok(moved, `${scheme}: Tab moves focus through the page`);
        if (windowFocus) ok(/solid 2px|auto/.test(ring), `${scheme}: Tab shows a focus ring (${ring})`);
        else skip(`${scheme}: focus ring not checked, the headless window has no focus`);
        const bg = await evaluate(`getComputedStyle(document.body).backgroundColor`);
        ok(scheme === 'dark' ? bg === 'rgb(14, 20, 25)' : bg === 'rgb(246, 247, 249)', `${scheme}: Auto follows the system (${bg})`);
    }
    await b.setScheme(null);

    // --- with scripts off: drive the page with real clicks and read the DOM ---
    await b.setScripts(false);
    await load(`${base}index.html`);
    ok(!(await evaluate('!!window.htmx')), 'no JS: page scripts do not run');
    await click('button[commandfor="home-dialog"]');
    ok(await hasAttr('#home-dialog', 'open'), 'no JS: the dialog opens from its button');
    await click('#home-dialog .modal__close');
    ok(!(await hasAttr('#home-dialog', 'open')), 'no JS: the dialog closes from its corner button');
    await click('.collapse-details:not([open]) > summary');
    ok(await hasAttr('.collapse-details:nth-of-type(2)', 'open'), 'no JS: a disclosure opens');
    await click('.doc-code > summary');
    ok(await hasAttr('.doc-code', 'open'), 'no JS: a code sample opens');
    ok((await style('.doc-code__tag', 'color')) !== (await style('.doc-code__block', 'color')), 'no JS: code is colour-coded by spans in the HTML');
    // The page background fades over 0.3s after the :has() restyle, so wait for it to settle.
    const themes = async (radio, bg) => {
        await click(`label[for="${radio}"]`);
        await waitFor(`getComputedStyle(document.body).backgroundColor === ${JSON.stringify(bg)}`, 3000);
        return style('body', 'background-color');
    };
    const darkBg = await themes('dark-mode', 'rgb(14, 20, 25)');
    ok(darkBg === 'rgb(14, 20, 25)', `no JS: the Dark radio themes the page (${darkBg})`);
    const lightBg = await themes('light-mode', 'rgb(246, 247, 249)');
    ok(lightBg === 'rgb(246, 247, 249)', `no JS: the Light radio themes the page (${lightBg})`);

    await load(`${base}organism-tabs.html`);
    await click('label[for="tabs-size"]');
    ok((await style('#tabs-size + .tabs__tab + .tabs__panel', 'display')) === 'block', 'no JS: a tab shows its panel');
    ok((await style('#tabs-desc + .tabs__tab + .tabs__panel', 'display')) === 'none', 'no JS: the other panel hides');

    // A normal navigation loads a new document, so performance.timeOrigin changes.
    const navigates = async (selector, ending) => {
        const before = await evaluate('performance.timeOrigin');
        await click(selector);
        const arrived = await waitFor(`location.pathname.endsWith(${JSON.stringify(ending)}) && document.readyState === 'complete'`, 5000);
        return arrived && (await evaluate('performance.timeOrigin')) !== before;
    };
    ok(await navigates('#docs-sidebar a[href="organism-card.html"]', '/organism-card.html'), 'no JS: a link is a normal navigation to a new document');

    await load(`${web}index.html`);
    ok(await navigates('#site-nav a[href="contact.html"]', '/packages/web/contact.html'), 'no JS: the starter menu is a normal navigation');
}

const CONTRAST = `(() => {
    const parse = (c) => {
        let m = c.match(/rgba?\\(([^)]+)\\)/);
        if (m) { const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p[3] ?? 1]; }
        m = c.match(/color\\(srgb ([^)]+)\\)/);
        if (m) { const p = m[1].split(/[ /]+/).filter(Boolean).map(Number); return [p[0] * 255, p[1] * 255, p[2] * 255, p[3] ?? 1]; }
        return null;
    };
    const lum = ([r, g, b]) => [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; })
        .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
    const bgOf = (el) => {
        for (let e = el; e; e = e.parentElement) {
            const s = getComputedStyle(e);
            if (s.backgroundImage !== 'none' && !e.classList.contains('doc-swatch')) return null; // gradients: skip
            const c = parse(s.backgroundColor);
            if (c && c[3] >= 0.99) return c;
        }
        return parse(getComputedStyle(document.body).backgroundColor);
    };
    const out = [];
    const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
    const seen = new Set();
    for (let n; (n = walker.nextNode()); ) {
        const el = n.parentElement;
        if (!n.textContent.trim() || seen.has(el)) continue;
        seen.add(el);
        if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true }) || el.closest('progress, meter, [disabled], [aria-disabled="true"], .visually-hidden, dialog:not([open]), [popover]:not(:popover-open), .offcanvas, .tooltiptext, .popover-content, .dropdown-content, .modal-overlay')) continue;
        const s = getComputedStyle(el);
        const fg = parse(s.color);
        const bg = bgOf(el);
        if (!fg || !bg) continue;
        let o = 1;
        for (let e = el; e; e = e.parentElement) o *= Number(getComputedStyle(e).opacity);
        if (o < 0.99) continue;
        const mix = fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3]));
        const [a, b] = [lum(mix), lum(bg)].sort((x, y) => y - x);
        const ratio = (a + 0.05) / (b + 0.05);
        const size = parseFloat(s.fontSize);
        const large = size >= 24 || (size >= 18.66 && Number(s.fontWeight) >= 700);
        if (ratio < (large ? 3 : 4.5)) out.push(el.tagName.toLowerCase() + '.' + [...el.classList].join('.') + ' "' + n.textContent.trim().slice(0, 24) + '" ' + ratio.toFixed(2));
    }
    return out;
})()`;

// ---- run every engine -------------------------------------------------------------------------
const wanted = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(engines);
const results = [];
for (const key of wanted) {
    if (!engines[key]) {
        console.error(`Unknown browser "${key}". Choose from: ${Object.keys(engines).join(', ')}`);
        process.exit(2);
    }
    const found = await engines[key]();
    if (typeof found === 'string') {
        console.log(`\n== ${key}: skipped, ${found}`);
        results.push([key, 'skipped']);
        continue;
    }
    let failures = 0;
    let b;
    try {
        b = await found.driver.launch({ name: key, exe: found.exe, cache });
        console.log(`\n== ${b.name}`);
        await run(
            b,
            (cond, label) => {
                console.log(`${cond ? 'ok  ' : 'FAIL'}  [${key}] ${label}`);
                if (!cond) failures++;
            },
            (label) => console.log(`skip  [${key}] ${label}`),
        );
    } catch (e) {
        console.log(`FAIL  [${key}] the run stopped: ${e.message}`);
        failures++;
    } finally {
        await b?.close();
    }
    results.push([key, failures ? `${failures} check(s) failed` : 'all checks passed']);
}
server.close();

console.log('\nSummary');
for (const [key, result] of results) console.log(`  ${key.padEnd(8)} ${result}`);
const ran = results.filter(([, r]) => r !== 'skipped');
const failed = ran.some(([, r]) => r !== 'all checks passed');
if (!ran.length) console.log('\nNo browser ran. Install Chrome, Edge or Firefox, or run `npx playwright-core install webkit`.');
process.exit(failed || !ran.length ? 1 : 0);
