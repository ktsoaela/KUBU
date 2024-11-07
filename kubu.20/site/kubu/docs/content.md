# Content in Kubu

Kubu provides a variety of content components designed to enhance the presentation of information on your website. This page will guide you through the available content components, how to use them effectively, and tips for customization.

## 1. Typography

### Headings

Kubu allows for easy styling of headings to ensure a consistent hierarchy across your web pages. Use the following classes to apply styles:

```html
<h1 class="heading">Main Title</h1>
<h2 class="subheading">Subheading</h2>
<p class="body-text">This is a paragraph of body text.</p>
```

### CSS for Typography

```css
.heading {
    font-size: 2rem;
    font-weight: bold;
}

.subheading {
    font-size: 1.5rem;
    color: var(--secondary-color);
}

.body-text {
    font-size: 1rem;
    line-height: 1.5;
}
```

## 2. Images

### Responsive Images

Kubu makes it easy to create responsive images that adapt to the container’s size.

#### Example: Responsive Image

```html
<img src="image.jpg" alt="Description" class="img-responsive">
```

### CSS for Images

```css
.img-responsive {
    max-width: 100%;
    height: auto;
}
```

## 3. Lists

### Unordered and Ordered Lists

Create styled lists using simple HTML markup.

```html
<ul class="list">
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<ol class="list">
    <li>First Item</li>
    <li>Second Item</li>
</ol>
```

### CSS for Lists

```css
.list {
    padding-left: 1.5rem;
    margin: 0;
}

.list li {
    margin-bottom: 0.5rem;
}
```

## 4. Quotes

### Blockquotes

Use blockquotes to highlight quotes or important text.

```html
<blockquote class="blockquote">
    “This is a quote from someone important.”
</blockquote>
```

### CSS for Blockquotes

```css
.blockquote {
    border-left: 4px solid var(--primary-color);
    padding: 1rem;
    margin: 1rem 0;
    font-style: italic;
}
```

## 5. Tables

Kubu supports responsive tables, allowing you to present data in a clear format.

### Example: Table Structure

```html
<table class="table">
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
        <tr>
            <td>Data 3</td>
            <td>Data 4</td>
        </tr>
    </tbody>
</table>
```

### CSS for Tables

```css
.table {
    width: 100%;
    border-collapse: collapse;
}

.table th, .table td {
    border: 1px solid #ddd;
    padding: 0.5rem;
    text-align: left;
}
```

## 6. Code Snippets

For displaying code, Kubu provides a simple way to format code blocks.

### Example: Code Block

```html
<pre class="code-block">
    <code>
        const example = "Hello, Kubu!";
    </code>
</pre>
```

### CSS for Code Blocks

```css
.code-block {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: var(--border-radius);
}
```

## 7. Customizing Content Components

### Custom Styles

You can easily override the default styles for any content component. For instance, if you want to change the font color for headings:

```css
.heading {
    color: var(--dark-color);
}
```

## 8. Example Content Page

To create a full content page using Kubu, you can combine these components as follows:

```html
<div class="container">
    <h1 class="heading">Welcome to Kubu</h1>
    <img src="logo.png" alt="Kubu Logo" class="img-responsive">
    <p class="body-text">Kubu is a CSS framework designed for easy and responsive web design.</p>
    <blockquote class="blockquote">“Simplicity is the ultimate sophistication.”</blockquote>
    
    <h2 class="subheading">Features</h2>
    <ul class="list">
        <li>Easy to use</li>
        <li>Responsive design</li>
        <li>Customizable components</li>
    </ul>
    
    <h2 class="subheading">Data Table</h2>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Item 1</td>
                <td>100</td>
            </tr>
            <tr>
                <td>Item 2</td>
                <td>200</td>
            </tr>
        </tbody>
    </table>
</div>
```

## Conclusion

Kubu's content components are designed to help you present information clearly and effectively. By using the available classes and customizing them as needed, you can create visually appealing and user-friendly content for your website.

For more examples and detailed information about using Kubu, refer to the [Kubu Documentation](https://github.com/yourusername/kubu/docs).
