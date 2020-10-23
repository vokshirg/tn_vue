<template lang="pug">
  q-header.bg-primary.text-white(elevated)
    q-toolbar
      q-btn.q-mr-sm(flat round dense icon="fas fa-bars")
      q-avatar
        img.quasar-logo.img(src="~images/in-yan.png")
      q-toolbar-title Quasar Framework

      q-btn(flat dense) grishkov.i.a@gmail.com
      q-btn(flat round dense icon="fas fa-sign-out-alt")

</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="sass" scoped>
  .quasar-logo.img
    transform: rotate(0deg)
    transition: transform .8s ease-in-out
    &:hover
      transform: rotate(-360deg)

</style>