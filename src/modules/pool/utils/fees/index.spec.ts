import { calculateDepositFee, calculateReceivingAmount } from '.';

it('return number with decimal will not more than 3', () => {
  expect(calculateDepositFee(0.25, 0.00145)).toStrictEqual(0.0003625);
  expect(calculateDepositFee(0.25, 0.0019999)).toStrictEqual(0.0005);
});

const fees = [
  {
    bridgeFeePercent: '0.1',
    currency: 'BNB',
    minerFee: '500',
  },
  {
    bridgeFeePercent: '0.1',
    currency: 'BTC.B',
    minerFee: '500',
  },
  {
    bridgeFeePercent: '0.1',
    currency: 'BTCB',
    minerFee: '500',
  },
  {
    bridgeFeePercent: '0.1',
    currency: 'BTC',
    minerFee: '30000',
  },
];

it('should returns estimated receiving amount', () => {
  expect(calculateReceivingAmount(1, 'BTC', fees)).toStrictEqual(0.9987);
  expect(calculateReceivingAmount(1, 'BTC.B', fees)).toStrictEqual(0.998995);
});
