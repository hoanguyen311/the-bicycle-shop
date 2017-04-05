import * as actionTypes from '~/actionTypes';
import numeral from 'numeral';
import 'numeral/locales/vi';

numeral.locale('vi');
const DEFAULT_STATE = {
    image: '',
    name: '',
    price: '',
    oldPrice: '',
    sale: 0,
    stock: 0,
    sku: '',
    stockStatus: false,
    link: '',
    quantity: 0,
    brand: '',
    isBlocked: false
};

export default function(state = DEFAULT_STATE, { type, payload }) {
    switch (type) {
        case actionTypes.RECEIVE_DATA:
            return {
                ...state,
                image: payload.image,
                name: payload.name,
                price: numeral(payload.price).format('0,0 $'),
                oldPrice: numeral(payload.oldPrice).format('0,0 $'),
                sale: numeral(1 - payload.price / payload.oldPrice).format('0%'),
                stock: payload.stock,
                sku: payload._id,
                stockStatus: payload.inStock,
                link: `/p/${payload.slug}`,
                quantity: payload.quantityInCart,
                brand: payload.brand ? payload.brand.name : ''
            };
        case actionTypes.UPDATE_QUANTITY:
            return {
                ...state,
                quantity: payload.quantity
            };
        case actionTypes.BLOCK_ITEM:
            return {
                ...state,
                isBlocked: true
            };
        case actionTypes.UNBLOCK_ITEM:
            return {
                ...state,
                isBlocked: false
            };
        default:
            return state;
    }
}
