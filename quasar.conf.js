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
    iconSet: 'fontawesome-v5'
}