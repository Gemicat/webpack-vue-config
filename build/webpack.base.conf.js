const path = require('path');
const utils = require('./util');
const vueLoaderConfig = require('./vue-loader.conf')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': utils.resolve('src'),
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 100,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [utils.resolve('src'), utils.resolve('node_modules/webpack-dev-server/client')]
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('media/[name].[hash:7].[ext]')
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    }
}