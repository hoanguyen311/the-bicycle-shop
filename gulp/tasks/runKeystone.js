'use strict';

const PATHS = require('../paths');
const nodemon = require('gulp-nodemon');

module.exports = function(gulp) {

    return function() {
        nodemon({
            script: 'keystone.js',
            ignore: PATHS.components,
            ext: [ 'js', 'twig' ].join(' '),
            watch: [ PATHS.templates ]
        });
    };
};
