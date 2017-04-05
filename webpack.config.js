const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Constants
const port = 7447
const srcDirectory = 'frontend'
const outputDirectory = 'build'

// Webpack plugins
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: resolve(__dirname, `${srcDirectory}/index.html`),
  filename: 'index.html',
  inject: 'body',
})


const configuration = {

  context: resolve(__dirname, srcDirectory),

  entry: [
    "babel-polyfill",
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://0.0.0.0:${port}`,
    'webpack/hot/only-dev-server',
    './index.js',
  ],

  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, outputDirectory),
    publicPath: 'http://0.0.0.0:7447/'
  },

  devServer: {
    host: '0.0.0.0',
    hot: true,
    inline: true,
    port: port,
    historyApiFallback: true,
    contentBase: resolve(__dirname, outputDirectory),
    publicPath: '/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: [
          'babel-loader',
          ],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: [
          'json-loader',
          ]
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        loader: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: [
           'babel-loader',
          {
            loader: 'react-svg-loader',
            query: {
              svgo: {
                plugins: [{removeTitle: true}],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/, 
        exclude: /node_modules/,
        loader: 'file-loader?name=images/[hash].[ext]'
      },
    ]
  },

  plugins: [
        new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    HtmlWebpackPluginConfig,
  ],
}

module.exports = configuration