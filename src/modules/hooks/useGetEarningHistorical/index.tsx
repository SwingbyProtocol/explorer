import { stringifyUrl } from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useToggleBridge } from '..';
import { ENDPOINT_YIELD_FARMING, mode, PATH } from '../../env';
import { fetcher } from '../../fetch';
import { logger } from '../../logger';
import { useOnboard } from '../../onboard';

interface IEarningHistorical {
  total: Total;
  network: number;
  sbBtcFarm: IFarmEarning;
  thirdPartyFarm: IThirdPartyFarm;
}

interface Total {
  pendingSwingby: number;
  claimedSwingby: number;
}

interface IFarmEarning {
  stakedLp: number;
  pendingSwingby: number;
  claimedSwingby: number;
  claimedTxs: IClaimedTx[];
}

interface IClaimedTx {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

interface IThirdPartyFarm {
  pancake?: IFarmEarning;
  combinedUniSushi?: IFarmEarning;
}

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
  const network =
    bridge === 'btc_bep20' ? (mode === 'production' ? 56 : 97) : mode === 'production' ? 1 : 5;

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (address && network) {
        const url = stringifyUrl({
          url: `${ENDPOINT_YIELD_FARMING}/api/v1/earning-historical`,
          query: { network, address },
        });

        const { total, sbBtcFarm, thirdPartyFarm } = await fetcher<IEarningHistorical>(url);
        const thirdParty = network === 1 || network === 5 ? 'combinedUniSushi' : 'pancake';
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
      setFarming(initialState);
    } finally {
      setIsLoading(false);
    }
  }, [address, network]);

  useEffect(() => {
    getData();
  }, [getData]);

  return useMemo(() => ({ farming, isLoading, bridge }), [farming, isLoading, bridge]);
};
