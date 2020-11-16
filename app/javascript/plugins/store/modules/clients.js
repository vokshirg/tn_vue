import Vue from 'vue'
const $api = Vue.prototype.$api

export default {
    namespaced: true,
    state: {
        data: []
    },
    mutations: {
        SET_DATA: (state, clients ) => {
            state.data = clients
        }
    },
    actions: {
        fetch: ({ commit }) => {
            $api.admin.clients.index()
                .then(({ data }) => {
                    commit('SET_DATA', data)
                })
        },
    }
}