import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToggleBridge } from '..';
import { mode, NETWORK_INFO_FETCH_RATE, PATH } from '../../env';
import { fetch1wksRewards, fetchFloatBalances, fetchVolumeInfo } from '../../explorer';
import { getNodeQty } from '../../network-stats';
import { toggleIsLoading, updateNetworkInfos, usdPricesSelector } from '../../store';

export const useGetNetworkData = () => {
  const dispatch = useDispatch();
  const usd = useSelector(usdPricesSelector);
  const { bridge } = useToggleBridge(PATH.ROOT);

  // refetchingState used to trigger fetcher re-evaluation
  // after the previous async handler completes
  const [refetchingState, setRefetchingState] = useState(0);

  const fetcher = useCallback(async () => {
    dispatch(toggleIsLoading(true));
    try {
      const results = await Promise.all([
        fetchFloatBalances(usd.BTC, bridge),
        fetchVolumeInfo(bridge, usd.BTC),
        fetch1wksRewards(bridge),
        getNodeQty({ bridge, mode }),
      ]);

      const data = results[0];
      const stats = {
        volume1wksWBTC_Skypool: results[1].volume1wksWBTC_Skypool,
        volume1wksBTC: results[1].volume1wksBTC,
        volumes: results[1].volumes,
        volumes1mWBTC_Skypool: results[1].volumes1mWBTC_Skypool,
        volumes1mBTC: results[1].volumes1mBTC,
        volumes1m: results[1].volumes1m,
        volumes1yWBTC_Skypool: results[1].volumes1yWBTC_Skypool,
        volumes1yBTC: results[1].volumes1yBTC,
        volumes1y: results[1].volumes1y,
        rewards1wksUSD: results[2],
        metanodes: results[3],
      };

      const updateStates = () => {
        dispatch(
          updateNetworkInfos({ floatBalances: data.floats, capacity: data.capacity, stats }),
        );
      };

      data && stats && updateStates();
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(toggleIsLoading(false));
    }
  }, [usd, dispatch, bridge]);

  useEffect(() => {
    (async () => {
      usd.BTC > 0 && (await fetcher());
      setTimeout(() => setRefetchingState(refetchingState + 1), NETWORK_INFO_FETCH_RATE);
    })();
  }, [usd, fetcher, refetchingState]);
};
