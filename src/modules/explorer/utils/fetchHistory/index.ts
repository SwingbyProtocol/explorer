import { get } from '../../../apiClient';
import { ITransactions, SwapRawObject, IFetchSwapHistoryResponse } from '../../index';

import { TxStatus } from './../transaction';
import { PAGE_COUNT, ENDPOINT_API } from './../../../env';
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

export const fetchHistory = async (
  page: number,
  query: string,
  prev: ITransactions | null,
  isHideWaiting: boolean,
) => {
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
      if (!isHideWaiting) {
        url = `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&sort=0`;
        nextPageUrl = `${baseUrl}?page=${page + 1}&page_size=${PAGE_COUNT}&sort=0`;
      } else {
        url = `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&status=${COMPLETED},${REJECTED},${CANCELED},${BROADCASTED},${SENDING},${PENDING},${SIGNING},${REFUNDING},${SIGNING_REFUND},${REFUNDED}&sort=0`;
        nextPageUrl = `${baseUrl}?page=${
          page + 1
        }&page_size=${PAGE_COUNT}&status=${COMPLETED},${REJECTED},${CANCELED},${BROADCASTED},${SENDING},${PENDING},${SIGNING},${REFUNDING},${SIGNING_REFUND},${REFUNDED}&sort=0`;
      }
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
    console.log('hello');
    console.log('txsWithPage', txsWithPage);

    return txsWithPage;
  } catch (error) {
    console.log(error);
  }
};
