const path = require('path')

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '..', '..', 'app/javascript/'),
            '@plugins': path.resolve(__dirname, '..', '..', 'app/javascript/plugins/'),
            '@shared': path.resolve(__dirname, '..', '..', 'app/javascript/components/shared/'),
            '@staff': path.resolve(__dirname, '..', '..', 'app/javascript/components/staff/'),
            '@client': path.resolve(__dirname, '..', '..', 'app/javascript/components/client/')
        }
    }
}