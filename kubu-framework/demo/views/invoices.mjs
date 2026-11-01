import { html, raw, money, day, icon, plural } from '../lib/html.mjs';
import { db, account, total, invoiceState, can, log } from '../lib/db.mjs';
import { pageHead, statusBadge, pagination } from '../lib/layout.mjs';

const PER_PAGE = 12;
const TABS = [['all', 'All'], ['draft', 'Drafts'], ['sent', 'Sent'], ['overdue', 'Overdue'], ['paid', 'Paid']];

export function list(ctx) {
    const params = ctx.url.searchParams;
    const status = TABS.some(([k]) => k === params.get('status')) ? params.get('status') : 'all';
    const q = (params.get('q') || '').trim().toLowerCase();
    const all = db.invoices.map((i) => ({ inv: i, state: invoiceState(i), acc: account(i.accountId) })).filter((r) => r.acc);
    const counts = Object.fromEntries(TABS.map(([k]) => [k, k === 'all' ? all.length : all.filter((r) => r.state === k).length]));
    const rows = all
        .filter((r) => (status === 'all' || r.state === status) && (!q || r.inv.number.toLowerCase().includes(q) || r.acc.name.toLowerCase().includes(q)))
        .sort((a, b) => b.inv.issued.localeCompare(a.inv.issued));
    const page = Math.max(1, Number(params.get('page')) || 1);
    const pages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    const shown = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const sum = rows.reduce((s, r) => s + total(r.inv), 0);
    const issuer = can(ctx.user.role, 'invoices.issue');
    const tabLink = (k) => { const u = new URL(ctx.url); u.searchParams.set('status', k); u.searchParams.delete('page'); return u.pathname + u.search; };

    const body = html`
    ${pageHead({
        title: 'Invoices',
        lead: 'Issued, paid and waiting. Totals include 15% VAT.',
        actions: issuer ? html`<a class="button button--primary" href="/invoices/new">${icon('plus')} New invoice</a>` : '',
    })}
    <nav class="nav nav--tabs" aria-label="Invoice status">
        ${TABS.map(([k, label]) => html`<a class="nav__link" href="${tabLink(k)}"${status === k ? raw(' aria-current="page"') : ''}>${label} <span class="badge${k === 'overdue' && counts[k] ? ' badge--danger' : ''}">${counts[k]}</span></a>`)}
    </nav>
    <form class="toolbar" action="/invoices" method="get">
        <input type="hidden" name="status" value="${status}">
        <label class="visually-hidden" for="inv-q">Search invoices</label>
        <input class="form-input toolbar__search" id="inv-q" type="search" name="q" value="${params.get('q') || ''}" placeholder="Invoice number or account">
        <button class="button button--outline" type="submit">${icon('search')} Search</button>
        <p class="toolbar__count"><strong>${plural(rows.length, 'invoice')}</strong>, ${money(sum)}</p>
    </form>
    <form action="/invoices/bulk" method="post">
        <div class="table-container">
            <table class="table">
                <caption class="visually-hidden">Invoices, page ${page} of ${pages}</caption>
                <thead class="table__header"><tr>
                    ${issuer ? html`<th class="table__header-cell table__cell--check" scope="col"><span class="visually-hidden">Select</span></th>` : ''}
                    <th class="table__header-cell" scope="col">Invoice</th>
                    <th class="table__header-cell" scope="col">Account</th>
                    <th class="table__header-cell" scope="col">Issued</th>
                    <th class="table__header-cell" scope="col">Due</th>
                    <th class="table__header-cell" scope="col">Status</th>
                    <th class="table__header-cell table__cell--align-right" scope="col">Total</th>
                </tr></thead>
                <tbody>
                ${shown.length ? shown.map(({ inv, state, acc }) => html`
                <tr class="table__row table__row--hoverable">
                    ${issuer ? html`<td class="table__cell table__cell--check">${['sent', 'overdue', 'draft'].includes(state) ? html`<input type="checkbox" name="id" value="${inv.id}" aria-label="Select ${inv.number}">` : ''}</td>` : ''}
                    <td class="table__cell"><a href="/invoices/${inv.id}">${inv.number}</a></td>
                    <td class="table__cell"><a href="/accounts/${acc.id}">${acc.name}</a></td>
                    <td class="table__cell">${day(inv.issued)}</td>
                    <td class="table__cell">${day(inv.due)}</td>
                    <td class="table__cell">${statusBadge(state)}</td>
                    <td class="table__cell table__cell--align-right">${money(total(inv))}</td>
                </tr>`) : html`<tr class="table__row"><td class="table__cell" colspan="7"><p class="empty">No invoices here. <a href="/invoices">See every invoice</a>.</p></td></tr>`}
                </tbody>
            </table>
        </div>
        ${issuer && shown.length ? html`
        <div class="toolbar">
            <label class="visually-hidden" for="inv-action">With the selected invoices</label>
            <select class="form-select" id="inv-action" name="action">
                <option value="paid">Record payment in full</option>
                <option value="sent">Send to the customer</option>
            </select>
            <button class="button button--outline" type="submit">Apply to selected</button>
        </div>` : ''}
    </form>
    ${pagination(ctx.url, page, pages)}`;

    return {
        title: 'Invoices',
        body,
        built: [
            ['Status tabs with counts', '.nav--tabs links with aria-current; the filter is in the URL'],
            ['Bulk payment', 'Checkboxes in one POST form'],
            ['Pages', '.pagination links that keep every other filter'],
        ],
    };
}

export function detail(ctx, inv) {
    const acc = account(inv.accountId);
    const state = invoiceState(inv);
    const sub = inv.lines.reduce((s, l) => s + l.qty * l.unit, 0);
    const issuer = can(ctx.user.role, 'invoices.issue');
    const steps = [['draft', 'Drafted'], ['sent', 'Sent'], ['paid', 'Paid']];
    const reached = state === 'paid' ? 2 : state === 'draft' ? 0 : 1;

    const body = html`
    ${pageHead({
        crumbs: [['/invoices', 'Invoices'], [null, inv.number]],
        title: inv.number,
        lead: html`${statusBadge(state)} for <a href="/accounts/${acc.id}">${acc.name}</a>, due ${day(inv.due)}`,
        actions: html`
            ${issuer && state === 'draft' ? html`<form action="/invoices/${inv.id}/send" method="post"><button class="button button--primary" type="submit">${icon('mail')} Send the invoice</button></form>` : ''}
            ${issuer && ['sent', 'overdue'].includes(state) ? html`<button class="button button--primary" type="button" commandfor="pay-dialog" command="show-modal">${icon('check')} Record payment</button>` : ''}
            ${issuer && state !== 'paid' ? html`<form action="/invoices/${inv.id}/delete" method="post"><button class="button button--outline" type="submit">${icon('trash')} ${state === 'draft' ? 'Discard draft' : 'Void'}</button></form>` : ''}`,
    })}

    <ol class="stepper list-unstyled" aria-label="Invoice progress">
        ${steps.map(([key, label], i) => html`
        ${i ? html`<li class="stepper__connector" aria-hidden="true"></li>` : ''}
        <li class="stepper__step${i <= reached ? ' active' : ''}"${i === reached ? raw(' aria-current="step"') : ''}><span class="stepper__number">${i < reached || state === 'paid' ? '✓' : i + 1}</span><span class="stepper__label">${label}${key === 'sent' && state === 'overdue' ? ' (overdue)' : ''}</span></li>`)}
    </ol>

    ${state === 'overdue' ? html`<div class="alert alert--danger" role="alert"><p>This invoice was due on ${day(inv.due)}. ${acc.contacts[0] ? html`Call ${acc.contacts[0].name} on behalf of ${acc.name}, or send a reminder to <a href="mailto:${acc.contacts[0].email}">${acc.contacts[0].email}</a>.` : ''}</p></div>` : ''}

    <article class="card invoice">
        <header class="invoice__head">
            <div>
                <p class="invoice__from"><svg class="icon icon--lg" aria-hidden="true"><use href="/kubu/img/icons.svg#hippo"></use></svg> ${db.settings.company}</p>
                <p class="muted">${db.settings.email}</p>
            </div>
            <dl class="facts facts--right">
                <dt>Invoice</dt><dd>${inv.number}</dd>
                <dt>Issued</dt><dd>${day(inv.issued)}</dd>
                <dt>Due</dt><dd>${day(inv.due)}</dd>
                ${inv.paidOn ? html`<dt>Paid</dt><dd>${day(inv.paidOn)}</dd>` : ''}
            </dl>
        </header>
        <p><strong>Bill to:</strong> ${acc.name}, ${acc.city}${acc.contacts[0] ? html`. Attention ${acc.contacts[0].name}` : ''}</p>
        <div class="table-container">
            <table class="table invoice__lines">
                <thead class="table__header"><tr><th class="table__header-cell" scope="col">Description</th><th class="table__header-cell table__cell--align-right" scope="col">Qty</th><th class="table__header-cell table__cell--align-right" scope="col">Unit</th><th class="table__header-cell table__cell--align-right" scope="col">Amount</th></tr></thead>
                <tbody>${inv.lines.map((l) => html`<tr class="table__row"><td class="table__cell">${l.desc}</td><td class="table__cell table__cell--align-right">${l.qty}</td><td class="table__cell table__cell--align-right">${money(l.unit)}</td><td class="table__cell table__cell--align-right">${money(l.qty * l.unit)}</td></tr>`)}</tbody>
                <tfoot class="table__footer">
                    <tr><th class="table__footer-cell" scope="row" colspan="3">Subtotal</th><td class="table__footer-cell table__cell--align-right">${money(sub)}</td></tr>
                    <tr><th class="table__footer-cell" scope="row" colspan="3">VAT 15%</th><td class="table__footer-cell table__cell--align-right">${money(sub * 0.15)}</td></tr>
                    <tr><th class="table__footer-cell" scope="row" colspan="3">Total</th><td class="table__footer-cell table__cell--align-right"><strong>${money(total(inv))}</strong></td></tr>
                </tfoot>
            </table>
        </div>
    </article>

    ${issuer && ['sent', 'overdue'].includes(state) ? html`
    <dialog class="modal" id="pay-dialog" aria-labelledby="pay-title">
        <header class="modal__header">
            <h2 class="modal__title" id="pay-title">Record a payment on ${inv.number}</h2>
            <form method="dialog"><button class="modal__close" aria-label="Close">&times;</button></form>
        </header>
        <form action="/invoices/${inv.id}/pay" method="post">
            <div class="modal__body">
                <div class="form-group">
                    <label class="form-label" for="pay-date">Received on</label>
                    <input class="form-input" id="pay-date" name="paidOn" type="date" value="${new Date().toISOString().slice(0, 10)}" required>
                </div>
                <fieldset class="chips">
                    <legend class="form-label">Method</legend>
                    <label class="chips__chip">EFT<input class="chips__input" type="radio" name="method" value="EFT" checked></label>
                    <label class="chips__chip">Card<input class="chips__input" type="radio" name="method" value="card"></label>
                    <label class="chips__chip">M-Pesa<input class="chips__input" type="radio" name="method" value="M-Pesa"></label>
                </fieldset>
                <p>Amount: <strong>${money(total(inv))}</strong></p>
            </div>
            <footer class="modal__footer">
                <button class="button button--outline" type="button" commandfor="pay-dialog" command="close">Cancel</button>
                <button class="button button--primary" type="submit">Record ${money(total(inv))}</button>
            </footer>
        </form>
    </dialog>` : ''}`;

    return {
        title: inv.number,
        body,
        built: [
            ['Progress', '.stepper, an ordered list with aria-current="step"'],
            ['Record payment', '<dialog> with a real POST form inside; Cancel uses formmethod="dialog"'],
            ['Invoice', 'A .table with <tfoot> totals; prints cleanly from the browser'],
        ],
    };
}

// ---- the three-step wizard -------------------------------------------------------------------
// The state of earlier steps rides along in hidden fields, so the wizard needs no session store
// and no JavaScript. "Add a line" is a submit button that asks the server for one more row.

export function readDraft(params) {
    const descs = params.getAll('desc');
    const qtys = params.getAll('qty');
    const units = params.getAll('unit');
    const lines = descs.map((desc, i) => ({ desc: desc.trim(), qty: qtys[i] ?? '', unit: units[i] ?? '' }));
    return {
        accountId: params.get('account') || '',
        terms: params.get('terms') || '30',
        reference: (params.get('reference') || '').trim(),
        lines: lines.length ? lines : [{ desc: 'Platform licence, per seat', qty: '', unit: '120' }],
    };
}

export function checkStep(step, draft) {
    const errors = {};
    if (step >= 1 && !account(draft.accountId)) errors.account = 'Choose the account to bill.';
    if (step >= 2) {
        const filled = draft.lines.filter((l) => l.desc || l.qty || l.unit);
        if (!filled.length) errors.lines = 'Add at least one line.';
        filled.forEach((l, i) => {
            if (!l.desc) errors[`line${i}`] = `Line ${i + 1}: add a description.`;
            else if (!(Number(l.qty) > 0)) errors[`line${i}`] = `Line ${i + 1}: the quantity must be more than 0.`;
            else if (!(Number(l.unit) >= 0) || l.unit === '') errors[`line${i}`] = `Line ${i + 1}: enter a unit price, like 120.`;
        });
    }
    return errors;
}

function carry(draft, upTo) {
    return html`
    ${upTo >= 1 ? html`<input type="hidden" name="account" value="${draft.accountId}"><input type="hidden" name="terms" value="${draft.terms}"><input type="hidden" name="reference" value="${draft.reference}">` : ''}
    ${upTo >= 2 ? draft.lines.filter((l) => l.desc).map((l) => html`<input type="hidden" name="desc" value="${l.desc}"><input type="hidden" name="qty" value="${l.qty}"><input type="hidden" name="unit" value="${l.unit}">`) : ''}`;
}

export function wizard(ctx, step, draft, errors = {}) {
    const labels = ['Customer', 'Lines', 'Review'];
    const acc = account(draft.accountId);
    const sub = draft.lines.filter((l) => l.desc).reduce((s, l) => s + Number(l.qty) * Number(l.unit), 0);
    const errorList = Object.values(errors);

    const stepBody = step === 1 ? html`
        <div class="form-group">
            <label class="form-label" for="w-account">Account <span class="form-label__hint">(required)</span></label>
            <select class="form-select" id="w-account" name="account"${errors.account ? raw(' aria-invalid="true" aria-describedby="w-account-error"') : ''}>
                <option value="">Choose an account</option>
                ${db.accounts.filter((a) => a.status !== 'churned').sort((a, b) => a.name.localeCompare(b.name)).map((a) => html`<option value="${a.id}"${String(a.id) === String(draft.accountId) ? raw(' selected') : ''}>${a.name} (${a.plan}, ${a.seats} seats)</option>`)}
            </select>
            ${errors.account ? html`<p class="form-error" id="w-account-error">${errors.account}</p>` : ''}
        </div>
        <fieldset class="chips">
            <legend class="form-label">Payment terms</legend>
            ${['7', '14', '30', '60'].map((t) => html`<label class="chips__chip">${t} days<input class="chips__input" type="radio" name="terms" value="${t}"${draft.terms === t ? raw(' checked') : ''}></label>`)}
        </fieldset>
        <div class="form-group">
            <label class="form-label" for="w-ref">Purchase order <span class="form-label__hint">(optional)</span></label>
            <input class="form-input" id="w-ref" name="reference" value="${draft.reference}" placeholder="e.g. PO-55120">
        </div>`
        : step === 2 ? html`
        ${carry(draft, 1)}
        <div class="table-container">
            <table class="table lines">
                <thead class="table__header"><tr><th class="table__header-cell" scope="col">Description</th><th class="table__header-cell" scope="col">Qty</th><th class="table__header-cell" scope="col">Unit price (R)</th></tr></thead>
                <tbody>${draft.lines.map((l, i) => html`
                <tr class="table__row">
                    <td class="table__cell"><label class="visually-hidden" for="l-desc-${i}">Line ${i + 1} description</label><input class="form-input" id="l-desc-${i}" name="desc" value="${l.desc}"${errors[`line${i}`] ? raw(' aria-invalid="true"') : ''}></td>
                    <td class="table__cell"><label class="visually-hidden" for="l-qty-${i}">Line ${i + 1} quantity</label><input class="form-input" id="l-qty-${i}" name="qty" type="number" min="0" step="1" inputmode="numeric" value="${l.qty || (i === 0 && acc ? acc.seats : '')}"></td>
                    <td class="table__cell"><label class="visually-hidden" for="l-unit-${i}">Line ${i + 1} unit price</label><input class="form-input" id="l-unit-${i}" name="unit" type="number" min="0" step="0.01" inputmode="decimal" value="${l.unit}"></td>
                </tr>`)}</tbody>
            </table>
        </div>
        <button class="button button--outline" type="submit" name="go" value="add" formnovalidate>${icon('plus')} Add a line</button>`
        : html`
        ${carry(draft, 2)}
        <dl class="facts">
            <dt>Bill to</dt><dd>${acc.name}, ${acc.city}</dd>
            <dt>Terms</dt><dd>${draft.terms} days, due ${day(Date.now() + Number(draft.terms) * 86_400_000)}</dd>
            ${draft.reference ? html`<dt>Purchase order</dt><dd>${draft.reference}</dd>` : ''}
        </dl>
        <div class="table-container">
            <table class="table table--small">
                <thead class="table__header"><tr><th class="table__header-cell" scope="col">Line</th><th class="table__header-cell table__cell--align-right" scope="col">Amount</th></tr></thead>
                <tbody>${draft.lines.filter((l) => l.desc).map((l) => html`<tr class="table__row"><td class="table__cell">${l.desc}, ${l.qty} × ${money(Number(l.unit))}</td><td class="table__cell table__cell--align-right">${money(Number(l.qty) * Number(l.unit))}</td></tr>`)}</tbody>
                <tfoot class="table__footer"><tr><th class="table__footer-cell" scope="row">Total with VAT</th><td class="table__footer-cell table__cell--align-right"><strong>${money(sub * 1.15)}</strong></td></tr></tfoot>
            </table>
        </div>`;

    const body = html`
    ${pageHead({ crumbs: [['/invoices', 'Invoices'], [null, 'New invoice']], title: 'New invoice', lead: `Step ${step} of 3: ${labels[step - 1].toLowerCase()}.` })}
    <ol class="stepper list-unstyled" aria-label="New invoice progress">
        ${labels.map((label, i) => html`
        ${i ? html`<li class="stepper__connector" aria-hidden="true"></li>` : ''}
        <li class="stepper__step${i + 1 <= step ? ' active' : ''}"${i + 1 === step ? raw(' aria-current="step"') : ''}><span class="stepper__number">${i + 1 < step ? '✓' : i + 1}</span><span class="stepper__label">${label}${i + 1 < step ? html`<span class="visually-hidden"> (done)</span>` : i + 1 === step ? html`<span class="visually-hidden"> (current step)</span>` : ''}</span></li>`)}
    </ol>
    ${errorList.length ? html`<div class="alert alert--danger" role="alert"><ul>${errorList.map((e) => html`<li>${e}</li>`)}</ul></div>` : ''}
    <form class="form-container card form-wide" action="/invoices/new" method="post" novalidate>
        <input type="hidden" name="step" value="${step}">
        ${stepBody}
        <div class="form-actions">
            ${step > 1 ? html`<button class="button button--outline" type="submit" name="go" value="back" formnovalidate>Back</button>` : html`<a class="button button--outline" href="/invoices">Cancel</a>`}
            ${step < 3
                ? html`<button class="button button--primary" type="submit" name="go" value="next">Continue to ${labels[step].toLowerCase()} ${icon('arrow-right')}</button>`
                : html`<button class="button button--outline" type="submit" name="go" value="draft">Save as draft</button>${can(ctx.user.role, 'invoices.issue') ? html`<button class="button button--primary" type="submit" name="go" value="send">${icon('mail')} Issue and send</button>` : ''}`}
        </div>
    </form>`;

    return {
        title: 'New invoice',
        status: errorList.length ? 422 : 200,
        body,
        built: [
            ['Three steps', 'One POST form per step; earlier answers ride along in hidden fields'],
            ['Add a line', 'A second submit button, name="go" value="add", answered by the server'],
            ['Progress', '.stepper with aria-current="step" and visually hidden "(done)" text'],
        ],
    };
}

export function create(ctx, draft, send) {
    const now = Date.now();
    const inv = {
        id: db.nextInvoice,
        number: `INV-${new Date(now).getUTCFullYear()}-${String(db.nextInvoice).padStart(4, '0')}`,
        accountId: Number(draft.accountId),
        issued: new Date(now).toISOString(),
        due: new Date(now + Number(draft.terms) * 86_400_000).toISOString(),
        status: send ? 'sent' : 'draft',
        paidOn: null,
        lines: draft.lines.filter((l) => l.desc).map((l) => ({ desc: l.desc, qty: Number(l.qty), unit: Number(l.unit) })),
    };
    db.nextInvoice++;
    db.invoices.push(inv);
    log(ctx.user.name, send ? 'issued' : 'drafted', inv.number, `/invoices/${inv.id}`);
    return inv;
}
