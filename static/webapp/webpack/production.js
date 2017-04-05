import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import webpackCommonConfig, { babelConfig } from './common';

export const statOptions = {
    chunkModules: true
};

export default {
    ...webpackCommonConfig,
    output: {
        ...webpackCommonConfig.output,
        path: path.join(process.cwd(), '../public/webapp'),
        filename: '[name]-[chunkhash].js'
    },
    entry: {
        cart: [ ...webpackCommonConfig.entry, './src/cart' ],
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
                    loader: 'babel-loader',
                    options: babelConfig
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
                    use: [ 'css-loader?minimize', 'postcss-loader' ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [ 'css-loader?minimize', 'postcss-loader', {
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name]-[chunkhash].js'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new ExtractTextPlugin('[name]-[chunkhash].css'),
        new ManifestPlugin({ fileName: 'rev-manifest.json' }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            output: {
                comments: false
            }
        })
    ]
};
