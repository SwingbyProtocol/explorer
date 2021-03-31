import { Reducer } from 'redux';

import { IFee, IFetchUsd, INetworkInfos, ITransactions, TTxRawObject } from '../../explorer';

import * as initial from './initialState';

export { networkInfos } from './initialState';

enum Actions {
  ToggleIsLoading = 'Explorer/TOGGLE_IS_LOADING',
  ToggleIsExistPreviousPage = 'Explorer/TOGGLE_IS_EXIST_PREVIOUS_PAGE',
  FetchHistory = 'Explorer/FETCH_HISTORY',
  ClearHistory = 'Explorer/CLEAR_HISTORY',
  UpdateSwapHistoryTemp = 'Explorer/UPDATE_SWAP_HISTORY_TEMP',
  FetchUsdPrice = 'Explorer/FETCH_USD_PRICE',
  FetchTransactionFees = 'Explorer/FETCH_TRANSACTION_FEES',
  UpdateNetworkInfos = 'Explorer/UPDATE_NETWORK_INFOS',
}

const initialState = {
  isLoading: false,
  swapHistory: null,
  swapHistoryTemp: null,
  usd: initial.usd,
  networkInfos: initial.networkInfos,
  transactionFees: null,
  isExistPreviousPage: false,
};

type State = typeof initialState;

export const explorer: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.ToggleIsLoading) {
    return { ...state, isLoading: action.data };
  }

  if (action.type === Actions.ToggleIsExistPreviousPage) {
    return { ...state, isExistPreviousPage: action.data };
  }

  if (action.type === Actions.FetchHistory) {
    return { ...state, swapHistory: action.data };
  }

  if (action.type === Actions.ClearHistory) {
    return { ...state, swapHistory: null };
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

export const toggleIsLoading = (data: boolean) =>
  ({ type: Actions.ToggleIsLoading, data } as const);

export const toggleIsExistPreviousPage = (data: boolean) =>
  ({ type: Actions.ToggleIsExistPreviousPage, data } as const);

export const getHistory = (data: ITransactions) => ({ type: Actions.FetchHistory, data } as const);

export const clearHistory = () => ({ type: Actions.ClearHistory } as const);

export const updateSwapHistoryTemp = (data: TTxRawObject[]) =>
  ({ type: Actions.UpdateSwapHistoryTemp, data } as const);

export const fetchUsdPrice = (data: IFetchUsd) => ({ type: Actions.FetchUsdPrice, data } as const);

export const fetchTransactionFees = (data: IFee[]) =>
  ({ type: Actions.FetchTransactionFees, data } as const);

export const updateNetworkInfos = (data: INetworkInfos) =>
  ({ type: Actions.UpdateNetworkInfos, data } as const);

type Action =
  | ReturnType<typeof toggleIsLoading>
  | ReturnType<typeof toggleIsExistPreviousPage>
  | ReturnType<typeof getHistory>
  | ReturnType<typeof clearHistory>
  | ReturnType<typeof updateSwapHistoryTemp>
  | ReturnType<typeof fetchUsdPrice>
  | ReturnType<typeof fetchTransactionFees>
  | ReturnType<typeof updateNetworkInfos>;
