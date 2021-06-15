import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ENDPOINT_SKYBRIDGE_EXCHANGE, mode, PATH } from '../../env';
import { fetcher } from '../../fetch';
import { IBondHistories } from '../../metanodes';
import { toggleIsLoading } from '../../store';

// Memo: TVL data for Metanode page
export const useGetBridgesTvl = (path: PATH, bridge: SkybridgeBridge) => {
  const dispatch = useDispatch();

  const [tvl, setTvl] = useState<number>(0);

  useEffect(() => {
    dispatch(toggleIsLoading(true));
    (async () => {
      const urlBondEth = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/btc_erc/bonded-historic`;
      const urlBondBsc = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/btc_bep20/bonded-historic`;
      try {
        const url = bridge === 'btc_bep20' ? urlBondBsc : urlBondEth;
        const result = await fetcher<IBondHistories>(url);

        setTvl(Number(result.data[0].bond));
        dispatch(toggleIsLoading(false));
      } catch (error) {
        dispatch(toggleIsLoading(false));
      }
    })();
  }, [path, dispatch, bridge]);

  return {
    tvl,
  };
};
