<template lang="pug">
  div
    q-form( @submit.prevent="submitForm" )
      q-dialog( v-model='client_form_show' @hide="clearForm" persistent )
        q-card( style='min-width: 450px' )
          q-card-section
            .text-h6 {{ formTitle }}

          q-card-section.q-pt-none
            q-input(
              dense
              v-model='form_data.email'
              hint='E-mail'
              type="email"
              :rules="[\
                  () => $v.form_data.email.required || 'Field is required',\
                  () => $v.form_data.email.email || 'email is invalid'\
                  ]"
              autofocus )

            q-input(
              dense
              v-model='form_data.fullname'
              hint='Полное имя'
              :rules="[ () => $v.form_data.fullname.minLength || 'Required. Min length 5' ]")

            q-input(
              dense
              type="tel"
              v-model='form_data.phone'
              mask="+7 (###) ### - ####"
              fill-mask
              hint="Mask: (###) ### - ####"
              :rules="[ () => $v.form_data.phone.between || 'Min phone length 10 - max 14' ]"
              unmasked-value)

            q-select(
              dense
              v-model='form_data.orgs'
              hint='Organizations'
              :options="orgs"
              option-value="id"
              option-label="name"
              multiple )

          q-card-actions.text-primary(align='right')
            q-btn(flat label='Отменить' @click="" v-close-popup)
            q-btn(v-if="this.update" color="red" @click="resetPassDialogShow(id)" label='Сбросить пароль')
            q-btn(type='submit' :label='formBtn' color="primary" :disabled="submitStatus === 'PENDING'")

          p.typo__p( v-if="submitStatus === 'OK'" ) Thanks for your submission!
          p.typo__p( v-if="submitStatus === 'ERROR'" ) Please fill the form correctly.
          p.typo__p( v-if="submitStatus === 'PENDING'" ) Sending...
    router-view

</template>

<script>
import { required, between, email, numeric, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ClientForm',
  data () {
    return {
      client_form_show: true,
      update: false,
      submitStatus: '',
      form_data: {
        email: '',
        fullname: '',
        phone: '',
        orgs: [],
        organization_ids: []
      }
    }
  },

  validations: {
    form_data: {
      email: {
        required,
        email
      },
      fullname: {
        required,
        minLength: minLength(5)
      },
      phone: {
        numeric,
        required,
        between: (value) => between(10, 12)(value.length)
      }
    }
  },

  computed: {
    ...mapGetters({
      getClient: 'clients/get_client',
      orgs: 'orgs/data'
    }),

    formTitle () {
      if (this.update) {
        return 'Обновить клиента'
      } else {
        return 'Новый клиент'
      }
    },

    formBtn () {
      if (this.update) {
        return 'Обновить'
      } else {
        return 'Добавить'
      }
    }
  },

  created () {
    this.id = this.$route.params.id
    if (this.id !== 'new' && !isNaN(this.id)) {
      this.fetchClientById(this.id).then((data) => { this.form_data = data })
      this.update = true
    }

    this.fetchOrgs()
  },

  methods: {
    ...mapActions({
      fetchOrgs: 'orgs/fetch',
      addClient: 'clients/add_client',
      fetchClientById: 'clients/fetch_client_by_id'
    }),

    async submitForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        try {
          this.submitStatus = 'PENDING'
          this.loading = true
          this.form_data.organization_ids = this.form_data.orgs.map(org => org.id)

          if (this.update) {
            await this.$api.admin.clients.update(this.form_data)
          } else {
            await this.addClient(this.form_data)
          }
        } catch (e) {
          console.log(e.response.data)
        } finally {
          this.loading = false
          this.submitStatus = 'OK'
          this.client_form_show = false
        }
      }
    },

    clearForm () {
      this.form_data = {
        email: '',
        fullname: '',
        phone: '',
        organization_ids: []
      }
      this.update = false
      this.$router.push({ name: 'admin/clients' })
    },

    resetPassDialogShow (id) {
      this.$router.push({ name: 'resetPass', params: { id } })
    }
  }

}
</script>
