import { exponentialToNumber, toSatoshi } from './index';

it('return readable number', () => {
  expect(exponentialToNumber('4.76e-5')).toStrictEqual('0.0000476');

  expect(exponentialToNumber('0.0000476')).toStrictEqual('0.0000476');

  expect(exponentialToNumber(0.0000476)).toStrictEqual('0.0000476');
});
it('return Satoshi amount', () => {
  expect(toSatoshi('0.00015')).toStrictEqual(15000);

  expect(toSatoshi('0.00001')).toStrictEqual(1000);
});
