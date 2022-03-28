import { stringifyUrl } from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ENDPOINT_YIELD_FARMING } from '../../env';
import { fetcher } from '../../fetch';
import { logger } from '../../logger';

const initialState = {
  btc_erc: {
    sbBtc: 0,
    farm: 0,
    total: 0,
    swingbyPerBlock: 0,
    farmTvl: 0,
  },
  btc_skypool: {
    sbBtc: 0,
    farm: 0,
    total: 0,
    swingbyPerBlock: 0,
    farmTvl: 0,
  },
};

export const useGetPoolApr = () => {
  const [apr, setApr] = useState<typeof initialState>(initialState);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const getApr = useCallback(async () => {
    try {
      setIsLoading(true);
      const sbBtcErcUrl = stringifyUrl({
        url: `/api/v1/sbbtc-apr`,
        query: { bridge: 'btc_erc' },
      });
      const sbBtcSkypoolUrl = stringifyUrl({
        url: `/api/v1/sbbtc-apr`,
        query: { bridge: 'btc_skypool' },
      });

      const farmErc = stringifyUrl({
        url: `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info`,
        query: { farm: 'sbBTC-ERC20' },
      });

      const farmSkypools = stringifyUrl({
        url: `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info`,
        query: { farm: 'sbBTC-BEP20' },
      });

      const results = await Promise.all([
        fetcher<{ apy: number }>(sbBtcErcUrl),
        fetcher<{ apr: number; swingbyPerBlock: number; farmTvl: number }>(farmErc),
        fetcher<{ apy: number }>(sbBtcSkypoolUrl),
        fetcher<{ apr: number; swingbyPerBlock: number; farmTvl: number }>(farmSkypools),
      ]);
      setApr({
        btc_erc: {
          sbBtc: results[0].apy,
          farm: results[1].apr,
          total: results[0].apy + results[1].apr,
          swingbyPerBlock: results[1].swingbyPerBlock,
          farmTvl: results[1].farmTvl,
        },
        btc_skypool: {
          sbBtc: results[2].apy,
          farm: results[3].apr,
          total: results[2].apy + results[3].apr,
          swingbyPerBlock: results[3].swingbyPerBlock,
          farmTvl: results[3].farmTvl,
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
