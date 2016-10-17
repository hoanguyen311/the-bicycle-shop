'use strict';


const path = require('path');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const insert = require('gulp-insert');
const gutil = require('gulp-util');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const revHash = require('rev-hash');
const revPath = require('rev-path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sprites = require('postcss-sprites');
const ComponentBundle = require('../libs/component-bundle');
const PATHS = require('../paths');
const config = require('../configs/components');
const generalConfig = require('../configs');
const onUpdateRule = require('../libs/update-sprite-rule');

function generatePrependCode(list, page) {
    return list.map((item) => {
        try {
            return `@import "${item}/styles";`;
        } catch (err) {
            if (err.code === 'ENOENT') {
                gutil.log(
                    '[components]',
                    gutil.colors.red(`please create styles for "${item}" for ${page}`)
                );
            } else {
                gutil.log('[components]', 'Unknown error');
            }

            return '';
        }
    }).join('\n') + '\n';
}

module.exports = function(gulp) {
    class StylesBundle extends ComponentBundle {
        getTask(name, list) {

            const postcssPlugins = [
                autoprefixer({
                    browsers: [ 'last 2 versions', 'ie >= 8' ]
                }),
                sprites({
                    stylesheetPath: path.relative(PATHS.root, PATHS.styles),
                    spritePath: path.relative(PATHS.root, PATHS.images),
                    basePath: PATHS.components,
                    spritesmith: {
                        padding: 2
                    },
                    hooks: {
                        onUpdateRule: onUpdateRule,
                        onSaveSpritesheet: function(opts, spritesheet) {
                            const hash = revHash(spritesheet.image);

                            return revPath(path.join(
                                opts.spritePath,
                                `sprite-${name}.${spritesheet.extension}`
                            ), hash);
                        }
                    }
                })
            ];

            if (generalConfig.isProduction) {
                postcssPlugins.push(cssnano({ safe: true }));
            }

            return gulp.src(path.resolve(PATHS.components, 'styles.scss'))
                .pipe(insert.append(generatePrependCode(list, name)))
                .pipe(generalConfig.isProduction ? gutil.noop() : sourcemaps.init())
                .pipe(rename(`bundle-${name}.scss`))
                .pipe(sass({
                    includePaths: [
                        path.resolve(PATHS.components),
                        path.resolve(PATHS.root, 'node_modules')
                    ]
                }).on('error', sass.logError))
                .pipe(postcss(postcssPlugins))
                .pipe(generalConfig.isProduction ? gutil.noop() : sourcemaps.write())
                .pipe(rev())
                .pipe(gulp.dest(path.resolve(PATHS.styles)))
                .pipe(rev.manifest(`rev-manifest-${name}.json`, {
                    merge: true
                }))
                .pipe(gulp.dest(PATHS.styles));
        }
    }

    return function() {

        const bundle = new StylesBundle(Object.assign({}, {
            viewPath: PATHS.views
        }, config));

        return bundle.getStream('styles');
    };
};
