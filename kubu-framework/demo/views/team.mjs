import { html, raw, ago, icon, initials, plural } from '../lib/html.mjs';
import { db, can, log, ROLES, PERMISSIONS } from '../lib/db.mjs';
import { pageHead, field } from '../lib/layout.mjs';

const presenceWord = { on: 'Online', away: 'Away', off: 'Offline' };

export function team(ctx, { values = {}, errors = {} } = {}) {
    const manager = can(ctx.user.role, 'team.manage');
    const inviteOpen = Object.keys(errors).length > 0;

    const body = html`
    ${pageHead({
        title: 'Team',
        lead: `${plural(db.team.length, 'person', 'people')} in ${db.settings.company}, and what each role may do.`,
        actions: manager ? html`<a class="button button--primary" id="invite-open" href="#invite">${icon('plus')} Invite someone</a>` : '',
    })}

    <section class="card" aria-labelledby="members-title">
        <h2 class="card__title" id="members-title">Members</h2>
        <div class="table-container">
            <table class="table">
                <thead class="table__header"><tr>
                    <th class="table__header-cell" scope="col">Person</th>
                    <th class="table__header-cell" scope="col">Status</th>
                    <th class="table__header-cell" scope="col">Role</th>
                </tr></thead>
                <tbody>${db.team.map((m) => html`
                <tr class="table__row">
                    <td class="table__cell"><span class="avatar-label"><span class="avatar" aria-hidden="true">${initials(m.name)}</span><span><strong>${m.name}</strong>${m.id === ctx.user.id ? ' (you)' : ''}<br><small class="muted">${m.title} · <a href="mailto:${m.email}">${m.email}</a></small></span></span></td>
                    <td class="table__cell"><span class="presence presence--${m.presence}"><span class="presence__dot" aria-hidden="true"></span>${presenceWord[m.presence]}</span></td>
                    <td class="table__cell">${manager && m.role !== 'Owner' ? html`
                        <form class="inline-form" action="/team/${m.id}/role" method="post">
                            <label class="visually-hidden" for="role-${m.id}">Role for ${m.name}</label>
                            <select class="form-select" id="role-${m.id}" name="role"${ctx.prefs.nojs ? '' : raw(' hx-post="/team/' + m.id + '/role" hx-trigger="change"')}>
                                ${ROLES.filter((r) => r !== 'Owner').map((r) => html`<option${r === m.role ? raw(' selected') : ''}>${r}</option>`)}
                            </select>
                            <button class="button button--outline button--small inline-form__save" type="submit">Save role</button>
                        </form>` : html`<span class="badge">${m.role}</span>`}</td>
                </tr>`)}</tbody>
            </table>
        </div>
        ${db.invites.length ? html`
        <h3 class="card__title mt-4">Waiting to join</h3>
        <ul class="list-group">${db.invites.map((inv, i) => html`<li class="list-group-item invite-row"><span>${icon('mail')} ${inv.email}, as ${inv.role}</span><small class="muted">sent ${ago(inv.sent)}</small>${manager ? html`<form action="/team/invites/${i}/cancel" method="post"><button class="button button--plain button--small" type="submit">Cancel invite</button></form>` : ''}</li>`)}</ul>` : ''}
    </section>

    <section class="card" aria-labelledby="perm-title">
        <header class="card__header"><h2 class="card__title" id="perm-title">Roles and permissions</h2>${manager ? '' : html`<span class="badge badge--info">Read only for ${ctx.user.role}</span>`}</header>
        <form action="/team/permissions" method="post">
            <div class="table-container">
                <table class="table table--bordered perm">
                    <caption class="visually-hidden">What each role may do</caption>
                    <thead class="table__header"><tr><th class="table__header-cell" scope="col">Permission</th>${ROLES.map((r) => html`<th class="table__header-cell table__cell--align-center" scope="col">${r}</th>`)}</tr></thead>
                    <tbody>${PERMISSIONS.map(([key, label]) => html`
                    <tr class="table__row">
                        <th class="table__cell" scope="row">${label}</th>
                        ${ROLES.map((r) => html`<td class="table__cell table__cell--align-center"><input class="toggle" type="checkbox" name="${r}" value="${key}" aria-label="${r}: ${label}"${can(r, key) ? raw(' checked') : ''}${!manager || r === 'Owner' ? raw(' disabled') : ''}></td>`)}
                    </tr>`)}</tbody>
                </table>
            </div>
            ${manager ? html`<div class="form-actions"><button class="button button--primary" type="submit">Save permissions</button></div>` : ''}
        </form>
    </section>

    ${manager ? html`
    <aside class="offcanvas offcanvas--end${inviteOpen ? ' active' : ''}" id="invite" aria-label="Invite someone">
        <a class="close-btn" href="${inviteOpen ? '/team' : '#invite-open'}" aria-label="Close the invite panel">&times;</a>
        <div class="content">
            <h2>Invite someone</h2>
            <p>They get an email with a link that works for seven days.</p>
            <form class="form-container" action="/team/invite" method="post" novalidate>
                ${field({ id: 'i-email', name: 'email', label: 'Work email', hint: 'required', type: 'email', value: values.email || '', error: errors.email, required: true, attrs: raw('autocomplete="off"') })}
                ${field({ id: 'i-role', name: 'role', label: 'Role', value: values.role || 'Support', options: ROLES.filter((r) => r !== 'Owner'), error: errors.role })}
                <button class="button button--primary" type="submit">${icon('mail')} Send the invite</button>
            </form>
        </div>
    </aside>
    <a class="offcanvas-overlay${inviteOpen ? ' active' : ''}" href="${inviteOpen ? '/team' : '#invite-open'}" tabindex="-1" aria-hidden="true"></a>` : ''}`;

    return {
        title: 'Team',
        status: inviteOpen ? 422 : 200,
        body,
        built: [
            ['Invite panel', '.offcanvas opened by :target, closed by a link; the server reopens it with .active when a field is wrong'],
            ['Role change', 'A select in a POST form. With htmx it saves on change; without, press Save role'],
            ['Permission matrix', 'Checkboxes styled as .toggle in one form'],
            ['Presence', 'A dot that always sits beside a word'],
            ['Access control', 'The server hides what your role cannot do and refuses it if sent anyway'],
        ],
    };
}

export function invite(ctx, params) {
    const values = { email: (params.get('email') || '').trim().toLowerCase(), role: params.get('role') };
    const errors = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) errors.email = 'Enter an email address with an @ and a dot, like finance@acme.example.';
    else if (db.team.some((m) => m.email === values.email) || db.invites.some((i) => i.email === values.email)) errors.email = `${values.email} is already on the team or invited.`;
    if (!ROLES.includes(values.role) || values.role === 'Owner') errors.role = 'Choose a role from the list.';
    if (Object.keys(errors).length) return { values, errors };
    db.invites.push({ email: values.email, role: values.role, sent: new Date().toISOString() });
    log(ctx.user.name, 'invited', values.email, '/team');
    return null;
}

export function setPermissions(ctx, params) {
    for (const role of ROLES) {
        if (role === 'Owner') continue;
        db.permissions[role] = params.getAll(role).filter((key) => PERMISSIONS.some(([k]) => k === key));
    }
    log(ctx.user.name, 'changed', 'roles and permissions', '/team');
}
