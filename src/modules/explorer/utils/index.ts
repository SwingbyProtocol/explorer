export {
  currencyNetwork,
  TxStatus,
  convertDateTime,
  removeDuplicatedTxs,
  convertTxTime,
  capitalize,
  getDiffDays,
  getBorderColor,
} from './transaction';

export {
  calculateFixedFee,
  getTransactionFees,
  exponentialToNumber,
  toBTC,
  toSatoshi,
} from './transactionFee';

export {
  fetchFloatBalances,
  fetchStatsInfo,
  getUsdPrice,
  getUsdVwap,
  getEndpoint,
  castToBackendVariable,
  getFloatBalance,
} from './network';

export {
  isEtherAddress,
  isBinanceAddress,
  isBitcoinAddress,
  checkIsValidAddress,
  checkIsValidAmount,
} from './validator';
