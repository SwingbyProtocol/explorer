import { Reducer } from 'redux';

import { ITransactions } from '../../explorer';

enum Actions {
  FetchHistory = 'Explorer/FETCH_HISTORY',
  ClearHistory = 'Explorer/CLEAR_HISTORY',
  SetIsHideWaiting = 'Explorer/SET_IS_HIDE_WAITING',
}

const initialState = { swapHistory: null, isHideWaiting: false };

type State = typeof initialState;

export const explorer: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.FetchHistory) {
    return { ...state, swapHistory: action.data };
  } else if (action.type === Actions.ClearHistory) {
    return { ...state, swapHistory: null };
  } else if (action.type === Actions.SetIsHideWaiting) {
    return { ...state, isHideWaiting: !state.isHideWaiting };
  }

  return state;
};

export const getHistory = (data: ITransactions) => ({ type: Actions.FetchHistory, data } as const);
export const clearHistory = () => ({ type: Actions.ClearHistory } as const);
export const setIsHideWaiting = () => ({ type: Actions.SetIsHideWaiting } as const);

type Action = ReturnType<typeof getHistory>;
