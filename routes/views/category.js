const queryString = require('querystring');
const _ = require('lodash');
var keystone = require('keystone');
var Category = keystone.list('Category');
var Product = keystone.list('Product');
const helpers = require('../../helpers');

const _sortOptions = {
    name: 'name',
    views: 'views',
    price: 'price'
};

const _dirs = {
    asc: 'asc',
    desc: 'desc'
};

const getSortOptionsData = (query) => {
    const list = [
        { url: 'sort=name&dir=asc', label: 'Tên sản phâm' },
        { url: 'sort=views&dir=desc', label: 'Lượt xem' },
        { url: 'sort=price&dir=desc', label: 'Giá (từ cao đến thấp)' },
        { url: 'sort=price&dir=asc', label: 'Giá (từ thấp đến cao' }
    ];

    const currentSort = _.find(list, (sortItem) => {
        const parsed = queryString.parse(sortItem.url);

        return (parsed.sort === query.sort &&
            parsed.dir === query.dir);
    });

    return {
        list: list,
        currentSort: currentSort || list[0]
    };
};

module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var sortAttribute = _sortOptions[req.query.sort] || 'name';
    var direction = _dirs[req.query.dir] || 'asc';

    locals.products = [];
    locals.filter = {
        category: req.params.category
    };

    locals.sort = {};
    locals.sort[sortAttribute] = direction;

    locals.sortOptions = getSortOptionsData(req.query);

    locals.breadcrumb.push({
        url: '/category',
        label: 'Danh mục sản phẩm'
    });

    view.on('init', function(next) {
        if (locals.filter.category) {
            Category.model.findOne({ slug: locals.filter.category })
            .exec(function(err, result) {
                locals.category = result;

                locals.breadcrumb.push({
                    label: result.name
                });

                next(err);
            });
        } else {
            next();
        }
    });

    view.on('init', function(next) {
        var q = null;

        q = Product.model.find().populate('category');

        if (locals.filter.category) {
            q.where('category').in([ locals.category.id ]);
        }

        q.sort(locals.sort);

        q.exec(function(err, results) {
            locals.productsList = {
                products: results
            };
            next(err);
        });
    });

    locals.section = 'category';

    view.render('category');
};
