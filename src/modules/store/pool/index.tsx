import { Reducer } from 'redux';

import { IFeeRate, PoolMode } from '../../pool';

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
  GetDepositFeeRate = 'Pool/GET_DEPOSIT_FEE_RATE',
  GetMinimumWithdrawAmount = 'Pool/GET_MINIMUM_WITHDRAW_AMOUNT',
  GetWithdrawRate = 'Pool/GET_WITHDRAW_RATE',
  SetAffiliateCode = 'Pool/SET_AFFILIATE_CODE',
}

const initialState = {
  bridge: 'Apollo1',
  mode: PoolMode.Summary,
  userAddress: null,
  recentTxs: null,
  balanceSbBTC: null,
  currentPriceLP: null,
  depositFeeRate: { BTC: 0, WBTC: 0 },
  withdrawRate: null,
  minimumWithdrawAmount: null,
  onboard: null,
  web3: null,
  affiliateCode: null,
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
    return { ...state, balanceSbBTC: action.data };
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

  if (action.type === Actions.GetDepositFeeRate) {
    return { ...state, depositFeeRate: action.data };
  }

  if (action.type === Actions.GetMinimumWithdrawAmount) {
    return { ...state, minimumWithdrawAmount: action.data };
  }

  if (action.type === Actions.GetWithdrawRate) {
    return { ...state, withdrawRate: action.data };
  }

  if (action.type === Actions.SetAffiliateCode) {
    return { ...state, affiliateCode: action.data };
  }

  if (action.type === Actions.ResetPoolState) {
    return initialState;
  }

  return state;
};

export const resetPoolState = () => ({ type: Actions.ResetPoolState } as const);

export const setBridge = (data: string) => ({ type: Actions.SetBridge, data } as const);

export const setUserAddress = (data: string) => ({ type: Actions.SetUserAddress, data } as const);

export const setBalanceSbBTC = (data: number) => ({ type: Actions.SetBalanceLP, data } as const);

export const getCurrentPriceSbBTC = (data: number) =>
  ({ type: Actions.GetCurrentPriceLP, data } as const);

export const setOnboard = (data) => ({ type: Actions.SetOnboard, data } as const);

export const setWeb3 = (data) => ({ type: Actions.SetWeb3, data } as const);

export const togglePoolMode = (data: PoolMode) => ({ type: Actions.TogglePoolMode, data } as const);

export const getRecentTxs = (data) => ({ type: Actions.GetRecentTxs, data } as const);

export const getMinimumWithdrawAmount = (data) =>
  ({ type: Actions.GetMinimumWithdrawAmount, data } as const);

export const getWithdrawRate = (data) => ({ type: Actions.GetWithdrawRate, data } as const);

export const getDepositFeeRate = (data: IFeeRate) =>
  ({ type: Actions.GetDepositFeeRate, data } as const);

export const setAffiliateCode = (data: string) =>
  ({ type: Actions.SetAffiliateCode, data } as const);

type Action =
  | ReturnType<typeof resetPoolState>
  | ReturnType<typeof setBridge>
  | ReturnType<typeof setUserAddress>
  | ReturnType<typeof setBalanceSbBTC>
  | ReturnType<typeof getCurrentPriceSbBTC>
  | ReturnType<typeof togglePoolMode>
  | ReturnType<typeof setOnboard>
  | ReturnType<typeof setWeb3>
  | ReturnType<typeof getRecentTxs>
  | ReturnType<typeof getDepositFeeRate>
  | ReturnType<typeof getWithdrawRate>
  | ReturnType<typeof getMinimumWithdrawAmount>
  | ReturnType<typeof setAffiliateCode>;
