import { getSbbtcPrice } from '@swingby-protocol/sdk';
import { stringifyUrl } from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ENDPOINT_YIELD_FARMING, mode } from '../../env';
import { fetcher } from '../../fetch';
import { useOnboard } from '../../onboard';
import { getSbBTCBalance } from '../../pool';
import { useSdkContext } from '../../sdk-context';

const initialState = {
  btc_erc: {
    priceSbBTC: 0,
    wallet: 0,
    farm: 0,
    total: 0,
  },
  btc_bep20: {
    priceSbBTC: 0,
    wallet: 0,
    farm: 0,
    total: 0,
  },
};

export const useGetSbBtcBal = () => {
  const [balance, setBalance] = useState<typeof initialState>(initialState);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { address } = useOnboard();
  const context = useSdkContext();

  const getBal = useCallback(async () => {
    try {
      setIsLoading(true);

      const sbBtcStakedErcUrl = stringifyUrl({
        url: `${ENDPOINT_YIELD_FARMING}/api/v1/user-lp-bal`,
        query: { farm: 'sbBTC-ERC20', address, network: mode === 'production' ? '1' : '3' },
      });
      const sbBtcStakedBscUrl = stringifyUrl({
        url: `${ENDPOINT_YIELD_FARMING}/api/v1/user-lp-bal`,
        query: { farm: 'sbBTC-BEP20', address, network: mode === 'production' ? '56' : '97' },
      });

      const fetchStaked = async (url: string) => {
        try {
          return await fetcher<{ stakedLp: number }>(url);
        } catch (error) {
          return {
            swingby: null,
            pairedToken: null,
            stakedLp: 0,
            pendingSwingby: 0,
          };
        }
      };

      const results = await Promise.all([
        getSbbtcPrice({ context, bridge: 'btc_erc' }),
        getSbBTCBalance(address, 'btc_erc'),
        fetchStaked(sbBtcStakedErcUrl),
        getSbbtcPrice({ context, bridge: 'btc_bep20' }),
        getSbBTCBalance(address, 'btc_bep20'),
        fetchStaked(sbBtcStakedBscUrl),
      ]);

      setBalance({
        btc_erc: {
          priceSbBTC: Number(results[0]),
          wallet: results[1],
          farm: results[2].stakedLp,
          total: results[1] + results[2].stakedLp,
        },
        btc_bep20: {
          priceSbBTC: Number(results[3]),
          wallet: results[4],
          farm: results[5].stakedLp,
          total: results[4] + results[5].stakedLp,
        },
      });
    } catch (error) {
      console.error('error:', error);
      setBalance(initialState);
    } finally {
      setIsLoading(false);
    }
  }, [address, context]);

  useEffect(() => {
    getBal();
  }, [getBal]);

  return useMemo(() => ({ balance, isLoading }), [balance, isLoading]);
};
