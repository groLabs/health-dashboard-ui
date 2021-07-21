
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
}

// const setTvl = (state: State, action: Action) => {
//     const newVal = action.tvl;
//     const newState = { ...state, ...{ tvl: newVal } };
//     console.log('newState:', newState);
//     return newState;
// }

const setAllGroStats = (state: State, action: Action) => {
    console.log('action:', action)
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
        } };
    console.log('newState:', newState);
    return newState;
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        // case actionTypes.SET_TVL:
        //     return setTvl(state, action);
        case actionTypes.SET_ALL_GRO_STATS:
            return setAllGroStats(state, action);
        default:
            return state;
    }
};

export default reducer;

// type rootState = RootState['wallet'];

// interface State extends rootState { };
// interface Action extends rootState {
//     type: string,
// }

// const initialState = {
//     chainId: 5,
// }

// const setChainId = (state: State, action: Action) => {
//     return {
//         ...state,
//         ...{
//             chainId: action.chainId,
//         }
//     };
// }

// const reducer = (state = initialState, action: Action) => {
//     switch (action.type) {
//         case actionTypes.SET_CHAINID: return setChainId(state, action);
//         default: return state;
//     }
// };

// export default reducer;
