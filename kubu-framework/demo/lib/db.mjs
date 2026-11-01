// In-memory data for the demo. Seeded from a fixed number, so every start looks the same,
// and dated from today, so "overdue" and "this month" always mean something.
// reset() puts everything back; nothing is written to disk.

const DAY = 86_400_000;

function prng(seed) {
    return () => {
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export const PLANS = ['Starter', 'Growth', 'Enterprise'];
export const STATUSES = ['active', 'trial', 'churned'];
export const INDUSTRIES = ['Logistics', 'Retail', 'Mining', 'Health', 'Finance', 'Agriculture', 'Energy', 'Education'];
export const ROLES = ['Owner', 'Admin', 'Finance', 'Support', 'Viewer'];
export const PERMISSIONS = [
    ['accounts.view', 'View accounts'],
    ['accounts.edit', 'Edit accounts'],
    ['invoices.issue', 'Issue invoices'],
    ['invoices.refund', 'Refund payments'],
    ['team.manage', 'Manage the team'],
    ['data.export', 'Export data'],
];

const companyNames = [
    'Acme Logistics', 'Acme Water', 'Acme Retail', 'Acme Energy', 'Acme Mining',
    'Acme Health', 'Acme Grain', 'Acme Transport', 'Acme Solar', 'Acme Learning',
    'Acme Wool', 'Acme Medical', 'Acme Print', 'Acme Crafts', 'Acme Dairy',
    'Acme Insurance', 'Acme Textiles', 'Acme Agritech', 'Acme Freight', 'Acme Capital',
    'Acme Foods', 'Acme Cold Chain', 'Acme Tours', 'Acme Lodges', 'Acme Clinics',
    'Acme Timber', 'Acme Hydro', 'Acme Schools', 'Acme Bakeries', 'Acme Bank',
    'Acme Parks', 'Acme Gems', 'Acme Holdings', 'Acme Motors', 'Acme Telecom',
    'Acme Workshops',
];
const cities = ['Central', 'Harbour', 'North', 'South', 'East', 'West', 'Riverside', 'Hillside', 'Midtown', 'Lakeside', 'Uptown'];
const contactRoles = ['Finance desk', 'Operations desk', 'Procurement desk', 'IT desk', 'Director desk'];
const services = [
    ['Platform licence, per seat', 120],
    ['Priority support', 2400],
    ['Onboarding workshop', 6500],
    ['Data migration', 9800],
    ['Custom report pack', 3200],
    ['SSO and audit add-on', 1800],
];

export const db = {};

export function reset() {
    const rand = prng(1042);
    const pick = (list) => list[Math.floor(rand() * list.length)];
    const now = Date.now();
    const today = new Date(new Date().toISOString().slice(0, 10)).getTime();

    db.team = [
        { id: 1, name: 'Account owner', email: 'owner@acme.example', role: 'Owner', title: 'Owner', presence: 'on' },
        { id: 2, name: 'Operations desk', email: 'operations@acme.example', role: 'Admin', title: 'Operations', presence: 'on' },
        { id: 3, name: 'Finance desk', email: 'finance@acme.example', role: 'Finance', title: 'Finance', presence: 'away' },
        { id: 4, name: 'Customer desk', email: 'support@acme.example', role: 'Support', title: 'Support', presence: 'on' },
        { id: 5, name: 'Support desk', email: 'desk@acme.example', role: 'Support', title: 'Support', presence: 'off' },
        { id: 6, name: 'Accounts desk', email: 'accounts@acme.example', role: 'Finance', title: 'Accounts', presence: 'on' },
        { id: 7, name: 'Auditor desk', email: 'auditor@acme.example', role: 'Viewer', title: 'Auditor', presence: 'off' },
    ];
    db.invites = [{ email: 'new-desk@acme.example', role: 'Support', sent: new Date(now - 2 * DAY).toISOString() }];

    db.permissions = {
        Owner: PERMISSIONS.map(([key]) => key),
        Admin: ['accounts.view', 'accounts.edit', 'invoices.issue', 'team.manage', 'data.export'],
        Finance: ['accounts.view', 'invoices.issue', 'invoices.refund', 'data.export'],
        Support: ['accounts.view', 'accounts.edit'],
        Viewer: ['accounts.view'],
    };

    db.accounts = companyNames.map((name, i) => {
        const status = i % 9 === 4 ? 'churned' : i % 6 === 2 ? 'trial' : 'active';
        const plan = i % 5 === 0 ? 'Enterprise' : i % 3 === 0 ? 'Starter' : 'Growth';
        const seats = plan === 'Enterprise' ? 80 + Math.floor(rand() * 220) : plan === 'Growth' ? 15 + Math.floor(rand() * 60) : 3 + Math.floor(rand() * 12);
        const contacts = Array.from({ length: 1 + Math.floor(rand() * 3) }, (_, n) => {
            const role = pick(contactRoles);
            const slug = role.toLowerCase().replace(/[^a-z]+/g, '');
            const domain = name.toLowerCase().replace(/[^a-z]+/g, '');
            return { name: role, email: `${slug}${n || ''}@${domain}.example`, role };
        });
        return {
            id: 100 + i,
            name,
            industry: pick(INDUSTRIES),
            plan,
            status,
            ownerId: 2 + (i % 5),
            city: pick(cities),
            seats,
            mrr: status === 'trial' ? 0 : seats * 120 + (plan === 'Enterprise' ? 2400 : 0),
            health: status === 'churned' ? 10 + Math.floor(rand() * 20) : 45 + Math.floor(rand() * 55),
            created: new Date(today - (40 + Math.floor(rand() * 900)) * DAY).toISOString(),
            contacts,
            notes: status === 'churned' ? 'Moved to an in-house system. Keep in touch for the next renewal cycle.' : '',
        };
    });

    db.invoices = [];
    let number = 1;
    for (let back = 11; back >= 0; back--) {
        for (const account of db.accounts) {
            if (account.status === 'trial') continue;
            if (account.status === 'churned' && back < 4) continue;
            if (rand() < 0.35) continue;
            const issued = today - back * 30 * DAY - Math.floor(rand() * 20) * DAY;
            if (issued > today) continue;
            const lines = [{ desc: services[0][0], qty: account.seats, unit: services[0][1] }];
            if (rand() < 0.4) { const [desc, unit] = pick(services.slice(1)); lines.push({ desc, qty: 1, unit }); }
            const due = issued + 30 * DAY;
            let status = 'paid';
            if (due > today) status = rand() < 0.75 ? 'sent' : 'paid';
            else if (rand() < 0.12) status = 'sent';
            db.invoices.push({
                id: number,
                number: `INV-${new Date(issued).getUTCFullYear()}-${String(number).padStart(4, '0')}`,
                accountId: account.id,
                issued: new Date(issued).toISOString(),
                due: new Date(due).toISOString(),
                status,
                paidOn: status === 'paid' ? new Date(Math.min(today, issued + (5 + Math.floor(rand() * 25)) * DAY)).toISOString() : null,
                lines,
            });
            number++;
        }
    }
    db.invoices.push({ id: number, number: `INV-${new Date(today).getUTCFullYear()}-${String(number).padStart(4, '0')}`, accountId: 101, issued: new Date(today).toISOString(), due: new Date(today + 30 * DAY).toISOString(), status: 'draft', paidOn: null, lines: [{ desc: services[2][0], qty: 1, unit: services[2][1] }] });
    db.nextInvoice = number + 1;
    db.nextAccount = 100 + companyNames.length;

    const actors = db.team.slice(1, 6);
    db.audit = [];
    const recent = db.invoices.filter((inv) => inv.paidOn).slice(-6);
    recent.forEach((inv, i) => {
        db.audit.push({ at: new Date(now - (i + 1) * 47 * 60000).toISOString(), actor: pick(actors).name, action: 'recorded a payment on', target: inv.number, href: `/invoices/${inv.id}` });
    });
    db.audit.push({ at: new Date(now - 6 * 3600000).toISOString(), actor: 'Operations desk', action: 'upgraded to Enterprise', target: 'Acme Energy', href: '/accounts/103' });
    db.audit.push({ at: new Date(now - 26 * 3600000).toISOString(), actor: 'Account owner', action: 'invited', target: 'new-desk@acme.example', href: '/team' });
    db.audit.sort((a, b) => b.at.localeCompare(a.at));

    db.settings = { company: 'Acme Corp', email: 'billing@acme.example', currency: 'ZAR', weeklyDigest: true, overdueAlerts: true, twoFactor: true };
    db.bootedAt = new Date(now).toISOString();
}

reset();

// ---- reads ---------------------------------------------------------------------------------

export const account = (id) => db.accounts.find((a) => a.id === Number(id));
export const invoice = (id) => db.invoices.find((i) => i.id === Number(id));
export const member = (id) => db.team.find((m) => m.id === Number(id));

export function total(inv) {
    return inv.lines.reduce((sum, line) => sum + line.qty * line.unit, 0) * 1.15; // VAT 15%
}

export function invoiceState(inv) {
    if (inv.status === 'sent' && new Date(inv.due).getTime() < Date.now()) return 'overdue';
    return inv.status;
}

export function log(actor, action, target, href) {
    db.audit.unshift({ at: new Date().toISOString(), actor, action, target, href });
    db.audit.length = Math.min(db.audit.length, 200);
}

export function can(role, permission) {
    return (db.permissions[role] || []).includes(permission);
}
