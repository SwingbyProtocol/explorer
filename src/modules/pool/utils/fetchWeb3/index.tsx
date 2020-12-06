import { IEtherscanTransaction } from '../..';
import { API_KEY_ETHERSCAN, CONTRACT_BTCE, ENDPOINT_ETHERSCAN, TXS_COUNT } from '../../../env';
import { fetch } from '../../../fetch';

const base = ENDPOINT_ETHERSCAN;

const generateUrl = (page: number, walletAddress: string, limit: number) => {
  return `${base}/api?module=account&action=tokentx&contractaddress=${CONTRACT_BTCE}&address=${walletAddress}&page=${page}&offset=${limit}&sort=desc&apikey=${API_KEY_ETHERSCAN}`;
};

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

const getTotal = async (walletAddress: string) => {
  let total = 0;
  let page = 1;
  let isFinishFetching = false;
  const limit = 1000;
  do {
    const result = await fetch<{ result: IEtherscanTransaction[] }>(
      generateUrl(page, walletAddress, limit),
    );
    const fetchedHistories = result.ok && result.response.result;
    const historiesLength = fetchedHistories.length;
    if (historiesLength === limit) {
      total = total + historiesLength;
      page++;
    } else {
      total = total + historiesLength;
      isFinishFetching = true;
    }
  } while (!isFinishFetching);
  return total;
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
    fetch<{ result: IEtherscanTransaction[] }>(generateUrl(page, address, TXS_COUNT)),
    fetch<{ result: IEtherscanTransaction[] }>(generateUrl(page + 1, address, TXS_COUNT)),
  ]);

  const fetchedHistories = results[0].ok && results[0].response.result;
  const nextPageFetchedHistories = results[1].ok && results[1].response.result;

  if (page === 1) {
    txsWithPage = {
      data: {
        ...txsWithPage.data,
        [page]: organizeTxs(fetchedHistories, address),
        [page + 1]: organizeTxs(nextPageFetchedHistories, address),
      },
      total: await getTotal(address),
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

export const orgFloor = (value: number, base: number): number => {
  return Math.floor(value * base) / base;
};
