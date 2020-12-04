import { orgFloor } from './index';
it('return number with decimal will not more than 3', () => {
  expect(orgFloor(1.23456, 1000)).toStrictEqual(1.234);
  expect(orgFloor(1.2349, 1000)).toStrictEqual(1.234);
  expect(orgFloor(1.239, 1000)).toStrictEqual(1.239);
  expect(orgFloor(1.2, 1000)).toStrictEqual(1.2);
  expect(orgFloor(1, 1000)).toStrictEqual(1);
});
it('return number with decimal will not more than 2', () => {
  expect(orgFloor(1.23456, 100)).toStrictEqual(1.23);
  expect(orgFloor(1.2349, 100)).toStrictEqual(1.23);
  expect(orgFloor(1.239, 100)).toStrictEqual(1.23);
  expect(orgFloor(1.2, 100)).toStrictEqual(1.2);
  expect(orgFloor(1, 100)).toStrictEqual(1);
});
