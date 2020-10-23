import Vue from 'vue'
import axios from 'axios'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token

const api = {
    clients: {
        index: () => axios.get('/admin/clients'),
        create: (new_user_data) => axios.post('/admin/clients', { client: new_user_data })
    }
}

Vue.prototype.$api = api