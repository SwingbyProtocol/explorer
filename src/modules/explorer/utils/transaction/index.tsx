import { getStatusColor, PulsarThemeType } from '@swingby-protocol/pulsar';
import { SkybridgeBridge, SkybridgeStatus } from '@swingby-protocol/sdk';
import {
  SkybridgeCurrency,
  SkybridgeQuery,
} from '@swingby-protocol/sdk/dist/modules/common-params';
import { DateTime, Interval } from 'luxon';
import { transparentize } from 'polished';
import { FormattedDate, FormattedRelativeTime, FormattedTime } from 'react-intl';

import { CoinSymbol } from '../../../coins';
import { PAGE_COUNT } from '../../../env';
import { SkyPoolsQuery, TStatus } from '../../index';
import { isAddress } from '../validator';

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
  switch (currency) {
    case CoinSymbol.BTC:
      return CoinSymbol.BTC;

    case CoinSymbol.BTC_B:
      return 'BTCB on Skypools';

    case CoinSymbol.WBTC:
      return 'WBTC on Ethereum';

    case CoinSymbol.ERC20_SB_BTC:
      return 'sbBTC on Ethereum';

    default:
      return currency;
  }
};

export const calDiffDays = (unixTimestamp: number): number => {
  const ts = unixTimestamp * 1000;
  const txTime = DateTime.fromMillis(ts).toLocal();
  const now = DateTime.local();
  const diffDays = Math.floor(Math.abs(now.endOf('day').diff(txTime).as('days')));
  return diffDays;
};

export const getDiffDays = (unixTimestamp: number) => {
  const diffDays = calDiffDays(unixTimestamp);
  return <FormattedRelativeTime value={diffDays} unit="day" numeric="auto" />;
};

export const convertTxTime = (txTimeParam: number | DateTime) => {
  const txTime =
    typeof txTimeParam === 'number'
      ? DateTime.fromMillis(txTimeParam * 1000).toLocal()
      : txTimeParam;
  const ts = txTime.toMillis();

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
      hour="numeric"
      minute="numeric"
      year="numeric"
      month="short"
      day="2-digit"
      hourCycle="h23"
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

export const getRequiredBlockConfirmations = (currencyIn: CoinSymbol) => {
  if (currencyIn === CoinSymbol.BTC) {
    return '< 2';
  } else {
    return '< 10';
  }
};

export const castUiStatus = (status: SkybridgeStatus) => {
  if (status === TxStatus.SIGNING) {
    return 'Processing';
  } else {
    return capitalize(status);
  }
};

const {
  COMPLETED,
  REJECTED,
  CANCELED,
  SENDING,
  PENDING,
  SIGNING,
  REFUNDING,
  SIGNING_REFUND,
  REFUNDED,
} = TxStatus;

export const generateQueryEndpoint = ({
  baseUrl,
  page,
  query,
  isRejectedTx,
  hash,
}: {
  baseUrl: string;
  page: number;
  query: string;
  isRejectedTx: boolean;
  hash: string;
}): string => {
  if (hash !== '') {
    return `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&hash=${hash}&sort=0`;
  }

  if (query && query[query.length - 1] === '=') {
    return `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&hash=${query}&sort=0`;
  }

  if (query === '') {
    if (!isRejectedTx) {
      // Memo: Showing success txs only
      // Memo: Hiding `Waiting` and kind of `Rejected` status due to many user swapped with wrong amount.
      return `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&status=${COMPLETED},${SENDING},${PENDING},${SIGNING}&sort=0`;
    } else {
      const url = `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&status=${REJECTED},${CANCELED},${REFUNDING},${SIGNING_REFUND},${REFUNDED}&sort=0`;
      return url;
    }
    // Memo: Search the query
  } else {
    const isAddr = isAddress(query);
    const f = isAddr ? 'address' : 'hash';
    const url = `${baseUrl}?page=${page}&page_size=${PAGE_COUNT}&OR_in_${f}=${query}&OR_out_${f}=${query}&sort=0`;
    return url;
  }
};

export const castSkyPoolsCurrency = ({
  currency,
  bridge,
}: {
  currency: SkybridgeCurrency;
  bridge: SkybridgeBridge;
}): CoinSymbol => {
  switch (currency) {
    case 'BTCB':
      return CoinSymbol.BTC_B;
    case 'sbBTC':
      return bridge === 'btc_erc' ? CoinSymbol.ERC20_SB_BTC : CoinSymbol.BEP20_SB_BTC;
    case 'SKYPOOL':
      return bridge === 'btc_erc' ? CoinSymbol.WBTC : CoinSymbol.BTC_B;

    default:
      return currency as CoinSymbol;
  }
};

export const castTxForSkyPools = ({
  bridge,
  tx,
}: {
  bridge: SkybridgeBridge;
  tx: SkybridgeQuery;
}): SkyPoolsQuery => {
  return {
    ...tx,
    currencyIn: castSkyPoolsCurrency({ bridge, currency: tx.currencyIn }),
    currencyOut: castSkyPoolsCurrency({ bridge, currency: tx.currencyOut }),
    feeCurrency: castSkyPoolsCurrency({
      bridge,
      currency: tx.feeCurrency as SkybridgeCurrency,
    }),
  };
};
