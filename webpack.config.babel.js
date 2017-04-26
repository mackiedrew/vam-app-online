/* eslint-env node */
import webpack from "webpack";
import { resolve, join } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import ServiceWorkerWebpackPlugin from "serviceworker-webpack-plugin";

/// Constants ///
const PORT = 7117;
const HOST = "localhost";
const build_directory = "build";
const source_directory = "source";
const env = process.env.NODE_ENV;
const isProduction = env == "production";
const sourceMapType = isProduction ? "" : "eval-source-map";

// This plugin allows for base-page template
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${resolve(__dirname, source_directory)}/index.ejs`,
  env: env,
  filename: "index.html",
  inject: true,
  port: PORT
});

const FaviconsWebpackPluginConfig = new FaviconsWebpackPlugin({
  // Your source logo
  logo: "./images/logo.png",
  // The prefix for all image files (might be a folder or a name)
  prefix: "./",
  // Emit all stats of the generated icons
  emitStats: true,
  // The name of the json containing all favicon information
  statsFilename: "iconstats.json",
  // Generate a cache file with control hashes and
  // don"t rebuild the favicons until those hashes change
  persistentCache: true,
  // Inject the html into the html-webpack-plugin
  inject: true,
  // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
  background: "#FFFFFF",
  // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
  title: "VAM",
  theme_color: "#FFC107",

  // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: true,
    favicons: true,
    firefox: true,
    opengraph: true,
    twitter: true,
    yandex: true,
    windows: true
  }
});

const ServiceWorkerWebpackPluginConfig = new ServiceWorkerWebpackPlugin({
  entry: join(__dirname, "source/workers/service.worker.js"),
  filename: "service.worker.js",
  publicPath: ""
});

const developmentPlugins = [
  FaviconsWebpackPluginConfig,
  ServiceWorkerWebpackPluginConfig,
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  HtmlWebpackPluginConfig
];

const productionPlugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }),
  ServiceWorkerWebpackPluginConfig,
  FaviconsWebpackPluginConfig,
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
    comments: false,
    exclude: [/\.worker\.js$/, /\.map\.js$/]
  })
];

const productionEntry = [
  "react-hot-loader/patch",
  `webpack-dev-server/client?http://${HOST}:${PORT}`,
  "webpack/hot/only-dev-server",
  "./index.js"
];

const entry = isProduction ? "./index.js" : productionEntry;

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

  entry: entry,

  output: {
    path: resolve(__dirname, `${build_directory}`),
    filename: "bundle.js",
    sourceMapFilename: "bundle.js.map"
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
        loader: ["worker-loader"]
      }
    ]
  },

  plugins: isProduction ? productionPlugins : developmentPlugins
};

export default configuration;
