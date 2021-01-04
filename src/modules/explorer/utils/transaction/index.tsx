import { PulsarThemeType, getStatusColor } from '@swingby-protocol/pulsar';
import { DateTime, Interval } from 'luxon';
import { FormattedDate, FormattedRelativeTime, FormattedTime } from 'react-intl';
import { transparentize } from 'polished';

import { BTCBCoins, CoinSymbol, ETHCoins } from '../../../coins';
import { TStatus, TTxRawObject } from '../../index';

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
  EXPIRED: 'EXPIRED',
};

export const getBorderColor = ({
  status,
  theme,
}: {
  status: TStatus;
  theme: PulsarThemeType;
}): string => {
  return `2px solid ${transparentize(0.65)(getStatusColor({ status, theme }))}`;
};

export const currencyNetwork = (currency: string): string => {
  if (currency === CoinSymbol.BTC) {
    return CoinSymbol.BTC;
  }
  if (BTCBCoins.includes(currency)) {
    return 'BTC on Bnbchain';
  }
  if (ETHCoins.includes(currency)) {
    return 'BTC on Ethereum';
  }
  return '';
};

export const removeDuplicatedTxs = (txArray: TTxRawObject[], filterBy?: string): TTxRawObject[] => {
  if (filterBy === 'txId') {
    return txArray.filter(
      (tx, idx, self) => !tx.txIdIn || self.findIndex((_tx) => _tx.txIdIn === tx.txIdIn) === idx,
    );
  } else {
    return txArray.filter(
      (tx, index, self) =>
        self.findIndex(
          (t: TTxRawObject) => t.timestamp === tx.timestamp && t.addressIn === tx.addressIn,
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
        <FormattedTime value={ts} hourCycle="h23" />
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
      hourCycle="h23"
    />
  );
};

export const convertDateTime = (unixTimestamp: number) => {
  const ts = unixTimestamp * 1000;

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

export const capitalize = (s: string): string => {
  if (s === TxStatus.SIGNING_REFUND) {
    return 'Signing refund';
  }
  if (s === TxStatus.SENDING_REFUND) {
    return 'Sending refund';
  }
  const word = s.toLowerCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
};
