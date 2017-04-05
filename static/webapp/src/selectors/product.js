import { createSelector } from 'reselect';
import numeral from 'numeral';
import 'numeral/locales/vi';

numeral.locale('vi');

const getPrice = (product) => product.price;
const getQuantity = (product) => product.quantity;

export const calculateItemTotal = createSelector(
    [ getQuantity, getPrice ],
    (quantity, price) => {
        return numeral(price).value() * quantity;
    }
);
