class ToggleButton {
    constructor(selector, options = {}) {
        this.buttonElement = document.querySelector(selector);
        this.activeClass = options.activeClass || 'active';
        this.isActive = false;
        this.init();
    }

    init() {
        if (this.buttonElement) {
            this.buttonElement.addEventListener('click', () => this.toggle());
        } else {
            console.error('Button element not found!');
        }
    }

    toggle() {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.buttonElement.classList.add(this.activeClass);
            this.buttonElement.textContent = 'On';
        } else {
            this.buttonElement.classList.remove(this.activeClass);
            this.buttonElement.textContent = 'Off';
        }
    }
}

// Usage example
// HTML: <button id="toggleButton">Off</button>
const myToggleButton = new ToggleButton('#toggleButton', { activeClass: 'btn-active' });
