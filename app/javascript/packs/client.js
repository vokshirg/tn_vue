import Vue from 'vue'
import Client from '@client'
import  '@plugins/quasar'
import  '@plugins/vuelidate'
import  '@/api'
require.context('images', true)


document.addEventListener('DOMContentLoaded', () => {
  const client = new Vue({
    render: h => h(Client)
  }).$mount()
  document.body.appendChild(client.$el)

})