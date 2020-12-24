import Vue from 'vue'
import store from '@plugins/store'
import ActionCableVue from 'actioncable-vue'

Vue.use(ActionCableVue, {
  debug: process.env.SOCKETS_DEBUG,
  debugLevel: process.env.SOCKETS_DEBUG_LEVEL,
  connectionUrl: process.env.SOCKETS_URL, // or function which returns a string with your JWT appended to your server URL as a query parameter
  connectImmediately: true,
  store
})
