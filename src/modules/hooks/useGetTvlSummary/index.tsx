import { useEffect, useState } from 'react';

import { ITvl, ITvlResponses } from '..';
import { ENDPOINT_SKYBRIDGE_EXCHANGE, mode } from '../../env';
import { fetcher } from '../../fetch';

// Memo: TVL data for Top page
export const useGetTvlSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tvl, setTvl] = useState<ITvl>({
    tvlUsd: 0,
    floatUsd: 0,
    lockedSwingbyUsd: 0,
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/tvl`;
      try {
        const data = await fetcher<ITvlResponses>(url);
        setTvl({
          tvlUsd: Number(data.tvl.usd),
          floatUsd: Number(data.liquidity.usd),
          lockedSwingbyUsd: Number(data.bonded.usd),
        });
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    tvl,
    isLoading,
  };
};
