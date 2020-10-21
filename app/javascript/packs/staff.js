import Vue from 'vue'
import Staff from '../components/staff'
import  '../components/quasar'

document.addEventListener('DOMContentLoaded', () => {
  const staff = new Vue({
    render: h => h(Staff)
  }).$mount()
  document.body.appendChild(staff.$el)

  console.log(staff)
})
