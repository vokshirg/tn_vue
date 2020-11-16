<template lang="pug">
  q-page.q-pa-md
    q-table(
      title="Organizations"
      :data="orgs"
      :columns="columns"
      :pagination="initialPagination"
      row-key="id"
      :filter="filter"
      :loading="loading" )

      template( v-slot:top-right )
        q-input( borderless debounce="300" v-model="filter" placeholder="Поиск" )
          template( v-slot:append )
            q-icon( name="fas fa-search" )

      template( v-slot:body-cell-clients="item" )
        td.text-right
          q-chip(
            v-for="client in item.row.clients"
            :key="client.id"
            square
            :label="client.fullname" )

</template>

<script>
export default {
  name: "organizationTable",
  data () {
    return {
      orgs: [],
      initialPagination: {
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      filter: '',
      columns: [
        {name: 'id', label: 'id', field: 'id'},
        {name: 'name', label: 'name', field: 'name'},
        {name: 'inn', label: 'inn', field: 'inn'},
        {name: 'ogrn', label: 'ogrn', field: 'ogrn'},
        {name: 'org_type', label: 'org_type', field: 'org_type'},
        {name: 'clients', label: 'Clients', field: 'clients'},
      ],
    }
  },

  methods: {
    async fetchOrganizations () {
      this.loading = true
      try {
        const response = await this.$api.clients.orgs()
        this.orgs = response.data
      } catch {
        this.error = true
      }
      this.loading = false
    },
  },

  created() {
    this.fetchOrganizations()
  },
}
</script>