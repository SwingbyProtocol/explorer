import { SkybridgeBridge } from '@swingby-protocol/sdk';

export const CoinSymbol = {
  BTC: 'BTC',
  BTC_B: 'BTCB.BEP20',
  BTC_E: 'BTCE',
  BNB: 'BNB',
  WBTC: 'WBTC',
  ERC20_SB_BTC: 'sbBTC',
  BEP20_SB_BTC: 'sbBTC.BEP20',
};

// Memo: Ethereumwallet address
export const EthereumWalletAddressCoins = [
  CoinSymbol.ERC20_SB_BTC,
  CoinSymbol.BEP20_SB_BTC,
  CoinSymbol.WBTC,
  CoinSymbol.BTC_E,
  CoinSymbol.BTC_B,
];

export const ETHCoins = [CoinSymbol.ERC20_SB_BTC, CoinSymbol.WBTC, CoinSymbol.BTC_E];

export const BTCBCoins = [CoinSymbol.BTC_B, CoinSymbol.BEP20_SB_BTC];

export const getBridgeBtc = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return CoinSymbol.WBTC;

    case 'btc_bep20':
      return CoinSymbol.BTC_B;

    default:
      return CoinSymbol.WBTC;
  }
};
