'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: [
      './src/styles.scss',
      './src/MAIN.js'
    ]
  },
  output: {
    path: __dirname + '/build',
    filename: 'travestize.js'
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'client'
    ]
  },
  module: {
    loaders: [
      // Extract css files
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  devtool: 'sourcemap'
};