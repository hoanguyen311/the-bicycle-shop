import * as actionTypes from '~/actionTypes';

const DEFAULT_STATE = {
    loading: false
};

export default function(state = DEFAULT_STATE, { type, payload }) {
    switch (type) {
        case actionTypes.SHOW_LOADING:
            return {
                ...state,
                loading: true
            };
        case actionTypes.HIDE_LOADING:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
