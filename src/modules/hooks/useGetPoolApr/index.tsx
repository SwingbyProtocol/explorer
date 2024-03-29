import { stringifyUrl } from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ENDPOINT_YIELD_FARMING } from '../../env';
import { fetcher } from '../../fetch';
import { logger } from '../../logger';

const initialState = {
  btc_skypool: {
    sbBtc: 0,
    farm: 0,
    total: 0,
    swingbyPerBlock: 0,
    farmTvl: 0,
  },
};

type PoolAprState = {
  btc_skypool: {
    sbBtc: number;
    farm: number;
    total: number;
    swingbyPerBlock: number;
    farmTvl: number;
  };
};

export const useGetPoolApr = (): { apr: PoolAprState; isLoading: boolean } => {
  const [apr, setApr] = useState<PoolAprState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getApr = useCallback(async () => {
    try {
      setIsLoading(true);
      const sbBtcSkypoolUrl = stringifyUrl({
        url: `/api/v1/sbbtc-apr`,
        query: { bridge: 'btc_skypool' },
      });

      const results = await Promise.all([fetcher<{ apy: number }>(sbBtcSkypoolUrl)]);

      setApr({
        btc_skypool: {
          sbBtc: results[0].apy,
          farm: 0,
          total: results[0].apy,
          swingbyPerBlock: 0,
          farmTvl: 0,
        },
      });
    } catch (error) {
      logger.error(error);
      setApr(initialState);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getApr();
  }, [getApr]);

  return useMemo(() => ({ apr, isLoading }), [apr, isLoading]);
};
