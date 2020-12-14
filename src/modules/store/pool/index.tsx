import { Reducer } from 'redux';

import { PoolMode } from '../../pool';

enum Actions {
  SetBridge = 'Pool/SET_BRIDGE',
  SetUserAddress = 'Pool/SET_USER_ADDRESS',
  SetBalanceLP = 'Pool/SET_BALANCE_LP',
  GetCurrentPriceLP = 'Pool/GET_CURRENT_PRICE_LP',
  SetOnboard = 'Pool/SET_ONBOARD',
  SetWeb3 = 'Pool/SET_WEB3',
  TogglePoolMode = 'Pool/TOGGLE_POOL_MODE',
  GetRecentTxs = 'Pool/GET_RECENT_TXS',
  ResetPoolState = 'Pool/RESET_POOL_STATE',
}

const initialState = {
  bridge: 'Apollo1',
  mode: PoolMode.Summary,
  userAddress: null,
  recentTxs: null,
  balanceLP: null,
  currentPriceLP: null,
  onboard: null,
  web3: null,
};

type State = typeof initialState;

export const pool: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.SetBridge) {
    return { ...state, bridge: action.data };
  }

  if (action.type === Actions.SetUserAddress) {
    return { ...state, userAddress: action.data };
  }

  if (action.type === Actions.SetBalanceLP) {
    return { ...state, balanceLP: action.data };
  }

  if (action.type === Actions.GetCurrentPriceLP) {
    return { ...state, currentPriceLP: action.data };
  }

  if (action.type === Actions.SetOnboard) {
    return { ...state, onboard: action.data };
  }

  if (action.type === Actions.SetWeb3) {
    return { ...state, web3: action.data };
  }

  if (action.type === Actions.TogglePoolMode) {
    return { ...state, mode: action.data };
  }
  if (action.type === Actions.GetRecentTxs) {
    return { ...state, recentTxs: action.data };
  }
  if (action.type === Actions.ResetPoolState) {
    return initialState;
  }

  return state;
};

export const resetPoolState = () => ({ type: Actions.ResetPoolState } as const);

export const setBridge = (data: string) => ({ type: Actions.SetBridge, data } as const);

export const setUserAddress = (data: string) => ({ type: Actions.SetUserAddress, data } as const);

export const setBalanceLP = (data: number) => ({ type: Actions.SetBalanceLP, data } as const);

export const getCurrentPriceLP = (data: number) =>
  ({ type: Actions.GetCurrentPriceLP, data } as const);

export const setOnboard = (data) => ({ type: Actions.SetOnboard, data } as const);

export const setWeb3 = (data) => ({ type: Actions.SetWeb3, data } as const);

export const togglePoolMode = (data) => ({ type: Actions.TogglePoolMode, data } as const);

export const getRecentTxs = (data) => ({ type: Actions.GetRecentTxs, data } as const);

type Action =
  | ReturnType<typeof resetPoolState>
  | ReturnType<typeof setBridge>
  | ReturnType<typeof setUserAddress>
  | ReturnType<typeof setBalanceLP>
  | ReturnType<typeof getCurrentPriceLP>
  | ReturnType<typeof togglePoolMode>
  | ReturnType<typeof setOnboard>
  | ReturnType<typeof setWeb3>
  | ReturnType<typeof getRecentTxs>;
