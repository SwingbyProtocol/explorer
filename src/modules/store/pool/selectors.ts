import { DefaultRootState } from 'react-redux';

import { PoolRecentTx, PoolState } from '../types';
import { PoolMode } from '../../pool';

export const poolSelector = (state: DefaultRootState): PoolState => state.pool;

// @todo (agustin) add redux toolkit and use createSelector with poolSelector
export const poolMinimumWithdrawAmountSelector = (state: DefaultRootState): number =>
  state.pool.minimumWithdrawAmount;

export const poolRecentTxsSelector = (state: DefaultRootState): PoolRecentTx =>
  state.pool.recentTxs;

export const poolModeSelector = (state: DefaultRootState): PoolMode => state.pool.mode;
