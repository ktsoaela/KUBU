class Pagination {
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
            pageItem.classList.add('pagination-item');
            if (i === this.currentPage) {
                pageItem.classList.add('active');
            }
            this.paginationElement.appendChild(pageItem);
        }
    }

    bindEvents() {
        this.paginationElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('pagination-item')) {
                this.handlePageChange(parseInt(e.target.textContent, 10));
            }
        });
    }

    handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= this.totalPages) {
            this.currentPage = newPage;
            this.render();
            console.log(`Page changed to: ${this.currentPage}`);
        }
    }
}

// Usage example
// HTML: <div id="pagination"></div>
const myPagination = new Pagination('#pagination', { totalPages: 5, currentPage: 1 });
