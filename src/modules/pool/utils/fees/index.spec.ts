import { CoinSymbol } from './../../../coins';

import { calculateDepositFee, calculateSwapFee } from '.';

const fees = [
  {
    bridgeFeePercent: '0.2',
    currency: 'ETH',
    minerFee: '25000',
  },
  {
    bridgeFeePercent: '0.2',
    currency: 'WBTC',
    minerFee: '25000',
  },
  {
    bridgeFeePercent: '0.2',
    currency: 'BTC',
    minerFee: '30000',
  },
  {
    bridgeFeePercent: '0.2',
    currency: 'BNB',
    minerFee: '500',
  },
  {
    bridgeFeePercent: '0.2',
    currency: 'BTCB',
    minerFee: '500',
  },
];

it('return number with decimal will not more than 3', () => {
  expect(calculateDepositFee(0.25, 0.00145)).toStrictEqual(0.0003625);
  expect(calculateDepositFee(0.25, 0.0019999)).toStrictEqual(0.0005);
});

it('should returns estimated receiving amount', () => {
  expect(calculateSwapFee(1, CoinSymbol.BTC, fees)).toStrictEqual(0.0023);
  expect(calculateSwapFee(1, CoinSymbol.BTC_B, fees)).toStrictEqual(0.002005);
  expect(calculateSwapFee(1, CoinSymbol.WBTC, fees)).toStrictEqual(0.00225);
});
