import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import webpackCommonConfig, { getPostCssRule } from './common';

const ROOT = path.resolve(__dirname);

export const statOptions = {
    chunkModules: true
};

export default {
    ...webpackCommonConfig,
    output: {
        ...webpackCommonConfig.output,
        path: path.join(ROOT, '../../../../public/cart-app'),
        filename: '[name]-[chunkhash].js'
    },
    entry: {
        main: [ ...webpackCommonConfig.entry, './src/index' ],
        vendor: [
            'react',
            'react-dom',
            'rebem',
            'superagent'
        ]
    },
    module: {
        ...webpackCommonConfig.module,
        rules: [
            ...webpackCommonConfig.module.rules,
            {
                test: /\.js$/,
                exclude: [
                    path.resolve('node_modules/')
                ],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                        name: 'images/[name]-[hash].[ext]'
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [ 'css-loader?-minimize&sourceMap', getPostCssRule() ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [ 'css-loader?-minimize&sourceMap', getPostCssRule(), {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    } ]
                })
            }
        ]
    },
    plugins: [
        ...webpackCommonConfig.plugins,
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: '[name]-[chunkhash].js' }),
        new ExtractTextPlugin('[name]-[chunkhash].css'),
        new ManifestPlugin({ fileName: 'rev-manifest.json' }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compresssor: {
                warnings: false
            }
        })
    ]
};
