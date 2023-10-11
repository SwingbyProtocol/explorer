import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';

import { useToggleBridge, useLoadHistories } from '..';
import { mode, NETWORK_INFO_FETCH_RATE, PATH } from '../../env';
import {
  fetch1wksRewards,
  fetchFloatBalances,
  fetchVolumeInfo,
  parseVolumeInfo,
} from '../../explorer';
import { getNodeQty } from '../../network-stats';
import { toggleIsLoading, updateNetworkInfos, usdPricesSelector } from '../../store';

export const useGetNetworkData = () => {
  const dispatch = useDispatch();
  const usd = useSelector(usdPricesSelector);
  const { bridge } = useToggleBridge(PATH.ROOT);

  // refetchingState used to trigger fetcher re-evaluation
  // after the previous async handler completes
  const [refetchingState, setRefetchingState] = useState(0);

  const { data: txData, loading: txLoading, fetchMoreQuery } = useLoadHistories();
  const [fetchedEnoughTx, setFetchedEnoughTx] = useState(false);

  const fetcher = useCallback(async () => {
    dispatch(toggleIsLoading(true));
    try {
      const results = await Promise.all([
        fetchFloatBalances(usd.BTC, bridge),
        fetchVolumeInfo(bridge, usd.BTC), // use for year chart
        // @ts-expect-error
        parseVolumeInfo(txData.transactions.edges, bridge, usd.BTC), // use for week / month chart
        fetch1wksRewards(bridge),
        getNodeQty({ bridge, mode }),
      ]);

      const data = results[0];
      const stats = {
        volume1wksWBTC_Skypool: results[2].volume1wksWBTC_Skypool,
        volume1wksBTC: results[2].volume1wksBTC,
        volumes: results[2].volumes,
        volumes1mWBTC_Skypool: results[2].volumes1mWBTC_Skypool,
        volumes1mBTC: results[2].volumes1mBTC,
        volumes1m: results[2].volumes1m,
        volumes1yWBTC_Skypool: results[1].volumes1yWBTC_Skypool,
        volumes1yBTC: results[1].volumes1yBTC,
        volumes1y: results[1].volumes1y,
        rewards1wksUSD: results[3],
        metanodes: results[4],
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
  }, [usd, dispatch, bridge, txData, txLoading, fetchMoreQuery]);

  useEffect(() => {
    const now = DateTime.local().startOf('day');
    const oneMonthAgo = now.minus({ days: 29 }); // only 30 items in array

    const isFetchedEnoughTx = txData?.transactions.edges.some((edge) => {
      const at = DateTime.fromISO(edge.node.at);
      return at < oneMonthAgo;
    });
    if (isFetchedEnoughTx) {
      setFetchedEnoughTx(true);
    } else {
      fetchMoreQuery();
    }
  }, [txData]);

  useEffect(() => {
    if (!fetchedEnoughTx) return;

    (async () => {
      usd.BTC > 0 && (await fetcher());
      setTimeout(() => setRefetchingState(refetchingState + 1), NETWORK_INFO_FETCH_RATE);
    })();
  }, [usd, fetcher, refetchingState, fetchedEnoughTx]);
};
