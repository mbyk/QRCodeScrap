const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './webfront/index',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public/javascripts')
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          plugins: ['syntax-dynamic-import'],

          presets: [['env', {
            'modules': false
          }]]
        }

      }, {
        test: /\.(scss|css)$/,

        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }]
      }]
  },

  resolve: {

    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }

  },

  mode: 'development',

  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
  ]
}
