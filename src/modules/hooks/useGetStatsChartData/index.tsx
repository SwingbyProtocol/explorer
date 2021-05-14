import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IFloatHistoryObject } from '..';
import { ENDPOINT_SKYBRIDGE_EXCHANGE } from '../../env';
import { fetcher } from '../../fetch';
import { getLockedHistory, listFloatAmountHistories } from '../../metanodes';
import { initialVolumes } from '../../store';

export const useGetStatsChartData = () => {
  const volumes = useSelector((state) => state.explorer.networkInfos.stats.volumes);
  const [floatHistories, setFloatHistories] = useState(initialVolumes);
  const [lockHistories, setLockHistories] = useState(initialVolumes);

  const getFloatHistory = async () => {
    const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/production/float-historic`;

    const data = await fetcher<IFloatHistoryObject[]>(url);
    return data;
  };

  useEffect(() => {
    (async () => {
      const results = await Promise.all([getFloatHistory(), getLockedHistory()]);
      const floatHistoriesData = listFloatAmountHistories(results[0]);
      setFloatHistories(floatHistoriesData);
      setLockHistories(results[1]);
    })();
  }, []);

  return { volumes, floatHistories, lockHistories };
};
