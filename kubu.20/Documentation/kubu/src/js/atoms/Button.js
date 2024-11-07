class Button {
    constructor(selector, options = {}) {
        this.buttonElement = document.querySelector(selector);
        this.text = options.text || 'Button';
        this.variant = options.variant || 'primary'; // e.g., 'primary', 'secondary', 'danger', etc.
        this.size = options.size || 'medium'; // e.g., 'small', 'medium', 'large'
        this.isActive = options.isActive || false;
        this.onClickCallback = options.onClick || null;
        
        this.render();
        this.init();
    }

    render() {
        // Set button text, variant, and size
        this.buttonElement.classList.add('btn', `btn-${this.variant}`, `btn-${this.size}`);
        this.buttonElement.innerText = this.text;
        if (this.isActive) this.buttonElement.classList.add('active');
    }

    init() {
        // Attach click event
        this.buttonElement.addEventListener('click', () => this.handleClick());
    }

    handleClick() {
        // Toggle active state and execute the callback function
        this.isActive = !this.isActive;
        this.buttonElement.classList.toggle('active', this.isActive);
        if (this.onClickCallback) this.onClickCallback(this.isActive);
    }

    updateText(newText) {
        // Update button text
        this.text = newText;
        this.buttonElement.innerText = this.text;
    }

    updateVariant(newVariant) {
        // Update button style by changing variant
        this.buttonElement.classList.remove(`btn-${this.variant}`);
        this.variant = newVariant;
        this.buttonElement.classList.add(`btn-${this.variant}`);
    }

    disable() {
        this.buttonElement.disabled = true;
        this.buttonElement.classList.add('disabled');
    }

    enable() {
        this.buttonElement.disabled = false;
        this.buttonElement.classList.remove('disabled');
    }
}

// Usage example
// HTML: <button id="myButton"></button>
const myButton = new Button('#myButton', {
    text: 'Click Me',
    variant: 'success',
    size: 'large',
    onClick: (isActive) => {
        console.log(`Button is now ${isActive ? 'active' : 'inactive'}`);
    }
});
