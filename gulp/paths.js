'use strict';

const path = require('path');
const root = path.resolve(__dirname, '..');
const staticDir = path.join(root, 'static');
const pub = path.resolve(staticDir, 'public');

module.exports = {
    root: root,
    public: pub,
    src: path.resolve(staticDir, 'src'),
    components: path.resolve(staticDir, 'src/components'),
    scripts: path.resolve(pub, 'js'),
    styles: path.resolve(pub, 'styles'),
    images: path.resolve(pub, 'images'),
    spritesTemplates: path.resolve(root, 'gulp/templates'),
    templates: path.resolve(root, 'templates'),
    views: path.resolve(root, 'templates/views'),
    backends: [ path.resolve(root, 'models'), path.resolve(root, 'routes') ]
};
