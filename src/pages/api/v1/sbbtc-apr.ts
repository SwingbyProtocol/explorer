import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

import { corsMiddleware, getParam } from '../../../modules/api';
import { sumArray } from '../../../modules/common';
import { fetcher } from '../../../modules/fetch';

import {
  fetchFloatBalances,
  fetchVwap,
  getFixedBaseEndpoint,
  getTransactionFee,
  IFloat,
} from './../../../modules/explorer';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ apr: number; e?: string }>,
) {
  await corsMiddleware({ req, res });
  const bridge = getParam({ req, name: 'bridge' }) as SkybridgeBridge;
  let apr = 0;

  try {
    const usdBtc = await fetchVwap('btcUsd');

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
        ((estimatedYearlyVolumeUsd * bridgeFeePercent * feeGoesLiquidityProvider) / floatUsd) * 100;

      apr = Number(estApr.toFixed(1));
    }

    res.status(200).json({ apr });
  } catch (e) {
    console.log(e);
    res.status(500).json({ apr, e: e.message });
  }
}