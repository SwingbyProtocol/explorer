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
export { useGetAllBridgesTvl } from './useGetAllBridgesTvl';
export { useGetStatsChartData } from './useGetStatsChartData';
export { useGetLiquidityApr } from './useGetLiquidityApr';

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

export interface IFloatHistoryObject {
  at: Date;
  data: IFloatHistory[];
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
