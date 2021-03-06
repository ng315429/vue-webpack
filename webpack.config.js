const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
console.log(mode);

module.exports = {
  devtool: "source-map",

  devServer: {
    hot: true,
  },

  entry: "./src/main.ts",

  output: {
    filename:
      process.env.NODE_ENV === "production"
        ? "js/[name].[chunkhash].js"
        : "js/[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
  },

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
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "vue-style-loader",
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
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new VueLoaderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      VERSION: 1,
      APP_NAME:
        process.env.NODE_ENV === "production"
          ? JSON.stringify("VUE_WEBPACK_PROD")
          : JSON.stringify("VUE_WEBPACK_DEV"),
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: `css/[name].[hash].css` })]
      : []),
  ],

  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "verders",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer:
      mode === "production"
        ? [
            new TerserWebpackPlugin({
              cache: true,
            }),
            new OptimizeCssAssetsPlugin(),
          ]
        : [],
  },
};
