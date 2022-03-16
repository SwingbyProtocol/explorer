import { removeDuplicatedAt, mergeLockedArray } from '../index';

const ethArray = [
  { at: '2021-02-08', amount: '1' },
  { at: '2021-02-15', amount: '2' },
  { at: '2021-02-16', amount: '3' },
];

const expectedMergedArray = [
  { at: '2021-02-08', amount: '1' },
  { at: '2021-02-09', amount: '5' },
  { at: '2021-02-15', amount: '6' },
  { at: '2021-02-16', amount: '8' },
  { at: '2021-02-18', amount: '9' },
  { at: '2021-02-20', amount: '10' },
];

const mergedArray = mergeLockedArray(ethArray, []);
// Memo: Remove duplicated 'at'
const listedHistories = removeDuplicatedAt(mergedArray);

it('merge the 2 bridges locked value', () => {
  expect(listedHistories).toStrictEqual(expectedMergedArray);
});
