import { SkybridgeBridge, SkybridgeQuery } from '@swingby-protocol/sdk';

import { CoinSymbol } from '../coins';

export { TxRowTransition, TxRowVariants } from './animation';
export {
  calculateFixedFee,
  calDiffDays,
  capitalize,
  castSkyPoolsCurrency,
  castToBackendVariable,
  castTxForSkyPools,
  castUiStatus,
  checkIsValidAddress,
  checkIsValidAmount,
  convertDateTime,
  convertTxTime,
  currencyNetwork,
  exponentialToNumber,
  fetchFloatBalances,
  fetchDayVolumeInfo,
  fetchVwap,
  generateQueryEndpoint,
  getBaseEndpoint,
  getBorderColor,
  getBridge,
  getDiffDays,
  getEndpoint,
  getFixedBaseEndpoint,
  getFloatBalance,
  getRequiredBlockConfirmations,
  getTransactionFee,
  getTransactionFees,
  getUsdPrice,
  isBinanceAddress,
  isBitcoinAddress,
  isEtherAddress,
  toBTC,
  toSatoshi,
  TxStatus,
  fetchMonthlyVolumeInfo,
} from './utils';

export const selectableBridge = [
  {
    menu: 'Multiple Bridges',
    bridge: '',
  },
  {
    menu: 'Ethereum',
    bridge: 'btc_erc',
  },
];

export const selectableTxType = [
  {
    menu: 'home.recent-swaps.filter.swap',
    type: 'swaps',
  },
  {
    menu: 'home.recent-swaps.filter.deposit',
    type: 'floats',
  },
];

export interface Reward {
  address: string;
  amount: string;
  txId: string;
}

export interface IFloat {
  btcEth: number;
  btcBsc: number;
  wbtc: number;
}

export interface IStats {
  volume1wksWBTC: number;
  volume1wksBTCB: number;
  volume1wksBTC: number;
  rewards1wksUSD: number;
  volumes: IChartDate[];
  metanodes: number;
}

export interface IFetchHistory {
  txs: SkyPoolsQuery[];
  total: number;
}
export interface IFloatBalances {
  floats: IFloat;
  capacity: number;
}
export interface IFetchUsd {
  BTC: number;
  SWINGBY: number;
}

export interface IFee {
  bridgeFeePercent: string;
  currency: string;
  minerFee: string;
}

export interface INetworkInfos {
  capacity: number;
  floatBalances: {
    btcEth: number;
    wbtc: number;
  };
  stats: {
    volume1wksWBTC: number;
    volume1wksBTCB: number;
    volume1wksBTC: number;
    volumes: IChartDate[];
    volume1yrWBTC: number;
    volume1yrBTCB: number;
    volume1yrBTC: number;
    volumesYear: IChartDate[];
    metanodes: number;
  };
}

export interface IFloatAmount {
  amount: string;
  currency: string;
}

export type TStatus =
  | 'WAITING'
  | 'PENDING'
  | 'SIGNING'
  | 'SENDING'
  | 'COMPLETED'
  | 'SIGNING_REFUND'
  | 'SENDING_REFUND'
  | 'REFUNDED'
  | 'EXPIRED';

export type TSwapWidget = 'claim' | 'duplicate';

interface IStake {
  address: string;
  amount: string;
  stakeTime: number;
  stakeValid: boolean;
}

export interface IMetanode {
  location: string;
  code: string;
  moniker: string;
  stateName: string;
  stake: IStake;
  version: string;
}

export interface INodeEndpoint {
  btc_erc: string;
}

export interface ISwapQueryPrams {
  bridge: SkybridgeBridge | '';
  type: string;
  q: string | '';
  rejected: string | '';
  page: number;
}

export interface IChartDate {
  at: string;
  amount: string;
  count?: string;
}

// Ref: https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file
type Modify<T, R> = Omit<T, keyof R> & R;
export type SkyPoolsQuery = Modify<
  SkybridgeQuery,
  {
    currencyIn: CoinSymbol;
    currencyOut: CoinSymbol;
    feeCurrency: CoinSymbol;
  }
>;
