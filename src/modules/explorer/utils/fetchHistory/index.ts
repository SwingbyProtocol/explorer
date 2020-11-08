import { get } from '../../../apiClient';
import { ITransactions, PAGE_COUNT, SwapRawObject, IFetchSwapHistoryResponse } from '../../index';

import { isAddress } from './../validator';
import { ENDPOINT_API } from './../../../env';

export const fetchHistory = async (page, query, prev) => {
  const baseUrl = ENDPOINT_API.BTCB_NODE + '/api/v1/swaps/query';

  let txsWithPage: ITransactions = {
    data: {},
    total: 0,
  };

  if (prev !== null && page !== 0) {
    txsWithPage = prev;
  }

  try {
    let url = '';
    let nextPageUrl = '';
    if (query === '') {
      url = `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&sort=0`;
      nextPageUrl = `${baseUrl}?page=${page + 1}&page_size=${PAGE_COUNT}&sort=0`;
    } else {
      const isAddr = isAddress(query);
      const f = isAddr ? 'address' : 'hash';

      url = `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&OR_in_${f}=${query}&OR_out_${f}=${query}&sort=0`;
      nextPageUrl = `${baseUrl}?page=${
        page + 1
      }&page_size=${PAGE_COUNT}&OR_in_${f}=${query}&OR_out_${f}=${query}&sort=0`;
    }
    const res = await get(url);
    // @ts-ignore
    const txRes: IFetchSwapHistoryResponse = await res.parsedBody;
    const txsResItems: SwapRawObject[] = txRes.items;

    // Memo: Remove the duplicated txIdIn
    const txs: SwapRawObject[] = txsResItems.filter(
      (tx, idx, self) => !tx.txIdIn || self.findIndex((_tx) => _tx.txIdIn === tx.txIdIn) === idx,
    );

    const nextPageRes = await get(nextPageUrl);
    // @ts-ignore
    const nextPageTxRes: IFetchSwapHistoryResponse = await nextPageRes.parsedBody;
    const nextPageTxsResItems: SwapRawObject[] = nextPageTxRes.items;
    const nextPageTxs: SwapRawObject[] = nextPageTxsResItems.filter(
      (tx, idx, self) => !tx.txIdIn || self.findIndex((_tx) => _tx.txIdIn === tx.txIdIn) === idx,
    );
    const delta = txsResItems.length + nextPageTxsResItems.length - txs.length - nextPageTxs.length;

    txsWithPage = {
      data: {
        // Memo: Merge the new one with the previous one.
        ...txsWithPage.data,
        [page]: txs,
        [page + 1]: nextPageTxs,
      },
      total: txRes.total - delta,
    };

    return txsWithPage;
  } catch (error) {
    console.log(error);
  }
};
