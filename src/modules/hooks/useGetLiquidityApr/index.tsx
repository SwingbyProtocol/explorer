import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useToggleBridge } from '..';
import { PATH, ROOT_URL } from '../../env';
import { fetcher } from '../../fetch';

export const useGetLiquidityApr = () => {
  const [estimateApr, setEstimateApr] = useState<String>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { bridge } = useToggleBridge(PATH.POOL);
  const usdBtc = useSelector((state) => state.explorer.usd.BTC);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { apr } = await fetcher<{ apr: number }>(
          `${ROOT_URL}/api/v1/sbbtc-apr?bridge=${bridge}`,
        );
        setEstimateApr(`${String(apr)}%`);
      } catch (error) {
        console.log('error:', error);
        setEstimateApr('N/A');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [bridge, usdBtc]);
  return { estimateApr, isLoading };
};
