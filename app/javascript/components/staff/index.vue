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
                @click="client_form_show = true")
            template( v-slot:body-cell-actions )
              td.text-right
                q-btn(icon="fas fa-edit" icon-size='xs' padding="sm" text-color='orange-5')


        q-dialog(v-model='client_form_show')
          q-card(style='min-width: 450px')
            q-card-section
              .text-h6 Новый клиент
            q-card-section.q-pt-none
              form(@submit="createClient()")
                q-input(
                  dense
                  v-model='new_user_data.email'
                  placeholder='email'
                  type="email"
                  autofocus
                  :rules="[val => !!val || 'Field is required', val => re.test(val) || 'email is invalid']")
                q-input(
                  dense
                  v-model='new_user_data.fullname'
                  placeholder='Полное имя'
                  :rules="[ val => !!val && val.length > 5 || 'Required. Min length 5' ]")
                q-input(
                  dense
                  type="tel"
                  v-model='new_user_data.phone'
                  mask="+7 (###) ### - ####"
                  fill-mask
                  unmasked-value
                  lazy-rules
                  :rules="[ val => val.length <= 14 && val.length > 9 || 'Min phone length 10 - max 14' ]")
              q-card-actions.text-primary(align='right')
                q-btn(flat label='Cancel' v-close-popup)
                q-btn(flat label='Добавить' @click="createClient()")
      shared-footer
</template>

<script>
import Navbar from './../shared/navbar'
import Footer from './../shared/footer'
import clientForm from './clientForm'
import axios from 'axios'


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
      re: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      client_form_show: false,
      filter: '',
      message: "That is ADMIN app!",
      clients: [],
      loading: true,
      new_user_data: {
        email: '',
        fullname: '',
        phone: ''
      },
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
    async createClient () {
      this.loading = true
      try {
        const response = await this.$api.clients.create(this.new_user_data)
        this.clients.push(response.data)
      } catch (e) {
        console.log(e.response.data);
      }
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
