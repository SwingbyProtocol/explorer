import { IEtherscanTransaction } from '..';
import { API_KEY_ETHERSCAN, BTCE_CONTRACT_ADDRESS, ENDPOINT_ETHERSCAN, TXS_COUNT } from '../../env';
import { fetch } from '../../fetch';

export const fetchRecentTransaction = async (
  address: string,
  page: number,
  previousTxsWithPage,
) => {
  let txsWithPage = { data: {} };
  if (previousTxsWithPage !== null) {
    txsWithPage = previousTxsWithPage;
  }

  const base = ENDPOINT_ETHERSCAN;
  const walletAddress = address.toLowerCase();

  const generateUrl = (page: number) => {
    return `${base}/api?module=account&action=tokentx&contractaddress=${BTCE_CONTRACT_ADDRESS}&address=${walletAddress}&page=${page}&offset=${TXS_COUNT}&sort=desc&apikey=${API_KEY_ETHERSCAN}`;
  };

  const organizeTxs = (txs: IEtherscanTransaction[]) => {
    return txs.map((tx: IEtherscanTransaction) => {
      const { timeStamp, hash, value, from } = tx;
      return {
        hash,
        timeStamp: Number(timeStamp),
        value: from === walletAddress ? '-' + value : value,
      };
    });
  };

  const results = await Promise.all([
    fetch<{ result: IEtherscanTransaction[] }>(generateUrl(page)),
    fetch<{ result: IEtherscanTransaction[] }>(generateUrl(page + 1)),
  ]);

  const fetchedHistories = results[0].ok && results[0].response.result;
  const nextPageFetchedHistories = results[1].ok && results[1].response.result;

  txsWithPage = {
    data: {
      ...txsWithPage.data,
      [page]: organizeTxs(fetchedHistories),
      [page + 1]: organizeTxs(nextPageFetchedHistories),
    },
  };

  return txsWithPage;
};

export const orgFloor = (value: number, base: number): number => {
  return Math.floor(value * base) / base;
};
