# Kubu Layouts

Kubu provides flexible layout options using Flexbox, enabling you to create responsive and adaptive designs with ease. This page will guide you through the different layout components and how to use them effectively in your projects.

## 1. Grid System

### Flexbox Grid

Kubu utilizes a simple Flexbox-based grid system to create responsive layouts. You can easily define rows and columns using the provided classes.

#### Example: Creating a Grid

```html
<div class="container">
    <div class="row">
        <div class="col-4">Column 1</div>
        <div class="col-4">Column 2</div>
        <div class="col-4">Column 3</div>
    </div>
</div>
```

### CSS for Grid Layout

```css
.container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.row {
    display: flex;
    justify-content: space-between;
    margin: 0 -0.5rem; /* To offset padding */
}

.col-4 {
    flex: 0 0 31.33%; /* Adjust for 3 columns */
    padding: 0 0.5rem; /* Column padding */
}
```

## 2. Responsive Utilities

Kubu includes responsive utility classes to show or hide elements based on screen size.

### Example: Responsive Visibility

```html
<div class="hidden-sm">This is hidden on small screens.</div>
<div class="visible-md">This is visible only on medium screens.</div>
```

### CSS for Responsive Utilities

```css
.hidden-sm {
    display: none;
}

@media (min-width: 576px) {
    .hidden-sm {
        display: block;
    }
}

.visible-md {
    display: none;
}

@media (min-width: 768px) {
    .visible-md {
        display: block;
    }
}
```

## 3. Flexbox Alignment

Flexbox allows for powerful alignment options. You can easily center items both vertically and horizontally within a container.

### Example: Centering Content

```html
<div class="flex-center">
    <div class="item">Centered Item</div>
</div>
```

### CSS for Centering

```css
.flex-center {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    height: 100vh; /* Full viewport height */
}
```

## 4. Layout Variations

### Vertical Navigation

You can create vertical navigation menus using Flexbox.

#### Example: Vertical Nav

```html
<nav class="vertical-nav">
    <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
    </ul>
</nav>
```

### CSS for Vertical Navigation

```css
.vertical-nav {
    display: flex;
    flex-direction: column;
    width: 200px;
}

.vertical-nav ul {
    list-style: none;
    padding: 0;
}

.vertical-nav li {
    margin: 0.5rem 0;
}
```

## 5. Card Layouts

Kubu allows you to create flexible card layouts that can adapt to various screen sizes.

### Example: Card Grid

```html
<div class="card-grid">
    <div class="card">
        <h5>Card Title</h5>
        <p>Card content goes here.</p>
    </div>
    <div class="card">
        <h5>Card Title</h5>
        <p>Card content goes here.</p>
    </div>
</div>
```

### CSS for Card Grid

```css
.card-grid {
    display: flex;
    flex-wrap: wrap; /* Allows cards to wrap */
    gap: 1rem; /* Spacing between cards */
}

.card {
    flex: 1 1 30%; /* Adjust width as needed */
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
}
```

## 6. Example Layouts

### Simple Layout

```html
<div class="container">
    <header class="header">Header</header>
    <main class="main">Main Content</main>
    <footer class="footer">Footer</footer>
</div>
```

### CSS for Simple Layout

```css
.header {
    background: var(--primary-color);
    color: white;
    padding: 1rem;
}

.main {
    padding: 1rem;
}

.footer {
    background: var(--secondary-color);
    color: white;
    padding: 1rem;
}
```

## 7. Conclusion

Kubu’s layout options provide a robust framework for creating responsive designs with Flexbox. By utilizing the grid system, responsive utilities, and alignment features, you can easily create adaptable layouts that enhance user experience.

For more detailed examples and to see how to implement these layouts, refer to the [Kubu Documentation](https://github.com/yourusername/kubu/docs).

