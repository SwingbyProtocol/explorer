export const numToK = (num: number) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1)) + 'k'
    : Math.sign(num) * Math.abs(num);
};

export const convert2Currency = (crypto: string, fiat: number): number => {
  const cryptoNum = Number(crypto);
  return Number((fiat * cryptoNum).toFixed(2));
};

export const convertFromPercent = (num: number): number => {
  return num / 100;
};
