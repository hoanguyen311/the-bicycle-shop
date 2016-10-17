var keystone = require('keystone');
var Category = keystone.list('Category');

module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'category';
    locals.subSection = `category-${req.params.category}`;

    view.on('init', function(next) {
        Category.model.findOne({
            slug: req.params.category
        }).exec((err, result) => {
            locals.categoryName = result.name;
            locals.image = result._.image.pad(350, 350, { background: '#FFF' });
            next(err);
        });
    });

    view.render('category');
};
