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

        // changeOrg(state, content){
        //     this.$cable.perform({
        //         channel: 'OrganizationsChannel',
        //         action: 'alert_smth',
        //         data: {
        //             content
        //         }
        //     })
        // },

        ADD_ORG: (state, payload) => {
            state.hash.push(payload)
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

        // update_orgs({ commit }, org) {
        //     commit('changeOrg', org)
        // },

        async add_org({ commit }, org) {
            const resp = await $api.admin.orgs.create(org)
            commit('ADD_ORG', resp.data)
        }
    }
}