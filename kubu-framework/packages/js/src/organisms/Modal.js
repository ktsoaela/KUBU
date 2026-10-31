// Wraps a native <dialog class="modal"> (with .modal__header, .modal__body, .modal__footer; the older
// single-part .modal-dialog also works): focus trapping, Esc and the backdrop come from the browser.
// Any element with data-kubu-open="#dialog-id" opens it; any [data-kubu-close] inside it closes it.
const resolve = (target) => (typeof target === 'string' ? document.querySelector(target) : target);

export class Modal {
    constructor(selector, options = {}) {
        this.dialog = resolve(selector);
        this.closeOnBackdrop = options.closeOnBackdrop ?? true;
        this.onClose = options.onClose || null;

        document.querySelectorAll(`[data-kubu-open="#${this.dialog.id}"]`).forEach((trigger) =>
            trigger.addEventListener('click', () => this.open())
        );
        this.dialog.querySelectorAll('[data-kubu-close]').forEach((button) =>
            button.addEventListener('click', () => this.close())
        );
        this.dialog.addEventListener('click', (e) => {
            if (this.closeOnBackdrop && e.target === this.dialog) this.close();
        });
        this.dialog.addEventListener('close', () => {
            if (this.onClose) this.onClose(this.dialog.returnValue);
        });
    }

    open() {
        this.dialog.showModal();
    }

    close(returnValue) {
        this.dialog.close(returnValue);
    }
}
