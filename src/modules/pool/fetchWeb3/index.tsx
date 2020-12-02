import { IEtherscanTransaction, IRecentTx } from '..';
import { API_KEY_ETHERSCAN, BTCE_CONTRACT_ADDRESS, ENDPOINT_ETHERSCAN, TXS_COUNT } from '../../env';
import { fetch } from '../../fetch';

export const fetchRecentTransaction = async (address: string): Promise<IRecentTx[]> => {
  const base = ENDPOINT_ETHERSCAN;
  const walletAddress = address.toLowerCase();

  const url = `${base}/api?module=account&action=tokentx&contractaddress=${BTCE_CONTRACT_ADDRESS}&address=${walletAddress}&page=1&offset=${TXS_COUNT}&sort=desc&apikey=${API_KEY_ETHERSCAN}`;

  const result = await fetch<{ result: IEtherscanTransaction[] }>(url);
  const fetchedHistories = result.ok && result.response.result;
  const txHistories = fetchedHistories.map((tx: IEtherscanTransaction) => {
    const { timeStamp, hash, value, from } = tx;
    return {
      hash,
      timeStamp: Number(timeStamp),
      value: from === walletAddress ? '-' + value : ' ' + value,
    };
  });

  return txHistories;
};

export const orgFloor = (value: number, base: number): number => {
  return Math.floor(value * base) / base;
};
