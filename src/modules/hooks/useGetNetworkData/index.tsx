import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToggleBridge } from '../index';
import { PATH } from '../../env';
import { fetchFloatBalances, fetchDayVolumeInfo, fetchMonthlyVolumeInfo } from '../../explorer';
import { getNodeQty } from '../../network-stats';
import { toggleIsLoading, updateNetworkInfos } from '../../store';
import { usdPricesSelector } from '../../../store/selectors';

export const useGetNetworkData = () => {
  const dispatch = useDispatch();
  const usdPrices = useSelector(usdPricesSelector);
  const { bridge } = useToggleBridge(PATH.ROOT);

  useEffect(() => {
    dispatch(toggleIsLoading(true));
    usdPrices.BTC > 0 &&
      (async () => {
        try {
          const results = await Promise.all([
            fetchFloatBalances(usdPrices.BTC, bridge),
            fetchDayVolumeInfo(bridge, usdPrices.BTC),
            getNodeQty({ bridge }),
            fetchMonthlyVolumeInfo(bridge, usdPrices.BTC),
          ]);

          const data = results[0];
          const stats = {
            volume1wksWBTC: results[1].volume1wksWBTC,
            volume1wksBTCB: results[1].volume1wksBTCB,
            volume1wksBTC: results[1].volume1wksBTC,
            volumes: results[1].volumes ?? [],
            metanodes: results[2],
            volume1yrWBTC: results[3].volume1yrWBTC,
            volume1yrBTCB: results[3].volume1yrBTCB,
            volume1yrBTC: results[3].volume1yrBTC,
            volumesYear: results[3].volumes ?? [],
          };

          const updateStates = () => {
            dispatch(
              updateNetworkInfos({ floatBalances: data.floats, capacity: data.capacity, stats }),
            );
          };

          data && stats && updateStates();
        } catch (error) {
          console.error('Error on useGetNetworkData...', error);
        } finally {
          dispatch(toggleIsLoading(false));
        }
      })();
  }, [usdPrices, dispatch, bridge]);
};
