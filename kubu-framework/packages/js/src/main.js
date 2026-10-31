// KUBU 2.0 JavaScript layer.
// Import what you need:  import { Modal, Carousel } from './src/js/main.js';
// Or let it wire itself: add data-kubu="modal|carousel|navbar|accordion|progress|tooltip" to elements.
// autoInit() runs on load and again after every htmx swap.

export { Badge } from './atoms/Badge.js';
export { Button } from './atoms/Button.js';
export { CloseButton } from './atoms/CloseButton.js';
export { Placeholder } from './atoms/Placeholder.js';
export { Spinner } from './atoms/Spinner.js';
export { Tooltip } from './atoms/Tooltip.js';
export { Alert } from './molecules/Alert.js';
export { BreadCrumb } from './molecules/Breadcrumb.js';
export { ButtonGroup } from './molecules/ButtonGroup.js';
export { ListGroup } from './molecules/ListGroup.js';
export { Pagination } from './molecules/Pagination.js';
export { ProgressBar } from './molecules/ProgressBar.js';
export { ToggleButton } from './molecules/ToggleButton.js';
export { Accordion } from './organisms/Accordion.js';
export { Card } from './organisms/Card.js';
export { Carousel } from './organisms/Carousel.js';
export { Modal } from './organisms/Modal.js';
export { Navbar } from './organisms/Navbar.js';

import { Tooltip } from './atoms/Tooltip.js';
import { ProgressBar } from './molecules/ProgressBar.js';
import { Accordion } from './organisms/Accordion.js';
import { Carousel } from './organisms/Carousel.js';
import { Modal } from './organisms/Modal.js';
import { Navbar } from './organisms/Navbar.js';

const registry = {
    accordion: (el) => new Accordion(el),
    carousel: (el) => new Carousel(el, { autoplay: el.hasAttribute('data-autoplay') }),
    modal: (el) => new Modal(el),
    navbar: (el) => new Navbar(el),
    progress: (el) => new ProgressBar(el, { value: Number(el.dataset.value || 0) }),
    tooltip: (el) => new Tooltip(`#${el.id}`, { message: el.dataset.tooltip, position: el.dataset.position }),
};

export function autoInit(root = document) {
    root.querySelectorAll('[data-kubu]:not([data-kubu-ready])').forEach((el) => {
        const create = registry[el.dataset.kubu];
        if (!create) return;
        el.kubu = create(el);
        el.setAttribute('data-kubu-ready', '');
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => autoInit());
} else {
    autoInit();
}

document.addEventListener('htmx:afterSettle', (e) => autoInit(e.target));
