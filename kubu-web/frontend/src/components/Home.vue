<template>
  <div class="">
    <h1>Welcome to Kubu CSS</h1>
    <p>
      A lightweight CSS framework for building modern and responsive web
      applications.
    </p>
    <router-link to="/docs" class="btn">Get Started</router-link>
  </div>
</template>

<script>

</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 100px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #343549;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2aa39a;
}
</style>
