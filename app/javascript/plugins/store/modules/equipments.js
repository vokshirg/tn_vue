import Vue from 'vue'
const $api = Vue.prototype.$api

export default {
    namespaced: true,
    state: {
        data: []
    },
    mutations: {
        SET_DATA: (state, equipments ) => {
            state.data = equipments
        }
    },
    actions: {
        fetch: ({ commit }) => {
            $api.admin.equipments.index()
                .then(({ data }) => {
                    commit('SET_DATA', data)
                })
        },
    }
}