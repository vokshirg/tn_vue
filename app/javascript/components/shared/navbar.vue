<template lang="pug">
  q-header.bg-primary.text-white(elevated height-hint="98")
    q-toolbar
      q-btn.q-mr-sm(flat round dense icon="fas fa-bars")
      q-avatar
        img.quasar-logo.img(src="~images/in-yan.png")
      q-toolbar-title {{ title }}

      template(v-if="currentuser != ''")
        q-btn(flat dense) {{ currentuser.email }}
        q-btn(flat round dense icon="fas fa-sign-out-alt" @click="logoutAdmin()")
      template(v-else)
        q-btn(type="a" href="admin/auth/login" flat round dense icon="fas fa-sign-in-alt")
    slot(name="tabs")

</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      default: 'Title Here'
    },
    currentuser: {
      default: ''
    }
  },
  methods: {
    logoutAdmin () {
      this.$api.admin.logout()
    },
  },
  async created () {
    await this.$emit('getuser')
    console.log(this.currentuser)
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