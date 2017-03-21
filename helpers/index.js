const Twig = require('twig');

exports.renderComponent = function (name, data) {
    return new Promise((resolve, reject) => {
        Twig.renderFile(`${process.cwd()}/templates/components/${name}.twig`, data, function(err, html) {
            if (err) {
                throw err;
            }
            resolve(html);
        });
    });
};
