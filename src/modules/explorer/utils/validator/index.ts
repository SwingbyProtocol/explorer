import { crypto } from '@binance-chain/javascript-sdk';
import validate from 'bitcoin-address-validation';

import { NETWORK } from '../../../env';

export const isBitcoinAddress = (address: string): boolean => {
  const result = validate(address);
  // @ts-ignore
  return result.network === NETWORK;
};

// Ref: https://github.com/binance-chain/javascript-sdk/tree/master/docs#module_crypto.checkAddress
export const isBinanceAddress = (address: string): boolean => {
  const hrp = NETWORK === 'testnet' ? 'tbnb' : 'bnb';
  return crypto.checkAddress(address, hrp);
};

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
