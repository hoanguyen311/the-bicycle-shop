'use strict';

const keystone = require('keystone');
const types = keystone.Field.Types;

const Category = new keystone.List('Category', {
    defaultSort: '+name',
    autokey: { path: 'slug', from: 'name', unique: true }
});

Category.add({
    name: { type: types.Text },
    image: { type: types.CloudinaryImage },
    createdAt: { type: types.Datetime, default: Date.now }
});

Category.register();
