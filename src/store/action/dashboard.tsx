import * as actionTypes from './actionTypes';

export const setTvl = (tvl: any) => ({
    type: actionTypes.SET_TVL,
    tvl: tvl,
});

export const setAllGroStats = (groStats: any) => ({
    type: actionTypes.SET_ALL_GRO_STATS,
    tvl: groStats.tvl,
    apy1: groStats.apy1,
    apy2: groStats.apy2,
    lifeguard: groStats.lifeguard,
    system: groStats.system,
    vaults: groStats.vaults,
    reserves: groStats.reserves,
    strategies: groStats.strategies,
    exposureStables: groStats.exposureStables,
    exposureProtocols: groStats.exposureProtocols,
    config: groStats.config,
});

