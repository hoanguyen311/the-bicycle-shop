'use strict';

const PATHS = require('../paths');
const path = require('path');

module.exports = function(gulp) {

    return function() {
        gulp.watch(path.join(PATHS.components, '**/*.scss'), [ 'styles' ]);
        gulp.watch(path.join(PATHS.components, '**/*.js'), [ 'scripts' ]);
        gulp.watch(path.join(PATHS.components, '**/*.twig'), [ 'views' ]);
        gulp.watch(path.join(PATHS.images, 'sprites/**/*.png'), [ 'sprites', 'styles' ]);
        gulp.watch([
            path.resolve(PATHS.src, 'fonts/**/*'),
            path.resolve(PATHS.src, 'images/**/*')
        ], [ 'copy' ]);
    };
};
