import { FIXED_NODE_ENDPOINT, SkybridgeBridge } from '@swingby-protocol/sdk';

import { buildChaosNodeContext } from '../../../build-node-context';
import { CoinSymbol } from '../../../coins';
import { getMonthYear, sumArray } from '../../../common';
import { ENDPOINT_ETHEREUM_BRIDGE, mode } from '../../../env';
import { fetch, fetcher } from '../../../fetch';
import { IChartDate, IFloat, IFloatAmount, IFloatBalances } from '../../index';

// Memo: get active node endpoint
export const getEndpoint = async (): Promise<{ urlEth: string }> => {
  let urlEth = '';

  const getContext = async () => {
    try {
      // @todo (agustin) here retry 3 times to obtain the urlETH
      const context = await buildChaosNodeContext({ mode });
      urlEth = context && context.servers.swapNode.btc_erc;

      if (!urlEth) {
        throw Error('retry for getting context');
      }

      const getFloatBalUrl = (base: string) => base + '/api/v1/floats/balances';

      const results = await fetcher<IFloatAmount[]>(getFloatBalUrl(urlEth));
      if (results) {
        return { urlEth };
      }
    } catch (error) {
      throw Error(error);
    }
  };

  // Memo: Recursion
  // @todo (agustin) add re-fetch with library
  try {
    await getContext();
  } catch (error) {
    try {
      await getContext();
    } catch (error) {
      try {
        await getContext();
      } catch (error) {
        console.error('getContext errored:', error);
        return { urlEth: ENDPOINT_ETHEREUM_BRIDGE };
      }
    }
  }
  return { urlEth };
};

export const getBaseEndpoint = async (bridge: SkybridgeBridge) => {
  const { urlEth } = await getEndpoint();
  switch (bridge) {
    case 'btc_erc':
      return urlEth;

    default:
      return urlEth;
  }
};

export const getFixedBaseEndpoint = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return ENDPOINT_ETHEREUM_BRIDGE;

    default:
      return ENDPOINT_ETHEREUM_BRIDGE;
  }
};

export const castToBackendVariable = (frontVariable: string) => {
  switch (frontVariable) {
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
  wbtc: number;
}

const getCapacity = (arg: getCapacityArg): number => {
  const { bridge, btcEth, wbtc } = arg;

  const capacityEthBridge = btcEth + wbtc;

  switch (bridge) {
    case 'btc_erc':
      return capacityEthBridge;

    default:
      return capacityEthBridge;
  }
};

export const fetchFloatBalances = async (
  usdBtc: number,
  bridge: SkybridgeBridge,
): Promise<IFloatBalances> => {
  const getFloatBalUrl = (base: string) => base + '/api/v1/floats/balances';

  try {
    const { urlEth } = await getEndpoint();
    const resEth = await fetcher<IFloatAmount[]>(getFloatBalUrl(urlEth));

    const floats: IFloat = {
      btcEth: Number(getFloatBalance(CoinSymbol.BTC, resEth)),
      wbtc: Number(getFloatBalance(CoinSymbol.WBTC, resEth)),
    };
    const { btcEth, wbtc } = floats;
    const capacity: number = usdBtc * getCapacity({ bridge, btcEth, wbtc });

    return { floats, capacity };
  } catch (err) {
    console.log(err);
    return {
      floats: {
        btcEth: 0,
        wbtc: 0,
      },
      capacity: 0,
    };
  }
};

interface getVolumeBTCArg {
  bridge: SkybridgeBridge;
  volumeWBTC: number;
}

const getVolumeBTC = (arg: getVolumeBTCArg): number => {
  const { bridge, volumeWBTC } = arg;
  switch (bridge) {
    case 'btc_erc':
      return volumeWBTC;

    default:
      return volumeWBTC;
  }
};

interface getVolumesArg {
  bridge: SkybridgeBridge;
  usdBtc: number;
  ethNetworkSwaps: number[];
  ethNetworkSwapsVolume: number[];
  time: 'date' | 'month';
}

const getVolumes = (arg: getVolumesArg): IChartDate[] => {
  const { bridge, usdBtc, ethNetworkSwaps, ethNetworkSwapsVolume, time } = arg;

  const mergeBridgeStats = ({ ethStats }: { ethStats: number[] }): number[] => {
    return ethStats.map((ethItem: number, i: number) => {
      const statsByDate = ethItem;
      return Number(statsByDate.toFixed(3));
    });
  };

  const totalSwaps: number[] = mergeBridgeStats({
    ethStats: ethNetworkSwaps,
  });

  const totalVolumes: number[] = mergeBridgeStats({
    ethStats: ethNetworkSwapsVolume,
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

    default:
      return buildVolumesArray({ swapsVolume: totalVolumes, swapsCount: totalSwaps, usdBtc, time });
  }
};

export const fetchDayVolumeInfo = async (
  bridge: SkybridgeBridge,
  usdBtc: number,
): Promise<{
  volume1wksWBTC: number;
  volume1wksBTC: number;
  volumes: IChartDate[] | null;
}> => {
  const getBridgeUrl = (endpoint: string) => endpoint + '/api/v1/swaps/stats';

  try {
    const { urlEth } = await getEndpoint();

    const networkSwapsETH = await fetch<{
      network24hrSwapsVolume: number[];
      network24hrSwaps: number[];
    }>(getBridgeUrl(urlEth));
    const swaps24hrsFallback = [0, 0, 0, 0, 0, 0, 0];

    const ethNetwork24hrSwaps = networkSwapsETH.ok
      ? networkSwapsETH.response.network24hrSwaps
      : swaps24hrsFallback;

    const ethNetwork24hrSwapsVolume = networkSwapsETH.ok
      ? networkSwapsETH.response.network24hrSwapsVolume
      : swaps24hrsFallback;

    const volume1wksWBTC: number = sumArray(ethNetwork24hrSwapsVolume.slice(0, 7));

    const volume1wksBTC: number = getVolumeBTC({
      bridge,
      volumeWBTC: volume1wksWBTC,
    });

    const volumes: IChartDate[] = getVolumes({
      bridge,
      usdBtc,
      ethNetworkSwaps: ethNetwork24hrSwaps,
      ethNetworkSwapsVolume: ethNetwork24hrSwapsVolume,
      time: 'date',
    })
      .slice(0, 7)
      .reverse();

    return {
      volume1wksWBTC,
      volume1wksBTC,
      volumes,
    };
  } catch (err) {
    console.log(err);
    return {
      volume1wksWBTC: 0,
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
  volume1yrBTC: number;
  volumes: IChartDate[] | null;
}> => {
  const getBridgeUrl = (endpoint: string) => endpoint + '/api/v1/swaps/stats';

  try {
    const urlEth = FIXED_NODE_ENDPOINT['btc_erc'][mode][0];

    const ethNetworkSwaps = await fetch<{
      network1mSwapsVolume: number[];
      network1mSwaps: number[];
    }>(getBridgeUrl(urlEth));

    const swaps1mFallback = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const ethNetwork1mSwaps = ethNetworkSwaps.ok
      ? ethNetworkSwaps.response.network1mSwaps.slice(1)
      : swaps1mFallback;

    const ethNetwork1mSwapsVolume = ethNetworkSwaps.ok
      ? ethNetworkSwaps.response.network1mSwapsVolume.slice(1)
      : swaps1mFallback;

    const volume1yrWBTC: number = sumArray(ethNetwork1mSwapsVolume);
    const volume1yrBTC: number = getVolumeBTC({
      bridge,
      volumeWBTC: volume1yrWBTC,
    });

    const volumes: IChartDate[] = getVolumes({
      bridge,
      usdBtc,
      ethNetworkSwaps: ethNetwork1mSwaps,
      ethNetworkSwapsVolume: ethNetwork1mSwapsVolume,
      time: 'month',
    }).reverse();

    return {
      volume1yrWBTC,
      volume1yrBTC,
      volumes,
    };
  } catch (err) {
    console.log(err);
    return {
      volume1yrWBTC: 0,
      volume1yrBTC: 0,
      volumes: null,
    };
  }
};
