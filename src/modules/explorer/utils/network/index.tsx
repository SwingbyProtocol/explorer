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
  ethNetwork24hrSwapVolume: number[];
  bscNetwork24hrSwapVolume: number[];
}

const getVolumes = (arg: getVolumesArg): string[] => {
  const { bridge, ethNetwork24hrSwapVolume, bscNetwork24hrSwapVolume } = arg;

  const totalVolumes: string[] = ethNetwork24hrSwapVolume.map((volume: number, i: number) => {
    const dayVolume = volume + bscNetwork24hrSwapVolume[i];
    return dayVolume.toFixed(3);
  });

  switch (bridge) {
    case 'btc_erc':
      return ethNetwork24hrSwapVolume.map(String);
    case 'btc_bep20':
      return bscNetwork24hrSwapVolume.map(String);

    default:
      return totalVolumes;
  }
};

export const fetchStatsInfo = async (bridge: SkybridgeBridge): Promise<IStats> => {
  const getBridgeUrl = (endpoint: string) => endpoint + '/api/v1/swaps/stats';
  const getbridgePeersUrl = (bridge: SkybridgeBridge) =>
    CACHED_ENDPOINT + `/v1/${mode}/${bridge}/nodes`;
  const getRewardsUrl = (bridge: SkybridgeBridge) =>
    CACHED_ENDPOINT + `/v1/${mode}/${bridge}/rewards-last-week`;

  try {
    const results = await Promise.all([
      // Memo: Ethereum bridge
      fetch<{ network24hrSwapsVolume: number[] }>(getBridgeUrl(ENDPOINT_ETHEREUM_NODE)),
      fetch<INodeListResponse[]>(getbridgePeersUrl('btc_erc')),
      fetch<IReward>(getRewardsUrl('btc_erc')),
      // Memo: BSC bridge
      fetch<{ network24hrSwapsVolume: number[] }>(getBridgeUrl(ENDPOINT_BSC_NODE)),
      fetch<INodeListResponse[]>(getbridgePeersUrl('btc_bep20')),
      fetch<IReward>(getRewardsUrl('btc_bep20')),
    ]);

    const swapVolume24hrsFallback = [0, 0, 0, 0, 0, 0, 0];

    const ethNetwork24hrSwapVolume = results[0].ok
      ? results[0].response.network24hrSwapsVolume
      : swapVolume24hrsFallback;

    const ethNodeLength = results[1].ok ? results[1].response.length : 0;
    const ethRewards1wksUSD = results[2].ok ? Number(results[2].response.total) : 0;

    const bscNetwork24hrSwapVolume = results[3].ok
      ? results[3].response.network24hrSwapsVolume
      : swapVolume24hrsFallback;

    const bscNodeLength = results[4].ok ? results[4].response.length : 0;
    const bscRewards1wksUSD = results[5].ok ? Number(results[5].response.total) : 0;

    const volume1wksWBTC: number = sumArray(ethNetwork24hrSwapVolume.slice(0, 7));
    const volume1wksBTCB: number = sumArray(bscNetwork24hrSwapVolume.slice(0, 7));

    const volume1wksBTC: number = getVolume1wksBTC({ bridge, volume1wksWBTC, volume1wksBTCB });

    const volumes: string[] = getVolumes({
      bridge,
      ethNetwork24hrSwapVolume,
      bscNetwork24hrSwapVolume,
    });

    const metanodes = getMetanodesLength({ bridge, ethNodeLength, bscNodeLength });
    const rewards1wksUSD = getRewards1wks({ bridge, ethRewards1wksUSD, bscRewards1wksUSD });

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
