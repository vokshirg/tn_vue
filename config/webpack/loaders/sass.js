module.exports = {
  test: /\.s[ac]ss$/i,
  use: [
    'vue-style-loader',
    // Translates CSS into CommonJS
    'css-loader',
    // Compiles Sass to CSS
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          indentedSyntax: true
        }
      }
    }

  ],
}