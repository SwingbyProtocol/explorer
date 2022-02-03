export { useDistributeRewards } from './useDistributeRewards';
export { useGetEarningHistorical } from './useGetEarningHistorical';
export { useGetLatestPrice } from './useGetLatestPrice';
export { useGetNetworkData } from './useGetNetworkData';
export { useGetPoolApr } from './useGetPoolApr';
export { useGetSbBtcBal } from './useGetSbBtcBal';
export { useGetSwapRewards } from './useGetSwapRewards';
export { useGetTvlSummary } from './useGetTvlSummary';
export { useInterval } from './useInterval';
export { useLinkToWidget } from './useLinkToWidget';
export { useLoadMetanodes } from './useLoadMetanodes';
export { usePoolWithdrawCoin } from './usePoolWithdrawCoin';
export { useRunCountDown } from './useRunCountDown';
export { useToggleBridge } from './useToggleBridge';
export { useToggleMetanode } from './useToggleMetanode';
export { useTxsQuery } from './useTxsQuery';
export { useAssertTermsSignature } from './useAssertTermsSignature';

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
