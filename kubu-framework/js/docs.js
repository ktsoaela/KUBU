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

function visibleText(node) {
    if (!node) return '';
    if (node.nodeType === Node.TEXT_NODE) return node.textContent;
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const style = getComputedStyle(node);
    if (style.display === 'none' || style.visibility === 'hidden') return '';
    let text = '';
    for (const child of node.childNodes) text += visibleText(child);
    return text;
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
        navigator.clipboard.writeText(visibleText(code)).then(
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

(function () {
    const root = document.getElementById('catalog');
    if (!root) return;
    const input = document.getElementById('catalog-search');
    const count = document.getElementById('catalog-count');
    const cards = [...root.querySelectorAll('.catalog-card')];
    const apply = () => {
        const query = (input?.value || '').trim().toLowerCase();
        for (const card of cards) {
            const title = (card.getAttribute('data-title') || '').toLowerCase();
            card.hidden = query !== '' && !title.includes(query);
        }
        if (!count) return;
        const shown = cards.filter((card) => !card.hidden && getComputedStyle(card).display !== 'none').length;
        count.textContent = `Showing ${shown} ${shown === 1 ? 'section.' : 'sections.'}`;
    };
    input?.addEventListener('input', apply);
    root.addEventListener('change', apply);
})();

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
