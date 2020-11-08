import { Reducer } from 'redux';

import { ITransactions } from '../../explorer';

enum Actions {
  FetchHistory = 'Explorer/FETCH_HISTORY',
}

const initialState = { swapHistory: null };

type State = typeof initialState;

export const explorer: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.FetchHistory) {
    return { ...state, swapHistory: action.data };
  }

  return state;
};

export const getHistory = (data: ITransactions) => ({ type: Actions.FetchHistory, data } as const);

type Action = ReturnType<typeof getHistory>;
