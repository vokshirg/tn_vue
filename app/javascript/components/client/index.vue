<template lang="pug">
  #client
    p {{ message }}
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

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
