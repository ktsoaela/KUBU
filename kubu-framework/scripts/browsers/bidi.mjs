// Firefox, launched directly and driven over WebDriver BiDi, which Firefox serves itself.
// No npm packages and no geckodriver.
//
// Firefox has no BiDi command to switch the colour scheme or turn scripts off, so both are profile
// preferences. Changing either restarts Firefox with a fresh profile; the checks load a page after
// every change, so nothing is lost.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// A BiDi RemoteValue back to a plain JSON value.
function plain(v) {
    switch (v?.type) {
        case 'string':
        case 'boolean':
            return v.value;
        case 'number':
            return typeof v.value === 'number' ? v.value : Number(v.value);
        case 'array':
            return v.value.map(plain);
        case 'object':
            return Object.fromEntries(v.value.map(([k, val]) => [typeof k === 'string' ? k : plain(k), plain(val)]));
        default:
            return v?.type === 'null' ? null : undefined;
    }
}

export async function launch({ name, exe, cache }) {
    let state = { scheme: null, scripts: true };
    let session;

    async function start() {
        const profile = mkdtempSync(path.join(cache, `kubu-smoke-${name}-`));
        const scheme = { dark: 0, light: 1 }[state.scheme] ?? 2; // 2 follows the system
        writeFileSync(
            path.join(profile, 'user.js'),
            [
                `user_pref("layout.css.prefers-color-scheme.content-override", ${scheme});`,
                `user_pref("javascript.enabled", ${state.scripts});`,
                'user_pref("accessibility.tabfocus", 7);', // Tab reaches links as well as form controls
                'user_pref("browser.shell.checkDefaultBrowser", false);',
                'user_pref("datareporting.policy.dataSubmissionEnabled", false);',
            ].join('\n'),
        );
        const proc = spawn(exe, ['--headless', '--no-remote', '--remote-debugging-port=0', '--profile', profile, 'about:blank']);
        const url = await new Promise((resolve, reject) => {
            let out = '';
            const read = (d) => {
                out += d;
                const m = out.match(/WebDriver BiDi listening on (ws:\/\/\S+)/);
                if (m) resolve(m[1]);
            };
            proc.stderr.on('data', read);
            proc.stdout.on('data', read);
            proc.on('exit', () => reject(new Error(`${name} exited: ${out}`)));
        });

        const ws = new WebSocket(`${url}/session`);
        await new Promise((r) => ws.addEventListener('open', r));
        let nextId = 0;
        const pending = new Map();
        ws.addEventListener('message', (e) => {
            const msg = JSON.parse(e.data);
            if (msg.id && pending.has(msg.id)) {
                const { resolve, reject } = pending.get(msg.id);
                pending.delete(msg.id);
                msg.type === 'error' ? reject(new Error(`${msg.error}: ${msg.message}`)) : resolve(msg.result);
            }
        });
        const send = (method, params = {}) =>
            new Promise((resolve, reject) => {
                const id = ++nextId;
                pending.set(id, { resolve, reject });
                ws.send(JSON.stringify({ id, method, params }));
            });

        await send('session.new', { capabilities: {} });
        const { contexts } = await send('browsingContext.getTree', {});
        const context = contexts[0].context;
        await send('browsingContext.setViewport', { context, viewport: { width: 1280, height: 900 } });
        session = { proc, ws, send, context, profile };
    }

    async function stop() {
        if (!session) return;
        const { proc, ws, profile } = session;
        session = null;
        ws.close();
        proc.kill();
        await sleep(500);
        try {
            rmSync(profile, { recursive: true, force: true });
        } catch {
            /* Firefox may still hold a file for a moment */
        }
    }

    async function restartWith(change) {
        const next = { ...state, ...change };
        if (next.scheme === state.scheme && next.scripts === state.scripts) return;
        state = next;
        await stop();
        await start();
    }

    const pointer = (actions) =>
        session.send('input.performActions', { context: session.context, actions: [{ type: 'pointer', id: 'mouse', parameters: { pointerType: 'mouse' }, actions }] });

    await start();
    return {
        name,
        async evaluate(expression) {
            const res = await session.send('script.evaluate', {
                expression,
                target: { context: session.context },
                awaitPromise: true,
                resultOwnership: 'none',
                serializationOptions: { maxObjectDepth: 10, maxDomDepth: 0 },
            });
            if (res.type === 'exception') throw new Error(res.exceptionDetails?.text || 'script error');
            return plain(res.result);
        },
        async load(url) {
            await session.send('browsingContext.navigate', { context: session.context, url, wait: 'complete' });
            // Bring the tab to the front, so keyboard focus counts as keyboard focus (:focus-visible).
            await session.send('browsingContext.activate', { context: session.context });
        },
        async click(x, y) {
            await pointer([{ type: 'pointerMove', x: Math.round(x), y: Math.round(y) }, { type: 'pointerDown', button: 0 }, { type: 'pointerUp', button: 0 }]);
        },
        async pressTab() {
            await session.send('input.performActions', {
                context: session.context,
                actions: [{ type: 'key', id: 'keyboard', actions: [{ type: 'keyDown', value: '' }, { type: 'keyUp', value: '' }] }],
            });
        },
        setScheme: (scheme) => restartWith({ scheme }),
        setScripts: (scripts) => restartWith({ scripts }),
        close: stop,
    };
}
