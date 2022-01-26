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
  generateQueryEndpoint,
  castSkyPoolsCurrency,
  castTxForSkyPools,
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
  fetchDayVolumeInfo,
  fetchMonthlyVolumeInfo,
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
