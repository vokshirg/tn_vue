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
            autofocus
            :rules="[val => !!val || 'Field is required', val => re.test(val) || 'email is invalid']")
          q-input(
            dense
            v-model='new_user_data.fullname'
            placeholder='Полное имя'
            :rules="[ val => !!val && val.length > 5 || 'Required. Min length 5' ]")
          q-input(
            dense
            type="tel"
            v-model='new_user_data.phone'
            mask="+7 (###) ### - ####"
            fill-mask
            unmasked-value
            lazy-rules
            :rules="[ val => val.length <= 14 && val.length > 9 || 'Min phone length 10 - max 14' ]")
        q-card-actions.text-primary(align='right')
          q-btn(flat label='Cancel' v-close-popup)
          q-btn(flat label='Добавить' @click="createClient()")

</template>

<script>
export default {
  name: "clientForm",
  data () {
    return {
      client_form_show: false,
      re: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      new_user_data: {
        email: '',
        fullname: '',
        phone: ''
      },
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