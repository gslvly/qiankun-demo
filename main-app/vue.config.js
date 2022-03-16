/* eslint-disable */
const buildConfig = require('./build.config.js')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/'
  : '/',
  devServer: {
    disableHostCheck: true,
    port:8080,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  chainWebpack:config => {

    // 将字体与图片都打包成base64 （qiankun中会将外联改为内联写法）
    config.module.rule('fonts').use('url-loader').loader('url-loader').options({}).end();
    config.module.rule('images').use('url-loader').loader('url-loader').options({}).end();

    config.plugin('define').tap((definitions) => {
      const origin = definitions[0]
      const env = origin['process.env'].NODE_ENV === '"development"' ? buildConfig.dev :buildConfig.prod
      for(let key in env) {
        origin['process.env'][key] = JSON.stringify(env[key])
      }
      return definitions
    })
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/scss/variables.scss";`
      },
      // 给 less-loader 传递 Less.js 相关选项
      less:{
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff'
        }
      }
    }
  }
}
