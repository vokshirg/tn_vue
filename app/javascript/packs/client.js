import Vue from 'vue'
import Client from '@client'
import '@plugins/quasar'
import '@plugins/vuelidate'
import '@plugins/api'
import router from '@plugins/vue-router'
import store from '@plugins/store'
require.context('images', true)

document.addEventListener('DOMContentLoaded', () => {
  const client = new Vue({
    render: h => h(Client),
    router,
    store
  }).$mount()
  document.body.appendChild(client.$el)
})
