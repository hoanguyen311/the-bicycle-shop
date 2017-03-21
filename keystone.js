// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var Twig = require('twig');
var fs = require('fs');
var path = require('path');
const numeral = require('numeral');


numeral.register('locale', 'vi', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: ' nghìn',
        million: ' triệu',
        billion: ' tỷ',
        trillion: ' nghìn tỷ'
    },
    ordinal: function (number) {
        return '.';
    },
    currency: {
        symbol: '₫'
    }
});

numeral.locale('vi');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
    'name': 'The Bicycle Shop',
    'brand': 'Long Map',

    //'sass': 'public',
    'static': 'static/public',
    'favicon': 'public/favicon.ico',
    'views': 'templates/views',
    'view engine': 'twig',

    'twig options': { method: 'fs' },
    'custom engine': Twig.render,

    'emails': 'templates/emails',

    'auto update': true,
    'session': true,
    'auth': true,
    'user model': 'Y'
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
    _: require('lodash'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable,
    getJsStatic: function(viewName) {
        var manifestFilePath = `./static/public/js/rev-manifest-${viewName}.json`;
        var mapping = null;

        try {
            mapping = fs.readFileSync(manifestFilePath);
            mapping = JSON.parse(mapping);

            if (mapping[`bundle-${viewName}.js`]) {
                return path.join('/js/', mapping[`bundle-${viewName}.js`]);
            }
        } catch (e) {
            return path.join('/js/', `bundle-${viewName}.js`);
        }
    },
    getCssStatic: function(viewName) {
        var manifestFilePath = `./static/public/styles/rev-manifest-${viewName}.json`;
        var mapping = null;

        try {
            mapping = fs.readFileSync(manifestFilePath);
            mapping = JSON.parse(mapping);

            if (mapping[`bundle-${viewName}.css`]) {
                return path.join('/styles/', mapping[`bundle-${viewName}.css`]);
            }
        } catch (e) {
            return path.join('/styles/', `bundle-${viewName}.css`);
        }
    },
    t: function(text) {
        return text;
    },
    formatMoney: function(value) {
        return numeral(value).format('0,0 $');
    },
    calculatePercentage: function(a, b) {
        const price1 = numeral(a).value();
        const price2 = numeral(b).value();

        return numeral(1 - price1 / price2).format('0%');
    }
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.
keystone.set('email locals', {
    logo_src: '/images/logo-email.gif',
    logo_width: 194,
    logo_height: 76,
    theme: {
        email_bg: '#f9f9f9',
        link_color: '#2697de',
        buttons: {
            color: '#fff',
            background_color: '#2697de',
            border_color: '#1a7cb7'
        }
    }
});

// Load your project's email test routes
keystone.set('email tests', require('./routes/emails'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
    posts: [ 'posts', 'post-categories' ],
    enquiries: 'enquiries',
    categories: 'categories',
    ys: 'ys'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
