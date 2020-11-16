<template lang="pug">
  q-dialog(v-model='equipment_form_show' @hide="clearForm")
    q-card(style='min-width: 450px')
      q-card-section
        .text-h6 Добавить Оборудование
      q-card-section.q-pt-none
        form(@submit.prevent="submitForm")

          q-input(
            dense
            v-model='form_data.name'
            hint='Название'
            :rules="[ val => $v.form_data.name.minLength && $v.form_data.name.required || 'Required. Min length 5' ]")

          q-select(
            dense
            v-model='form_data.eq_type'
            hint='Тип запчасти'
            :options="eq_types"
            emit-value
            :rules="[ val => $v.form_data.eq_type.required || 'Required' ]"
            map-options)

          q-input(
            dense
            v-model='form_data.sn'
            hint="Серийный номер"
            :rules="[ val => $v.form_data.sn.between || 'Min sn length 10 - max 14' ]")

          q-select(
            dense
            v-model='form_data.org'
            hint='Organizations'
            :options="orgs"
            option-value="id"
            option-label="name")

          q-card-actions.text-primary(align='right')
            q-btn(flat label='Отменить' v-close-popup)
            q-btn(type='submit' label='Добавить' color="primary")


</template>

<script>
import { required, between, numeric, minLength } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'

export default {
  name: "equipmentForm",
  data () {
    return {
      equipment_form_show: true,
      update: false,
      id: '',
      form_data: {
        name: '',
        sn: '',
        eq_type: '',
        org: '',
        organization_id: ''
      },
      eq_types: [
        {
          label: 'Аггрегаты',
          value: 'aggregates',
        },
        {
          label: 'Заменяемые',
          value: 'removable',
        },
        {
          label: 'Мелкие',
          value: 'small_parts',
        },
        {
          label: 'Другие',
          value: 'other',
        },
      ]
    }
  },

  computed: {
    ...mapState({
      orgs: state => state.orgs.data
    })
  },


  validations: {
    form_data: {
      name: {
        required,
        minLength: minLength(5)
      },
      sn: {
        numeric,
        required,
        between: (value) => between(10, 12)(value.length)
      },
      eq_type: {
        required
      }
    }
  },
  methods: {
    ...mapActions({
      fetchOrgs: 'orgs/fetch'
    }),

    showDialog(equipment) {
      this.equipment_form_show = true
      if (equipment!==undefined) {
        this.form_data = equipment
        this.update = true
      }
    },

    submitForm() {
      if (this.update === true) {
        this.updateEquipment()
      } else {
        this.createEquipment()
      }
    },

    clearForm() {
      this.form_data = {
        email: '',
        name: '',
        sn: '',
        orgs: [],
        organization_id: '',
      }
      this.update = false
      this.$emit('update-table')
      this.$router.push({ name: 'admin/equipments' })
    },


    async createEquipment () {
      this.loading = true
      try {
        this.form_data.organization_id = this.form_data.org.id
        const response = await this.$api.admin.equipments.create(this.form_data)
        console.log(response)

      } catch (e) {
        console.log(e);
      }
      // this.clearForm()
      this.equipment_form_show = false
    },

    async updateEquipment() {
      this.loading = true
      try {
        this.form_data.organization_id = this.form_data.org.id
        const response = await this.$api.admin.equipments.update(this.form_data)
        // this.$emit('add-new-equipment', response.data)
        this.clearForm()
        this.equipment_form_show = false
      } catch (e) {
        console.log(e);
      }
    },
    getEquipment () {
      this.$api.admin.equipments.show(this.id)
          .then(({ data }) => this.form_data = data )
          .catch((e) => console.log(e))
    }

  },
  created() {
    this.id = this.$route.params.id
    if (this.id !== 'new' && !isNaN(this.id)) {
      this.getEquipment()
      this.update = true
    }

    this.fetchOrgs()
  }
}
</script>
