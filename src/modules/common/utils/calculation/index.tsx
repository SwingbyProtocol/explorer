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
