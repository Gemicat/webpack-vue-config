const path = require('path');
const utils = require('./util');
const merge = require('webpack-merge');
const webpack = require('webpack')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const build = {
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            usePostCSS: false
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                 },
                 vendor: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: "initial",
                    priority: 10,
                    enforce: true,
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: true,
            minify: {
                removeComments: true, //去掉注释
                collapseWhitespace: true, //去掉空格
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        // 每次打包将输出目录清空
        new CleanWebpackPlugin(
            ['dist/*'],
            {
                root: path.join(__dirname, '..'),
                verbose: true,
                dry: false
            }
        ),
        // css 拆分
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
    ]
}

// 配置 gzip
if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    build.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

// 生成依赖关系图
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    build.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseWebpackConfig, build);