import Vue from 'vue'
import  '@plugins/quasar'
import  '@plugins/vuelidate'
import  '@plugins/api'
import  '@plugins/sockets'
import Staff from '@admin'

require.context('images', true)
import router from '@plugins/vue-router'
import store from '@plugins/store'


document.addEventListener('DOMContentLoaded', () => {
  const staff = new Vue({
    render: h => h(Staff),
    router,
    store,
  }).$mount()
  document.body.appendChild(staff.$el)

})
