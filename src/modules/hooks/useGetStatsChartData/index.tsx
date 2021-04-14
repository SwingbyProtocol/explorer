import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IFloatHistoryObject } from '..';
import { CACHED_ENDPOINT, PATH } from '../../env';
import { fetcher } from '../../fetch';
import { listFloatAmountHistories, getLockedHistory } from '../../metanodes';
import { initalVolumes } from '../../store';
import { useToggleBridge } from '../useToggleBridge';

export const useGetStatsChartData = () => {
  const { bridge } = useToggleBridge(PATH.ROOT);
  const volumes = useSelector((state) => state.explorer.networkInfos.stats.volumes);
  const [floatHistories, setFloatHistories] = useState(initalVolumes);
  const [lockHistories, setLockHistories] = useState(initalVolumes);

  const getFloatHistory = async (bridge: string) => {
    let url = '';
    if (bridge) {
      url = `${CACHED_ENDPOINT}/v1/production/${bridge}/float-historic`;
    } else {
      url = `${CACHED_ENDPOINT}/v1/production/float-historic`;
    }
    const data = await fetcher<IFloatHistoryObject[]>(url);
    return data;
  };

  useEffect(() => {
    (async () => {
      const results = await Promise.all([getFloatHistory(bridge), getLockedHistory(bridge)]);
      const floatHistoriesData = listFloatAmountHistories(results[0]);
      setFloatHistories(floatHistoriesData);
      setLockHistories(results[1]);
    })();
  }, [bridge]);

  return { volumes, floatHistories, lockHistories };
};
