import Vue from 'vue'
const $api = Vue.prototype.$api

export default {
    namespaced: true,
    state: {
        data: []
    },

    mutations: {
        SET_DATA: (state, organizations) => {
            state.data = organizations
        },

        changeOrg(state, content){
            this.$cable.perform({
                action: 'update_orgs',
                data: {
                    content
                }
            })
        },

        ADD_ORG: (state, payload) => {
            state.data.push(payload)
        }
    },

    getters: {
        get_org: state => id => {
            return state.data.find(org => org.id === id);
        }
    },

    actions: {
        fetch: ({ commit }) => {
            return $api.admin.orgs.index()
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
            if (state.data.length === 0) {
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

        update_orgs_cable({ commit }, org) {
            commit('changeOrg', org)
        },

        async add_org({ commit }, org) {
            const resp = await $api.admin.orgs.create(org)
            commit('ADD_ORG', resp.data)
        }
    }
}