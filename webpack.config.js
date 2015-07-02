module.exports = {
  entry: './client/MAIN.js',
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
      // Preprocessors / Loaders
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader?sourceMap' },
    ]
  }
};