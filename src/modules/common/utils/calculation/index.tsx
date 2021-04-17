export const formatNum = (n: number): string | number => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
};

export const convert2Currency = (crypto: string, fiat: number): number => {
  const cryptoNum = Number(crypto);
  return Number((fiat * cryptoNum).toFixed(2));
};

export const convertFromPercent = (num: number): number => {
  return num / 100;
};

export const sumArray = (arr: number[]) => {
  return arr.reduce((prev, current) => {
    return prev + current;
  });
};

// Memo: Calculate the Volume-Weighted Average Price (VWAP)
// Ref: https://github.com/miguelmota/vwap/blob/master/index.js
// Input: [[volume, price], [volume, price], ...]
export const calculateVwap = (...p: any[]): number => {
  if (p.length === 1 && Array.isArray(p[0])) p = p[0];
  if (!p.length) return 0;
  // Formula: sum(num shares * share price)/(total shares)
  return p.reduce((s, x) => s + x[0] * x[1], 0) / p.reduce((s, x) => s + x[0], 0) || 0;
};
