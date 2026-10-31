export class Alert {
    constructor(selector, options = {}) {
        this.alertElement = document.querySelector(selector);
        this.message = options.message || 'This is an alert!';
        this.type = options.type || 'info'; // 'info', 'success', 'warning', 'error'
        this.dismissible = options.dismissible || false;

        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        // Create the alert box
        this.alertElement.innerHTML = `
            <div class="alert alert-${this.type === 'error' ? 'danger' : this.type}" role="alert">
                <span class="alert-message">${this.message}</span>
                ${this.dismissible ? '<button class="alert-close" aria-label="Dismiss">&times;</button>' : ''}
            </div>
        `;
    }

    bindEvents() {
        if (this.dismissible) {
            const closeButton = this.alertElement.querySelector('.alert-close');
            closeButton.addEventListener('click', () => this.dismiss());
        }
    }

    dismiss() {
        this.alertElement.innerHTML = ''; // Clear the alert
    }
}
