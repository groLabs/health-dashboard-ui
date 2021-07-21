
import * as actionTypes from '../action/actionTypes';
import { RootState } from './reducer';

type rootState = RootState['wallet'];

interface State extends rootState { };
interface Action extends rootState {
    type: string,
}

const initialState = {
    chainId: 5,
}

const setChainId = (state: State, action: Action) => {
    return {
        ...state,
        ...{
            chainId: action.chainId,
        }
    };
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_CHAINID: return setChainId(state, action);
        default: return state;
    }
};

export default reducer;