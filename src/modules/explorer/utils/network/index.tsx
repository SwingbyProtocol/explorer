import { CoinSymbol } from '../../../coins';
import { ENDPOINT_ETHEREUM_NODE, ENDPOINT_COINGECKO } from '../../../env';
import { fetch } from '../../../fetch';
import { IFetchUsd, IFloat, IFloatAmount, IFloatBalances, IStats } from '../../index';

export const getUsdPrice = async (): Promise<IFetchUsd> => {
  const priceBtcUrl = ENDPOINT_COINGECKO + '/simple/price?ids=bitcoin&vs_currencies=usd';

  const result = await fetch<{ bitcoin: { usd } }>(priceBtcUrl);
  const BTC = result.ok && result.response.bitcoin.usd;

  return {
    BTC,
  };
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

export const fetchStatsInfo = async (): Promise<IStats> => {
  const ethereumBridge = ENDPOINT_ETHEREUM_NODE + '/api/v1/swaps/stats';
  const ethereumBridgePeers = ENDPOINT_ETHEREUM_NODE + '/api/v1/peers';

  try {
    const results = await Promise.all([
      fetch<{ network24hrSwapsVolume: number[]; networkRewards24hrVolume: bigint[] }>(
        ethereumBridge,
      ),
      fetch<[]>(ethereumBridgePeers),
    ]);
    const ethereumRes = results[0].ok && results[0].response;
    const ethereumPeersRes = results[1].ok && results[1].response;

    const volume24HrWBTC: number = ethereumRes.network24hrSwapsVolume[0];
    const volume24HrBTC: number = volume24HrWBTC;
    const volumes: string[] = ethereumRes.network24hrSwapsVolume.map((volume, i) =>
      volume.toFixed(3),
    );

    // Memo: Instruction from Luke on 5 Jan'21
    const rewards24Hr: number = volume24HrBTC * 0.002;
    const metanodes = ethereumPeersRes.length;
    return {
      volume24HrWBTC,
      volume24HrBTC,
      rewards24Hr,
      volumes,
      metanodes,
    };
  } catch (err) {
    console.log(err);
  }
};
