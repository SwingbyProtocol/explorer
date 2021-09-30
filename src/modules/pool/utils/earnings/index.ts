import { DateTime } from 'luxon';

import { IAprChartData, IEarningsChartData } from '../..';
import { IClaimedTx, IAprHistoric } from '../../../hooks';

export const mergeSameDateEarningsData = ({
  claimedTxs,
  pendingSwingby,
}: {
  claimedTxs: IClaimedTx[];
  pendingSwingby: number;
}): IEarningsChartData[] => {
  let lookUpTable: string[] = [];
  let dataTable: IEarningsChartData[] = [];
  claimedTxs.forEach((tx: IClaimedTx) => {
    const SWINGBY = Number(tx.value);
    const dt = DateTime.fromSeconds(Number(tx.timeStamp));
    const name = dt.toLocaleString({
      month: 'short',
      day: 'numeric',
    });
    if (lookUpTable.includes(name)) {
      dataTable = dataTable.map((item) => {
        return {
          name,
          timestamp: item.timestamp,
          SWINGBY: SWINGBY + item.SWINGBY,
        };
      });
    } else {
      const item: IEarningsChartData = {
        name,
        timestamp: Number(tx.timeStamp),
        SWINGBY,
      };
      lookUpTable.push(name);
      dataTable.push(item);
    }
  });

  return dataTable.concat([
    {
      name: 'Pending',
      timestamp: Number(Date.now() / 1000),
      SWINGBY: pendingSwingby,
    },
  ]);
};

export const formatAprData = (histories: IAprHistoric[]): IAprChartData[] => {
  return histories.map((history) => {
    const APR = Number(history.farm) + Number(history.sbBtc);
    const dt = DateTime.fromISO(history.createdAt);
    const name = dt.toLocaleString({
      month: 'short',
      day: 'numeric',
    });
    return { APR, name };
  });
};
