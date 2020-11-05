import { isProduction } from '../explorer';

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
