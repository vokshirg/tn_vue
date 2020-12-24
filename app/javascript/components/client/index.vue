<template lang="pug">
  q-layout( view="hHh Lpr fFf" )
    shared-header(
      title="Client app"
      @getuser="getCurrentUser"
      :currentuser="current_client"
      type="client"
      @logout="logout" )

    template( v-if="this.current_client" )
      q-page-container.q-py-none
        router-view( :client="this.current_client" )

    template( v-else )
      q-card.absolute-center.vertical-middle
        q-card-section
          p
            b Необходимо авторизоваться

          q-btn( type='a' href="/auth/login" label="Войти" color="primary" )

    shared-footer
</template>

<script>
import Navbar from '@shared/navbar'
import Footer from '@shared/footer'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Client',

  components: {
    'shared-header': Navbar,
    'shared-footer': Footer
  },

  data () {
    return {
      splitterModel: 10
    }
  },

  computed: {
    ...mapState(['current_client'])
  },

  methods: {
    ...mapActions({
      getCurrentUser: 'get_current_client'
    }),

    logout () {
      this.$api.clients.logout()
      this.client = {}
      this.$router.push('/auth/login')
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
