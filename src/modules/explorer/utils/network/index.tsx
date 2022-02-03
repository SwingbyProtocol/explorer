import { FIXED_NODE_ENDPOINT, SkybridgeBridge } from '@swingby-protocol/sdk';

import { buildChaosNodeContext } from '../../../build-node-context';
import { CoinSymbol } from '../../../coins';
import { getMonthYear, sumArray } from '../../../common';
import { ENDPOINT_BSC_BRIDGE, ENDPOINT_ETHEREUM_BRIDGE, mode } from '../../../env';
import { fetch, fetcher } from '../../../fetch';
import { IChartDate, IFloat, IFloatAmount, IFloatBalances } from '../../index';

// Memo: get active node endpoint
export const getEndpoint = async (): Promise<{ urlEth: string; urlBsc: string }> => {
  let urlEth = '';
  let urlBsc = '';

  const getContext = async () => {
    try {
      const context = await buildChaosNodeContext({ mode });
      urlEth = context && context.servers.swapNode.btc_erc;
      urlBsc = context && context.servers.swapNode.btc_bep20;

      if (!urlEth || !urlBsc) {
        throw Error('retry for getting context');
      }

      const getFloatBalUrl = (base: string) => base + '/api/v1/floats/balances';
      const results = await Promise.all([
        fetcher<IFloatAmount[]>(getFloatBalUrl(urlEth)),
        fetcher<IFloatAmount[]>(getFloatBalUrl(urlBsc)),
      ]);
      if (results) {
        return { urlEth, urlBsc };
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
        return { urlEth: ENDPOINT_ETHEREUM_BRIDGE, urlBsc: ENDPOINT_BSC_BRIDGE };
      }
    }
  }
  return { urlEth, urlBsc };
};

export const getBaseEndpoint = async (bridge: SkybridgeBridge) => {
  const { urlEth, urlBsc } = await getEndpoint();
  switch (bridge) {
    case 'btc_erc':
      return urlEth;
    case 'btc_bep20':
      return urlBsc;

    default:
      return urlEth;
  }
};

export const getFixedBaseEndpoint = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return ENDPOINT_ETHEREUM_BRIDGE;
    case 'btc_bep20':
      return ENDPOINT_BSC_BRIDGE;

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
  btcBsc: number;
  wbtc: number;
  btcb: number;
}

const getCapacity = (arg: getCapacityArg): number => {
  const { bridge, btcEth, btcBsc, wbtc, btcb } = arg;

  const capacityEthBridge = btcEth + wbtc;
  const capacityBscBridge = btcBsc + btcb;

  switch (bridge) {
    case 'btc_erc':
      return capacityEthBridge;
    case 'btc_bep20':
      return capacityBscBridge;

    default:
      return capacityEthBridge + capacityBscBridge;
  }
};

export const fetchFloatBalances = async (
  usdBtc: number,
  bridge: SkybridgeBridge,
): Promise<IFloatBalances> => {
  const getFloatBalUrl = (base: string) => base + '/api/v1/floats/balances';

  try {
    const { urlEth, urlBsc } = await getEndpoint();
    const results = await Promise.all([
      fetcher<IFloatAmount[]>(getFloatBalUrl(urlEth)),
      fetcher<IFloatAmount[]>(getFloatBalUrl(urlBsc)),
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
    const { btcEth, btcBsc, wbtc, btcb } = floats;
    const capacity: number = usdBtc * getCapacity({ bridge, btcEth, btcBsc, wbtc, btcb });

    return { floats, capacity };
  } catch (err) {
    console.log(err);
    return {
      floats: {
        btcEth: 0,
        btcBsc: 0,
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
    case 'btc_bep20':
      return volumeBTCB;

    default:
      return volumeWBTC + volumeBTCB;
  }
};

interface getVolumesArg {
  bridge: SkybridgeBridge;
  usdBtc: number;
  ethNetworkSwaps: number[];
  bscNetworkSwaps: number[];
  ethNetworkSwapsVolume: number[];
  bscNetworkSwapsVolume: number[];
  time: 'date' | 'month';
}

const getVolumes = (arg: getVolumesArg): IChartDate[] => {
  const {
    bridge,
    usdBtc,
    ethNetworkSwaps,
    bscNetworkSwaps,
    ethNetworkSwapsVolume,
    bscNetworkSwapsVolume,
    time,
  } = arg;

  const mergeBridgeStats = ({
    ethStats,
    bscStats,
  }: {
    ethStats: number[];
    bscStats: number[];
  }): number[] => {
    return ethStats.map((ethItem: number, i: number) => {
      const statsByDate = ethItem + bscStats[i];
      return Number(statsByDate.toFixed(3));
    });
  };

  const totalSwaps: number[] = mergeBridgeStats({
    ethStats: ethNetworkSwaps,
    bscStats: bscNetworkSwaps,
  });

  const totalVolumes: number[] = mergeBridgeStats({
    ethStats: ethNetworkSwapsVolume,
    bscStats: bscNetworkSwapsVolume,
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
    case 'btc_bep20':
      return buildVolumesArray({
        swapsVolume: bscNetworkSwapsVolume,
        swapsCount: bscNetworkSwaps,
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
    const { urlEth, urlBsc } = await getEndpoint();
    const results = await Promise.all([
      fetch<{ network24hrSwapsVolume: number[]; network24hrSwaps: number[] }>(getBridgeUrl(urlEth)),
      fetch<{ network24hrSwapsVolume: number[]; network24hrSwaps: number[] }>(getBridgeUrl(urlBsc)),
    ]);

    const swaps24hrsFallback = [0, 0, 0, 0, 0, 0, 0];

    const ethNetwork24hrSwaps = results[0].ok
      ? results[0].response.network24hrSwaps
      : swaps24hrsFallback;

    const bscNetwork24hrSwaps = results[1].ok
      ? results[1].response.network24hrSwaps
      : swaps24hrsFallback;

    const ethNetwork24hrSwapsVolume = results[0].ok
      ? results[0].response.network24hrSwapsVolume
      : swaps24hrsFallback;

    const bscNetwork24hrSwapsVolume = results[1].ok
      ? results[1].response.network24hrSwapsVolume
      : swaps24hrsFallback;

    const volume1wksWBTC: number = sumArray(ethNetwork24hrSwapsVolume.slice(0, 7));
    const volume1wksBTCB: number = sumArray(bscNetwork24hrSwapsVolume.slice(0, 7));

    const volume1wksBTC: number = getVolumeBTC({
      bridge,
      volumeWBTC: volume1wksWBTC,
      volumeBTCB: volume1wksBTCB,
    });

    const volumes: IChartDate[] = getVolumes({
      bridge,
      usdBtc,
      ethNetworkSwaps: ethNetwork24hrSwaps,
      bscNetworkSwaps: bscNetwork24hrSwaps,
      ethNetworkSwapsVolume: ethNetwork24hrSwapsVolume,
      bscNetworkSwapsVolume: bscNetwork24hrSwapsVolume,
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
    const urlBsc = FIXED_NODE_ENDPOINT['btc_bep20'][mode][0];
    const results = await Promise.all([
      fetch<{ network1mSwapsVolume: number[]; network1mSwaps: number[] }>(getBridgeUrl(urlEth)),
      fetch<{ network1mSwapsVolume: number[]; network1mSwaps: number[] }>(getBridgeUrl(urlBsc)),
    ]);

    const swaps1mFallback = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const ethNetwork1mSwaps = results[0].ok
      ? results[0].response.network1mSwaps.slice(1)
      : swaps1mFallback;
    const bscNetwork1mSwaps = results[1].ok
      ? results[1].response.network1mSwaps.slice(1)
      : swaps1mFallback;

    const ethNetwork1mSwapsVolume = results[0].ok
      ? results[0].response.network1mSwapsVolume.slice(1)
      : swaps1mFallback;

    const bscNetwork1mSwapsVolume = results[1].ok
      ? results[1].response.network1mSwapsVolume.slice(1)
      : swaps1mFallback;

    const volume1yrWBTC: number = sumArray(ethNetwork1mSwapsVolume);
    const volume1yrBTCB: number = sumArray(bscNetwork1mSwapsVolume);
    const volume1yrBTC: number = getVolumeBTC({
      bridge,
      volumeWBTC: volume1yrWBTC,
      volumeBTCB: volume1yrBTCB,
    });

    const volumes: IChartDate[] = getVolumes({
      bridge,
      usdBtc,
      ethNetworkSwaps: ethNetwork1mSwaps,
      bscNetworkSwaps: bscNetwork1mSwaps,
      ethNetworkSwapsVolume: ethNetwork1mSwapsVolume,
      bscNetworkSwapsVolume: bscNetwork1mSwapsVolume,
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
