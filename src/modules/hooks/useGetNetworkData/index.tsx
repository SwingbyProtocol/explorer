import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToggleBridge } from '..';
import { PATH } from '../../env';
import { fetchFloatBalances, fetchStatsInfo } from '../../explorer';
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
            fetchStatsInfo(bridge, usd.BTC),
          ]);

          const data = results[0];
          const stats = results[1];

          const updateStates = () => {
            dispatch(
              updateNetworkInfos({ floatBalances: data.floats, capacity: data.capacity, stats }),
            );
            dispatch(toggleIsLoading(false));
          };

          data && stats && updateStates();
        } catch (error) {
          dispatch(toggleIsLoading(false));
        }
      })();
  }, [usd, dispatch, bridge]);
};
