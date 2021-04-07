export { useInterval } from './useInterval';
export { useRunCountDown } from './useRunCountDown';
export { useLinkToWidget } from './useLinkToWidget';
export { useToggleBridge } from './useToggleBridge';
export { usePoolWithdrawCoin } from './usePoolWithdrawCoin';
export { useLoadHistories } from './useLoadHistories';
export { useLoadTransaction } from './useLoadTransaction';
export { useToggleMetanode } from './useToggleMetanode';
export { useGetNetworkData } from './useGetNetworkData';
export { useGetAllBridgesTvl } from './useGetAllBridgesTvl';

export interface ICountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ITvl {
  floatBalance: number;
  metanodeLocked: {
    allBridges: number;
    btc_erc: number;
    btc_bep20: number;
  };
}
