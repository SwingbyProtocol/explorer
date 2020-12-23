import { orgFloor } from './index';
it('return number with decimal will not more than 3', () => {
  expect(orgFloor(1.23456, 3)).toStrictEqual(1.234);
  expect(orgFloor(1.2349, 3)).toStrictEqual(1.234);
  expect(orgFloor(1.239, 3)).toStrictEqual(1.239);
  expect(orgFloor(1.2, 3)).toStrictEqual(1.2);
  expect(orgFloor(1, 3)).toStrictEqual(1);
});
it('return number with decimal will not more than 2', () => {
  expect(orgFloor(1.23456, 2)).toStrictEqual(1.23);
  expect(orgFloor(1.2349, 2)).toStrictEqual(1.23);
  expect(orgFloor(1.239, 2)).toStrictEqual(1.23);
  expect(orgFloor(1.2, 2)).toStrictEqual(1.2);
  expect(orgFloor(1, 2)).toStrictEqual(1);
});
it('return number with decimal will not more than 8', () => {
  expect(orgFloor(1.433999878, 8)).toStrictEqual(1.43399987);
  expect(orgFloor(1.433999871, 8)).toStrictEqual(1.43399987);
  expect(orgFloor(1.12, 8)).toStrictEqual(1.12);
  expect(orgFloor(0.123, 8)).toStrictEqual(0.123);
});
