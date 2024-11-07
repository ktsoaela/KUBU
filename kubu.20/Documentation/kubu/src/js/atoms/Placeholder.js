class Placeholder {
    constructor(selector, options = {}) {
        this.element = document.querySelector(selector);
        this.type = options.type || 'text'; // Placeholder type: 'text', 'image', 'animation'
        this.text = options.text || 'Loading...';
        this.width = options.width || '100%';
        this.height = options.height || '1em';
        this.init();
    }

    init() {
        // Set up the placeholder based on the type
        if (this.type === 'text') {
            this.setTextPlaceholder();
        } else if (this.type === 'image') {
            this.setImagePlaceholder();
        } else if (this.type === 'animation') {
            this.setAnimationPlaceholder();
        }
    }

    setTextPlaceholder() {
        // Create a text placeholder with styling
        this.element.style.width = this.width;
        this.element.style.height = this.height;
        this.element.style.backgroundColor = '#e0e0e0';
        this.element.style.color = 'transparent';
        this.element.style.borderRadius = '4px';
        this.element.style.lineHeight = this.height;
        this.element.style.textAlign = 'center';
        this.element.textContent = this.text;
    }

    setImagePlaceholder() {
        // Create an image placeholder with specific dimensions
        this.element.style.width = this.width;
        this.element.style.height = this.height;
        this.element.style.backgroundColor = '#e0e0e0';
        this.element.style.display = 'inline-block';
        this.element.style.borderRadius = '4px';
    }

    setAnimationPlaceholder() {
        // Create a placeholder with a loading animation
        this.element.classList.add('loading-animation'); // Add a CSS animation class
        this.element.style.width = this.width;
        this.element.style.height = this.height;
        this.element.style.backgroundColor = '#e0e0e0';
    }

    remove() {
        // Remove placeholder styling and reset element content
        this.element.style = '';
        this.element.textContent = '';
        this.element.classList.remove('loading-animation');
    }
}

// Usage example
// HTML: <div id="myPlaceholder"></div>
const myPlaceholder = new Placeholder('#myPlaceholder', {
    type: 'text',
    text: 'Loading...',
    width: '200px',
    height: '20px'
});

// To remove the placeholder after content has loaded
// myPlaceholder.remove();
