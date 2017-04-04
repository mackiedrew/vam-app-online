const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ProductionNodeEnvironment = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
})

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {

  devtool: "eval-source-map",

  devServer: {
    host: 'localhost',
    port: 7447,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  },

  context: path.resolve(__dirname, './frontend'),

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:7447',
    'webpack/hot/only-dev-server',
    './index.js',
  ],

  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    ProductionNodeEnvironment,
    HtmlWebpackPluginConfig,
  ],
}