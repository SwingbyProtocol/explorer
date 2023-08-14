import { DefaultRootState } from 'react-redux';

import { ExplorerState, NetworkInfo, NetworkStats, USDPrices } from '../types';
import { IFee } from '../../explorer';

export const explorerSelector = (state: DefaultRootState): ExplorerState => state.explorer;

// @todo (agustin) add redux toolkit and use createSelector with explorerSelector
export const networkInfoSelector = (state: DefaultRootState): NetworkInfo =>
  state.explorer.networkInfos;

// @todo (agustin) add redux toolkit and use createSelector with networkInfoSelector
export const statsSelector = (state: DefaultRootState): NetworkStats =>
  state.explorer.networkInfos.stats;

// @todo (agustin) add redux toolkit and use createSelector with explorerSelector
export const transactionFeesSelector = (state: DefaultRootState): IFee[] =>
  state.explorer.transactionFees;

export const usdPricesSelector = (state: DefaultRootState): USDPrices => state.explorer.usd;

// @todo (agustin) add redux toolkit and use createSelector with usdPricesSelector
export const btcUSDPriceSelector = (state: DefaultRootState): number => state.explorer.usd.BTC;

// @todo (agustin) add redux toolkit and use createSelector with usdPricesSelector
export const swingbyUSDPriceSelector = (state: DefaultRootState): number =>
  state.explorer.usd.SWINGBY;

export const explorerLoadingSelector = (state: DefaultRootState): boolean =>
  state.explorer.isLoading;

export const resolveAddressSelector = (address: string) => (
  state: DefaultRootState,
): string | undefined => state.explorer.resolvedAddresses[address];
