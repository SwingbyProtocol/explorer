export {
  loadHistory,
  currencyNetwork,
  statusColor,
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
  volume24HrWBTC: number;
  volume24HrBTC: number;
  rewards24Hr: number;
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
  isHideWaiting: boolean;
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
    volume24HrWBTC: number;
    volume24HrBTC: number;
    rewards24Hr: number;
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

export type TTheme = 'dark' | 'light' | null;

export interface IloadHistoryArgs {
  page: number;
  query: string;
  hash: string;
  isHideWaiting: boolean;
  bridge: string;
  prevTxsWithPage: ITransactions;
}
