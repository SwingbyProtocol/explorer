import { CoinSymbol } from 'src/types';

import btc from '../assets/icons/coin/BTC.svg';
import btcs from '../assets/icons/coin/BTCB.svg';
import renBtc from '../assets/icons/coin/REN-BTC.svg';
import wbtc from '../assets/icons/coin/WBTC.svg';
import btce from '../assets/icons/coin/BTCE.svg';
import bnb from '../assets/icons/coin/BNB.svg';

export const getCoinIcon = (symbol: string): string => {
  switch (symbol) {
    case CoinSymbol.BTC:
      return btc;
    case CoinSymbol.BTC_S:
      return btcs;
    case CoinSymbol.BTC_B:
    case CoinSymbol.BTCB_1DE:
    case CoinSymbol.BTC_B_888:
      return btcs;
    case CoinSymbol.REN_BTC:
      return renBtc;
    case CoinSymbol.WBTC:
      return wbtc;
    case CoinSymbol.BTC_E:
      return btce;
    case CoinSymbol.BNB:
      return bnb;
    default:
      return '';
  }
};
