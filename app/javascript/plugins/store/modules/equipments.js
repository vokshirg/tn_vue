import Vue from 'vue'
const $api = Vue.prototype.$api

export default {
  namespaced: true,
  state: {
    data: []
  },

  mutations: {
    SET_DATA: (state, equipments) => {
      state.data = equipments
    },

    ADD_EQUIPMENT: (state, payload) => {
      state.data.push(payload)
    }
  },

  getters: {
    get_equipment: state => id => {
      return state.data.find(equipment => equipment.id === id)
    }
  },

  actions: {
    fetch: ({ commit }) => {
      $api.admin.equipments.index()
        .then(({ data }) => {
          commit('SET_DATA', data)
        })
    },

    fetch_equipments_by_id ({ dispatch, getters, state }, id) {
      if (state.data.length === 0) {
        return $api.admin.equipments.show(id)
          .then(({ data }) => {
            return data
          })
      } else {
        return getters.get_equipment(id)
      }
    },

    async add_equipment ({ commit }, eq) {
      const resp = await $api.admin.equipments.create(eq)
      commit('ADD_EQUIPMENT', resp.data)
    }
  }
}
