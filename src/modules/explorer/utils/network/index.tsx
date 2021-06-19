import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { buildChaosNodeContext } from '../../../build-node-context';
import { CoinSymbol } from '../../../coins';
import { getShortDate, sumArray } from '../../../common';
import {
  ENDPOINT_BSC_BRIDGE,
  ENDPOINT_COINGECKO,
  ENDPOINT_ETHEREUM_BRIDGE,
  ENDPOINT_SKYBRIDGE_EXCHANGE,
  mode,
} from '../../../env';
import { fetch, fetcher } from '../../../fetch';
import { INodeListResponse, IReward } from '../../../metanodes';
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
  }
};

interface getVolume1wksBTCArg {
  bridge: SkybridgeBridge;
  volume1wksWBTC: number;
  volume1wksBTCB: number;
}

const getVolume1wksBTC = (arg: getVolume1wksBTCArg): number => {
  const { bridge, volume1wksWBTC, volume1wksBTCB } = arg;
  switch (bridge) {
    case 'btc_erc':
      return volume1wksWBTC;
    case 'btc_bep20':
      return volume1wksBTCB;

    default:
      return volume1wksWBTC + volume1wksBTCB;
  }
};
interface getMetanodesLengthArg {
  bridge: SkybridgeBridge;
  ethNodeLength: number;
  bscNodeLength: number;
}

const getMetanodesLength = (arg: getMetanodesLengthArg): number => {
  const { bridge, ethNodeLength, bscNodeLength } = arg;
  switch (bridge) {
    case 'btc_erc':
      return ethNodeLength;
    case 'btc_bep20':
      return bscNodeLength;

    default:
      return ethNodeLength + bscNodeLength;
  }
};

interface getRewards1wksArg {
  bridge: SkybridgeBridge;
  ethRewards1wksUSD: number;
  bscRewards1wksUSD: number;
}

const getRewards1wks = (arg: getRewards1wksArg): number => {
  const { bridge, ethRewards1wksUSD, bscRewards1wksUSD } = arg;
  switch (bridge) {
    case 'btc_erc':
      return ethRewards1wksUSD;
    case 'btc_bep20':
      return bscRewards1wksUSD;

    default:
      return ethRewards1wksUSD + bscRewards1wksUSD;
  }
};

interface getVolumesArg {
  bridge: SkybridgeBridge;
  usdBtc: number;
  ethNetwork24hrSwapVolume: number[];
  bscNetwork24hrSwapVolume: number[];
}

const getVolumes = (arg: getVolumesArg): IChartDate[] => {
  const { bridge, ethNetwork24hrSwapVolume, bscNetwork24hrSwapVolume, usdBtc } = arg;

  const totalVolumes: number[] = ethNetwork24hrSwapVolume.map((volume: number, i: number) => {
    const dayVolume = volume + bscNetwork24hrSwapVolume[i];
    return Number(dayVolume.toFixed(3));
  });

  const buildVolumesArray = (swapVolume: number[], usdBtc: number) => {
    return swapVolume.map((vol: number, i: number) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dt = getShortDate(String(d));

      return {
        at: String(dt),
        amount: String(vol * usdBtc),
      };
    });
  };

  switch (bridge) {
    case 'btc_erc':
      return buildVolumesArray(ethNetwork24hrSwapVolume, usdBtc);
    case 'btc_bep20':
      return buildVolumesArray(bscNetwork24hrSwapVolume, usdBtc);

    default:
      return buildVolumesArray(totalVolumes, usdBtc);
  }
};

export const fetchVolumeInfo = async (
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
      fetch<{ network24hrSwapsVolume: number[] }>(getBridgeUrl(urlEth)),
      fetch<{ network24hrSwapsVolume: number[] }>(getBridgeUrl(urlBsc)),
    ]);

    const swapVolume24hrsFallback = [0, 0, 0, 0, 0, 0, 0];

    const ethNetwork24hrSwapVolume = results[0].ok
      ? results[0].response.network24hrSwapsVolume
      : swapVolume24hrsFallback;

    const bscNetwork24hrSwapVolume = results[1].ok
      ? results[1].response.network24hrSwapsVolume
      : swapVolume24hrsFallback;

    const volume1wksWBTC: number = sumArray(ethNetwork24hrSwapVolume.slice(0, 7));
    const volume1wksBTCB: number = sumArray(bscNetwork24hrSwapVolume.slice(0, 7));

    const volume1wksBTC: number = getVolume1wksBTC({ bridge, volume1wksWBTC, volume1wksBTCB });

    const volumes: IChartDate[] = getVolumes({
      bridge,
      usdBtc,
      ethNetwork24hrSwapVolume,
      bscNetwork24hrSwapVolume,
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

export const fetch1wksRewards = async (bridge: SkybridgeBridge): Promise<number> => {
  const getRewardsUrl = (bridge: SkybridgeBridge) =>
    `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/rewards-last-week`;
  try {
    const results = await Promise.all([
      fetch<IReward>(getRewardsUrl('btc_erc')),
      fetch<IReward>(getRewardsUrl('btc_bep20')),
    ]);

    const ethRewards1wksUSD = results[0].ok ? Number(results[0].response.total) : 0;

    const bscRewards1wksUSD = results[1].ok ? Number(results[1].response.total) : 0;

    const rewards1wksUSD = getRewards1wks({ bridge, ethRewards1wksUSD, bscRewards1wksUSD });

    return rewards1wksUSD;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const fetchNodeLength = async (bridge: SkybridgeBridge): Promise<number> => {
  const getbridgePeersUrl = (bridge: SkybridgeBridge) =>
    `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/nodes`;

  try {
    const results = await Promise.all([
      fetch<INodeListResponse[]>(getbridgePeersUrl('btc_erc')),
      fetch<INodeListResponse[]>(getbridgePeersUrl('btc_bep20')),
    ]);

    const ethNodeLength = results[0].ok ? results[0].response.length : 0;
    const bscNodeLength = results[1].ok ? results[1].response.length : 0;

    const metanodesLength = getMetanodesLength({ bridge, ethNodeLength, bscNodeLength });

    return metanodesLength;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
