'use strict';

const PATHS = require('../paths');
const path = require('path');
const merge = require('merge2');

module.exports = function(gulp) {

    return function() {

        const fonts = gulp.src([
            path.join(PATHS.src, 'fonts/**/*')
        ])
        .pipe(gulp.dest(path.join(PATHS.public, 'fonts')));

        const images = gulp.src([
            path.join(PATHS.src, 'images/**/*')
        ])
        .pipe(gulp.dest(path.join(PATHS.public, 'images')));

        return merge(fonts, images);
    };
};
