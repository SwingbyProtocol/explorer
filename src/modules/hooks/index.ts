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
export { useGetBridgesTvl } from './useGetBridgesTvl';
export { useGetStatsChartData } from './useGetStatsChartData';
export { useGetLiquidityApr } from './useGetLiquidityApr';
export { useGetTvlSummary } from './useGetTvlSummary';

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
  amountUsd: string;
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
