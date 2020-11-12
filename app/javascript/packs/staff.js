import Vue from 'vue'
import Staff from '@admin'
import  '@plugins/quasar'
import  '@plugins/vuelidate'
import  '@/api'
require.context('images', true)
import router from '@plugins/vue-router'

document.addEventListener('DOMContentLoaded', () => {
  const staff = new Vue({
    render: h => h(Staff),
    router
  }).$mount()
  document.body.appendChild(staff.$el)

})
