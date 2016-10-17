'use strict';

var gulp = require('gulp');
var run = require('run-sequence');

function getTask(taskName, config) {
    return require('./gulp/tasks/' + taskName)(gulp, config);
}

//gulp.task('sprites', getTask('sprites'));
gulp.task('clean', getTask('clean'));
gulp.task('copy', getTask('copy'));
gulp.task('scripts', getTask('scripts'));
gulp.task('views', getTask('views'));
gulp.task('styles', getTask('styles'));
gulp.task('runKeystone', getTask('runKeystone'));
gulp.task('watch', getTask('watch'));

gulp.task('components', function(done) {
    run('views', [ 'styles', 'scripts' ], done);
});

gulp.task('build', function(done) {
    return run('clean', [ 'components', 'copy' ], done);
});

gulp.task('default', function() {
    run('build', [ 'watch', 'runKeystone' ]);
});
