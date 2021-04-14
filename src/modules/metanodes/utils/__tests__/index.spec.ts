import { mergeLockedArray } from './../index';

const ethArray = [
  { at: '2021-02-08', amount: '1' },
  { at: '2021-02-15', amount: '2' },
  { at: '2021-02-16', amount: '3' },
];

const bscArray = [
  { at: '2021-02-09', amount: '4' },
  { at: '2021-02-18', amount: '5' },
  { at: '2021-02-20', amount: '6' },
];

const mergedArray = [
  { at: '2021-02-08', amount: '1' },
  { at: '2021-02-09', amount: '5' },
  { at: '2021-02-15', amount: '6' },
  { at: '2021-02-16', amount: '7' },
  { at: '2021-02-18', amount: '8' },
  { at: '2021-02-20', amount: '9' },
];

it('merge the 2 bridges locked value', () => {
  expect(mergeLockedArray(ethArray, bscArray)).toStrictEqual(mergedArray);
});
