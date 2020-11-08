export { fetchHistory, currencyNetwork, statusColor, currencyImg, TxStatus } from './utils';

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
  itemCount: number;
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
