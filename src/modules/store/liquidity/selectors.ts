import { DefaultRootState } from 'react-redux';

import { LiquidityRecentTx, LiquidityState } from '../types';
import { PoolMode } from '../../pool';

export const liquiditySelector = (state: DefaultRootState): LiquidityState => state.liquidity;

// @todo (agustin) add redux toolkit and use createSelector with liquiditySelector
export const liquidityMinimumWithdrawAmountSelector = (state: DefaultRootState): number =>
  state.liquidity.minimumWithdrawAmount;

export const liquidityRecentTxsSelector = (state: DefaultRootState): LiquidityRecentTx =>
  state.liquidity.recentTxs;

export const liquidityModeSelector = (state: DefaultRootState): PoolMode => state.liquidity.mode;
