import Vue from 'vue'
import axios from 'axios'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.accept = 'application/json'

const api = {
    clients: {
        current_user: () => axios.get('/current_user'),
        orgs: () => axios.get('/organizations'),
        logout: () => axios.delete('/auth/logout'),
    },
    admin: {
        current_user: () => axios.get('/current_admin'),
        logout: () => axios.delete('/admin/auth/logout'),
        clients: {
            index: () => axios.get('/admin/clients'),
            create: (client) => axios.post('/admin/clients', { client }),
            update: (client) => axios.put('/admin/clients/'+ client.id, { client }),
            destroy: (client) => axios.delete('/admin/clients/'+ client.id),
            show: (client_id) => axios.get('/admin/clients/'+ client_id)
        },
        equipments: {
            index: () => axios.get('/admin/equipments'),
            create: (equipment) => axios.post('/admin/equipments', { equipment }),
            update: (equipment) => axios.put('/admin/equipments/'+ equipment.id, { equipment }),
            destroy: (equipment) => axios.delete('/admin/equipments/'+ equipment.id),
            show: (equipment_id) => axios.get('/admin/equipments/'+ equipment_id)
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
            update: (organization) => axios.put('/admin/organizations/'+ organization.id, { organization }),
            destroy: (organization) => axios.delete('/admin/organizations/'+ organization.id),
            show: (organization_id) => axios.get('/admin/organizations/'+ organization_id)
        },
    }
}

Vue.prototype.$api = api