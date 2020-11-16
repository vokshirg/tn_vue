<template lang="pug">
  q-header.bg-primary.text-white( elevated height-hint="98" )
    q-toolbar
      q-btn.q-mr-sm( flat round dense icon="fas fa-bars" )

      q-avatar
        img.quasar-logo.img( src="~images/in-yan.png" )

      q-toolbar-title {{ title }}

      template( v-if="currentuser != null" )
        q-btn( flat dense ) {{ currentuser.email }}
        q-btn( flat round dense icon="fas fa-sign-out-alt" @click="logout" )

      template( v-else )
        q-btn( v-if="type=='client'" type="a" href="auth/login" flat round dense icon="fas fa-sign-in-alt" )
        q-btn( v-if="type=='admin'" type="a" href="admin/auth/login" flat round dense icon="fas fa-sign-in-alt" )

    slot( name="tabs" )

</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  },

  props: {
    type: String,
    title: {
      type: String,
      default: 'Title Here'
    },
    currentuser: {
      default: null
    }
  },

  methods: {
    logout () {
      this.$emit('logout')
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