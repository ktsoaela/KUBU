// WebKit, the engine inside Safari. Safari itself cannot be driven on Windows or Linux, so this pass
// uses the WebKit build that Playwright ships: npm install, then `npx playwright-core install webkit`.
// It is optional: without playwright-core or the browser, the pass is skipped with a note.
import { existsSync } from 'node:fs';

export async function available() {
    let pw;
    try {
        pw = await import('playwright-core');
    } catch {
        return 'playwright-core is not installed (npm install)';
    }
    if (!existsSync(pw.webkit.executablePath())) return 'WebKit is not downloaded (npx playwright-core install webkit)';
    return null;
}

export async function launch({ name }) {
    const { webkit } = await import('playwright-core');
    const browser = await webkit.launch();
    let state = { scheme: null, scripts: true };
    let context;
    let page;

    // Scripts on or off is a property of a Playwright context, so changing it opens a new one.
    async function open() {
        await context?.close();
        context = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: state.scripts });
        page = await context.newPage();
        await page.emulateMedia({ colorScheme: state.scheme ?? 'no-preference' });
    }
    await open();

    return {
        name: `${name} ${browser.version()}`,
        // Indirect eval runs the text as a script, the same as the other drivers, so a check may
        // pass statements as well as an expression.
        evaluate: (expression) => page.evaluate(`(0, eval)(${JSON.stringify(expression)})`),
        async load(url) {
            await page.goto(url, { waitUntil: 'load' });
        },
        click: (x, y) => page.mouse.click(x, y),
        pressTab: () => page.keyboard.press('Tab'),
        async setScheme(scheme) {
            state.scheme = scheme;
            await page.emulateMedia({ colorScheme: scheme ?? 'no-preference' });
        },
        async setScripts(scripts) {
            if (scripts === state.scripts) return;
            state.scripts = scripts;
            await open();
        },
        close: () => browser.close(),
    };
}
