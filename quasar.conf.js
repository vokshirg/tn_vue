build: {
    chainWebpack (chain) {
        chain.module.rule('pug')
            .test(/\.pug$/)
            .use('pug-plain-loader')
            .loader('pug-plain-loader')
    }
},
extras: [
    'fontawesome-v5'
],
framework: {
    iconSet: 'fontawesome-v5',
    plugins: [
        'LoadingBar'
    ],
        config: {
        loadingBar: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */ }
    }
}