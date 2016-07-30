var ExtractTextPlugin = require('extract-text-webpack-plugin')

var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname, 'dist')
var APP_DIR = path.resolve(__dirname, 'src')

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react': 'react-lite',
      'react-dom': 'react-lite'
    },
    modulesDirectories: ['node_modules', 'src/components']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need
        // something more custom, pass a path to it.
        // I.e., babel?cacheDirectory=<path>
        loaders: ['babel?cacheDirectory'],
        // Parse only app files
        include: APP_DIR
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url',
          'sass?sourceMap'
        ]
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  },

  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env':{
        'CLIENT_ID': JSON.stringify(process.env.SOUNDCLOUD_CLIENT_ID),
        'API_URL': JSON.stringify('https://api.soundcloud.com')
      }
    })
  ]

}

module.exports = config
