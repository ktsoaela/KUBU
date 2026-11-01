import { html, money, moneyShort, monthName, ago, day, icon, initials } from '../lib/html.mjs';
import { db, total, invoiceState, account } from '../lib/db.mjs';
import { pageHead, statusBadge } from '../lib/layout.mjs';

const DAY = 86_400_000;
const PLAN_ORDER = ['Enterprise', 'Growth', 'Starter'];

function revenueByMonth(count) {
    const now = new Date();
    const months = [];
    for (let back = count - 1; back >= 0; back--) {
        const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - back, 1));
        months.push({ year: d.getUTCFullYear(), month: d.getUTCMonth(), amount: 0, count: 0 });
    }
    for (const inv of db.invoices) {
        if (!inv.paidOn) continue;
        const d = new Date(inv.paidOn);
        const slot = months.find((m) => m.year === d.getUTCFullYear() && m.month === d.getUTCMonth());
        if (slot) { slot.amount += total(inv); slot.count++; }
    }
    return months;
}

// Payments up to the same day of the month, this month and last, so the change is like for like.
function monthToDate() {
    const now = new Date();
    const dayOfMonth = now.getUTCDate();
    const sum = (offset) => db.invoices.reduce((s, inv) => {
        if (!inv.paidOn) return s;
        const d = new Date(inv.paidOn);
        const target = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - offset, 1));
        const same = d.getUTCFullYear() === target.getUTCFullYear() && d.getUTCMonth() === target.getUTCMonth() && d.getUTCDate() <= dayOfMonth;
        return same ? s + total(inv) : s;
    }, 0);
    const last = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
    const lastTotal = db.invoices.reduce((s, inv) => {
        if (!inv.paidOn) return s;
        const d = new Date(inv.paidOn);
        return d.getUTCFullYear() === last.getUTCFullYear() && d.getUTCMonth() === last.getUTCMonth() ? s + total(inv) : s;
    }, 0);
    return { now: sum(0), before: sum(1), lastMonth: monthName(last.getUTCMonth()), lastTotal };
}

// ---- pieces --------------------------------------------------------------------------------

// A card head: a tinted icon, the title, and an optional link or control on the right.
function head(id, title, glyph, tone, aside = '') {
    return html`
    <header class="card__header panel-head">
        <h2 class="card__title panel-head__title" id="${id}"><span class="panel-head__icon panel-head__icon--${tone}">${icon(glyph)}</span>${title}</h2>
        ${aside}
    </header>`;
}

function change(now, before, versus, fallback) {
    if (!before) return fallback;
    const pct = Math.round((now - before) / before * 100);
    const up = pct >= 0;
    return html`<span class="delta ${up ? 'delta--up' : 'delta--down'}"><span aria-hidden="true">${up ? '▲' : '▼'}</span> ${up ? '+' : '−'}${Math.abs(pct)}%<span class="visually-hidden"> ${versus}</span></span>`;
}

function kpi({ label, value, pill, href, glyph, tone }) {
    return html`
    <a class="kpi kpi--${tone} col-12 sm:col-6 lg:col-3" href="${href}">
        <span class="kpi__icon">${icon(glyph)}</span>
        <span class="kpi__body">
            <span class="kpi__label">${label}</span>
            <span class="kpi__value">${value}</span>
        </span>
        <span class="kpi__pill">${pill}</span>
    </a>`;
}

function metric({ value, label, glyph, tone, note, href, link }) {
    return html`
    <article class="card metric col-12 sm:col-6 lg:col-3">
        <div class="metric__top">
            <div>
                <p class="metric__value">${value}</p>
                <p class="metric__label">${label}</p>
            </div>
            <span class="panel-head__icon panel-head__icon--${tone}">${icon(glyph)}</span>
        </div>
        <footer class="metric__foot">
            <span>${note}</span>
            <a href="${href}">${link}</a>
        </footer>
    </article>`;
}

// Single series, so the title names it and there is no legend. Each bar carries its value as a
// hover label over a pale full-height track, and the same numbers sit in a table one click away.
function revenueChart(months) {
    const max = Math.max(...months.map((m) => m.amount), 1);
    const step = 10 ** Math.floor(Math.log10(max));
    const top = Math.ceil(max / step) * step;
    const ticks = [1, 0.75, 0.5, 0.25, 0].map((f) => top * f);
    return html`
    <figure class="chart">
        <figcaption class="visually-hidden">Payments received per month, last ${months.length} months</figcaption>
        <div class="chart__plot">
            <ol class="chart__axis" aria-hidden="true">${ticks.map((t) => html`<li>${moneyShort(t)}</li>`)}</ol>
            <ol class="chart__bars">
                ${months.map((m, i) => html`<li class="chart__col${i === months.length - 1 ? ' chart__col--now' : ''}" style="--v: ${(m.amount / top * 100).toFixed(1)}%">
                    <span class="chart__bar" tabindex="0"><span class="chart__tip">${monthName(m.month)} ${m.year}: ${money(m.amount)}</span></span>
                    <span class="chart__label" aria-hidden="true">${monthName(m.month).slice(0, 3)}</span>
                </li>`)}
            </ol>
        </div>
        <details class="chart__table">
            <summary>Show as a table</summary>
            <table class="table table--small">
                <thead class="table__header"><tr><th class="table__header-cell" scope="col">Month</th><th class="table__header-cell table__cell--align-right" scope="col">Invoices paid</th><th class="table__header-cell table__cell--align-right" scope="col">Received</th></tr></thead>
                <tbody>${months.map((m) => html`<tr class="table__row"><td class="table__cell">${monthName(m.month)} ${m.year}</td><td class="table__cell table__cell--align-right">${m.count}</td><td class="table__cell table__cell--align-right">${money(m.amount)}</td></tr>`)}</tbody>
            </table>
        </details>
    </figure>`;
}

// Plan mix as a ring. Three slots, validated for colour-blind separation in both themes, with a 2px
// surface gap between segments and a legend that names every slice with its count and share.
function planRing(byPlan, of) {
    let at = 0;
    const stops = [];
    byPlan.forEach(([plan, n], i) => {
        const share = n / of * 100;
        const end = at + share;
        stops.push(`var(--series-${i + 1}) ${at.toFixed(2)}% ${(end - 0.8).toFixed(2)}%`, `var(--kubu-surface) ${(end - 0.8).toFixed(2)}% ${end.toFixed(2)}%`);
        at = end;
    });
    const label = byPlan.map(([plan, n]) => `${plan} ${n}`).join(', ');
    return html`
    <div class="ring">
        <div class="ring__chart" role="img" aria-label="Paying accounts by plan: ${label}" style="--ring: conic-gradient(${stops.join(', ')})">
            <span class="ring__centre"><span class="ring__total">${of}</span><span class="ring__caption">paying</span></span>
        </div>
        <ul class="ring__legend list-unstyled">
            ${byPlan.map(([plan, n], i) => html`<li class="ring__item"><span class="ring__key ring__key--${i + 1}" aria-hidden="true"></span><span class="ring__name">${plan}</span><span class="ring__value">${n}</span><span class="ring__share">${Math.round(n / of * 100)}%</span></li>`)}
        </ul>
    </div>`;
}

function rows(items, empty) {
    if (!items.length) return html`<p class="muted">${empty}</p>`;
    return html`<ul class="rows list-unstyled">${items}</ul>`;
}

function invoiceTable(list, empty) {
    if (!list.length) return html`<p class="muted panel-pad">${empty}</p>`;
    return html`
    <div class="table-container">
        <table class="table table--small">
            <thead class="table__header"><tr><th class="table__header-cell" scope="col">Invoice</th><th class="table__header-cell" scope="col">Account</th><th class="table__header-cell" scope="col">Due</th><th class="table__header-cell" scope="col">Status</th><th class="table__header-cell table__cell--align-right" scope="col">Total</th></tr></thead>
            <tbody>${list.map((i) => {
                const a = account(i.accountId);
                return html`<tr class="table__row">
                    <td class="table__cell"><a href="/invoices/${i.id}">${i.number}</a></td>
                    <td class="table__cell"><span class="who"><span class="who__mark" aria-hidden="true">${initials(a.name.replace(/^Acme /, ''))}</span>${a.name}</span></td>
                    <td class="table__cell">${day(i.due)}</td>
                    <td class="table__cell">${statusBadge(invoiceState(i))}</td>
                    <td class="table__cell table__cell--align-right"><strong>${money(total(i))}</strong></td>
                </tr>`;
            })}</tbody>
        </table>
    </div>`;
}

// ---- the screen ----------------------------------------------------------------------------

export function dashboard(ctx) {
    const range = ctx.url.searchParams.get('range') === '6' ? 6 : 12;
    const active = db.accounts.filter((a) => a.status === 'active');
    const trials = db.accounts.filter((a) => a.status === 'trial');
    const mrr = active.reduce((s, a) => s + a.mrr, 0);
    const states = db.invoices.map((i) => [i, invoiceState(i)]);
    const of = (state) => states.filter(([, s]) => s === state).map(([i]) => i);
    const overdue = of('overdue');
    const open = of('sent');
    const drafts = of('draft');
    const paid = of('paid');
    const sum = (list) => list.reduce((s, i) => s + total(i), 0);
    const months = revenueByMonth(range);
    const received = sum(paid.filter((i) => Date.now() - new Date(i.paidOn).getTime() < range * 30.4 * DAY));
    const best = months.reduce((b, m) => (m.amount > b.amount ? m : b), months[0]);
    const mtd = monthToDate();
    const atRisk = active.filter((a) => a.health < 60).sort((a, b) => a.health - b.health);
    const byPlan = PLAN_ORDER.map((plan) => [plan, active.filter((a) => a.plan === plan).length]);
    const top = [...active].sort((a, b) => b.mrr - a.mrr).slice(0, 5);
    const latestPaid = [...paid].sort((a, b) => b.paidOn.localeCompare(a.paidOn)).slice(0, 5);
    const dueSoon = open.filter((i) => new Date(i.due).getTime() - Date.now() < 14 * DAY).sort((a, b) => a.due.localeCompare(b.due));
    const yearAgo = new Date(Date.now() - 365 * DAY);

    const body = html`
    ${pageHead({
        title: html`Welcome back, ${ctx.user.role}`,
        lead: html`You have <strong class="accent-text">${open.length + overdue.length} invoices</strong> waiting for payment today.`,
        actions: html`<span class="date-chip">${icon('calendar')} ${day(yearAgo.toISOString())} – ${day(new Date().toISOString())}</span><a class="button button--outline" href="/accounts.csv" hx-boost="false">${icon('download')} Export</a><a class="button button--primary" href="/invoices/new">${icon('plus')} New invoice</a>`,
    })}

    ${overdue.length ? html`
    <details class="alert alert--warning notice" open>
        <summary class="alert-close" aria-label="Dismiss message">&times;</summary>
        <p><strong>${overdue.length} invoices are overdue</strong>, worth ${money(sum(overdue))}. <a href="/invoices?status=overdue">Review them</a></p>
    </details>` : ''}

    <div class="grid kpis">
        ${kpi({ label: 'Monthly recurring revenue', value: money(mrr), pill: `${active.length} accounts`, href: '/accounts?status=active', glyph: 'copy', tone: 'orange' })}
        ${kpi({ label: 'Received this month', value: money(mtd.now), pill: change(mtd.now, mtd.before, `compared with the same days of ${mtd.lastMonth}`, html`${mtd.lastMonth} total: ${moneyShort(mtd.lastTotal)}`), href: '/invoices?status=paid', glyph: 'check', tone: 'teal' })}
        ${kpi({ label: 'Waiting for payment', value: money(sum(open)), pill: `${open.length} sent`, href: '/invoices?status=sent', glyph: 'mail', tone: 'navy' })}
        ${kpi({ label: 'Overdue', value: money(sum(overdue)), pill: `${overdue.length} invoices`, href: '/invoices?status=overdue', glyph: 'alert', tone: 'red' })}
    </div>

    <div class="grid">
        ${metric({ value: money(received), label: `Received, last ${range} months`, glyph: 'download', tone: 'teal', note: `${paid.length} invoices paid`, href: '/invoices?status=paid', link: 'View all' })}
        ${metric({ value: money(paid.length ? sum(paid) / paid.length : 0), label: 'Average invoice', glyph: 'copy', tone: 'blue', note: 'VAT included', href: '/invoices', link: 'View all' })}
        ${metric({ value: String(trials.length), label: 'Trials running', glyph: 'user', tone: 'orange', note: 'Convert before day 30', href: '/accounts?status=trial', link: 'View all' })}
        ${metric({ value: String(atRisk.length), label: 'Accounts at risk', glyph: 'heart', tone: 'red', note: 'Health below 60', href: '/accounts?sort=health&dir=asc', link: 'View all' })}
    </div>

    <div class="grid">
        <section class="card panel col-12 lg:col-8" aria-labelledby="rev-title">
            ${head('rev-title', 'Revenue', 'star', 'orange', html`
            <nav class="segmented" aria-label="Chart range">
                ${[[6, '6M'], [12, '1Y']].map(([n, label]) => html`<a class="segmented__item" href="/?range=${n}"${range === n ? html` aria-current="true"` : ''}><span class="visually-hidden">Last </span>${label}<span class="visually-hidden">${n === 6 ? ' months' : 'ear'}</span></a>`)}
            </nav>`)}
            <div class="figures">
                <p class="figures__item"><span class="figures__label">Received</span><span class="figures__value">${money(received)}</span></p>
                <p class="figures__item"><span class="figures__label">Best month</span><span class="figures__value">${monthName(best.month).slice(0, 3)} ${best.year} · ${moneyShort(best.amount)}</span></p>
                <p class="figures__item"><span class="figures__label">Monthly average</span><span class="figures__value">${moneyShort(months.reduce((s, m) => s + m.amount, 0) / months.length)}</span></p>
            </div>
            ${revenueChart(months)}
        </section>

        <section class="card panel col-12 lg:col-4" aria-labelledby="info-title">
            ${head('info-title', 'Overall information', 'info', 'blue')}
            <div class="tiles">
                <a class="tile" href="/accounts">${icon('user', 'tile__icon tile__icon--blue')}<span class="tile__label">Accounts</span><span class="tile__value">${db.accounts.length}</span></a>
                <a class="tile" href="/team">${icon('heart', 'tile__icon tile__icon--orange')}<span class="tile__label">Team</span><span class="tile__value">${db.team.length}</span></a>
                <a class="tile" href="/invoices">${icon('copy', 'tile__icon tile__icon--teal')}<span class="tile__label">Invoices</span><span class="tile__value">${db.invoices.length}</span></a>
            </div>
            <h3 class="panel__sub">Plan mix</h3>
            ${planRing(byPlan, active.length)}
            <h3 class="panel__sub">System status <span class="spinner spinner--small htmx-indicator" id="status-spinner" aria-hidden="true"></span></h3>
            <div id="status" ${ctx.prefs.nojs ? '' : html`hx-get="/status" hx-trigger="every 15s" hx-select="#status" hx-target="this" hx-swap="outerHTML" hx-push-url="false" hx-indicator="#status-spinner"`}>
                ${statusPanel()}
            </div>
        </section>
    </div>

    <div class="grid">
        <section class="card panel col-12 lg:col-4" aria-labelledby="top-title">
            ${head('top-title', 'Top accounts', 'star', 'orange', html`<a href="/accounts?sort=mrr&amp;dir=desc">View all</a>`)}
            ${rows(top.map((a) => html`
            <li class="row">
                <span class="row__mark row__mark--orange" aria-hidden="true">${initials(a.name.replace(/^Acme /, ''))}</span>
                <span class="row__main"><a class="row__title" href="/accounts/${a.id}">${a.name}</a><span class="row__meta">${a.plan} <span aria-hidden="true">•</span> ${a.seats} seats</span></span>
                <span class="row__end"><strong>${money(a.mrr)}</strong><span class="row__meta">a month</span></span>
            </li>`), 'No paying accounts yet.')}
        </section>
        <section class="card panel col-12 lg:col-4" aria-labelledby="risk-title">
            ${head('risk-title', 'Accounts at risk', 'alert', 'red', html`<a href="/accounts?sort=health&amp;dir=asc">View all</a>`)}
            ${rows(atRisk.slice(0, 5).map((a) => html`
            <li class="row">
                <span class="row__mark row__mark--red" aria-hidden="true">${initials(a.name.replace(/^Acme /, ''))}</span>
                <span class="row__main"><a class="row__title" href="/accounts/${a.id}">${a.name}</a><span class="row__meta">${a.industry} <span aria-hidden="true">•</span> ${money(a.mrr)}</span></span>
                <span class="row__end">${healthBar(a.health)}</span>
            </li>`), 'Every paying account is healthy.')}
        </section>
        <section class="card panel col-12 lg:col-4" aria-labelledby="paid-title">
            ${head('paid-title', 'Recent payments', 'check', 'teal', html`<a href="/invoices?status=paid">View all</a>`)}
            ${rows(latestPaid.map((i) => html`
            <li class="row">
                <span class="row__mark row__mark--teal" aria-hidden="true">${icon('check')}</span>
                <span class="row__main"><a class="row__title" href="/invoices/${i.id}">${account(i.accountId).name}</a><span class="row__meta">${i.number}</span></span>
                <span class="row__end"><strong>${money(total(i))}</strong><span class="row__meta">${day(i.paidOn)}</span></span>
            </li>`), 'No payments yet.')}
        </section>
    </div>

    <div class="grid">
        <section class="card panel panel--flush col-12 lg:col-8" aria-labelledby="inv-title">
            ${head('inv-title', 'Invoices to watch', 'copy', 'blue', html`<a href="/invoices">View all</a>`)}
            <div class="tabs tabs--line" role="group" aria-label="Invoices to watch">
                <input class="tabs__input" type="radio" name="watch" id="watch-due" checked>
                <label class="tabs__tab" for="watch-due">Due in 14 days <span class="badge">${dueSoon.length}</span></label>
                <div class="tabs__panel">${invoiceTable(dueSoon.slice(0, 6), 'Nothing falls due in the next two weeks.')}</div>
                <input class="tabs__input" type="radio" name="watch" id="watch-overdue">
                <label class="tabs__tab" for="watch-overdue">Overdue <span class="badge badge--danger">${overdue.length}</span></label>
                <div class="tabs__panel">${invoiceTable([...overdue].sort((a, b) => a.due.localeCompare(b.due)).slice(0, 6), 'Nothing is overdue.')}</div>
                <input class="tabs__input" type="radio" name="watch" id="watch-paid">
                <label class="tabs__tab" for="watch-paid">Paid</label>
                <div class="tabs__panel">${invoiceTable(latestPaid, 'No payments yet.')}</div>
                <input class="tabs__input" type="radio" name="watch" id="watch-draft">
                <label class="tabs__tab" for="watch-draft">Drafts <span class="badge">${drafts.length}</span></label>
                <div class="tabs__panel">${invoiceTable(drafts, 'No drafts.')}</div>
            </div>
        </section>
        <section class="card panel col-12 lg:col-4" aria-labelledby="act-title">
            ${head('act-title', 'Latest activity', 'calendar', 'orange', html`<a href="/activity">View all</a>`)}
            ${activity(db.audit.slice(0, 4))}
        </section>
    </div>`;

    return {
        title: 'Dashboard',
        body,
        built: [
            ['Revenue chart', 'An ordered list with a CSS custom property per bar; values in a <details> table'],
            ['Chart range 6M / 1Y', 'Two links with aria-current; the server draws the range'],
            ['Plan mix ring', 'A conic-gradient with role="img" and a legend that names every slice'],
            ['Invoices to watch', 'Radio tabs: four panels, no script'],
            ['Dismissible alert', '<details open> with the summary as the close button'],
            ['System status, refreshed every 15 seconds', 'htmx polling one region; without JavaScript it is a snapshot'],
            ['Add new, alerts and user menus', '<details class="dropdown">'],
        ],
    };
}

export function healthBar(health) {
    const tone = health < 40 ? 'danger' : health < 60 ? 'hazard' : 'safe';
    const word = health < 40 ? 'Poor' : health < 60 ? 'Fair' : 'Good';
    return html`<span class="health health--${tone}"><span class="health__track" aria-hidden="true"><span class="health__fill" style="width: ${health}%"></span></span><span class="health__text">${word}, ${health}</span></span>`;
}

export function activity(items) {
    if (!items.length) return html`<p>No activity yet.</p>`;
    return html`<ol class="timeline">${items.map((e) => html`
        <li class="timeline__item">
            <time class="timeline__date" datetime="${e.at}">${ago(e.at)}</time>
            <p class="timeline__title"><span class="avatar avatar--sm" aria-hidden="true">${initials(e.actor)}</span> ${e.actor} ${e.action} ${e.href ? html`<a href="${e.href}">${e.target}</a>` : e.target}</p>
        </li>`)}</ol>`;
}

export function statusPanel() {
    const t = Date.now();
    const latency = 38 + Math.round(Math.abs(Math.sin(t / 60000)) * 40);
    const queue = Math.round(Math.abs(Math.cos(t / 45000)) * 12);
    return html`
    <ul class="list-unstyled status">
        <li><span class="presence presence--on"><span class="presence__dot" aria-hidden="true"></span>API</span><span>${latency} ms</span></li>
        <li><span class="presence ${queue > 9 ? 'presence--away' : 'presence--on'}"><span class="presence__dot" aria-hidden="true"></span>Billing queue</span><span>${queue} waiting</span></li>
        <li><span class="presence presence--on"><span class="presence__dot" aria-hidden="true"></span>Payments gateway</span><span>Up</span></li>
    </ul>
    <p class="stat__note">Checked <time datetime="${new Date(t).toISOString()}">${new Date(t).toISOString().slice(11, 19)} UTC</time></p>`;
}
