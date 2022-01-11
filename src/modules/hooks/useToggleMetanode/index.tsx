import { useCallback, useEffect, useState } from 'react';

import { useLoadMetanodes } from '..';
import { ENDPOINT_SKYBRIDGE_EXCHANGE, mode, PATH } from '../../env';
import { IChartDate } from '../../explorer';
import { fetcher } from '../../fetch';
import {
  getActiveNodeList,
  IBondHistories,
  IChurn,
  ILiquidity,
  ILiquidityRatio,
  ILiquidityRatios,
  IRewards,
  listHistory,
} from '../../metanodes';
import { useInterval } from '../useInterval';
import { useToggleBridge } from '../useToggleBridge';

export const useToggleMetanode = (path: PATH) => {
  const { bridge } = useToggleBridge(path);

  const [rewards, setRewards] = useState<IRewards | null>(null);
  const [liquidity, setLiquidity] = useState<ILiquidity | null>(null);
  const [churnTime, setChurnTime] = useState<IChurn | null>(null);
  const [bondHistories, setBondHistories] = useState<IChartDate[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liquidityRatio, setLiquidityRatio] = useState<ILiquidityRatio[] | null>(null);

  const { nodes, nodeTvl } = useLoadMetanodes({ bridge });

  const getRewards = useCallback(async () => {
    if ((bridge && path === PATH.METANODES) || (bridge && path === PATH.ROOT)) {
      const { rewards } = await getActiveNodeList({ bridge, isRewardsCheck: true });
      setRewards(rewards);
    } else {
      // Memo: path === Root && bridge === '' (Multi-bridge)
      const results = await Promise.all([
        getActiveNodeList({ bridge: 'btc_erc', isRewardsCheck: true }),
        getActiveNodeList({ bridge: 'btc_bep20', isRewardsCheck: true }),
      ]);

      const ercRewards = results[0];
      const bscRewards = results[1];

      setRewards({
        weeklyRewardsUsd: ercRewards.rewards.weeklyRewardsUsd + bscRewards.rewards.weeklyRewardsUsd,
        average: 0,
      });
    }
  }, [bridge, path]);

  const getLiquidity = useCallback(async () => {
    if (bridge && path === PATH.METANODES) {
      const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/bond-to-liquidity`;
      const result = await fetcher<ILiquidity>(url);
      setLiquidity(result);
    }
  }, [bridge, path]);

  const getBondHistory = useCallback(async () => {
    if (bridge && path === PATH.METANODES) {
      const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/bonded-historic`;
      const result = await fetcher<IBondHistories>(url);
      const bondHistoriesData = result.data;
      const listBondHistory = listHistory(bondHistoriesData);
      setBondHistories(listBondHistory);
    }
  }, [bridge, path]);

  const getLiquidityRation = useCallback(async () => {
    if (bridge && path === PATH.METANODES) {
      const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/liquidity-ratio`;
      const result = await fetcher<ILiquidityRatios>(url);
      const liquidityRationData = result.data;
      setLiquidityRatio(liquidityRationData);
    }
  }, [bridge, path]);

  const getChurnTime = useCallback(async () => {
    if (bridge && path === PATH.METANODES) {
      const churnUrl = bridge && `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/churn-info`;
      const result = await fetcher<IChurn>(churnUrl);
      setChurnTime(result);
    }
  }, [bridge, path]);

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          getRewards(),
          getLiquidity(),
          getBondHistory(),
          getLiquidityRation(),
          getChurnTime(),
        ]);
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getBondHistory, getLiquidityRation, getChurnTime, getLiquidity, getRewards]);

  useEffect(() => {
    setRewards(null);
    setLiquidity(null);
    setChurnTime(null);
    setBondHistories(null);
    setLiquidityRatio(null);
    setIsLoading(true);
  }, [bridge]);

  useInterval(() => {
    path === PATH.METANODES && getChurnTime();
  }, [1000 * 60]);

  return {
    nodes,
    nodeTvl,
    bridge,
    bondHistories,
    liquidity,
    liquidityRatio,
    churnTime,
    rewards,
    isLoading,
  };
};
