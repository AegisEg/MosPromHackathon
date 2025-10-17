const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env, argv) => {
  return {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: ['file-loader'],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                typescript: true,
                ref: true,
              },
            },
            'file-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          use: ['file-loader'],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotenv.config().parsed),
      }),
    ],
    devServer: {
      hot: true,
      port: 3000,
      open: true,
      historyApiFallback: true,
    },
  };
}