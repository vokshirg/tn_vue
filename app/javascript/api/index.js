import Vue from 'vue'
import axios from 'axios'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token

const api = {
    clients: {
        current_user: () => axios.get('current_user'),
    },
    admin: {
        current_user: () => axios.get('current_admin'),
        logout: () => axios.delete('admin/auth/logout'),
        clients: {
            index: () => axios.get('/admin/clients'),
            create: (client) => axios.post('/admin/clients', { client }),
            update: (client) => axios.put('/admin/clients/'+ client.id, { client }),
            destroy: (client) => axios.delete('/admin/clients/'+ client.id)
        },
        orgs: {
            index: () => axios.get('/admin/organizations'),
            create: (organization) => axios.post('/admin/organizations', { organization }),
            update: (organization) => axios.put('/admin/organizations/'+ organization.id, { organization }),
            destroy: (organization) => axios.delete('/admin/organizations/'+ organization.id)
        },
    }
}

Vue.prototype.$api = api