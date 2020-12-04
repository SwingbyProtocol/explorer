export const calculateDepositFee = (rate: number, amount: number) => {
  const fee = rate * amount;
  const feeFixed = Number(fee.toFixed(7));
  return feeFixed;
};
