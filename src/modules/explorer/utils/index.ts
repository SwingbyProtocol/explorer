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
  castUiStatus,
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
  fetchVolumeInfo,
  fetch1wksRewards,
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
