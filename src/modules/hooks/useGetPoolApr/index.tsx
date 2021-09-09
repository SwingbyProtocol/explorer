import { stringifyUrl } from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ENDPOINT_YIELD_FARMING } from '../../env';
import { fetcher } from '../../fetch';

const initialState = {
  btc_erc: {
    sbBtc: 0,
    farm: 0,
    total: 0,
  },
  btc_bep20: {
    sbBtc: 0,
    farm: 0,
    total: 0,
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
      const sbBtcBsc20Url = stringifyUrl({
        url: `/api/v1/sbbtc-apr`,
        query: { bridge: 'btc_bep20' },
      });

      const farmErc = stringifyUrl({
        url: `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info`,
        query: { farm: 'sbBTC-ERC20' },
      });

      const farmBsc = stringifyUrl({
        url: `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info`,
        query: { farm: 'sbBTC-BEP20' },
      });

      const results = await Promise.all([
        fetcher<{ apr: number }>(sbBtcErcUrl),
        fetcher<{ apr: number }>(farmErc),
        fetcher<{ apr: number }>(sbBtcBsc20Url),
        fetcher<{ apr: number }>(farmBsc),
      ]);
      setApr({
        btc_erc: {
          sbBtc: results[0].apr,
          farm: results[1].apr,
          total: results[0].apr + results[1].apr,
        },
        btc_bep20: {
          sbBtc: results[2].apr,
          farm: results[3].apr,
          total: results[2].apr + results[3].apr,
        },
      });
    } catch (error) {
      console.log('error:', error);
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
