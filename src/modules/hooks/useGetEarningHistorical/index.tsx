import { stringifyUrl } from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { IEarningHistorical, useToggleBridge } from '..';
import { ENDPOINT_YIELD_FARMING, mode, PATH } from '../../env';
import { fetcher } from '../../fetch';
import { logger } from '../../logger';
import { useOnboard } from '../../onboard';

const initialState = {
  total: {
    pendingSwingby: 0,
    claimedSwingby: 0,
  },
  sbBtcFarm: {
    pendingSwingby: 0,
    claimedSwingby: 0,
    stakedSbBtc: 0,
    claimedTxs: [],
  },
  thirdPartyFarm: {
    pendingSwingby: 0,
    claimedSwingby: 0,
    claimedTxs: [],
  },
};

export const useGetEarningHistorical = () => {
  const [farming, setFarming] = useState<typeof initialState>(initialState);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { address } = useOnboard();
  const { bridge } = useToggleBridge(PATH.POOL);
  const network = mode === 'production' ? 1 : 3;

  const getData = useCallback(async () => {
    try {
      if (address && network) {
        const url = stringifyUrl({
          url: `${ENDPOINT_YIELD_FARMING}/api/v1/earning-historical`,
          query: { network, address },
        });

        const { total, sbBtcFarm, thirdPartyFarm } = await fetcher<IEarningHistorical>(url);
        const thirdParty = network === 1 || network === 3 ? 'combinedUniSushi' : 'pancake';
        setFarming({
          total: {
            pendingSwingby: total.pendingSwingby,
            claimedSwingby: total.claimedSwingby,
          },
          sbBtcFarm: {
            pendingSwingby: sbBtcFarm.pendingSwingby,
            claimedSwingby: sbBtcFarm.claimedSwingby,
            stakedSbBtc: sbBtcFarm.stakedLp,
            claimedTxs: sbBtcFarm.claimedTxs,
          },
          thirdPartyFarm: {
            pendingSwingby: thirdPartyFarm[thirdParty].pendingSwingby,
            claimedSwingby: thirdPartyFarm[thirdParty].claimedSwingby,
            claimedTxs: thirdPartyFarm[thirdParty].claimedTxs,
          },
        });
      }
    } catch (error) {
      logger.error(error);
    }
  }, [address, network]);

  useEffect(() => {
    try {
      setIsLoading(true);
      getData();
    } catch (error) {
      logger.error(error);
      setFarming(initialState);
    } finally {
      setIsLoading(false);
    }
  }, [getData]);

  return useMemo(() => ({ farming, isLoading, bridge }), [farming, isLoading, bridge]);
};
