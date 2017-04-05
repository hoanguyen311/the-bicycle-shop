import app from './app';
import products from './products';
import { combineReducers } from 'redux';

export default combineReducers({
    app,
    products
});
