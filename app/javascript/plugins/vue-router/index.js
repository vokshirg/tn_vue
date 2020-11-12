import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import AdminClients from "@admin/clients"
import AdminOrgs from "@admin/organizations"
import AdminEquipments from "@admin/equipments"

import clientForm from "@admin/clients/form";
import orgForm from "@admin/organizations/form";
import equipmentForm from "@admin/equipments/form";


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

        { path: '/admin/equipments',   component: AdminEquipments, name: 'admin/equipments', children: [
            { path: ':id', component: equipmentForm, name: 'equipment'}
        ]},
    ]
})

