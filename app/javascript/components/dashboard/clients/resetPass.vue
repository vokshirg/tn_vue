<template lang="pug">

  q-dialog( v-model='reset_password_form_show'
    @hide="clearForm(reset_form_data.id)"
    transition-show="scale"
    transition-hide="scale" )
    div
      q-form( @submit.prevent="submitForm" )

        q-card( style='min-width: 400px' )
          q-card-section.bg-teal
            .text-h6 Сбросить пароль {{ reset_form_data.id }}

          q-card-section.q-pt-none
            q-input(
              dense
              v-model='reset_form_data.password'
              :type="isPwd ? 'password' : 'text'"
              hint='Пароль'
              :rules="[ () => $v.reset_form_data.password.minLength || 'Required. Min length 6' ]")
              template(v-slot:append)
                q-icon( size='xs' :name="isPwd ? 'fas fa-eye-slash' : 'far fa-eye'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd")

            q-input(
              dense
              v-model='reset_form_data.password_confirmation'
              :type="isPwd ? 'password' : 'text'"
              hint='Подтверждение пароля'
              :rules="[\
                       () => $v.reset_form_data.password_confirmation.minLength || 'Required. Min length 6' ,\
                       () => $v.reset_form_data.password_confirmation.sameAsPassword || 'Пароли должны совпадать'\
                      ]" )

          q-card-actions.text-primary( align='right' )
            q-btn( flat label='Отменить' v-close-popup )
            q-btn( type="submit" label='Сбросить' color="primary" )

</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'ResetPass',
  data () {
    return {
      reset_password_form_show: true,
      submitStatus: '',
      isPwd: true,
      reset_form_data: {
        id: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  validations: {
    reset_form_data: {
      password: {
        required,
        minLength: minLength(6)
      },
      password_confirmation: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs('password')
      }
    }
  },

  computed: {},

  created () {
    this.reset_form_data.id = this.$route.params.id
  },

  methods: {
    async submitForm () {
      alert('works')
      try {
        this.loading = true
        await this.$api.admin.clients.update(this.reset_form_data)
      } catch (e) {
        console.log(e.response.data)
      } finally {
        this.loading = false
        this.reset_password_form_show = false
      }
    },

    clearForm (id) {
      this.reset_form_data = {
        id: '',
        password: '',
        password_confirmation: ''
      }
      this.$router.push({ name: 'client', params: { id } })
    }
  }

}
</script>
