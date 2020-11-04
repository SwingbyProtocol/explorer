import { CoinSymbol } from '../constants';

export const getCoinIcon = (symbol: string): string => {
  switch (symbol) {
    case CoinSymbol.BTC:
      return 'assets/icons/coin/BTC.svg';
    case CoinSymbol.BTC_S:
      return 'assets/icons/coin/BTCB.svg';
    case CoinSymbol.BTC_B:
    case CoinSymbol.BTCB_1DE:
    case CoinSymbol.BTC_B_888:
      return 'assets/icons/coin/BTCB.svg';
    case CoinSymbol.REN_BTC:
      return 'assets/icons/coin/REN-BTC.svg';
    case CoinSymbol.WBTC:
      return 'assets/icons/coin/WBTC.svg';
    case CoinSymbol.BTC_E:
      return 'assets/icons/coin/BTCE.svg';
    case CoinSymbol.BNB:
      return 'assets/icons/coin/BNB.svg';
    default:
      return '';
  }
};
