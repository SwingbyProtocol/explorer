import { Reducer } from 'redux';

import { PoolMode } from '../../pool';

enum Actions {
  SetBalanceLP = 'Liquidity/SET_BALANCE_LP',
  ToggleLiquidityMode = 'Liquidity/TOGGLE_LIQUIDITY_MODE',
  GetRecentTxs = 'Liquidity/GET_RECENT_TXS',
  ResetLiquidityState = 'Liquidity/RESET_LIQUIDITY_STATE',
  GetMinimumWithdrawAmount = 'Liquidity/GET_MINIMUM_WITHDRAW_AMOUNT',
}

const initialState = {
  mode: PoolMode.AddLiquidity,
  recentTxs: null,
  minimumWithdrawAmount: null,
};

type State = typeof initialState;

export const liquidity: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.ToggleLiquidityMode) {
    return { ...state, mode: action.data };
  }
  if (action.type === Actions.GetRecentTxs) {
    return { ...state, recentTxs: action.data };
  }

  if (action.type === Actions.GetMinimumWithdrawAmount) {
    return { ...state, minimumWithdrawAmount: action.data };
  }

  if (action.type === Actions.ResetLiquidityState) {
    return initialState;
  }

  return state;
};

export const resetLiquidityState = () => ({ type: Actions.ResetLiquidityState }) as const;

export const toggleLiquidityMode = (data: PoolMode) =>
  ({ type: Actions.ToggleLiquidityMode, data }) as const;

export const getLiquidityRecentTxs = (data) => ({ type: Actions.GetRecentTxs, data }) as const;

export const getLiquidityMinimumWithdrawAmount = (data) =>
  ({ type: Actions.GetMinimumWithdrawAmount, data }) as const;

type Action =
  | ReturnType<typeof resetLiquidityState>
  | ReturnType<typeof toggleLiquidityMode>
  | ReturnType<typeof getLiquidityRecentTxs>
  | ReturnType<typeof getLiquidityMinimumWithdrawAmount>;

export {
  liquidityMinimumWithdrawAmountSelector,
  liquidityModeSelector,
  liquidityRecentTxsSelector,
  liquiditySelector,
} from './selectors';
