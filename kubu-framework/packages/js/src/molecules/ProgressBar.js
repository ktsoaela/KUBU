const resolve = (target) => (typeof target === 'string' ? document.querySelector(target) : target);

export class ProgressBar {
    constructor(selector, options = {}) {
        this.element = resolve(selector);
        this.max = options.max ?? 100;
        this.label = options.label || 'Progress';
        this.render();
        this.setValue(options.value ?? 0);
    }

    render() {
        this.element.classList.add('progress');
        this.bar = this.element.querySelector('.progress-bar') || document.createElement('div');
        this.bar.className = 'progress-bar';
        this.bar.setAttribute('role', 'progressbar');
        this.bar.setAttribute('aria-label', this.label);
        this.bar.setAttribute('aria-valuemin', '0');
        this.bar.setAttribute('aria-valuemax', String(this.max));
        this.element.appendChild(this.bar);
    }

    setValue(value) {
        this.value = Math.min(Math.max(value, 0), this.max);
        this.bar.style.width = `${(this.value / this.max) * 100}%`;
        this.bar.setAttribute('aria-valuenow', String(this.value));
    }
}
