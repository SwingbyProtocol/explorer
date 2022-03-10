import { DefaultRootState } from 'react-redux';

import { ExplorerState, NetworkStats, USDPrices } from '../types';

export const explorerSelector = (state: DefaultRootState): ExplorerState => state.explorer;

// @todo (agustin) add redux toolkit and use createSelector with explorerSelector
export const statsSelector = (state: DefaultRootState): NetworkStats =>
  state.explorer.networkInfos.stats;

export const usdPricesSelector = (state: DefaultRootState): USDPrices => state.explorer.usd;

export const explorerLoadingSelector = (state: DefaultRootState): boolean =>
  state.explorer.isLoading;
