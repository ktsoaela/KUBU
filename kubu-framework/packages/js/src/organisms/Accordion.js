// Adds a JS API to the CSS-only accordion (.accordion > .tab > input + .tab__label + .tab__content).
// The accordion already works without this file; use it to open panels from code.
const resolve = (target) => (typeof target === 'string' ? document.querySelector(target) : target);

export class Accordion {
    constructor(selector, options = {}) {
        this.element = resolve(selector);
        this.exclusive = options.exclusive ?? this.element.classList.contains('accordion--radio');
        this.inputs = [...this.element.querySelectorAll('.tab > input')];
        this.element.addEventListener('change', (e) => {
            if (this.exclusive && e.target.checked) this.closeAll(e.target);
        });
    }

    open(index) {
        if (this.exclusive) this.closeAll();
        this.inputs[index].checked = true;
    }

    close(index) {
        this.inputs[index].checked = false;
    }

    toggle(index) {
        this.inputs[index].checked ? this.close(index) : this.open(index);
    }

    closeAll(except) {
        this.inputs.forEach((input) => {
            if (input !== except) input.checked = false;
        });
    }
}
