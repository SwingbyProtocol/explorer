import { Reducer } from 'redux';

import { IFee, IFetchUsd, INetworkInfos, INodeEndpoint } from '../../explorer';
import { ExplorerState } from '../../../store/types';

import * as initial from './initialState';

export { floatHistoryObjectInitialValue, initialVolumes, networkInfos } from './initialState';

enum Actions {
  ToggleIsLoading = 'Explorer/TOGGLE_IS_LOADING',
  ToggleIsExistPreviousPage = 'Explorer/TOGGLE_IS_EXIST_PREVIOUS_PAGE',
  FetchHistory = 'Explorer/FETCH_HISTORY',
  ClearHistory = 'Explorer/CLEAR_HISTORY',
  UpdateSwapHistoryTemp = 'Explorer/UPDATE_SWAP_HISTORY_TEMP',
  FetchUsdPrice = 'Explorer/FETCH_USD_PRICE',
  FetchTransactionFees = 'Explorer/FETCH_TRANSACTION_FEES',
  UpdateNetworkInfos = 'Explorer/UPDATE_NETWORK_INFOS',
  BuildNodeEndpoint = 'Explorer/BUILD_NODE_ENDPOINT',
}

const initialState: ExplorerState = {
  isLoading: false,
  usd: initial.usd,
  networkInfos: initial.networkInfos,
  transactionFees: null,
  isExistPreviousPage: false,
  nodeEndpoint: initial.nodeEndpoint,
};

export const explorer: Reducer<ExplorerState, Action> = (state = initialState, action) => {
  if (action.type === Actions.ToggleIsLoading) {
    return { ...state, isLoading: action.data };
  }

  if (action.type === Actions.ToggleIsExistPreviousPage) {
    return { ...state, isExistPreviousPage: action.data };
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

  if (action.type === Actions.BuildNodeEndpoint) {
    return { ...state, nodeEndpoint: action.data };
  }

  return state;
};

export const toggleIsLoading = (data: boolean) =>
  ({ type: Actions.ToggleIsLoading, data } as const);

export const toggleIsExistPreviousPage = (data: boolean) =>
  ({ type: Actions.ToggleIsExistPreviousPage, data } as const);

export const fetchUsdPrice = (data: IFetchUsd) => ({ type: Actions.FetchUsdPrice, data } as const);

export const updateTransactionFees = (data: IFee[]) =>
  ({ type: Actions.FetchTransactionFees, data } as const);

export const updateNetworkInfos = (data: INetworkInfos) =>
  ({ type: Actions.UpdateNetworkInfos, data } as const);

export const updateNodeEndpoint = (data: INodeEndpoint) =>
  ({ type: Actions.BuildNodeEndpoint, data } as const);

type Action =
  | ReturnType<typeof toggleIsLoading>
  | ReturnType<typeof toggleIsExistPreviousPage>
  | ReturnType<typeof fetchUsdPrice>
  | ReturnType<typeof updateTransactionFees>
  | ReturnType<typeof updateNodeEndpoint>
  | ReturnType<typeof updateNetworkInfos>;
