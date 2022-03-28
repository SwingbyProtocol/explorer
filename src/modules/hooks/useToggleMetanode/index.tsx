import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLoadMetanodes } from '../index';
import { PATH } from '../../env';
import {
  getActiveNodeList,
  getBondToLiquidity,
  getLiquidityRatio,
  getNextChurnedTx,
  IChurn,
  ILiquidity,
  ILiquidityRatio,
  IRewards,
} from '../../metanodes';
import { useInterval } from '../useInterval';
import { useToggleBridge } from '../useToggleBridge';

export const useToggleMetanode = (path: PATH) => {
  const { bridge } = useToggleBridge(path);

  const [rewards, setRewards] = useState<IRewards | null>(null);
  const [liquidity, setLiquidity] = useState<ILiquidity | null>(null);
  const [churnTime, setChurnTime] = useState<IChurn | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liquidityRatio, setLiquidityRatio] = useState<ILiquidityRatio[] | null>(null);

  const { nodes, nodeTvl } = useLoadMetanodes({ bridge });
  const usd = useSelector((state) => state.explorer.usd);

  const getRewards = useCallback(async () => {
    if ((bridge && path === PATH.METANODES) || (bridge && path === PATH.ROOT)) {
      const { rewards } = await getActiveNodeList({ bridge, isRewardsCheck: true });
      setRewards(rewards);
    } else {
      let weeklyRewardsUsd: number;
      // Memo: path === Root && bridge === '' (Multi-bridge)
      const results = await Promise.all([
        getActiveNodeList({ bridge: 'btc_erc', isRewardsCheck: true }),
        getActiveNodeList({ bridge: 'btc_skypool', isRewardsCheck: true }),
      ]);

      const ercRewardsWeekly = results[0].rewards.weeklyRewardsUsd;
      const skypoolsRewardsWeekly = results[1].rewards.weeklyRewardsUsd;
      weeklyRewardsUsd = ercRewardsWeekly + skypoolsRewardsWeekly;

      setRewards({
        weeklyRewardsUsd,
        average: 0,
      });
    }
  }, [bridge, path]);

  const getLiquidity = useCallback(async () => {
    if (bridge && path === PATH.METANODES && usd && nodeTvl) {
      const swingbyUsdtPrice = usd.SWINGBY;
      const btcUsdtPrice = usd.BTC;
      const tvl = nodeTvl;
      const result = await getBondToLiquidity({ bridge, tvl, swingbyUsdtPrice, btcUsdtPrice });
      setLiquidity(result);
    }
  }, [bridge, path, usd, nodeTvl]);

  const getLiquidityRation = useCallback(async () => {
    if (bridge && path === PATH.METANODES && usd) {
      const btcUsdtPrice = usd.BTC;
      const { data } = await getLiquidityRatio({ bridge, btcUsdtPrice });
      setLiquidityRatio(data);
    }
  }, [bridge, path, usd]);

  const getChurnTime = useCallback(async () => {
    if (bridge && path === PATH.METANODES) {
      const { lastTxHash, nextAt } = await getNextChurnedTx(bridge);
      setChurnTime({ lastTxHash, nextAt });
    }
  }, [bridge, path]);

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([getRewards(), getLiquidity(), getLiquidityRation(), getChurnTime()]);
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getLiquidityRation, getChurnTime, getLiquidity, getRewards]);

  useEffect(() => {
    setRewards(null);
    setLiquidity(null);
    setChurnTime(null);
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
    liquidity,
    liquidityRatio,
    churnTime,
    rewards,
    isLoading,
  };
};
