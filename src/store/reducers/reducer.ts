import { createSelectorHook } from 'react-redux';

//TODO: define types!
export interface RootState {
    groStats: {
        tvl: any,
        tvl_avax: any,
        apy1: any,
        apy2: any,
        lifeguard: any,
        lifeguardStables: any[],
        system: any,
        vaults: any[],
        vaults_avax: any[],
        reserves: any[],
        reserves_avax: any[],
        strategies: any[],
        strategies_avax: any[],
        exposureStables: any[],
        exposureProtocols: any[],
        config: any,
        loadDate: string,
    },
    priceCheck: {
        global: any,
        detail: any,
    }
};


export const useTypedSelector = createSelectorHook<RootState>();
