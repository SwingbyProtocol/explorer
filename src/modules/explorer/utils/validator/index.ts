import { crypto } from '@binance-chain/javascript-sdk';
import validate from 'bitcoin-address-validation';

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
export const isBinanceAddress = (address: string): boolean => {
  const hrp = mode === MODE.TEST ? 'tbnb' : 'bnb';
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
