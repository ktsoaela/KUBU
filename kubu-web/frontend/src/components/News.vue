<template>
  <div>
    <h1>News</h1>
    <p>What changed in each KUBU release, newest first.</p>

    <article class="card">
      <header class="card__header">
        <h2 class="card__title">KUBU 2.0</h2>
        <span class="badge badge--safe">Current</span>
      </header>
      <div class="card__body">
        <p><small><time datetime="2026-10-31">31 October 2026</time></small></p>
        <ul>
          <li>Dark is the master theme. Each token has a dark value and a light pair, picked with <code>light-dark()</code>.</li>
          <li>A theme switch (Auto, Dark, Light) that works as plain radio buttons.</li>
          <li>Every control is at least 44 by 44 pixels and shows a focus ring.</li>
          <li>Buttons gained active and loading states; form errors gained an icon and a sentence.</li>
          <li>Dropdowns, tabs, modals, offcanvas and the date picker work without JavaScript.</li>
          <li>A 12-column grid, a scroll-snap carousel and skeletons for htmx regions.</li>
          <li>The docs are one htmx site: each address is a real page, and only the content swaps.</li>
        </ul>
      </div>
      <footer class="card__footer"><router-link to="/download">Download KUBU 2.0</router-link></footer>
    </article>

    <article class="card">
      <header class="card__header">
        <h2 class="card__title">KUBU 1.0</h2>
        <span class="badge badge--dark">Archived</span>
      </header>
      <div class="card__body">
        <p>The first release: atoms, molecules and organisms as separate CSS files with BEM class names, and this Vue site to show them.</p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'News'
}
</script>
