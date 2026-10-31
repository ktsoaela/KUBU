export class ListGroup {
    constructor(selector) {
        this.listGroupElement = document.querySelector(selector);
        this.items = this.listGroupElement.querySelectorAll('.list-group-item');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.items.forEach(item => {
            item.addEventListener('click', () => this.handleItemClick(item));
        });
    }

    handleItemClick(clickedItem) {
        // Remove active class from all items
        this.items.forEach(item => item.classList.remove('active'));

        // Add active class to the clicked item
        clickedItem.classList.add('active');
    }
}
