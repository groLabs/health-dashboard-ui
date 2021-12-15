
import * as actionTypes from '../action/actionTypes';
import { RootState } from './reducer';

type rootState = RootState['groStats'];

interface State extends rootState { };
interface Action extends rootState {
    type: string,
}

const initialState = {
        tvl: {},
        tvl_avax: {},
        apy1: {},
        apy2: {},
        lifeguard: {},
        lifeguardStables: [],
        system: {},
        vaults: [],
        vaults_avax: [],
        reserves: [],
        reserves_avax: [],
        strategies: [],
        strategies_avax: [],
        exposureStables: [],
        exposureProtocols: [],
        config: {},
        loadDate: '',
}

const setAllGroStats = (state: State, action: Action) => {
    const newState = { 
        ...state, 
        ...{ 
            tvl: action.tvl,
            tvl_avax: action.tvl_avax,
            apy1: action.apy1,
            apy2: action.apy2,
            lifeguard: action.lifeguard,
            lifeguardStables: action.lifeguardStables,
            system: action.system,
            vaults: action.vaults,
            vaults_avax: action.vaults_avax,
            reserves: action.reserves,
            reserves_avax: action.reserves_avax,
            strategies: action.strategies,
            strategies_avax: action.strategies_avax,
            exposureStables: action.exposureStables,
            exposureProtocols: action.exposureProtocols,
            config: action.config,
            loadDate: action.loadDate,
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
