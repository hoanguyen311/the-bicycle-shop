var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'product';

    view.on('init', function(next) {
        if (req.params.product) {
            keystone.list('Product').model.findOne({
                slug: req.params.product
            }).exec(function(err, result) {
                if (err) {
                    throw err;
                }
                locals.product = result;
                next();
            });
        } else {
            next();
        }
    });

	// Render the view
    view.render('product');
};
