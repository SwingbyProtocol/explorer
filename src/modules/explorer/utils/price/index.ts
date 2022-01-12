import { ENDPOINT_COINGECKO } from '../../../env';

// import { fetch, fetcher } from '../../../fetch';
import { fetcher, fetch } from './../../../fetch';
/**
 * @see https://github.com/miguelmota/vwap/blob/master/index.js
 */

const calculateVwap = (data: Array<{ volume: number; price: number }>): number => {
  const sharesValue = data.reduce((s, x) => s + x.volume * x.price, 0);
  const totalShares = data.reduce((s, x) => s + x.volume, 0);
  if (totalShares === 0) {
    return 0;
  }

  return sharesValue / totalShares;
};

const getUsdVwap = async (currency: string): Promise<number> => {
  const days = 7;

  const res = await fetcher<{
    prices: Array<number[]>;
    market_caps: Array<number[]>;
    total_volumes: Array<number[]>;
  }>(
    `https://api.coingecko.com/api/v3/coins/${currency}/market_chart?days=${days}&vs_currency=usd&interval=daily`,
  );

  return calculateVwap([
    { volume: res.total_volumes[0][1], price: res.prices[0][1] },
    { volume: res.total_volumes[1][1], price: res.prices[1][1] },
    { volume: res.total_volumes[2][1], price: res.prices[2][1] },
    { volume: res.total_volumes[3][1], price: res.prices[3][1] },
    { volume: res.total_volumes[4][1], price: res.prices[4][1] },
    { volume: res.total_volumes[5][1], price: res.prices[5][1] },
    { volume: res.total_volumes[6][1], price: res.prices[6][1] },
  ]);
};

export const calculateSwingbyVwapPrice = async (): Promise<number> => await getUsdVwap('swingby');

export const calculateBtcVwapPrice = async (): Promise<number> => await getUsdVwap('bitcoin');

export const fetchVwap = async (currency: 'btcUsd' | 'swingbyUsd'): Promise<number> => {
  try {
    const price =
      currency === 'btcUsd' ? await calculateBtcVwapPrice() : await calculateSwingbyVwapPrice();
    return price;
  } catch (error) {
    console.log('error', error);
    return 0;
  }
};

export const getUsdPrice = async (currency: string): Promise<number> => {
  const url = ENDPOINT_COINGECKO + `/simple/price?ids=${currency}&vs_currencies=usd`;

  const result = await fetch<{ currency: { usd } }>(url);
  const price = result.ok && result.response[currency].usd;

  return Number(price);
};
