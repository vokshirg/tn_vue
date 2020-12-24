<template lang="pug">
  q-layout( view="hHh Lpr fFf" )
    shared-header(
      title="Dashboard"
      @getuser="getCurrentUser"
      :currentuser="current_admin"
      type="admin"
      @logout="logout")

      template( v-slot:tabs )
        q-tabs( align='left' )
          q-route-tab( to="/admin/clients" label='Клиенты' )
          q-route-tab( to='/admin/orgs' label='Организации' )
          q-route-tab( to='/admin/equipments' label='Оборудование' )

    q-page-container( v-if="current_admin" )
      router-view

    template( v-else )
      p не залогинен
      q-btn.absolute-center.vertical-middle( type='a' href="admin/auth/login" label="Войти" )

    shared-footer
</template>

<script>
import Navbar from '@shared/navbar'
import Footer from '@shared/footer'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Staff',

  components: {
    'shared-header': Navbar,
    'shared-footer': Footer
  },

  data () {
    return {
      loading: true
    }
  },

  computed: {
    ...mapState(['current_admin'])
  },

  methods: {
    ...mapActions({
      getCurrentUser: 'get_current_admin'
    }),

    logout () {
      this.$api.admin.logout()
      this.admin = null
      this.$router.replace('/admin/auth/login')
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
