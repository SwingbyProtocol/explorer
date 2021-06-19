import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useToggleBridge } from '..';
import { sumArray } from '../../common';
import { PATH } from '../../env';
import {
  fetchFloatBalances,
  getFixedBaseEndpoint,
  getTransactionFee,
  IFloat,
} from '../../explorer';
import { fetcher } from '../../fetch';

export const useGetLiquidityApr = () => {
  const [estimateApr, setEstimateApr] = useState<String>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { bridge } = useToggleBridge(PATH.POOL);
  const usdBtc = useSelector((state) => state.explorer.usd.BTC);

  const getFloatUsd = (bridge: SkybridgeBridge, usdBtc: number, floatBalances: IFloat) => {
    switch (bridge) {
      case 'btc_erc':
        return (floatBalances.btcEth + floatBalances.wbtc) * usdBtc;
      case 'btc_bep20':
        return (floatBalances.btcBsc + floatBalances.btcb) * usdBtc;

      default:
        return (floatBalances.btcEth + floatBalances.wbtc) * usdBtc;
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        // Memo: 1/3 goes to liquidity provider
        const feeGoesLiquidityProvider = 0.33;
        const baseUrl = getFixedBaseEndpoint(bridge);

        const results = await Promise.all([
          fetcher<{ network1mSwapsVolume: number[] }>(`${baseUrl}/api/v1/swaps/stats`),
          getTransactionFee(bridge),
          fetchFloatBalances(usdBtc, bridge),
        ]);

        const network1mSwapVolume = results[0].network1mSwapsVolume;
        const bridgeFeePercent = Number(results[1].bridgeFeePercent) * 0.01;
        const floatBalances = results[2].floats;

        const filledMonth = network1mSwapVolume.filter((it: number) => it !== 0).length;
        const yearlyVolume = sumArray(network1mSwapVolume);
        const averageVolume = yearlyVolume / filledMonth;
        const estimatedYearlyVolumeUsd = averageVolume * usdBtc * 12;
        const floatUsd = getFloatUsd(bridge, usdBtc, floatBalances);

        if (floatUsd > 0) {
          // Eg: ((32,356,354 * 0.002 * 0.33) / 470,438) * 100 = 4.5
          const estApr =
            ((estimatedYearlyVolumeUsd * bridgeFeePercent * feeGoesLiquidityProvider) / floatUsd) *
            100;

          const formattedEstApr = Number(estApr.toFixed(1));
          setEstimateApr(`${String(formattedEstApr)}%`);
        }
      } catch (error) {
        console.log('error:', error);
        setEstimateApr('N/A');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [bridge, usdBtc]);
  return { estimateApr, isLoading };
};
