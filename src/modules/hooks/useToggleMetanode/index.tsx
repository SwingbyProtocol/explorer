import { useCallback, useEffect, useState } from 'react';

import { CACHED_ENDPOINT, mode, PATH } from '../../env';
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
  TBondHistory,
} from '../../metanodes';
import { useInterval } from '../useInterval';
import { useToggleBridge } from '../useToggleBridge';

export const useToggleMetanode = (path: PATH) => {
  const { bridge } = useToggleBridge(path);

  const [metanodes, setMetanodes] = useState<INodeListResponse[] | null>(null);
  const [reward, setReward] = useState<IReward | null>(null);
  const [liquidity, setLiquidity] = useState<ILiquidity | null>(null);
  const [churnTime, setChurnTime] = useState<IChurn | null>(null);
  const [bondHistories, setBondHistories] = useState<TBondHistory[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [liquidityRatio, setLiquidityRatio] = useState<ILiquidityRatio[] | null>(null);

  const getChurnTime = useCallback(async () => {
    const churnUrl = bridge && `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/churn`;
    const result = await fetcher<IChurn>(churnUrl);
    setChurnTime(result);
  }, [bridge]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      if (bridge && path === PATH.METANODES) {
        const rewardsUrl = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/rewards-last-week`;
        const liquidityUrl = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/bond-to-liquidity`;
        const bondHistoryUrl = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/bonded-historic`;
        const liquidityRatioUrl = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/liquidity-ratio`;

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

        setMetanodes(nodes);
        setReward(rewardData);
        setLiquidity(liquidityData);
        setBondHistories(bondHistoriesData);
        setLiquidityRatio(liquidityRationData);
        setIsLoading(false);
      } else if (bridge && path === PATH.ROOT) {
        const rewardsUrl = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/rewards-last-week`;
        const rewardData = await fetcher<IReward>(rewardsUrl);
        setReward(rewardData);
        setIsLoading(false);
      } else {
        // Memo: path === Root && bridge === '' (Multi-bridge)
        const ercRewardsUrl = `${CACHED_ENDPOINT}/v1/${mode}/btc_erc/rewards-last-week`;
        const bscRewardsUrl = `${CACHED_ENDPOINT}/v1/${mode}/btc_bep20/rewards-last-week`;

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
    })();
  }, [bridge, getChurnTime, path]);

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
