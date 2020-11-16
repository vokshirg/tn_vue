<template lang="pug">
  q-page.q-pa-md
    router-view(@update-table="fetchEquipments")

    q-table(
      title="Equipments"
      :data="equipments"
      :columns="columns"
      :pagination="initialPagination"
      row-key="id"
      :filter="filter"
      :loading="loading"
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
          label="Добавить оборудование"
          @click="formShow('new')")

      template( v-slot:body-cell-actions="item" )
        td.text-right
          q-btn.q-mr-xs(icon="fas fa-edit" size='xs' padding="sm" text-color='orange-5' @click="formShow(item.row.id)")
          q-btn(icon="fas fa-trash" size='xs' padding="sm" text-color='red-5' @click="equipmentRemove(item.row)")

      template( v-slot:body-cell-org="item" )
        td.text-right
          q-chip(v-if="item.row.org != null" :key="item.row.org.id" square :label="item.row.org.name")

</template>

<script>
import paginationMixin from "@mixins/paginationMixin";
import { mapState, mapActions } from 'vuex'
export default {
  name: "AdminEquipments",
  mixins: [paginationMixin],
  data() {
    return {
      columns: [
        {name: 'id', label: 'id', field: 'id'},
        {name: 'name', label: 'name', field: 'name'},
        {name: 'eq_type', label: 'eq_type', field: 'eq_type'},
        {name: 'sn', label: 'sn', field: 'sn'},
        {name: 'org', label: 'org', field: 'org'},
        {name: 'actions', label: 'actions'},
      ],
      equipment_form_show: false,
      loading: false,
    }
  },

  computed: {
    ...mapState({
      equipments: state => state.equipments.data
    })
  },


  methods: {
    ...mapActions({
      fetchEquipments: 'equipments/fetch'
    }),


    async equipmentRemove(equipment) {
      this.loading = true
      try {
        const response = await this.$api.admin.equipments.destroy(equipment)
        this.fetchEquipments()
      } catch {
        this.error = true
      }
      this.loading = false
    },

    formShow (id) {
      this.$router.push({ name: 'equipment', params: { id } })
    }
  },
  created() {
    this.fetchEquipments()
  },
}
</script>