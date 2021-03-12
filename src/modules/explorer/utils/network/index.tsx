import { CoinSymbol } from '../../../coins';
import { sumArray } from '../../../common';
import { ENDPOINT_COINGECKO, ENDPOINT_ETHEREUM_NODE } from '../../../env';
import { fetch } from '../../../fetch';
import { INodeListResponse } from '../../../metanodes';
import { IFloat, IFloatAmount, IFloatBalances, IStats } from '../../index';

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
  const url = ENDPOINT_ETHEREUM_NODE + '/api/v1/floats/balances';

  try {
    const result = await fetch<IFloatAmount[]>(url);
    const res = result.ok && result.response;

    const floats: IFloat = {
      btc: Number(getFloatBalance(CoinSymbol.BTC, res)),
      wbtc: Number(getFloatBalance(CoinSymbol.WBTC, res)),
    };

    const capacity: number = usdBtc * Number(floats.btc) + usdBtc * Number(floats.wbtc);
    return { floats, capacity };
  } catch (err) {
    console.log(err);
  }
};

export const calTvl = (metanodes: INodeListResponse[]) => {
  let tvl = 0;
  metanodes.forEach((metanode) => {
    tvl += Number(metanode.stake.amount);
  });
  return tvl;
};

export const fetchStatsInfo = async (): Promise<IStats> => {
  const ethereumBridge = ENDPOINT_ETHEREUM_NODE + '/api/v1/swaps/stats';
  const ethereumBridgePeers = ENDPOINT_ETHEREUM_NODE + '/api/v1/peers';

  try {
    const results = await Promise.all([
      fetch<{ network24hrSwapsVolume: number[]; networkrewards1wksSbBTCVolume: bigint[] }>(
        ethereumBridge,
      ),
      fetch<[]>(ethereumBridgePeers),
      // Memo: Enable after endpoint has be applied cache
      // fetchNodeList(),
    ]);
    const ethereumRes = results[0].ok && results[0].response;
    const ethereumPeersRes = results[1].ok && results[1].response;
    // Memo: Enable after endpoint has be applied cache
    // const nodeList = results[2] as IMetanode[];
    // const tvl = calTvl(nodeList);

    const tvl = 47729160;
    const rewards1wksSWINGBY = Number((tvl * 0.01).toFixed(0));

    const volume1wksWBTC: number = sumArray(ethereumRes.network24hrSwapsVolume.slice(0, 8));
    const volume1wksBTC: number = volume1wksWBTC;
    const volumes: string[] = ethereumRes.network24hrSwapsVolume.map((volume, i) =>
      volume.toFixed(3),
    );

    // Memo: Instruction from Luke on 5 Jan'21
    const rewards1wksSbBTC: number = volume1wksBTC * 0.002;
    const metanodes = ethereumPeersRes.length;

    return {
      volume1wksWBTC,
      volume1wksBTC,
      rewards1wksSbBTC,
      rewards1wksSWINGBY,
      volumes,
      metanodes,
    };
  } catch (err) {
    console.log(err);
  }
};
