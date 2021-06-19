import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IFloatHistoryObject } from '..';
import { ENDPOINT_SKYBRIDGE_EXCHANGE, PATH } from '../../env';
import { fetcher } from '../../fetch';
import { getLockedHistory, listFloatAmountHistories } from '../../metanodes';
import { floatHistoryObjectInitialValue, initialVolumes } from '../../store';
import { useToggleBridge } from '../useToggleBridge';

export const useGetStatsChartData = () => {
  const { bridge } = useToggleBridge(PATH.ROOT);
  const volumes = useSelector((state) => state.explorer.networkInfos.stats.volumes);
  const [floatHistories, setFloatHistories] = useState(initialVolumes);
  const [lockHistories, setLockHistories] = useState(initialVolumes);
  const [isLoading, setIsLoading] = useState(false);

  const getFloatHistory = async (bridge: SkybridgeBridge) => {
    const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/production/float-historic`;
    const urlEth = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/production/btc_erc/float-historic`;
    const urlBsc = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/production/btc_bep20/float-historic`;
    try {
      if (bridge === 'btc_erc') {
        return await fetcher<IFloatHistoryObject[]>(urlEth);
      } else if (bridge === 'btc_bep20') {
        return await fetcher<IFloatHistoryObject[]>(urlBsc);
      } else {
        return await fetcher<IFloatHistoryObject[]>(url);
      }
    } catch (error) {
      console.log(error);
      return floatHistoryObjectInitialValue;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const results = await Promise.all([getFloatHistory(bridge), getLockedHistory(bridge)]);
        const floatHistoriesData = listFloatAmountHistories(results[0] as IFloatHistoryObject[]);
        setFloatHistories(floatHistoriesData);
        setLockHistories(results[1]);
        setIsLoading(false);
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [bridge]);

  return { volumes, floatHistories, lockHistories, isLoading };
};
