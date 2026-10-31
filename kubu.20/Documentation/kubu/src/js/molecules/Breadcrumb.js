export class BreadCrumb {
    constructor(selector) {
        this.breadcrumbElement = document.querySelector(selector);
        this.items = [];
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    addItem(label, link) {
        this.items.push({ label, link });
        this.render();
    }

    render() {
        this.breadcrumbElement.innerHTML = this.items
            .map((item, index) => this.createBreadcrumbItem(item, index))
            .join('');
    }

    createBreadcrumbItem(item, index) {
        const isLastItem = index === this.items.length - 1;
        return `
            <li class="breadcrumb__item${isLastItem ? ' breadcrumb__item--active' : ''}"${isLastItem ? ' aria-current="page"' : ''}>
                ${isLastItem ? item.label : `<a class="breadcrumb__link" href="${item.link}">${item.label}</a>`}
            </li>
        `;
    }

    bindEvents() {
        // You can add additional event listeners if necessary
    }
}
