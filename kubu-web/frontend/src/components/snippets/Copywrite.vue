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
.copyright{
  position: relative;
  bottom: 0px;
}

</style>
