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
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'OrganizationForm',
  data () {
    return {
      organization_form_show: true,
      update: false,
      form_data: {
        id: '',
        inn: '',
        name: '',
        ogrn: '',
        org_type: '',
        clients: [],
        client_ids: [],
        equipments: [],
        equipment_ids: []
      },
      org_types: [
        {
          label: 'ИП',
          value: 'ip'
        },
        {
          label: 'Юр.Лицо',
          value: 'ul'
        }
      ]
    }
  },

  computed: {
    ...mapState({
      clients: state => state.clients.data,
      equipments: state => state.equipments.data
    }),

    ...mapGetters({
      getOrg: 'orgs/get_org'
    })
  },

  validations: {
    form_data: {
      inn: {
        numeric,
        required,
        length: (value) => between(12, 12)(value.length)
      },
      name: {
        required,
        minLength: minLength(5)
      },
      ogrn: {
        numeric,
        required,
        length: (value) => between(13, 13)(value.length)
      }
    }
  },

  async created () {
    this.id = this.$route.params.id
    if (this.id !== 'new' && !isNaN(this.id)) {
      this.update = true
      Object.assign(this.form_data, await this.fetchOrgById(this.id))
    }

    if (this.clients.length === 0 && this.equipments.length === 0) {
      this.fetchClients()
      this.fetchEquipments()
    }
  },

  methods: {
    ...mapActions({
      fetchClients: 'clients/fetch',
      fetchEquipments: 'equipments/fetch',
      fetchOrgById: 'orgs/fetch_org_by_id',
      addOrg: 'orgs/add_org'
    }),

    async submitForm () {
      try {
        this.loading = true
        console.log(this.form_data)

        this.form_data.client_ids = this.form_data.clients.map(client => client.id)
        this.form_data.equipment_ids = this.form_data.equipments.map(equipment => equipment.id)

        if (this.update === true) {
          await this.$api.admin.orgs.update(this.form_data)
        } else {
          await this.addOrg(this.form_data)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
        this.organization_form_show = false
      }
    },

    clearForm () {
      this.form_data = {
        id: '',
        inn: '',
        name: '',
        ogrn: '',
        org_type: '',
        clients: [],
        client_ids: [],
        equipments: [],
        equipment_ids: []
      }
      this.update = false
      this.$router.push({ name: 'admin/orgs' })
    }
  }
}
</script>
