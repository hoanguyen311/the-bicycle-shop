/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var Category = require('keystone').list('Category');

function getCategoryMenuData(callback, next) {
    var q = Category.model.find();

    q.exec(function(err, results) {
        var children = [];

        if (!err && results) {
            children = results.map((categoryItem) => ({
                label: categoryItem.name,
                key: `category-${categoryItem.slug}`,
                href: `/category/${categoryItem.slug}`
            }));
        }
        return callback(err, children);
    });
}

/**
    Initialises the standard view locals

    The included layout depends on the navLinks array to generate
    the navigation in the header, you may wish to change this array
    or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
    res.locals.navLinks = [
        { label: 'Home', key: 'home', href: '/' },
        { label: 'Blog', key: 'blog', href: '/blog' },
        { label: 'Contact', key: 'contact', href: '/contact' }
    ];
    res.locals.user = req.user;

    getCategoryMenuData(function(err, children) {
        res.locals.navLinks.push({
            label: 'Category',
            key: 'category',
            href: false,
            children: children
        });

        next(err);
    });

};


/**
    Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };
    res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
    next();
};


/**
    Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
    if (!req.user) {
        req.flash('error', 'Please sign in to access this page.');
        res.redirect('/keystone/signin');
    } else {
        next();
    }
};