import { Reducer } from 'redux';

import {
  IFee,
  IFetchUsd,
  INetworkInfos,
  ITransactions,
  TTheme,
  TTxRawObject,
} from '../../explorer';

import * as initial from './initialState';

export { networkInfos } from './initialState';

enum Actions {
  SetWidthSize = 'Explorer/SET_WIDTH_SIZE',
  ToggleTheme = 'Explorer/TOGGLE_THEME',
  ToggleIsExistPreviousPage = 'Explorer/TOGGLE_IS_EXIST_PREVIOUS_PAGE',
  FetchHistory = 'Explorer/FETCH_HISTORY',
  SelectSwapDetails = 'Explorer/SELECT_SWAP_DETAILS',
  ClearHistory = 'Explorer/CLEAR_HISTORY',
  ToggleIsHideWaiting = 'Explorer/TOGGLE_IS_HIDE_WAITING',
  UpdateSwapHistoryTemp = 'Explorer/UPDATE_SWAP_HISTORY_TEMP',
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
  themeMode: null,
  isExistPreviousPage: false,
};

type State = typeof initialState;

export const explorer: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.SetWidthSize) {
    return { ...state, width: action.data };
  }

  if (action.type === Actions.ToggleTheme) {
    return { ...state, themeMode: action.data };
  }

  if (action.type === Actions.ToggleIsExistPreviousPage) {
    return { ...state, isExistPreviousPage: action.data };
  }

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

export const setWidthSize = (data: number) => ({ type: Actions.SetWidthSize, data } as const);

export const toggleIsExistPreviousPage = (data: boolean) =>
  ({ type: Actions.ToggleIsExistPreviousPage, data } as const);

export const toggleTheme = (data: TTheme) => ({ type: Actions.ToggleTheme, data } as const);

export const getHistory = (data: ITransactions) => ({ type: Actions.FetchHistory, data } as const);

export const selectSwapDetails = (data: TTxRawObject) =>
  ({ type: Actions.SelectSwapDetails, data } as const);

export const clearHistory = () => ({ type: Actions.ClearHistory } as const);

export const toggleIsHideWaiting = () => ({ type: Actions.ToggleIsHideWaiting } as const);

export const updateSwapHistoryTemp = (data: TTxRawObject[]) =>
  ({ type: Actions.UpdateSwapHistoryTemp, data } as const);

export const fetchUsdPrice = (data: IFetchUsd) => ({ type: Actions.FetchUsdPrice, data } as const);

export const fetchTransactionFees = (data: IFee[]) =>
  ({ type: Actions.FetchTransactionFees, data } as const);

export const updateNetworkInfos = (data: INetworkInfos) =>
  ({ type: Actions.UpdateNetworkInfos, data } as const);

type Action =
  | ReturnType<typeof setWidthSize>
  | ReturnType<typeof toggleTheme>
  | ReturnType<typeof toggleIsExistPreviousPage>
  | ReturnType<typeof getHistory>
  | ReturnType<typeof selectSwapDetails>
  | ReturnType<typeof clearHistory>
  | ReturnType<typeof toggleIsHideWaiting>
  | ReturnType<typeof updateSwapHistoryTemp>
  | ReturnType<typeof fetchUsdPrice>
  | ReturnType<typeof fetchTransactionFees>
  | ReturnType<typeof updateNetworkInfos>;
