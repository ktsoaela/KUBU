// Optional script for the KUBU docs site. Every page, the menu, the current-page highlight, the
// code samples, dialogs, tabs and the theme radios are HTML and CSS; they work without this file.
// With scripts on, it adds four small things:
//   1. remembers the theme you pick (Auto, Dark, Light) for your next page load,
//   2. shows the "Copy code" buttons (the code is always readable in its <details>),
//   3. opens <dialog> from <button commandfor command="show-modal"> in browsers without invoker commands,
//   4. after htmx swaps #frame: moves focus to #main and closes the narrow-screen menu.

const KEY = 'kubu-theme';

function setTheme(theme) {
    const root = document.documentElement;
    try {
        if (theme === 'auto') localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, theme);
    } catch {
        /* storage blocked: the radios still theme this page */
    }
    if (theme === 'auto') delete root.dataset.theme;
    else root.dataset.theme = theme;
}

function showCopyButtons(root) {
    if (navigator.clipboard) root.querySelectorAll('.doc-code__copy[hidden]').forEach((b) => (b.hidden = false));
}

document.addEventListener('change', (e) => {
    if (e.target.name === 'kubu-theme') setTheme(e.target.value);
});

document.addEventListener('click', (e) => {
    const copy = e.target.closest('.doc-code__copy');
    if (copy) {
        const code = copy.closest('.doc-code').querySelector('.doc-code__block');
        navigator.clipboard.writeText(code.textContent).then(
            () => (copy.textContent = 'Copied'),
            () => (copy.textContent = 'Select the code to copy it'),
        );
        setTimeout(() => (copy.textContent = 'Copy code'), 2000);
    }

    const opener = e.target.closest('button[commandfor][command="show-modal"]');
    if (opener && !('command' in HTMLButtonElement.prototype)) {
        document.getElementById(opener.getAttribute('commandfor'))?.showModal();
    }
});

let main = document.getElementById('main');

document.addEventListener('htmx:afterSettle', () => {
    showCopyButtons(document);
    const next = document.getElementById('main');
    if (next === main) return; // a form or a region inside the page was swapped, not the page
    main = next;
    const menu = document.getElementById('site-menu');
    if (menu) menu.checked = false;
    if (!location.hash) main?.focus({ preventScroll: true });
});

const saved = document.getElementById(`${document.documentElement.dataset.theme || 'auto'}-mode`);
if (saved) saved.checked = true;
showCopyButtons(document);
