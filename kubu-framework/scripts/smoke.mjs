// Smoke test for the docs site in a real browser (headless Chrome or Edge, no npm packages).
//
//   node scripts/smoke.mjs            # CHROME=/path/to/chrome to choose the browser
//
// It serves the repository on a free port, then checks:
//   - with scripts on: header and sidebar links swap #frame, update the URL, the title and
//     aria-current, keep the header, move focus to #main, and Back returns to the last page;
//   - a fresh load of a page has the right aria-current;
//   - controls are at least 44 by 44 pixels, and Tab shows a focus ring in dark and light;
//   - with scripts off: the dialog, a disclosure, tabs, the theme radios and the code
//     samples work, and links are normal navigations.

import { spawn } from 'node:child_process';
import { createReadStream, existsSync, mkdirSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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

const browsers = [
    process.env.CHROME,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
].filter(Boolean);
const exe = browsers.find((b) => existsSync(b));
if (!exe) {
    console.error('No Chrome or Edge found. Set CHROME=/path/to/chrome.');
    process.exit(2);
}

// The throwaway browser profile lives in node_modules/.cache, which git ignores.
const cache = path.join(root, 'kubu-framework/node_modules/.cache');
mkdirSync(cache, { recursive: true });
const profile = mkdtempSync(path.join(cache, 'kubu-smoke-'));
const chrome = spawn(exe, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--window-size=1280,900', 'about:blank']);
const wsUrl = await new Promise((resolve, reject) => {
    let err = '';
    chrome.stderr.on('data', (d) => {
        err += d;
        const m = err.match(/ws:\/\/[^\s]+/);
        if (m) resolve(m[0]);
    });
    chrome.on('exit', () => reject(new Error(`browser exited: ${err}`)));
});

// --- a tiny DevTools protocol client -----------------------------------------------------------
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r));
let nextId = 0;
const pending = new Map();
const listeners = [];
ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method) listeners.forEach((l) => l(msg));
});
const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
        const id = ++nextId;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params, sessionId }));
    });

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
const cdp = (method, params) => send(method, params, sessionId);
await cdp('Page.enable');
await cdp('Runtime.enable');
await cdp('DOM.enable');
await cdp('CSS.enable');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const evaluate = async (expression) => {
    const { result, exceptionDetails } = await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (exceptionDetails) throw new Error(exceptionDetails.exception?.description || exceptionDetails.text);
    return result.value;
};
const waitFor = async (expression, ms = 5000) => {
    const end = Date.now() + ms;
    while (Date.now() < end) {
        if (await evaluate(expression).catch(() => false)) return true;
        await sleep(50);
    }
    return false;
};
const load = async (url) => {
    const done = new Promise((r) => {
        const l = (m) => m.method === 'Page.loadEventFired' && m.sessionId === sessionId && (listeners.splice(listeners.indexOf(l), 1), r());
        listeners.push(l);
    });
    await cdp('Page.navigate', { url });
    await done;
};

let failures = 0;
const ok = (cond, label) => {
    console.log(`${cond ? 'ok  ' : 'FAIL'}  ${label}`);
    if (!cond) failures++;
};

// --- with scripts on ---------------------------------------------------------------------------
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

// Targets: every button, summary, form control label and menu link is at least 44 by 44.
for (const page of allPages) {
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
        if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true }) || el.closest('[disabled], [aria-disabled="true"], .visually-hidden, dialog:not([open]), [popover]:not(:popover-open), .offcanvas, .tooltiptext, .popover-content, .dropdown-content, .modal-overlay')) continue;
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
for (const scheme of ['dark', 'light']) {
    await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] });
    const failing = [];
    for (const page of allPages) {
        await load(`${base}${page}`);
        await evaluate(`document.querySelectorAll('main details').forEach(d => d.open = true)`);
        await sleep(50);
        for (const f of await evaluate(CONTRAST)) failing.push(`${page}: ${f}`);
    }
    ok(failing.length === 0, `${scheme}: text contrast meets WCAG AA on every page${failing.length ? `\n      ${failing.slice(0, 25).join('\n      ')}${failing.length > 25 ? `\n      …and ${failing.length - 25} more` : ''}` : ''}`);
}
await cdp('Emulation.setEmulatedMedia', { features: [] });

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

// Focus ring in both schemes.
for (const scheme of ['dark', 'light']) {
    await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] });
    await load(`${base}index.html`);
    for (let i = 0; i < 4; i++) {
        await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
        await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    }
    const ring = await evaluate(`(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle + ' ' + s.outlineWidth; })()`);
    ok(/solid 2px|auto/.test(ring), `${scheme}: Tab shows a focus ring (${ring})`);
    const bg = await evaluate(`getComputedStyle(document.body).backgroundColor`);
    ok(scheme === 'dark' ? bg === 'rgb(14, 20, 25)' : bg === 'rgb(246, 247, 249)', `${scheme}: Auto follows the system (${bg})`);
}
await cdp('Emulation.setEmulatedMedia', { features: [] });

// --- with scripts off: drive the page with real clicks and read the DOM -------------------------
await cdp('Emulation.setScriptExecutionDisabled', { value: true });
const node = async (selector) => {
    const { root } = await cdp('DOM.getDocument', { depth: 0 });
    const { nodeId } = await cdp('DOM.querySelector', { nodeId: root.nodeId, selector });
    return nodeId;
};
const click = async (selector) => {
    const nodeId = await node(selector);
    await cdp('DOM.scrollIntoViewIfNeeded', { nodeId });
    const { model } = await cdp('DOM.getBoxModel', { nodeId });
    const [x1, y1, , , x2, y2] = model.content;
    const x = (x1 + x2) / 2;
    const y = (y1 + y2) / 2;
    for (const type of ['mousePressed', 'mouseReleased']) await cdp('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 });
    await sleep(150);
};
const hasAttr = async (selector, name) => {
    const { attributes } = await cdp('DOM.getAttributes', { nodeId: await node(selector) });
    return attributes.includes(name);
};
const style = async (selector, prop) => {
    const { computedStyle } = await cdp('CSS.getComputedStyleForNode', { nodeId: await node(selector) });
    return computedStyle.find((p) => p.name === prop)?.value;
};

await load(`${base}index.html`);
await click('button[commandfor="home-dialog"]');
ok(await hasAttr('#home-dialog', 'open'), 'no JS: the dialog opens from its button');
await click('#home-dialog .modal__close');
ok(!(await hasAttr('#home-dialog', 'open')), 'no JS: the dialog closes from its corner button');
await click('.collapse-details:not([open]) > summary');
ok(await hasAttr('.collapse-details:nth-of-type(2)', 'open'), 'no JS: a disclosure opens');
await click('.doc-code > summary');
ok(await hasAttr('.doc-code', 'open'), 'no JS: a code sample opens');
ok((await style('.doc-code__tag', 'color')) !== (await style('.doc-code__block', 'color')), 'no JS: code is colour-coded by spans in the HTML');
// The page background fades over 0.3s, so wait for it to settle before reading it.
await click('label[for="dark-mode"]');
await sleep(500);
const darkBg = await style('body', 'background-color');
ok(darkBg === 'rgb(14, 20, 25)', `no JS: the Dark radio themes the page (${darkBg})`);
await click('label[for="light-mode"]');
await sleep(500);
const lightBg = await style('body', 'background-color');
ok(lightBg === 'rgb(246, 247, 249)', `no JS: the Light radio themes the page (${lightBg})`);

await load(`${base}organism-tabs.html`);
await click('label[for="tabs-size"]');
ok((await style('#tabs-size + .tabs__tab + .tabs__panel', 'display')) === 'block', 'no JS: a tab shows its panel');
ok((await style('#tabs-desc + .tabs__tab + .tabs__panel', 'display')) === 'none', 'no JS: the other panel hides');

// Compare entry ids, not counts: Chrome keeps at most 50 entries and this run loads more pages.
const entry = (h) => h.entries[h.currentIndex];
const before = entry(await cdp('Page.getNavigationHistory')).id;
await click('#docs-sidebar a[href="organism-card.html"]');
let history;
for (let i = 0; i < 40; i++) {
    history = await cdp('Page.getNavigationHistory');
    if (history.entries[history.currentIndex].url.endsWith('organism-card.html')) break;
    await sleep(100);
}
ok(entry(history).id !== before && entry(history).url.endsWith('organism-card.html'), 'no JS: a link is a normal navigation to a new history entry');

ws.close();
chrome.kill();
server.close();
await sleep(300);
try {
    rmSync(profile, { recursive: true, force: true });
} catch {
    /* the browser may still hold a file for a moment */
}
console.log(failures ? `\n${failures} check(s) failed` : '\nall checks passed');
process.exit(failures ? 1 : 0);
