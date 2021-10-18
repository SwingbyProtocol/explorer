import { CoinSymbol } from '../../../coins';

import { transactionDetailByTxId, transactionDetailByAddress } from './index';

it('should return explorer url with the detail of the tx id', () => {
  expect(
    transactionDetailByTxId(
      CoinSymbol.WBTC,
      '5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
    ),
  ).toStrictEqual(
    'https://ropsten.etherscan.io/tx/5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
  );
  expect(
    transactionDetailByTxId(
      CoinSymbol.BTC,
      '5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
    ),
  ).toStrictEqual(
    'https://www.blockchain.com/btc-testnet/tx/5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
  );
});

it('should return explorer url with the detail of the address', () => {
  expect(
    transactionDetailByAddress(CoinSymbol.WBTC, '0xb680c8F33f058163185AB6121F7582BAb57Ef8a7'),
  ).toStrictEqual(
    'https://ropsten.etherscan.io/address/0xb680c8F33f058163185AB6121F7582BAb57Ef8a7',
  );

  expect(
    transactionDetailByAddress(CoinSymbol.BTC, 'tb1q79h09f83t73s680a4wwwfsxq7d2h88nnqclwp2'),
  ).toStrictEqual(
    'https://www.blockchain.com/btc-testnet/address/tb1q79h09f83t73s680a4wwwfsxq7d2h88nnqclwp2',
  );
});
