import { IEtherscanTransaction } from '../..';
import { fetch } from '../../../fetch';

const organizeTxs = (txs: IEtherscanTransaction[], address: string) => {
  return txs.map((tx: IEtherscanTransaction) => {
    const { timeStamp, hash, value, from } = tx;
    const walletAddress = address.toLowerCase();
    return {
      hash,
      timeStamp: Number(timeStamp),
      value: from === walletAddress ? '-' + value : value,
    };
  });
};

export const fetchRecentTransaction = async (
  address: string,
  page: number,
  previousTxsWithPage,
) => {
  let txsWithPage = { data: {}, total: 0 };
  if (previousTxsWithPage !== null) {
    txsWithPage = previousTxsWithPage;
  }

  const results = await Promise.all([
    fetch<IEtherscanTransaction[]>(
      `/api/etherscan/get-sbbtc-transaction?address=${address}&page=${page}`,
    ),
    fetch<IEtherscanTransaction[]>(
      `/api/etherscan/get-sbbtc-transaction?address=${address}&page=${page + 1}`,
    ),
  ]);

  const fetchedHistories = results[0].ok && results[0].response;
  const nextPageFetchedHistories = results[1].ok && results[1].response;

  if (page === 1) {
    const res = await fetch<number>(`/api/etherscan/get-total?address=${address}`);
    const totalTxs = res.ok && res.response;
    txsWithPage = {
      data: {
        ...txsWithPage.data,
        [page]: organizeTxs(fetchedHistories, address),
        [page + 1]: organizeTxs(nextPageFetchedHistories, address),
      },
      total: totalTxs,
    };
  } else {
    // Memo: No need to check `total` again
    txsWithPage = {
      data: {
        ...txsWithPage.data,
        [page]: organizeTxs(fetchedHistories, address),
        [page + 1]: organizeTxs(nextPageFetchedHistories, address),
      },
      total: txsWithPage.total,
    };
  }

  return txsWithPage;
};

export const orgFloor = (value: number, decimal: number): number => {
  const base = Number(1 + '0'.repeat(decimal));
  return Math.floor(value * base) / base;
};
