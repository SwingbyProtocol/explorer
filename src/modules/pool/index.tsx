export {
  calculateDepositFee,
  calculateSwapFee,
  fetchRecentTransaction,
  fetchSbBTCBalance,
  getHexValue,
  makeEarningsData,
  makeTimeLabels,
  orgFloor,
  getScanBaseEndpoint,
  getScanApiKey,
  getSbBtcContract,
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

export type TEarningPeriod = '1d' | '14d' | 'All';

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

// Todo: Add BTCB
export type TWithdrawCurrency = 'BTC' | 'WBTC';
