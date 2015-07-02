'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: [
      './client/MAIN.js',
      './client/styles.scss'
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
  ]
};