<template lang="pug">
  #staff
    q-layout(view="hHh Lpr fFf")
      shared-header

      //q-drawer(show-if-above v-model="left" side="left" bordered)
        <!-- drawer content -->

      q-page-container
        //router-view
        q-page.q-pa-md
          template
            .q-pa-md
              q-table(
                title="Clients"
                :data="clients"
                row-key="name"
                :filter="filter"
              )
                template( v-slot:top-right )
                  q-input( borderless dense debounce="300" v-model="filter" placeholder="Search" )
                    template( v-slot:append )
                      q-icon( name="fas fa-search" )
                  q-btn(push color="green" padding="sm" icon="fas fa-plus" label="Новый клиент")




      shared-footer
</template>

<script>
import Navbar from './../shared/navbar'
import Footer from './../shared/footer'
import axios from 'axios'


export default {
  name: "Staff",
  data () {
    return {
      filter: '',
      message: "That is ADMIN app!",
      clients: []

    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers () {
      axios.get('/admin/clients')
        .then(({data}) => {
          this.clients = data
        })
    }
  },
  components: {
    'shared-header': Navbar,
    'shared-footer': Footer
  }
}
</script>

<style lang="sass">
  p
    font-size: 1.5em
    text-align: center
    color: darkgreen
</style>
