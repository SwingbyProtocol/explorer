export { fetchHistory, currencyNetwork, statusColor, TxStatus, removeDuplicatedTxs } from './utils';

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
