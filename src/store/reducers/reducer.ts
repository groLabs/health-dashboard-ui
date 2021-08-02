import { createSelectorHook } from 'react-redux';

//TODO: define types!
export interface RootState {
    groStats: {
        tvl: any,
        apy1: any,
        apy2: any,
        lifeguard: any,
        system: any,
        vaults: any[],
        reserves: any[],
        strategies: any[],
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
