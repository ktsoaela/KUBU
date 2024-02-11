<!-- Sidebar.vue -->
<template>
  <aside>
    <ul>
      <li><router-link to="/sidebar">Sidebar Link 1</router-link></li>
      <li><router-link to="/sidebar">Sidebar Link 2</router-link></li>
      <!-- Add more sidebar links as needed -->
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
aside {
  background-color: #f4f4f4;
  padding: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
}
</style>
