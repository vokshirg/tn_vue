<template lang="pug">
  q-page.q-pa-md
    router-view( @update-table="fetchOrganizations" )

    q-table(
      title="Organizations"
      :data="orgs"
      :columns="columns"
      :pagination="initialPagination"
      row-key="id"
      :filter="filter"
      :loading="loading")

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
          label="Добавить организацию"
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
            @click="orgRemove( item.row )" )

      template( v-slot:body-cell-clients="item" )
        td.text-right
          q-chip(
            v-for="client in item.row.clients"
            :key="client.id"
            square
            :label="client.fullname" )

      template( v-slot:body-cell-equipments="item" )
        td.text-right
          q-chip(
            v-for="eq in item.row.equipments"
            :key="eq.id"
            square
            :label="eq.name" )


</template>

<script>
import { mapActions, mapState } from 'vuex'
import paginationMixin from "@mixins/paginationMixin";
export default {
  name: "AdminOrgs",
  mixins: [paginationMixin],
  data() {
    return {
      columns: [
        {name: 'id', label: 'id', field: 'id'},
        {name: 'name', label: 'name', field: 'name'},
        {name: 'inn', label: 'inn', field: 'inn'},
        {name: 'ogrn', label: 'ogrn', field: 'ogrn'},
        {name: 'org_type', label: 'org_type', field: 'org_type'},
        {name: 'clients', label: 'Clients', field: 'clients'},
        {name: 'equipments', label: 'Equipments', field: 'equipments'},
        {name: 'actions', label: 'actions'},
      ],
      loading: false,
      organization_form_show: false,
    }
  },

  computed: {
    ...mapState({
      orgs: state => state.orgs.data
    })
  },

  methods: {
    ...mapActions({
      fetchOrganizations: 'orgs/fetch'
    }),

    async orgRemove(organization) {
      this.loading = true
      try {
        const response = await this.$api.admin.orgs.destroy(organization)
        this.fetchOrganizations()
      } catch {
        this.error = true
      }
      this.loading = false
    },

    addNewOrganization(new_org_data) {
      this.orgs.push(new_org_data)
    },

    formShow (id) {
      this.$router.push({ name: 'org', params: { id } })
    }
  },

  created() {
    this.fetchOrganizations()
  },
}
</script>