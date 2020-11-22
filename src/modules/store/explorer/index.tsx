import { Reducer } from 'redux';

import { IFee, IFetchUsd, INetworkInfos, ITransactions, SwapRawObject } from '../../explorer';

import * as initial from './initialState';

enum Actions {
  FetchHistory = 'Explorer/FETCH_HISTORY',
  SelectSwapDetails = 'Explorer/SELECT_SWAP_DETAILS',
  ClearHistory = 'Explorer/CLEAR_HISTORY',
  ToggleIsHideWaiting = 'Explorer/TOGGLE_IS_HIDE_WAITING',
  UpdateSwapHistoryTemp = 'Explorer/UPDATE_SWAP_HISTORY_TEMP',
  SetWidthSize = 'Explorer/SET_WIDTH_SIZE',
  FetchUsdPrice = 'Explorer/FETCH_USD_PRICE',
  FetchTransactionFees = 'Explorer/FETCH_TRANSACTION_FEES',
  UpdateNetworkInfos = 'Explorer/UPDATE_NETWORK_INFOS',
}

const initialState = {
  swapHistory: null,
  swapHistoryTemp: null,
  swapDetails: null,
  isHideWaiting: false,
  usd: initial.usd,
  networkInfos: initial.networkInfos,
  transactionFees: null,
  width: null,
};

type State = typeof initialState;

export const explorer: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.FetchHistory) {
    return { ...state, swapHistory: action.data };
  }

  if (action.type === Actions.SelectSwapDetails) {
    return { ...state, swapDetails: action.data };
  }

  if (action.type === Actions.ClearHistory) {
    return { ...state, swapHistory: null };
  }

  if (action.type === Actions.ToggleIsHideWaiting) {
    return { ...state, isHideWaiting: !state.isHideWaiting };
  }

  if (action.type === Actions.UpdateSwapHistoryTemp) {
    return { ...state, swapHistoryTemp: action.data };
  }

  if (action.type === Actions.SetWidthSize) {
    return { ...state, width: action.data };
  }

  if (action.type === Actions.FetchUsdPrice) {
    return { ...state, usd: action.data };
  }

  if (action.type === Actions.FetchTransactionFees) {
    return { ...state, transactionFees: action.data };
  }

  if (action.type === Actions.UpdateNetworkInfos) {
    return { ...state, networkInfos: action.data };
  }

  return state;
};

export const getHistory = (data: ITransactions) => ({ type: Actions.FetchHistory, data } as const);

export const selectSwapDetails = (data: SwapRawObject) =>
  ({ type: Actions.SelectSwapDetails, data } as const);

export const clearHistory = () => ({ type: Actions.ClearHistory } as const);

export const toggleIsHideWaiting = () => ({ type: Actions.ToggleIsHideWaiting } as const);

export const updateSwapHistoryTemp = (data: SwapRawObject[]) =>
  ({ type: Actions.UpdateSwapHistoryTemp, data } as const);

export const setWidthSize = (data: number) => ({ type: Actions.SetWidthSize, data } as const);

export const fetchUsdPrice = (data: IFetchUsd) => ({ type: Actions.FetchUsdPrice, data } as const);

export const fetchTransactionFees = (data: IFee[]) =>
  ({ type: Actions.FetchTransactionFees, data } as const);

export const updateNetworkInfos = (data: INetworkInfos) =>
  ({ type: Actions.UpdateNetworkInfos, data } as const);

type Action =
  | ReturnType<typeof getHistory>
  | ReturnType<typeof selectSwapDetails>
  | ReturnType<typeof clearHistory>
  | ReturnType<typeof toggleIsHideWaiting>
  | ReturnType<typeof updateSwapHistoryTemp>
  | ReturnType<typeof setWidthSize>
  | ReturnType<typeof fetchUsdPrice>
  | ReturnType<typeof fetchTransactionFees>
  | ReturnType<typeof updateNetworkInfos>;
