import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpackCommonConfig, { getPostCssRule } from './common';
export const DEFAULT_PORT = 8080;


export default function() {
    return {
        ...webpackCommonConfig,
        entry: [
            ...webpackCommonConfig.entry,
            'webpack/hot/only-dev-server',
            `webpack-dev-server/client?http://localhost:${DEFAULT_PORT}`,
            './src/index'
        ],
        output: {
            ...webpackCommonConfig.output,
            path: path.resolve('./'),
            publicPath: '/',
            filename: 'cart-app.js'
        },
        devtool: 'cheap-inline-module-source-map',
        module: {
            ...webpackCommonConfig.module,
            rules: [
                ...webpackCommonConfig.module.rules,
                {
                    test: /\.js$/,
                    exclude: [
                        path.resolve('node_modules')
                    ],
                    use: [
                        'react-hot-loader',
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name]-[hash].[ext]'
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader?-minimize',
                        getPostCssRule()
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader?-minimize',
                        getPostCssRule(),
                        'less-loader'
                    ]
                }
            ]
        },
        devServer: {
            hot: true
        },
        plugins: [
            ...webpackCommonConfig.plugins,
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new HtmlWebpackPlugin({ template: 'src/assets/index.html' })
        ]
    };
}
