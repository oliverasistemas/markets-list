import axios from "axios";

const host = "https://api.coingecko.com/api/v3/coins/";

export const getMarketChart = (id: string) => axios.get(`${host + id}/market_chart?vs_currency=usd&days=7&interval=hourly`);

export const getMarkets = (page: number) => axios.get(`${host}markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=true`);
