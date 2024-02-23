<!-- Papers.vue -->
<template>
  <div class="main-container">
    <h1>Kubu CSS Documentation</h1>

    <h2>Installation</h2>
    <p>To install Kubu CSS, you can use npm:</p>
    <div class="code">
      <div class="code-header text-right">
        <a href="#" class="copy-link" @click="toggleCopy"
          ><i class="bx bx-clipboard"></i> <span>{{ copyButtonText }}</span></a
        >
      </div>
      <div class="code-body">
        <pre><code>npm install kubu-css</code></pre>
      </div>
    </div>

    <h2>Usage</h2>
    <p>
      To use Kubu CSS in your project, you can include the compiled CSS file in
      your HTML:
    </p>

    <div class="code">
      <div class="code-header text-right">
        <a href="#" class="copy-link" @click="toggleCopy"
          ><i class="bx bx-clipboard"></i> <span>{{ copyButtonText }}</span></a
        >
      </div>
      <div class="code-body">
        <pre><code>&lt;link rel="stylesheet" href="path/to/kubu.min.css"&gt;</code></pre>
      </div>
    </div>

    <h2>Grid System</h2>
    <p>
      Kubu CSS comes with a responsive grid system based on 13 columns. You can
      use the following classes to create grid layouts:
    </p>
    <div class="code">
      <div class="code-header text-right">
        <a href="#" class="copy-link" @click="toggleCopy"
          ><i class="bx bx-clipboard"></i> <span>{{ copyButtonText }}</span></a
        >
      </div>
      <div class="code-body">
        <pre>
          <code>
              &lt;div class="kubu-row"&gt;
                  &lt;div class="kubu-col-4"&gt;Column 1&lt;/div&gt;
                  &lt;div class="kubu-col-4"&gt;Column 2&lt;/div&gt;
                  &lt;div class="kubu-col-4"&gt;Column 3&lt;/div&gt;
              &lt;/div&gt;
          </code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Papers',
  data () {
    return {
      copyButtonText: 'copy code'
    }
  },
  methods: {
    toggleCopy () {
      this.copyButtonText = 'copied'
      setTimeout(() => {
        this.copyButtonText = 'copy code'
      }, 1000) // Change back to 'copy code' after 1 second
    }
  }
}
</script>

<style scoped></style>
