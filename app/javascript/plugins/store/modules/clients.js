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
        },

        ADD_CLIENT: (state, payload) => {
            state.data.push(payload)
        }
    },

    getters: {
        get_client: state => id => {
            return state.data.find(client => client.id === id);
        }
    },

    actions: {
        fetch: ({ commit }) => {
            $api.admin.clients.index()
                .then(({ data }) => {
                    commit('SET_DATA', data)
                })
        },

        fetch_client_by_id ({ dispatch, getters, state} , id) {
            if (state.data.length === 0) {
                return $api.admin.clients.show(id)
                    .then(({data}) => {
                        return data
                    })
            } else {
                return getters.get_client(id)
            }
        },

        async add_client({ commit }, client) {
            const resp = await $api.admin.clients.create(client)
            commit('ADD_CLIENT', resp.data)
        }
    }
}