<template lang="pug">
  q-dialog(v-model='organization_form_show' @hide="clearForm")
    q-card(style='min-width: 450px')
      q-card-section
        .text-h6 Добавить организацию
      q-card-section.q-pt-none
        form(@submit="submitForm")
          q-input(
            dense
            v-model='form_org_data.inn'
            hint='ИНН'
            type="number"
            :rules="[\
              val => $v.form_org_data.inn.required || 'Field is required',\
              val => $v.form_org_data.inn.length || 'ИНН состоит из 12 цифр'\
              ]"
            autofocus)

          q-input(
            dense
            v-model='form_org_data.name'
            hint='Название организации'
            :rules="[ val => $v.form_org_data.name.minLength || 'Required. Min length 5' ]")

          q-input(
            dense
            v-model='form_org_data.ogrn'
            hint='ОГРН'
            :rules="[ val => $v.form_org_data.ogrn.length || 'Длина ОГРН должна быть равна 13' ]")

          q-select(
            dense
            v-model='form_org_data.org_type'
            hint='Тип организации'
            :options="org_types"
            emit-value
            map-options)

          q-select(
            v-model='form_org_data.clients'
            hint='Clients'
            option-value="id"
            option-label="fullname"
            :options="clients"
            multiple)

          q-card-actions.text-primary(align='right')
            q-btn(flat label='Отменить' v-close-popup)
            q-btn(type="submit" label='Добавить' color="primary")

</template>

<script>
import { required, between, numeric, minLength } from 'vuelidate/lib/validators'

export default {
  name: "organizationForm",
  data () {
    return {
      organization_form_show: false,
      update: false,
      clients: [],
      form_org_data: {
        id: '',
        inn: '',
        name: '',
        ogrn: '',
        org_type: '',
        clients: [],
        client_ids: []
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
    form_org_data: {
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
    showDialog(org) {
      this.organization_form_show = true
      if (org!==undefined) {
        this.form_org_data = org
        this.update = true
      }
    },


    submitForm() {
      if (this.update === true) {
        this.updateOrganization()
      } else {
        this.createOrganization()
      }
    },


    clearForm() {
      this.form_org_data = {
          id: '',
          inn: '',
          name: '',
          ogrn: '',
          org_type: '',
          clients: [],
          client_ids: []
      }
      this.update = false
      this.$emit('update-table')
    },


    async fetchClients () {
      this.loading = true
      try {
        const response = await this.$api.admin.clients.index()
        this.clients = response.data
        // console.log(this.clients)
      } catch {
        this.error = true
      }
      this.loading = false
    },

    async createOrganization () {
      this.loading = true
      try {
        this.form_org_data.client_ids = this.form_org_data.clients.map(client => client.id)
        const response = await this.$api.admin.orgs.create(this.form_org_data)
        console.log(response.data);
        this.clearForm()
        this.organization_form_show = false
      } catch (e) {
        console.log(e);
      }
    },


    async updateOrganization() {
      this.loading = true
      try {
        this.form_org_data.client_ids = this.form_org_data.clients.map(client => client.id)
        const response = await this.$api.admin.orgs.update(this.form_org_data)
        this.$emit('add-new-organization', response.data)
        this.clearForm()
        this.organization_form_show = false
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    this.fetchClients()
  }
}
</script>