# Kubu Helpers

The Kubu CSS framework includes a range of helper classes and utility functions that make it easier to create responsive and accessible web designs. These helpers streamline your CSS and enhance the overall user experience. This page outlines the available helpers and how to use them effectively.

## 1. Spacing Helpers

### Purpose

Spacing helpers provide consistent margins and padding throughout your application, ensuring a cohesive design.

### Usage

You can use the following classes to apply spacing:

- **Margins**: `m-{size}`, `mt-{size}`, `mr-{size}`, `mb-{size}`, `ml-{size}`, `mx-{size}`, `my-{size}`
- **Padding**: `p-{size}`, `pt-{size}`, `pr-{size}`, `pb-{size}`, `pl-{size}`, `px-{size}`, `py-{size}`

### Example:

```html
<div class="m-3 p-2">This div has a margin of 3 and padding of 2.</div>
```

### CSS:

```css
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-3 { margin: 1rem; }
/* Add similar styles for padding and other margin classes */
```

## 2. Text Helpers

### Purpose

Text helpers enable quick adjustments to font size, weight, and alignment.

### Usage

Use these classes to modify text appearance:

- **Font Size**: `fs-{size}` (e.g., `fs-small`, `fs-large`)
- **Font Weight**: `fw-{weight}` (e.g., `fw-bold`, `fw-light`)
- **Text Alignment**: `text-left`, `text-center`, `text-right`

### Example:

```html
<p class="fs-large fw-bold text-center">This is bold, large text centered.</p>
```

### CSS:

```css
.fs-small { font-size: 0.875rem; }
.fs-large { font-size: 1.25rem; }
.fw-bold { font-weight: bold; }
/* Add additional font size and weight classes */
```

## 3. Display Helpers

### Purpose

Display helpers simplify the application of display properties for responsive design.

### Usage

You can use the following classes:

- **Display Types**: `d-none`, `d-block`, `d-inline`, `d-flex`
- **Flex Utilities**: `flex-row`, `flex-column`, `justify-content-{alignment}`, `align-items-{alignment}`

### Example:

```html
<div class="d-flex justify-content-between">
    <div>Item 1</div>
    <div>Item 2</div>
</div>
```

### CSS:

```css
.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }
/* Add additional flex classes */
```

## 4. Color Helpers

### Purpose

Color helpers allow for quick application of background and text colors.

### Usage

Use these classes to set colors:

- **Background Colors**: `bg-{color}`
- **Text Colors**: `text-{color}`

### Example:

```html
<div class="bg-primary text-white">This div has a primary background and white text.</div>
```

### CSS:

```css
.bg-primary { background-color: #007bff; }
.text-white { color: white; }
/* Add additional color classes */
```

## 5. Visibility Helpers

### Purpose

Visibility helpers control the visibility of elements without using JavaScript.

### Usage

These classes can be applied as follows:

- **Visibility**: `visible`, `invisible`, `hidden`

### Example:

```html
<div class="invisible">This text is invisible but still occupies space.</div>
```

### CSS:

```css
.invisible { visibility: hidden; }
.hidden { display: none; }
```

## 6. Flexbox Helpers

### Purpose

Flexbox helpers provide shortcuts for flexbox properties.

### Usage

You can apply these classes:

- **Flex Direction**: `flex-row`, `flex-column`
- **Justify Content**: `justify-start`, `justify-center`, `justify-end`
- **Align Items**: `align-start`, `align-center`, `align-end`

### Example:

```html
<div class="d-flex flex-row justify-center">
    <div>Item A</div>
    <div>Item B</div>
</div>
```

### CSS:

```css
.flex-row { flex-direction: row; }
.flex-column { flex-direction: column; }
/* Add additional flexbox utility classes */
```

## 7. Media Query Helpers

### Purpose

Media query helpers allow for responsive design adjustments based on screen size.

### Usage

Use these classes for breakpoints:

- **Visibility**: `d-{breakpoint}-none` (e.g., `d-sm-none`)

### Example:

```html
<div class="d-md-none">Visible on small screens only.</div>
```

### CSS:

```css
@media (max-width: 576px) {
    .d-sm-none { display: none; }
}
```

## Conclusion

The Kubu CSS framework's helper classes and utilities streamline the development process by providing a range of reusable styles and components. These helpers promote consistency and make it easier to create responsive and accessible web applications. For further details and documentation, refer to the [Kubu Documentation](https://github.com/yourusername/kubu/docs).