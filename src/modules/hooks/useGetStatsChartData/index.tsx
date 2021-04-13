import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { IFloatHistoryObject } from '..';
import { CACHED_ENDPOINT, PATH } from '../../env';
import { fetcher } from '../../fetch';
import { listFloatAmountHistories } from '../../metanodes';
import { initalVolumes } from '../../store';
import { useToggleBridge } from '../useToggleBridge';

export const useGetStatsChartData = () => {
  const { bridge } = useToggleBridge(PATH.ROOT);
  const volumes = useSelector((state) => state.explorer.networkInfos.stats.volumes);
  const isLoading = useSelector((state) => state.explorer.isLoading);

  const { formatDate } = useIntl();

  const getFloatHistoryUrl = (bridge: string) => {
    if (bridge) {
      return `${CACHED_ENDPOINT}/v1/production/${bridge}/float-historic`;
    }
    return `${CACHED_ENDPOINT}/v1/production/float-historic`;
  };

  const [floatHistories, setFloatHistories] = useState(initalVolumes);

  useEffect(() => {
    (async () => {
      const results = await Promise.all([
        fetcher<IFloatHistoryObject[]>(getFloatHistoryUrl(bridge)),
      ]);
      const floatHistoriesData = listFloatAmountHistories(results[0], formatDate);
      isLoading && setFloatHistories(floatHistoriesData);
    })();
  }, [bridge, formatDate, isLoading]);

  return { volumes, floatHistories };
};
