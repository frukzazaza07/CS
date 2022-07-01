var path = require('path')
module.exports = {
  extensions: ['', '.js', '.vue', '.json', 'css'],
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src')
      }
    },
  }
}