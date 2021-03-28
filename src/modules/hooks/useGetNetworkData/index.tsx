import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToggleBridge } from '..';
import { PATH } from '../../env';
import { fetchFloatBalances, fetchStatsInfo, IFloat, IStats } from '../../explorer';
import { toggleIsLoading, updateNetworkInfos } from '../../store';

export const useGetNetworkData = () => {
  const dispatch = useDispatch();
  const explorer = useSelector((state) => state.explorer);
  const { usd } = explorer;
  const { bridge } = useToggleBridge(PATH.ROOT);

  const updateState = useCallback(
    (floats: IFloat, capacity: number, stats: IStats) => {
      dispatch(updateNetworkInfos({ floatBalances: floats, capacity, stats }));
      dispatch(toggleIsLoading(false));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(toggleIsLoading(true));
    usd.BTC > 0 &&
      (async () => {
        const results = await Promise.all([
          fetchFloatBalances(usd.BTC, bridge),
          fetchStatsInfo(bridge),
        ]);

        const data = results[0];
        const stats = results[1];

        data.floats && data.capacity && stats && updateState(data.floats, data.capacity, stats);
      })();
  }, [usd, dispatch, bridge, updateState]);
};
