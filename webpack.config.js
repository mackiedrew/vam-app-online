const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Constants
const PORT = 7447
const BASE_DIRECTORY = resolve(__dirname)
const BUILD_DIRECTORY = `${BASE_DIRECTORY}/build`
const APP_DIRECTORY = `${BASE_DIRECTORY}/src`

// Webpack plugins
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${APP_DIRECTORY}/index.ejs`,
  filename: 'index.html',
  inject: 'body',
})

const configuration = {

  context: APP_DIRECTORY,

  entry: {
    app: [
      `webpack-dev-server/client?http://localhost:${PORT}`,
      `${APP_DIRECTORY}/index.js`,
    ],

  },

  output: {
    path: BUILD_DIRECTORY,
    publicPath: BUILD_DIRECTORY,
    filename: '[name].bundle.js',
  },

  node: {
    __dirname: false,
    __filename: false
  },

  devServer: {
    port: PORT,
    inline: false,
    contentBase: BUILD_DIRECTORY,
    publicPath: BUILD_DIRECTORY,
    outputPath: BUILD_DIRECTORY,
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

module.exports = configuration