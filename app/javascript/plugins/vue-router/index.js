import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import AdminClients from "@admin/clients"
import AdminOrgs from "@admin/organizations"
import clientForm from "@admin/clients/clientForm";
import orgForm from "@admin/organizations/orgForm";

export default new VueRouter({
    mode: 'history',
    hashbang: false,
    routes: [
        { path: '/admin/',   redirect: '/admin/clients' },
        { path: '/admin/clients',   component: AdminClients, name: 'admin/clients', children: [
                { path: ':id', component: clientForm, name: 'client' },
            ] },
        { path: '/admin/orgs',   component: AdminOrgs, name: 'admin/orgs', children: [
                { path: ':id', component: orgForm, name: 'org'}
            ]},
    ]
})

