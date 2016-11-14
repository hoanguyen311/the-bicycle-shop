'use strict';

const PATHS = require('../paths');
const path = require('path');

module.exports = function(gulp) {

    return function() {
        gulp.watch('**/*.scss', { cwd: PATHS.components }, [ 'styles' ]);
        gulp.watch('**/*.png', { cwd: PATHS.components }, [ 'styles' ]);
        gulp.watch('**/*.js', { cwd: PATHS.src }, [ 'scripts' ]);
        gulp.watch('**/*.twig', { cwd: PATHS.components }, [ 'views' ]);
        gulp.watch([
            'fonts/**/*',
            'images/**/*'
        ], { cwd: PATHS.src }, [ 'copy' ]);
    };
};
