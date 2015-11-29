var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var gulp = require('gulp')
var config = require('./webpack.config')
// test entry file
var testIndex = './test/test.js'
// webpack-dev-sserve port
var port = 8080
// no conflict
var myConfig = Object.assign({}, config, {
  devtool: 'sourcemap',
  debug: true
})

gulp.task('default', ['webpack:test'])

gulp.task('webpack:test', function (callback) {
  var entry = [
    'stack-source-map/register.js',
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/dev-server',
    'mocha-notify!' + testIndex
  ]

  var config = Object.create(myConfig)
  config.entry = entry
  config.plugins = config.plugins || []
  // webpack need this to send request to webpack-dev-server
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  // Get line of error in mocha
  config.devtool = 'inline-source-map'
  // must have
  config.output.path = __dirname
  var compiler = webpack(config)
  config.module = myConfig.module
  var server = new WebpackDevServer(compiler, {
    publicPath: '/',
    inline: true,
    historyApiFallback: false,
    stats: { colors: true }
  })
  server.listen(port, 'localhost', callback)
})
