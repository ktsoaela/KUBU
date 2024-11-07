class CloseButton {
    constructor(selector, options = {}) {
        this.buttonElement = document.querySelector(selector);
        this.targetSelector = options.target || null; // The element to close (e.g., a modal, alert)
        this.onCloseCallback = options.onClose || null; // Optional callback on close action
        
        this.render();
        this.init();
    }

    render() {
        // Set the button’s appearance (default styling as a close button)
        this.buttonElement.classList.add('close-button');
        this.buttonElement.setAttribute('aria-label', 'Close');
        this.buttonElement.innerHTML = '&times;'; // Using an "X" symbol for close
    }

    init() {
        // Attach click event to perform the close action
        this.buttonElement.addEventListener('click', () => this.close());
    }

    close() {
        // Find the target element and hide or remove it
        if (this.targetSelector) {
            const targetElement = document.querySelector(this.targetSelector);
            if (targetElement) {
                targetElement.style.display = 'none'; // Hides the element
                // Alternatively, use: targetElement.remove(); to fully remove from DOM
            }
        }
        
        // Execute the onClose callback if provided
        if (this.onCloseCallback) this.onCloseCallback();
    }
}

// Usage example
// HTML: <button id="myCloseButton"></button> <div id="alertBox">Alert message</div>
const myCloseButton = new CloseButton('#myCloseButton', {
    target: '#alertBox', // The element to be closed
    onClose: () => {
        console.log('Alert has been closed!');
    }
});
