'use strict';

const libs = require('postcss-sprites/lib/core');
const path = require('path');

const publicCssPath = path.resolve('/', 'styles');

module.exports = function(rule, token, image) {
    libs.updateRule(...arguments);


    rule.walkDecls('background-image', (decl) => {
        const url = libs.getImageUrl(decl.toString());
        decl.value = `url(${path.resolve(publicCssPath, url)})`;
    });

    [ 'width', 'height' ].forEach((prop) => {
        rule.insertAfter(rule.last, `${prop} : ${image.coords[prop]}px;`);
    });
};
