<template lang="pug">
  q-page.q-pa-md
    router-view( @update-table="fetchClients" )

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
          @click="formShow( 'new' )" )

      template( v-slot:body-cell-actions="item" )
        td.text-right
          q-btn.q-mr-xs(
            icon="fas fa-edit"
            size='xs'
            padding="sm"
            text-color='orange-5'
            @click="formShow( item.row.id )" )

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
import paginationMixin from "@mixins/paginationMixin";
import { mapState, mapActions } from 'vuex'

export default {
  name: "AdminClients",
  mixins: [paginationMixin],
  data() {
    return {
      columns: [
        {name: 'id', label: 'id', field: 'id'},
        {name: 'email', label: 'email', field: 'email'},
        {name: 'phone', label: 'phone', field: 'phone'},
        {name: 'fullname', label: 'fullname', field: 'fullname'},
        {name: 'orgs', label: 'orgs', field: 'orgs'},
        {name: 'actions', label: 'actions'},
      ],
      client_form_show: false,
      loading: false,
    }
  },

  computed: {
    ...mapState({
      clients: state => state.clients.data
    })
  },

  methods: {
    ...mapActions({
      fetchClients: 'clients/fetch'
    }),

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

    formShow (id) {
      this.$router.push({ name: 'client', params: { id } })
      // this.$refs.client_form_dialog.showDialog(client)
    },
  },

  created() {
    this.fetchClients()
  },
}
</script>
