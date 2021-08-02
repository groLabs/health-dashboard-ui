import * as actionTypes from './actionTypes';

export const setPriceCheck = (priceCheck: any) => ({
    type: actionTypes.SET_PRICE_CHECK,
    global: priceCheck.global,
    detail: priceCheck.detail,
});

export const removePriceCheck = () => ({
    type: actionTypes.REMOVE_PRICE_CHECK,
});
