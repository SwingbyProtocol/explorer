import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ITvl } from '..';
import { CoinSymbol } from '../../coins';
import { ENDPOINT_PRESTAKING, ENDPOINT_YIELD_FARMING } from '../../env';
import { getFloatBalance, IFloatAmount } from '../../explorer';
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
    preStakingUsd: 0,
    farmTvlUsd: 0,
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const preStakingUrl = `${ENDPOINT_PRESTAKING}/v1/stakes/leaderboard`;
      const uniFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Uni-V2`;
      const sushiFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Sushi-V2`;
      const pancakeFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Pancake-V2`;
      const urlPeerErc = `${endpoint['btc_erc']}/api/v1/peers`;
      const urlFloatsErc = `${endpoint['btc_erc']}/api/v1/floats/balances`;

      try {
        const results = await Promise.all([
          fetcher<{ totalStaked: number }>(preStakingUrl),
          fetcher<{ farmTvl: number }>(uniFarmUrl),
          fetcher<{ farmTvl: number }>(sushiFarmUrl),
          fetcher<{ farmTvl: number }>(pancakeFarmUrl),
          fetcher<IPeer[]>(urlPeerErc),
          fetcher<IFloatAmount[]>(urlFloatsErc),
        ]);

        const resultNodes = await Promise.all([
          formatPeers({ peers: results[4], bridge: 'btc_erc' }),
        ]);
        const lockedSwingbyUsd = resultNodes[0].nodeTvl * usdSwingby;

        const resFloatsEth = results[5];

        const btcEth = Number(getFloatBalance(CoinSymbol.BTC, resFloatsEth));
        const wbtc = Number(getFloatBalance(CoinSymbol.WBTC, resFloatsEth));

        const floatUsd = usdBtc * (btcEth + wbtc);
        const skybridgeTvl = lockedSwingbyUsd + floatUsd;

        const preStakingUsd = results[0].totalStaked * usdSwingby ?? 0;
        const tvlUniUsd = results[1].farmTvl ?? 0;
        const tvlSushiUsd = results[2].farmTvl ?? 0;
        const tvlPancakeUsd = results[3].farmTvl ?? 0;
        const farmTvlUsd = tvlUniUsd + tvlSushiUsd + tvlPancakeUsd;
        const tvlUsd = skybridgeTvl + preStakingUsd + farmTvlUsd;

        setTvl({
          tvlUsd,
          floatUsd,
          lockedSwingbyUsd,
          preStakingUsd,
          farmTvlUsd,
        });
      } catch (error) {
        console.error('Error on useGetTvlSummary...', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [usdSwingby, usdBtc, endpoint]);

  return {
    tvl,
    isLoading,
  };
};
