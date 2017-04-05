import { createSelector } from 'reselect';
import { calculateItemTotal } from './product';

const getAllSkus = (state) => state.products.allSkus;
const getBySku = (state) => state.products.bySku;
const getProduct = (state, sku) => state[sku];

export const calculateSubTotalValue = createSelector(
    getAllSkus,
    getBySku,
    (allSkus, bySku) => {
        return allSkus.reduce((total, sku) =>
            total + calculateItemTotal(getProduct(bySku, sku)), 0
        );
    }
);
export const isProductsEmpty = createSelector(
    getAllSkus,
    (allSkus) => {
        return allSkus.length === 0;
    }
);
