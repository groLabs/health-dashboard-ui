export const PORT = process.env.REACT_APP_PORT || 3010;

export enum NETWORK {
    GOERLI = 'goerli',
    KOVAN = 'kovan',
    MAINNET = 'mainnet',
    RINKEBY = 'rinkeby',
    ROPSTEN = 'ropsten',
    LOCAL = 'local'
}

export enum NETWORK_ID {
    GOERLI = 5,
    KOVAN = 42,
    MAINNET = 1,
    RINKEBY = 4,
    ROPSTEN = 3,
    LOCAL = 3
}

export const APP_ELEVATED_FUNCTIONS = process.env.REACT_APP_ELEVATED_FUNCTIONS || 'no';

export const ETHEREUM_NETWORK = process.env.REACT_APP_ETHEREUM_NETWORK || NETWORK.ROPSTEN;

export const APP_STATS_BOT_URL =
    (ETHEREUM_NETWORK === NETWORK.MAINNET)
        ? 'https://h4sk4iwj75.execute-api.eu-west-2.amazonaws.com'
        : (ETHEREUM_NETWORK === NETWORK.ROPSTEN)
            ? 'https://ajj49or3nh.execute-api.eu-west-2.amazonaws.com'
            : 'http://localhost';

export const APP_STATS_BOT_PORT =
    (ETHEREUM_NETWORK === NETWORK.LOCAL)
        ? 3010
        : 443;

export const APP_NETWORK_ID =
    (ETHEREUM_NETWORK === NETWORK.MAINNET)
        ? NETWORK_ID.MAINNET
        : (ETHEREUM_NETWORK === NETWORK.ROPSTEN || ETHEREUM_NETWORK === NETWORK.LOCAL)
            ? NETWORK_ID.ROPSTEN
            : 0;



