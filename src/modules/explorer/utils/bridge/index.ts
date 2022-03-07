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
      default:
        return 'btc_erc';
    }
  } else {
    switch (currencyIn) {
      default:
        return 'btc_erc';
    }
  }
};
