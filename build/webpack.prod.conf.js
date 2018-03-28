const path = require('path');
const utils = require('./util');
const merge = require('webpack-merge');
const webpack = require('webpack')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const build = {
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: "initial"
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
        )
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