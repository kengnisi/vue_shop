module.exports = {
  // 打包时不产生js文件中的map文件
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        // 'common': '@/common',
        'network': '@/network',
        'views': '@/views',
        'components': '@/components',
        'store': '@/store',
      }
    }
  },
  // 代理跨域问题
  devServer: {
    proxy: {
      "/api": {
        target: "http://39.98.123.211"
      }
    }
  }
}