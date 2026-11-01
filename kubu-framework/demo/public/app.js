// Optional, and only loaded with htmx. The console works without it.
// 1. Mark <html> so CSS can hide buttons that htmx makes unneeded (Save role saves on change).
// 2. After htmx swaps the whole screen, move focus to the new <main>, as a page load would.
document.documentElement.classList.add('htmx-on');
document.addEventListener('htmx:afterSettle', (event) => {
    if (event.detail.target && event.detail.target.id === 'app') {
        const main = document.getElementById('main');
        if (main) main.focus({ preventScroll: true });
    }
});
