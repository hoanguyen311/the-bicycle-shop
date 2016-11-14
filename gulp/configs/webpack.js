'use strict';

const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const PATHS = require('../paths');

module.exports = function(options) {

    return {
        resolve: {
            alias: {
                '~': PATHS.src
            }
        },
        devtool: 'source-map',
        stats: {
            colors: true,
            reasons: true
        },
        output: Object.assign({
            pathinfo: true,
            path: path.resolve(PATHS.scripts),
            filename: 'bundle-[name].js'
        }, options.output),
        module: {
            preLoaders: [ {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [ 'es2015', 'stage-0' ],
                    plugins: [
                        'transform-runtime'
                    ]
                }
            } ]
        },
        plugins: [
            new ProgressBarPlugin()
        ].concat(options.plugins ? options.plugins : [])
    };
};
