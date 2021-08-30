const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  devtool: "source-map",

  devServer: {
    hot: true,
  },

  entry: "./src/main.ts",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: [".ts", "tsx", ".js", ".vue"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, "/public/favicon.ico"),
      template: path.join(__dirname, "/public/index.html"),
      filename: "index.html",
      inject: true,
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      VERSION: 1,
      APP_NAME:
        process.env.NODE_ENV === JSON.stringify("production")
          ? JSON.stringify("VUE_WEBPACK_PROD")
          : JSON.stringify("VUE_WEBPACK_DEV"),
    }),
  ],
};
