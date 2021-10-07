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
export { useGetSwapRewards } from './useGetSwapRewards';
export { useDistributeRewards } from './useDistributeRewards';
export { useGetSignature } from './useGetSignature';

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

export interface IAprHistoric {
  farm: 'string';
  sbBtc: 'string';
  pool: 'string';
  createdAt: 'string';
}

export interface IAprHistoricalPool {
  sbBtcErc20: IAprHistoric[] | [];
  uni: IAprHistoric[] | [];
  sushi: IAprHistoric[] | [];
  pancake: IAprHistoric[] | [];
  sbBtcBep20: IAprHistoric[] | [];
}

export interface IEarningHistorical {
  total: ITotal;
  network: number;
  sbBtcFarm: IFarmEarning;
  thirdPartyFarm: IThirdPartyFarm;
}

interface ITotal {
  pendingSwingby: number;
  claimedSwingby: number;
}

interface IFarmEarning {
  stakedLp: number;
  pendingSwingby: number;
  claimedSwingby: number;
  claimedTxs: IClaimedTx[];
}

export interface IClaimedTx {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

interface IThirdPartyFarm {
  pancake?: IFarmEarning;
  combinedUniSushi?: IFarmEarning;
}
