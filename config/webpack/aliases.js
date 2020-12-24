const path = require('path')

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '..', '..', 'app/javascript/'),
            '@mixins': path.resolve(__dirname, '..', '..', 'app/javascript/mixins/'),
            '@plugins': path.resolve(__dirname, '..', '..', 'app/javascript/plugins/'),
            '@shared': path.resolve(__dirname, '..', '..', 'app/javascript/components/shared/'),
            '@admin': path.resolve(__dirname, '..', '..', 'app/javascript/components/dashboard/'),
            '@client': path.resolve(__dirname, '..', '..', 'app/javascript/components/client/')
        }
    }
}