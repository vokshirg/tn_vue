<template lang="pug">
  q-header.bg-primary.text-white(elevated)
    q-toolbar
      q-btn.q-mr-sm(flat round dense icon="fas fa-bars")
      q-avatar
        img.quasar-logo.img(src="~images/in-yan.png")
      q-toolbar-title Quasar Framework

      template(v-if="current_user != ''")
        q-btn(flat dense) {{ current_user.email }}
        q-btn(flat round dense icon="fas fa-sign-out-alt" @click="logoutAdmin()")
      template(v-else)
        q-btn(type="a" href="admin/auth/login" flat round dense icon="fas fa-sign-in-alt")

</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      current_user: ''
    }
  },
  methods: {
    logoutAdmin () {
      this.$api.admin.logout()
    },
    async getCurrentUser () {
      try {
        const response = await this.$api.admin.current_user()
        this.current_user = response.data
      } catch (e) {
        console.log(e.response.data)
      }
      console.log(this.current_user)
    },
  },
  created () {
    this.getCurrentUser()
  }
}

</script>

<style lang="sass" scoped>
  .quasar-logo.img
    transform: rotate(0deg)
    transition: transform .8s ease-in-out
    &:hover
      transform: rotate(-360deg)

</style>