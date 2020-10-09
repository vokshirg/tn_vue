<template lang="pug">
  #staff
    p {{ message }}
</template>

<script>
export default {
  name: "Staff",
  data () {
    return {
      message: "That is ADMIN app!"
    }
  }
}
</script>

<style lang="sass">
  p
    font-size: 1.5em
    text-align: center
    color: darkgreen
</style>
