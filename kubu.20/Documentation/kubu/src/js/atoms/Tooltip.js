class Tooltip {
    constructor(selector, options = {}) {
        this.element = document.querySelector(selector);
        this.message = options.message || 'Tooltip text';
        this.position = options.position || 'top'; // Position: 'top', 'bottom', 'left', 'right'
        this.tooltipElement = null;

        this.init();
    }

    init() {
        // Create tooltip element
        this.tooltipElement = document.createElement('div');
        this.tooltipElement.className = 'tooltip';
        this.tooltipElement.innerText = this.message;

        // Apply tooltip styling and add to the DOM
        this.element.style.position = 'relative';
        this.element.appendChild(this.tooltipElement);

        // Hide tooltip initially
        this.tooltipElement.style.display = 'none';

        // Event listeners for mouse enter and leave
        this.element.addEventListener('mouseenter', () => this.showTooltip());
        this.element.addEventListener('mouseleave', () => this.hideTooltip());
    }

    showTooltip() {
        this.tooltipElement.style.display = 'block';
        this.positionTooltip();
    }

    hideTooltip() {
        this.tooltipElement.style.display = 'none';
    }

    positionTooltip() {
        const rect = this.element.getBoundingClientRect();
        const tooltipRect = this.tooltipElement.getBoundingClientRect();

        // Position the tooltip based on the specified position
        switch (this.position) {
            case 'top':
                this.tooltipElement.style.left = `${rect.width / 2 - tooltipRect.width / 2}px`;
                this.tooltipElement.style.top = `-${tooltipRect.height + 8}px`;
                break;
            case 'bottom':
                this.tooltipElement.style.left = `${rect.width / 2 - tooltipRect.width / 2}px`;
                this.tooltipElement.style.top = `${rect.height + 8}px`;
                break;
            case 'left':
                this.tooltipElement.style.left = `-${tooltipRect.width + 8}px`;
                this.tooltipElement.style.top = `${rect.height / 2 - tooltipRect.height / 2}px`;
                break;
            case 'right':
                this.tooltipElement.style.left = `${rect.width + 8}px`;
                this.tooltipElement.style.top = `${rect.height / 2 - tooltipRect.height / 2}px`;
                break;
        }
    }
}

// Usage example
// HTML: <div id="myTooltipElement">Hover over me</div>
const myTooltip = new Tooltip('#myTooltipElement', {
    message: 'This is a tooltip!',
    position: 'top'
});
