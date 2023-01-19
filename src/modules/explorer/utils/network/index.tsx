import { buildContext, SkybridgeBridge } from '@swingby-protocol/sdk';

import { CoinSymbol } from '../../../coins';
import { getShortDate, sumArray } from '../../../common';
import {
  ENDPOINT_COINGECKO,
  ENDPOINT_ETHEREUM_BRIDGE,
  ENDPOINT_SKYBRIDGE_EXCHANGE,
  ENDPOINT_SKYPOOL_BRIDGE,
  mode,
} from '../../../env';
import { fetch, fetcher } from '../../../fetch';
import { IReward } from '../../../metanodes';
import { IChartDate, IFloat, IFloatAmount, IFloatBalances } from '../../index';

export const getFixedBaseEndpoint = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return ENDPOINT_ETHEREUM_BRIDGE;
    case 'btc_skypool':
      return ENDPOINT_SKYPOOL_BRIDGE;

    default:
      return ENDPOINT_ETHEREUM_BRIDGE;
  }
};

export const castToBackendVariable = (frontVariable: string) => {
  switch (frontVariable) {
    case CoinSymbol.SKYPOOL_SB_BTC:
      return 'sbBTC';
    case CoinSymbol.SKYPOOL_WBTC:
      return 'WBTC';

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

export const fetchVwap = async (currency: 'btcUsd' | 'swingbyUsd'): Promise<number> => {
  const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/vwap-prices`;
  try {
    const res = await fetcher<{
      btcUsd: string;
      swingbyUsd: string;
    }>(url);

    const vwap = Number(res[currency]);

    const formattedVwap = Number(vwap.toFixed(4));
    return formattedVwap;
  } catch (error) {
    console.log('error', error);
    return 0;
  }
};

export const getFloatBalance = (currency: string, floatInfos: IFloatAmount[]): string => {
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

interface getCapacityArg {
  bridge: SkybridgeBridge;
  btcEth: number;
  btcSkypool: number;
  wbtc: number;
  wbtcSkypool: number;
}

const getCapacity = (arg: getCapacityArg): number => {
  const { bridge, btcEth, btcSkypool, wbtc, wbtcSkypool } = arg;

  const capacityEthBridge = btcEth + wbtc;
  const capacitySkypoolBridge = btcSkypool + wbtcSkypool;

  switch (bridge) {
    case 'btc_erc':
      return capacityEthBridge;
    case 'btc_skypool':
      return capacitySkypoolBridge;

    default:
      return capacityEthBridge + capacitySkypoolBridge;
  }
};

export const fetchFloatBalances = async (
  usdBtc: number,
  bridge: SkybridgeBridge,
): Promise<IFloatBalances> => {
  const getFloatBalUrl = (base: string) => base + '/api/v1/floats/balances';

  try {
    const context = await buildContext({ mode });
    const urlSkypool = context.servers.swapNode.btc_skypool;
    const results = await Promise.all([fetcher<IFloatAmount[]>(getFloatBalUrl(urlSkypool))]);
    const resSkypool = results[0];

    const floats: IFloat = {
      btcEth: 0,
      btcSkypool: Number(getFloatBalance(CoinSymbol.BTC, resSkypool)),
      wbtc: 0,
      wbtcSkypool: Number(
        getFloatBalance(castToBackendVariable(CoinSymbol.SKYPOOL_WBTC), resSkypool),
      ),
    };
    const { btcEth, btcSkypool, wbtc, wbtcSkypool } = floats;
    const capacity: number =
      usdBtc * getCapacity({ bridge, btcEth, btcSkypool, wbtc, wbtcSkypool });

    return { floats, capacity };
  } catch (err) {
    console.log(err);
    return {
      floats: {
        btcEth: 0,
        btcSkypool: 0,
        wbtc: 0,
        wbtcSkypool: 0,
      },
      capacity: 0,
    };
  }
};

interface getVolume1wksBTCArg {
  bridge: SkybridgeBridge;
  volume1wksWBTC: number;
  volume1wksWBTC_Skypool: number;
}

const getVolume1wksBTC = (arg: getVolume1wksBTCArg): number => {
  const { bridge, volume1wksWBTC, volume1wksWBTC_Skypool } = arg;
  switch (bridge) {
    case 'btc_erc':
      return volume1wksWBTC;
    case 'btc_skypool':
      return volume1wksWBTC_Skypool;

    default:
      return volume1wksWBTC + volume1wksWBTC_Skypool;
  }
};

interface getRewards1wksArg {
  bridge: SkybridgeBridge;
  ethRewards1wksUSD: number;
  skypoolRewards1wksUSD: number;
}

const getRewards1wks = (arg: getRewards1wksArg): number => {
  const { bridge, ethRewards1wksUSD, skypoolRewards1wksUSD } = arg;
  switch (bridge) {
    case 'btc_erc':
      return ethRewards1wksUSD;
    case 'btc_skypool':
      return skypoolRewards1wksUSD;

    default:
      return ethRewards1wksUSD + skypoolRewards1wksUSD;
  }
};

interface getVolumesArg {
  bridge: SkybridgeBridge;
  usdBtc: number;
  ethNetwork24hrSwaps: number[];
  skypoolNetwork24hrSwaps: number[];
  ethNetwork24hrSwapsVolume: number[];
  skypoolNetwork24hrSwapsVolume: number[];
}

const getVolumes = (arg: getVolumesArg): IChartDate[] => {
  const {
    bridge,
    usdBtc,
    ethNetwork24hrSwaps,
    skypoolNetwork24hrSwaps,
    ethNetwork24hrSwapsVolume,
    skypoolNetwork24hrSwapsVolume,
  } = arg;

  const mergeBridgeStats = ({
    ethStats,
    skypoolStats,
  }: {
    ethStats: number[];
    skypoolStats: number[];
  }): number[] => {
    return ethStats.map((ethItem: number, i: number) => {
      const statsByDate = ethItem + skypoolStats[i];
      return Number(statsByDate.toFixed(3));
    });
  };

  const totalSwaps: number[] = mergeBridgeStats({
    ethStats: ethNetwork24hrSwaps,
    skypoolStats: skypoolNetwork24hrSwaps,
  });

  const totalVolumes: number[] = mergeBridgeStats({
    ethStats: ethNetwork24hrSwapsVolume,
    skypoolStats: skypoolNetwork24hrSwapsVolume,
  });

  const buildVolumesArray = ({
    swapsVolume,
    swapsCount,
    usdBtc,
  }: {
    swapsVolume: number[];
    swapsCount: number[];
    usdBtc: number;
  }) => {
    return swapsVolume.map((vol: number, i: number) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dt = getShortDate(String(d));

      return {
        at: String(dt),
        amount: String(vol * usdBtc),
        count: String(swapsCount[i]),
      };
    });
  };

  switch (bridge) {
    case 'btc_erc':
      return buildVolumesArray({
        swapsVolume: ethNetwork24hrSwapsVolume,
        swapsCount: ethNetwork24hrSwaps,
        usdBtc,
      });
    case 'btc_skypool':
      return buildVolumesArray({
        swapsVolume: skypoolNetwork24hrSwapsVolume,
        swapsCount: skypoolNetwork24hrSwaps,
        usdBtc,
      });

    default:
      return buildVolumesArray({ swapsVolume: totalVolumes, swapsCount: totalSwaps, usdBtc });
  }
};

export const fetchVolumeInfo = async (
  bridge: SkybridgeBridge,
  usdBtc: number,
): Promise<{
  volume1wksWBTC: number;
  volume1wksWBTC_Skypool: number;
  volume1wksBTC: number;
  volumes: IChartDate[] | null;
}> => {
  const getBridgeUrl = (endpoint: string) => endpoint + '/api/v1/swaps/stats';

  try {
    const context = await buildContext({ mode });
    const urlEth = context.servers.swapNode.btc_erc;
    const urlSkypool = context.servers.swapNode.btc_skypool;
    const results = await Promise.all([
      fetch<{ network24hrSwapsVolume: number[]; network24hrSwaps: number[] }>(getBridgeUrl(urlEth)),
      fetch<{ network24hrSwapsVolume: number[]; network24hrSwaps: number[] }>(
        getBridgeUrl(urlSkypool),
      ),
    ]);

    const swaps24hrsFallback = [0, 0, 0, 0, 0, 0, 0];

    const ethNetwork24hrSwaps = results[0].ok
      ? results[0].response.network24hrSwaps
      : swaps24hrsFallback;

    const skypoolNetwork24hrSwaps = results[1].ok
      ? results[1].response.network24hrSwaps
      : swaps24hrsFallback;

    const ethNetwork24hrSwapsVolume = results[0].ok
      ? results[0].response.network24hrSwapsVolume
      : swaps24hrsFallback;

    const skypoolNetwork24hrSwapsVolume = results[1].ok
      ? results[1].response.network24hrSwapsVolume
      : swaps24hrsFallback;

    const volume1wksWBTC: number = sumArray(ethNetwork24hrSwapsVolume.slice(0, 7));
    const volume1wksWBTC_Skypool: number = sumArray(skypoolNetwork24hrSwapsVolume.slice(0, 7));

    const volume1wksBTC: number = getVolume1wksBTC({
      bridge,
      volume1wksWBTC,
      volume1wksWBTC_Skypool,
    });

    const volumes: IChartDate[] = getVolumes({
      bridge,
      usdBtc,
      ethNetwork24hrSwaps,
      skypoolNetwork24hrSwaps,
      ethNetwork24hrSwapsVolume,
      skypoolNetwork24hrSwapsVolume,
    })
      .slice(0, 7)
      .reverse();

    return {
      volume1wksWBTC,
      volume1wksWBTC_Skypool,
      volume1wksBTC,
      volumes,
    };
  } catch (err) {
    console.log(err);
    return {
      volume1wksWBTC: 0,
      volume1wksWBTC_Skypool: 0,
      volume1wksBTC: 0,
      volumes: null,
    };
  }
};

export const fetch1wksRewards = async (bridge: SkybridgeBridge): Promise<number> => {
  const getRewardsUrl = (bridge: SkybridgeBridge) =>
    `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/rewards-last-week`;
  try {
    const results = await Promise.all([
      fetch<IReward>(getRewardsUrl('btc_erc')),
      fetch<IReward>(getRewardsUrl('btc_skypool')),
    ]);

    const ethRewards1wksUSD = results[0].ok ? Number(results[0].response.total) : 0;

    const skypoolRewards1wksUSD = results[1].ok ? Number(results[1].response.total) : 0;

    const rewards1wksUSD = getRewards1wks({ bridge, ethRewards1wksUSD, skypoolRewards1wksUSD });

    return rewards1wksUSD;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
