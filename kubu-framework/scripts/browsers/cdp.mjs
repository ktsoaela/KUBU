// Chrome and Edge, launched directly and driven over the DevTools protocol. No npm packages.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import path from 'node:path';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launch({ name, exe, cache }) {
    const profile = mkdtempSync(path.join(cache, `kubu-smoke-${name}-`));
    // Keep the test tab awake. Edge freezes tabs it thinks are in the background (sleeping tabs,
    // and efficiency mode when memory is low); a frozen tab stops restyling and never finishes a load.
    const awake = ['--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows', '--disable-features=CalculateNativeWinOcclusion,IntensiveWakeUpThrottling,msSleepingTabs,msEfficiencyMode'];
    const proc = spawn(exe, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--window-size=1280,900', ...awake, 'about:blank']);
    const wsUrl = await new Promise((resolve, reject) => {
        let err = '';
        proc.stderr.on('data', (d) => {
            err += d;
            const m = err.match(/ws:\/\/[^\s]+/);
            if (m) resolve(m[0]);
        });
        proc.on('exit', () => reject(new Error(`${name} exited: ${err}`)));
    });

    const ws = new WebSocket(wsUrl);
    await new Promise((r) => ws.addEventListener('open', r));
    let nextId = 0;
    const pending = new Map();
    const listeners = [];
    ws.addEventListener('message', (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id && pending.has(msg.id)) {
            const { resolve, reject } = pending.get(msg.id);
            pending.delete(msg.id);
            msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
        } else if (msg.method) listeners.forEach((l) => l(msg));
    });
    const send = (method, params = {}, sessionId) =>
        new Promise((resolve, reject) => {
            const id = ++nextId;
            pending.set(id, { resolve, reject });
            ws.send(JSON.stringify({ id, method, params, sessionId }));
        });

    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    const cdp = (method, params) => send(method, params, sessionId);
    await cdp('Page.enable');
    await cdp('Runtime.enable');
    await cdp('Page.bringToFront');

    const evaluate = async (expression) => {
        const { result, exceptionDetails } = await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
        if (exceptionDetails) throw new Error(exceptionDetails.exception?.description || exceptionDetails.text);
        return result.value;
    };

    return {
        name,
        evaluate,
        async load(url) {
            const done = new Promise((r) => {
                const l = (m) => m.method === 'Page.loadEventFired' && m.sessionId === sessionId && (listeners.splice(listeners.indexOf(l), 1), r());
                listeners.push(l);
            });
            await cdp('Page.navigate', { url });
            await done;
        },
        async click(x, y) {
            for (const type of ['mousePressed', 'mouseReleased']) await cdp('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 });
        },
        async pressTab() {
            await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
            await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
        },
        async setScheme(scheme) {
            await cdp('Emulation.setEmulatedMedia', { features: scheme ? [{ name: 'prefers-color-scheme', value: scheme }] : [] });
        },
        async setScripts(on) {
            await cdp('Emulation.setScriptExecutionDisabled', { value: !on });
        },
        async close() {
            ws.close();
            proc.kill();
            await sleep(300);
            try {
                rmSync(profile, { recursive: true, force: true });
            } catch {
                /* the browser may still hold a file for a moment */
            }
        },
    };
}
