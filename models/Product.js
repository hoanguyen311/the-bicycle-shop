const keystone = require('keystone');
const Types = keystone.Field.Types;


var Product = new keystone.List('Product', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-name',
    label: 'Sản phẩm',
    plural: 'Sản phẩm'
});

Product.add({
    name: { type: String, required: true, label: 'Tên' },
    category: { type: Types.Relationship, ref: 'Category', label: 'Loại sản phẩm' },
    tags: { type: Types.Relationship, ref: 'Tag', many: true, createInline: true },
    image: { type: Types.CloudinaryImage },
    price: { type: Types.Money, currency: 'en-gb', label: 'Giá tiền (VND)' },
    oldPrice: { type: Types.Money, currency: 'en-gb', label: 'Giá cũ (VND)' },
    description: { type: Types.Html, wysiwyg: true, label: 'Mô tả' },
    createdAt: { type: Types.Datetime, default: Date.now },
    sales: { type: Number, default: 0, label: 'Số lần bán' },
    views: { type: Number, default: 0, label: 'Lượt xem' }
});

Product.register();
