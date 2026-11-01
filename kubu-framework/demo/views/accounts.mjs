import { html, raw, money, day, ago, icon, initials, plural } from '../lib/html.mjs';
import { db, account, member, total, invoiceState, can, log, PLANS, STATUSES, INDUSTRIES } from '../lib/db.mjs';
import { pageHead, statusBadge, pagination, field } from '../lib/layout.mjs';
import { healthBar, activity } from './dashboard.mjs';

const PER_PAGE = 10;
const columns = [['name', 'Account'], ['plan', 'Plan'], ['status', 'Status'], ['seats', 'Seats'], ['mrr', 'MRR'], ['health', 'Health']];

export function query(params) {
    const q = (params.get('q') || '').trim().toLowerCase();
    const status = params.get('status') || 'all';
    const plan = params.get('plan') || 'all';
    const sort = columns.some(([key]) => key === params.get('sort')) ? params.get('sort') : 'name';
    const dir = params.get('dir') === 'desc' ? 'desc' : 'asc';
    let rows = db.accounts.filter((a) =>
        (status === 'all' || a.status === status) &&
        (plan === 'all' || a.plan === plan) &&
        (!q || [a.name, a.city, a.industry, ...a.contacts.map((c) => c.name)].some((v) => v.toLowerCase().includes(q))));
    rows = rows.sort((a, b) => {
        const x = a[sort]; const y = b[sort];
        const order = typeof x === 'number' ? x - y : String(x).localeCompare(String(y));
        return dir === 'asc' ? order : -order;
    });
    return { q, status, plan, sort, dir, rows };
}

function sortLink(url, key, label, { sort, dir }) {
    const u = new URL(url);
    const next = sort === key && dir === 'asc' ? 'desc' : 'asc';
    u.searchParams.set('sort', key);
    u.searchParams.set('dir', next);
    u.searchParams.delete('page');
    const ariaSort = sort === key ? (dir === 'asc' ? 'ascending' : 'descending') : 'none';
    const numeric = ['seats', 'mrr'].includes(key);
    return html`<th class="table__header-cell${numeric ? ' table__cell--align-right' : ''}" scope="col" aria-sort="${ariaSort}"><a class="sort-link" href="${u.pathname + u.search}">${label}<span aria-hidden="true">${sort === key ? (dir === 'asc' ? ' ▲' : ' ▼') : ''}</span></a></th>`;
}

export function list(ctx) {
    const params = ctx.url.searchParams;
    const state = query(params);
    const page = Math.max(1, Number(params.get('page')) || 1);
    const pages = Math.max(1, Math.ceil(state.rows.length / PER_PAGE));
    const rows = state.rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const editable = can(ctx.user.role, 'accounts.edit');
    const counts = Object.fromEntries(['all', ...STATUSES].map((s) => [s, s === 'all' ? db.accounts.length : db.accounts.filter((a) => a.status === s).length]));
    const live = ctx.prefs.nojs ? '' : html`hx-get="/accounts" hx-trigger="input changed delay:300ms from:#acc-q, change, submit" hx-target="#results" hx-select="#results" hx-swap="outerHTML" hx-push-url="true" hx-indicator="#results-loading"`;
    const csv = new URL(ctx.url); csv.pathname = '/accounts.csv'; csv.searchParams.delete('page');

    const body = html`
    ${pageHead({
        title: 'Accounts',
        lead: 'Every customer, their plan and how healthy the relationship is.',
        actions: html`
            <a class="button button--outline" href="${csv.pathname + csv.search}" hx-boost="false">${icon('download')} Export CSV</a>
            ${editable ? html`<a class="button button--primary" href="/accounts/new">${icon('plus')} New account</a>` : ''}`,
    })}

    <form class="filters card" action="/accounts" method="get" ${live}>
        <div class="filters__search form-group">
            <label class="form-label" for="acc-q">Search</label>
            <input class="form-input" id="acc-q" type="search" name="q" value="${params.get('q') || ''}" placeholder="Name, city, industry or contact" autocomplete="off">
        </div>
        <fieldset class="chips">
            <legend class="form-label">Status</legend>
            ${['all', ...STATUSES].map((s) => html`<label class="chips__chip">${s === 'all' ? 'All' : s[0].toUpperCase() + s.slice(1)} <span class="filters__count">${counts[s]}</span><input class="chips__input" type="radio" name="status" value="${s}"${state.status === s ? html` checked` : ''}></label>`)}
        </fieldset>
        <div class="form-group">
            <label class="form-label" for="acc-plan">Plan</label>
            <select class="form-select" id="acc-plan" name="plan">
                ${['all', ...PLANS].map((p) => html`<option value="${p}"${state.plan === p ? html` selected` : ''}>${p === 'all' ? 'Every plan' : p}</option>`)}
            </select>
        </div>
        <input type="hidden" name="sort" value="${state.sort}">
        <input type="hidden" name="dir" value="${state.dir}">
        <button class="button button--outline filters__apply" type="submit">Apply filters</button>
        <span class="spinner spinner--small htmx-indicator" id="results-loading" aria-hidden="true"></span>
    </form>

    <div id="results" aria-live="polite">
        <form id="bulk" action="/accounts/bulk" method="post">
            <div class="toolbar">
                <p class="toolbar__count"><strong>${plural(state.rows.length, 'account')}</strong>${state.q ? html` matching “${state.q}”` : ''}</p>
                ${editable ? html`
                <div class="toolbar__bulk">
                    <label class="visually-hidden" for="bulk-action">With the selected accounts</label>
                    <select class="form-select" id="bulk-action" name="action">
                        <option value="active">Mark as active</option>
                        <option value="churned">Mark as churned</option>
                        ${db.team.map((m) => html`<option value="owner:${m.id}">Give to ${m.name}</option>`)}
                    </select>
                    <button class="button button--outline" type="submit">Apply to selected</button>
                </div>` : ''}
            </div>
            <div class="table-container">
                <table class="table">
                    <caption class="visually-hidden">Accounts, page ${page} of ${pages}</caption>
                    <thead class="table__header"><tr>
                        ${editable ? html`<th class="table__header-cell table__cell--check" scope="col"><span class="visually-hidden">Select</span></th>` : ''}
                        ${columns.map(([key, label]) => sortLink(ctx.url, key, label, state))}
                        <th class="table__header-cell" scope="col">Owner</th>
                        <th class="table__header-cell" scope="col"><span class="visually-hidden">Actions</span></th>
                    </tr></thead>
                    <tbody>
                    ${rows.length ? rows.map((a) => html`
                    <tr class="table__row table__row--hoverable">
                        ${editable ? html`<td class="table__cell table__cell--check"><input type="checkbox" name="id" value="${a.id}" aria-label="Select ${a.name}"></td>` : ''}
                        <td class="table__cell"><span class="avatar-label"><span class="avatar avatar--sm" aria-hidden="true">${initials(a.name)}</span><span><a href="/accounts/${a.id}">${a.name}</a><br><small class="muted">${a.industry}, ${a.city}</small></span></span></td>
                        <td class="table__cell">${a.plan}</td>
                        <td class="table__cell">${statusBadge(a.status)}</td>
                        <td class="table__cell table__cell--align-right">${a.seats}</td>
                        <td class="table__cell table__cell--align-right">${money(a.mrr)}</td>
                        <td class="table__cell">${healthBar(a.health)}</td>
                        <td class="table__cell">${member(a.ownerId)?.name}</td>
                        <td class="table__cell">
                            <details class="dropdown dropdown--end">
                                <summary class="button button--plain button--small" aria-label="Actions for ${a.name}">•••</summary>
                                <ul class="dropdown-content">
                                    <li><a class="dropdown-item" href="/accounts/${a.id}">Open</a></li>
                                    ${editable ? html`<li><a class="dropdown-item" href="/accounts/${a.id}/edit">Edit</a></li>` : ''}
                                    ${can(ctx.user.role, 'invoices.issue') ? html`<li><a class="dropdown-item" href="/invoices/new?account=${a.id}">New invoice</a></li>` : ''}
                                </ul>
                            </details>
                        </td>
                    </tr>`) : html`<tr class="table__row"><td class="table__cell" colspan="9"><p class="empty">No accounts match. <a href="/accounts">Clear the filters</a>.</p></td></tr>`}
                    </tbody>
                </table>
            </div>
        </form>
        ${pagination(ctx.url, page, pages)}
    </div>`;

    return {
        title: 'Accounts',
        body,
        built: [
            ['Search as you type', 'A GET form; htmx sends it on input and swaps #results. Without JavaScript, press Enter'],
            ['Status filter', 'Radio buttons styled as .chips'],
            ['Sortable columns', 'Links with aria-sort on the header cell'],
            ['Bulk actions', 'Checkboxes in one POST form, answered with a redirect'],
            ['Row menu', '<details class="dropdown">'],
            ['Shareable state', 'Every filter is in the URL, so Back, Reload and a pasted link all work'],
        ],
    };
}

export function csv(ctx) {
    const { rows } = query(ctx.url.searchParams);
    const cell = (v) => `"${String(v).replaceAll('"', '""')}"`;
    const lines = [['Account', 'Industry', 'City', 'Plan', 'Status', 'Seats', 'MRR', 'Health', 'Owner'].map(cell).join(',')];
    for (const a of rows) lines.push([a.name, a.industry, a.city, a.plan, a.status, a.seats, a.mrr.toFixed(2), a.health, member(a.ownerId)?.name].map(cell).join(','));
    return lines.join('\r\n');
}

export function detail(ctx, a) {
    const invoices = db.invoices.filter((i) => i.accountId === a.id).sort((x, y) => y.issued.localeCompare(x.issued));
    const billed = invoices.reduce((s, i) => s + total(i), 0);
    const outstanding = invoices.filter((i) => ['sent', 'overdue'].includes(invoiceState(i))).reduce((s, i) => s + total(i), 0);
    const editable = can(ctx.user.role, 'accounts.edit');
    const owner = member(a.ownerId);
    const events = db.audit.filter((e) => e.target === a.name || invoices.some((i) => i.number === e.target));

    const body = html`
    ${pageHead({
        crumbs: [['/accounts', 'Accounts'], [null, a.name]],
        title: a.name,
        lead: html`${statusBadge(a.status)} ${a.plan} plan · ${a.industry} · ${a.city} · customer since ${day(a.created)}`,
        actions: html`
            ${can(ctx.user.role, 'invoices.issue') ? html`<a class="button button--outline" href="/invoices/new?account=${a.id}">${icon('plus')} New invoice</a>` : ''}
            ${editable ? html`<a class="button button--primary" href="/accounts/${a.id}/edit">${icon('edit')} Edit</a>
            <button class="button button--danger" type="button" commandfor="delete-account" command="show-modal">${icon('trash')} Delete</button>` : ''}`,
    })}

    <div class="grid">
        <div class="card stat col-12 sm:col-6 lg:col-3"><span class="stat__label">MRR</span><span class="stat__value">${money(a.mrr)}</span><span class="stat__note">${a.seats} seats</span></div>
        <div class="card stat col-12 sm:col-6 lg:col-3"><span class="stat__label">Billed to date</span><span class="stat__value">${money(billed)}</span><span class="stat__note">${plural(invoices.length, 'invoice')}</span></div>
        <div class="card stat col-12 sm:col-6 lg:col-3"><span class="stat__label">Outstanding</span><span class="stat__value">${money(outstanding)}</span><span class="stat__note">Including VAT</span></div>
        <div class="card stat col-12 sm:col-6 lg:col-3"><span class="stat__label">Health</span><span class="stat__value">${a.health}</span><span class="stat__note">${healthBar(a.health)}</span></div>
    </div>

    <div class="tabs" role="group" aria-label="${a.name}">
        <input class="tabs__input" type="radio" name="account-tabs" id="tab-overview" checked>
        <label class="tabs__tab" for="tab-overview">Overview</label>
        <div class="tabs__panel">
            <div class="grid">
                <dl class="facts col-12 md:col-6">
                    <dt>Account owner</dt><dd><span class="avatar-label"><span class="avatar avatar--sm" aria-hidden="true">${initials(owner.name)}</span>${owner.name}, ${owner.title}</span></dd>
                    <dt>Plan</dt><dd>${a.plan}, ${a.seats} seats</dd>
                    <dt>Industry</dt><dd>${a.industry}</dd>
                    <dt>City</dt><dd>${a.city}</dd>
                </dl>
                <div class="col-12 md:col-6">
                    <h2 class="card__title">Notes</h2>
                    <p>${a.notes || 'No notes yet.'}</p>
                </div>
            </div>
        </div>

        <input class="tabs__input" type="radio" name="account-tabs" id="tab-invoices">
        <label class="tabs__tab" for="tab-invoices">Invoices (${invoices.length})</label>
        <div class="tabs__panel">
            ${invoices.length ? html`<div class="table-container"><table class="table table--small">
                <thead class="table__header"><tr><th class="table__header-cell" scope="col">Invoice</th><th class="table__header-cell" scope="col">Issued</th><th class="table__header-cell" scope="col">Status</th><th class="table__header-cell table__cell--align-right" scope="col">Total</th></tr></thead>
                <tbody>${invoices.map((i) => html`<tr class="table__row"><td class="table__cell"><a href="/invoices/${i.id}">${i.number}</a></td><td class="table__cell">${day(i.issued)}</td><td class="table__cell">${statusBadge(invoiceState(i))}</td><td class="table__cell table__cell--align-right">${money(total(i))}</td></tr>`)}</tbody>
            </table></div>` : html`<p>No invoices yet.</p>`}
        </div>

        <input class="tabs__input" type="radio" name="account-tabs" id="tab-contacts">
        <label class="tabs__tab" for="tab-contacts">Contacts (${a.contacts.length})</label>
        <div class="tabs__panel">
            <ul class="list-group">${a.contacts.map((c) => html`<li class="list-group-item"><span class="avatar-label"><span class="avatar" aria-hidden="true">${initials(c.name)}</span><span><strong>${c.name}</strong>, ${c.role}<br><a href="mailto:${c.email}">${c.email}</a></span></span></li>`)}</ul>
        </div>

        <input class="tabs__input" type="radio" name="account-tabs" id="tab-activity">
        <label class="tabs__tab" for="tab-activity">Activity</label>
        <div class="tabs__panel">${activity(events.slice(0, 10))}</div>
    </div>

    ${editable ? html`
    <dialog class="modal" id="delete-account" aria-labelledby="delete-account-title">
        <header class="modal__header">
            <h2 class="modal__title" id="delete-account-title">Delete ${a.name}?</h2>
            <form method="dialog"><button class="modal__close" aria-label="Close">&times;</button></form>
        </header>
        <div class="modal__body">
            <p>The account, its ${plural(invoices.length, 'invoice')} and ${plural(a.contacts.length, 'contact')} will be removed. This cannot be undone.</p>
        </div>
        <footer class="modal__footer">
            <form method="dialog"><button class="button button--outline" value="cancel">Keep the account</button></form>
            <form action="/accounts/${a.id}/delete" method="post"><button class="button button--danger" type="submit">Delete ${a.name}</button></form>
        </footer>
    </dialog>` : ''}`;

    return {
        title: a.name,
        body,
        built: [
            ['Tabs', 'Radio buttons and labels; the checked one shows its panel'],
            ['Delete confirmation', '<dialog> opened by commandfor and command="show-modal"'],
            ['Breadcrumb', '<nav> with an ordered list and aria-current'],
            ['Health meter', 'A bar plus a word and a number, so colour is never the only signal'],
        ],
    };
}

// ---- create and edit -------------------------------------------------------------------------

export function validate(params) {
    const values = {
        name: (params.get('name') || '').trim(),
        industry: params.get('industry') || INDUSTRIES[0],
        plan: params.get('plan') || 'Growth',
        status: params.get('status') || 'trial',
        city: (params.get('city') || '').trim(),
        seats: params.get('seats') || '',
        ownerId: params.get('ownerId') || '',
        contactName: (params.get('contactName') || '').trim(),
        contactEmail: (params.get('contactEmail') || '').trim(),
        notes: (params.get('notes') || '').trim(),
    };
    const errors = {};
    if (values.name.length < 2) errors.name = 'Enter the company name, at least 2 characters.';
    else if (db.accounts.some((a) => a.name.toLowerCase() === values.name.toLowerCase() && String(a.id) !== params.get('id'))) errors.name = `${values.name} is already an account. Open it from the list instead.`;
    if (!PLANS.includes(values.plan)) errors.plan = 'Choose a plan from the list.';
    if (!STATUSES.includes(values.status)) errors.status = 'Choose a status from the list.';
    if (!values.city) errors.city = 'Enter the city the account is billed in.';
    const seats = Number(values.seats);
    if (!Number.isInteger(seats) || seats < 1 || seats > 5000) errors.seats = 'Enter a whole number of seats from 1 to 5000.';
    if (!member(values.ownerId)) errors.ownerId = 'Choose who owns this account.';
    if (values.contactEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.contactEmail)) errors.contactEmail = 'Enter an email address with an @ and a dot, like lerato@example.com.';
    if (values.contactEmail && !values.contactName) errors.contactName = 'Add the name that goes with this email address.';
    return { values, errors };
}

export function formPage(ctx, { a, values, errors = {} }) {
    const editing = Boolean(a);
    const v = values || (a ? { ...a, contactName: a.contacts[0]?.name || '', contactEmail: a.contacts[0]?.email || '' } : { plan: 'Growth', status: 'trial', industry: INDUSTRIES[0], seats: '10', ownerId: ctx.user.id, name: '', city: '', notes: '', contactName: '', contactEmail: '' });
    const errorList = Object.entries(errors);
    const fieldIds = { name: 'f-name', plan: 'f-plan', status: 'f-status', city: 'f-city', seats: 'f-seats', ownerId: 'f-owner', contactName: 'f-cname', contactEmail: 'f-cemail' };

    const body = html`
    ${pageHead({
        crumbs: editing ? [['/accounts', 'Accounts'], [`/accounts/${a.id}`, a.name], [null, 'Edit']] : [['/accounts', 'Accounts'], [null, 'New account']],
        title: editing ? `Edit ${a.name}` : 'New account',
        lead: 'The server checks every field. Your browser checks them first when it can.',
    })}
    ${errorList.length ? html`
    <div class="alert alert--danger" role="alert" tabindex="-1" id="form-errors">
        <p><strong>Fix ${plural(errorList.length, 'thing')} to save:</strong></p>
        <ul>${errorList.map(([key, message]) => html`<li><a href="#${fieldIds[key]}">${message}</a></li>`)}</ul>
    </div>` : ''}
    <form class="form-container card form-wide" action="${editing ? `/accounts/${a.id}/edit` : '/accounts/new'}" method="post" novalidate>
        ${editing ? html`<input type="hidden" name="id" value="${a.id}">` : ''}
        <fieldset class="form-section">
            <legend class="card__title">Company</legend>
            <div class="grid">
                <div class="col-12 md:col-8">${field({ id: 'f-name', name: 'name', label: 'Company name', hint: 'required', value: v.name, error: errors.name, required: true, attrs: raw('autocomplete="organization"') })}</div>
                <div class="col-12 md:col-4">${field({ id: 'f-industry', name: 'industry', label: 'Industry', value: v.industry, options: INDUSTRIES })}</div>
                <div class="col-12 md:col-6">${field({ id: 'f-city', name: 'city', label: 'Billing city', hint: 'required', value: v.city, error: errors.city, required: true })}</div>
                <div class="col-12 md:col-6">
                    <div class="form-group">
                        <label class="form-label" for="f-owner">Account owner</label>
                        <select class="form-select" id="f-owner" name="ownerId"${errors.ownerId ? raw(' aria-invalid="true" aria-describedby="f-owner-error"') : ''}>
                            ${db.team.map((m) => html`<option value="${m.id}"${String(m.id) === String(v.ownerId) ? raw(' selected') : ''}>${m.name}, ${m.title}</option>`)}
                        </select>
                        ${errors.ownerId ? html`<p class="form-error" id="f-owner-error">${errors.ownerId}</p>` : ''}
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset class="form-section">
            <legend class="card__title">Subscription</legend>
            <div class="grid">
                <div class="col-12 md:col-4">${field({ id: 'f-plan', name: 'plan', label: 'Plan', value: v.plan, options: PLANS, error: errors.plan })}</div>
                <div class="col-12 md:col-4">${field({ id: 'f-status', name: 'status', label: 'Status', value: v.status, options: STATUSES, error: errors.status })}</div>
                <div class="col-12 md:col-4">${field({ id: 'f-seats', name: 'seats', label: 'Seats', hint: '1 to 5000', type: 'number', value: v.seats, error: errors.seats, required: true, attrs: raw('min="1" max="5000" inputmode="numeric"') })}</div>
            </div>
        </fieldset>
        <fieldset class="form-section">
            <legend class="card__title">Main contact</legend>
            <div class="grid">
                <div class="col-12 md:col-6">${field({ id: 'f-cname', name: 'contactName', label: 'Name', hint: 'optional', value: v.contactName, error: errors.contactName, attrs: raw('autocomplete="name"') })}</div>
                <div class="col-12 md:col-6">${field({ id: 'f-cemail', name: 'contactEmail', label: 'Email', hint: 'optional', type: 'email', value: v.contactEmail, error: errors.contactEmail, attrs: raw('autocomplete="email"') })}</div>
            </div>
            ${field({ id: 'f-notes', name: 'notes', label: 'Notes', hint: 'optional', type: 'textarea', value: v.notes })}
        </fieldset>
        <div class="form-actions">
            <a class="button button--outline" href="${editing ? `/accounts/${a.id}` : '/accounts'}">Cancel</a>
            <button class="button button--primary" type="submit">${editing ? 'Save changes' : 'Create account'}</button>
        </div>
    </form>`;

    return {
        title: editing ? `Edit ${a.name}` : 'New account',
        status: errorList.length ? 422 : 200,
        body,
        built: [
            ['Validation', 'The server returns the form with aria-invalid fields and an error summary that links to each one'],
            ['Layout', 'Fieldsets on the 12-column .grid'],
            ['Save', 'A POST answered with a redirect, so Reload never sends it twice'],
        ],
    };
}

export function save(ctx, values, a) {
    const contact = values.contactName ? { name: values.contactName, email: values.contactEmail, role: 'Main contact' } : null;
    const seats = Number(values.seats);
    const record = a || { id: db.nextAccount++, created: new Date().toISOString(), health: 70, contacts: [] };
    Object.assign(record, {
        name: values.name, industry: values.industry, plan: values.plan, status: values.status, city: values.city,
        seats, ownerId: Number(values.ownerId), notes: values.notes,
        mrr: values.status === 'active' ? seats * 120 + (values.plan === 'Enterprise' ? 2400 : 0) : 0,
    });
    if (contact) {
        if (record.contacts.length) record.contacts[0] = { ...record.contacts[0], ...contact, role: record.contacts[0].role };
        else record.contacts.push(contact);
    }
    if (!a) db.accounts.push(record);
    log(ctx.user.name, a ? 'updated' : 'created', record.name, `/accounts/${record.id}`);
    return record;
}

export function bulk(ctx, params) {
    const ids = params.getAll('id').map(Number);
    const action = params.get('action') || '';
    const picked = db.accounts.filter((a) => ids.includes(a.id));
    if (!picked.length) return 'Select at least one account first.';
    for (const a of picked) {
        if (action.startsWith('owner:') && member(action.slice(6))) a.ownerId = Number(action.slice(6));
        else if (STATUSES.includes(action)) { a.status = action; if (action === 'churned') a.mrr = 0; else if (!a.mrr) a.mrr = a.seats * 120; }
    }
    log(ctx.user.name, `changed ${plural(picked.length, 'account')}:`, action.startsWith('owner:') ? `new owner ${member(action.slice(6))?.name}` : `marked ${action}`, '/accounts');
    return null;
}

export function remove(ctx, a) {
    db.accounts.splice(db.accounts.indexOf(a), 1);
    db.invoices = db.invoices.filter((i) => i.accountId !== a.id);
    log(ctx.user.name, 'deleted', a.name, null);
}

export { ago };
