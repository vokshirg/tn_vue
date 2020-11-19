import Vue from 'vue'
import Vuex from 'vuex'

import orgs from './modules/orgs'
import clients from './modules/clients'
import equipments from './modules/equipments'

Vue.use(Vuex)

const $api = Vue.prototype.$api

export default new Vuex.Store({
  state: {
    current_client: null,
    current_admin: null
  },
  mutations: {
    SET_CURRENT_CLIENT: (state, currentClient) => {
      state.current_client = currentClient
    },
    SET_CURRENT_ADMIN: (state, currentAdmin) => {
      state.current_admin = currentAdmin
    }
  },
  actions: {
    get_current_client: ({ commit }) => {
      $api.clients.current_user()
        .then(({ data }) => {
          commit('SET_CURRENT_CLIENT', data)
        })
    },
    get_current_admin: ({ commit }) => {
      $api.admin.current_user()
        .then(({ data }) => {
          commit('SET_CURRENT_ADMIN', data)
        })
    }
  },
  modules: {
    orgs,
    clients,
    equipments
  },
  plugins: []
})
