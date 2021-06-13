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

  const getChurnTime = useCallback(async () => {
    const churnUrl = bridge && `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/churn-info`;
    const result = await fetcher<IChurn>(churnUrl);
    setChurnTime(result);
  }, [bridge]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        if (bridge && path === PATH.METANODES) {
          const rewardsUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/rewards-last-week`;
          const liquidityUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/bond-to-liquidity`;
          const bondHistoryUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/bonded-historic`;
          const liquidityRatioUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/liquidity-ratio`;

          const results = await Promise.all([
            fetchNodeList(bridge),
            fetcher<IReward>(rewardsUrl),
            fetcher<ILiquidity>(liquidityUrl),
            fetcher<IBondHistories>(bondHistoryUrl),
            fetcher<ILiquidityRatios>(liquidityRatioUrl),
            getChurnTime(),
          ]);

          const nodes = results[0];
          const rewardData = results[1];
          const liquidityData = results[2];
          const bondHistoriesData = results[3].data;
          const liquidityRationData = results[4].data;

          const listBondHistory = listHistory(bondHistoriesData).reverse();

          setMetanodes(nodes);
          setReward(rewardData);
          setLiquidity(liquidityData);
          setBondHistories(listBondHistory);
          setLiquidityRatio(liquidityRationData);
          setIsLoading(false);
        } else if (bridge && path === PATH.ROOT) {
          const rewardsUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/rewards-last-week`;
          const rewardData = await fetcher<IReward>(rewardsUrl);
          setReward(rewardData);
          setIsLoading(false);
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
      } catch (error) {
        setIsLoading(false);
      }
    })();
  }, [bridge, getChurnTime, path]);

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
