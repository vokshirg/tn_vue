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
import { mapState, mapActions, mapGetters } from 'vuex'
import paginationMixin from "@mixins/paginationMixin";
export default {
  name: "Organizations",
  props: {
    client: null
  },
  mixins: [paginationMixin],
  data () {
    return {
      columns: [
        {name: 'id', label: 'id', field: 'id'},
        {name: 'name', label: 'name', field: 'name'},
        {name: 'inn', label: 'inn', field: 'inn'},
        {name: 'ogrn', label: 'ogrn', field: 'ogrn'},
        {name: 'org_type', label: 'org_type', field: 'org_type'},
        {name: 'clients', label: 'Clients', field: 'clients'},
      ],
      loading: false
    }
  },

  computed: {
    ...mapGetters({
      orgs: 'orgs/data'
    })
  },

  methods: {
    ...mapActions({
      fetchOrganizations: 'orgs/fetch_client_orgs'
    })
  },

  created() {
    this.fetchOrganizations()
  },
}
</script>