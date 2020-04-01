const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  target: 'web', // 'node' or 'web'
  entry: './script.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: './script.js'
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
               {
                 loader: MiniCssExtractPlugin.loader
               },
               {
                 loader: "css-loader",
               },
               {
                 loader: "postcss-loader"
               },
               {
                 loader: "sass-loader",
                 options: {
                   implementation: require("sass")
                 }
               }
             ]
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets/img/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                processive: true,
                quality: 98
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './assets/fonts/',
          }
        }]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebPackPlugin({
      inject: true,
      hash: true,
      template: './index.html',
      filename: './index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: "./assets/favicon/",
        to: "./assets/favicon/",
      },
    ])
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    stats: 'errors-only',
    clientLogLevel: 'none'
  }
}

module.exports = config;
