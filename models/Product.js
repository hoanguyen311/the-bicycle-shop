const keystone = require('keystone');
const Types = keystone.Field.Types;


var Product = new keystone.List('Product', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-name'
});

Product.add({
    name: { type: String, required: true },
    category: { type: Types.Relationship, ref: 'Category' },
    image: { type: Types.CloudinaryImage },
    price: { type: Types.Money, currency: 'en-gb' },
    oldPrice: { type: Types.Money, currency: 'en-gb' },
    description: { type: Types.Html, wysiwyg: true },
    createdAt: { type: Types.Datetime, default: Date.now },
    sales: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
});

Product.register();
