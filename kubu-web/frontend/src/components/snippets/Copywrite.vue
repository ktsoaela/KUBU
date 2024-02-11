<template>
  <div class="copyright">
    <p>
      &copy; {{ currentYear }} Kubu CSS version {{ version }}. All rights
      reserved.
    </p>
  </div>
</template>

<script>
import packageJson from '../../../package.json'

export default {
  name: 'Copywrite',
  data () {
    return {
      currentYear: new Date().getFullYear(),
      version: packageJson.version
    }
  }
}
</script>

<style scoped>
.copyright {
  /* position: fixed; */
  /* bottom: 0; */
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
