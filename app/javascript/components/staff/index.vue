<template lang="pug">
  q-layout(view="hHh Lpr fFf")
    shared-header(title="Dashboard" @getuser="getCurrentUser()" :currentuser="admin")
      template(v-slot:tabs)
        q-tabs(align='left' v-model="tab")
          q-tab(name="clients" label='Clients')
          q-tab(name='orgs' label='Organizations')

    //q-drawer(show-if-above v-model="left" side="left" bordered)
      // drawer content

    q-page-container
      //router-view
      q-tab-panels(v-model="tab")
        q-tab-panel(name="clients")
          clients-tab
        q-tab-panel(name="orgs")
          organizations-tab

    shared-footer
</template>

<script>
import Navbar from '@shared/navbar'
import Footer from '@shared/footer'
import clientsTab from '@staff/clients'
import organizationsTab from '@staff/organizations'


export default {
  name: "Staff",
  data () {
    return {
      tab: 'clients',
      loading: true,
      admin: ''
    }
  },
  methods: {
    async getCurrentUser () {
      try {
        const response = await this.$api.admin.current_user()
        this.admin = response.data
      } catch (e) {
        console.log(e)
      }
    },
  },
  components: {
    'shared-header': Navbar,
    'shared-footer': Footer,
    'clients-tab': clientsTab,
    'organizations-tab': organizationsTab,
  }
}
</script>

<style lang="sass">
  p
    font-size: 1.5em
    text-align: center
    color: darkgreen
</style>
