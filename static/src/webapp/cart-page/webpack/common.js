import path from 'path';
import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import autoprefixer from 'autoprefixer';

export function getPostCssRule() {
    return {
        loader: 'postcss-loader',
        options: {
            plugins() {
                return [
                    autoprefixer({
                        browsers: [
                            'last 2 Chrome versions',
                            'last 2 Firefox versions',
                            'last 2 Edge versions'
                        ]
                    })
                ];
            }
        }
    };
}

export default {
    cache: true,
    stats: {
        colors: true,
        reasons: false
    },
    entry: [ 'babel-polyfill' ],
    output: {
        pathinfo: true
    },
    resolve: {
        alias: {
            '~': path.resolve('src/')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'rebem-layers-loader',
                    options: {
                        layers: [
                            {
                                path: path.resolve('src/components/'),
                                files: {
                                    main: 'index.js',
                                    styles: 'styles.less'
                                }
                            },
                            {
                                path: path.resolve('src/containers/'),
                                files: {
                                    main: 'index.js'
                                },
                                importFactory: false
                            }
                        ],
                        importFactory: true,
                        consumers: [
                            path.resolve('src/')
                        ]
                    }
                },
                enforce: 'post'
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, [ /moment$/ ]),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};
