import * as actionTypes from './actionTypes';

export const setChainId = (chainId: number) => ({
    type: actionTypes.SET_CHAINID,
    chainId: chainId,
});

