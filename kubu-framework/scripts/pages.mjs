// Builds the static KUBU docs site in place. Run it after editing a page:
//
//   node scripts/pages.mjs          # stamp every page
//   node scripts/pages.mjs --check  # stamp, then fail on broken links, banned markup or a bad layout
//
// A page is a complete HTML file. You write only its <main class="doc" id="main"> … </main>;
// this script rewrites everything around it (head, header, #frame, sidebar, footer) from
// scripts/site.mjs, with aria-current="page" on the right links. Inside <main> it also:
//   - writes the code sample of every .doc-example from the live markup in its preview, as escaped,
//     colour-coded HTML (see scripts/highlight.mjs). Leave <details class="doc-code"></details> empty.
//   - re-colours a standalone <code class="doc-code__block" data-lang="css|js|shell|html"> from its text.
//   - fills <!-- kubu:contents --><!-- /kubu:contents --> with the component index.
// The result is plain HTML: the browser needs no script to show a page, its menu or its code.

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { highlight } from './highlight.mjs';
import { allPages, header, pages, sidebar } from './site.mjs';

const pagesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../pages');
const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const current = (page, href) => (page === href ? ' aria-current="page"' : '');
// showcase/*.html sits one folder down. A boosted click would keep the flat page's logo and
// stylesheets, whose relative URLs would then point at the wrong place. Those links load the
// whole page instead.
const nest = (page) => page.split('/').length - 1;
const up = (page) => '../'.repeat(nest(page));
const asset = (page) => '../'.repeat(nest(page) + 1);
const fullLoad = (page) => (nest(page) ? ' hx-boost="false"' : '');

function head(page) {
    const info = pages.get(page);
    const title = page === 'index.html' ? 'KUBU: a CSS framework for server-rendered HTML' : `${info.label} · KUBU`;
    const root = asset(page);
    return `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(info.purpose)}">
    <link rel="icon" href="${root}img/hippo-black.svg">
    <link rel="stylesheet" href="${root}styles.css">
    <link rel="stylesheet" href="${up(page)}docs.css">
    <script>try { var t = localStorage.getItem('kubu-theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) {}</script>
    <script src="${root}js/htmx.min.js" defer></script>
    <script src="${root}js/htmx-head-support.min.js" defer></script>
    <script src="${root}js/docs.js" defer></script>
</head>`;
}

// hx-boost turns every same-site link and form into an htmx request. The response is a full page;
// htmx takes #frame out of it and swaps it for the current #frame, pushes the URL, merges the
// <head> (so the <title> changes) and swaps #site-links out of band (so the header highlight moves).
// Without htmx the same links are ordinary navigations.
const BODY = '<body hx-boost="true" hx-ext="head-support" hx-target="#frame" hx-select="#frame" hx-swap="outerHTML show:window:top" hx-push-url="true" hx-select-oob="#site-links" hx-indicator="#site-progress">';

function siteHeader(page) {
    const links = header.map((h) => `            <li class="nav-item"><a class="nav-link" href="${up(page)}${h.href}"${current(page, h.href)}${fullLoad(page)}>${esc(h.title)}</a></li>`).join('\n');
    return `<header class="header site-header">
    <p class="announcement site-header__announcement">KUBU 2.0: dark-first tokens, a 12-column grid and htmx navigation. <a href="${up(page)}news.html"${fullLoad(page)}>Read what's new</a></p>
    <nav class="navbar site-header__bar" aria-label="Main">
        <a class="logo site-header__logo" href="${asset(page)}index.html" hx-boost="false"><svg class="logo__mark" width="32" height="32" aria-hidden="true"><use href="${asset(page)}img/icons.svg#hippo"></use></svg><span>KUBU</span></a>
        <input class="site-header__toggle" type="checkbox" id="site-menu">
        <label class="site-header__menu" for="site-menu">Menu</label>
        <ul class="navbar-nav site-header__links" id="site-links">
${links}
        </ul>
        <fieldset class="theme-switch">
            <legend class="theme-switch__legend">Colour theme</legend>
            <input class="theme-switch__input" type="radio" name="kubu-theme" id="auto-mode" value="auto" checked><label class="theme-switch__label" for="auto-mode">Auto</label>
            <input class="theme-switch__input" type="radio" name="kubu-theme" id="dark-mode" value="dark"><label class="theme-switch__label" for="dark-mode">Dark</label>
            <input class="theme-switch__input" type="radio" name="kubu-theme" id="light-mode" value="light"><label class="theme-switch__label" for="light-mode">Light</label>
        </fieldset>
    </nav>
    <div class="ajax-progress htmx-indicator site-progress" id="site-progress" aria-hidden="true"></div>
</header>`;
}

const slug = (s) => s.toLowerCase().replace(/[^a-z]+/g, '-');

function siteSidebar(page) {
    const groups = sidebar.map((group) => {
        const id = `nav-${slug(group.title)}`;
        const open = group.items.some(([, href]) => href === page) ? ' open' : '';
        const items = group.items
            .map(([label, href]) => `            <li><a class="list-item" href="${href}"${current(page, href)}>${esc(label)}</a></li>`)
            .join('\n');
        return `        <details class="docs-sidebar__group" id="${id}"${open}>
            <summary class="docs-sidebar__summary">${esc(group.title)}</summary>
            <ul class="list-unstyled">
${items}
            </ul>
        </details>`;
    });
    return `    <nav class="docs-sidebar" id="docs-sidebar" aria-label="Components">
${groups.join('\n')}
    </nav>`;
}

// Finished screens, not component articles. The article is the whole page.
const wide = new Set([
  'use-cases.html', 'icons.html', 'showcases.html', 'news.html', 'download.html',
  'use-case-invoice-paid.html', 'use-case-invoice-due.html', 'use-case-invoice-credit.html',
  'use-case-ship-waiting.html', 'use-case-ship-shipped.html', 'use-case-ship-delivered.html',
  'use-case-admin-stock.html', 'use-case-admin-order.html', 'use-case-admin-weaver.html',
  'use-case-shop-landing.html', 'use-case-shop-list.html', 'use-case-shop-visit.html',
  'showcase/storefront.html', 'showcase/product.html', 'showcase/contact.html', 'showcase/about.html', 'showcase/dashboard.html',
]);

function siteFooter(page) {
    const u = up(page);
    const load = fullLoad(page);
    return `<footer class="footer site-footer">
    <nav class="footer__links" aria-label="Footer">
        <a class="footer__link" href="${u}v2.html"${load}>KUBU 2.0</a>
        <a class="footer__link" href="${u}papers.html"${load}>Papers</a>
        <a class="footer__link" href="${u}start-contents.html"${load}>Contents</a>
        <a class="footer__link" href="${u}download.html"${load}>Download</a>
        <a class="footer__link" href="${u}start-javascript.html"${load}>JavaScript</a>
        <a class="footer__link" href="${asset(page)}packages/js/index.html" hx-boost="false">JS layer demo</a>
        <a class="footer__link" href="https://github.com/ktsoaela/KUBU">GitHub</a>
    </nav>
    <p class="copyright">&copy; 2026 KUBU, a product of Tsoaela Industries. MIT licence.</p>
</footer>`;
}

function contents() {
    const groups = sidebar
        .filter((g) => g.title !== 'Jumping In')
        .map((group) => {
            const rows = group.items
                .map(([label, href, purpose, css]) => {
                    const file = css ? ` <code class="doc-index__file">css/${css}</code>` : '';
                    return `        <div class="doc-index__item"><dt class="doc-index__term"><a href="${href}">${esc(label)}</a></dt><dd class="doc-index__purpose">${esc(purpose)}${file}</dd></div>`;
                })
                .join('\n');
            return `    <h2 id="contents-${slug(group.title)}">${esc(group.title)}</h2>
    <dl class="doc-index">
${rows}
    </dl>`;
        });
    return `\n${groups.join('\n')}\n    `;
}

// ---- code samples ----------------------------------------------------------------------------

const unescape = (s) =>
    s.replace(/<[^>]+>/g, '').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&amp;', '&');

// lang is set only for standalone samples; a .doc-example sample is always HTML from its preview.
const codeBlock = (open, source, lang) => {
    const attr = lang ? ` data-lang="${lang}"` : '';
    const summary = (open.match(/data-summary="([^"]*)"/) || [])[1] || 'Code';
    return `${open}
            <summary class="doc-code__summary">${summary}</summary>
            <button type="button" class="doc-code__copy" hidden>Copy code</button>
            <pre class="doc-code__pre"><code class="doc-code__block"${attr}>${highlight(source, lang)}</code></pre>
        </details>`;
};

// Returns the index just past the </div> that closes the <div> opened at `start`.
function closeDiv(html, start) {
    const re = /<div\b|<\/div>/g;
    re.lastIndex = start;
    let depth = 0;
    for (let m; (m = re.exec(html)); ) {
        depth += m[0] === '</div>' ? -1 : 1;
        if (depth === 0) return m.index + m[0].length;
    }
    throw new Error('unclosed <div class="doc-example__preview">');
}

function samples(main) {
    let out = '';
    let pos = 0;
    const previewRe = /<div class="doc-example__preview[^"]*"[^>]*>/g;
    for (let m; (m = previewRe.exec(main)); ) {
        const innerStart = m.index + m[0].length;
        const end = closeDiv(main, m.index);
        const inner = main.slice(innerStart, end - '</div>'.length);
        const rest = main.slice(end);
        const code = rest.match(/^\s*(<details class="doc-code"[^>]*>)[\s\S]*?<\/details>/);
        if (!code) continue;
        out += main.slice(pos, end) + '\n        ' + codeBlock(code[1], inner);
        pos = end + code[0].length;
        previewRe.lastIndex = pos;
    }
    out += main.slice(pos);
    // Standalone samples (data-lang="css|js|shell|html"): re-colour from their own text.
    return out.replace(
        /(<details class="doc-code"[^>]*>)(?:(?!<\/details>)[\s\S])*?<code class="doc-code__block" data-lang="(\w+)">([\s\S]*?)<\/code><\/pre>\s*<\/details>/g,
        (_, open, lang, text) => codeBlock(open, unescape(text), lang),
    );
}

// ---- stamping --------------------------------------------------------------------------------

export function stamp(page, html) {
    const main = html.match(/<main\b[\s\S]*<\/main>/);
    if (!main) throw new Error(`pages/${page}: no <main> … </main>`);
    let body = samples(main[0]);
    body = body.replace(/(<!-- kubu:contents -->)[\s\S]*?(<!-- \/kubu:contents -->)/, (_, a, b) => a + contents() + b);
    return `<!DOCTYPE html>
<html lang="en">
${head(page)}
${BODY}
<a class="skip-link" href="#main">Skip to content</a>
${siteHeader(page)}
<div class="docs-layout${wide.has(page) ? ' docs-layout--wide' : ''}" id="frame">
${wide.has(page) ? '' : `${siteSidebar(page)}
<a class="doc__index-link" href="#docs-sidebar">Component menu</a>
`}${body}
</div>
${siteFooter(page)}
</body>
</html>
`;
}

// ---- checks ----------------------------------------------------------------------------------

const bannedClasses = new Set(['btn', 'btn-primary', 'button-full', 'button-outlined', 'row', 'alert-success', 'alert-info', 'alert-warning', 'alert-danger']);
const banned = [
    [/href="#"/, 'href="#"'],
    [/router-link/, '<router-link>'],
    [/--primary-color/, '--primary-color'],
    [/\bonclick=/, 'inline onclick'],
    [/element\.style/, 'element.style'],
    [/!important/, '!important'],
    [/doc-snippet|doc-demo\b/, 'old docs.js snippet hooks'],
    [/lorem ipsum/i, 'lorem ipsum'],
    [/Footer Information/, '"Footer Information"'],
    [/>\s*(Submit|Click here)\s*</, 'vague button text'],
];

function check(page, html) {
    const problems = [];
    const main = html.match(/<main\b[\s\S]*<\/main>/)[0];
    const h1 = main.match(/<h1\b/g) || [];
    if (h1.length !== 1) problems.push(`${h1.length} <h1> in <main>`);
    if (!/<div class="docs-layout(?: docs-layout--wide)?" id="frame">/.test(html)) problems.push('no #frame');
    if (!/<main class="doc" id="main" tabindex="-1">/.test(main)) problems.push('<main> must be class="doc" id="main" tabindex="-1"');
    for (const [re, label] of banned) if (re.test(html)) problems.push(label);
    for (const [, cls] of html.matchAll(/class="([^"]*)"/g)) {
        for (const token of cls.split(/\s+/)) if (bannedClasses.has(token)) problems.push(`class "${token}"`);
    }
    // Every relative link, asset and htmx URL must exist.
    for (const [, url] of html.matchAll(/\s(?:href|src|action|hx-get)="([^"#?][^"]*)"/g)) {
        if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
        const file = path.resolve(path.dirname(path.join(pagesDir, page)), url.split(/[?#]/)[0]);
        if (!existsSync(file)) problems.push(`broken link ${url}`);
    }
    // A link out of pages/ (a stylesheet, a template, the KUBU 2.0 demo) is not a docs page, so htmx
    // must not try to swap #frame out of it.
    for (const [tag] of main.matchAll(/<a\b[^>]*href="\.\.\/[^"]*"[^>]*>/g)) {
        if (!tag.includes('hx-boost="false"')) problems.push(`needs hx-boost="false": ${tag}`);
    }
    return problems.map((p) => `pages/${page}: ${p}`);
}

// The opened pages carry these slices. A full page response includes <head>, and the head-support
// extension would replace the title. A fragment has no head, so the title stays.
const previews = [
    ['page-home.html', 'home-preview', 'preview-home.html'],
    ['page-product.html', 'product-preview', 'preview-product.html'],
    ['page-contact.html', 'contact-preview', 'preview-contact.html'],
    ['page-about.html', 'about-preview', 'preview-about.html'],
];

function innerById(html, id) {
    const open = new RegExp(`<([a-zA-Z0-9]+)\\b[^>]*\\bid="${id}"[^>]*>`).exec(html);
    if (!open) throw new Error(`missing #${id}`);
    const tag = open[1];
    const re = new RegExp(`<${tag}\\b|</${tag}>`, 'g');
    re.lastIndex = open.index;
    let depth = 0;
    for (let hit; (hit = re.exec(html)); ) {
        depth += hit[0].startsWith('</') ? -1 : 1;
        if (depth === 0) return html.slice(open.index + open[0].length, hit.index).trim();
    }
    throw new Error(`unclosed #${id}`);
}

function writePreviews() {
    const templates = path.resolve(pagesDir, '../templates');
    for (const [page, id, file] of previews) {
        const html = readFileSync(path.join(pagesDir, page), 'utf8');
        writeFileSync(path.join(templates, file), innerById(html, id) + '\n');
    }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const strict = process.argv.includes('--check');
    const problems = [];
    writePreviews();
    for (const page of allPages) {
        const file = path.join(pagesDir, page);
        if (!existsSync(file)) {
            problems.push(`missing page: pages/${page}`);
            continue;
        }
        const html = stamp(page, readFileSync(file, 'utf8'));
        writeFileSync(file, html);
        if (strict) problems.push(...check(page, html));
    }
    if (strict) {
        const walk = (dir, prefix = '') => {
            for (const name of readdirSync(dir)) {
                const full = path.join(dir, name);
                const rel = prefix ? `${prefix}/${name}` : name;
                if (statSync(full).isDirectory()) {
                    if (prefix || name !== 'showcase') problems.push(`pages/${rel}/ is not a showcase folder`);
                    else walk(full, name);
                } else if (name.endsWith('.html') && !allPages.includes(rel)) problems.push(`pages/${rel} is not in scripts/site.mjs`);
            }
        };
        walk(pagesDir);
    }
    problems.forEach((p) => console.error(p));
    console.log(`${allPages.length} pages stamped${strict ? `, ${problems.length} problem(s)` : ''}`);
    if (problems.length) process.exit(1);
}
