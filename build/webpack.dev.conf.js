const path = require('path');
const utils = require('./util');
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const HOST = process.env.HOST || config.dev.host
const PORT = (process.env.PORT && Number(process.env.PORT)) || config.dev.port;

const dev = {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCSS: false
        })
    },
    devtool: config.dev.devtool,
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        publicPath: config.dev.assetsPublicPath,
        quiet: true,
        compress: true,
        host: HOST,
        port: PORT,
        open: config.dev.autoOpenBrowser,
        contentBase: [utils.resolve("dist"), utils.resolve("mock")],
        historyApiFallback: true,
        proxy: config.dev.proxyTable,
        watchOptions: {
            poll: config.dev.poll,
        },
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        disableHostCheck: true,
        host: '0.0.0.0'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${HOST}:${PORT}`],
            }
        })
    ]
}

module.exports = merge(baseWebpackConfig, dev);

