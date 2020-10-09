<template>
  <div id="staff">
    <p>{{ message }}</p>
  </div>
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

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
