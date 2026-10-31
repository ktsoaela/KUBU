// Collapses .navbar-nav behind a toggle button on small screens.
// Markup: <nav class="navbar"> <button class="navbar__toggle" aria-controls="menu"> <div id="menu" class="navbar-nav">
const resolve = (target) => (typeof target === 'string' ? document.querySelector(target) : target);

export class Navbar {
    constructor(selector) {
        this.element = resolve(selector);
        this.toggle = this.element.querySelector('.navbar__toggle');
        this.menu = this.element.querySelector('.navbar-nav');
        if (!this.toggle || !this.menu) return;

        this.toggle.setAttribute('aria-expanded', 'false');
        this.toggle.addEventListener('click', () => this.setOpen(this.toggle.getAttribute('aria-expanded') !== 'true'));
        this.element.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.setOpen(false);
        });
        this.menu.addEventListener('click', (e) => {
            if (e.target.closest('a')) this.setOpen(false);
        });
    }

    setOpen(open) {
        this.toggle.setAttribute('aria-expanded', String(open));
        this.menu.classList.toggle('is-open', open);
    }
}
