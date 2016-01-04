var path = require('path')
var webpack = require('webpack')
var LessPluginNpmImport = require('less-plugin-npm-import')

// Configure dotenv to pick-up the environment files from the project root.
require('dotenv').config({
  path: './.env.development'
})

module.exports = {
  entry: {
    js: [
      'webpack/hot/only-dev-server',
      './client/main.jsx'
    ],
    client: [
      'webpack-dev-server/client?http://localhost:8080'
    ],

    // Since react is installed as a node module, node_modules/react,
    // we can point to it directly, just like require('react');
    vendor: [
      //'redux',
      'lodash',
      'react',
      'react-router'
      // Add more dependencies to improve hot-reload times.
    ]
  },
  output: {
    path: path.resolve(__dirname, '/public/build/'),
    filename: 'js/bundle.js',
    publicPath: 'http://localhost:8080/public/build/'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: ['react-hot', 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-2'],
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      loader: 'style!css!autoprefixer!less'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js', Infinity),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.jsx', '.js', '.less']
  },
  lessLoader: {
    lessPlugins: [new LessPluginNpmImport()]
  },
  devtool: 'eval'
}
