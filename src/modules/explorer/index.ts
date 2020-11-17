export {
  loadHistory,
  currencyNetwork,
  statusColor,
  TxStatus,
  removeDuplicatedTxs,
  convertTxTime,
  fetchFloatBalances,
  fetchStatsInfo,
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
  btc: string;
  btcb: string;
  bnb: string;
}

export interface IStats {
  volume24Hr: string;
  rewards24Hr: number;
  volumes: string[];
  metanodes: number;
}

export interface IFetchHistory {
  txs: SwapRawObject[];
  duplicatedTxQTY: number;
  total: number;
}
