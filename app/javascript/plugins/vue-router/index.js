import Vue from 'vue'
import VueRouter from 'vue-router'

import AdminClients from '@admin/clients'
import AdminOrgs from '@admin/organizations'
import AdminEquipments from '@admin/equipments'

import clientForm from '@admin/clients/form'
import orgForm from '@admin/organizations/form'
import equipmentForm from '@admin/equipments/form'
import NotFound from '@shared/not_found'
import organizations from '@client/organizations'
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  hashbang: false,
  routes: [
    { path: '/admin/', redirect: '/admin/clients' },
    { path: '/', redirect: '/client/organizations' },

    { path: '/client/organizations', component: organizations, name: 'client/organizations' },
    {
      path: '/admin/clients',
      component: AdminClients,
      name: 'admin/clients',
      children: [
        { path: ':id', component: clientForm, name: 'client' }
      ]
    },

    {
      path: '/admin/orgs',
      component: AdminOrgs,
      name: 'admin/orgs',
      children: [
        { path: ':id', component: orgForm, name: 'org' }
      ]
    },

    {
      path: '/admin/equipments',
      component: AdminEquipments,
      name: 'admin/equipments',
      children: [
        { path: ':id', component: equipmentForm, name: 'equipment' }
      ]
    },
    { path: '*', component: NotFound }
  ]
})
