const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  entry: {
    app: "./public/js/idb.js",
    events: "./public/js/index.js",
  },
  output: {
    path: path.join(__dirname + "/public/dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              //   publicPath(url) {
              //     return url.replace("../", "/assets/");
              //   },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
    }),
    new WebpackPwaManifest({
      name: "Budget Tracker",
      short_name: "B-Tracker",
      description: "An app that allows you to track you transactions.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve("public/icons/icon-512x512.png"),
          sizes: [72, 96, 128, 144, 152, 192, 384, 512],
          destination: "icons",
        },
      ],
    }),
  ],
  mode: "development",
};

module.exports = config;
