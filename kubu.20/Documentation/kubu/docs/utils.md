# Kubu Utilities

Kubu CSS framework includes a set of utility functions and mixins that simplify common styling tasks and promote reusability. These utilities help streamline your development process, allowing for cleaner, more maintainable CSS code.

## 1. Color Utility Functions

### Purpose

Color utility functions assist in generating and manipulating color values for themes, backgrounds, and text colors.

### Example Functions

- **Darken**: Darkens a given color by a specified percentage.
- **Lighten**: Lightens a given color by a specified percentage.
- **Color Contrast**: Generates a contrasting color (e.g., black or white) based on the background color.

### CSS Example:

```css
:root {
    --primary-color: #007bff;
}

.btn-primary {
    background-color: var(--primary-color);
    color: contrast(var(--primary-color));
}
```

### Example Code:

```scss
@function darken($color, $amount) {
    @return mix(black, $color, $amount);
}

@function lighten($color, $amount) {
    @return mix(white, $color, $amount);
}
```

## 2. Responsive Utilities

### Purpose

Responsive utilities help create styles that adapt to different screen sizes, enhancing user experience across devices.

### Example Usage

```html
<div class="d-none d-md-block">Visible on medium and larger screens only.</div>
```

### CSS Example:

```css
@media (max-width: 768px) {
    .d-md-block { display: block; }
}
```

## 3. Flexbox Utilities

### Purpose

Flexbox utilities facilitate the creation of responsive layouts using flex properties.

### Example Classes

- **Flex Direction**: `.flex-row`, `.flex-column`
- **Justify Content**: `.justify-start`, `.justify-center`, `.justify-end`
- **Align Items**: `.align-start`, `.align-center`, `.align-end`

### CSS Example:

```css
.flex-row {
    display: flex;
    flex-direction: row;
}
```

## 4. Grid Utilities

### Purpose

Grid utilities enable grid-based layouts with configurable row and column sizes.

### Example Classes

- **Grid Columns**: `.grid-1`, `.grid-2`, `.grid-3`
- **Grid Gap**: `.gap-1`, `.gap-2`, `.gap-3`

### Example Usage:

```html
<div class="grid grid-3 gap-2">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
</div>
```

### CSS Example:

```css
.grid {
    display: grid;
}

.grid-3 {
    grid-template-columns: repeat(3, 1fr);
}

.gap-2 {
    gap: 0.5rem;
}
```

## 5. Animation Utilities

### Purpose

Animation utilities simplify the application of animations and transitions to elements.

### Example Classes

- **Fade In**: `.fade-in`
- **Slide Up**: `.slide-up`

### CSS Example:

```css
.fade-in {
    animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

## 6. Typography Utilities

### Purpose

Typography utilities standardize font styles across your application for better readability and aesthetics.

### Example Classes

- **Font Size**: `.fs-small`, `.fs-large`
- **Font Weight**: `.fw-bold`, `.fw-light`
- **Text Align**: `.text-left`, `.text-center`, `.text-right`

### CSS Example:

```css
.fs-small { font-size: 0.875rem; }
.fs-large { font-size: 1.25rem; }
```

## 7. Custom Media Queries

### Purpose

Custom media queries allow for quick adjustments based on specific breakpoints.

### Example Usage:

```css
@media (min-width: 768px) {
    .custom-class {
        display: flex;
    }
}
```

## Conclusion

The utility functions and mixins provided in the Kubu CSS framework empower developers to create flexible, responsive, and maintainable stylesheets. By leveraging these utilities, you can enhance your workflow and streamline the design process. For more details and documentation, please refer to the [Kubu Documentation](https://github.com/yourusername/kubu/docs).