export {
  currencyNetwork,
  TxStatus,
  convertDateTime,
  convertTxTime,
  capitalize,
  getDiffDays,
  getRequiredBlockConfirmations,
  getBorderColor,
  castUiStatus,
  calDiffDays,
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
  getEndpoint,
  getFixedBaseEndpoint,
  castToBackendVariable,
  getFloatBalance,
  getBaseEndpoint,
} from './network';

export { getUsdPrice, fetchVwap } from './price';

export {
  isEtherAddress,
  isBinanceAddress,
  isBitcoinAddress,
  checkIsValidAddress,
  checkIsValidAmount,
} from './validator';

export { getBridge } from './bridge/';
