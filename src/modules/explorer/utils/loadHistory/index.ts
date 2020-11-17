import { fetch } from '../../../fetch';
import {
  BRIDGE,
  IFetchSwapHistoryResponse,
  ITransactions,
  SwapRawObject,
  IFetchHistory,
} from '../../index';
import { removeDuplicatedTxs, TxStatus } from '../transaction';
import { ENDPOINT_API, PAGE_COUNT } from '../../../env';
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
): string => {
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
  btcbTxs: SwapRawObject[],
  btceTxs: SwapRawObject[],
  tempMixedHistories: SwapRawObject[],
  query: string,
): SwapRawObject[] => {
  const newPageTxs = [];

  // Memo: Clear the array
  if (query) {
    tempMixedHistories = [];
  }
  btcbTxs.forEach((tx: SwapRawObject) => {
    tempMixedHistories.push(tx);
  });

  btceTxs.forEach((tx: SwapRawObject) => {
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

const getLatestTx = (txs: SwapRawObject[], txsETH: SwapRawObject[]): SwapRawObject => {
  const latestTxsArray = [];
  txs.forEach((tx: SwapRawObject) => {
    latestTxsArray.push(tx);
  });

  txsETH.forEach((tx: SwapRawObject) => {
    latestTxsArray.push(tx);
  });

  latestTxsArray.sort((x, y) => {
    return y.timestamp - x.timestamp;
  });

  return latestTxsArray[0];
};

const getTotal = (
  dataBinance: IFetchHistory,
  dataETH: IFetchHistory,
  totalDuplicatedTxQTY: number,
  crossNextPageTxs: SwapRawObject[],
): number => {
  return crossNextPageTxs.length
    ? dataBinance.total + dataETH.total
    : dataBinance.total + dataETH.total - totalDuplicatedTxQTY;
};

const fetchHistory = async (
  page: number,
  query: string,
  isHideWaiting: boolean,
  bridge: string,
): Promise<{ txs: SwapRawObject[]; duplicatedTxQTY: number; total: number }> => {
  const baseUrlBinance = ENDPOINT_API.BTCB_NODE + '/api/v1/swaps/query';
  const baseUrlETH = ENDPOINT_API.BTCE_NODE + '/api/v1/swaps/query';
  const baseUrl = (bridge: string): string => {
    if (bridge.toLowerCase() === BRIDGE.binance.toLowerCase()) {
      return baseUrlBinance;
    }
    if (bridge.toLowerCase() === BRIDGE.ethereum.toLowerCase()) {
      return baseUrlETH;
    }
  };

  const url = generateEndpoint(baseUrl(bridge), page, query, isHideWaiting);
  const result = await fetch<{ items: SwapRawObject[]; total: number }>(url);

  const txRes: IFetchSwapHistoryResponse = result.ok && result.response;
  const txsResItems: SwapRawObject[] = txRes.items;

  // Memo: Remove the duplicated txIdIn
  const txs: SwapRawObject[] = removeDuplicatedTxs(txsResItems, 'txId');
  const duplicatedTxQTY: number = txsResItems.length - txs.length;
  const total = txRes.total;

  return { txs, duplicatedTxQTY, total };
};

const loadHistoryFiltered = async (
  page: number,
  query: string,
  isHideWaiting: boolean,
  bridge: string,
  prevTxsWithPage: ITransactions,
): Promise<ITransactions> => {
  const results = await Promise.all([
    fetchHistory(page, query, isHideWaiting, bridge),
    fetchHistory(page + 1, query, isHideWaiting, bridge),
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
    total: nextPageTxs.length ? data.total : data.total - data.duplicatedTxQTY,
  };

  return txsWithPage;
};

export const loadHistory = async (
  page: number,
  query: string,
  isHideWaiting: boolean,
  bridge: string,
  prevTxsWithPage: ITransactions | null,
  swapHistoryTemp: SwapRawObject[],
): Promise<{ txsWithPage: ITransactions; tempMixedHistories: SwapRawObject[] }> => {
  let tempMixedHistories: SwapRawObject[] = [];
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
    if (bridge === '') {
      const results = await Promise.all([
        fetchHistory(page, query, isHideWaiting, BRIDGE.binance),
        fetchHistory(page + 1, query, isHideWaiting, BRIDGE.binance),
        fetchHistory(page, query, isHideWaiting, BRIDGE.ethereum),
        fetchHistory(page + 1, query, isHideWaiting, BRIDGE.ethereum),
      ]);

      const dataBinance: IFetchHistory = results[0];
      const txsBinance = dataBinance.txs;
      const nextPageDataBinance = results[1];
      const nextPageTxsBinance = nextPageDataBinance.txs;

      const dataETH: IFetchHistory = results[2];
      const txsETH = dataETH.txs;
      const nextPageDataETH = results[3];
      const nextPageTxsETH = nextPageDataETH.txs;

      const totalDuplicatedTxQTY = dataBinance.duplicatedTxQTY + dataETH.duplicatedTxQTY;

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
          total: getTotal(dataBinance, dataETH, totalDuplicatedTxQTY, crossNextPageTxs), // Memo: Calculated actual total QTY to make button disable in the last page
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
          total: getTotal(dataBinance, dataETH, totalDuplicatedTxQTY, crossNextPageTxs),
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
          total: getTotal(dataBinance, dataETH, totalDuplicatedTxQTY, crossNextPageTxs),
        };
      }
    }
    // When: Filtered chain
    else {
      txsWithPage = await loadHistoryFiltered(page, query, isHideWaiting, bridge, txsWithPage);
    }
    return { txsWithPage, tempMixedHistories };
  } catch (error) {
    console.log(error);
  }
};
