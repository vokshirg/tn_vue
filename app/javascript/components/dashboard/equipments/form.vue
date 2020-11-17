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
import { mapState, mapActions, mapGetters } from 'vuex'

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
    }),

    ...mapGetters({
      getEquipment: 'equipments/get_equipment'
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
      fetchOrgs: 'orgs/fetch',
      addEquipment: 'equipments/add_equipment',
      fetchEquipmentById: 'equipments/fetch_equipments_by_id'
    }),

    async submitForm() {
      try {
        this.loading = true
        this.form_data.organization_id = this.form_data.org.id
        if (this.update === true) {
          await this.$api.admin.equipments.update(this.form_data)
        } else {
          await this.addEquipment(this.form_data)
        }

      } catch (e) {
        console.log(e);
      } finally {

        this.loading = false
        this.equipment_form_show = false
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
      this.$router.push({ name: 'admin/equipments' })
    },

  },
  created() {
    this.id = this.$route.params.id
    if (this.id !== 'new' && !isNaN(this.id)) {
      this.fetchEquipmentById(this.id).then((data) => { this.form_data = data })
      this.update = true
    }

    this.fetchOrgs()
  }
}
</script>
