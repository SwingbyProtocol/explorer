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
  expect(calculateDepositFee(20, 0.145)).toStrictEqual(0.029);
  expect(calculateDepositFee(20, 100)).toStrictEqual(20);
});

it('should returns estimated receiving amount', () => {
  expect(calculateSwapFee(1, CoinSymbol.BTC, fees)).toStrictEqual(0.0023);
  expect(calculateSwapFee(1, CoinSymbol.BTC_B, fees)).toStrictEqual(0.002005);
  expect(calculateSwapFee(1, CoinSymbol.WBTC, fees)).toStrictEqual(0.00225);
});
