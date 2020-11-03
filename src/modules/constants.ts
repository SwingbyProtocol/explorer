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
export const DocumentTitle = {
  Explorer: 'Swingby Explorer',
};

export const StylingConstants = {
  maxWidth: 445,
  media: {
    medium: 375,
    big: 510,
  },
};
