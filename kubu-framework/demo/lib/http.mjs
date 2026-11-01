// Small request and response helpers on node:http. No framework.

export function cookies(req) {
    const out = {};
    for (const part of (req.headers.cookie || '').split(';')) {
        const at = part.indexOf('=');
        if (at > 0) out[part.slice(0, at).trim()] = decodeURIComponent(part.slice(at + 1).trim());
    }
    return out;
}

export function cookie(name, value, { maxAge = 60 * 60 * 24 * 365 } = {}) {
    return `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax; HttpOnly; Max-Age=${maxAge}`;
}

export async function form(req) {
    let body = '';
    for await (const chunk of req) {
        body += chunk;
        if (body.length > 1_000_000) throw new Error('Body too large');
    }
    return new URLSearchParams(body);
}

export function send(res, status, body, headers = {}) {
    res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
    res.end(String(body));
}

// Post/Redirect/Get. A plain form follows the 303 with a full page load; htmx follows it inside
// the same request and swaps the result, so one handler serves both.
export function redirect(res, location, headers = {}) {
    res.writeHead(303, { Location: location, ...headers });
    res.end();
}

// A short message for the next page: a cookie that the next render reads and clears.
export function flash(text, tone = 'success') {
    return cookie('flash', JSON.stringify({ text, tone }), { maxAge: 60 });
}

export function back(req, fallback = '/') {
    try {
        const ref = new URL(req.headers.referer);
        if (ref.host === req.headers.host) return ref.pathname + ref.search;
    } catch { /* no referer */ }
    return fallback;
}
