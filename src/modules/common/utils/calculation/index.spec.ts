import { sumArray } from './index';

const testArray = [2, 3, 2];

it('return network name', () => {
  expect(sumArray(testArray)).toStrictEqual(7);
});
