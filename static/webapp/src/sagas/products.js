import { put, call } from 'redux-saga/effects';
import { takeLatest, takeEvery } from 'redux-saga';
import * as actionTypes from '~/actionTypes';
import * as productsAction from '~/actions/products';
import * as appActions from '~/actions/app';
import { requestUpdateQuantity, requestRemoveItem } from '~/api';

function* listenUpdateQuantity() {
    yield* takeEvery(actionTypes.REQUEST_UPDATE_QUANTITY, function* ({ payload }) {
        yield put(productsAction.blockItem(payload));
        try {
            const { success, data } = yield call(requestUpdateQuantity, payload);

            if (success) {
                yield put(productsAction.updateQuantity(payload));
            }
        } catch (error) {
            yield put(appActions.requestShowError({ error }));
        } finally {
            yield put(productsAction.unBlockItem(payload));
        }
    });
}

function* listenRemoveItem() {
    yield* takeLatest(actionTypes.REQUEST_REMOVE_ITEM, function* ({ payload }) {
        yield put(productsAction.blockItem(payload));
        try {
            const { success } = yield call(requestRemoveItem, payload);

            if (success) {
                yield put(productsAction.removeItem(payload));
            }
        } catch (error) {
            yield put(appActions.requestShowError({ error }));
        } finally {
            yield put(productsAction.unBlockItem(payload));
        }
    });
}

export default function* productsSaga() {
    yield [
        listenUpdateQuantity(),
        listenRemoveItem()
    ];
}
