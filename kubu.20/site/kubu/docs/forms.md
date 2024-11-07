# Forms in Kubu

Forms are essential for gathering user input and data on your website. Kubu provides a range of components and styles to create user-friendly forms. This page will guide you through the available form elements, customization options, and best practices for building accessible forms.

## 1. Basic Form Structure

### Example: Simple Form

```html
<form class="form">
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" class="form-control" placeholder="Enter your name" required>
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" placeholder="Enter your email" required>
    </div>
    <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" class="form-control" rows="4" placeholder="Your message"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### CSS for Basic Form

```css
.form {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1rem;
}

.form-control {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: var(--border-radius);
}
```

## 2. Input Types

Kubu supports various input types, including text, email, password, and more. Each input can be styled with the `.form-control` class.

### Example: Input Types

```html
<div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" class="form-control" placeholder="Enter your password" required>
</div>
```

## 3. Checkboxes and Radio Buttons

Kubu allows you to create grouped checkboxes and radio buttons easily.

### Example: Checkboxes

```html
<div class="form-group">
    <label>
        <input type="checkbox" class="form-check-input"> Subscribe to newsletter
    </label>
</div>
```

### Example: Radio Buttons

```html
<div class="form-group">
    <label>
        <input type="radio" name="gender" class="form-check-input" value="male"> Male
    </label>
    <label>
        <input type="radio" name="gender" class="form-check-input" value="female"> Female
    </label>
</div>
```

### CSS for Checkboxes and Radio Buttons

```css
.form-check-input {
    margin-right: 0.5rem;
}
```

## 4. Select Dropdowns

Create dropdown menus for selecting options using the `<select>` element.

### Example: Select Dropdown

```html
<div class="form-group">
    <label for="country">Country</label>
    <select id="country" class="form-control">
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
    </select>
</div>
```

## 5. Validation Styles

Kubu supports form validation, allowing you to give visual feedback to users.

### Example: Validation Feedback

```html
<div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" class="form-control is-invalid" placeholder="Enter your email" required>
    <div class="invalid-feedback">Please provide a valid email address.</div>
</div>
```

### CSS for Validation

```css
.is-invalid {
    border-color: #dc3545;
}

.invalid-feedback {
    color: #dc3545;
    display: none; /* Initially hidden */
}

.is-invalid + .invalid-feedback {
    display: block; /* Show feedback on invalid input */
}
```

## 6. Customizing Form Components

You can easily customize the styles of form components to fit your design needs.

### Custom Button Style

```css
.btn-custom {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    transition: background-color 0.3s;
}

.btn-custom:hover {
    background-color: darken(var(--primary-color), 10%);
}
```

### Using the Custom Button

```html
<button type="submit" class="btn-custom">Submit</button>
```

## 7. Example Complete Form

Here’s how a complete form might look using Kubu:

```html
<form class="form">
    <h2>Contact Us</h2>
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" class="form-control" placeholder="Enter your name" required>
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" placeholder="Enter your email" required>
    </div>
    <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" class="form-control" rows="4" placeholder="Your message"></textarea>
    </div>
    <div class="form-group">
        <label>
            <input type="checkbox" class="form-check-input"> Subscribe to newsletter
        </label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

## 8. Accessibility Considerations

When designing forms, it's important to consider accessibility:

- Use clear labels for each input field.
- Ensure that your form can be navigated using a keyboard.
- Provide feedback for required fields and validation errors.

## 9. Conclusion

Kubu makes it easy to create forms that are not only functional but also visually appealing. By utilizing the various components and customization options, you can design forms that enhance user experience.

For further examples and documentation on forms in Kubu, refer to the [Kubu Documentation](https://github.com/yourusername/kubu/docs).
