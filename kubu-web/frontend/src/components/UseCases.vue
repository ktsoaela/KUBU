<template>
  <div>
    <h1>Use Cases</h1>
    <p>KUBU is for HTML that comes from a server or a static file. If your templates already produce the markup, KUBU styles it and the browser makes it interactive.</p>

    <div class="grid grid--auto">
      <article class="card">
        <h2 class="card__title">Server-rendered web apps</h2>
        <p class="card__body">Django, Rails, Laravel, Phoenix, Go templates, ASP.NET. Write the BEM classes in your templates; there is no client bundle to keep in sync.</p>
      </article>
      <article class="card">
        <h2 class="card__title">htmx front ends</h2>
        <p class="card__body">htmx swaps HTML from the server. KUBU styles the loading state and the swap with <code>.htmx-request</code>, <code>.htmx-indicator</code> and skeletons.</p>
      </article>
      <article class="card">
        <h2 class="card__title">Admin tools</h2>
        <p class="card__body">Tables, forms, tabs, alerts and the grid cover most internal tools.</p>
      </article>
      <article class="card">
        <h2 class="card__title">Content sites</h2>
        <p class="card__body">The snippets, the template and the example pages give a header, footer, hero, card grid and contact form.</p>
      </article>
    </div>

    <h2>Component frameworks, like this one</h2>
    <p>This site is a Vue app. It loads the framework's own <code>dist/kubu.css</code> and writes the same class names in its templates; the look does not depend on how the HTML was produced.</p>
  </div>
</template>

<script>
export default {
  name: 'UseCases'
}
</script>
