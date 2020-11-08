import { Reducer } from 'redux';

import { ITransactions } from '../../explorer';

enum Actions {
  FetchHistory = 'Explorer/FETCH_HISTORY',
  ClearHistory = 'Explorer/CLEAR_HISTORY',
}

const initialState = { swapHistory: null };

type State = typeof initialState;

export const explorer: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.FetchHistory) {
    return { ...state, swapHistory: action.data };
  } else if (action.type === Actions.ClearHistory) {
    return { ...state, swapHistory: null };
  }

  return state;
};

export const getHistory = (data: ITransactions) => ({ type: Actions.FetchHistory, data } as const);
export const clearHistory = () => ({ type: Actions.ClearHistory } as const);

type Action = ReturnType<typeof getHistory>;
