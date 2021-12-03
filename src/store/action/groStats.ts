import * as actionTypes from './actionTypes';

export const setAllGroStats = (groStats: any) => ({
    type: actionTypes.SET_ALL_GRO_STATS,
    tvl: groStats.tvl,
    tvl_avax: groStats.tvl_avax,
    apy1: groStats.apy1,
    apy2: groStats.apy2,
    lifeguard: groStats.lifeguard,
    system: groStats.system,
    vaults: groStats.vaults,
    vaults_avax: groStats.vaults_avax,
    reserves: groStats.reserves,
    reserves_avax: groStats.reserves_avax,
    strategies: groStats.strategies,
    strategies_avax: groStats.strategies_avax,
    exposureStables: groStats.exposureStables,
    exposureProtocols: groStats.exposureProtocols,
    config: groStats.config,
    loadDate: groStats.loadDate,
});

export const removeAllGroStats = () => ({
    type: actionTypes.REMOVE_ALL_GRO_STATS,
});
