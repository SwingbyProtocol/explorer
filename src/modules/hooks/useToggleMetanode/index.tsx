import { useCallback, useEffect, useState } from 'react';

import { Bridge, Mode, Node, useNodesDetailsQuery } from '../../../generated/graphql';
import { ENDPOINT_SKYBRIDGE_EXCHANGE, mode, PATH } from '../../env';
import { IChartDate } from '../../explorer';
import { fetcher } from '../../fetch';
import {
  IBondHistories,
  IChurn,
  ILiquidity,
  ILiquidityRatio,
  ILiquidityRatios,
  IReward,
  listHistory,
} from '../../metanodes';
import { useInterval } from '../useInterval';
import { useToggleBridge } from '../useToggleBridge';

export const useToggleMetanode = (path: PATH) => {
  const { bridge, defaultBridge } = useToggleBridge(path);

  const [metanodes, setMetanodes] = useState<Node[] | null>(null);
  const [reward, setReward] = useState<IReward | null>(null);
  const [liquidity, setLiquidity] = useState<ILiquidity | null>(null);
  const [churnTime, setChurnTime] = useState<IChurn | null>(null);
  const [bondHistories, setBondHistories] = useState<IChartDate[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liquidityRatio, setLiquidityRatio] = useState<ILiquidityRatio[] | null>(null);

  const { data } = useNodesDetailsQuery({
    variables: {
      mode: mode as Mode,
      bridge: bridge as Bridge,
    },
    skip: !bridge,
  });

  const getNodes = useCallback(async () => {
    if (bridge && path === PATH.METANODES && data?.nodes) {
      setMetanodes(data.nodes as Node[]);
    }
  }, [bridge, path, data]);

  const getRewards = useCallback(async () => {
    if (bridge && path === PATH.METANODES) {
      const rewardsUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/rewards-last-week`;
      const result = await fetcher<IReward>(rewardsUrl);
      setReward(result);
    } else if (bridge && path === PATH.ROOT) {
      const rewardsUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/rewards-last-week`;
      const rewardData = await fetcher<IReward>(rewardsUrl);
      setReward(rewardData);
    } else {
      // Memo: path === Root && bridge === '' (Multi-bridge)
      const ercRewardsUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/btc_erc/rewards-last-week`;
      const skypoolsRewardsUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/btc_skypool/rewards-last-week`;
      const results = await Promise.all([
        fetcher<IReward>(ercRewardsUrl),
        fetcher<IReward>(skypoolsRewardsUrl),
      ]);

      const ercRewardData = results[0];
      const skypoolsRewardsData = results[1];

      const rewardData = {
        currency: 'USD',
        networkRewards: (
          Number(ercRewardData.networkRewards) + Number(skypoolsRewardsData.networkRewards)
        ).toFixed(0),
        stakingRewards: (
          Number(ercRewardData.stakingRewards) + Number(skypoolsRewardsData.stakingRewards)
        ).toFixed(0),
        total: (Number(ercRewardData.total) + Number(skypoolsRewardsData.total)).toFixed(0),
        avgPerNode: '0',
      };
      setReward(rewardData);
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
          getNodes(),
        ]);
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getBondHistory, getLiquidityRation, getChurnTime, getLiquidity, getRewards, getNodes]);

  useEffect(() => {
    setReward(null);
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
    bridge,
    defaultBridge,
    metanodes,
    bondHistories,
    liquidity,
    liquidityRatio,
    churnTime,
    reward,
    isLoading,
  };
};
