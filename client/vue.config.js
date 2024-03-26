const { defineConfig } = require('@vue/cli-service')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',
  configureWebpack: {
    plugins:
      process.env.NODE_ENV === 'production' ? [new BundleAnalyzerPlugin()] : [],
  },
})
