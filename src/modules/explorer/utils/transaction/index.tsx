import { DateTime, Interval } from 'luxon';
import { FormattedDate, FormattedRelativeTime, FormattedTime } from 'react-intl';

import { BTCBCoins, CoinSymbol, ETHCoins } from '../../../coins';
import { SwapRawObject } from '../../index';

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

export const convertTxTime = (unixTimestamp: number) => {
  const ts = unixTimestamp * 1000;
  const txTime = DateTime.fromMillis(ts).toLocal();

  const now = DateTime.local();
  const Ago60Mins = now.minus({ hours: 1 });

  if (Interval.fromDateTimes(Ago60Mins, now).contains(txTime)) {
    return (
      <FormattedRelativeTime
        value={(ts - Date.now()) / 1000}
        numeric="auto"
        updateIntervalInSeconds={1}
        style="short" // eslint-disable-line react/style-prop-object
      />
    );
  }

  const diffDays = Math.floor(Math.abs(now.endOf('day').diff(txTime).as('days')));
  if (diffDays < 2) {
    return (
      <>
        <FormattedTime value={ts} hour12={false} />
        &nbsp;
        <FormattedRelativeTime value={-diffDays} unit="day" numeric="auto" />
      </>
    );
  }

  return (
    <FormattedDate
      value={ts}
      format="auto"
      hour="numeric"
      minute="numeric"
      year="numeric"
      month="short"
      day="2-digit"
      hour12={false}
    />
  );
};
