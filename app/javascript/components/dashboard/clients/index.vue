<template lang="pug">
  q-page.q-pa-md
    client-form( ref="client_form_dialog" @update-table="fetchClients" )

    q-table(
      title="Clients"
      :data="clients"
      :columns="columns"
      :pagination="initialPagination"
      row-key="name"
      :filter="filter"
      :loading="loading" )

      template( v-slot:top-right )
        q-input( borderless debounce="300" v-model="filter" placeholder="Поиск" )
          template( v-slot:append )
            q-icon( name="fas fa-search" )

        q-btn.q-ml-md(
          push
          color="green"
          dense
          padding="sm"
          icon="fas fa-plus"
          label="Новый клиент"
          @click="clientFormShow" )

      template( v-slot:body-cell-actions="item" )
        td.text-right
          q-btn.q-mr-xs(
            icon="fas fa-edit"
            size='xs'
            padding="sm"
            text-color='orange-5'
            @click="clientFormShow( item.row )" )

          q-btn(
            icon="fas fa-trash"
            size='xs'
            padding="sm"
            text-color='red-5'
            @click="clientRemove( item.row )" )

      template( v-slot:body-cell-orgs="item" )
        td.text-right
          q-chip(
            v-for="org in item.row.orgs"
            :key="org.id"
            square
            :label="org.name" )

</template>

<script>
import clientForm from '@admin/clients/clientForm'

export default {
  name: "ClientsTab",
  data() {
    return {
      clients: [],
      initialPagination: {
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {name: 'id', label: 'id', field: 'id'},
        {name: 'email', label: 'email', field: 'email'},
        {name: 'phone', label: 'phone', field: 'phone'},
        {name: 'fullname', label: 'fullname', field: 'fullname'},
        {name: 'orgs', label: 'orgs', field: 'orgs'},
        {name: 'actions', label: 'actions'},
      ],
      client_form_show: false,
      filter: '',
    }
  },

  components: {
    clientForm
  },

  methods: {
    async fetchClients () {
      this.loading = true
      try {
        const response = await this.$api.admin.clients.index()
        this.clients = response.data
      } catch {
        this.error = true
      }
      this.loading = false
    },

    async clientRemove(client) {
      this.loading = true
      try {
        const response = await this.$api.admin.clients.destroy(client)
        await this.fetchClients()
      } catch {
        this.error = true
      }
      this.loading = false
    },

    addNewClient(new_user_data) {
      this.clients.push(new_user_data)
    },

    clientFormShow (client) {
      this.$refs.client_form_dialog.showDialog(client)
    },
  },

  created() {
    this.fetchClients()
  },
}
</script>
