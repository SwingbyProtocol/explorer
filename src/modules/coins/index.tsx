import { SkybridgeBridge } from '@swingby-protocol/sdk';

export const CoinSymbol = {
  BTC: 'BTC',
  BTC_S: 'BTC.S',
  BTC_B: 'BTCB',
  BTC_B_918: 'BTC.B-918',
  BTCB_1DE: 'BTCB-1DE',
  BTC_B_888: 'BTC.B-888',
  BTC_E: 'BTCE',
  BNB: 'BNB',
  WBTC: 'WBTC',
  ETH_SB_BTC: 'sbBTC',
};

// Memo: Ethereumwallet address
export const EthereumWalletAddressCoins = [
  CoinSymbol.ETH_SB_BTC,
  CoinSymbol.WBTC,
  CoinSymbol.BTC_E,
  CoinSymbol.BTC_B,
];

export const ETHCoins = [CoinSymbol.ETH_SB_BTC, CoinSymbol.WBTC, CoinSymbol.BTC_E];

export const BTCBCoins = [
  CoinSymbol.BTC_B,
  CoinSymbol.BTCB_1DE,
  CoinSymbol.BTC_B_888,
  CoinSymbol.BTC_S,
];

export const getBridgeBtc = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return CoinSymbol.WBTC;

    case 'btc_bep':
      return CoinSymbol.BTC_B;

    default:
      return CoinSymbol.WBTC;
  }
};
