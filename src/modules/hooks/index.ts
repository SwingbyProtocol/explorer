import { SkybridgeBridge } from '@swingby-protocol/sdk';
export { useInterval } from './useInterval';
export { useRunCountDown } from './useRunCountDown';
export { useLinkToWidget } from './useLinkToWidget';
export { useToggleBridge } from './useToggleBridge';
export { usePoolWithdrawCoin } from './usePoolWithdrawCoin';
export { useLoadHistories } from './useLoadHistories';
export { useLoadTransaction } from './useLoadTransaction';
export { useToggleMetanode } from './useToggleMetanode';
export { useGetNetworkData } from './useGetNetworkData';
export { useGetStatsChartData } from './useGetStatsChartData';
export { useGetTvlSummary } from './useGetTvlSummary';
export { useGetPoolApr } from './useGetPoolApr';
export { useGetSbBtcBal } from './useGetSbBtcBal';
export { useGetLatestPrice } from './useGetLatestPrice';
export { useGetEarningHistorical } from './useGetEarningHistorical';

export interface ICountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ITvl {
  tvlUsd: number;
  floatUsd: number;
  lockedSwingbyUsd: number;
  preStakingUsd: number;
  farmTvlUsd: number;
}

export interface ITvlResponses {
  tvl: ITvlObject;
  bonded: ITvlObject;
  liquidity: ITvlObject;
}

export interface ITvlObject {
  usd: string;
  btc: string;
  swingby: string;
}

export interface IFloatHistoryObject {
  at: Date;
  data: IFloatHistory[];
  totalUsd: string;
}

export interface IFloatHistory {
  amount: string;
  bridge: SkybridgeBridge;
  currency: Currency;
}

export enum Currency {
  Btc = 'BTC',
  Btcb = 'BTCB',
  Wbtc = 'WBTC',
}
