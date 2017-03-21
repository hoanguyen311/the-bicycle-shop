'use strict';

const PATHS = require('../paths');
const path = require('path');
const rename = require('gulp-rename');
const changed = require('gulp-changed');

module.exports = function(gulp) {

    return function() {
        const DEST = path.resolve(PATHS.templates, 'components');

        return gulp.src([
            path.resolve(PATHS.components, '**/tpl.twig'),
            '!' + path.resolve(PATHS.components, 'base/*.twig')
        ])
        .pipe(changed(DEST, { transformPath: (newPath) => {
            const splitted = newPath.split('/');
            const newFileName = splitted[splitted.length - 2];

            return path.join(DEST, `${newFileName}.twig`);
        } }))
        .pipe(rename((filePath) => {
            filePath.basename = filePath.dirname;
            filePath.dirname = '.';
        }))
        .pipe(gulp.dest(DEST));
    };
};
