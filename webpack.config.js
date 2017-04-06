const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer')

// Constants
const PORT = 7447
const BUILD_DIRECTORY = resolve(__dirname, 'build')
const APP_DIRECTORY = resolve(__dirname, 'src')

// Webpack plugins
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.ejs',
  filename: 'index.html',
  inject: 'body',
})


const configuration = {
  entry: APP_DIRECTORY + '/index.js',

  output: {
    path: BUILD_DIRECTORY,
    filename: '[name].bundle.js',
  },

  node: {
    __dirname: false,
    __filename: false
  },

  devServer: {
    port: PORT,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    HtmlWebpackPluginConfig,
  ],
}


configuration.target = webpackTargetElectronRenderer(configuration)

module.exports = configuration