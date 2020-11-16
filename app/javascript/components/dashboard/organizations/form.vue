<template lang="pug">
  q-dialog( v-model='organization_form_show' @hide="clearForm" )
    q-card( style='min-width: 450px' )
      q-card-section
        .text-h6 Добавить организацию

      q-card-section.q-pt-none
        form( @submit.prevent="submitForm" )
          q-input(
            dense
            v-model='form_data.inn'
            hint='ИНН'
            type="number"
            :rules="[\
              val => $v.form_data.inn.required || 'Field is required',\
              val => $v.form_data.inn.length || 'ИНН состоит из 12 цифр'\
              ]"
            autofocus )

          q-input(
            dense
            v-model='form_data.name'
            hint='Название организации'
            :rules="[ val => $v.form_data.name.minLength || 'Required. Min length 5' ]")

          q-input(
            dense
            v-model='form_data.ogrn'
            hint='ОГРН'
            :rules="[ val => $v.form_data.ogrn.length || 'Длина ОГРН должна быть равна 13' ]")

          q-select(
            dense
            v-model='form_data.org_type'
            hint='Тип организации'
            :options="org_types"
            emit-value
            map-options )

          q-select(
            v-model='form_data.clients'
            hint='Clients'
            option-value="id"
            option-label="fullname"
            :options="clients"
            multiple )

          q-select(
            v-model='form_data.equipments'
            hint='equipments'
            option-value="id"
            option-label="name"
            :options="equipments"
            multiple )

          q-card-actions.text-primary( align='right' )
            q-btn( flat label='Отменить' v-close-popup )
            q-btn( type="submit" label='Добавить' color="primary" )

</template>

<script>
import { required, between, numeric, minLength } from 'vuelidate/lib/validators'

export default {
  name: "organizationForm",
  data (  ) {
    return {
      organization_form_show: true,
      update: false,
      clients: [],
      equipments: [],
      form_data: {
        id: '',
        inn: '',
        name: '',
        ogrn: '',
        org_type: '',
        clients: [],
        client_ids: [],
        equipments: [],
        equipment_ids: [],
      },
      org_types: [
        {
          label: 'ИП',
          value: 'ip',
        },
        {
          label: 'Юр.Лицо',
          value: 'ul',
        },
      ]
    }
  },

  validations: {
    form_data: {
      inn: {
        numeric,
        required,
        length: (value) => between(12,12)(value.length),
      },
      name: {
        required,
        minLength: minLength(5)
      },
      ogrn: {
        numeric,
        required,
        length: (value) => between(13,13)(value.length),
      }
    }
  },

  methods: {
    // showDialog(org) {
    //   this.organization_form_show = true
    //   if (org!==undefined) {
    //     this.form_data = org
    //     this.update = true
    //   }
    // },

    submitForm() {
      if (this.update === true) {
        this.updateOrganization()
      } else {
        this.createOrganization()
      }
    },

    clearForm() {
      this.form_data = {
          id: '',
          inn: '',
          name: '',
          ogrn: '',
          org_type: '',
          clients: [],
          client_ids: [],
          equipments: [],
          equipment_ids: [],
      }
      this.update = false
      this.$emit('update-table')
      this.$router.push({ name: 'admin/orgs' })
    },

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

    async fetchEquipments () {
      this.loading = true
      try {
        const response = await this.$api.admin.equipments.index()
        this.equipments = response.data
      } catch {
        this.error = true
      }
      this.loading = false
    },

    async createOrganization () {
      this.loading = true
      try {
        this.form_data.client_ids = this.form_data.clients.map(client => client.id)
        this.form_data.equipment_ids = this.form_data.equipments.map(equipment => equipment.id)
        const response = await this.$api.admin.orgs.create(this.form_data)
        this.clearForm()
        this.organization_form_show = false
      } catch (e) {
        console.log(e);
      }
    },

    async updateOrganization() {
      this.loading = true
      try {
        this.form_data.client_ids = this.form_data.clients.map(client => client.id)
        this.form_data.equipment_ids = this.form_data.equipments.map(equipment => equipment.id)
        const response = await this.$api.admin.orgs.update(this.form_data)
        // this.$emit('add-new-organization', response.data)
        this.clearForm()
        this.organization_form_show = false
      } catch (e) {
        console.log(e);
      }
    },

    getOrg (id) {
      this.$api.admin.orgs.show(this.id)
          .then(({ data }) => this.form_data = data )
          .catch((e) => console.log(e))
    }
  },

  created() {
    this.id = this.$route.params.id
    if (this.id !== 'new' && !isNaN(this.id)) {
      this.getOrg()
      this.update = true
    }

    this.fetchClients()
    this.fetchEquipments()
  }
}
</script>