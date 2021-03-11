import { DateTime } from 'luxon';
import { useState } from 'react';

import { useInterval } from '../useInterval';

import { ICountdown } from './../index';

export const useRunCountDown = (endingTime: number): ICountdown => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const runCountdown = (): void => {
    const timestamp = Math.floor(Date.now() / 1000);

    const endTime = DateTime.fromSeconds(Number(endingTime));
    const now = DateTime.fromSeconds(timestamp);

    //Ref: https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html
    const duration = endTime.diff(now, ['days', 'hours', 'minutes', 'seconds']).toObject();

    const days = duration.days;
    const hours = duration.hours;
    const mins = Math.floor(duration.minutes);
    const secs = Math.floor(duration.seconds);
    setCountdown({
      days: days,
      hours: hours,
      minutes: mins,
      seconds: secs,
    });
  };

  useInterval(() => {
    runCountdown();
  }, 1000);
  return endingTime && countdown;
};
