<!-- Icons.vue -->
<template>
  <div class='main-container'>
    <h1>Kubu CSS Icons</h1>

    <h2>Font Awesome Icons</h2>
    <p>
      Kubu CSS includes Font Awesome icons. You can use them by adding the
      appropriate classes:
    </p>
    <div class="icon">
      <i class="fas fa-home"></i>
    </div>
    <div class="icon">
      <i class="fas fa-envelope"></i>
    </div>

    <h2>Custom Icons</h2>
    <p>You can also use custom icons provided by Kubu CSS:</p>
    <div class="icon">
      <i class="kubu-icon kubu-icon-star"></i>
    </div>
    <div class="icon">
      <i class="kubu-icon kubu-icon-heart"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Icons'
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
  margin: 0;
  padding: 0;
}

h1 {
  margin-bottom: 20px;
}
h2 {
  margin-top: 40px;
  margin-bottom: 10px;
}
.icon {
  display: inline-block;
  margin: 10px;
  font-size: 24px;
  color: #626ed4; /* Primary color */
}
</style>
