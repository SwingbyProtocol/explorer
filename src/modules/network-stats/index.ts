import { getFiatAssetFormatter } from '@swingby-protocol/pulsar';
import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { CoinSymbol } from '../coins';
import { sumArray } from '../common';
import {
  ENDPOINT_ETHEREUM_BRIDGE,
  ENDPOINT_SKYBRIDGE_EXCHANGE,
  ENDPOINT_SKYPOOL_BRIDGE,
  ENDPOINT_YIELD_FARMING,
} from '../env';
import { castToBackendVariable, fetchVwap, getFloatBalance, IFloatAmount } from '../explorer';
import { fetcher } from '../fetch';
import { IBondHistories } from '../metanodes';

export const getNodeQty = async ({
  bridge,
  mode,
}: {
  bridge: SkybridgeBridge | undefined;
  mode: 'production' | 'test';
}): Promise<number> => {
  const getBridgePeersUrl = (bridge: SkybridgeBridge) =>
    `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/nodes`;

  try {
    if (bridge) {
      const result = await fetcher<Array<any>>(getBridgePeersUrl(bridge));
      return result.length;
    }
    const results = await fetcher<Array<any>>(getBridgePeersUrl('btc_skypool'));
    const total = results.length;
    return total;
  } catch (e) {
    return 0;
  }
};

export const get7daysVolume = async (): Promise<string> => {
  const getBridgeUrl = (endpoint: string) => endpoint + '/api/v1/swaps/stats';

  try {
    const results = await Promise.all([
      fetcher<{ network24hrSwapsVolume: number[] }>(getBridgeUrl(ENDPOINT_ETHEREUM_BRIDGE)),
      fetcher<{ network24hrSwapsVolume: number[] }>(getBridgeUrl(ENDPOINT_SKYPOOL_BRIDGE)),
      fetchVwap('btcUsd'),
    ]);
    const ethNetwork24hrSwapsVolume = results[0].network24hrSwapsVolume;

    const skypoolNetwork24hrSwapsVolume = results[1].network24hrSwapsVolume;

    const volume1wksWBTC: number = sumArray(ethNetwork24hrSwapsVolume.slice(0, 7));
    const volume1wksBTCB: number = sumArray(skypoolNetwork24hrSwapsVolume.slice(0, 7));
    const usdBtc = results[2];
    const total = (volume1wksWBTC + volume1wksBTCB) * usdBtc;

    const ttlVolume = String(
      getFiatAssetFormatter({
        locale: 'en',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(total),
    );

    return ttlVolume;
  } catch (e) {
    return 'N/A';
  }
};

export const getTVL = async (): Promise<string> => {
  const getFloatBalUrl = (base: string) => base + '/api/v1/floats/balances';

  const getBondBalUrl = (bridge: SkybridgeBridge) =>
    ENDPOINT_SKYBRIDGE_EXCHANGE + `/production/${bridge}/bonded-historic`;

  const uniFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Uni-V2`;
  const sushiFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Sushi-V2`;
  const pancakeFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Pancake-V2`;

  try {
    const results = await Promise.all([
      fetcher<IFloatAmount[]>(getFloatBalUrl(ENDPOINT_SKYPOOL_BRIDGE)),
      fetcher<IBondHistories>(getBondBalUrl('btc_skypool')),
      fetchVwap('btcUsd'),
      fetcher<{ farmTvl: number }>(uniFarmUrl),
      fetcher<{ farmTvl: number }>(sushiFarmUrl),
      fetcher<{ farmTvl: number }>(pancakeFarmUrl),
    ]);

    const resSkypool = results[0];

    const tvlSwingbyBsc = Number(results[1].data[0].bond);

    const usdBtc = results[2];

    const tvlUniUsd = results[3].farmTvl ?? 0;
    const tvlSushiUsd = results[4].farmTvl ?? 0;
    const tvlPancakeUsd = results[5].farmTvl ?? 0;
    const farmTvlUsd = tvlUniUsd + tvlSushiUsd + tvlPancakeUsd;

    const formattedWBTC_Skypool = castToBackendVariable(CoinSymbol.SKYPOOL_WBTC);

    const btcEth = 0;
    const btcSkypool = Number(getFloatBalance(CoinSymbol.BTC, resSkypool));
    const wbtc = 0;
    const btcb = Number(getFloatBalance(formattedWBTC_Skypool, resSkypool));

    const floatTtl = usdBtc * (btcEth + btcSkypool + wbtc + btcb);

    const tvlSwingbyUsd = tvlSwingbyBsc;

    const tvl = floatTtl + tvlSwingbyUsd + farmTvlUsd;

    const formattedTvl = String(
      getFiatAssetFormatter({
        locale: 'en',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(tvl),
    );

    return formattedTvl;
  } catch (e) {
    return 'N/A';
  }
};
