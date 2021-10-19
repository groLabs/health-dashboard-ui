export interface IPriceCheck {
    key: string;
    pair: string;
    curve_price: number,
    curve_cache_price: number,
    curve_cache_diff: number,
    curve_cache_check: boolean,
    chainlink_price: number,
    curve_chainlink_diff: number,
    curve_chainlink_check: boolean,
}
