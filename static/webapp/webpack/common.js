import path from 'path';
import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

export const babelConfig = {
    presets: [ [ 'env', { modules: false } ], 'react' ],
    plugins: [ 'babel-plugin-transform-object-rest-spread', 'transform-class-properties' ]
};

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
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: () => [
                    require('autoprefixer')({
                        browsers: [
                            'last 2 versions',
                            'IE 10'
                        ]
                    })
                ]
            }
        })
    ]
};
