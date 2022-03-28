import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ITvl } from '..';
import { CoinSymbol } from '../../coins';
import { ENDPOINT_YIELD_FARMING } from '../../env';
import { castToBackendVariable, getFloatBalance, IFloatAmount } from '../../explorer';
import { fetcher } from '../../fetch';
import { formatPeers, IPeer } from '../../metanodes';

// Memo: TVL data for Top page
export const useGetTvlSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const usdSwingby = useSelector((state) => state.explorer.usd.SWINGBY);
  const usdBtc = useSelector((state) => state.explorer.usd.BTC);
  const endpoint = useSelector((state) => state.explorer.nodeEndpoint);
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
      const urlPeerSkypool = `${endpoint['btc_skypool']}/api/v1/peers`;
      const urlFloatsErc = `${endpoint['btc_erc']}/api/v1/floats/balances`;
      const urlFloatsSkypool = `${endpoint['btc_skypool']}/api/v1/floats/balances`;

      try {
        const results = await Promise.all([
          fetcher<{ farmTvl: number }>(uniFarmUrl),
          fetcher<{ farmTvl: number }>(sushiFarmUrl),
          fetcher<{ farmTvl: number }>(pancakeFarmUrl),
          fetcher<IPeer[]>(urlPeerErc),
          fetcher<IPeer[]>(urlPeerSkypool),
          fetcher<IFloatAmount[]>(urlFloatsErc),
          fetcher<IFloatAmount[]>(urlFloatsSkypool),
        ]);

        const resultNodes = await Promise.all([
          formatPeers({ peers: results[3], bridge: 'btc_erc' }),
          formatPeers({ peers: results[4], bridge: 'btc_skypool' }),
        ]);
        const lockedSwingbyUsd =
          resultNodes[0].nodeTvl * usdSwingby + resultNodes[0].nodeTvl * usdSwingby;

        const resFloatsEth = results[5];
        const resFloatsSkypools = results[6];
        const formattedBTCB = castToBackendVariable(CoinSymbol.BTC_B);

        const btcEth = Number(getFloatBalance(CoinSymbol.BTC, resFloatsEth));
        const btcSkypools = Number(getFloatBalance(CoinSymbol.BTC, resFloatsSkypools));
        const wbtc = Number(getFloatBalance(CoinSymbol.WBTC, resFloatsEth));
        const btcb = Number(getFloatBalance(formattedBTCB, resFloatsSkypools));

        const floatUsd = usdBtc * (btcEth + btcSkypools + wbtc + btcb);
        const skybridgeTvl = lockedSwingbyUsd + floatUsd;

        const tvlUniUsd = results[0].farmTvl ?? 0;
        const tvlSushiUsd = results[1].farmTvl ?? 0;
        const tvlPancakeUsd = results[2].farmTvl ?? 0;
        const farmTvlUsd = tvlUniUsd + tvlSushiUsd + tvlPancakeUsd;
        const tvlUsd = skybridgeTvl + farmTvlUsd;

        setTvl({
          tvlUsd,
          floatUsd,
          lockedSwingbyUsd,
          farmTvlUsd,
        });
      } catch (error) {
        console.log('error', error);
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
