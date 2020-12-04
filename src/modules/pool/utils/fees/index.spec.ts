import { calculateDepositFee } from '.';

it('return number with decimal will not more than 3', () => {
  expect(calculateDepositFee(0.25, 0.00145)).toStrictEqual(0.0003625);
  expect(calculateDepositFee(0.25, 0.0019999)).toStrictEqual(0.0005);
});
