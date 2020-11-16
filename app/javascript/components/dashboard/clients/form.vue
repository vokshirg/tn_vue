<template lang="pug">
  q-dialog( v-model='client_form_show' @hide="clearForm" )
    q-card( style='min-width: 450px' )
      q-card-section
        .text-h6 Новый клиент

      q-card-section.q-pt-none
        form( @submit.prevent="submitForm" )
          q-input(
            dense
            v-model='form_data.email'
            hint='E-mail'
            type="email"
            :rules="[\
                val => $v.form_data.email.required || 'Field is required',\
                val => $v.form_data.email.email || 'email is invalid'\
                ]"
            autofocus )

          q-input(
            dense
            v-model='form_data.fullname'
            hint='Полное имя'
            :rules="[ val => $v.form_data.fullname.minLength || 'Required. Min length 5' ]")

          q-input(
            dense
            type="tel"
            v-model='form_data.phone'
            mask="+7 (###) ### - ####"
            fill-mask
            hint="Mask: (###) ### - ####"
            :rules="[ val => $v.form_data.phone.between || 'Min phone length 10 - max 14' ]"
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
            q-btn(flat label='Отменить' v-close-popup)
            q-btn(type='submit' label='Добавить' color="primary" :disabled="submitStatus === 'PENDING'")

        p.typo__p( v-if="submitStatus === 'OK'" ) Thanks for your submission!
        p.typo__p( v-if="submitStatus === 'ERROR'" ) Please fill the form correctly.
        p.typo__p( v-if="submitStatus === 'PENDING'" ) Sending...

</template>

<script>
import { required, between, email, numeric, minLength } from 'vuelidate/lib/validators'


export default {
  name: "clientForm",
  data () {
    return {
      client_form_show: true,
      update: false,
      submitStatus: '',
      orgs: [],
      form_data: {
        email: '',
        fullname: '',
        phone: '',
        orgs: [],
        organization_ids: []
      },
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

  methods: {
    showDialog(client) {
      this.client_form_show = true
      if (client!==undefined) {
        this.form_data = client
        this.update = true
      }
    },

    submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        if (this.update === true) {
          this.updateClient()
        } else {
          this.createClient()
        }
        this.submitStatus = 'OK'
      }
    },

    clearForm() {
      this.form_data = {
        email: '',
        fullname: '',
        phone: '',
        orgs: [],
        organization_ids: [],
      }
      this.update = false
      this.$emit('update-table')
      this.$router.push({ name: 'admin/clients' })
    },


    async fetchOrgs () {
      this.loading = true
      try {
        const response = await this.$api.admin.orgs.index()
        this.orgs = response.data
      } catch {
        this.error = true
      }
      this.loading = false
    },


    async createClient () {
      this.loading = true
      try {
        this.form_data.organization_ids = this.form_data.orgs.map(org => org.id)
        const response = await this.$api.admin.clients.create(this.form_data)
        this.clearForm()
        this.client_form_show = false
      } catch (e) {
        console.log(e.response.data);
      }
    },

    async updateClient() {
      this.loading = true
      try {
        this.form_data.organization_ids = this.form_data.orgs.map(org => org.id)
        const response = await this.$api.admin.clients.update(this.form_data)
        // this.$emit('add-new-client', response.data)
        this.clearForm()
        this.client_form_show = false
      } catch (e) {
        console.log(e);
      }
    },
    getClient () {
      this.$api.admin.clients.show(this.id)
          .then(({ data }) => this.form_data = data )
          .catch((e) => console.log(e))

    }
  },

  created() {
    this.id = this.$route.params.id
    if (this.id !== 'new' && !isNaN(this.id)) {
      this.getClient()
      this.update = true
    }

    this.fetchOrgs()
  }
}
</script>
