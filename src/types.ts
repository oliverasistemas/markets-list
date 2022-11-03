export interface MarketItem {
    date: string;
    value: number;
}

export interface CoinsFetchMarketChart {
    market_caps: number[][];
    prices: number[][];
    total_volumes: number[][];
}

export interface IMarketsItem  {
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    circulating_supply: number;
    current_price: number
    fully_diluted_valuation: number;
    high_24h: number;
    id: string;
    image: string;
    last_updated: string;
    low_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number;
    max_supply: number;
    name: string;
    price_change_24h: number;
    price_change_percentage_24h: number;
    roi: null;
    sparkline_in_7d: {
        price: number[]
    };
    symbol: string;
    total_supply: number;
    total_volume: number;
}

export enum eColors {
    success ="#83B77E",
    danger ="#F75D1B",
    grey ="#7c7c7c",
    darkGrey ="#363636",
    white ="#d2d1d1"
}
