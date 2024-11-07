class ButtonGroup {
    constructor(selector) {
        this.buttonGroupElement = document.querySelector(selector);
        this.buttons = this.buttonGroupElement.querySelectorAll('.btn');
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

// Usage example
// HTML: <div id="myButtonGroup" class="button-group">
//           <button class="btn">Button 1</button>
//           <button class="btn">Button 2</button>
//           <button class="btn">Button 3</button>
//       </div>
const myButtonGroup = new ButtonGroup('#myButtonGroup');
