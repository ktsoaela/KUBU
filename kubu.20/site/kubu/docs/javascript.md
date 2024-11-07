# Kubu JavaScript Enhancements

While Kubu is primarily a CSS framework, you can enhance your components with JavaScript for additional interactivity. This section provides examples of how to use JavaScript to manage button functionalities and other interactive components.

## Button Variants and Groups

### Button Variants

You can create various button styles using classes that represent different variants. For instance, buttons can have primary, secondary, and danger styles.

### Example HTML:

```html
<div class="button-group">
    <button class="btn btn-primary" onclick="handleButtonClick('primary')">Primary</button>
    <button class="btn btn-secondary" onclick="handleButtonClick('secondary')">Secondary</button>
    <button class="btn btn-danger" onclick="handleButtonClick('danger')">Danger</button>
</div>
```

### Example JavaScript:

```javascript
function handleButtonClick(type) {
    switch(type) {
        case 'primary':
            alert('Primary button clicked!');
            break;
        case 'secondary':
            alert('Secondary button clicked!');
            break;
        case 'danger':
            alert('Danger button clicked!');
            break;
        default:
            alert('Button clicked!');
    }
}
```

## Button Groups

### Purpose

Button groups allow you to group multiple buttons together, either horizontally or vertically.

### Example HTML:

```html
<div class="button-group vertical">
    <button class="btn btn-primary" onclick="handleButtonClick('primary')">Primary</button>
    <button class="btn btn-secondary" onclick="handleButtonClick('secondary')">Secondary</button>
</div>
```

### Example CSS:

```css
.button-group {
    display: flex;
}

.button-group.vertical {
    flex-direction: column;
}

.button-group.horizontal {
    flex-direction: row;
}
```

## Isolated Buttons

### Purpose

Isolated buttons can be used anywhere in your layout without being part of a group.

### Example HTML:

```html
<button class="btn btn-primary isolated" onclick="handleButtonClick('isolated')">Isolated Button</button>
```

### Example CSS:

```css
.isolated {
    margin: 1rem; /* Adds margin around isolated buttons */
}
```

### Example JavaScript:

```javascript
document.querySelectorAll('.isolated').forEach(button => {
    button.addEventListener('click', () => {
        alert('Isolated button clicked!');
    });
});
```

## Toggle Buttons

### Purpose

Toggle buttons can switch between two states, such as on and off.

### Example HTML:

```html
<button class="btn btn-toggle" onclick="toggleButton(this)">Toggle Me</button>
```

### Example JavaScript:

```javascript
function toggleButton(button) {
    button.classList.toggle('active');
    button.innerText = button.classList.contains('active') ? 'On' : 'Off';
}
```

## Conclusion

By incorporating JavaScript into your Kubu CSS framework, you can significantly enhance user interaction and component functionality. This section outlined how to manage button variants, groups, isolated buttons, and toggle states with practical examples. For more detailed information and further customization options, please refer to the [Kubu Documentation](https://github.com/yourusername/kubu/docs).

