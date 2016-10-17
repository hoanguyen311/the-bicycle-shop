'use strict';

const del = require('del');
const config = require('../configs/clean');
const gutil = require('gulp-util');

module.exports = function(gulp) {
    return function() {
        return del(config.paths)
            .then((paths) => {
                gutil.log(
                    '[clean]',
                    gutil.colors.cyan('Deleted files and folders: \n'),
                    gutil.colors.cyan(paths.join('\n'))
                );
            });
    };
};
