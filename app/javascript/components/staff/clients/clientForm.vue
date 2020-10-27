<template lang="pug">
  q-dialog(v-model='client_form_show')
    q-card(style='min-width: 450px')
      q-card-section
        .text-h6 Новый клиент
      q-card-section.q-pt-none
        form(@submit="createClient()")
          q-input(
            dense
            v-model='new_user_data.email'
            placeholder='email'
            type="email"
            :rules="[\
                val => $v.new_user_data.email.required || 'Field is required',\
                val => $v.new_user_data.email.email || 'email is invalid'\
                ]"
            autofocus)
          q-input(
            dense
            v-model='new_user_data.fullname'
            placeholder='Полное имя'
            :rules="[ val => $v.new_user_data.fullname.minLength || 'Required. Min length 5' ]")
          q-input(
            dense
            type="tel"
            v-model='new_user_data.phone'
            mask="+7 (###) ### - ####"
            :rules="[ val => $v.new_user_data.phone.between || 'Min phone length 10 - max 14' ]"
            lazy-rules
            unmasked-value
            fill-mask)

        q-card-actions.text-primary(align='right')
          q-btn(flat label='Cancel' v-close-popup)
          q-btn(flat label='Добавить' @click="createClient()")

</template>

<script>
import { required, between, email, numeric, minLength } from 'vuelidate/lib/validators'


export default {
  name: "clientForm",
  data () {
    return {
      client_form_show: false,
      new_user_data: {
        email: '',
        fullname: '',
        phone: ''
      },
    }
  },
  validations: {
    new_user_data: {
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
        between: between(10, 14)
      }
    }
  },
  methods: {
    async createClient () {
      this.loading = true
      try {
        const response = await this.$api.clients.create(this.new_user_data)
        console.log(response.data);
        this.$emit('add-new-client', response.data)
        this.clearForm()
        this.client_form_show = false
      } catch (e) {
        console.log(e.response.data);
      }
    },
    showDialog() {
      this.client_form_show = true
    },
    clearForm() {
      this.new_user_data = {
          email: '',
          fullname: '',
          phone: ''
      }
    }
  }
}
</script>

<style scoped>

</style>