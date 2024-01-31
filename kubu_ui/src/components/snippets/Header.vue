<!-- Header.vue -->
<template>
<header>
<nav>
<router-link class="nav-link" to="/">Home</router-link>
<router-link class="nav-link" to="/papers">Papers</router-link>
<router-link class="nav-link" to="/showcase">Showcase</router-link>
<router-link class="nav-link" to="/cases">Cases</router-link>
<router-link class="nav-link" to="/icons">Icons</router-link>
<router-link class="nav-link" to="/installation">Installation</router-link>
<router-link class="nav-link" to="/news">News</router-link>

</nav>
</header>
</template>

<script>
export default {

}
</script>

<style scoped>
 header{
    background-color: rgb(0, 68, 255);
    color: white;
    font-weight: 100;
    width: 100%;
    margin: 0px;
    padding: 10px 0px 10px;

    position: fixed;
    top: 0px;
 }

 a{
    text-decoration: none;
    color:white;
 }
 .nav-link{
    padding:0px 10px 0px;
    font-weight: 500;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
 }
</style>
