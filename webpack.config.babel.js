/* eslint-env node */
import webpack from "webpack";
import { resolve, join } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

/// Constants ///
const PORT = 7111;
const HOST = "localhost";
const build_directory = "build";
const source_directory = "source";
const env = process.env.NODE_ENV;
const isProduction = env === "production";
const sourceMapType = isProduction ? "cheap-module-source-map" : "eval-source-map";

// This plugin allows for base-page template
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${resolve(__dirname, source_directory)}/index.ejs`,
  env: env,
  filename: "index.html",
  inject: "false",
  port: PORT
});

const developmentPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  HtmlWebpackPluginConfig
];

const productionPlugins = [
  HtmlWebpackPluginConfig,
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true
    },
    compress: {
      screw_ie8: true
    },
    comments: false
  })
];

const configuration = {

  context: join(__dirname, source_directory),

  devtool: sourceMapType,

  devServer: {
    hot: true,
    inline: true,
    host: HOST,
    port: PORT,
    contentBase: "/build",
    publicPath: "/"
  },

  entry: [
    "react-hot-loader/patch",
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    "webpack/hot/only-dev-server",
    "./index.js"
  ],

  output: {
    path: resolve(__dirname, `${build_directory}`),
    filename: "bundle.js",
    sourceMapFilename: "bundle.js.map",
    publicPath: "/"
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
        test: /\.(png|jpe?g|gif)$/,
        exclude: /node_modules/,
        loader: [
          "file-loader?name=images/[hash].[ext]",
          {
            loader: "img-loader",
            options: {
              enabled: isProduction,
              gifsicle: {
                interlaced: false
              },
              mozjpeg: {
                progressive: true,
                arithmetic: false
              },
              optipng: isProduction,
              pngquant: {
                floyd: 0.5,
                speed: 2
              }
            }
          }
        ]
      },
      {
        test: /\.ico$/,
        exclude: /node_modules/,
        loader: "file-loader?name=favicon.ico"
      },
      {
        test: /CNAME$/,
        exclude: /node_modules/,
        loader: "file-loader?name=CNAME"
      },
      {
        test: /\.worker\.js$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "worker-loader"]
      }
    ]
  },

  plugins: isProduction ? productionPlugins : developmentPlugins
};

export default configuration;
