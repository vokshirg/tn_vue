import Vue from 'vue'
import Client from '@client'
import  '@plugins/quasar'
import  '@plugins/vuelidate'
import  '@/api'
require.context('images', true)
import router from '@plugins/vue-router'

document.addEventListener('DOMContentLoaded', () => {
  const client = new Vue({
    render: h => h(Client),
    router
  }).$mount()
  document.body.appendChild(client.$el)

})