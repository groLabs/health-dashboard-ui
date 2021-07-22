
import * as actionTypes from '../action/actionTypes';
import { RootState } from './reducer';

type rootState = RootState['groStats'];

interface State extends rootState { };
interface Action extends rootState {
    type: string,
}

const initialState = {
        tvl: {},
        apy1: {},
        apy2: {},
        lifeguard: {},
        system: {},
        vaults: [],
        reserves: [],
        strategies: [],
        exposureStables: [],
        exposureProtocols: [],
        config: {}
}

const setAllGroStats = (state: State, action: Action) => {
    const newState = { 
        ...state, 
        ...{ 
            tvl: action.tvl,
            apy1: action.apy1,
            apy2: action.apy2,
            lifeguard: action.lifeguard,
            system: action.system,
            vaults: action.vaults,
            reserves: action.reserves,
            strategies: action.strategies,
            exposureStables: action.exposureStables,
            exposureProtocols: action.exposureProtocols,
            config: action.config,
        } };
    return newState;
}

const removeAllGroStats = (state: State, action: Action) => {
    state = initialState;
    return state;
};


const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_ALL_GRO_STATS:
            return setAllGroStats(state, action);
        case actionTypes.REMOVE_ALL_GRO_STATS:
            return removeAllGroStats(state, action);
        default:
            return state;
    }
};

export default reducer;
