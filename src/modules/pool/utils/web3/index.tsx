// Ref: https://github.com/ethereum/web3.js/issues/2077#issuecomment-631431935
// Memo: When pass numAsHex to the contract method, it will be treated as uint256.

export const getHexValue = (num: string | number): string => {
  const calculatedValue = Number(num) * Math.pow(10, 8);
  const numAsHex = '0x' + calculatedValue.toString(16);
  return numAsHex;
};
