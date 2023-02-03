import { DateTime } from 'luxon';

import { Bridge, Transaction, TransactionStatus, TransactionType } from '../../generated/graphql';

import { castCurrencyName, CoinSymbol } from './../coins';

export { TxRowTransition, TxRowVariants } from './animation';
export {
  calculateFixedFee,
  capitalize,
  checkIsValidAddress,
  checkIsValidAmount,
  convertDateTime,
  convertTxTime,
  currencyNetwork,
  exponentialToNumber,
  fetchFloatBalances,
  fetchVolumeInfo,
  fetch1wksRewards,
  getBorderColor,
  getDiffDays,
  getTransactionFees,
  getTransactionFee,
  getUsdPrice,
  isBitcoinAddress,
  isEtherAddress,
  toBTC,
  toSatoshi,
  TxStatus,
  castToBackendVariable,
  getFloatBalance,
  getFixedBaseEndpoint,
  getRequiredBlockConfirmations,
  fetchVwap,
  castUiStatus,
} from './utils';

export const selectableBridge = [
  {
    menu: 'Multiple Bridges',
    bridge: '' as Bridge,
  },
  {
    menu: 'Skypools',
    bridge: Bridge.BtcSkypool as Bridge,
  },
];

export const selectableTxType = [
  {
    menu: 'home.recent-swaps.filter.swap',
    type: '' as TransactionType,
  },
  {
    menu: 'home.recent-swaps.filter.deposit',
    type: TransactionType.Deposit as TransactionType,
  },
  {
    menu: 'home.recent-swaps.filter.withdrawal',
    type: TransactionType.Withdrawal as TransactionType,
  },
];

export interface FloatRawObject {
  addressDeposit: string;
  addressIn: string;
  addressOut: string;
  amountIn: string;
  amountOut: string;
  currencyIn: CoinSymbol;
  currencyOut: CoinSymbol;
  hash: string;
  status: TransactionStatus;
  timestamp: number;
  txIdIn?: string;
  fee?: string;
  txIdOut?: string;
  rewards?: Reward[];
  feeCurrency?: CoinSymbol;
}

export interface SwapRawObject {
  addressIn: string;
  addressOut: string;
  amountIn: string;
  amountOut: string;
  currencyIn: CoinSymbol;
  currencyOut: CoinSymbol;
  fee?: string;
  hash?: string;
  status: TransactionStatus;
  feeCurrency: CoinSymbol;
  timestamp?: number;
  txIdIn?: string;
  txIdOut?: string;
  rewards?: Reward[];
}

export type TTxRawObject = SwapRawObject | FloatRawObject;

export interface IFetchSwapHistoryResponse {
  items: TTxRawObject[];
  total: number;
}

export interface ITransactions {
  data: {
    [page: number]: TTxRawObject[];
  };
  total: number;
}

export interface Reward {
  address: string;
  amount: string;
  txId: string;
}

export interface IFloat {
  btcSkypool: number;
  wbtcSkypool: number;
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
  txs: TTxRawObject[];
  total: number;
}
export interface ILoadHistory {
  txsWithPage: ITransactions;
  tempMixedHistories: TTxRawObject[];
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

export interface ILoadHistoryArgs {
  page: number;
  query: string;
  hash: string;
  isRejectedTx: boolean;
  bridge: string;
  prevTxsWithPage: ITransactions | null;
  swapHistoryTemp: TTxRawObject[] | null;
}

export interface INetworkInfos {
  capacity: number;
  floatBalances: {
    btcSkypool: number;
    wbtcSkypool: number;
  };
  stats: {
    volume1wksWBTC_Skypool: number;
    volume1wksBTC: number;
    rewards1wksUSD: number;
    volumes: IChartDate[];
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

export interface IloadHistoryArgs {
  page: number;
  query: string;
  hash: string;
  isRejectedTx: boolean;
  bridge: string;
  prevTxsWithPage: ITransactions;
}

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

export const castGraphQlType = (tx: Transaction): TTxRawObject => {
  return {
    addressIn: tx.sendingAddress ? tx.sendingAddress : '',
    addressOut: tx.receivingAddress,
    amountIn: tx.depositAmount,
    amountOut: tx.receivingAmount,
    currencyIn: castCurrencyName(tx.depositCurrency),
    currencyOut: castCurrencyName(tx.receivingCurrency),
    fee: tx.feeTotal,
    hash: tx.id,
    feeCurrency: castCurrencyName(tx.feeCurrency),
    status: tx.status,
    timestamp: DateTime.fromISO(tx.at).toSeconds(),
    txIdIn: tx.depositTxHash,
    txIdOut: tx.receivingTxHash,
  };
};

export interface ISwapQueryPrams {
  bridge: Bridge | '';
  type: TransactionType | '';
  q: string | '';
  rejected: string | '';
}

export interface IChartDate {
  at: string;
  amount: string;
  count?: string;
}
