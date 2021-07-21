const getNetworkId = (networkId: number) => {
    try {
        switch (networkId) {
            case 1: return 'Mainnet';
            case 3: return 'Ropsten';
            case 42: return 'Kovan';
            default: return '';
        }
    } catch (err) {
        console.log(err);
    }
}

export default getNetworkId;
