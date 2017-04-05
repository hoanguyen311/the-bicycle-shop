import * as actionTypes from '~/actionTypes';

export function updateQuantity(payload) {
    return {
        type: actionTypes.UPDATE_QUANTITY,
        payload
    };
}
export function blockItem(payload) {
    return {
        type: actionTypes.BLOCK_ITEM,
        payload
    };
}
export function unBlockItem(payload) {
    return {
        type: actionTypes.UNBLOCK_ITEM,
        payload
    };
}

export function requestUpdateQuantity(payload) {
    return {
        type: actionTypes.REQUEST_UPDATE_QUANTITY,
        payload
    };
}

export function removeItem(payload) {
    return {
        type: actionTypes.REMOVE_ITEM,
        payload
    };
}
export function requestRemoveItem(payload) {
    return {
        type: actionTypes.REQUEST_REMOVE_ITEM,
        payload
    };
}
