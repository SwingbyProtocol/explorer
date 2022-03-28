import { getFiatAssetFormatter } from '@swingby-protocol/pulsar';
import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { CoinSymbol } from '../coins';
import { sumArray } from '../common';
import { ENDPOINT_SKYPOOL_BRIDGE, ENDPOINT_ETHEREUM_BRIDGE, ENDPOINT_YIELD_FARMING } from '../env';
import {
  castToBackendVariable,
  fetchVwap,
  getEndpoint,
  getFloatBalance,
  IFloatAmount,
} from '../explorer';
import { fetcher } from '../fetch';
import { formatPeers, IPeer } from '../metanodes';

export const getNodeQty = async ({
  bridge,
}: {
  bridge: SkybridgeBridge | undefined;
}): Promise<number> => {
  const { urlEth, urlSkypool } = await getEndpoint();
  try {
    if (bridge) {
      const url = bridge === 'btc_erc' ? `${urlEth}/api/v1/peers` : `${urlSkypool}/api/v1/peers`;
      const result = await fetcher<Array<any>>(url);
      return result.length;
    }
    let total: number;
    const results = await Promise.all([
      fetcher<Array<any>>(`${urlEth}/api/v1/peers`),
      fetcher<Array<any>>(`${urlSkypool}/api/v1/peers`),
    ]);
    total = results[0].length + results[1].length;
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

    const skypoolsNetwork24hrSwapsVolume = results[1].network24hrSwapsVolume;

    const volume1wksWBTC: number = sumArray(ethNetwork24hrSwapsVolume.slice(0, 7));
    const volume1wksBTCB: number = sumArray(skypoolsNetwork24hrSwapsVolume.slice(0, 7));
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

  const urlPeerErc = `${ENDPOINT_ETHEREUM_BRIDGE}/api/v1/peers`;
  const urlPeerSkypools = `${ENDPOINT_SKYPOOL_BRIDGE}/api/v1/peers`;

  const uniFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Uni-V2`;
  const sushiFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Sushi-V2`;
  const pancakeFarmUrl = `${ENDPOINT_YIELD_FARMING}/api/v1/farm-info?farm=Pancake-V2`;

  try {
    const results = await Promise.all([
      fetcher<IFloatAmount[]>(getFloatBalUrl(ENDPOINT_ETHEREUM_BRIDGE)),
      fetcher<IFloatAmount[]>(getFloatBalUrl(ENDPOINT_SKYPOOL_BRIDGE)),
      fetcher<IPeer[]>(urlPeerErc),
      fetcher<IPeer[]>(urlPeerSkypools),
      fetchVwap('btcUsd'),
      fetchVwap('swingbyUsd'),
      fetcher<{ farmTvl: number }>(uniFarmUrl),
      fetcher<{ farmTvl: number }>(sushiFarmUrl),
      fetcher<{ farmTvl: number }>(pancakeFarmUrl),
    ]);

    const resEth = results[0];
    const resSkypools = results[1];

    const resultNodes = await Promise.all([
      formatPeers({ peers: results[2], bridge: 'btc_erc' }),
      formatPeers({ peers: results[3], bridge: 'btc_skypool' }),
    ]);

    const usdBtc = results[4];
    const usdSwingby = results[5];
    const tvlUniUsd = results[6].farmTvl ?? 0;
    const tvlSushiUsd = results[7].farmTvl ?? 0;
    const tvlPancakeUsd = results[8].farmTvl ?? 0;
    const farmTvlUsd = tvlUniUsd + tvlSushiUsd + tvlPancakeUsd;

    const formattedBTCB = castToBackendVariable(CoinSymbol.BTC_B);

    const btcEth = Number(getFloatBalance(CoinSymbol.BTC, resEth));
    const btcSkypool = Number(getFloatBalance(CoinSymbol.BTC, resSkypools));
    const wbtc = Number(getFloatBalance(CoinSymbol.WBTC, resEth));
    const btcb = Number(getFloatBalance(formattedBTCB, resSkypools));

    const floatTtl = usdBtc * (btcEth + btcSkypool + wbtc + btcb);

    const tvlSwingbyUsd = resultNodes[0].nodeTvl * usdSwingby + resultNodes[1].nodeTvl * usdSwingby;

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
