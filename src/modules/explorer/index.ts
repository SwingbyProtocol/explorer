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
  txId?: string;
}

export interface IFloatBalance {
  'BTCB-1DE': string;
  BNB: string;
  BTC: IBtcFloatBalance;
}

export interface IBtcFloatBalance {
  confirmed: string;
  unconfirmed: string;
}

export interface IFloat {
  btc: number;
  btcb: number;
  bnb: number;
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
  btc: number;
  bnb: number;
}
