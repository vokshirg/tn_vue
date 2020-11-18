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

    //q-drawer( show-if-above v-model="left" side="left" bordered )
      // drawer content

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
  name: "Staff",
  data () {
    return {
      loading: true,
    }
  },

  channels: {
    OrganizationsChannel: {
      connected() {
        console.log('I am connected.')
      },
      received(data) {
        console.log(data)
        // this.$store.dispatch('orgs/update_orgs', data)
      },
    }
  },

  computed: {
    ...mapState(["current_admin"])
  },

  methods: {
    ...mapActions({
      getCurrentUser: "get_current_admin",
      update_orgs: 'orgs/update_orgs'
    }),


    logout() {
      this.$api.admin.logout()
      this.admin = null
    },

  },

  components: {
    'shared-header': Navbar,
    'shared-footer': Footer,
  },

  created() {
    this.$cable.subscribe({
      channel: 'OrganizationsChannel'
    });
  },


}
</script>

<style lang="sass">
  p
    font-size: 1.5em
    text-align: center
    color: darkgreen
</style>
