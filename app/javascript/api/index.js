import Vue from 'vue'
import axios from 'axios'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token

const api = {
    clients: {
        index: () => axios.get('/admin/clients'),
        create: (client) => axios.post('/admin/clients', { client })
    },
    admin: {
        current_user: () => axios.get('admin/current_admin'),
        logout: () => axios.delete('admin/auth/logout'),
    }
}

Vue.prototype.$api = api