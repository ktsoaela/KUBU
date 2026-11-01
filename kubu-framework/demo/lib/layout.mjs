import { html, icon } from './html.mjs';
import { db, invoiceState } from './db.mjs';

const nav = [
    ['Workspace', [
        ['/', 'Dashboard', 'home'],
        ['/accounts', 'Accounts', 'user', () => db.accounts.filter((a) => a.status !== 'churned').length],
        ['/invoices', 'Invoices', 'copy', () => db.invoices.filter((i) => invoiceState(i) === 'overdue').length, 'badge--danger'],
        ['/team', 'Team', 'heart'],
        ['/activity', 'Activity', 'calendar'],
    ]],
    ['Configure', [
        ['/settings', 'Settings', 'edit'],
    ]],
    ['Why KUBU', [
        ['/why-kubu', 'Compare frameworks', 'star'],
        ['/no-js', 'Run without JavaScript', 'code'],
    ]],
];

function current(path, href) {
    if (href === '/') return path === '/';
    return path === href || path.startsWith(`${href}/`);
}

// How a page is built: a list the reader can open under every screen, so the difference from a
// JavaScript component kit is visible where it happens, not only on the comparison page.
function inspector(ctx, built) {
    if (!built?.length) return '';
    return html`
    <details class="collapse-details inspector">
        <summary>${icon('code')} How this screen is built</summary>
        <p>Every control below is native HTML styled by <code>kubu.min.css</code>. ${ctx.prefs.nojs ? 'JavaScript is off for this session, and the screen still works.' : 'htmx only swaps the page region; turn it off on the Run without JavaScript page and the screen still works.'}</p>
        <table class="table table--small">
            <thead class="table__header"><tr><th class="table__header-cell" scope="col">What you see</th><th class="table__header-cell" scope="col">What runs it</th><th class="table__header-cell" scope="col">Component JavaScript</th></tr></thead>
            <tbody>${built.map(([what, how]) => html`<tr class="table__row"><td class="table__cell">${what}</td><td class="table__cell">${how}</td><td class="table__cell">0 bytes</td></tr>`)}</tbody>
        </table>
    </details>`;
}

export function layout(ctx, { title, body, built }) {
    const { prefs, user, path } = ctx;
    const theme = prefs.theme === 'auto' ? '' : prefs.theme;
    const overdue = db.invoices.filter((i) => invoiceState(i) === 'overdue');
    const toast = ctx.flash ? html`<div class="toast toast-${ctx.flash.tone === 'error' ? 'error' : ctx.flash.tone === 'info' ? 'info' : 'success'} app-toast"><p class="toast__body">${ctx.flash.text}</p></div>` : '';

    return html`<!DOCTYPE html>
<html lang="en"${theme ? html` data-theme="${theme}"` : ''}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title} · Acme Corp</title>
    <meta name="description" content="An enterprise console built with KUBU: one CSS file, native HTML, optional htmx.">
    <link rel="icon" href="/kubu/img/hippo-black.svg">
    <link rel="stylesheet" href="/kubu/dist/kubu.min.css">
    <link rel="stylesheet" href="/app/app.css">
    ${prefs.nojs ? '' : html`<meta name="htmx-config" content='{"responseHandling":[{"code":"204","swap":false},{"code":"[23]..","swap":true},{"code":"4..","swap":true,"error":false},{"code":"...","swap":false,"error":true}]}'>
    <script src="/kubu/js/htmx.min.js" defer></script>
    <script src="/kubu/js/htmx-head-support.min.js" defer></script>
    <script src="/app/app.js" defer></script>`}
</head>
<body${prefs.nojs ? '' : html` hx-boost="true" hx-ext="head-support" hx-target="#app" hx-select="#app" hx-swap="outerHTML show:window:top" hx-push-url="true" hx-indicator="#app-progress"`}>
<a class="skip-link" href="#main">Skip to content</a>
<div class="app" id="app"${theme ? html` data-theme="${theme}"` : ''}>
    <input class="app__toggle" type="checkbox" id="app-menu">
    <aside class="app__sidebar" aria-label="Console">
        <a class="logo app__logo" href="/"><svg class="logo__mark" width="32" height="32" aria-hidden="true"><use href="/kubu/img/icons.svg#hippo"></use></svg><span>Acme Corp</span></a>
        ${nav.map(([heading, links]) => html`
        <nav class="app-nav" aria-label="${heading}">
            <p class="app-nav__heading">${heading}</p>
            <ul class="list-unstyled">
                ${links.map(([href, label, glyph, count, tone]) => {
                    const n = count ? count() : 0;
                    return html`<li><a class="app-nav__link" href="${href}"${current(path, href) ? html` aria-current="page"` : ''}>${icon(glyph)}<span>${label}</span>${n ? html`<span class="badge ${tone || ''} app-nav__count">${n}<span class="visually-hidden"> ${tone ? 'overdue' : 'open'}</span></span>` : ''}</a></li>`;
                })}
            </ul>
        </nav>`)}
        <div class="app__sidebar-foot">
            <span class="presence ${prefs.nojs ? 'presence--away' : 'presence--on'}"><span class="presence__dot" aria-hidden="true"></span>${prefs.nojs ? 'JavaScript off' : 'htmx on'}</span>
            <a href="/no-js">Change</a>
        </div>
    </aside>
    <label class="app__scrim" for="app-menu" aria-hidden="true"></label>
    <div class="app__body">
        <header class="app__topbar">
            <label class="button button--outline app__menu" for="app-menu">${icon('menu')}<span class="visually-hidden">Menu</span></label>
            <form class="app__search" role="search" action="/search" method="get">
                <label class="visually-hidden" for="global-search">Search accounts, invoices and desks</label>
                <input class="form-input" id="global-search" type="search" name="q" value="${path === '/search' ? ctx.url.searchParams.get('q') || '' : ''}" placeholder="Search accounts, invoices and desks" autocomplete="off">
            </form>
            <form class="button-group app__theme" action="/prefs" method="post" hx-boost="false" aria-label="Colour theme">
                <input type="hidden" name="back" value="${ctx.url.pathname + ctx.url.search}">
                ${[['auto', 'monitor', 'System'], ['dark', 'moon', 'Dark'], ['light', 'sun', 'Light']].map(([value, glyph, label]) => html`<button class="button button--outline" name="theme" value="${value}" aria-pressed="${prefs.theme === value ? 'true' : 'false'}" title="${label} theme">${icon(glyph)}<span class="visually-hidden">${label} theme</span></button>`)}
            </form>
            <details class="dropdown dropdown--end">
                <summary class="button button--outline app__icon-button" aria-label="Alerts, ${overdue.length} overdue">${icon('alert')}${overdue.length ? html`<span class="badge badge--danger">${overdue.length}</span>` : ''}</summary>
                <div class="dropdown-content app__alerts">
                    <p class="app-nav__heading">Alerts</p>
                    ${overdue.length
                        ? html`<p>${overdue.length} invoices are past their due date.</p><a class="button button--primary" href="/invoices?status=overdue">Review overdue invoices</a>`
                        : html`<p>Nothing needs you right now.</p>`}
                </div>
            </details>
            <details class="dropdown dropdown--end">
                <summary class="button button--outline app__user" aria-label="Signed in as ${user.role}"><span class="avatar avatar--sm" aria-hidden="true">${user.role.slice(0, 2).toUpperCase()}</span><span class="app__user-name">${user.role}</span></summary>
                <ul class="dropdown-content">
                    <li><a class="dropdown-item" href="/settings">Settings</a></li>
                    <li><a class="dropdown-item" href="/settings#signin">Sign in as someone else</a></li>
                    <li><a class="dropdown-item" href="/why-kubu">Why KUBU</a></li>
                </ul>
            </details>
        </header>
        <div class="ajax-progress htmx-indicator app__progress" id="app-progress" aria-hidden="true"></div>
        <main class="app__main" id="main" tabindex="-1">
            ${body}
            ${inspector(ctx, built)}
        </main>
        <footer class="app__footer">
            <p>Acme Corp is sample data for <a href="/why-kubu">KUBU 2.0.0</a>. The records reset when the server restarts.</p>
        </footer>
    </div>
    <div class="toast-container" id="toasts" role="status">${toast}</div>
</div>
</body>
</html>`;
}

// A page heading with optional breadcrumb and actions on the right.
export function pageHead({ title, lead, crumbs, actions }) {
    return html`
    ${crumbs ? html`<nav aria-label="Breadcrumb"><ol class="breadcrumb">${crumbs.map(([href, label]) => href
        ? html`<li class="breadcrumb__item"><a class="breadcrumb__link" href="${href}">${label}</a></li>`
        : html`<li class="breadcrumb__item breadcrumb__item--active" aria-current="page">${label}</li>`)}</ol></nav>` : ''}
    <div class="page-head">
        <div>
            <h1 class="title page-head__title">${title}</h1>
            ${lead ? html`<p class="page-head__lead">${lead}</p>` : ''}
        </div>
        ${actions ? html`<div class="page-head__actions">${actions}</div>` : ''}
    </div>`;
}

export function statusBadge(state) {
    const tone = { active: 'safe', paid: 'safe', trial: 'info', sent: 'info', draft: '', overdue: 'danger', churned: 'hazard' }[state] ?? '';
    return html`<span class="badge ${tone ? `badge--${tone}` : ''}">${state}</span>`;
}

export function pagination(url, page, pages) {
    if (pages <= 1) return '';
    const link = (n) => { const u = new URL(url); u.searchParams.set('page', n); return u.pathname + u.search; };
    const items = [];
    for (let n = 1; n <= pages; n++) {
        if (n === 1 || n === pages || Math.abs(n - page) <= 1) items.push(n);
        else if (items.at(-1) !== '…') items.push('…');
    }
    return html`
    <nav aria-label="Pages">
        <ul class="pagination">
            ${page > 1 ? html`<li class="pagination__item"><a class="pagination__link" href="${link(page - 1)}">Previous</a></li>` : ''}
            ${items.map((n) => n === '…'
                ? html`<li class="pagination__item"><span class="pagination__link" aria-hidden="true">…</span></li>`
                : html`<li class="pagination__item"><a class="pagination__link" href="${link(n)}"${n === page ? html` aria-current="page"` : ''}>${n}</a></li>`)}
            ${page < pages ? html`<li class="pagination__item"><a class="pagination__link" href="${link(page + 1)}">Next</a></li>` : ''}
        </ul>
    </nav>`;
}

// A server-side field: label, input, and the error the server found, wired with aria.
export function field({ id, name, label, hint, value = '', type = 'text', error, required, attrs = '', options }) {
    const describedBy = error ? html` aria-invalid="true" aria-describedby="${id}-error"` : '';
    const control = options
        ? html`<select class="form-select" id="${id}" name="${name}"${required ? html` required` : ''}${describedBy}>${options.map((o) => html`<option${String(o) === String(value) ? html` selected` : ''}>${o}</option>`)}</select>`
        : type === 'textarea'
            ? html`<textarea class="form-textarea" id="${id}" name="${name}" rows="3"${describedBy}>${value}</textarea>`
            : html`<input class="form-input" id="${id}" name="${name}" type="${type}" value="${value}"${required ? html` required` : ''}${describedBy} ${attrs}>`;
    return html`
    <div class="form-group">
        <label class="form-label" for="${id}">${label}${hint ? html` <span class="form-label__hint">(${hint})</span>` : ''}</label>
        ${control}
        ${error ? html`<p class="form-error" id="${id}-error">${error}</p>` : ''}
    </div>`;
}
