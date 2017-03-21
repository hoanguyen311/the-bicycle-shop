const keystone = require('keystone');
const Types = keystone.Field.Types;


var Tag = new keystone.List('Tag', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-name'
});

Tag.add({
    name: { type: String, required: true }
});

Tag.register();
