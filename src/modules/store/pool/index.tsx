import { Reducer } from 'redux';

enum Actions {
  SetBridge = 'Pool/SET_BRIDGE',
}

const initialState = {
  bridge: 'Apollo1',
};

type State = typeof initialState;

export const pool: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.SetBridge) {
    return { ...state, bridge: action.data };
  }

  return state;
};

export const setBridge = (data: string) => ({ type: Actions.SetBridge, data } as const);

type Action = ReturnType<typeof setBridge>;
