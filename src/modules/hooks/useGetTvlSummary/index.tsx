import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ITvl } from '..';
import {
  btcUSDPriceSelector,
  explorerNodeEndpointSelector,
  swingbyUSDPriceSelector,
} from '../../../store/selectors';
import { ENDPOINT_YIELD_FARMING } from '../../env';
import { getFloatBalance, IFloatAmount } from '../../explorer';
import { fetcher } from '../../fetch';
import { CoinSymbol } from '../../coins';

// Memo: TVL data for Top page
export const useGetTvlSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const usdBtc = useSelector(btcUSDPriceSelector);
  const usdSwingby = useSelector(swingbyUSDPriceSelector);
  const endpoint = useSelector(explorerNodeEndpointSelector);

  const [tvl, setTvl] = useState<ITvl>({
    tvlUsd: 0,
    floatUsd: 0,
    farmTvlUsd: 0,
  });

  useEffect(() => {
    const fetchTVLSummary = async () => {
      setIsLoading(true);
      const uniFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Uni-V2`;
      const sushiFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Sushi-V2`;
      const pancakeFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Pancake-V2`;
      const urlFloatsErc = `${endpoint['btc_erc']}/api/v1/floats/balances`;

      try {
        const results = await Promise.all([
          fetcher<{ farmTvl: number }>(uniFarmUrl),
          fetcher<{ farmTvl: number }>(sushiFarmUrl),
          fetcher<{ farmTvl: number }>(pancakeFarmUrl),
          fetcher<IFloatAmount[]>(urlFloatsErc),
        ]);

        const resFloatsEth = results[3];
        const btcEth = Number(getFloatBalance(CoinSymbol.BTC, resFloatsEth));
        const wbtc = Number(getFloatBalance(CoinSymbol.WBTC, resFloatsEth));
        const floatUsd = usdBtc * (btcEth + wbtc);

        const tvlUniUsd = results[0].farmTvl ?? 0;
        const tvlSushiUsd = results[1].farmTvl ?? 0;
        const tvlPancakeUsd = results[2].farmTvl ?? 0;
        const farmTvlUsd = tvlUniUsd + tvlSushiUsd + tvlPancakeUsd;
        const tvlUsd = floatUsd + farmTvlUsd;

        setTvl({
          tvlUsd,
          floatUsd,
          farmTvlUsd,
        });
      } catch (error) {
        console.error('Error on useGetTvlSummary...', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTVLSummary();
  }, [usdSwingby, usdBtc, endpoint]);

  return {
    tvl,
    isLoading,
  };
};
