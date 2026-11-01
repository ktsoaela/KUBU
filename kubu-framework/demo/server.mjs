// Acme Corp: an enterprise demo of KUBU. Sample records only. No personal names.
//   node demo/server.mjs            (or: npm run demo)   then open http://localhost:3000
// Node 20+, no dependencies. Every screen is a whole HTML page from a route. htmx, when on,
// swaps #app from that same page; a POST answers with a redirect either way.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { cookies, cookie, form, send, redirect, flash, back } from './lib/http.mjs';
import { layout } from './lib/layout.mjs';
import { db, reset, account, invoice, member, can, log, invoiceState } from './lib/db.mjs';
import { dashboard, statusPanel } from './views/dashboard.mjs';
import * as accounts from './views/accounts.mjs';
import * as invoices from './views/invoices.mjs';
import { team, invite, setPermissions } from './views/team.mjs';
import { settings, saveSettings, activityPage, searchPage, forbidden, notFound } from './views/workspace.mjs';
import { why, noJs } from './views/why.mjs';
import { plural } from './lib/html.mjs';

const PORT = Number(process.env.PORT) || 3000;
const here = import.meta.dirname;
const kubuRoot = path.resolve(here, '..');
const types = { '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
// Only these folders of the framework are served, so the demo uses the published build.
const statics = [['/kubu/dist/', path.join(kubuRoot, 'dist')], ['/kubu/js/', path.join(kubuRoot, 'js')], ['/kubu/img/', path.join(kubuRoot, 'img')], ['/app/', path.join(here, 'public')]];

async function serveStatic(req, res, pathname) {
    for (const [prefix, dir] of statics) {
        if (!pathname.startsWith(prefix)) continue;
        const file = path.resolve(dir, decodeURIComponent(pathname.slice(prefix.length)));
        if (!file.startsWith(dir + path.sep)) return false;
        try {
            if (!(await stat(file)).isFile()) return false;
            res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
            res.end(await readFile(file));
            return true;
        } catch {
            return false;
        }
    }
    return false;
}

function context(req, url) {
    const jar = cookies(req);
    let flashed = null;
    try { flashed = jar.flash ? JSON.parse(jar.flash) : null; } catch { /* ignore a bad cookie */ }
    return {
        req,
        url,
        path: url.pathname,
        flash: flashed,
        prefs: { theme: ['dark', 'light'].includes(jar.theme) ? jar.theme : 'auto', nojs: jar.nojs === '1' },
        user: member(jar.as) || db.team[0],
    };
}

function page(res, ctx, view) {
    const headers = {};
    if (ctx.flash) headers['Set-Cookie'] = cookie('flash', '', { maxAge: 0 });
    // A form that htmx posted and the server redirected: tell htmx the address it landed on.
    if (ctx.req.headers['hx-request'] && !ctx.req.headers['hx-history-restore-request']) headers['HX-Push-Url'] = ctx.url.pathname + ctx.url.search;
    send(res, view.status || 200, layout(ctx, view), headers);
}

const done = (res, to, text, tone) => redirect(res, to, { 'Set-Cookie': flash(text, tone) });

// ---- routes: [method, pattern, handler(ctx, res, match)] ------------------------------------

const routes = [
    ['GET', /^\/$/, (ctx, res) => page(res, ctx, dashboard(ctx))],
    ['GET', /^\/status$/, (ctx, res) => send(res, 200, `<div id="status">${statusPanel()}</div>`)],

    ['GET', /^\/accounts$/, (ctx, res) => page(res, ctx, accounts.list(ctx))],
    ['GET', /^\/accounts\.csv$/, (ctx, res) => {
        if (!can(ctx.user.role, 'data.export')) return page(res, ctx, forbidden(ctx, 'export data'));
        send(res, 200, accounts.csv(ctx), { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="accounts.csv"' });
    }],
    ['GET', /^\/accounts\/new$/, (ctx, res) => {
        if (!can(ctx.user.role, 'accounts.edit')) return page(res, ctx, forbidden(ctx, 'create accounts'));
        page(res, ctx, accounts.formPage(ctx, {}));
    }],
    ['POST', /^\/accounts\/new$/, async (ctx, res) => {
        if (!can(ctx.user.role, 'accounts.edit')) return page(res, ctx, forbidden(ctx, 'create accounts'));
        const { values, errors } = accounts.validate(await form(ctx.req));
        if (Object.keys(errors).length) return page(res, ctx, accounts.formPage(ctx, { values, errors }));
        const a = accounts.save(ctx, values);
        done(res, `/accounts/${a.id}`, `${a.name} is now an account.`);
    }],
    ['POST', /^\/accounts\/bulk$/, async (ctx, res) => {
        if (!can(ctx.user.role, 'accounts.edit')) return page(res, ctx, forbidden(ctx, 'edit accounts'));
        const params = await form(ctx.req);
        const problem = accounts.bulk(ctx, params);
        done(res, back(ctx.req, '/accounts'), problem || `Updated ${plural(params.getAll('id').length, 'account')}.`, problem ? 'error' : 'success');
    }],
    ['GET', /^\/accounts\/(\d+)$/, (ctx, res, [, id]) => {
        const a = account(id);
        page(res, ctx, a ? accounts.detail(ctx, a) : notFound());
    }],
    ['GET', /^\/accounts\/(\d+)\/edit$/, (ctx, res, [, id]) => {
        const a = account(id);
        if (!a) return page(res, ctx, notFound());
        if (!can(ctx.user.role, 'accounts.edit')) return page(res, ctx, forbidden(ctx, 'edit accounts'));
        page(res, ctx, accounts.formPage(ctx, { a }));
    }],
    ['POST', /^\/accounts\/(\d+)\/edit$/, async (ctx, res, [, id]) => {
        const a = account(id);
        if (!a) return page(res, ctx, notFound());
        if (!can(ctx.user.role, 'accounts.edit')) return page(res, ctx, forbidden(ctx, 'edit accounts'));
        const { values, errors } = accounts.validate(await form(ctx.req));
        if (Object.keys(errors).length) return page(res, ctx, accounts.formPage(ctx, { a, values, errors }));
        accounts.save(ctx, values, a);
        done(res, `/accounts/${a.id}`, 'Changes saved.');
    }],
    ['POST', /^\/accounts\/(\d+)\/delete$/, (ctx, res, [, id]) => {
        const a = account(id);
        if (!a) return page(res, ctx, notFound());
        if (!can(ctx.user.role, 'accounts.edit')) return page(res, ctx, forbidden(ctx, 'delete accounts'));
        accounts.remove(ctx, a);
        done(res, '/accounts', `${a.name} was deleted.`, 'info');
    }],

    ['GET', /^\/invoices$/, (ctx, res) => page(res, ctx, invoices.list(ctx))],
    ['GET', /^\/invoices\/new$/, (ctx, res) => {
        if (!can(ctx.user.role, 'invoices.issue')) return page(res, ctx, forbidden(ctx, 'issue invoices'));
        page(res, ctx, invoices.wizard(ctx, 1, invoices.readDraft(ctx.url.searchParams)));
    }],
    ['POST', /^\/invoices\/new$/, async (ctx, res) => {
        if (!can(ctx.user.role, 'invoices.issue')) return page(res, ctx, forbidden(ctx, 'issue invoices'));
        const params = await form(ctx.req);
        const draft = invoices.readDraft(params);
        const step = Math.min(3, Math.max(1, Number(params.get('step')) || 1));
        const go = params.get('go');
        if (go === 'back') return page(res, ctx, invoices.wizard(ctx, step - 1, draft));
        if (go === 'add') { draft.lines.push({ desc: '', qty: '', unit: '' }); return page(res, ctx, invoices.wizard(ctx, step, draft)); }
        const errors = invoices.checkStep(step, draft);
        if (Object.keys(errors).length) return page(res, ctx, invoices.wizard(ctx, step, draft, errors));
        if (step < 3) return page(res, ctx, invoices.wizard(ctx, step + 1, draft));
        const inv = invoices.create(ctx, draft, go === 'send');
        done(res, `/invoices/${inv.id}`, go === 'send' ? `${inv.number} is on its way to ${account(inv.accountId).name}.` : `${inv.number} saved as a draft.`);
    }],
    ['POST', /^\/invoices\/bulk$/, async (ctx, res) => {
        if (!can(ctx.user.role, 'invoices.issue')) return page(res, ctx, forbidden(ctx, 'change invoices'));
        const params = await form(ctx.req);
        const action = params.get('action');
        const picked = params.getAll('id').map(invoice).filter(Boolean).filter((i) => i.status !== 'paid');
        if (!picked.length) return done(res, back(ctx.req, '/invoices'), 'Select at least one open invoice first.', 'error');
        for (const inv of picked) {
            if (action === 'paid') { inv.status = 'paid'; inv.paidOn = new Date().toISOString(); }
            else if (action === 'sent' && inv.status === 'draft') inv.status = 'sent';
        }
        log(ctx.user.name, action === 'paid' ? 'recorded payment on' : 'sent', plural(picked.length, 'invoice'), '/invoices');
        done(res, back(ctx.req, '/invoices'), action === 'paid' ? `Payment recorded on ${plural(picked.length, 'invoice')}.` : `Sent ${plural(picked.length, 'invoice')}.`);
    }],
    ['GET', /^\/invoices\/(\d+)$/, (ctx, res, [, id]) => {
        const inv = invoice(id);
        page(res, ctx, inv && account(inv.accountId) ? invoices.detail(ctx, inv) : notFound());
    }],
    ['POST', /^\/invoices\/(\d+)\/(pay|send|delete)$/, async (ctx, res, [, id, act]) => {
        const inv = invoice(id);
        if (!inv) return page(res, ctx, notFound());
        if (!can(ctx.user.role, 'invoices.issue')) return page(res, ctx, forbidden(ctx, 'change invoices'));
        const params = await form(ctx.req);
        if (act === 'pay') {
            const when = new Date(params.get('paidOn') || Date.now());
            inv.status = 'paid';
            inv.paidOn = (Number.isNaN(when.getTime()) ? new Date() : when).toISOString();
            log(ctx.user.name, `recorded a ${params.get('method') || 'EFT'} payment on`, inv.number, `/invoices/${inv.id}`);
            return done(res, `/invoices/${inv.id}`, `Payment recorded. ${inv.number} is paid.`);
        }
        if (act === 'send') {
            inv.status = 'sent';
            log(ctx.user.name, 'sent', inv.number, `/invoices/${inv.id}`);
            return done(res, `/invoices/${inv.id}`, `${inv.number} sent.`);
        }
        db.invoices.splice(db.invoices.indexOf(inv), 1);
        log(ctx.user.name, inv.status === 'draft' ? 'discarded' : 'voided', inv.number, null);
        done(res, '/invoices', `${inv.number} ${inv.status === 'draft' ? 'discarded' : 'voided'}.`, 'info');
    }],

    ['GET', /^\/team$/, (ctx, res) => page(res, ctx, team(ctx))],
    ['POST', /^\/team\/invite$/, async (ctx, res) => {
        if (!can(ctx.user.role, 'team.manage')) return page(res, ctx, forbidden(ctx, 'manage the team'));
        const params = await form(ctx.req);
        const problem = invite(ctx, params);
        if (problem) return page(res, { ...ctx, path: '/team' }, team(ctx, problem));
        done(res, '/team', `Invite sent to ${params.get('email')}.`);
    }],
    ['POST', /^\/team\/invites\/(\d+)\/cancel$/, (ctx, res, [, i]) => {
        if (!can(ctx.user.role, 'team.manage')) return page(res, ctx, forbidden(ctx, 'manage the team'));
        const [gone] = db.invites.splice(Number(i), 1);
        done(res, '/team', gone ? `Invite to ${gone.email} cancelled.` : 'That invite was already gone.', 'info');
    }],
    ['POST', /^\/team\/(\d+)\/role$/, async (ctx, res, [, id]) => {
        if (!can(ctx.user.role, 'team.manage')) return page(res, ctx, forbidden(ctx, 'manage the team'));
        const m = member(id);
        const role = (await form(ctx.req)).get('role');
        if (!m || m.role === 'Owner' || !['Admin', 'Finance', 'Support', 'Viewer'].includes(role)) return done(res, '/team', 'That role change is not allowed.', 'error');
        m.role = role;
        log(ctx.user.name, `made ${m.name}`, role, '/team');
        done(res, '/team', `${m.name} is now ${role}.`);
    }],
    ['POST', /^\/team\/permissions$/, async (ctx, res) => {
        if (!can(ctx.user.role, 'team.manage')) return page(res, ctx, forbidden(ctx, 'manage the team'));
        setPermissions(ctx, await form(ctx.req));
        done(res, '/team', 'Permissions saved.');
    }],

    ['GET', /^\/activity$/, (ctx, res) => page(res, ctx, activityPage(ctx))],
    ['GET', /^\/search$/, (ctx, res) => page(res, ctx, searchPage(ctx))],
    ['GET', /^\/settings$/, (ctx, res) => page(res, ctx, settings(ctx))],
    ['POST', /^\/settings$/, async (ctx, res) => {
        const problem = saveSettings(ctx, await form(ctx.req));
        if (problem) return page(res, ctx, settings(ctx, problem));
        done(res, '/settings', 'Settings saved.');
    }],
    ['POST', /^\/prefs$/, async (ctx, res) => {
        const params = await form(ctx.req);
        const set = [];
        if (params.has('theme')) set.push(cookie('theme', ['dark', 'light'].includes(params.get('theme')) ? params.get('theme') : 'auto'));
        if (params.has('nojs')) set.push(cookie('nojs', params.get('nojs') === '1' ? '1' : '0'));
        if (params.has('as') && member(params.get('as'))) {
            set.push(cookie('as', params.get('as')));
            const who = member(params.get('as'));
            set.push(flash(`Signed in as ${who.name}, ${who.role}.`, 'info'));
        }
        const to = params.get('back') || back(ctx.req);
        redirect(res, to.startsWith('/') && !to.startsWith('//') ? to : '/', { 'Set-Cookie': set });
    }],
    ['POST', /^\/reset$/, (ctx, res) => { reset(); done(res, '/', 'The demo data is back to the start.', 'info'); }],

    ['GET', /^\/why-kubu$/, (ctx, res) => page(res, ctx, why(ctx))],
    ['GET', /^\/no-js$/, (ctx, res) => page(res, ctx, noJs(ctx))],
];

const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    try {
        if (req.method === 'GET' && await serveStatic(req, res, url.pathname)) return;
        const ctx = context(req, url);
        for (const [method, pattern, handler] of routes) {
            const match = url.pathname.match(pattern);
            if (match && method === req.method) return await handler(ctx, res, match);
        }
        page(res, ctx, notFound());
    } catch (error) {
        console.error(error);
        if (!res.headersSent) send(res, 500, '<!DOCTYPE html><title>Error</title><p>Something went wrong. The details are in the server log.</p>');
    }
});

server.listen(PORT, () => {
    const overdue = db.invoices.filter((i) => invoiceState(i) === 'overdue').length;
    console.log(`Acme Corp, a KUBU demo: http://localhost:${PORT}`);
    console.log(`${db.accounts.length} accounts, ${db.invoices.length} invoices (${overdue} overdue), ${db.team.length} people. Ctrl+C to stop.`);
});
