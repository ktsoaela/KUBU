export class Tooltip {
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
        this.tooltipElement.className = 'kubu-tooltip';
        this.tooltipElement.id = `kubu-tooltip-${Math.random().toString(36).slice(2, 8)}`;
        this.tooltipElement.setAttribute('role', 'tooltip');
        this.tooltipElement.innerText = this.message;
        this.element.setAttribute('aria-describedby', this.tooltipElement.id);

        // Apply tooltip styling and add to the DOM
        this.element.style.position = 'relative';
        this.element.appendChild(this.tooltipElement);

        // Hide tooltip initially
        this.tooltipElement.style.display = 'none';

        // Event listeners for mouse enter and leave
        this.element.addEventListener('mouseenter', () => this.showTooltip());
        this.element.addEventListener('mouseleave', () => this.hideTooltip());
        this.element.addEventListener('focusin', () => this.showTooltip());
        this.element.addEventListener('focusout', () => this.hideTooltip());
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
