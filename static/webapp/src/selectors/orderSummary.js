import { createSelector } from 'reselect';
import { calculateSubTotalValue } from './products';
import numeral from 'numeral';
import 'numeral/locales/vi';

numeral.locale('vi');

export const getTotal = createSelector(
    calculateSubTotalValue,
    (subTotal) => numeral(subTotal).format('0,0 $')
);
