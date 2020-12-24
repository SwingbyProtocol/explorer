import { ENDPOINT_BINANCE_NODE, ENDPOINT_ETHEREUM_NODE, PAGE_COUNT } from '../../../env';
import { fetch } from '../../../fetch';
import {
  BRIDGE,
  IFetchHistory,
  ILoadHistory,
  ILoadHistoryArgs,
  IloadHistoryArgs,
  ITransactions,
  TTxRawObject,
} from '../../index';
import { TxStatus } from '../transaction';
import { isAddress } from '../validator';

const {
  COMPLETED,
  REJECTED,
  CANCELED,
  BROADCASTED,
  SENDING,
  PENDING,
  SIGNING,
  REFUNDING,
  SIGNING_REFUND,
  REFUNDED,
} = TxStatus;

const generateEndpoint = (
  baseUrl: string,
  page: number,
  query: string,
  isHideWaiting: boolean,
  hash: string,
): string => {
  if (hash !== '') {
    return `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&hash=${hash}&sort=0`;
  }

  if (query === '') {
    if (!isHideWaiting) {
      return `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&sort=0`;
    } else {
      return `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&status=${COMPLETED},${REJECTED},${CANCELED},${BROADCASTED},${SENDING},${PENDING},${SIGNING},${REFUNDING},${SIGNING_REFUND},${REFUNDED}&sort=0`;
    }
    // Memo: Search the query
  } else {
    const isAddr = isAddress(query);
    const f = isAddr ? 'address' : 'hash';
    return `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&OR_in_${f}=${query}&OR_out_${f}=${query}&sort=0`;
  }
};

const divideTxs = (
  btcbTxs: TTxRawObject[],
  btceTxs: TTxRawObject[],
  tempMixedHistories: TTxRawObject[],
  query: string,
): TTxRawObject[] => {
  const newPageTxs = [];

  // Memo: Clear the array
  if (query) {
    tempMixedHistories = [];
  }
  btcbTxs.forEach((tx: TTxRawObject) => {
    tempMixedHistories.push(tx);
  });

  btceTxs.forEach((tx: TTxRawObject) => {
    tempMixedHistories.push(tx);
  });

  tempMixedHistories.sort((x, y) => {
    return y.timestamp - x.timestamp;
  });

  for (let index = 0; index < PAGE_COUNT; index++) {
    const tx = tempMixedHistories[0];
    if (tx) {
      newPageTxs.push(tx);
      tempMixedHistories.splice(0, 1);
    }
  }

  return newPageTxs;
};

const getLatestTx = (txs: TTxRawObject[], txsETH: TTxRawObject[]): TTxRawObject => {
  const latestTxsArray = [];
  txs.forEach((tx: TTxRawObject) => {
    latestTxsArray.push(tx);
  });

  txsETH.forEach((tx: TTxRawObject) => {
    latestTxsArray.push(tx);
  });

  latestTxsArray.sort((x, y) => {
    return y.timestamp - x.timestamp;
  });

  return latestTxsArray[0];
};

const getTotal = (dataBinance: IFetchHistory, dataETH: IFetchHistory): number => {
  return dataBinance.total + dataETH.total;
};

const fetchHistory = async (
  page: number,
  query: string,
  hash: string,
  isHideWaiting: boolean,
  bridge: string,
): Promise<{ txs: TTxRawObject[]; total: number }> => {
  const swapEndpoint = '/api/v1/swaps/query';
  const floatsEndpoint = '/api/v1/floats/query';
  const endpoint = bridge === 'floats' ? floatsEndpoint : swapEndpoint;

  const baseUrlBinance = ENDPOINT_BINANCE_NODE + endpoint;
  const baseUrlETH = ENDPOINT_ETHEREUM_NODE + endpoint;

  const baseUrl = (bridge: string): string => {
    if (bridge.toLowerCase() === BRIDGE.binance.toLowerCase()) {
      return baseUrlBinance;
    }
    if (bridge.toLowerCase() === BRIDGE.ethereum.toLowerCase()) {
      return baseUrlETH;
    }
    if (bridge.toLowerCase() === 'floats') {
      return baseUrlETH;
    }
  };

  const url = generateEndpoint(baseUrl(bridge), page, query, isHideWaiting, hash);
  const result = await fetch<{ items: TTxRawObject[]; total: number }>(url);
  const txRes = result.ok && result.response;
  const txs: TTxRawObject[] = txRes.items;

  const total = txRes.total;

  return { txs, total };
};

const loadHistoryFiltered = async (args: IloadHistoryArgs): Promise<ITransactions> => {
  const { page, query, hash, isHideWaiting, bridge, prevTxsWithPage } = args;
  const results = await Promise.all([
    fetchHistory(page, query, hash, isHideWaiting, bridge),
    fetchHistory(page + 1, query, hash, isHideWaiting, bridge),
  ]);

  const data = results[0];
  const txs = data.txs;
  const dataNextPage = results[1];
  const nextPageTxs = dataNextPage.txs;

  const txsWithPage = {
    data: {
      ...prevTxsWithPage.data,
      [page]: txs,
      [page + 1]: nextPageTxs,
    },
    total: data.total,
  };

  return txsWithPage;
};

export const loadHistory = async (arg: ILoadHistoryArgs): Promise<ILoadHistory> => {
  const { page, query, hash, isHideWaiting, bridge, prevTxsWithPage, swapHistoryTemp } = arg;
  let tempMixedHistories = [];
  let txsWithPage: ITransactions = {
    data: {},
    total: 0,
  };

  // Memo: Get previous redux state
  if (prevTxsWithPage !== null && page !== 0) {
    txsWithPage = prevTxsWithPage;
  }
  if (swapHistoryTemp !== null) {
    tempMixedHistories = swapHistoryTemp;
  }

  try {
    // When: Multi bridges
    // Memo: Aggregate 2 bridges' query result into 1 array
    // Memo: Default bridge is filtered by `Ethereum Bridge` in below `else if`.

    // Memo: Not working due to Binance bridge has broken.
    if (bridge === 'multiple-bridges') {
      const results = await Promise.all([
        fetchHistory(page, query, hash, isHideWaiting, BRIDGE.binance),
        fetchHistory(page + 1, query, hash, isHideWaiting, BRIDGE.binance),
        fetchHistory(page, query, hash, isHideWaiting, BRIDGE.ethereum),
        fetchHistory(page + 1, query, hash, isHideWaiting, BRIDGE.ethereum),
      ]);

      const dataBinance: IFetchHistory = results[0];
      const txsBinance = dataBinance.txs;
      const nextPageDataBinance = results[1];
      const nextPageTxsBinance = nextPageDataBinance.txs;

      const dataETH: IFetchHistory = results[2];
      const txsETH = dataETH.txs;
      const nextPageDataETH = results[3];
      const nextPageTxsETH = nextPageDataETH.txs;

      let crossPageTxs = [];
      let crossNextPageTxs = [];
      const latestTx = getLatestTx(txsBinance, txsETH);

      // When: The app is refreshed
      if (!txsWithPage.data[page]) {
        crossPageTxs = divideTxs(txsBinance, txsETH, tempMixedHistories, query);
        crossNextPageTxs = divideTxs(nextPageTxsBinance, nextPageTxsETH, tempMixedHistories, query);
        txsWithPage = {
          data: {
            ...txsWithPage.data, // Memo: Merge the new one with the previous one.
            [page]: crossPageTxs,
            [page + 1]: crossNextPageTxs,
          },
          total: getTotal(dataBinance, dataETH),
        };
        // When: Update latest tx automatically
        // Memo: Check the both of object after convert to string
      } else if (
        page === 0 &&
        JSON.stringify(txsWithPage.data[0][0]) !== JSON.stringify(latestTx)
      ) {
        // When: Reset tempMixedHistories
        tempMixedHistories = [];
        crossPageTxs = divideTxs(txsBinance, txsETH, tempMixedHistories, query);
        crossNextPageTxs = divideTxs(nextPageTxsBinance, nextPageTxsETH, tempMixedHistories, query);

        txsWithPage = {
          data: {
            ...txsWithPage.data,
            [page]: crossPageTxs,
            [page + 1]: crossNextPageTxs,
          },
          total: getTotal(dataBinance, dataETH),
        };
        // When: Back to previous page. Won't change anything
      } else if (txsWithPage.data[page] && txsWithPage.data[page + 1]) {
        txsWithPage = {
          data: {
            ...txsWithPage.data,
          },
          total: dataBinance.total + dataETH.total,
        };
        // When: Go to next page
      } else {
        crossNextPageTxs = divideTxs(nextPageTxsBinance, nextPageTxsETH, tempMixedHistories, query);
        txsWithPage = {
          data: {
            ...txsWithPage.data,
            [page + 1]: crossNextPageTxs,
          },
          total: getTotal(dataBinance, dataETH),
        };
      }
      // Memo: Default bridge as Ethereum Bridge
    } else if (bridge === '') {
      txsWithPage = await loadHistoryFiltered({
        page,
        query,
        hash,
        isHideWaiting,
        bridge: BRIDGE.ethereum.toLowerCase(),
        prevTxsWithPage: txsWithPage,
      });
      // When: Filtered 'floats' chain
    } else if (bridge === 'floats') {
      txsWithPage = await loadHistoryFiltered({
        page,
        query,
        hash,
        isHideWaiting,
        bridge: 'floats',
        prevTxsWithPage: txsWithPage,
      });
    }
    // When: Filtered chain
    else {
      txsWithPage = await loadHistoryFiltered({
        page,
        query,
        hash,
        isHideWaiting,
        bridge,
        prevTxsWithPage: txsWithPage,
      });
    }
    return { txsWithPage, tempMixedHistories };
  } catch (error) {
    console.log(error);
  }
};
