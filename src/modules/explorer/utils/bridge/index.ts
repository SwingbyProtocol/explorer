import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { CoinSymbol } from '../../../coins';

export const getBridge = ({
  currencyIn,
  currencyOut,
}: {
  currencyIn: CoinSymbol;
  currencyOut: CoinSymbol;
}): SkybridgeBridge => {
  if (currencyIn === CoinSymbol.BTC) {
    switch (currencyOut) {
      case CoinSymbol.BEP20_SB_BTC:
        return 'btc_bep20';
      case CoinSymbol.BTC_B:
        return 'btc_bep20';
      default:
        return 'btc_erc';
    }
  } else {
    switch (currencyIn) {
      case CoinSymbol.BEP20_SB_BTC:
        return 'btc_bep20';
      case CoinSymbol.BTC_B:
        return 'btc_bep20';
      default:
        return 'btc_erc';
    }
  }
};
