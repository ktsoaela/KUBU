export class Pagination {
    constructor(selector, options = {}) {
        this.paginationElement = document.querySelector(selector);
        this.totalPages = options.totalPages || 1;
        this.currentPage = options.currentPage || 1;
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        this.paginationElement.innerHTML = '';
        for (let i = 1; i <= this.totalPages; i++) {
            const pageItem = document.createElement('button');
            pageItem.textContent = i;
            pageItem.type = 'button';
            pageItem.classList.add('pagination__link');
            if (i === this.currentPage) {
                pageItem.classList.add('active');
                pageItem.setAttribute('aria-current', 'page');
            }
            this.paginationElement.appendChild(pageItem);
        }
    }

    bindEvents() {
        this.paginationElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('pagination__link')) {
                this.handlePageChange(parseInt(e.target.textContent, 10));
            }
        });
    }

    handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= this.totalPages) {
            this.currentPage = newPage;
            this.render();
            this.paginationElement.dispatchEvent(new CustomEvent('kubu:page', { detail: { page: this.currentPage } }));
        }
    }
}
