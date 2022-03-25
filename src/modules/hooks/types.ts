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
