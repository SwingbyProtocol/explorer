import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ENDPOINT_SKYBRIDGE_EXCHANGE, mode, PATH } from '../../env';
import { fetcher } from '../../fetch';
import { TBondHistory } from '../../metanodes';
import { toggleIsLoading } from '../../store';

// Memo: TVL data for Metanode page
export const useGetBridgesTvl = (path: PATH) => {
  const dispatch = useDispatch();

  const [tvl, setTvl] = useState<{
    btc_erc: number;
    btc_bep20: number;
  }>({
    btc_erc: 0,
    btc_bep20: 0,
  });

  useEffect(() => {
    dispatch(toggleIsLoading(true));
    (async () => {
      const urlBondEth = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/btc_erc/bonded-historic`;
      const urlBondBsc = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/btc_bep20/bonded-historic`;
      try {
        const results = await Promise.all([
          fetcher<TBondHistory[]>(urlBondEth),
          fetcher<TBondHistory[]>(urlBondBsc),
        ]);

        const tvlSwingbyEth = Number(results[0][0].bond);
        const tvlSwingbyBsc = Number(results[1][0].bond);

        setTvl({
          btc_erc: tvlSwingbyEth,
          btc_bep20: tvlSwingbyBsc,
        });
        dispatch(toggleIsLoading(false));
      } catch (error) {
        dispatch(toggleIsLoading(false));
      }
    })();
  }, [path, dispatch]);

  return {
    tvl,
  };
};
