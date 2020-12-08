import { CoinSymbol } from '../../../coins';

import { transactionDetailByTxId, transactionDetailByAddress } from './index';

it('should return explorer url with the detail of the tx id', () => {
  expect(
    transactionDetailByTxId(
      CoinSymbol.REN_BTC,
      '5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
    ),
  ).toStrictEqual(
    'https://goerli.etherscan.io/tx/5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
  );
  expect(
    transactionDetailByTxId(
      CoinSymbol.WBTC,
      '5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
    ),
  ).toStrictEqual(
    'https://goerli.etherscan.io/tx/5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
  );
  expect(
    transactionDetailByTxId(
      CoinSymbol.BTC,
      '5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
    ),
  ).toStrictEqual(
    'https://www.blockchain.com/btc-testnet/tx/5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
  );
  expect(
    transactionDetailByTxId(
      CoinSymbol.BTC_B,
      '5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
    ),
  ).toStrictEqual(
    'https://testnet-explorer.binance.org/tx/5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
  );
  expect(
    transactionDetailByTxId(
      CoinSymbol.BTCB_1DE,
      '5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
    ),
  ).toStrictEqual(
    'https://testnet-explorer.binance.org/tx/5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
  );
  expect(
    transactionDetailByTxId(
      CoinSymbol.BTC_E,
      '0xff4607f6b346f7f5f314a46757e05c6c58d6084faad73542203eda20ceda9179',
    ),
  ).toStrictEqual(
    'https://goerli.etherscan.io/tx/0xff4607f6b346f7f5f314a46757e05c6c58d6084faad73542203eda20ceda9179',
  );
});

it('should return explorer url with the detail of the address', () => {
  expect(
    transactionDetailByAddress(CoinSymbol.BTC_B, 'tbnb1mh35xew5erxmh2vyzd9h0xry6u489h8wpnvpna'),
  ).toStrictEqual(
    'https://testnet-explorer.binance.org/address/tbnb1mh35xew5erxmh2vyzd9h0xry6u489h8wpnvpna',
  );
  expect(
    transactionDetailByAddress(CoinSymbol.WBTC, '0xb680c8F33f058163185AB6121F7582BAb57Ef8a7'),
  ).toStrictEqual('https://goerli.etherscan.io/address/0xb680c8F33f058163185AB6121F7582BAb57Ef8a7');
  expect(
    transactionDetailByAddress(CoinSymbol.BTC_E, '0xb680c8F33f058163185AB6121F7582BAb57Ef8a7'),
  ).toStrictEqual('https://goerli.etherscan.io/address/0xb680c8F33f058163185AB6121F7582BAb57Ef8a7');
  expect(
    transactionDetailByAddress(CoinSymbol.BTC, 'tb1q79h09f83t73s680a4wwwfsxq7d2h88nnqclwp2'),
  ).toStrictEqual(
    'https://www.blockchain.com/btc-testnet/address/tb1q79h09f83t73s680a4wwwfsxq7d2h88nnqclwp2',
  );
});
