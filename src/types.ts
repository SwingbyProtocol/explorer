import { isProduction } from './utils/isProduction';
export const CoinSymbol = {
  BTC: 'BTC',
  BTC_S: 'BTC.S',
  BTC_B: isProduction() ? 'BTCB' : 'BTC.B',
  BTC_B_918: 'BTC.B-918',
  BTCB_1DE: 'BTCB-1DE',
  BTC_B_888: 'BTC.B-888',
  BTC_E: 'BTCE',
  BNB: 'BNB',
  REN_BTC: 'REN-BTC',
  WBTC: 'WBTC',
};

export const ETHCoins = [CoinSymbol.REN_BTC, CoinSymbol.WBTC, CoinSymbol.BTC_E];

export const BNBCoins = [CoinSymbol.BTC_B, CoinSymbol.BTCB_1DE, CoinSymbol.BTC_B_888];

export interface IFetchSwapHistoryResponse {
  items: SwapRawObject[];
  itemCount: number;
  total: number;
}

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

export interface Reward {
  address: string;
  amount: string;
  txId?: string;
}

export interface VinObject {
  txid: string;
  vout: number;
  sequence: number;
}

export interface VoutObject {
  value: string;
  spent: boolean;
  txs: string[];
  n: number;
  scriptPubkey: any;
}

export interface WSTxObject {
  txid: string;
  hash: string;
  confirms: number;
  receivedtime: number;
  minedtime: number;
  mediantime: number;
  version: number;
  weight: number;
  locktime: number;
  vin: VinObject[];
  vout: VoutObject[];
}

export interface WSMessagePayload {
  action: string;
  result: string;
  message: string;
  txs: WSTxObject[];
}

export const WSActions = {
  WATCH_TXS: 'watchTxs',
};

export const DocumentTitle = {
  Explorer: 'Swingby Explorer',
};
