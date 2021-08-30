import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ITvl, ITvlResponses } from '..';
import { ENDPOINT_SKYBRIDGE_EXCHANGE, ENDPOINT_YIELD_FARMING, mode } from '../../env';
import { fetcher } from '../../fetch';

// Memo: TVL data for Top page
export const useGetTvlSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const usdSwingby = useSelector((state) => state.explorer.usd.SWINGBY);
  const [tvl, setTvl] = useState<ITvl>({
    tvlUsd: 0,
    floatUsd: 0,
    lockedSwingbyUsd: 0,
    preStakingUsd: 0,
    farmTvlUsd: 0,
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const skybridgeUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/tvl`;
      const preStakingUrl = 'https://pre-staking-swingby.swingby.network/v1/stakes/leaderboard';
      const uniFarmUrl = `${ENDPOINT_YIELD_FARMING}/farm-info?farm=Uni-V2`;
      const sushiFarmUrl = `${ENDPOINT_YIELD_FARMING}/farm-info?farm=Sushi-V2`;
      const pancakeFarmUrl = `${ENDPOINT_YIELD_FARMING}/farm-info?farm=Pancake-V2`;
      try {
        const results = await Promise.all([
          fetcher<ITvlResponses>(skybridgeUrl),
          fetcher<{ totalStaked: number }>(preStakingUrl),
          fetcher<{ farmTvl: number }>(uniFarmUrl),
          fetcher<{ farmTvl: number }>(sushiFarmUrl),
          fetcher<{ farmTvl: number }>(pancakeFarmUrl),
        ]);
        const skybridgeData = results[0];
        const floatUsd = Number(skybridgeData.liquidity.usd ?? 0);
        const lockedSwingbyUsd = Number(skybridgeData.bonded.usd ?? 0);
        const preStakingUsd = results[1].totalStaked * usdSwingby ?? 0;
        const tvlUniUsd = results[2].farmTvl ?? 0;
        const tvlSushiUsd = results[3].farmTvl ?? 0;
        const tvlPancakeUsd = results[4].farmTvl ?? 0;
        const farmTvlUsd = tvlUniUsd + tvlSushiUsd + tvlPancakeUsd;
        const tvlUsd = Number(skybridgeData.tvl.usd) + preStakingUsd + farmTvlUsd;

        setTvl({
          tvlUsd,
          floatUsd,
          lockedSwingbyUsd,
          preStakingUsd,
          farmTvlUsd,
        });
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [usdSwingby]);

  return {
    tvl,
    isLoading,
  };
};
