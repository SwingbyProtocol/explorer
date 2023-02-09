import { getBridgeFor, SkybridgeBridge } from '@swingby-protocol/sdk';

import { TransactionCurrency } from '../../generated/graphql';
import { mode } from '../env';
import { TTxRawObject } from '../explorer';

export type TBtcCurrency = 'BTC' | 'WBTC.SKYPOOL' | 'WBTC';
export type TSbBTC = 'sbBTC' | 'sbBTC.SKYPOOL';

export enum CoinSymbol {
  BTC = 'BTC',
  SKYPOOL_WBTC = 'WBTC.SKYPOOL',
  WBTC = 'WBTC',
  ERC20_SB_BTC = 'sbBTC',
  SKYPOOL_SB_BTC = 'sbBTC.SKYPOOL',
}

// Memo: Ethereumwallet address
export const EthereumWalletAddressCoins = [
  CoinSymbol.ERC20_SB_BTC,
  CoinSymbol.SKYPOOL_SB_BTC,
  CoinSymbol.WBTC,
  CoinSymbol.SKYPOOL_WBTC,
];

export const ETHCoins = [CoinSymbol.ERC20_SB_BTC, CoinSymbol.WBTC, CoinSymbol.SKYPOOL_WBTC];
export const BTCCoins = [CoinSymbol.BTC];

export const getBridgeBtc = (bridge: SkybridgeBridge): CoinSymbol => {
  switch (bridge) {
    case 'btc_skypool':
      return CoinSymbol.SKYPOOL_WBTC;

    default:
      return CoinSymbol.SKYPOOL_WBTC;
  }
};

export const getBridgeSbBtc = (bridge: SkybridgeBridge): TSbBTC => {
  switch (bridge) {
    case 'btc_skypool':
      return CoinSymbol.SKYPOOL_SB_BTC;

    default:
      return CoinSymbol.SKYPOOL_SB_BTC;
  }
};

export const getTxBridge = (tx: TTxRawObject): SkybridgeBridge => {
  return getBridgeFor({
    context: { mode },
    currencyDeposit: tx.currencyIn,
    currencyReceiving: tx.currencyOut,
  });
};

// Memo: convert currency name from GraphQL data
export const castCurrencyName = (currency: TransactionCurrency): CoinSymbol => {
  switch (currency) {
    case TransactionCurrency.Btc:
      return CoinSymbol.BTC;

    case TransactionCurrency.WbtcErc20:
      return CoinSymbol.WBTC;

    case TransactionCurrency.SbBtcErc20:
      return CoinSymbol.ERC20_SB_BTC;

    case TransactionCurrency.WbtcSkypool:
      return CoinSymbol.SKYPOOL_WBTC;

    case TransactionCurrency.SbBtcSkypool:
      return CoinSymbol.SKYPOOL_SB_BTC;

    default:
      return currency as CoinSymbol;
  }
};

export const swingbyTextDisplay = (coin: CoinSymbol): string => {
  switch (coin) {
    case CoinSymbol.WBTC: {
      return 'WBTC (Legacy)';
    }
    case CoinSymbol.SKYPOOL_WBTC: {
      return 'WBTC';
    }
    case CoinSymbol.ERC20_SB_BTC: {
      return 'sbBTC (Legacy)';
    }
    case CoinSymbol.SKYPOOL_SB_BTC: {
      return 'sbBTC';
    }
    default: {
      return coin;
    }
  }
};
