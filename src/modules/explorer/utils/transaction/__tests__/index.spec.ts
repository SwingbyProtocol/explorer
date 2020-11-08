import { logos } from '@swingby-protocol/pulsar';

import { CoinSymbol } from '../../../../coins';

import { TxStatus } from './../../../index';
import { currencyNetwork, statusColor, currencyImg } from './../index';

it('return network name', () => {
  expect(currencyNetwork(CoinSymbol.BTC)).toStrictEqual('BTC');
  expect(currencyNetwork(CoinSymbol.BTC_B)).toStrictEqual('BTC on Bnbchain');
  expect(currencyNetwork(CoinSymbol.BTC_E)).toStrictEqual('BTC on Ethereum');
  expect(currencyNetwork(CoinSymbol.BTC_E)).toStrictEqual('BTC on Ethereum');
});
it('return tx status color', () => {
  expect(statusColor(TxStatus.COMPLETED)).toStrictEqual('success');
  expect(statusColor(TxStatus.REJECTED)).toStrictEqual('danger');
  expect(statusColor(TxStatus.WAITING)).toStrictEqual('warning');
});
it('return currency image', () => {
  expect(currencyImg(CoinSymbol.BTC)).toStrictEqual(logos.CoinBtc);
  expect(currencyImg(CoinSymbol.BTC_B)).toStrictEqual(logos.CoinBtcb);
  expect(currencyImg(CoinSymbol.BTC_E)).toStrictEqual(logos.CoinBtce);
});
