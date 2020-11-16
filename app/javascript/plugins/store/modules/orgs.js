import Vue from 'vue'
const $api = Vue.prototype.$api

export default {
    namespaced: true,
    state: {
        data: []
    },
    mutations: {
        SET_DATA: (state, organizations ) => {
            state.data = organizations
        }
    },
    actions: {
        fetch: ({ commit }) => {
            $api.admin.orgs.index()
                .then(({ data }) => {
                    commit('SET_DATA', data)
                })
        },

        fetch_client_orgs: ({ commit }) => {
            $api.clients.orgs()
                .then(({ data }) => {
                    commit('SET_DATA', data)
                })
        },
    }
}