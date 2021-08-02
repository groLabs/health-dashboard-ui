import { v4 as uuidv4 } from 'uuid';
// TODO: add logger

const parsePriceCheck = (data: any) => {
    try {
        return {
            'key': uuidv4(),
            'pair': data.pair,
            'curve_price': data.curve_price,
            'curve_cache_price': data.curve_cache_price,
            'curve_cache_diff': data.curve_cache_diff,
            'curve_cache_check': data.curve_cache_check,
            'chainlink_price': data.chainlink_price,
            'curve_chainlink_diff': data.curve_chainlink_diff,
            'curve_chainlink_check': data.curve_chainlink_check,
        }
    } catch (err) {
        console.log('Error in parsePriceCheck.ts:', err);
        return { 
            'key': '',
            'pair': '',
            'curve_price': 0,
            'curve_cache_price': 0,
            'curve_cache_diff': 0,
            'curve_cache_check': false,
            'chainlink_price': 0,
            'curve_chainlink_diff': 0,
            'curve_chainlink_check': false,
        };
    }
}

export default parsePriceCheck;
