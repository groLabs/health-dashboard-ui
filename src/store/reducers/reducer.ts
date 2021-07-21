import { createSelectorHook } from 'react-redux';
// import { Wallet } from '../../interfaces/Wallet';
// import { User, Order, Trade } from '../../interfaces/Dex';

// export interface Wallet {
//     chainId: number,
// };

//TODO: define types!
export interface RootState {
    // wallet: Wallet,
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
    },
    // dex: {
    //     user: User,
    //     orders: Order,
    //     trades: Trade[],
    // },
};

export const useTypedSelector = createSelectorHook<RootState>();
