<template lang="pug">
  #staff
    q-layout(view="hHh Lpr fFf")
      shared-header

      //q-drawer(show-if-above v-model="left" side="left" bordered)
        <!-- drawer content -->

      q-page-container
        //router-view
        q-page.q-pa-md
          p(v-for="n in 2" :key="n") {{ message }}
            q-btn(label="My Button")


      shared-footer
</template>

<script>
import Navbar from './../shared/navbar'
import Footer from './../shared/footer'


export default {
  name: "Staff",
  data () {
    return {
      message: "That is ADMIN app!"
    }
  },

  components: {
    'shared-header': Navbar,
    'shared-footer': Footer
  }
}
</script>

<style lang="sass">
  p
    font-size: 1.5em
    text-align: center
    color: darkgreen
</style>
