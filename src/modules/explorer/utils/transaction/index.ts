import { DateTime, Interval } from 'luxon';

import { BTCBCoins, CoinSymbol, ETHCoins } from '../../../coins';

import { SwapRawObject } from './../../index';

export const TxStatus = {
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
  WAITING: 'WAITING',
  BROADCASTED: 'BROADCASTED',
  SENDING: 'SENDING',
  PENDING: 'PENDING',
  SIGNING: 'SIGNING',
  SENT: 'SENT',
  REFUNDING: 'REFUNDING',
  SIGNING_REFUND: 'SIGNING_REFUND',
  REFUNDED: 'REFUNDED',
  SENDING_REFUND: 'SENDING_REFUND',
};

const {
  COMPLETED,
  REJECTED,
  CANCELED,
  REFUNDING,
  SIGNING_REFUND,
  REFUNDED,
  SENDING_REFUND,
} = TxStatus;

const rejectStatus = [REJECTED, CANCELED, REFUNDED, REFUNDING, SIGNING_REFUND, SENDING_REFUND];

type statusType = 'success' | 'danger' | 'warning';

export const statusColor = (status: string): statusType => {
  if (status === COMPLETED) {
    return 'success';
  } else if (rejectStatus.includes(status)) {
    return 'danger';
  } else {
    return 'warning';
  }
};

export const currencyNetwork = (currency: string): string => {
  if (currency === CoinSymbol.BTC) {
    return CoinSymbol.BTC;
  } else if (BTCBCoins.includes(currency)) {
    return 'BTC on Bnbchain';
  } else if (ETHCoins.includes(currency)) {
    return 'BTC on Ethereum';
  }
};

export const removeDuplicatedTxs = (
  txArray: SwapRawObject[],
  filterBy?: string,
): SwapRawObject[] => {
  if (filterBy === 'txId') {
    return txArray.filter(
      (tx, idx, self) => !tx.txIdIn || self.findIndex((_tx) => _tx.txIdIn === tx.txIdIn) === idx,
    );
  } else {
    return txArray.filter(
      (tx, index, self) =>
        self.findIndex(
          (t: SwapRawObject) => t.timestamp === tx.timestamp && t.addressIn === tx.addressIn,
        ) === index,
    );
  }
};

export const getTime = (unixTimestamp: number): string => {
  let formattedTime: string;
  const ts = unixTimestamp * 1000;
  const txTime = DateTime.fromMillis(ts);
  const now = DateTime.local();
  const Ago60Mins = now.minus({ hours: 1 });

  if (Interval.fromDateTimes(Ago60Mins, now).contains(txTime)) {
    formattedTime = txTime.toFormat('mm') + ' min. ago';
  } else if (txTime.toLocaleString() === now.toLocaleString()) {
    formattedTime = txTime.toFormat('hh:mm') + ' Today';
  } else {
    formattedTime = txTime.toFormat('hh:mm dd/MM/yy');
  }

  return formattedTime;
};
