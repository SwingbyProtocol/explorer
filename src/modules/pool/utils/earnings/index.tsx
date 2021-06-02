import { FormatDateOptions } from 'react-intl';

import { IEarning, TEarningPeriod } from '../..';

export const makeEarningsData = (rawData: IEarning[], duration: 'All' | '14d' | '1d') => {
  let period: number;
  if (duration === 'All') {
    period = rawData.length;
  }
  if (duration === '14d') {
    period = 14;
  }
  if (duration === '1d') {
    period = 24;
  }

  const dataSet = rawData.slice(0, period).reverse();
  const data = dataSet.map((it) => {
    return {
      amount: Number(it.value),
      at: it.timestamp,
    };
  });
  return data;
};

type TFormatType = (value: string | number | Date, opts?: FormatDateOptions) => string;

export const makeTimeLabels = (
  times: string[],
  duration: TEarningPeriod,
  formatDate: TFormatType, // react-Intl function
  formatTime: TFormatType, // react-Intl function,
) => {
  const dateLength = times.length;
  const showDateDays = 3;
  const blankRepeatNum = Math.floor((dateLength - showDateDays) / 2);
  let labels = [];

  const blankRepeat = (repeatNum: number) => {
    let blankArray = [];
    for (let i = 0; i < repeatNum; i++) {
      blankArray.push('');
    }
    return blankArray;
  };

  if (duration !== '1d') {
    labels = [
      formatDate(times[0], {
        month: 'short',
        day: 'numeric',
      }),
      formatDate(times[1], {
        month: 'short',
        day: 'numeric',
      }),
      // blankRepeat(blankRepeatNum),
      '',
      formatDate(times[Math.floor(dateLength / 2)], {
        month: 'short',
        day: 'numeric',
      }),
      // Memo: Adjust for chart.js. Debug with: console.log('times', times);
      blankRepeat(blankRepeatNum - 1),
      duration === '14d'
        ? ''
        : formatDate(times[times.length - 2], {
            month: 'short',
            day: 'numeric',
          }),
      formatDate(times[times.length - 1], {
        month: 'short',
        day: 'numeric',
      }),
    ];
  }
  if (duration === '1d') {
    labels = [
      formatTime(new Date(times[0])),
      blankRepeat(blankRepeatNum),
      '',
      formatTime(new Date(times[Math.floor(dateLength / 2)])),
      blankRepeat(blankRepeatNum - 1),
      // Memo: Adjust for chart.js. Debug with: console.log
      formatTime(new Date(times[times.length - 1])),
      '',
    ];
  }

  return labels.flat();
};
