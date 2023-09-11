import { stringifyUrl } from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { IAprHistoricalPool, IEarningHistorical, useToggleBridge } from '..';
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
  const [aprHistoric] = useState<IAprHistoricalPool>({
    sbBtcErc20: [],
    uni: [],
    sushi: [],
    pancake: [],
    sbBtcBep20: [],
  });
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

  const getHistoricalAprData = useCallback(async () => {
    try {
      if (network === 1) {
        // const urlSbtc = `${ENDPOINT_YIELD_FARMING}/api/v1/sbbtc-erc20/apr`;
        // const urlUni = `${ENDPOINT_YIELD_FARMING}/api/v1/uni/apr`;
        // const urlSushi = `${ENDPOINT_YIELD_FARMING}/api/v1/sushi/apr`;
        // const results = await Promise.all([
        //   fetcher<IAprHistoric[]>(urlSbtc),
        //   fetcher<IAprHistoric[]>(urlUni),
        //   fetcher<IAprHistoric[]>(urlSushi),
        // ]);
        // const data = {
        //   sbBtcErc20: results[0],
        //   uni: results[1],
        //   sushi: results[2],
        //   pancake: [],
        //   sbBtcBep20: [],
        // };
        // setAprHistoric(data);
        // return;
      }
    } catch (error) {
      logger.error(error);
    }
  }, [network]);

  useEffect(() => {
    try {
      setIsLoading(true);
      getData();
      getHistoricalAprData();
    } catch (error) {
      logger.error(error);
      setFarming(initialState);
    } finally {
      setIsLoading(false);
    }
  }, [getData, getHistoricalAprData]);

  return useMemo(
    () => ({ farming, isLoading, bridge, aprHistoric }),
    [farming, isLoading, bridge, aprHistoric],
  );
};
