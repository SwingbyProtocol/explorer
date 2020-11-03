export const addComma = (price: number, decimal: number): string => {
  return price.toFixed(decimal).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};
