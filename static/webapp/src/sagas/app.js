import { put, call } from 'redux-saga/effects';
import { takeLatest, takeEvery } from 'redux-saga';
import * as actionTypes from '~/actionTypes';
import * as appActions from '~/actions/app';
import { loadData } from '~/api';


function* listenRequestData() {
    yield* takeLatest(actionTypes.REQUEST_DATA, function* () {
        yield put(appActions.showLoading());
        const { success, data } = yield call(loadData);

        if (success) {
            yield put(appActions.receiveData(data));
        }
        yield put(appActions.hideLoading());
    });
}

function* listenAppError() {
    yield* takeEvery(actionTypes.APP_ERROR, function* (error) {
        console.log(error);
    });
}

export default function* appSaga() {
    yield [
        listenRequestData(),
        listenAppError()
    ];
}
