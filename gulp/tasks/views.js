'use strict';

const PATHS = require('../paths');
const path = require('path');
const rename = require('gulp-rename');

module.exports = function(gulp) {

    return function() {

        return gulp.src([
            path.resolve(PATHS.components, '**/tpl.twig'),
            '!' + path.resolve(PATHS.components, 'base/*.twig')
        ])
        .pipe(rename((filePath) => {
            filePath.basename = filePath.dirname;
            filePath.dirname = '.';
        }))
        .pipe(gulp.dest(path.resolve(PATHS.templates, 'components')));
    };
};
