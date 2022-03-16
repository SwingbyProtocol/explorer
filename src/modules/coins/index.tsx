import { SkybridgeBridge } from '@swingby-protocol/sdk';

export type TBtcCurrency = 'BTC' | 'WBTC';
export type TSbBTC = 'sbBTC';

export enum CoinSymbol {
  BTC = 'BTC',
  WBTC = 'WBTC',
  ERC20_SB_BTC = 'sbBTC',
}

// Memo: Ethereumwallet address
export const EthereumWalletAddressCoins = [CoinSymbol.WBTC];

export const ETHCoins = [CoinSymbol.WBTC];

export const getBridgeBtc = (bridge: SkybridgeBridge): CoinSymbol => {
  switch (bridge) {
    case 'btc_erc':
      return CoinSymbol.WBTC;

    default:
      return CoinSymbol.WBTC;
  }
};

export const getBridgeSbBtc = (bridge: SkybridgeBridge): TSbBTC => {
  switch (bridge) {
    case 'btc_erc':
      return CoinSymbol.ERC20_SB_BTC;

    default:
      return CoinSymbol.ERC20_SB_BTC;
  }
};
