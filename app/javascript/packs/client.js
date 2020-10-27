import Vue from 'vue'
import Client from '@client'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#client',
    render: h => h(Client)
  }).$mount()

})
