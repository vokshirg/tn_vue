import Vue from 'vue'
import Staff from '@staff'
import  '@plugins/quasar'
import  '@plugins/vuelidate'
import  '@/api'
require.context('images', true)


document.addEventListener('DOMContentLoaded', () => {
  const staff = new Vue({
    render: h => h(Staff)
  }).$mount()
  document.body.appendChild(staff.$el)

})
