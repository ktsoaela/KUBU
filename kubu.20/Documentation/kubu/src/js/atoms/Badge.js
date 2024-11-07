class Badge {
    constructor(selector, options = {}) {
        this.badgeElement = document.querySelector(selector);
        this.text = options.text || 'Badge';
        this.variant = options.variant || 'primary'; // e.g., 'primary', 'secondary', 'success', etc.
        this.render();
    }

    render() {
        // Apply badge styles and content
        this.badgeElement.classList.add('badge', `badge-${this.variant}`);
        this.badgeElement.innerText = this.text;
    }

    updateText(newText) {
        this.text = newText;
        this.badgeElement.innerText = this.text;
    }

    updateVariant(newVariant) {
        // Remove previous variant class and add the new one
        this.badgeElement.classList.remove(`badge-${this.variant}`);
        this.variant = newVariant;
        this.badgeElement.classList.add(`badge-${this.variant}`);
    }
}

// Usage example
// HTML: <span id="myBadge"></span>
const myBadge = new Badge('#myBadge', { text: 'New', variant: 'success' });
myBadge.updateText('Updated');
myBadge.updateVariant('danger');
