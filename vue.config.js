// vue.config.js
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        style: path.join(__dirname, 'src/assets/')
      }
    }
  }
}
