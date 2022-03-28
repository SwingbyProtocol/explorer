import { FIXED_NODE_ENDPOINT, SkybridgeBridge } from '@swingby-protocol/sdk';

import { buildChaosNodeContext } from '../../../build-node-context';
import { CoinSymbol } from '../../../coins';
import { getMonthYear, sumArray } from '../../../common';
import { ENDPOINT_SKYPOOL_BRIDGE, ENDPOINT_ETHEREUM_BRIDGE, mode } from '../../../env';
import { fetch, fetcher } from '../../../fetch';
import { IChartDate, IFloat, IFloatAmount, IFloatBalances } from '../../index';

// Memo: get active node endpoint
export const getEndpoint = async (): Promise<{ urlEth: string; urlSkypool: string }> => {
  let urlEth = '';
  let urlSkypool = '';

  const getContext = async () => {
    try {
      const context = await buildChaosNodeContext({ mode });
      urlEth = context && context.servers.swapNode.btc_erc;
      urlSkypool = context && context.servers.swapNode.btc_skypool;

      if (!urlEth || !urlSkypool) {
        throw Error('retry for getting context');
      }

      const getFloatBalUrl = (base: string) => base + '/api/v1/floats/balances';
      const result = await fetcher<IFloatAmount[]>(getFloatBalUrl(urlEth));
      if (result) {
        return { urlEth, urlSkypool };
      }

      const results = await Promise.all([
        fetcher<IFloatAmount[]>(getFloatBalUrl(urlEth)),
        fetcher<IFloatAmount[]>(getFloatBalUrl(urlSkypool)),
      ]);
      if (results) {
        return { urlEth, urlSkypool };
      }
    } catch (error) {
      throw Error(error);
    }
  };

  // Memo: Recursion
  try {
    await getContext();
  } catch (error) {
    try {
      await getContext();
    } catch (error) {
      try {
        await getContext();
      } catch (error) {
        console.log('Error:', error);
        return { urlEth: ENDPOINT_ETHEREUM_BRIDGE, urlSkypool: ENDPOINT_SKYPOOL_BRIDGE };
      }
    }
  }
  return { urlEth, urlSkypool };
};

export const getBaseEndpoint = async (bridge: SkybridgeBridge) => {
  const { urlEth, urlSkypool } = await getEndpoint();
  switch (bridge) {
    case 'btc_erc':
      return urlEth;

    case 'btc_skypool':
      return urlSkypool;

    default:
      return urlEth;
  }
};

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
    case CoinSymbol.BTC_B:
      return 'BTCB';

    default:
      return frontVariable;
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
  btcSkypools: number;
  wbtc: number;
  btcb: number;
}

const getCapacity = (arg: getCapacityArg): number => {
  const { bridge, btcEth, btcSkypools, wbtc, btcb } = arg;

  const capacityEthBridge = btcEth + wbtc;
  const capacitySkypoolBridge = btcSkypools + btcb;

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
    const { urlEth, urlSkypool } = await getEndpoint();
    let results;
    results = await Promise.all([
      fetcher<IFloatAmount[]>(getFloatBalUrl(urlEth)),
      fetcher<IFloatAmount[]>(getFloatBalUrl(urlSkypool)),
    ]);
    const resEth = results[0];
    const resEthSkypools = results[1];
    const formattedBTCB = castToBackendVariable(CoinSymbol.BTC_B);

    const floats: IFloat = {
      btcEth: Number(getFloatBalance(CoinSymbol.BTC, resEth)),
      btcSkypools: Number(getFloatBalance(CoinSymbol.BTC, resEthSkypools)),
      wbtc: Number(getFloatBalance(CoinSymbol.WBTC, resEth)),
      btcb: Number(getFloatBalance(formattedBTCB, resEthSkypools)),
    };
    const { btcEth, btcSkypools, wbtc, btcb } = floats;
    const capacity: number = usdBtc * getCapacity({ bridge, btcEth, btcSkypools, wbtc, btcb });

    return { floats, capacity };
  } catch (err) {
    console.log(err);
    return {
      floats: {
        btcEth: 0,
        btcSkypools: 0,
        wbtc: 0,
        btcb: 0,
      },
      capacity: 0,
    };
  }
};

interface getVolumeBTCArg {
  bridge: SkybridgeBridge;
  volumeWBTC: number;
  volumeBTCB: number;
}

const getVolumeBTC = (arg: getVolumeBTCArg): number => {
  const { bridge, volumeWBTC, volumeBTCB } = arg;
  switch (bridge) {
    case 'btc_erc':
      return volumeWBTC;

    case 'btc_skypool':
      return volumeBTCB;

    default:
      return volumeWBTC + volumeBTCB;
  }
};

interface getVolumesArg {
  bridge: SkybridgeBridge;
  usdBtc: number;
  ethNetworkSwaps: number[];
  skypoolNetworkSwaps: number[];
  ethNetworkSwapsVolume: number[];
  skypoolNetworkSwapsVolume: number[];
  time: 'date' | 'month';
}

const getVolumes = (arg: getVolumesArg): IChartDate[] => {
  const {
    bridge,
    usdBtc,
    ethNetworkSwaps,
    skypoolNetworkSwaps,
    ethNetworkSwapsVolume,
    skypoolNetworkSwapsVolume,
    time,
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
    ethStats: ethNetworkSwaps,
    skypoolStats: skypoolNetworkSwaps,
  });

  const totalVolumes: number[] = mergeBridgeStats({
    ethStats: ethNetworkSwapsVolume,
    skypoolStats: skypoolNetworkSwapsVolume,
  });

  const buildVolumesArray = ({
    swapsVolume,
    swapsCount,
    usdBtc,
    time,
  }: {
    swapsVolume: number[];
    swapsCount: number[];
    usdBtc: number;
    time: 'date' | 'month';
  }) => {
    return swapsVolume.map((vol: number, i: number) => {
      let at = '';
      const d = new Date();
      if (time === 'date') {
        d.setDate(d.getDate() - i);
        at = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d);
      } else {
        const monthDate = new Date(d.getFullYear(), d.getMonth() - i - 1, d.getDate());
        at = getMonthYear(String(monthDate));
      }

      return {
        at,
        amount: String(vol * usdBtc),
        count: String(swapsCount[i]),
      };
    });
  };

  switch (bridge) {
    case 'btc_erc':
      return buildVolumesArray({
        swapsVolume: ethNetworkSwapsVolume,
        swapsCount: ethNetworkSwaps,
        usdBtc,
        time,
      });
    case 'btc_skypool':
      return buildVolumesArray({
        swapsVolume: skypoolNetworkSwapsVolume,
        swapsCount: skypoolNetworkSwaps,
        usdBtc,
        time,
      });

    default:
      return buildVolumesArray({ swapsVolume: totalVolumes, swapsCount: totalSwaps, usdBtc, time });
  }
};

export const fetchDayVolumeInfo = async (
  bridge: SkybridgeBridge,
  usdBtc: number,
): Promise<{
  volume1wksWBTC: number;
  volume1wksBTCB: number;
  volume1wksBTC: number;
  volumes: IChartDate[] | null;
}> => {
  const getBridgeUrl = (endpoint: string) => endpoint + '/api/v1/swaps/stats';

  try {
    const { urlEth, urlSkypool } = await getEndpoint();
    let results;

    results = await Promise.all([
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
    const volume1wksBTCB: number = sumArray(skypoolNetwork24hrSwapsVolume.slice(0, 7));

    const volume1wksBTC: number = getVolumeBTC({
      bridge,
      volumeWBTC: volume1wksWBTC,
      volumeBTCB: volume1wksBTCB,
    });

    const volumes: IChartDate[] = getVolumes({
      bridge,
      usdBtc,
      ethNetworkSwaps: ethNetwork24hrSwaps,
      skypoolNetworkSwaps: skypoolNetwork24hrSwaps,
      ethNetworkSwapsVolume: ethNetwork24hrSwapsVolume,
      skypoolNetworkSwapsVolume: skypoolNetwork24hrSwapsVolume,
      time: 'date',
    })
      .slice(0, 7)
      .reverse();

    return {
      volume1wksWBTC,
      volume1wksBTCB,
      volume1wksBTC,
      volumes,
    };
  } catch (err) {
    console.log(err);
    return {
      volume1wksWBTC: 0,
      volume1wksBTCB: 0,
      volume1wksBTC: 0,
      volumes: null,
    };
  }
};

// Memo: Remove the current month
// Memo: Use fixed endpoint to unify the volume data
export const fetchMonthlyVolumeInfo = async (
  bridge: SkybridgeBridge,
  usdBtc: number,
): Promise<{
  volume1yrWBTC: number;
  volume1yrBTCB: number;
  volume1yrBTC: number;
  volumes: IChartDate[] | null;
}> => {
  const getBridgeUrl = (endpoint: string) => endpoint + '/api/v1/swaps/stats';

  try {
    const urlEth = FIXED_NODE_ENDPOINT['btc_erc'][mode][0];
    const urlSkypool = FIXED_NODE_ENDPOINT['btc_skypool'][mode][0];
    let results;

    results = await Promise.all([
      fetch<{ network1mSwapsVolume: number[]; network1mSwaps: number[] }>(getBridgeUrl(urlEth)),
      fetch<{ network1mSwapsVolume: number[]; network1mSwaps: number[] }>(getBridgeUrl(urlSkypool)),
    ]);

    const swaps1mFallback = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const ethNetwork1mSwaps = results[0].ok
      ? results[0].response.network1mSwaps.slice(1)
      : swaps1mFallback;
    const skypoolNetwork1mSwaps = results[1].ok
      ? results[1].response.network1mSwaps.slice(1)
      : swaps1mFallback;

    const ethNetwork1mSwapsVolume = results[0].ok
      ? results[0].response.network1mSwapsVolume.slice(1)
      : swaps1mFallback;

    const skypoolNetwork1mSwapsVolume = results[1].ok
      ? results[1].response.network1mSwapsVolume.slice(1)
      : swaps1mFallback;

    const volume1yrWBTC: number = sumArray(ethNetwork1mSwapsVolume);
    const volume1yrBTCB: number = sumArray(skypoolNetwork1mSwapsVolume);
    const volume1yrBTC: number = getVolumeBTC({
      bridge,
      volumeWBTC: volume1yrWBTC,
      volumeBTCB: volume1yrBTCB,
    });

    const volumes: IChartDate[] = getVolumes({
      bridge,
      usdBtc,
      ethNetworkSwaps: ethNetwork1mSwaps,
      skypoolNetworkSwaps: skypoolNetwork1mSwaps,
      ethNetworkSwapsVolume: ethNetwork1mSwapsVolume,
      skypoolNetworkSwapsVolume: skypoolNetwork1mSwapsVolume,
      time: 'month',
    }).reverse();

    return {
      volume1yrWBTC,
      volume1yrBTCB,
      volume1yrBTC,
      volumes,
    };
  } catch (err) {
    console.log(err);
    return {
      volume1yrWBTC: 0,
      volume1yrBTCB: 0,
      volume1yrBTC: 0,
      volumes: null,
    };
  }
};
