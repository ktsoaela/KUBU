// A tagged template that escapes every value unless it is already HTML.
// html`<p>${name}</p>` is safe for any name; nest html`` results and arrays freely.

class Html {
    constructor(text) { this.text = text; }
    toString() { return this.text; }
}

export const raw = (text) => new Html(String(text));

export function escape(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function render(value) {
    if (value === null || value === undefined || value === false) return '';
    if (value instanceof Html) return value.text;
    if (Array.isArray(value)) return value.map(render).join('');
    return escape(value);
}

export function html(strings, ...values) {
    let out = strings[0];
    values.forEach((value, i) => { out += render(value) + strings[i + 1]; });
    return new Html(out);
}

// ---- formatting ----------------------------------------------------------------------------

export function money(amount) {
    const [whole, cents] = Math.abs(amount).toFixed(2).split('.');
    const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${amount < 0 ? '-' : ''}R ${grouped}.${cents}`;
}

export function moneyShort(amount) {
    if (amount >= 1_000_000) return `R ${(amount / 1_000_000).toFixed(1)}m`;
    if (amount >= 1_000) return `R ${Math.round(amount / 1_000)}k`;
    return money(amount);
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function day(iso) {
    const d = new Date(iso);
    return `${d.getUTCDate()} ${months[d.getUTCMonth()].slice(0, 3)} ${d.getUTCFullYear()}`;
}

export function monthName(index) { return months[index]; }

export function ago(iso, now = Date.now()) {
    const minutes = Math.round((now - new Date(iso).getTime()) / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} h ago`;
    const days = Math.round(hours / 24);
    return days === 1 ? 'yesterday' : `${days} days ago`;
}

export function initials(name) {
    return name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase();
}

export function icon(name, extra = '') {
    return html`<svg class="icon ${extra}" aria-hidden="true"><use href="/kubu/img/icons.svg#${name}"></use></svg>`;
}

export function plural(n, one, many = `${one}s`) {
    return `${n} ${n === 1 ? one : many}`;
}
