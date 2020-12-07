import { CoinSymbol } from '../../../coins';
import { NETWORK, NETWORK_MODE } from '../../../env';
import { calculateFixedFee, IFee } from '../../../explorer';

export const calculateDepositFee = (rate: number, amount: number) => {
  const fee = rate * amount;
  const feeFixed = Number(fee.toFixed(7));
  return feeFixed;
};

const calculateTransferFee = (currency: string, feeInfos: IFee[]): number => {
  let transferFee = 0;
  try {
    feeInfos.forEach((feeInfo) => {
      if (feeInfo.currency === currency) {
        transferFee = Number(feeInfo.bridgeFeePercent);
      }
    });
  } catch (err) {
    console.error(err);
  }
  return transferFee;
};

const switchToBTCE = (coin: string) => {
  if (NETWORK === NETWORK_MODE.TESTNET) {
    if (coin === CoinSymbol.WBTC) {
      return CoinSymbol.BTC_E;
    }
  }
  return coin;
};

export const calculateReceivingAmount = (
  receivingBalance: number,
  receivingCurrency: string,
  feeInfos: IFee[],
): number => {
  const fixedReceivingCurrency = switchToBTCE(receivingCurrency);

  const fixedFee = calculateFixedFee(fixedReceivingCurrency, feeInfos);
  const transactionFeePercent = calculateTransferFee(fixedReceivingCurrency, feeInfos);
  const transactionFee = (receivingBalance * transactionFeePercent) / 100;

  return Number((receivingBalance - fixedFee.fixedFee - transactionFee).toFixed(7));
};
