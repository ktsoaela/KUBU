export class Spinner {
    constructor(selector, options = {}) {
        this.spinnerElement = document.querySelector(selector);
        this.size = options.size || 'medium'; // 'small', 'medium', or 'large'
        this.color = options.color || null; // Defaults to the theme's --spinner-color
        this.animationType = options.animationType || 'rotate'; // Animation style, e.g., 'rotate' or 'pulse'
        
        this.render();
    }

    render() {
        // Add base styling to spinner element
        // .spinner in kubu.css draws the ring and animation; size and colour are variables
        this.spinnerElement.classList.add('spinner');
        this.spinnerElement.setAttribute('role', 'status');
        this.spinnerElement.setAttribute('aria-label', 'Loading');
        this.spinnerElement.style.setProperty('--spinner-size', this.getSize());
        if (this.color) this.spinnerElement.style.setProperty('--spinner-color', this.color);

        // Add animation class based on the animation type
        if (this.animationType === 'rotate') {
            this.spinnerElement.classList.add('spinner-rotate');
        } else if (this.animationType === 'pulse') {
            this.spinnerElement.classList.add('spinner-pulse');
        }
    }

    getSize() {
        // Define sizes for different spinner sizes
        switch (this.size) {
            case 'small':
                return '20px';
            case 'large':
                return '50px';
            default:
                return '30px';
        }
    }
}
