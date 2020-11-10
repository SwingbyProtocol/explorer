import { fetch } from '../../../fetch';
import { BRIDGE, IFetchSwapHistoryResponse, ITransactions, SwapRawObject } from '../../index';

import { removeDuplicatedTxs, TxStatus } from './../transaction';
import { ENDPOINT_API, PAGE_COUNT } from './../../../env';
import { isAddress } from './../validator';

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

export const fetchHistory = async (
  page: number,
  query: string,
  prev: ITransactions | null,
  isHideWaiting: boolean,
  swapHistoryTemp,
  bridge: string,
) => {
  const baseUrlBinance = ENDPOINT_API.BTCB_NODE + '/api/v1/swaps/query';
  const baseUrlETH = ENDPOINT_API.BTCE_NODE + '/api/v1/swaps/query';
  let tempMixedHistories: SwapRawObject[] = [];
  let txsWithPage: ITransactions = {
    data: {},
    total: 0,
  };

  if (prev !== null && page !== 0) {
    txsWithPage = prev;
  }

  if (swapHistoryTemp !== null) {
    tempMixedHistories = swapHistoryTemp;
  }

  try {
    /****************** Get txs ******************/
    const urlBinance = generateEndpoint(baseUrlBinance, page, query, isHideWaiting);
    let nextPageUrlBinance = generateEndpoint(baseUrlBinance, page + 1, query, isHideWaiting);
    let urlETH = generateEndpoint(baseUrlETH, page, query, isHideWaiting);
    let nextPageUrlETH = generateEndpoint(baseUrlETH, page + 1, query, isHideWaiting);
    const results = await Promise.all([
      fetch<{ items: SwapRawObject[]; total: number }>(urlBinance),
      fetch<{ items: SwapRawObject[]; total: number }>(nextPageUrlBinance),
      fetch<{ items: SwapRawObject[]; total: number }>(urlETH),
      fetch<{ items: SwapRawObject[]; total: number }>(nextPageUrlETH),
    ]);

    const txRes: IFetchSwapHistoryResponse = results[0].ok && results[0].response;
    const txsResItems: SwapRawObject[] = txRes.items;

    // Memo: Remove the duplicated txIdIn
    const txs: SwapRawObject[] = removeDuplicatedTxs(txsResItems, 'txId');

    const nextPageTxRes: IFetchSwapHistoryResponse = results[1].ok && results[1].response;
    const nextPageTxsResItems: SwapRawObject[] = nextPageTxRes.items;
    const nextPageTxs: SwapRawObject[] = removeDuplicatedTxs(nextPageTxsResItems, 'txId');
    const deltaBinance =
      txsResItems.length + nextPageTxsResItems.length - txs.length - nextPageTxs.length;

    const txResETH: IFetchSwapHistoryResponse = results[2].ok && results[2].response;
    const txsResItemsETH: SwapRawObject[] = txResETH.items;

    // Memo: Remove the duplicated txIdIn
    const txsETH: SwapRawObject[] = removeDuplicatedTxs(txsResItemsETH, 'txId');

    const nextPageTxResETH: IFetchSwapHistoryResponse = results[3].ok && results[3].response;
    const nextPageTxsResItemsETH: SwapRawObject[] = nextPageTxResETH.items;
    const nextPageTxsETH: SwapRawObject[] = removeDuplicatedTxs(nextPageTxsResItemsETH, 'txId');
    const deltaETH =
      txsResItemsETH.length + nextPageTxsResItemsETH.length - txsETH.length - nextPageTxsETH.length;
    const delta = deltaBinance + deltaETH;

    /****************** End get txs ******************/

    // When: Multi bridges
    // Memo: Aggregate 2 array into 1 array
    if (bridge === '') {
      let crossPageTxs = [];
      let crossNextPageTxs = [];
      const latestTx = getLatestTx(txs, txsETH);

      // When: The app is refreshed
      if (!txsWithPage.data[page]) {
        crossPageTxs = divideTxs(txs, txsETH, tempMixedHistories, query);
        crossNextPageTxs = divideTxs(nextPageTxs, nextPageTxsETH, tempMixedHistories, query);
        txsWithPage = {
          data: {
            ...txsWithPage.data, // Memo: Merge the new one with the previous one.
            [page]: crossPageTxs,
            [page + 1]: crossNextPageTxs,
          },
          total: crossNextPageTxs.length
            ? txRes.total + txResETH.total
            : txRes.total + txResETH.total - delta, // Memo: Calculated actual total QTY to make button disable in the last page
        };
        // When: Update latest tx automatically
        // Memo: Check the both of object after convert to string
      } else if (
        page === 0 &&
        JSON.stringify(txsWithPage.data[0][0]) !== JSON.stringify(latestTx)
      ) {
        // When: Reset tempMixedHistories
        tempMixedHistories = [];
        crossPageTxs = divideTxs(txs, txsETH, tempMixedHistories, query);
        crossNextPageTxs = divideTxs(nextPageTxs, nextPageTxsETH, tempMixedHistories, query);

        txsWithPage = {
          data: {
            ...txsWithPage.data,
            [page]: crossPageTxs,
            [page + 1]: crossNextPageTxs,
          },
          total: crossNextPageTxs.length
            ? txRes.total + txResETH.total
            : txRes.total + txResETH.total - delta,
        };
        // When: Back to previous page. Won't change anything
      } else if (txsWithPage.data[page] && txsWithPage.data[page + 1]) {
        txsWithPage = {
          data: {
            ...txsWithPage.data,
          },
          total: txRes.total + txResETH.total,
        };
        // When: Go to next page
      } else {
        crossNextPageTxs = divideTxs(nextPageTxs, nextPageTxsETH, tempMixedHistories, query);
        txsWithPage = {
          data: {
            ...txsWithPage.data,
            [page + 1]: crossNextPageTxs,
          },
          total: crossNextPageTxs.length
            ? txRes.total + txResETH.total
            : txRes.total + txResETH.total - delta,
        };
      }
    }
    // When: Filtered chain
    else {
      if (bridge === BRIDGE.binance.toLowerCase()) {
        txsWithPage = {
          data: {
            ...txsWithPage.data,
            [page]: txs,
            [page + 1]: nextPageTxs,
          },
          total: nextPageTxs.length ? txRes.total : txRes.total - deltaBinance,
        };
      } else if (bridge === BRIDGE.ethereum.toLowerCase()) {
        txsWithPage = {
          data: {
            ...txsWithPage.data,
            [page]: txsETH,
            [page + 1]: nextPageTxsETH,
          },
          total: nextPageTxsETH.length ? txResETH.total : txResETH.total - deltaETH,
        };
      }
    }
    return { txsWithPage, tempMixedHistories };
  } catch (error) {
    console.log(error);
  }
};
