import { calculateVwap, sumArray } from './index';

const testArray = [2, 3, 2];

// Ref: https://api.coingecko.com/api/v3/coins/swingby/market_chart?days=7&vs_currency=usd&interval=daily
// Memo: Swingby price data during 12 ~ 19 Apr
const marketData = {
  prices: [
    [1618272000000, 0.6376374439310816],
    [1618358400000, 0.5964655126950319],
    [1618444800000, 0.5841401464354775],
    [1618531200000, 0.5936151705493641],
    [1618617600000, 0.5290959128857052],
    [1618704000000, 0.5503873092964819],
    [1618798792000, 0.49890316306011556],
  ],
  market_caps: [
    [1618272000000, 78570442.46562156],
    [1618358400000, 73475050.9209529],
    [1618444800000, 71564602.77511482],
    [1618531200000, 73148518.76311317],
    [1618617600000, 65220292.40518636],
    [1618704000000, 68067381.49116817],
    [1618798792000, 61877384.47817382],
  ],
  total_volumes: [
    [1618272000000, 3154746.1738124317],
    [1618358400000, 2838639.332763009],
    [1618444800000, 2192213.544554478],
    [1618531200000, 1296902.9798534887],
    [1618617600000, 3184390.524800979],
    [1618704000000, 1961657.6372040757],
    [1618798792000, 2584033.895684095],
  ],
};
it('return network name', () => {
  expect(sumArray(testArray)).toStrictEqual(7);
});

it('test VWAP ', () => {
  expect(
    calculateVwap([
      [5, 10],
      [13, 8.5],
      [10, 11],
    ]),
  ).toStrictEqual(9.660714285714286);
  expect(
    calculateVwap([
      [marketData.total_volumes[0][1], marketData.prices[0][1]],
      [marketData.total_volumes[1][1], marketData.prices[1][1]],
      [marketData.total_volumes[2][1], marketData.prices[2][1]],
      [marketData.total_volumes[3][1], marketData.prices[3][1]],
      [marketData.total_volumes[4][1], marketData.prices[4][1]],
      [marketData.total_volumes[5][1], marketData.prices[5][1]],
      [marketData.total_volumes[6][1], marketData.prices[6][1]],
    ]),
  ).toStrictEqual(0.5698655175704712);
});
