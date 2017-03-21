const queryString = require('querystring');
const _ = require('lodash');
var keystone = require('keystone');
var Category = keystone.list('Category');
var Product = keystone.list('Product');

const getSortData = (query) => {
    const list = [
        { url: { sort: 'name', dir: 'asc' }, label: 'Tên sản phâm' },
        { url: { sort: 'views', dir: 'desc' }, label: 'Lượt xem' },
        { url: { sort: 'price', dir: 'desc' }, label: 'Giá (từ cao đến thấp)' },
        { url: { sort: 'price', dir: 'asc' }, label: 'Giá (từ thấp đến cao' }
    ];

    const currentSort = _.find(list, (sortItem) => {
        const parsed = sortItem.url;

        return (parsed.sort === query.sort &&
            parsed.dir === query.dir);
    }) || list[0];

    const currentSortCriteria = {};

    currentSortCriteria[currentSort.url.sort] = currentSort.url.dir;

    return {
        list,
        currentSort,
        currentSortCriteria
    };
};

module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var mergeWithCurrentQuery = (newQuery) => {
        return queryString.stringify(Object.assign({}, req.query, newQuery));
    };

    locals.products = [];
    locals.filter = {
        category: req.params.category
    };

    locals.sortOptions = getSortData(req.query);

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

        q = Product.paginate({
            page: req.query.page || 1,
            perPage: 4
        }).populate('category');

        if (locals.filter.category) {
            q.where('category').in([ locals.category.id ]);
        }

        q.sort(locals.sortOptions.currentSortCriteria);

        q.exec(function(err, response) {

            locals.productsList = {
                products: response.results,
                pagination: {
                    pages: response.pages.map((page) => {
                        return {
                            url: mergeWithCurrentQuery({ page }),
                            label: page
                        };
                    }),
                    currentPage: response.currentPage,
                    previous: response.previous,
                    next: response.next
                }
            };
            next(err);
        });
    });

    locals.section = 'category';

    view.render('category');
};
