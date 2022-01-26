import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToggleBridge } from '../index';
import { PATH } from '../../env';
import {
  fetch1wksRewards,
  fetchFloatBalances,
  fetchDayVolumeInfo,
  fetchMonthlyVolumeInfo,
} from '../../explorer';
import { getNodeQty } from '../../network-stats';
import { toggleIsLoading, updateNetworkInfos } from '../../store';

export const useGetNetworkData = () => {
  const dispatch = useDispatch();
  const usd = useSelector((state) => state.explorer.usd);
  const { bridge } = useToggleBridge(PATH.ROOT);

  useEffect(() => {
    dispatch(toggleIsLoading(true));
    usd.BTC > 0 &&
      (async () => {
        try {
          const results = await Promise.all([
            fetchFloatBalances(usd.BTC, bridge),
            fetchDayVolumeInfo(bridge, usd.BTC),
            fetch1wksRewards(bridge),
            getNodeQty({ bridge }),
            fetchMonthlyVolumeInfo(bridge, usd.BTC),
          ]);

          const data = results[0];
          const stats = {
            volume1wksWBTC: results[1].volume1wksWBTC,
            volume1wksBTCB: results[1].volume1wksBTCB,
            volume1wksBTC: results[1].volume1wksBTC,
            volumes: results[1].volumes,
            rewards1wksUSD: results[2],
            metanodes: results[3],
            volume1yrWBTC: results[4].volume1yrWBTC,
            volume1yrBTCB: results[4].volume1yrBTCB,
            volume1yrBTC: results[4].volume1yrBTC,
            volumesYear: results[4].volumes,
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
      })();
  }, [usd, dispatch, bridge]);
};
