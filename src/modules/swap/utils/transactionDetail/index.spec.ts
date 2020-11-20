import { CoinSymbol } from '../../../coins';

import { transactionDetail } from './index';

it('should return detail url', () => {
  expect(
    transactionDetail(
      CoinSymbol.REN_BTC,
      '5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
    ),
  ).toStrictEqual(
    'https://goerli.etherscan.io/tx/5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
  );
  expect(
    transactionDetail(
      CoinSymbol.WBTC,
      '5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
    ),
  ).toStrictEqual(
    'https://goerli.etherscan.io/tx/5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
  );
  expect(
    transactionDetail(
      CoinSymbol.BTC,
      '5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
    ),
  ).toStrictEqual(
    'https://www.blockchain.com/btc-testnet/tx/5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
  );
  expect(
    transactionDetail(
      CoinSymbol.BTC_B,
      '5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
    ),
  ).toStrictEqual(
    'https://testnet-explorer.binance.org/tx/5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
  );
  expect(
    transactionDetail(
      CoinSymbol.BTCB_1DE,
      '5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
    ),
  ).toStrictEqual(
    'https://testnet-explorer.binance.org/tx/5cf8f15b09935cbf2c17b2abdbd7a814a76b22cca85e8ae958dc3110eefcd497',
  );
  expect(
    transactionDetail(
      CoinSymbol.BTC_E,
      '0xff4607f6b346f7f5f314a46757e05c6c58d6084faad73542203eda20ceda9179',
    ),
  ).toStrictEqual(
    'https://goerli.etherscan.io/tx/0xff4607f6b346f7f5f314a46757e05c6c58d6084faad73542203eda20ceda9179',
  );
});
