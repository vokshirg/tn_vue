import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import AdminClients from "@admin/clients"
import AdminOrgs from "@admin/organizations"

export default new VueRouter({
    mode: 'history',
    hashbang: false,
    routes: [
        { path: '/admin/',   redirect: '/admin/clients' },
        { path: '/admin/clients',   component: AdminClients },
        { path: '/admin/organizations',   component: AdminOrgs },
    ]
})

