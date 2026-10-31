// Renders a KUBU card (.card, .card__image, .card__header, .card__body, .card__footer) from data.
const resolve = (target) => (typeof target === 'string' ? document.querySelector(target) : target);
const escape = (text = '') => String(text).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export class Card {
    constructor(selector, options = {}) {
        this.element = resolve(selector);
        this.options = options;
        this.render();
    }

    render() {
        const { title, text, image, imageAlt = '', footer, href, variant } = this.options;
        this.element.classList.add('card');
        if (variant) this.element.classList.add(`card--${variant}`);
        const heading = href ? `<a href="${escape(href)}">${escape(title)}</a>` : escape(title);
        this.element.innerHTML = `
            ${image ? `<img class="card__image" src="${escape(image)}" alt="${escape(imageAlt)}">` : ''}
            ${title ? `<div class="card__header"><h3 class="card__title">${heading}</h3></div>` : ''}
            ${text ? `<div class="card__body"><p>${escape(text)}</p></div>` : ''}
            ${footer ? `<div class="card__footer">${escape(footer)}</div>` : ''}
        `;
    }

    update(options) {
        this.options = { ...this.options, ...options };
        this.render();
    }
}
