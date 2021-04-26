export {
  currencyNetwork,
  TxStatus,
  convertDateTime,
  removeDuplicatedTxs,
  convertTxTime,
  capitalize,
  getDiffDays,
  getRequiredBlockConfirmations,
  getBorderColor,
} from './transaction';

export {
  calculateFixedFee,
  getTransactionFees,
  exponentialToNumber,
  toBTC,
  toSatoshi,
  getTransactionFee,
} from './transactionFee';

export {
  fetchFloatBalances,
  fetchStatsInfo,
  getUsdPrice,
  fetchVwap,
  getEndpoint,
  getFixedBaseEndpoint,
  castToBackendVariable,
  getFloatBalance,
  getBaseEndpoint,
} from './network';

export {
  isEtherAddress,
  isBinanceAddress,
  isBitcoinAddress,
  checkIsValidAddress,
  checkIsValidAmount,
} from './validator';
