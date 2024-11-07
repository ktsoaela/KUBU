# Kubu Components Overview

Kubu provides a set of flexible and customizable components that enable developers to build modern web interfaces quickly and efficiently. This page breaks down each component, its purpose, usage, and examples to help you integrate them into your projects.

## 1. Alerts

**Purpose**: Alerts are used to display important messages to users, such as success, error, or informational notifications.

### Example:

```html
<div class="alert alert-success">Your changes have been saved successfully!</div>
```

### CSS:

```css
.alert {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: var(--border-radius);
}
.alert-success {
    background-color: #d4edda;
    color: #155724;
}
```

## 2. Badges

**Purpose**: Badges are small counts or labels that can be used for notifications or status indicators.

### Example:

```html
<span class="badge badge-primary">New</span>
```

### CSS:

```css
.badge {
    padding: 0.5rem;
    border-radius: var(--border-radius);
}
.badge-primary {
    background-color: #007bff;
    color: white;
}
```

## 3. Breadcrumbs

**Purpose**: Breadcrumbs are navigation elements that indicate the current page's location within a hierarchy.

### Example:

```html
<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Library</li>
    </ol>
</nav>
```

### CSS:

```css
.breadcrumb {
    padding: 0.5rem 1rem;
    background-color: #f8f9fa;
    border-radius: var(--border-radius);
}
```

## 4. Buttons

**Purpose**: Buttons are essential for actions, including submission and navigation.

### Example:

```html
<button class="btn btn-primary">Click Me</button>
```

### CSS:

```css
.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--border-radius);
}
.btn-primary {
    background-color: #007bff;
    color: white;
}
```

## 5. Button Groups

**Purpose**: Button groups allow related buttons to be grouped together.

### Example:

```html
<div class="btn-group">
    <button class="btn btn-secondary">1</button>
    <button class="btn btn-secondary">2</button>
    <button class="btn btn-secondary">3</button>
</div>
```

### CSS:

```css
.btn-group {
    display: flex;
}
```

## 6. Cards

**Purpose**: Cards are flexible content containers that can hold various types of content.

### Example:

```html
<div class="card">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Some quick example text to build on the card title.</p>
</div>
```

### CSS:

```css
.card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
}
```

## 7. Carousels

**Purpose**: Carousels allow you to display multiple items in a rotating slideshow format.

### Example:

```html
<div class="carousel">
    <div class="carousel-item active">Slide 1</div>
    <div class="carousel-item">Slide 2</div>
</div>
```

### CSS:

```css
.carousel {
    display: flex;
    overflow: hidden;
}
.carousel-item {
    flex: 0 0 100%;
}
```

## 8. Collapse

**Purpose**: Collapse components allow users to toggle the visibility of content sections.

### Example:

```html
<button class="btn" onclick="toggleCollapse('collapseExample')">Toggle</button>
<div id="collapseExample" class="collapse">This content can be collapsed.</div>
```

### CSS:

```css
.collapse {
    display: none;
}
```

## 9. Dropdowns

**Purpose**: Dropdowns provide a toggleable menu for navigation or actions.

### Example:

```html
<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle">Dropdown</button>
    <div class="dropdown-menu">...</div>
</div>
```

### CSS:

```css
.dropdown-menu {
    display: none;
}
```

## 10. Forms

**Purpose**: Forms are essential for user input and data collection.

### Example:

```html
<form>
    <input type="text" class="form-control" placeholder="Your Name">
</form>
```

### CSS:

```css
.form-control {
    padding: 0.5rem;
    border: 1px solid #ccc;
}
```

## 11. Input Groups

**Purpose**: Input groups allow multiple input elements to be combined together.

### Example:

```html
<div class="input-group">
    <input type="text" class="form-control" placeholder="Username">
    <div class="input-group-append">@example.com</div>
</div>
```

### CSS:

```css
.input-group {
    display: flex;
}
```

## 12. Modals

**Purpose**: Modals are dialog boxes that prompt user interactions.

### Example:

```html
<div class="modal">
    <div class="modal-content">This is a modal.</div>
</div>
```

### CSS:

```css
.modal {
    display: none; /* Hidden by default */
    position: fixed;
    z-index: 1; /* Sit on top */
}
```

## 13. Navs and Navbar

**Purpose**: Navigation components structure the layout and links for your website.

### Example:

```html
<nav class="navbar">
    <a href="#" class="nav-item">Home</a>
    <a href="#" class="nav-item">About</a>
</nav>
```

### CSS:

```css
.navbar {
    display: flex;
}
.nav-item {
    padding: 0.5rem 1rem;
}
```

## 14. Pagination

**Purpose**: Pagination allows navigation through multiple pages of content.

### Example:

```html
<nav aria-label="Page navigation">
    <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
    </ul>
</nav>
```

### CSS:

```css
.pagination {
    display: flex;
    list-style-type: none;
}
```

## 15. Progress Bars

**Purpose**: Progress bars visually represent the completion of a task.

### Example:

```html
<div class="progress">
    <div class="progress-bar" style="width: 70%;">70%</div>
</div>
```

### CSS:

```css
.progress {
    height: 1.5rem;
    background-color: #f8f9fa;
}
.progress-bar {
    background-color: #007bff;
}
```

## 16. Spinners

**Purpose**: Spinners indicate loading states or ongoing processes.

### Example:

```html
<div class="spinner">Loading...</div>
```

### CSS:

```css
.spinner {
    border: 2px solid #f3f3f3; /* Light gray */
    border-top: 2px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

## 17. Tooltips

**Purpose**: Tooltips provide additional information upon hovering over an element.

### Example:

```html
<button class="btn" title="Tooltip text">Hover over me</button>
```

### CSS:

```css
.btn[title]:hover::after {
    content: attr(title);
    position: absolute;
    background: #333;
    color: #fff;
    padding: 0.5rem;
    border-radius: 4px;
}
```

## 18. Popovers

**Purpose**: Popovers are similar to tooltips but can contain more content.

### Example:

```html
<button class="btn" data-popover="Popover content">Click me</button>
```

### CSS:

```css
[data-popover]:hover::after {
    content: attr(data-popover);
    /* Similar styling as tooltip */
}
```

## 19. Tables

**Purpose**: Tables are used to display data in a structured format.

### Example:

```html
<table class="table">
    <tr>
        <th>Name</th>
        <th>Age</th>
    </tr>
    <tr>
        <td>John</td>
        <td>30</td>
    </tr>
</table>
```

### CSS:

```css
.table {
    width: 100%;
    border-collapse: collapse;
}
.table th, .table td {
    border: 1px solid #ddd;
    padding: 8px;
}
```

## 20. Toasts

**Purpose**: Toasts are lightweight notifications

Continuing from the last component, here’s the remainder of the “Components Overview” page for the Kubu CSS framework:

---

## 20. Toasts

**Purpose**: Toasts are lightweight notifications that can be displayed temporarily to inform users about actions or status updates without interrupting their experience.

### Example:

```html
<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
        <strong class="mr-auto">Notification</strong>
        <small>Just now</small>
        <button type="button" class="ml-2 close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="toast-body">
        Your settings have been saved successfully!
    </div>
</div>
```

### CSS:

```css
.toast {
    position: fixed;
    top: 1rem;
    right: 1rem;
    min-width: 250px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: var(--border-radius);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.toast-header {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
}
.toast-body {
    padding: 0.5rem;
}
```

## Conclusion

The Kubu CSS framework provides a comprehensive set of components that can help you build responsive and user-friendly web interfaces with just CSS. Each component is designed to be customizable and easy to use, enabling you to focus on building beautiful applications without the need for heavy JavaScript.

For more detailed information and to see these components in action, please refer to the [Kubu Documentation](https://github.com/yourusername/kubu/docs).
