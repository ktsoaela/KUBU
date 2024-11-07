# Customizing Kubu

Kubu is designed to be flexible and easy to customize, allowing you to adapt the framework to fit your unique branding and design needs. This guide will walk you through the customization options available in Kubu.

## 1. CSS Variables

Kubu utilizes CSS custom properties (variables) for key styling attributes. You can easily override these variables to change the look and feel of your components.

### Default Variables

Here are some default CSS variables defined in Kubu:

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    --font-family: 'Arial', sans-serif;
    --border-radius: 0.25rem;
}
```

### Overriding Variables

You can override these variables in your own CSS file:

```css
:root {
    --primary-color: #ff5733; /* Changing the primary color */
    --font-family: 'Verdana', sans-serif; /* Custom font */
}
```

## 2. Component Customization

Each component in Kubu can be customized individually. Below are examples of how to customize various components.

### Buttons

To change the style of buttons, you can adjust the button class styles:

```css
.btn {
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    transition: background-color 0.3s;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background-color: darken(var(--primary-color), 10%);
}
```

### Alerts

You can customize alerts by adjusting the background colors and text styles:

```css
.alert {
    border-radius: var(--border-radius);
    padding: 1rem;
}

.alert-warning {
    background-color: var(--warning-color);
    color: #856404;
}
```

## 3. Utility Classes

Kubu provides utility classes for spacing, alignment, and layout. You can easily customize these to fit your design preferences. For example, you might want to create a custom spacing utility:

```css
.mt-4 {
    margin-top: 2rem; /* Custom margin top */
}
```

## 4. Media Queries

Kubu is built to be responsive, but you can customize breakpoints for different devices. Adjust the breakpoints as needed:

```css
@media (max-width: 768px) {
    .card {
        margin: 1rem; /* Adjust card margin for smaller screens */
    }
}
```

## 5. Custom Fonts

To use custom fonts, you can import them in your CSS and set them in your root variables:

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
    --font-family: 'Roboto', sans-serif;
}
```

## 6. Example Customization

Here’s an example of a complete customization in Kubu:

```css
:root {
    --primary-color: #4caf50;
    --font-family: 'Arial', sans-serif;
}

.btn {
    border-radius: 0.5rem;
}

.alert-success {
    background-color: var(--primary-color);
    color: white;
}
```

## 7. Further Customization Resources

For more advanced customization techniques and examples, check out the following resources:

- [CSS Tricks: A Complete Guide to CSS Variables](https://css-tricks.com/a-complete-guide-to-css-variables/)
- [MDN Web Docs on Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Learn CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Conclusion

Customizing Kubu allows you to create a unique look for your projects while maintaining the framework’s simplicity and ease of use. By utilizing CSS variables, utility classes, and responsive design principles, you can effectively tailor Kubu to meet your specific design requirements.

For more examples and usage details, refer to the [Kubu Documentation](https://github.com/yourusername/kubu/docs).
