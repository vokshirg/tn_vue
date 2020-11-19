import Vue from 'vue'
import axios from 'axios'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.accept = 'application/json'
axios.defaults.baseURL = process.env.BASE_URL

const api = {
  clients: {
    current_user: () => axios.get('/current_user'),
    orgs: () => axios.get('/organizations'),
    logout: () => axios.delete('/auth/logout')
  },
  admin: {
    current_user: () => axios.get('/current_admin'),
    logout: () => axios.delete('/admin/auth/logout'),
    clients: {
      index: () => axios.get('/admin/clients'),
      create: (client) => axios.post('/admin/clients', { client }),
      update: (client) => axios.put('/admin/clients/' + client.id, { client }),
      destroy: (client) => axios.delete('/admin/clients/' + client.id),
      show: (clientId) => axios.get('/admin/clients/' + clientId)
    },
    equipments: {
      index: () => axios.get('/admin/equipments'),
      create: (equipment) => axios.post('/admin/equipments', { equipment }),
      update: (equipment) => axios.put('/admin/equipments/' + equipment.id, { equipment }),
      destroy: (equipment) => axios.delete('/admin/equipments/' + equipment.id),
      show: (equipmentId) => axios.get('/admin/equipments/' + equipmentId)
    },
    orgs: {
      index: (props) => axios.get('/admin/organizations',
        {
          params: {
            page: props.pagination.page,
            per: props.pagination.rowsPerPage,
            filter: props.filter
          }
        }),
      create: (organization) => axios.post('/admin/organizations', { organization }),
      update: (organization) => axios.put('/admin/organizations/' + organization.id, { organization }),
      destroy: (organization) => axios.delete('/admin/organizations/' + organization.id),
      show: (organizationId) => axios.get('/admin/organizations/' + organizationId)
    }
  }
}

Vue.prototype.$api = api
