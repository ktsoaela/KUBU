<!-- Papers.vue -->
<template>
  <div class='main-container'>
    <h1>Kubu CSS Documentation</h1>

    <h2>Installation</h2>
    <p>To install Kubu CSS, you can use npm:</p>
    <div class="code">
      <pre><code>npm install kubu-css</code></pre>
    </div>

    <h2>Usage</h2>
    <p>
      To use Kubu CSS in your project, you can include the compiled CSS file in
      your HTML:
    </p>
    <div class="code">
      <pre><code>&lt;link rel="stylesheet" href="path/to/kubu.min.css"&gt;</code></pre>
    </div>

    <h2>Grid System</h2>
    <p>
      Kubu CSS comes with a responsive grid system based on 13 columns. You can
      use the following classes to create grid layouts:
    </p>
    <div class="code">
      <pre><code>
&lt;div class="kubu-row"&gt;
    &lt;div class="kubu-col-4"&gt;Column 1&lt;/div&gt;
    &lt;div class="kubu-col-4"&gt;Column 2&lt;/div&gt;
    &lt;div class="kubu-col-4"&gt;Column 3&lt;/div&gt;
&lt;/div&gt;
            </code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Papers'
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
  margin: 0;
  padding: 0;
}
/* .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
} */
h1 {
  margin-bottom: 20px;
}
h2 {
  margin-top: 40px;
  margin-bottom: 10px;
}
p {
  margin-bottom: 20px;
}
ul {
  margin-bottom: 20px;
  padding-left: 20px;
}
li {
  margin-bottom: 5px;
}
.code {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
