'use strict';

const ComponentBundle = require('../libs/component-bundle');
const PATHS = require('../paths');
const path = require('path');
const config = require('../configs/components');
const fs = require('fs');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const getWebpackConfig = require('../configs/webpack');
const babel = require('gulp-babel');
const rev = require('gulp-rev');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const generalConfig = require('../configs');

function generatePrependCodeFromList(list, page) {
    let prependCode = 'window.__components__ = {};\n';

    prependCode += list.map((item) => {
        try {
            fs.statSync(
                path.resolve(PATHS.components, `${item}/index.js`)
            );
            return `window.__components__['${item}'] = require('~/components/${item}').default;`;
        } catch (err) {
            if (err.code === 'ENOENT') {
                gutil.log(
                    '[components]',
                    gutil.colors.yellow(`please create js components "${item}" for ${page}`)
                );
            } else {
                gutil.log('[components]', 'Unknown error');
            }

            return '';
        }
    }).join('\n') + '\n';

    return prependCode;
}
const onWebpackBuildDone = (err, stats) => {
    if (err) {
        throw new gutil.PluginError('webpack',
            err);
    }
    gutil.log('[components]', stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true
    }));
};

module.exports = function(gulp) {

    class ScriptsBundle extends ComponentBundle {
        getTask(name, list) {
            const prependCode = generatePrependCodeFromList(list, name);
            const webpackConfig = getWebpackConfig({
                output: {
                    filename: `bundle-${name}.js`,
                    sourceMapFilename: `bundle-${name}.js.map`
                },
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify(generalConfig.env)
                        }
                    })
                ]
            });

            if (generalConfig.isProduction) {
                webpackConfig.plugins.push(
                    new webpack.optimize.UglifyJsPlugin({
                        mangle: true,
                        comments: false,
                        beautify: false,
                        compress: {
                            warnings: false
                        }
                    })
                );
                webpackConfig.devtool = false;
            }

            return gulp.src(path.resolve(PATHS.components, 'index.js'))
                .pipe(insert.append(prependCode))
                .pipe(rename(`-temp-${config.scriptEntryPrefixer}-${name}.js`))
                .pipe(babel({
                    presets: [ 'es2015', 'stage-0' ],
                    plugins: [
                        'transform-runtime'
                    ]
                }))
                .pipe(gulp.dest(path.resolve(PATHS.scripts, 'entries')))
                .pipe(webpackStream(webpackConfig, webpack, onWebpackBuildDone))
                .pipe(rev())
                .pipe(gulp.dest(PATHS.scripts))
                .pipe(rev.manifest(`rev-manifest-${name}.json`, {
                    merge: true
                }))
                .pipe(gulp.dest(PATHS.scripts));
        }
    }

    return function() {

        const bundle = new ScriptsBundle(Object.assign({}, {
            viewPath: PATHS.views
        }, config));

        return bundle.getStream();
    };
};
