import { html, money, moneyShort, monthName, ago, day, icon, initials } from '../lib/html.mjs';
import { db, total, invoiceState, account } from '../lib/db.mjs';
import { pageHead, statusBadge } from '../lib/layout.mjs';

function revenueByMonth() {
    const now = new Date();
    const months = [];
    for (let back = 11; back >= 0; back--) {
        const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - back, 1));
        months.push({ year: d.getUTCFullYear(), month: d.getUTCMonth(), amount: 0 });
    }
    for (const inv of db.invoices) {
        if (!inv.paidOn) continue;
        const d = new Date(inv.paidOn);
        const slot = months.find((m) => m.year === d.getUTCFullYear() && m.month === d.getUTCMonth());
        if (slot) slot.amount += total(inv);
    }
    return months;
}

// Single series, so the title names it and there is no legend. Each bar carries its value as a
// hover label, and the same numbers sit in a table one click away.
function revenueChart(months) {
    const max = Math.max(...months.map((m) => m.amount), 1);
    const step = 10 ** Math.floor(Math.log10(max));
    const top = Math.ceil(max / step) * step;
    const ticks = [0, 0.5, 1].map((f) => top * f);
    return html`
    <figure class="chart">
        <figcaption class="chart__title">Payments received, last 12 months</figcaption>
        <div class="chart__plot">
            <ol class="chart__axis" aria-hidden="true">${ticks.reverse().map((t) => html`<li>${moneyShort(t)}</li>`)}</ol>
            <ol class="chart__bars">
                ${months.map((m) => html`<li class="chart__col" style="--v: ${(m.amount / top * 100).toFixed(1)}%">
                    <span class="chart__bar" tabindex="0"><span class="chart__tip">${monthName(m.month)} ${m.year}: ${money(m.amount)}</span></span>
                    <span class="chart__label" aria-hidden="true">${monthName(m.month).slice(0, 3)}</span>
                </li>`)}
            </ol>
        </div>
        <details class="chart__table">
            <summary>Show as a table</summary>
            <table class="table table--small">
                <thead class="table__header"><tr><th class="table__header-cell" scope="col">Month</th><th class="table__header-cell table__cell--align-right" scope="col">Received</th></tr></thead>
                <tbody>${months.map((m) => html`<tr class="table__row"><td class="table__cell">${monthName(m.month)} ${m.year}</td><td class="table__cell table__cell--align-right">${money(m.amount)}</td></tr>`)}</tbody>
            </table>
        </details>
    </figure>`;
}

function stat(label, value, note, href, glyph, tone) {
    return html`
    <a class="card stat col-12 sm:col-6 lg:col-3" href="${href}">
        <span class="stat__mark${tone ? ` stat__mark--${tone}` : ''}">${icon(glyph)}</span>
        <span class="stat__body">
            <span class="stat__label">${label}</span>
            <span class="stat__value">${value}</span>
            <span class="stat__note">${note}</span>
        </span>
    </a>`;
}

export function dashboard(ctx) {
    const active = db.accounts.filter((a) => a.status === 'active');
    const trials = db.accounts.filter((a) => a.status === 'trial');
    const mrr = active.reduce((s, a) => s + a.mrr, 0);
    const states = db.invoices.map((i) => [i, invoiceState(i)]);
    const overdue = states.filter(([, s]) => s === 'overdue').map(([i]) => i);
    const open = states.filter(([, s]) => s === 'sent').map(([i]) => i);
    const months = revenueByMonth();
    const thisMonth = months.at(-1).amount;
    const lastMonth = months.at(-2).amount;
    const atRisk = active.filter((a) => a.health < 60).sort((a, b) => a.health - b.health).slice(0, 5);
    const byPlan = ['Enterprise', 'Growth', 'Starter'].map((plan) => [plan, active.filter((a) => a.plan === plan).length]);

    const body = html`
    ${pageHead({
        title: db.settings.company,
        lead: 'Here is the desk today.',
        actions: html`<a class="button button--outline" href="/accounts.csv" hx-boost="false">${icon('download')} Export accounts</a><a class="button button--primary" href="/invoices/new">${icon('plus')} New invoice</a>`,
    })}

    ${overdue.length ? html`
    <details class="alert alert--warning" open>
        <summary class="alert-close" aria-label="Dismiss message">&times;</summary>
        <p><strong>${overdue.length} invoices are overdue</strong>, worth ${money(overdue.reduce((s, i) => s + total(i), 0))}. <a href="/invoices?status=overdue">Review them</a>.</p>
    </details>` : ''}

    <div class="grid">
        ${stat('Monthly recurring revenue', money(mrr), `${active.length} paying accounts`, '/accounts?status=active', 'copy', '')}
        ${stat('Received this month', money(thisMonth), `So far. ${monthName(months.at(-2).month)}: ${money(lastMonth)}`, '/invoices?status=paid', 'check', 'safe')}
        ${stat('Waiting for payment', money(open.reduce((s, i) => s + total(i), 0)), `${open.length} invoices sent`, '/invoices?status=sent', 'alert', 'hazard')}
        ${stat('Trials running', String(trials.length), 'Convert them before day 30', '/accounts?status=trial', 'user', 'info')}
    </div>

    <div class="grid">
        <section class="card col-12 lg:col-8" aria-labelledby="rev-title">
            <h2 class="card__title" id="rev-title">Revenue</h2>
            ${revenueChart(months)}
        </section>
        <section class="card col-12 lg:col-4" aria-labelledby="mix-title">
            <h2 class="card__title" id="mix-title">Plan mix</h2>
            ${byPlan.map(([plan, n]) => html`
            <div class="meter">
                <span class="meter__label" id="mix-${plan}">${plan}</span>
                <span class="meter__value">${n} of ${active.length}</span>
                <div class="progress" role="progressbar" aria-labelledby="mix-${plan}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(n / active.length * 100)}"><div class="progress-bar" style="width: ${(n / active.length * 100).toFixed(1)}%"></div></div>
            </div>`)}
            <h2 class="card__title mt-4">System status</h2>
            <div id="status" ${ctx.prefs.nojs ? '' : html`hx-get="/status" hx-trigger="every 15s" hx-select="#status" hx-target="this" hx-swap="outerHTML" hx-push-url="false" hx-indicator="#status-spinner"`}>
                ${statusPanel()}
            </div>
            <span class="spinner spinner--small htmx-indicator" id="status-spinner" aria-hidden="true"></span>
        </section>
    </div>

    <div class="grid">
        <section class="card col-12 lg:col-6" aria-labelledby="risk-title">
            <header class="card__header"><h2 class="card__title" id="risk-title">Accounts at risk</h2><a href="/accounts?sort=health&amp;dir=asc">See all</a></header>
            <div class="table-container">
                <table class="table table--small">
                    <thead class="table__header"><tr><th class="table__header-cell" scope="col">Account</th><th class="table__header-cell" scope="col">Health</th><th class="table__header-cell table__cell--align-right" scope="col">MRR</th></tr></thead>
                    <tbody>${atRisk.map((a) => html`<tr class="table__row"><td class="table__cell"><a href="/accounts/${a.id}">${a.name}</a></td><td class="table__cell">${healthBar(a.health)}</td><td class="table__cell table__cell--align-right">${money(a.mrr)}</td></tr>`)}</tbody>
                </table>
            </div>
        </section>
        <section class="card col-12 lg:col-6" aria-labelledby="act-title">
            <header class="card__header"><h2 class="card__title" id="act-title">Latest activity</h2><a href="/activity">See all</a></header>
            ${activity(db.audit.slice(0, 5))}
        </section>
    </div>

    <section class="card" aria-labelledby="due-title">
        <header class="card__header"><h2 class="card__title" id="due-title">Due in the next 14 days</h2><a href="/invoices?status=sent">All open invoices</a></header>
        ${(() => {
            const soon = open.filter((i) => new Date(i.due).getTime() - Date.now() < 14 * 86_400_000).sort((a, b) => a.due.localeCompare(b.due)).slice(0, 6);
            if (!soon.length) return html`<p>Nothing falls due in the next two weeks.</p>`;
            return html`<ul class="list-group">${soon.map((i) => html`<li class="list-group-item due"><a href="/invoices/${i.id}">${i.number}</a><span>${account(i.accountId).name}</span><span>${money(total(i))}</span><span class="due__when">${statusBadge(invoiceState(i))} due ${day(i.due)}</span></li>`)}</ul>`;
        })()}
    </section>`;

    return {
        title: 'Dashboard',
        body,
        built: [
            ['Revenue chart', 'An ordered list with a CSS custom property per bar; values in a <details> table'],
            ['Dismissible alert', '<details open> with the summary as the close button'],
            ['System status, refreshed every 15 seconds', 'htmx polling one region; without JavaScript it is a snapshot'],
            ['Account and user menus', '<details class="dropdown">'],
            ['Plan mix', 'role="progressbar" with aria values'],
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
