import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CACHED_ENDPOINT, mode, PATH } from '../../env';
import { fetcher } from '../../fetch';
import { IBondHistories } from '../../metanodes';
import { toggleIsLoading } from '../../store';
import { ITvl } from '../index';

export const useGetAllBridgesTvl = (path: PATH) => {
  const dispatch = useDispatch();

  const [tvl, setTvl] = useState<ITvl>({
    floatBalance: 0,
    metanodeLocked: {
      allBridges: 0,
      btc_erc: 0,
      btc_bep20: 0,
    },
  });

  const usd = useSelector((state) => state.explorer.usd);
  const floatBalances = useSelector((state) => state.explorer.networkInfos.floatBalances);
  const { btcEth, wbtc, btcBsc, btcb } = floatBalances;
  const floatBalTtl = (btcEth + wbtc + btcBsc + btcb) * usd.BTC;

  const isNoLoading = useCallback(
    (path: PATH): Boolean => {
      if (path === PATH.ROOT) {
        return floatBalTtl > 0;
      }
      return true;
    },
    [floatBalTtl],
  );

  useEffect(() => {
    dispatch(toggleIsLoading(true));
    isNoLoading(path) &&
      (async () => {
        const urlBondEth = `${CACHED_ENDPOINT}/v1/${mode}/btc_erc/bonded-historic`;
        const urlBondBsc = `${CACHED_ENDPOINT}/v1/${mode}/btc_bep20/bonded-historic`;

        const results = await Promise.all([
          fetcher<IBondHistories>(urlBondEth),
          fetcher<IBondHistories>(urlBondBsc),
        ]);

        const tvlSwingbyEth = Number(results[0].data[0].bond);
        const tvlSwingbyBsc = Number(results[1].data[0].bond);
        const tvlSwingby = tvlSwingbyEth + tvlSwingbyBsc;

        setTvl({
          floatBalance: floatBalTtl,
          metanodeLocked: {
            allBridges: tvlSwingby,
            btc_erc: tvlSwingbyEth,
            btc_bep20: tvlSwingbyBsc,
          },
        });
        dispatch(toggleIsLoading(false));
      })();
  }, [floatBalTtl, usd.SWINGBY, isNoLoading, path, dispatch]);

  return {
    tvl,
  };
};
