
import * as actionTypes from '../action/actionTypes';
import { RootState } from './reducer';

type rootState = RootState['priceCheck'];

interface State extends rootState { }
interface Action extends rootState {
    type: string,
}

const initialState = {
        global: {},
        detail: [],
}

const setPriceCheck = (state: State, action: Action) => {
    const newState = { 
        ...state, 
        ...{ 
            global: action.global,
            detail: action.detail,
        } };
    return newState;
}

const removePriceCheck = (state: State, action: Action) => {
    state = initialState;
    return state;
};

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_PRICE_CHECK:
            return setPriceCheck(state, action);
        case actionTypes.REMOVE_PRICE_CHECK:
            return removePriceCheck(state, action);
        default:
            return state;
    }
};

export default reducer;
