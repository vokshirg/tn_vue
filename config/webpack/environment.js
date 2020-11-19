const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const dotenv = require('dotenv')

const vue = require('./loaders/vue')
const sass = require('./loaders/sass')
const aliases = require('./aliases')

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
environment.loaders.prepend('sass', sass)
environment.config.merge(aliases)

const dotenvFiles = [
    `.env.${process.env.NODE_ENV}.local`,
    '.env.local',
    `.env.${process.env.NODE_ENV}`,
    '.env'
]
dotenvFiles.forEach((dotenvFile) => {
    dotenv.config({ path: dotenvFile, silent: true })
})

environment.plugins.insert(
    "Environment",
    new webpack.EnvironmentPlugin(process.env)
)

module.exports = environment