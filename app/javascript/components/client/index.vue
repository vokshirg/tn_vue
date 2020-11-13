<template lang="pug">
  q-layout( view="hHh Lpr fFf" )
    shared-header(
      title="Client app"
      @getuser="getCurrentUser"
      :currentuser="client"
      type="client"
      @logout="logout" )

    //q-drawer(show-if-above v-model="left" side="left" bordered)
      // drawer content

    template( v-if="this.client === null" )
      q-card.absolute-center.vertical-middle
        q-card-section
          p
            b Необходимо авторизоваться

          q-btn(
            type='a'
            href="/auth/login"
            label="Войти" )

    template( v-else )
      q-page-container.q-py-none
        router-view( :client="this.client" )


      //router-view
      //q-splitter(v-model='splitterModel' )
        template(v-slot:before)
          q-tabs.col-auto.text-teal(v-model='tab' vertical)
            q-tab(name='mails' icon='fas fa-envelope' label='Mails')
            q-tab(name='alarms' icon='fas fa-clock' label='Alarms')
        template(v-slot:after)
          q-tab-panels(v-model='tab'
            animated
            swipeable
            vertical
            transition-prev='jump-up'
            transition-next='jump-up')

            q-tab-panel(name='mails')
              .text-h4.q-mb-md Mails
              p  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
            q-tab-panel(name='alarms')
              .text-h4.q-mb-md Alarms
              p  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
              p  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
              p  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
              p  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.

    shared-footer
</template>

<script>
import Navbar from '@shared/navbar'
import Footer from '@shared/footer'

export default {
  name: "Client",
  data () {
    return {
      client: null,
      splitterModel: 10,
      // tab: 'mails',
    }
  },

  components: {
    'shared-header': Navbar,
    'shared-footer': Footer,
  },

  methods: {
    async getCurrentUser() {
      try {
        const response = await this.$api.clients.current_user()
        this.client = response.data
        console.log(this.client)
      } catch (e) {
        console.log(e)
      }
    },

    logout () {
      this.$api.clients.logout()
      this.client = null
    }
  }
}
</script>

<style lang="sass" scoped>
  p
    font-size: 2em
    text-align: center

    &.red
      color: #B00100

</style>
