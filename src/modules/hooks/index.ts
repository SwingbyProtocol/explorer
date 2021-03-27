export { useInterval } from './useInterval';
export { useRunCountDown } from './useRunCountDown';
export { useLinkToWidget } from './useLinkToWidget';
export { useToggleBridge } from './useToggleBridge';
export { usePoolWithdrawCoin } from './usePoolWithdrawCoin';
export { useLoadHistories } from './useLoadHistories';
export { useLoadTransaction } from './useLoadTransaction';
export { useToggleMetanode } from './useToggleMetanode';

export interface ICountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
