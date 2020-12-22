import { IFetchFee } from '../..';
import { calculateFixedFee } from '../../../explorer';

export const calculateDepositFee = (rate: number, amount: number) => {
  const fee = rate * amount;
  const feeFixed = Number(fee.toFixed(7));
  return feeFixed;
};

export const calculateSwapFee = (
  amountIn: number,
  receivingCurrency: string,
  feeInfos: IFetchFee[],
): number => {
  const fixedFee = calculateFixedFee(receivingCurrency, feeInfos).fixedFee;
  const transactionFeePercent = calculateFixedFee(receivingCurrency, feeInfos).feePercent;

  const transactionFee = (amountIn * Number(transactionFeePercent)) / 100;

  const estimatedReceivingAmount = amountIn - fixedFee - transactionFee;
  const estimatedFee = Number((amountIn - estimatedReceivingAmount).toFixed(7));

  return estimatedFee;
};
