import * as actionTypes from '~/actionTypes';
import { combineReducers } from 'redux';
import product from './product';

const allSkus = (state = [], { type, payload }) => {
    switch (type) {
        case actionTypes.RECEIVE_DATA:
            return state.concat(payload.cartItems.map(item => item._id));
        case actionTypes.REMOVE_ITEM:
        case actionTypes.ADD_ITEM_TO_WISHLIST:
            return state.filter(sku => sku !== payload.sku);
        case actionTypes.ADD_ITEM_FROM_WISHLIST:
            return state.concat([ payload.sku ]);
        default:
            return state;
    }
};


const bySku = (state = {}, { type, payload }) => {
    let nextState;

    switch (type) {
        case actionTypes.RECEIVE_DATA:
            nextState = { ...state };

            payload.cartItems.forEach((item) => {
                nextState[item._id] = product(state[item._id], {
                    type,
                    payload: item
                });
            });

            return nextState;
        case actionTypes.UPDATE_QUANTITY:
        case actionTypes.BLOCK_ITEM:
        case actionTypes.UNBLOCK_ITEM:
            return {
                ...state,
                [ payload.sku ]: product(state[payload.sku], {
                    type,
                    payload
                })
            };
        case actionTypes.ADD_ITEM_FROM_WISHLIST:
            return {
                ...state,
                [ payload.sku ]: payload
            };
        case actionTypes.REMOVE_ITEM:
        case actionTypes.ADD_ITEM_TO_WISHLIST:
            nextState = { ...state };
            delete nextState[ payload.sku ];

            return nextState;
        default:
            return state;
    }
};


export function getAllProducts(state) {
    return state.allSkus.map((sku) => state.bySku[sku]);
}

export default combineReducers({
    allSkus,
    bySku
});
