import { IFloat, IFloatBalance, IStats } from '../../index';
import { ENDPOINT_API } from '../../../env';
import { fetch } from '../../../fetch';

export const fetchFloatBalances = async (): Promise<{ floats: IFloat; capacity: string }> => {
  const floatUrl = ENDPOINT_API.FLOAT_BALANCES;
  const priceBtcUrl = ENDPOINT_API.COINGECKO + '/simple/price?ids=bitcoin&vs_currencies=usd';
  const priceBnbUrl = ENDPOINT_API.COINGECKO + '/simple/price?ids=binancecoin&vs_currencies=usd';

  try {
    const results = await Promise.all([
      fetch<{ balances: IFloatBalance }>(floatUrl),
      fetch<{ bitcoin: { usd } }>(priceBtcUrl),
      fetch<{ binancecoin: { usd } }>(priceBnbUrl),
    ]);
    const floatBalances: IFloatBalance = results[0].ok && results[0].response.balances;
    const btcUsd: number = results[1].ok && results[1].response.bitcoin.usd;
    const bnbUsd: number = results[2].ok && results[2].response.binancecoin.usd;

    const floats: IFloat = {
      btc: Number(floatBalances.BTC.confirmed).toFixed(3),
      btcb: Number(floatBalances['BTCB-1DE']).toFixed(3),
      bnb: Number(floatBalances.BNB).toFixed(3),
    };

    const capacity: string = (
      btcUsd * Number(floats.btc) +
      btcUsd * Number(floats.btcb) +
      bnbUsd * Number(floats.bnb)
    ).toFixed(2);

    return { floats, capacity };
  } catch (err) {
    console.log(err);
  }
};

export const fetchStatsInfo = async (): Promise<IStats> => {
  const binanceBridge = ENDPOINT_API.BTCB_NODE + '/api/v1/swaps/stats';
  const ethereumBridge = ENDPOINT_API.BTCE_NODE + '/api/v1/swaps/stats';
  const binanceBridgePeers = ENDPOINT_API.BTCB_NODE + '/api/v1/peers';
  const ethereumBridgePeers = ENDPOINT_API.BTCE_NODE + '/api/v1/peers';

  try {
    const results = await Promise.all([
      fetch<{ network24hrSwapsVolume: number[]; networkRewards24hrVolume: bigint[] }>(
        binanceBridge,
      ),
      fetch<{ network24hrSwapsVolume: number[]; networkRewards24hrVolume: bigint[] }>(
        ethereumBridge,
      ),
      fetch<[]>(binanceBridgePeers),
      fetch<[]>(ethereumBridgePeers),
    ]);
    const binanceRes = results[0].ok && results[0].response;
    const ethereumRes = results[1].ok && results[1].response;
    const binancePeersRes = results[2].ok && results[2].response;
    const ethereumPeersRes = results[3].ok && results[3].response;

    const volume24Hr: string = (
      binanceRes.network24hrSwapsVolume[0] + ethereumRes.network24hrSwapsVolume[0]
    ).toFixed(3);
    const rewards24Hr: number = Number(
      binanceRes.networkRewards24hrVolume[0] + ethereumRes.networkRewards24hrVolume[0],
    );
    const volumes: string[] = binanceRes.network24hrSwapsVolume.map((volume, i) =>
      (volume + ethereumRes.network24hrSwapsVolume[i]).toFixed(3),
    );
    const metanodes = binancePeersRes.length + ethereumPeersRes.length;

    return {
      volume24Hr,
      rewards24Hr,
      volumes,
      metanodes,
    };
  } catch (err) {
    console.log(err);
  }
};
