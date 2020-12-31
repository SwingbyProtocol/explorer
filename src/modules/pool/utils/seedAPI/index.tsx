import { mode } from '../../../env';
import { fetch } from '../../../fetch';

export const fetchSbBTCBalance = async (userAddress: string) => {
  const url = `https://seed-git-fees.swingby.vercel.app/api/v1/${mode}/sbBTC/balance?address=${userAddress}`;
  const res = await fetch<{ balance: string }>(url);
  const balance = res.ok && res.response.balance;
  return Number(balance);
};
