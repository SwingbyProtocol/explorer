import { isAddressValid } from '@swingby-protocol/sdk';

import { CoinSymbol, EthereumWalletAddressCoins } from '../../../coins';
import { mode } from '../../../env';

export const isBitcoinAddress = (address: string): boolean => {
  return isAddressValid({ address, context: { mode }, chain: 'bitcoin' });
};

export const isEtherAddress = (address: string): boolean => {
  return isAddressValid({ address, context: { mode }, chain: 'ethereum' });
};

export const isAddress = (address: string): boolean => {
  if (isBitcoinAddress(address)) {
    return true;
  } else if (isEtherAddress(address)) {
    return true;
  }
  return false;
};

export const checkIsValidAddress = (
  address: string,
  toCurrency: CoinSymbol,
  fn: (result: boolean) => void, // useEffect's set function
): void => {
  if (toCurrency === CoinSymbol.BTC) {
    const result = isBitcoinAddress(address);
    fn(result);
  }
  if (EthereumWalletAddressCoins.includes(toCurrency)) {
    const result = isEtherAddress(address);
    fn(result);
  }
};

export const checkIsValidAmount = (amount: string, fn: (result: boolean) => void): void => {
  if (amount) {
    const valueArray = amount.split('');
    if (valueArray[0] === '-') {
      fn(false);
      return;
    }
    if (valueArray[valueArray.length - 1] === '.') {
      fn(true);
      return;
    }
    for (const value of valueArray) {
      if (!/^[0-9]+[0-9]*$/.test(value)) {
        fn(false);
      } else {
        fn(true);
      }
    }
  }
};
