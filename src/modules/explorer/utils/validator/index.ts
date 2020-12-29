import { isAddressValid } from '@swingby-protocol/sdk';
import validate from 'bitcoin-address-validation';

import { BTCBCoins, CoinSymbol, ETHCoins } from '../../../coins';
import { MODE, mode } from '../../../env';

// Ref: /node_modules/bitcoin-address-validation/lib/types.d.ts
enum Network {
  mainnet = 'mainnet',
  testnet = 'testnet',
  regtest = 'regtest',
}
enum AddressType {
  p2pkh = 'p2pkh',
  p2sh = 'p2sh',
  p2wpkh = 'p2wpkh',
}
interface Validation {
  bech32: boolean;
  network: Network;
  address: string;
  type: AddressType;
}

export const isBitcoinAddress = (address: string): boolean => {
  const result = validate(address) as Validation;
  const currentNetwork = mode === MODE.PRODUCTION ? Network.mainnet : Network.testnet;
  return result.network === currentNetwork;
};

// Ref: https://github.com/binance-chain/javascript-sdk/tree/master/docs#module_crypto.checkAddress
export const isBinanceAddress = (address: string): boolean =>
  isAddressValid({ address, context: { mode }, chain: 'binance' });

export const isEtherAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const isAddress = (address: string): boolean => {
  if (isBitcoinAddress(address)) {
    return true;
  } else if (isBinanceAddress(address)) {
    return true;
  } else if (isEtherAddress(address)) {
    return true;
  }
  return false;
};

export const checkIsValidAddress = (
  address: string,
  toCurrency: string,
  fn: (result: boolean) => void, // useEffect's set function
): void => {
  if (toCurrency === CoinSymbol.BTC) {
    const result = isBitcoinAddress(address);
    fn(result);
  }
  if (ETHCoins.includes(toCurrency)) {
    const result = isEtherAddress(address);
    fn(result);
  }
  if (BTCBCoins.includes(toCurrency)) {
    const result = isBinanceAddress(address);
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
