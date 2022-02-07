export { titleGenerator, ellipseAddress } from './textGenerator';
export { convert2Currency, convertFromPercent, sumArray, formatNum } from './calculation';
export { getInitialLanguage } from './language';
export { scrollToTop } from './scrolling';
export { getShortDate, getMonthYear } from './Date';

export const delay = async (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};
