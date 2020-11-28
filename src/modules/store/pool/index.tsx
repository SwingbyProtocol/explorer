import { Reducer } from 'redux';

import { PoolMode } from '../../pool';

enum Actions {
  SetBridge = 'Pool/SET_BRIDGE',
  SetUserAddress = 'Pool/SET_USER_ADDRESS',
  SetOnboard = 'Pool/SET_ONBOARD',
  ToggleMode = 'Pool/TOGGLE_MODE',
}

const initialState = {
  bridge: 'Apollo1',
  mode: PoolMode.Summary,
  userAddress: null,
  onboard: null,
};

type State = typeof initialState;

export const pool: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.SetBridge) {
    return { ...state, bridge: action.data };
  }

  if (action.type === Actions.SetUserAddress) {
    return { ...state, userAddress: action.data };
  }

  if (action.type === Actions.SetOnboard) {
    return { ...state, onboard: action.data };
  }

  if (action.type === Actions.ToggleMode) {
    return { ...state, mode: action.data };
  }

  return state;
};

export const setBridge = (data: string) => ({ type: Actions.SetBridge, data } as const);

export const setUserAddress = (data: string) => ({ type: Actions.SetUserAddress, data } as const);

export const setOnboard = (data) => ({ type: Actions.SetOnboard, data } as const);

export const toggleMode = (data) => ({ type: Actions.ToggleMode, data } as const);

type Action =
  | ReturnType<typeof setBridge>
  | ReturnType<typeof setUserAddress>
  | ReturnType<typeof toggleMode>
  | ReturnType<typeof setOnboard>;
