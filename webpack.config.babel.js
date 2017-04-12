/* eslint-env node */

import webpack from "webpack";
import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ElectronPlugin from "electron-webpack-plugin";

/// Constants ///
const PORT = 7447;
const BASE_DIRECTORY = resolve(__dirname);
const BUILD_DIRECTORY = `${BASE_DIRECTORY}/build`;
const APP_DIRECTORY = `${BASE_DIRECTORY}/src`;

/// Webpack plugins ///

// This plugin allows for base-page template
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${APP_DIRECTORY}/index.ejs`,
  filename: "index.html",
  inject: "body"
});

const ElectronPluginConfig = new ElectronPlugin({
  relaunchPathMatch: "./src",
  path: "./build",
  args: ["--enable-logging"],
  options: {
    env: { NODE_ENV: "development" }
  }
});

const configuration = {
  target: "electron",

  context: APP_DIRECTORY,

  entry: {
    app: [
      "react-hot-loader/patch",
      `webpack-dev-server/client?http://localhost:${PORT}`,
      `${APP_DIRECTORY}/index.js`
    ]
  },

  output: {
    path: BUILD_DIRECTORY,
    publicPath: BUILD_DIRECTORY,
    filename: "[name].bundle.js"
  },

  node: {
    __dirname: false,
    __filename: false
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: ["json-loader"]
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader?modules", "postcss-loader"]
      },
      {
        test: /\.styl$/,
        loader: ["style-loader", "css-loader", "stylus-loader"]
      },
      {
        test: /\.svg$/,
        loader: [
          "babel-loader",
          {
            loader: "react-svg-loader",
            query: {
              svgo: {
                plugins: [{ removeTitle: true }],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        loader: "file-loader?name=images/[hash].[ext]"
      }
    ]
  },

  plugins: [
    ElectronPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    HtmlWebpackPluginConfig
  ]
};

export default configuration;
