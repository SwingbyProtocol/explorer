import { getHexValue } from './index';

it('should return hex value of number', () => {
  expect(getHexValue('0.1')).toStrictEqual('0x989680');
  expect(getHexValue(0.1)).toStrictEqual('0x989680');
  expect(getHexValue('1')).toStrictEqual('0x5f5e100');
  expect(getHexValue('2')).toStrictEqual('0xbebc200');
  expect(getHexValue('10')).toStrictEqual('0x3b9aca00');
  expect(getHexValue(10)).toStrictEqual('0x3b9aca00');
});
