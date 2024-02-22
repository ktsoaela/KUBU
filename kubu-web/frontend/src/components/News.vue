<!-- News.vue -->
<template>
  <div class='main-container'>
    <h1>Kubu CSS News</h1>

    <div class="article">
      <h2>Introducing Kubu CSS</h2>
      <img src="kubu-news1.jpg" alt="Kubu CSS News" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis
        lorem ut libero malesuada feugiat. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit
        neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
      </p>
      <a href="#">Read more</a>
    </div>

    <div class="article">
      <h2>New Features in Kubu CSS</h2>
      <img src="kubu-news2.jpg" alt="Kubu CSS News" />
      <p>
        Curabitur aliquet quam id dui posuere blandit. Pellentesque in ipsum id
        orci porta dapibus. Curabitur arcu erat, accumsan id imperdiet et,
        porttitor at sem.
      </p>
      <a href="#">Read more</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News'
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
  margin: 0;
  padding: 0;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  margin-bottom: 20px;
}
.article {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.article h2 {
  margin-bottom: 10px;
}
.article p {
  margin-bottom: 10px;
}
.article img {
  max-width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
