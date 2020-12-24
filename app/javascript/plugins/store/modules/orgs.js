import Vue from 'vue'
const $api = Vue.prototype.$api

export default {
    namespaced: true,
    state: {
        hash: []
    },

    mutations: {
        SET_DATA: (state, organizations) => {
            state.hash = organizations
        },

        UPDATE_ORG: (state, org) => {
            Vue.set(state.hash, org.id, org)

        },

        DESTROY_ORG: (state, id) => {
            Vue.delete(state.hash, id)
        }
    },

    getters: {
        get_org: getters => id => {
            return getters.hash[id];
        },

        data: state => {
            let data = [], i
            for (i in state.hash) {
                data.push(state.hash[i]) ;
            }
            return data
        }
    },

    actions: {
        fetch: ({ commit }, filter = {pagination:{}}) => {
            return $api.admin.orgs.index(filter)
                .then(({ data }) => {
                    commit('SET_DATA', data)
                })
        },

        // fetch_org_by_id ({ dispatch, getters, state} , id) {
        //     if (state.data.length === 0) {
        //         return dispatch('fetch')
        //             .then(() => {
        //                 console.log(state.data)
        //                 console.log(getters.get_org(id))
        //                 getters.get_org(id)
        //             })
        //     }
        //     // return getters.get_org(id)
        // },


        fetch_org_by_id ({ dispatch, getters, state} , id) {
            if (getters.data.length === 0) {
                return $api.admin.orgs.show(id)
                    .then(({data}) => {
                        return data
                    })
            } else {
                return getters.get_org(id)
            }
        },

        fetch_client_orgs: ({ commit }) => {
            $api.clients.orgs()
                .then(({ data }) => {
                    commit('SET_DATA', data)
                })
        },

        update_from_socket({ commit }, payload) {
            switch (payload.type) {
                case 'update':
                    return commit('UPDATE_ORG', payload.org)
                case 'destroy':
                    return commit('DESTROY_ORG', payload.id)
            }
        },

        remove_org({ commit }, id) {
            $api.admin.orgs.destroy(id)
            commit('DESTROY_ORG', id)
        },

        async add_org({ commit }, org) {
            const resp = await $api.admin.orgs.create(org)
            commit('UPDATE_ORG', resp.data)
        }
    }
}