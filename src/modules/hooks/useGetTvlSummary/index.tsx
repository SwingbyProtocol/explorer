import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ITvl } from '..';
import {
  btcUSDPriceSelector,
  explorerNodeEndpointSelector,
  swingbyUSDPriceSelector,
} from '../../../store/selectors';
import { ENDPOINT_YIELD_FARMING } from '../../env';
import { castToBackendVariable, getFloatBalance, IFloatAmount } from '../../explorer';
import { fetcher } from '../../fetch';
import { CoinSymbol } from '../../coins';
import { formatPeers, IPeer } from '../../metanodes';

// Memo: TVL data for Top page
export const useGetTvlSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const usdBtc = useSelector(btcUSDPriceSelector);
  const usdSwingby = useSelector(swingbyUSDPriceSelector);
  const endpoint = useSelector(explorerNodeEndpointSelector);

  const [tvl, setTvl] = useState<ITvl>({
    tvlUsd: 0,
    floatUsd: 0,
    lockedSwingbyUsd: 0,
    farmTvlUsd: 0,
  });

  useEffect(() => {
    const fetchTVLSummary = async () => {
      setIsLoading(true);
      const uniFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Uni-V2`;
      const sushiFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Sushi-V2`;
      const pancakeFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Pancake-V2`;
      const urlPeerErc = `${endpoint['btc_erc']}/api/v1/peers`;
      const urlPeerBsc = `${endpoint['btc_bep20']}/api/v1/peers`;
      const urlFloatsErc = `${endpoint['btc_erc']}/api/v1/floats/balances`;
      const urlFloatsBsc = `${endpoint['btc_bep20']}/api/v1/floats/balances`;

      try {
        const results = await Promise.all([
          fetcher<{ farmTvl: number }>(uniFarmUrl),
          fetcher<{ farmTvl: number }>(sushiFarmUrl),
          fetcher<{ farmTvl: number }>(pancakeFarmUrl),
          fetcher<IPeer[]>(urlPeerErc),
          fetcher<IPeer[]>(urlPeerBsc),
          fetcher<IFloatAmount[]>(urlFloatsErc),
          fetcher<IFloatAmount[]>(urlFloatsBsc),
        ]);

        const resultNodes = await Promise.all([
          formatPeers({ peers: results[3], bridge: 'btc_erc' }),
          formatPeers({ peers: results[4], bridge: 'btc_bep20' }),
        ]);
        const lockedSwingbyUsd =
          resultNodes[0].nodeTvl * usdSwingby + resultNodes[1].nodeTvl * usdSwingby;

        const resFloatsEth = results[5];
        const resFloatsBsc = results[6];
        const formattedBTCB = castToBackendVariable(CoinSymbol.BTC_B);

        const btcEth = Number(getFloatBalance(CoinSymbol.BTC, resFloatsEth));
        const btcBsc = Number(getFloatBalance(CoinSymbol.BTC, resFloatsBsc));
        const wbtc = Number(getFloatBalance(CoinSymbol.WBTC, resFloatsEth));
        const btcb = Number(getFloatBalance(formattedBTCB, resFloatsBsc));

        const floatUsd = usdBtc * (btcEth + btcBsc + wbtc + btcb);

        const tvlUniUsd = results[0].farmTvl ?? 0;
        const tvlSushiUsd = results[1].farmTvl ?? 0;
        const tvlPancakeUsd = results[2].farmTvl ?? 0;
        const farmTvlUsd = tvlUniUsd + tvlSushiUsd + tvlPancakeUsd;
        const tvlUsd = floatUsd + farmTvlUsd;

        setTvl({
          tvlUsd,
          floatUsd,
          lockedSwingbyUsd,
          farmTvlUsd,
        });
      } catch (error) {
        console.error('Error on useGetTvlSummary...', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (endpoint) {
      fetchTVLSummary();
    }
  }, [usdSwingby, usdBtc, endpoint]);

  return {
    tvl,
    isLoading,
  };
};
