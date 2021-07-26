export const calculateGasMargin = (estimatedGas: number): number => {
  // Memo: increase 20% from original estimatedGas()
  const limit = Number((estimatedGas * 1.2).toFixed(0));

  // Memo: To avoid 'Out of gas' error
  const minLimit = 100000;
  const gasLimit = limit > minLimit ? limit : minLimit;

  return gasLimit;
};
