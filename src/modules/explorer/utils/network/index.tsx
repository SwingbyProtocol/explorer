import { buildContext, SkybridgeBridge } from '@swingby-protocol/sdk';
import { DateTime } from 'luxon';

import { CoinSymbol } from '../../../coins';
import { getShortDate, sumArray } from '../../../common';
import {
  ENDPOINT_COINGECKO,
  ENDPOINT_SKYBRIDGE_EXCHANGE,
  ENDPOINT_SKYPOOL_BRIDGE,
  mode,
} from '../../../env';
import { fetch, fetcher } from '../../../fetch';
import { IReward } from '../../../metanodes';
import { IChartDate, IFloat, IFloatAmount, IFloatBalances } from '../../index';
import { TransactionsConnectionEdges } from '../../../../generated/graphql';

export const getFixedBaseEndpoint = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_skypool':
      return ENDPOINT_SKYPOOL_BRIDGE;

    default:
      return ENDPOINT_SKYPOOL_BRIDGE;
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
  btcSkypool: number;
  wbtcSkypool: number;
}

const getCapacity = (arg: getCapacityArg): number => {
  const { bridge, btcSkypool, wbtcSkypool } = arg;

  const capacitySkypoolBridge = btcSkypool + wbtcSkypool;

  switch (bridge) {
    case 'btc_skypool':
      return capacitySkypoolBridge;

    default:
      return capacitySkypoolBridge;
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
      btcSkypool: Number(getFloatBalance(CoinSymbol.BTC, resSkypool)),
      wbtcSkypool: Number(
        getFloatBalance(castToBackendVariable(CoinSymbol.SKYPOOL_WBTC), resSkypool),
      ),
    };
    const { btcSkypool, wbtcSkypool } = floats;
    const capacity: number = usdBtc * getCapacity({ bridge, btcSkypool, wbtcSkypool });

    return { floats, capacity };
  } catch (err) {
    console.log(err);
    return {
      floats: {
        btcSkypool: 0,
        wbtcSkypool: 0,
      },
      capacity: 0,
    };
  }
};

interface getVolumesBTCArg {
  bridge: SkybridgeBridge;
  volumesWBTC_Skypool: number;
}

const getVolumesBTC = (arg: getVolumesBTCArg): number => {
  const { bridge, volumesWBTC_Skypool } = arg;
  switch (bridge) {
    case 'btc_skypool':
      return volumesWBTC_Skypool;

    default:
      return volumesWBTC_Skypool;
  }
};

interface getRewards1wksArg {
  bridge: SkybridgeBridge;
  skypoolRewards1wksUSD: number;
}

const getRewards1wks = (arg: getRewards1wksArg): number => {
  const { bridge, skypoolRewards1wksUSD } = arg;
  switch (bridge) {
    case 'btc_skypool':
      return skypoolRewards1wksUSD;

    default:
      return skypoolRewards1wksUSD;
  }
};

interface getVolumesArg {
  bridge: SkybridgeBridge;
  usdBtc: number;
  swapsCount: number[];
  swapsVolume: number[];
  volumeStep: 'day' | 'month';
}

const getVolumes = (arg: getVolumesArg): IChartDate[] => {
  const { bridge, usdBtc, swapsCount, swapsVolume, volumeStep } = arg;

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
      let dt: string;
      if (volumeStep === 'month') {
        d.setMonth(d.getMonth() - i);
        dt = getShortDate(String(d));
      } else {
        d.setDate(d.getDate() - i);
        dt = getShortDate(String(d));
      }

      return {
        at: String(dt),
        amount: String(vol * usdBtc),
        count: String(swapsCount[i]),
      };
    });
  };

  switch (bridge) {
    case 'btc_skypool':
      return buildVolumesArray({
        swapsVolume,
        swapsCount,
        usdBtc,
      });

    default:
      return buildVolumesArray({
        swapsVolume,
        swapsCount,
        usdBtc,
      });
  }
};

export const fetchVolumeInfo = async (
  bridge: SkybridgeBridge,
  usdBtc: number,
): Promise<{
  volume1wksWBTC_Skypool: number;
  volume1wksBTC: number;
  volumes: IChartDate[] | null;
  volumes1mWBTC_Skypool: number;
  volumes1mBTC: number;
  volumes1m: IChartDate[] | null;
  volumes1yWBTC_Skypool: number;
  volumes1yBTC: number;
  volumes1y: IChartDate[] | null;
}> => {
  const getBridgeUrl = (endpoint: string) => endpoint + '/api/v1/swaps/stats';

  try {
    const context = await buildContext({ mode });
    const urlSkypool = context.servers.swapNode.btc_skypool;
    const results = await Promise.all([
      fetch<{
        network24hrSwapsVolume: number[];
        network24hrSwaps: number[];
        network1mSwapsVolume: number[];
        network1mSwaps: number[];
      }>(getBridgeUrl(urlSkypool)),
    ]);

    const swaps24hrsFallback = [0, 0, 0, 0, 0, 0, 0];

    const skypoolNetwork24hrSwaps = results[0].ok
      ? results[0].response.network24hrSwaps
      : swaps24hrsFallback;

    const skypoolNetwork24hrSwapsVolume = results[0].ok
      ? results[0].response.network24hrSwapsVolume
      : swaps24hrsFallback;

    const skypoolNetwork1mSwaps = results[0].ok
      ? results[0].response.network1mSwaps
      : swaps24hrsFallback;

    const skypoolNetwork1mSwapsVolume = results[0].ok
      ? results[0].response.network1mSwapsVolume
      : swaps24hrsFallback;

    const volume1wksWBTC_Skypool: number = sumArray(skypoolNetwork24hrSwapsVolume.slice(0, 7));
    const volume1wksBTC: number = getVolumesBTC({
      bridge,
      volumesWBTC_Skypool: volume1wksWBTC_Skypool,
    });
    const volumes: IChartDate[] = getVolumes({
      bridge,
      usdBtc,
      swapsCount: skypoolNetwork24hrSwaps,
      swapsVolume: skypoolNetwork24hrSwapsVolume,
      volumeStep: 'day',
    })
      .slice(0, 7)
      .reverse();

    const volumes1mWBTC_Skypool: number = sumArray(skypoolNetwork24hrSwapsVolume.slice(0, 30));
    const volumes1mBTC: number = getVolumesBTC({
      bridge,
      volumesWBTC_Skypool: volumes1mWBTC_Skypool,
    });
    const volumes1m: IChartDate[] = getVolumes({
      bridge,
      usdBtc,
      swapsCount: skypoolNetwork24hrSwaps,
      swapsVolume: skypoolNetwork24hrSwapsVolume,
      volumeStep: 'day',
    })
      .slice(0, 30)
      .reverse();

    const volumes1yWBTC_Skypool: number = sumArray(skypoolNetwork1mSwapsVolume.slice(0, 12));
    const volumes1yBTC: number = getVolumesBTC({
      bridge,
      volumesWBTC_Skypool: volumes1yWBTC_Skypool,
    });
    const volumes1y: IChartDate[] = getVolumes({
      bridge,
      usdBtc,
      swapsCount: skypoolNetwork1mSwaps,
      swapsVolume: skypoolNetwork1mSwapsVolume,
      volumeStep: 'month',
    })
      .slice(0, 12)
      .reverse();

    return {
      volume1wksWBTC_Skypool,
      volume1wksBTC,
      volumes,
      volumes1mWBTC_Skypool,
      volumes1mBTC,
      volumes1m,
      volumes1yWBTC_Skypool,
      volumes1yBTC,
      volumes1y,
    };
  } catch (err) {
    console.log(err);
    return {
      volume1wksWBTC_Skypool: 0,
      volume1wksBTC: 0,
      volumes: null,
      volumes1mWBTC_Skypool: 0,
      volumes1mBTC: 0,
      volumes1m: null,
      volumes1yWBTC_Skypool: 0,
      volumes1yBTC: 0,
      volumes1y: null,
    };
  }
};

export const fetch1wksRewards = async (bridge: SkybridgeBridge): Promise<number> => {
  const getRewardsUrl = (bridge: SkybridgeBridge) =>
    `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/rewards-last-week`;
  try {
    const results = await Promise.all([fetch<IReward>(getRewardsUrl('btc_skypool'))]);

    const skypoolRewards1wksUSD = results[0].ok ? Number(results[0].response.total) : 0;

    const rewards1wksUSD = getRewards1wks({ bridge, skypoolRewards1wksUSD });

    return rewards1wksUSD;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const parseVolumeInfo = async (
  txEdges: Array<TransactionsConnectionEdges>,
  bridge: SkybridgeBridge,
  usdBtc: number,
): Promise<{
  volume1wksWBTC_Skypool: number;
  volume1wksBTC: number;
  volumes: IChartDate[] | null;
  volumes1mWBTC_Skypool: number;
  volumes1mBTC: number;
  volumes1m: IChartDate[] | null;
}> => {
  const skypoolNetwork24hrSwaps = Array(30).fill(0);
  const skypoolNetwork24hrSwapsVolume = Array(30).fill(0);

  const now = DateTime.local().startOf('day');
  const oneMonthAgo = now.minus({ days: 29 }); // only 30 items in array

  txEdges.forEach((edge) => {
    const at = DateTime.fromISO(edge.node.at);

    if (at >= oneMonthAgo) {
      const diffDay = Math.floor(now.diff(at.startOf('day'), 'days').days);
      skypoolNetwork24hrSwaps[diffDay]++;
      skypoolNetwork24hrSwapsVolume[diffDay] += parseFloat(edge.node.depositAmount);
    }
  });

  const volume1wksWBTC_Skypool: number = sumArray(skypoolNetwork24hrSwapsVolume.slice(0, 7));
  const volume1wksBTC: number = getVolumesBTC({
    bridge,
    volumesWBTC_Skypool: volume1wksWBTC_Skypool,
  });
  const volumes: IChartDate[] = getVolumes({
    bridge,
    usdBtc,
    swapsCount: skypoolNetwork24hrSwaps,
    swapsVolume: skypoolNetwork24hrSwapsVolume,
    volumeStep: 'day',
  })
    .slice(0, 7)
    .reverse();

  const volumes1mWBTC_Skypool: number = sumArray(skypoolNetwork24hrSwapsVolume.slice(0, 30));
  const volumes1mBTC: number = getVolumesBTC({
    bridge,
    volumesWBTC_Skypool: volumes1mWBTC_Skypool,
  });
  const volumes1m: IChartDate[] = getVolumes({
    bridge,
    usdBtc,
    swapsCount: skypoolNetwork24hrSwaps,
    swapsVolume: skypoolNetwork24hrSwapsVolume,
    volumeStep: 'day',
  })
    .slice(0, 30)
    .reverse();

  return {
    volume1wksWBTC_Skypool,
    volume1wksBTC,
    volumes,
    volumes1mWBTC_Skypool,
    volumes1mBTC,
    volumes1m,
  };
};
