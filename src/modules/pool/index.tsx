export {
  calculateDepositFee,
  calculateSwapFee,
  fetchRecentTransaction,
  fetchSbBTCBalance,
  getHexValue,
  orgFloor,
  getScanApiBaseEndpoint,
  getScanApiKey,
  getSbBtcContract,
  getScanDetailBaseEndpoint,
  mergeSameDateEarningsData,
  formatAprData,
} from './utils';

export enum PoolMode {
  Summary = 'Summary',
  AddLiquidity = 'Add Liquidity',
  Withdraw = 'Withdraw',
}

export interface IEtherscanTransaction {
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

export interface IRecentTx {
  hash: string;
  timeStamp: number;
  value: string;
}

export interface IEarning {
  timestamp: number;
  value: string;
}

export interface IFetchFee {
  bridgeFeePercent: string;
  currency: string;
  minerFee: string;
}
export interface IFeeRate {
  BTC: number;
  WBTC: number;
}

export interface IWithdrawAmountValidation {
  isValidAmount: boolean;
  withdrawAmount?: number;
  maxAmount?: number;
  minimumWithdrawAmount?: number;
  toCurrency?: string;
}

export interface IEarningsChartData {
  name: string;
  timestamp: number;
  SWINGBY: number;
}

export interface IAprChartData {
  name: string;
  timestamp: number;
  APR: number;
}
