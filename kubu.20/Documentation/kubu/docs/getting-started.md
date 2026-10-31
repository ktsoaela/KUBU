# Getting started

Five minutes from an empty folder to a themed page.

## 1. Get the CSS

KUBU is not on npm. Copy `kubu-framework/dist/kubu.min.css` from this repository into your project, or link the files straight from a clone.

## 2. Start a page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Orders · My shop</title>
  <link rel="stylesheet" href="css/kubu.min.css">
</head>
<body>
  <header class="header">
    <nav class="navbar" aria-label="Main">
      <a class="logo" href="/">My shop</a>
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="/orders" aria-current="page">Orders</a></li>
        <li class="nav-item"><a class="nav-link" href="/products">Products</a></li>
      </ul>
    </nav>
  </header>
  <main class="container" id="main">
    <h1>Orders</h1>
    <article class="card">
      <header class="card__header">
        <h2 class="card__title">Order 1042</h2>
        <span class="badge badge--safe">Paid</span>
      </header>
      <div class="card__body"><p>R 4 300.00, paid on 28 October 2026.</p></div>
      <footer class="card__footer"><a class="button button--primary" href="/orders/1042">View order</a></footer>
    </article>
  </main>
  <footer class="footer"><p class="copyright">&copy; 2026 My shop</p></footer>
</body>
</html>
```

The page follows the visitor's light or dark setting, every control is at least 44 pixels, and keyboard focus shows a ring. No script has run.

## 3. Add behaviour with HTML

```html
<details class="dropdown">
  <summary class="button button--outline">Export orders</summary>
  <ul class="dropdown-content">
    <li><a class="dropdown-item" href="/orders.csv">As CSV</a></li>
  </ul>
</details>
```

Dropdowns, accordions, tabs, modals and offcanvas panels all open and close with HTML: see [Components](components.md).

## 4. Optional: JavaScript

Add the KUBU 2.0 entry when you need something HTML cannot do. See [JavaScript API](javascript.md).

```html
<script type="module" src="kubu.20/Documentation/kubu/src/js/main.js"></script>
```

## Next

- [Customization and themes](customization.md)
- The full docs site: `kubu-framework/pages/index.html` (run `npm run dev` in `kubu-framework`)
