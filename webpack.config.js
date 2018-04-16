const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.pug/,
        use: 'pug-loader'
      },
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          "css-loader",
          "stylus-loader"
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: "file-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  // context: path.join(__dirname, 'dist'),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    overlay: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Change there title of your project (title in browser tab caption)
      title: 'Application',
      hash: true,
      // Change there name of main |pug| file
      template: './src/index.pug'
    }),
    new CopyWebpackPlugin([
      { from: './src/static', }
    ])
  ]
};


module.exports = (env, options) => {
  config.devtool = options.mode === 'production' ? false : 'eval-sourcemap';
  return config;
};