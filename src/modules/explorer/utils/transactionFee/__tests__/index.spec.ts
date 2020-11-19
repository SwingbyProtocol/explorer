import { exponentialToNumber } from './../index';

it('return readable number', () => {
  expect(exponentialToNumber('4.76e-5')).toStrictEqual('0.0000476');

  expect(exponentialToNumber('0.0000476')).toStrictEqual('0.0000476');

  expect(exponentialToNumber(0.0000476)).toStrictEqual('0.0000476');
});
