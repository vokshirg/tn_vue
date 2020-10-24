<template lang="pug">
  #staff
    q-layout(view="hHh Lpr fFf")
      shared-header

      //q-drawer(show-if-above v-model="left" side="left" bordered)
        <!-- drawer content -->

      q-page-container
        //router-view
        q-page.q-pa-md
          q-table(
            title="Clients"
            :data="clients"
            :columns="columns"
            :pagination="initialPagination"
            row-key="name"
            :filter="filter"
          )
            template( v-slot:top-right )
              q-input( borderless debounce="300" v-model="filter" placeholder="Поиск" )
                template( v-slot:append )
                  q-icon( name="fas fa-search" )
              q-btn.q-ml-md(push
                color="green"
                dense
                padding="sm"
                icon="fas fa-plus"
                label="Новый клиент"
                @click="clientFormShow()")
            template( v-slot:body-cell-actions )
              td.text-right
                q-btn(icon="fas fa-edit" icon-size='xs' padding="sm" text-color='orange-5')


      client-form(ref="client_form_dialog" @add-new-client="addNewClient")
      shared-footer
</template>

<script>
import Navbar from './../shared/navbar'
import Footer from './../shared/footer'
import clientForm from './clients/clientForm'


export default {
  name: "Staff",
  data () {
    return {
      initialPagination: {
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      client_form_show: false,
      filter: '',
      clients: [],
      loading: true,

      columns: [
        {name: 'id', label: 'id', field: 'id'},
        {name: 'email', label: 'email', field: 'email'},
        {name: 'phone', label: 'phone', field: 'phone'},
        {name: 'fullname', label: 'fullname', field: 'fullname'},
        {name: 'actions', label: 'actions'},
      ]

    }
  },
  created() {
    this.fetchClients()
  },
  methods: {
    async fetchClients () {
      this.loading = true
      try {
        const response = await this.$api.clients.index()
        this.clients = response.data
      } catch {
        this.error = true
      }
      this.loading = false
    },
    addNewClient(new_user_data) {
      this.clients.push(new_user_data)
    },
    clientFormShow () {
      this.$refs.client_form_dialog.showDialog()
    }
  },
  components: {
    'shared-header': Navbar,
    'shared-footer': Footer,
    clientForm
  }
}
</script>

<style lang="sass">
  p
    font-size: 1.5em
    text-align: center
    color: darkgreen
</style>
