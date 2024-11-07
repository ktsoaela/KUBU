class BreadCrumb {
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
            <li class="breadcrumb-item${isLastItem ? ' active' : ''}">
                ${isLastItem ? item.label : `<a href="${item.link}">${item.label}</a>`}
            </li>
        `;
    }

    bindEvents() {
        // You can add additional event listeners if necessary
    }
}

// Usage example
// HTML: <ul id="myBreadcrumb"></ul>
const myBreadcrumb = new BreadCrumb('#myBreadcrumb');
myBreadcrumb.addItem('Home', '/home');
myBreadcrumb.addItem('Library', '/library');
myBreadcrumb.addItem('Data', '/data');
