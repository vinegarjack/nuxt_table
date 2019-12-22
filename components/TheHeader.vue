<template>
  <header>
    <nuxt-link :to="{ name: 'home', params: { lang: 'en' } }" exact>
      Home
    </nuxt-link>
  </header>
</template>

<script>
    export default {
        name: 'TheHeader'
    }
</script>

<style scoped>
header {
  text-align: center;
}
</style>
