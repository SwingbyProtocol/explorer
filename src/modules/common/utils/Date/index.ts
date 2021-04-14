import { DateTime } from 'luxon';
export const getShortDate = (d: string) => {
  const date = new Date(d);
  const dt = DateTime.fromJSDate(date).toUTC();
  return dt.toISODate();
};
