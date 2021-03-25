import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { TransactionCurrency } from '../../generated/graphql';
import { TTxRawObject } from '../explorer';

export type TBtcCurrency = 'BTC' | 'BTCB.BEP20' | 'WBTC';
export type TSbBTC = 'sbBTC' | 'sbBTC.BEP20';

export enum CoinSymbol {
  BTC = 'BTC',
  BTC_B = 'BTCB.BEP20',
  WBTC = 'WBTC',
  ERC20_SB_BTC = 'sbBTC',
  BEP20_SB_BTC = 'sbBTC.BEP20',
}

// Memo: Ethereumwallet address
export const EthereumWalletAddressCoins = [
  CoinSymbol.ERC20_SB_BTC,
  CoinSymbol.BEP20_SB_BTC,
  CoinSymbol.WBTC,
  CoinSymbol.BTC_B,
];

export const ETHCoins = [CoinSymbol.ERC20_SB_BTC, CoinSymbol.WBTC];

export const BTCBCoins = [CoinSymbol.BTC_B, CoinSymbol.BEP20_SB_BTC];

export const getBridgeBtc = (bridge: SkybridgeBridge): CoinSymbol => {
  switch (bridge) {
    case 'btc_erc':
      return CoinSymbol.WBTC;

    case 'btc_bep20':
      return CoinSymbol.BTC_B;

    default:
      return CoinSymbol.WBTC;
  }
};

export const getBridgeSbBtc = (bridge: SkybridgeBridge): CoinSymbol => {
  switch (bridge) {
    case 'btc_erc':
      return CoinSymbol.ERC20_SB_BTC;

    case 'btc_bep20':
      return CoinSymbol.BEP20_SB_BTC;

    default:
      return CoinSymbol.ERC20_SB_BTC;
  }
};

export const getTxBridge = (tx: TTxRawObject): SkybridgeBridge => {
  if (BTCBCoins.includes(tx.currencyIn) || BTCBCoins.includes(tx.currencyOut)) {
    return 'btc_bep20';
  }

  return 'btc_erc';
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

    case TransactionCurrency.BtcbBep20:
      return CoinSymbol.BTC_B;

    case TransactionCurrency.SbBtcBep20:
      return CoinSymbol.BEP20_SB_BTC;

    default:
      return currency as CoinSymbol;
  }
};
