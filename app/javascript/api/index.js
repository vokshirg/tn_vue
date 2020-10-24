import Vue from 'vue'
import axios from 'axios'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token

const api = {
    clients: {
        index: () => axios.get('/admin/clients'),
        create: (new_user_data) => axios.post('/admin/clients', { client: new_user_data })
    },
    admin: {
        current_user: () => axios.get('admin/current_admin'),
        logout: () => axios.delete('admin/auth/logout'),
    }
}

Vue.prototype.$api = api