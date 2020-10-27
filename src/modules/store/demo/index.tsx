import { Reducer } from 'redux';

enum Actions {
  SetSomeProp = 'Demo/SET_SOME_PROP',
  Clear = 'Demo/CLEAR',
}

const initialState = { someProp: 'someValue' };

type State = typeof initialState;

export const demo: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.SetSomeProp) {
    return { ...state, someProp: action.data };
  }

  if (action.type === Actions.Clear) {
    return initialState;
  }

  return state;
};

export const actionDemoSetSomeProp = (data: string) =>
  ({ type: Actions.SetSomeProp, data } as const);

export const actionDemoClear = () => ({ type: Actions.Clear } as const);

type Action = ReturnType<typeof actionDemoSetSomeProp> | ReturnType<typeof actionDemoClear>;
