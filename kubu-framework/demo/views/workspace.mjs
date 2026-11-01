import { html, raw, money, day, icon, initials, plural } from '../lib/html.mjs';
import { db, total, invoiceState, member, log } from '../lib/db.mjs';
import { pageHead, statusBadge, field } from '../lib/layout.mjs';
import { activity as timeline } from './dashboard.mjs';

export function settings(ctx, { values, errors = {} } = {}) {
    const v = values || db.settings;
    const body = html`
    ${pageHead({ title: 'Settings', lead: 'The workspace, how you see it, and who you are signed in as.' })}
    <div class="grid">
        <nav class="col-12 lg:col-3" aria-label="Settings sections">
            <ul class="list-group list-group--panel settings-nav">
                <li><a class="list-group-item" href="#workspace">Workspace</a></li>
                <li><a class="list-group-item" href="#appearance">Appearance</a></li>
                <li><a class="list-group-item" href="#notifications">Notifications</a></li>
                <li><a class="list-group-item" href="#signin">Sign in as</a></li>
                <li><a class="list-group-item" href="#danger">Demo data</a></li>
            </ul>
        </nav>
        <div class="col-12 lg:col-9">
            <section class="card" id="workspace" aria-labelledby="ws-title">
                <h2 class="card__title" id="ws-title">Workspace</h2>
                <form class="form-container" action="/settings" method="post" novalidate>
                    <div class="grid">
                        <div class="col-12 md:col-6">${field({ id: 's-company', name: 'company', label: 'Company name', hint: 'required', value: v.company, error: errors.company, required: true })}</div>
                        <div class="col-12 md:col-6">${field({ id: 's-email', name: 'email', label: 'Billing email', hint: 'required', type: 'email', value: v.email, error: errors.email, required: true })}</div>
                        <div class="col-12 md:col-6">${field({ id: 's-currency', name: 'currency', label: 'Currency', value: v.currency, options: ['ZAR', 'LSL', 'BWP', 'USD'] })}</div>
                    </div>
                    <fieldset class="form-section" id="notifications">
                        <legend class="card__title">Notifications</legend>
                        ${[['weeklyDigest', 'Send me a weekly digest on Monday morning'], ['overdueAlerts', 'Email the account owner when an invoice becomes overdue'], ['twoFactor', 'Require two-factor sign-in for everyone']].map(([key, label]) => html`
                        <label class="setting"><input class="toggle" type="checkbox" name="${key}" value="on"${v[key] ? raw(' checked') : ''}> <span>${label}</span></label>`)}
                    </fieldset>
                    <div class="form-actions"><button class="button button--primary" type="submit">Save settings</button></div>
                </form>
            </section>

            <section class="card" id="appearance" aria-labelledby="ap-title">
                <h2 class="card__title" id="ap-title">Appearance</h2>
                <p>KUBU is dark-first: every colour is a <code>light-dark()</code> token, so one attribute re-themes every component. The server writes it into the page, so there is no flash of the wrong theme and no script.</p>
                <form action="/prefs" method="post" hx-boost="false">
                    <input type="hidden" name="back" value="/settings#appearance">
                    <fieldset class="chips">
                        <legend class="form-label">Theme</legend>
                        ${[['auto', 'Follow my system'], ['dark', 'Dark'], ['light', 'Light']].map(([value, label]) => html`<label class="chips__chip">${label}<input class="chips__input" type="radio" name="theme" value="${value}"${ctx.prefs.theme === value ? raw(' checked') : ''}></label>`)}
                    </fieldset>
                    <button class="button button--outline mt-2" type="submit">Use this theme</button>
                </form>
                <div class="grid mt-4">
                    <article class="card card--light col-12 md:col-6"><h3 class="card__title">Always light</h3><p>A card with <code>.card--light</code> keeps the light scheme on a dark page.</p></article>
                    <article class="card card--dark col-12 md:col-6"><h3 class="card__title">Always dark</h3><p>And <code>.card--dark</code> keeps the dark one.</p></article>
                </div>
            </section>

            <section class="card" id="signin" aria-labelledby="as-title">
                <h2 class="card__title" id="as-title">Sign in as</h2>
                <p>Try the console as another role. The server hides what that role may not do, and refuses it if the request is sent anyway.</p>
                <form action="/prefs" method="post" hx-boost="false">
                    <input type="hidden" name="back" value="/">
                    <div class="form-group">
                        <label class="form-label" for="as-user">Person</label>
                        <select class="form-select" id="as-user" name="as">
                            ${db.team.map((m) => html`<option value="${m.id}"${m.id === ctx.user.id ? raw(' selected') : ''}>${m.name}, ${m.role}</option>`)}
                        </select>
                    </div>
                    <button class="button button--outline" type="submit">Switch person</button>
                </form>
            </section>

            <section class="card danger-zone" id="danger" aria-labelledby="dz-title">
                <h2 class="card__title" id="dz-title">Demo data</h2>
                <p>Put every account, invoice and person back the way the demo started. Your theme and JavaScript choice stay.</p>
                <button class="button button--danger" type="button" commandfor="reset-dialog" command="show-modal">Reset the demo data</button>
                <dialog class="modal" id="reset-dialog" aria-labelledby="reset-title">
                    <header class="modal__header">
                        <h2 class="modal__title" id="reset-title">Reset the demo data?</h2>
                        <form method="dialog"><button class="modal__close" aria-label="Close">&times;</button></form>
                    </header>
                    <div class="modal__body"><p>Everything you created or changed in this session is lost.</p></div>
                    <footer class="modal__footer">
                        <form method="dialog"><button class="button button--outline">Keep my changes</button></form>
                        <form action="/reset" method="post"><button class="button button--danger" type="submit">Reset everything</button></form>
                    </footer>
                </dialog>
            </section>
        </div>
    </div>`;
    return {
        title: 'Settings',
        status: Object.keys(errors).length ? 422 : 200,
        body,
        built: [
            ['Section menu', '.list-group--panel with in-page links'],
            ['Switches', '<input type="checkbox" class="toggle">'],
            ['Theme', 'A cookie read by the server, written as data-theme on <html>'],
            ['Fixed-scheme cards', '.card--light and .card--dark set color-scheme on one element'],
            ['Reset confirmation', '<dialog> with commandfor'],
        ],
    };
}

export function saveSettings(ctx, params) {
    const values = {
        company: (params.get('company') || '').trim(),
        email: (params.get('email') || '').trim(),
        currency: params.get('currency') || 'ZAR',
        weeklyDigest: params.get('weeklyDigest') === 'on',
        overdueAlerts: params.get('overdueAlerts') === 'on',
        twoFactor: params.get('twoFactor') === 'on',
    };
    const errors = {};
    if (values.company.length < 2) errors.company = 'Enter the company name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) errors.email = 'Enter an email address with an @ and a dot.';
    if (Object.keys(errors).length) return { values, errors };
    Object.assign(db.settings, values);
    log(ctx.user.name, 'updated', 'workspace settings', '/settings');
    return null;
}

export function activityPage(ctx) {
    const who = ctx.url.searchParams.get('who') || 'all';
    const items = db.audit.filter((e) => who === 'all' || e.actor === who);
    const actors = [...new Set(db.audit.map((e) => e.actor))];
    return {
        title: 'Activity',
        body: html`
        ${pageHead({ title: 'Activity', lead: 'Every change, who made it and when. Kept for the life of the demo.' })}
        <form class="toolbar" action="/activity" method="get"${ctx.prefs.nojs ? '' : raw(' hx-get="/activity" hx-trigger="change" hx-push-url="true"')}>
            <label class="form-label" for="who">Person</label>
            <select class="form-select" id="who" name="who">
                <option value="all">Everyone</option>
                ${actors.map((a) => html`<option${a === who ? raw(' selected') : ''}>${a}</option>`)}
            </select>
            <button class="button button--outline" type="submit">Show</button>
            <p class="toolbar__count">${plural(items.length, 'event')}</p>
        </form>
        <section class="card">${timeline(items.slice(0, 50))}</section>`,
        built: [['Audit trail', '.timeline, an ordered list of <time> and text'], ['Filter', 'A GET form; htmx sends it on change']],
    };
}

export function searchPage(ctx) {
    const q = (ctx.url.searchParams.get('q') || '').trim();
    const needle = q.toLowerCase();
    const accounts = needle ? db.accounts.filter((a) => [a.name, a.city, a.industry, ...a.contacts.map((c) => `${c.name} ${c.email}`)].some((s) => s.toLowerCase().includes(needle))) : [];
    const invoices = needle ? db.invoices.filter((i) => i.number.toLowerCase().includes(needle)) : [];
    const people = needle ? db.team.filter((m) => `${m.name} ${m.email} ${m.title}`.toLowerCase().includes(needle)) : [];
    const count = accounts.length + invoices.length + people.length;
    return {
        title: q ? `Search: ${q}` : 'Search',
        body: html`
        ${pageHead({ title: q ? html`Results for “${q}”` : 'Search', lead: q ? `${plural(count, 'result')}.` : 'Type in the search box above and press Enter.' })}
        ${accounts.length ? html`<section class="card"><h2 class="card__title">Accounts (${accounts.length})</h2><ul class="list-group">${accounts.slice(0, 20).map((a) => html`<li class="list-group-item"><span class="avatar-label"><span class="avatar avatar--sm" aria-hidden="true">${initials(a.name)}</span><a href="/accounts/${a.id}">${a.name}</a> ${statusBadge(a.status)} <small class="muted">${a.city}</small></span></li>`)}</ul></section>` : ''}
        ${invoices.length ? html`<section class="card"><h2 class="card__title">Invoices (${invoices.length})</h2><ul class="list-group">${invoices.slice(0, 20).map((i) => html`<li class="list-group-item"><a href="/invoices/${i.id}">${i.number}</a> ${statusBadge(invoiceState(i))} ${money(total(i))}, ${day(i.issued)}</li>`)}</ul></section>` : ''}
        ${people.length ? html`<section class="card"><h2 class="card__title">People (${people.length})</h2><ul class="list-group">${people.map((m) => html`<li class="list-group-item"><span class="avatar-label"><span class="avatar avatar--sm" aria-hidden="true">${initials(m.name)}</span><a href="/team">${m.name}</a> <small class="muted">${m.title}</small></span></li>`)}</ul></section>` : ''}
        ${q && !count ? html`<div class="alert alert--info" role="status"><p>Nothing matches “${q}”. Try a company name, a city, or an invoice number like INV-${new Date().getUTCFullYear()}.</p></div>` : ''}`,
        built: [['Global search', 'A GET form in the top bar; results are an ordinary page with a shareable URL']],
    };
}

export function forbidden(ctx, what) {
    return {
        title: 'Not allowed',
        status: 403,
        body: html`
        ${pageHead({ title: 'You cannot do that', lead: `${ctx.user.name} is signed in as ${ctx.user.role}.` })}
        <div class="alert alert--warning" role="alert"><p>The ${ctx.user.role} role may not ${what}. Ask an owner or admin, or <a href="/settings#signin">sign in as someone else</a>.</p></div>`,
    };
}

export function notFound() {
    return {
        title: 'Not found',
        status: 404,
        body: html`
        ${pageHead({ title: 'That page is not here', lead: 'It may have been deleted, or the address has a typo.' })}
        <p><a class="button button--primary" href="/">${icon('home')} Back to the dashboard</a></p>`,
    };
}

export { member };
