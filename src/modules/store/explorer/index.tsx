import { Reducer } from 'redux';

import { ITransactions, SwapRawObject } from '../../explorer';

enum Actions {
  FetchHistory = 'Explorer/FETCH_HISTORY',
  ClearHistory = 'Explorer/CLEAR_HISTORY',
  ToggleIsHideWaiting = 'Explorer/TOGGLE_IS_HIDE_WAITING',
  UpdateSwapHistoryTemp = 'Explorer/UPDATE_SWAP_HISTORY_TEMP',
  SetWidthSize = 'Explorer/SET_WIDTH_SIZE',
}

const initialState = {
  swapHistory: null,
  isHideWaiting: false,
  swapHistoryTemp: null,
  width: null,
};

type State = typeof initialState;

export const explorer: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.FetchHistory) {
    return { ...state, swapHistory: action.data };
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

  return state;
};

export const getHistory = (data: ITransactions) => ({ type: Actions.FetchHistory, data } as const);
export const clearHistory = () => ({ type: Actions.ClearHistory } as const);
export const toggleIsHideWaiting = () => ({ type: Actions.ToggleIsHideWaiting } as const);
export const updateSwapHistoryTemp = (data: SwapRawObject[]) =>
  ({ type: Actions.UpdateSwapHistoryTemp, data } as const);
export const setWidthSize = (data: number) => ({ type: Actions.SetWidthSize, data } as const);

type Action =
  | ReturnType<typeof getHistory>
  | ReturnType<typeof clearHistory>
  | ReturnType<typeof toggleIsHideWaiting>
  | ReturnType<typeof updateSwapHistoryTemp>
  | ReturnType<typeof setWidthSize>;
