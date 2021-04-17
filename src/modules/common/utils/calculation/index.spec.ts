import { calculateVwap, sumArray } from './index';

const testArray = [2, 3, 2];
it('return network name', () => {
  expect(sumArray(testArray)).toStrictEqual(7);
});

it('test VWAP', () => {
  expect(
    calculateVwap([
      [5, 10],
      [13, 8.5],
      [10, 11],
    ]),
  ).toStrictEqual(9.660714285714286);
});
