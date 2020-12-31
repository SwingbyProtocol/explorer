import { ENDPOINT_SKYBRIDGE_EXCHANGE, mode } from '../../../env';
import { fetch } from '../../../fetch';

export const fetchSbBTCBalance = async (userAddress: string) => {
  const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/sbBTC/balance?address=${userAddress}`;
  const res = await fetch<{ balance: string }>(url);
  const balance = res.ok && res.response.balance;
  return Number(balance);
};

// Memo: To fetch sbBTC-BTC price rate
export const fetchSbBTCRate = async () => {
  const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/sbBTC/price`;
  const res = await fetch<{ price: string }>(url);
  const price = res.ok && res.response.price;
  return Number(price);
};
