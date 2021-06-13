import { useCallback, useEffect, useState } from 'react';

import { ENDPOINT_SKYBRIDGE_EXCHANGE, mode, PATH } from '../../env';
import { IChartDate } from '../../explorer';
import { fetcher } from '../../fetch';
import {
  fetchNodeList,
  IBondHistories,
  IChurn,
  ILiquidity,
  ILiquidityRatio,
  ILiquidityRatios,
  INodeListResponse,
  IReward,
  listHistory,
} from '../../metanodes';
import { useInterval } from '../useInterval';
import { useToggleBridge } from '../useToggleBridge';

export const useToggleMetanode = (path: PATH) => {
  const { bridge } = useToggleBridge(path);

  const [metanodes, setMetanodes] = useState<INodeListResponse[] | null>(null);
  const [reward, setReward] = useState<IReward | null>(null);
  const [liquidity, setLiquidity] = useState<ILiquidity | null>(null);
  const [churnTime, setChurnTime] = useState<IChurn | null>(null);
  const [bondHistories, setBondHistories] = useState<IChartDate[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [liquidityRatio, setLiquidityRatio] = useState<ILiquidityRatio[] | null>(null);

  const getRewards = useCallback(async () => {
    if (bridge && path === PATH.METANODES) {
      const rewardsUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/rewards-last-week`;
      const result = await fetcher<IReward>(rewardsUrl);
      setReward(result);
    }
    if (bridge && path === PATH.ROOT) {
      const rewardsUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/rewards-last-week`;
      const rewardData = await fetcher<IReward>(rewardsUrl);
      setReward(rewardData);
    } else {
      // Memo: path === Root && bridge === '' (Multi-bridge)
      const ercRewardsUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/btc_erc/rewards-last-week`;
      const bscRewardsUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/btc_bep20/rewards-last-week`;

      const results = await Promise.all([
        fetcher<IReward>(ercRewardsUrl),
        fetcher<IReward>(bscRewardsUrl),
      ]);

      const ercRewardData = results[0];
      const bscRewardData = results[1];

      const rewardData = {
        currency: 'USD',
        networkRewards: (
          Number(ercRewardData.networkRewards) + Number(bscRewardData.networkRewards)
        ).toFixed(0),
        stakingRewards: (
          Number(ercRewardData.stakingRewards) + Number(bscRewardData.stakingRewards)
        ).toFixed(0),
        total: (Number(ercRewardData.total) + Number(bscRewardData.total)).toFixed(0),
        avgPerNode: '0',
      };

      setReward(rewardData);
      setIsLoading(false);
    }
  }, [bridge, path]);

  const getLiquidity = useCallback(async () => {
    const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/bond-to-liquidity`;
    const result = await fetcher<ILiquidity>(url);
    setLiquidity(result);
  }, [bridge]);

  const getBondHistory = useCallback(async () => {
    const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/bonded-historic`;
    const result = await fetcher<IBondHistories>(url);
    const bondHistoriesData = result.data;
    const listBondHistory = listHistory(bondHistoriesData).reverse();
    setBondHistories(listBondHistory);
  }, [bridge]);

  const getLiquidityRation = useCallback(async () => {
    const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/liquidity-ratio`;
    const result = await fetcher<ILiquidityRatios>(url);
    const liquidityRationData = result.data;
    setLiquidityRatio(liquidityRationData);
  }, [bridge]);

  const getChurnTime = useCallback(async () => {
    const churnUrl = bridge && `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/churn-info`;
    const result = await fetcher<IChurn>(churnUrl);
    setChurnTime(result);
  }, [bridge]);

  const getNodes = useCallback(async () => {
    const nodes = await fetchNodeList(bridge);
    setMetanodes(nodes);
  }, [bridge]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          getRewards(),
          getLiquidity(),
          getBondHistory(),
          getLiquidityRation(),
          getChurnTime(),
          getNodes(),
        ]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    })();
  }, [getBondHistory, getLiquidityRation, getChurnTime, getLiquidity, getRewards, getNodes]);

  useEffect(() => {
    setMetanodes(null);
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
    metanodes,
    bondHistories,
    liquidity,
    liquidityRatio,
    churnTime,
    reward,
    isLoading,
  };
};
