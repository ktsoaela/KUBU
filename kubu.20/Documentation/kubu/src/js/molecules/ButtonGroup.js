export class ButtonGroup {
    constructor(selector) {
        this.buttonGroupElement = document.querySelector(selector);
        this.buttons = this.buttonGroupElement.querySelectorAll('.button');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.toggleButton(button));
        });
    }

    toggleButton(button) {
        // If the button is already active, do nothing
        if (button.classList.contains('active')) {
            return;
        }

        // Remove active class from all buttons
        this.buttons.forEach(btn => btn.classList.remove('active'));

        // Set the clicked button as active
        button.classList.add('active');
    }
}
