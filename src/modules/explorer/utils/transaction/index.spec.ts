import { CoinSymbol } from '../../../coins';

import { currencyNetwork, capitalize } from './index';

it('return network name', () => {
  expect(currencyNetwork(CoinSymbol.BTC)).toStrictEqual('BTC');
  expect(currencyNetwork(CoinSymbol.BTC_B)).toStrictEqual('BTC on Bnbchain');
  expect(currencyNetwork(CoinSymbol.BTC_E)).toStrictEqual('BTC on Ethereum');
  expect(currencyNetwork(CoinSymbol.BTC_E)).toStrictEqual('BTC on Ethereum');
});

it('return capitalize name', () => {
  expect(capitalize('WAITING')).toStrictEqual('Waiting');
  expect(capitalize('waiting')).toStrictEqual('Waiting');
});
