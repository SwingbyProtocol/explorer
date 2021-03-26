import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { CoinSymbol } from '../../../coins';
import { sumArray } from '../../../common';
import {
  CACHED_ENDPOINT,
  ENDPOINT_BSC_NODE,
  ENDPOINT_COINGECKO,
  ENDPOINT_ETHEREUM_NODE,
  mode,
} from '../../../env';
import { fetch, fetcher } from '../../../fetch';
import { INodeListResponse, IReward } from '../../../metanodes';
import { IFloat, IFloatAmount, IFloatBalances, IStats } from '../../index';

export const castToBackendVariable = (frontVariable: string) => {
  switch (frontVariable) {
    case CoinSymbol.BTC_B:
      return 'BTCB';

    default:
      return frontVariable;
  }
};

export const getUsdPrice = async (currency: string): Promise<number> => {
  const url = ENDPOINT_COINGECKO + `/simple/price?ids=${currency}&vs_currencies=usd`;

  const result = await fetch<{ currency: { usd } }>(url);
  const price = result.ok && result.response[currency].usd;

  return Number(price);
};

const getFloatBalance = (currency: string, floatInfos: IFloatAmount[]): string => {
  let floatBalance: string;
  try {
    floatInfos.forEach((floatInfo) => {
      if (floatInfo.currency === currency) {
        floatBalance = floatInfo.amount;
      }
    });
  } catch (err) {
    console.error(err);
  }
  return floatBalance;
};

export const fetchFloatBalances = async (usdBtc: number): Promise<IFloatBalances> => {
  const getFloatBalUrl = (base: string) => base + '/api/v1/floats/balances';

  try {
    const results = await Promise.all([
      fetcher<IFloatAmount[]>(getFloatBalUrl(ENDPOINT_ETHEREUM_NODE)),
      fetcher<IFloatAmount[]>(getFloatBalUrl(ENDPOINT_BSC_NODE)),
    ]);
    const resEth = results[0];
    const resBsc = results[1];
    const formattedBTCB = castToBackendVariable(CoinSymbol.BTC_B);

    const floats: IFloat = {
      btcEth: Number(getFloatBalance(CoinSymbol.BTC, resEth)),
      btcBsc: Number(getFloatBalance(CoinSymbol.BTC, resBsc)),
      wbtc: Number(getFloatBalance(CoinSymbol.WBTC, resEth)),
      btcb: Number(getFloatBalance(formattedBTCB, resBsc)),
    };

    const capacity: number =
      usdBtc *
      (Number(floats.btcEth) + Number(floats.btcBsc) + Number(floats.wbtc) + Number(floats.btcb));

    return { floats, capacity };
  } catch (err) {
    console.log(err);
  }
};

export const fetchStatsInfo = async (): Promise<IStats> => {
  const getBridgeUrl = (endpoint: string) => endpoint + '/api/v1/swaps/stats';
  const getbridgePeersUrl = (bridge: SkybridgeBridge) =>
    CACHED_ENDPOINT + `/v1/${mode}/${bridge}/nodes`;
  const getRewardsUrl = (bridge: SkybridgeBridge) =>
    CACHED_ENDPOINT + `/v1/${mode}/${bridge}/rewards-last-week`;

  try {
    const results = await Promise.all([
      // Memo: Ethereum bridge
      fetcher<{ network24hrSwapsVolume: number[] }>(getBridgeUrl(ENDPOINT_ETHEREUM_NODE)),
      fetcher<INodeListResponse[]>(getbridgePeersUrl('btc_erc')),
      fetcher<IReward>(getRewardsUrl('btc_erc')),
      // Memo: BSC bridge
      fetcher<{ network24hrSwapsVolume: number[] }>(getBridgeUrl(ENDPOINT_BSC_NODE)),
      fetcher<INodeListResponse[]>(getbridgePeersUrl('btc_bep20')),
      fetcher<IReward>(getRewardsUrl('btc_bep20')),
    ]);

    const ethereumRes = results[0];
    const ethereumPeersRes = results[1];
    const ethereumRewards1wksUSD = Number(results[2].total);

    const bscRes = results[3];
    const bscPeersRes = results[4];
    const bscRewards1wksUSD = Number(results[5].total);

    const volume1wksWBTC: number = sumArray(ethereumRes.network24hrSwapsVolume.slice(0, 8));
    const volume1wksBTCB: number = sumArray(bscRes.network24hrSwapsVolume.slice(0, 8));
    const volume1wksBTC: number = volume1wksWBTC + volume1wksBTCB;

    const volumes: string[] = ethereumRes.network24hrSwapsVolume.map(
      (volume: number, i: number) => {
        const dayVolume = volume + bscRes.network24hrSwapsVolume[i];
        return dayVolume.toFixed(3);
      },
    );

    const metanodes = ethereumPeersRes.length + bscPeersRes.length;
    const rewards1wksUSD = ethereumRewards1wksUSD + bscRewards1wksUSD;

    return {
      volume1wksWBTC,
      volume1wksBTCB,
      volume1wksBTC,
      rewards1wksUSD,
      volumes,
      metanodes,
    };
  } catch (err) {
    console.log(err);
  }
};
