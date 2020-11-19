import Vue from 'vue'
import store from '@plugins/store'
import ActionCableVue from 'actioncable-vue'

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  // connectionUrl: 'ws://localhost:3000/api/cable', // or function which returns a string with your JWT appended to your server URL as a query parameter
  connectImmediately: true,
  store
})
