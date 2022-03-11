import { Reducer } from 'redux';

import { LOCAL_STORAGE } from '../../env';
import { SettingsState } from '../../../store/types';

enum Actions {
  Set = 'Settings/SET',
}

const initialState: SettingsState = {
  theme: ((typeof window !== 'undefined' && window.localStorage.getItem(LOCAL_STORAGE.Theme)) ||
    'auto') as 'light' | 'dark' | 'auto',
};

type State = typeof initialState;

export const settings: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.Set) {
    return { ...state, ...action.data };
  }

  return state;
};

export const actionSetSettings = (data: Partial<State>) => ({ type: Actions.Set, data } as const);

type Action = ReturnType<typeof actionSetSettings>;
