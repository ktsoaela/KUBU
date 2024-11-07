class Spinner {
    constructor(selector, options = {}) {
        this.spinnerElement = document.querySelector(selector);
        this.size = options.size || 'medium'; // 'small', 'medium', or 'large'
        this.color = options.color || '#000'; // Default color is black
        this.animationType = options.animationType || 'rotate'; // Animation style, e.g., 'rotate' or 'pulse'
        
        this.render();
    }

    render() {
        // Add base styling to spinner element
        this.spinnerElement.classList.add('spinner');
        this.spinnerElement.style.width = this.getSize();
        this.spinnerElement.style.height = this.getSize();
        this.spinnerElement.style.border = `4px solid ${this.color}`;
        this.spinnerElement.style.borderTopColor = 'transparent';
        this.spinnerElement.style.borderRadius = '50%';

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

// Usage example
// HTML: <div id="mySpinner"></div>
const mySpinner = new Spinner('#mySpinner', {
    size: 'large',
    color: '#3498db', // A nice blue color
    animationType: 'rotate'
});
