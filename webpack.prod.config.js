var path = require('path')
var webpack = require('webpack')
var LessPluginNpmImport = require('less-plugin-npm-import')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// Configure dotenv to pick-up the environment files from the project root.
require('dotenv').config({
  path: __dirname + '/.env.' + (process.env.NODE_ENV || 'production')
})

module.exports = {
  entry: {
    js: [
      './client/main.jsx'
    ]
  },
  output: {
    path: path.resolve(__dirname, './public/build/'),
    filename: 'js/bundle.[hash].js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: ['babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-2'],
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
    }]
  },
  // All env variables that the client will need must be defined explicitly here
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ExtractTextPlugin('css/bundle.[hash].css'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.jsx', '.js', '.less']
  },
  lessLoader: {
    lessPlugins: [new LessPluginNpmImport()]
  }
}
