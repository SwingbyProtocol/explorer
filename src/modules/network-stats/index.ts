import { getFiatAssetFormatter } from '@swingby-protocol/pulsar';
import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { CoinSymbol } from '../coins';
import { sumArray } from '../common';
import { ENDPOINT_BSC_BRIDGE, ENDPOINT_ETHEREUM_BRIDGE, ENDPOINT_SKYBRIDGE_EXCHANGE } from '../env';
import { castToBackendVariable, getFloatBalance, getUsdPrice, IFloatAmount } from '../explorer';
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
    const results = await Promise.all([
      fetcher<Array<any>>(getBridgePeersUrl('btc_erc')),
      fetcher<Array<any>>(getBridgePeersUrl('btc_bep20')),
    ]);
    const total = results[0].length + results[1].length;
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
      fetcher<{ network24hrSwapsVolume: number[] }>(getBridgeUrl(ENDPOINT_BSC_BRIDGE)),
      getUsdPrice('bitcoin'),
    ]);
    const ethNetwork24hrSwapVolume = results[0].network24hrSwapsVolume;

    const bscNetwork24hrSwapVolume = results[1].network24hrSwapsVolume;

    const volume1wksWBTC: number = sumArray(ethNetwork24hrSwapVolume.slice(0, 7));
    const volume1wksBTCB: number = sumArray(bscNetwork24hrSwapVolume.slice(0, 7));
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

  try {
    const results = await Promise.all([
      fetcher<IFloatAmount[]>(getFloatBalUrl(ENDPOINT_ETHEREUM_BRIDGE)),
      fetcher<IFloatAmount[]>(getFloatBalUrl(ENDPOINT_BSC_BRIDGE)),
      fetcher<IBondHistories>(getBondBalUrl('btc_erc')),
      fetcher<IBondHistories>(getBondBalUrl('btc_bep20')),
      getUsdPrice('bitcoin'),
    ]);

    const resEth = results[0];
    const resBsc = results[1];

    const tvlSwingbyEth = Number(results[2].data[0].bond);
    const tvlSwingbyBsc = Number(results[3].data[0].bond);

    const usdBtc = results[4];

    const formattedBTCB = castToBackendVariable(CoinSymbol.BTC_B);

    const btcEth = Number(getFloatBalance(CoinSymbol.BTC, resEth));
    const btcBsc = Number(getFloatBalance(CoinSymbol.BTC, resBsc));
    const wbtc = Number(getFloatBalance(CoinSymbol.WBTC, resEth));
    const btcb = Number(getFloatBalance(formattedBTCB, resBsc));

    const floatTtl = usdBtc * (btcEth + btcBsc + wbtc + btcb);

    const tvlSwingbyUsd = tvlSwingbyEth + tvlSwingbyBsc;

    const tvl = String(
      getFiatAssetFormatter({
        locale: 'en',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(floatTtl + tvlSwingbyUsd),
    );

    return tvl;
  } catch (e) {
    return 'N/A';
  }
};
