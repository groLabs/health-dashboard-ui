import { createSelectorHook } from 'react-redux';
// import { Wallet } from '../../interfaces/Wallet';
// import { User, Order, Trade } from '../../interfaces/Dex';

export interface Wallet {
    chainId: number,
};

export interface RootState {
    wallet: Wallet,
    // dex: {
    //     user: User,
    //     orders: Order,
    //     trades: Trade[],
    // },
};

export const useTypedSelector = createSelectorHook<RootState>();
