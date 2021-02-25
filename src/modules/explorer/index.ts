export {
  loadHistory,
  currencyNetwork,
  TxStatus,
  removeDuplicatedTxs,
  convertTxTime,
  fetchFloatBalances,
  fetchStatsInfo,
  getUsdPrice,
  calculateFixedFee,
  getTransactionFees,
  exponentialToNumber,
  capitalize,
  toBTC,
  toSatoshi,
  isEtherAddress,
  isBinanceAddress,
  isBitcoinAddress,
  checkIsValidAddress,
  checkIsValidAmount,
  convertDateTime,
  getBorderColor,
} from './utils';

export { TxRowTransition, TxRowVariants } from './animation';

export const BRIDGE = {
  ethereum: 'Ethereum',
  multipleBridges: 'Multiple-Bridges',
  binance: 'Binance',
};

// Memo: interface
export type TCurrency = 'BTC' | 'WBTC' | 'sbBTC' | 'BTCB';
export interface FloatRawObject {
  addressDeposit: string;
  addressIn: string;
  addressOut: string;
  amountIn: string;
  amountOut: string;
  currencyIn: TCurrency;
  currencyOut: TCurrency;
  hash: string;
  status: TStatus;
  timestamp: number;
  txIdIn?: string;
  fee?: string;
  txIdOut?: string;
  rewards?: Reward[];
  feeCurrency?: TCurrency;
}

export interface SwapRawObject {
  addressIn: string;
  addressOut: string;
  amountIn: string;
  amountOut: string;
  currencyIn: TCurrency;
  currencyOut: TCurrency;
  fee?: string;
  hash?: string;
  feeCurrency: TCurrency;
  status: TStatus;
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
  btc: number;
  wbtc: number;
}

export interface IStats {
  volume1wksWBTC: number;
  volume1wksBTC: number;
  rewards1wksSbBTC: number;
  rewards1wksSWINGBY: number;
  volumes: string[];
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
    btc: number;
    wbtc: number;
  };
  stats: {
    volume1wksWBTC: number;
    volume1wksBTC: number;
    rewards1wksSbBTC: number;
    rewards1wksSWINGBY: number;
    volumes: string[];
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
