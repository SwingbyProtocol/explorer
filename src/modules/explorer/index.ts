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
} from './utils';

export const BRIDGE = {
  multipleBridges: 'Multiple Bridges',
  binance: 'Binance',
  ethereum: 'Ethereum',
};

// Memo: interface
export interface SwapRawObject {
  addressIn: string;
  addressOut: string;
  amountIn: string;
  amountOut: string;
  currencyIn: string;
  currencyOut: string;
  fee?: string;
  hash?: string;
  feeCurrency: string;
  status: string;
  timestamp?: number;
  txIdIn?: string;
  txIdOut?: string;
  rewards?: Reward[];
}

export interface IFetchSwapHistoryResponse {
  items: SwapRawObject[];
  total: number;
}

export interface ITransactions {
  data: {
    [page: number]: SwapRawObject[];
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
  btcb: number;
  bnb: number;
  btce: number;
}

export interface IStats {
  volume24HrBinance: number;
  volume24HrEthereum: number;
  volume24HrBtc: number;
  rewards24Hr: number;
  volumes: string[];
  metanodes: number;
}

export interface IFetchHistory {
  txs: SwapRawObject[];
  duplicatedTxQTY: number;
  total: number;
}
export interface ILoadHistory {
  txsWithPage: ITransactions;
  tempMixedHistories: SwapRawObject[];
}
export interface IFloatBalances {
  floats: IFloat;
  capacity: number;
}
export interface IFetchUsd {
  BTC: number;
  BNB: number;
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
  swapHistoryTemp: SwapRawObject[] | null;
}

export interface INetworkInfos {
  capacity: number;
  floatBalances: {
    btc: number;
    btcb: number;
    bnb: number;
    btce: number;
  };
  stats: {
    volume24HrBinance: number;
    volume24HrEthereum: number;
    volume24HrBtc: number;
    rewards24Hr: number;
    volumes: string[];
    metanodes: number;
  };
}

export interface IFloatAmount {
  amount: string;
  currency: string;
}

export type TStatus = 'waiting' | 'pending' | 'sending' | 'completed';
