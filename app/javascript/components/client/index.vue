<template lang="pug">
  #client
    p.red {{ message }}
</template>

<script>
export default {
  name: "Client",
  data () {
    return {
      message: "That is client app!"
    }
  }
}
</script>

<style lang="sass">
  p
    font-size: 2em
    text-align: center

    &.red
      color: #B00100
</style>
