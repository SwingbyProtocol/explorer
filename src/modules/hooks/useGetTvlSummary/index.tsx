import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ITvl, ITvlResponses } from '..';
import { ENDPOINT_SKYBRIDGE_EXCHANGE, ENDPOINT_YIELD_FARMING, mode } from '../../env';
import { fetcher } from '../../fetch';
import { swingbyUSDPriceSelector } from '../../store';

// Memo: TVL data for Top page
export const useGetTvlSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const usdSwingby = useSelector(swingbyUSDPriceSelector);
  const [tvl, setTvl] = useState<ITvl>({
    tvlUsd: 0,
    floatUsd: 0,
    lockedSwingbyUsd: 0,
    farmTvlUsd: 0,
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const skybridgeUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/tvl`;
      const uniFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Uni-V2`;
      const sushiFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Sushi-V2`;
      const pancakeFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Pancake-V2`;
      try {
        const results = await Promise.all([
          fetcher<ITvlResponses>(skybridgeUrl),
          fetcher<{ farmTvl: number }>(uniFarmUrl),
          fetcher<{ farmTvl: number }>(sushiFarmUrl),
          fetcher<{ farmTvl: number }>(pancakeFarmUrl),
        ]);
        const skybridgeData = results[0];
        const floatUsd = Number(skybridgeData.liquidity.usd ?? 0);
        const lockedSwingbyUsd = Number(skybridgeData.bonded.usd ?? 0);
        const tvlUniUsd = results[2].farmTvl ?? 0;
        const tvlSushiUsd = results[3].farmTvl ?? 0;
        const tvlPancakeUsd = results[3].farmTvl ?? 0;
        const farmTvlUsd = tvlUniUsd + tvlSushiUsd + tvlPancakeUsd;
        const tvlUsd = Number(skybridgeData.tvl.usd) + farmTvlUsd;

        setTvl({
          tvlUsd,
          floatUsd,
          lockedSwingbyUsd,
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
