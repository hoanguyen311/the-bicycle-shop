import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpackCommonConfig, { babelConfig } from './common';
export const DEFAULT_PORT = 8080;


export default function() {

    return {
        ...webpackCommonConfig,
        entry: [
            ...webpackCommonConfig.entry,
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${DEFAULT_PORT}`,
            'webpack/hot/only-dev-server',
            './src/cart'
        ],
        output: {
            ...webpackCommonConfig.output,
            path: path.resolve('./'),
            publicPath: '/',
            filename: '[name].js'
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
                        {
                            loader: 'babel-loader',
                            options: babelConfig
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
                        'css-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'less-loader'
                    ]
                }
            ]
        },
        plugins: [
            ...webpackCommonConfig.plugins,
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                },
                API_HOST: JSON.stringify('http://0.0.0.0:3000')
            }),
            new HtmlWebpackPlugin({ template: 'src/assets/index.html' })
        ]
    };
}
