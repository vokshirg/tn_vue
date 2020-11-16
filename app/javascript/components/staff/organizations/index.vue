<template lang="pug">
  q-page.q-pa-md
    org-form( ref="org_form_dialog" @update-table="fetchOrganizations" )
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
          @click="orgFormShow" )

      template( v-slot:body-cell-actions="item" )
        td.text-right
          q-btn.q-mr-xs(
            icon="fas fa-edit"
            size='xs'
            padding="sm"
            text-color='orange-5'
            @click="orgFormShow( item.row )" )

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

</template>

<script>
import orgForm from "@staff/organizations/orgForm";

export default {
  name: "OrganizationsTab",
  data() {
    return {
      orgs: [],
      initialPagination: {
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {name: 'id', label: 'id', field: 'id'},
        {name: 'name', label: 'name', field: 'name'},
        {name: 'inn', label: 'inn', field: 'inn'},
        {name: 'ogrn', label: 'ogrn', field: 'ogrn'},
        {name: 'org_type', label: 'org_type', field: 'org_type'},
        {name: 'clients', label: 'Clients', field: 'clients'},
        {name: 'actions', label: 'actions'},
      ],
      organization_form_show: false,
      filter: '',
    }
  },

  components: {
    orgForm
  },

  methods: {
    async fetchOrganizations () {
      this.loading = true
      try {
        const response = await this.$api.admin.orgs.index()
        this.orgs = response.data
      } catch {
        this.error = true
      }
      this.loading = false
    },

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

    orgFormShow (org) {
      this.$refs.org_form_dialog.showDialog(org)
    }
  },

  created() {
    this.fetchOrganizations()
  },
}
</script>