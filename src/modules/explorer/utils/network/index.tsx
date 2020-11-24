import { CoinSymbol } from '../../../coins';
import { ENDPOINT_API } from '../../../env';
import { fetch } from '../../../fetch';
import { IFetchUsd, IFloat, IFloatAmount, IFloatBalances, IStats } from '../../index';

export const getUsdPrice = async (): Promise<IFetchUsd> => {
  const priceBtcUrl = ENDPOINT_API.COINGECKO + '/simple/price?ids=bitcoin&vs_currencies=usd';
  const priceBnbUrl = ENDPOINT_API.COINGECKO + '/simple/price?ids=binancecoin&vs_currencies=usd';

  const results = await Promise.all([
    fetch<{ bitcoin: { usd } }>(priceBtcUrl),
    fetch<{ binancecoin: { usd } }>(priceBnbUrl),
  ]);
  const BTC = results[0].ok && results[0].response.bitcoin.usd;
  const BNB = results[1].ok && results[1].response.binancecoin.usd;

  return {
    BTC,
    BNB,
  };
};

const getFloatBalance = (currency: string, floatInfos: IFloatAmount[]): string => {
  let floatBalance: string;
  try {
    floatInfos.forEach((floatInfo) => {
      console.log('floatInfo', floatInfo);
      if (floatInfo.currency === currency) {
        floatBalance = floatInfo.amount;
      }
    });
  } catch (err) {
    console.error(err);
  }
  return floatBalance;
};

export const fetchFloatBalances = async (
  usdBtc: number,
  usdBnb: number,
): Promise<IFloatBalances> => {
  const urlBinance = ENDPOINT_API.BTCB_NODE + '/api/v1/floats/balances';
  const urlEth = ENDPOINT_API.BTCE_NODE + '/api/v1/floats/balances';

  try {
    const results = await Promise.all([
      fetch<IFloatAmount[]>(urlBinance),
      fetch<IFloatAmount[]>(urlEth),
    ]);
    const floatsBinance = results[0].ok && results[0].response;
    const floatsEth = results[1].ok && results[1].response;

    const floats: IFloat = {
      btc:
        Number(getFloatBalance(CoinSymbol.BTC, floatsBinance)) +
        Number(getFloatBalance(CoinSymbol.BTC, floatsEth)),
      btcb: Number(getFloatBalance(CoinSymbol.BTCB_1DE, floatsBinance)),
      bnb: Number(getFloatBalance(CoinSymbol.BNB, floatsBinance)),
      btce: Number(getFloatBalance(CoinSymbol.BTC_E, floatsEth)),
    };
    console.log('floats', floats);

    const capacity: number =
      usdBtc * Number(floats.btc) + usdBtc * Number(floats.btcb) + usdBnb * Number(floats.bnb);

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

    const volume24HrBinance: number = binanceRes.network24hrSwapsVolume[0];
    const volume24HrEthereum: number = ethereumRes.network24hrSwapsVolume[0];
    // Memo: `volume24HrBTC` means same as `volume24HrTOTAL`.
    const volume24HrBtc: number = volume24HrBinance + volume24HrEthereum;
    const rewards24Hr: number = Number(
      binanceRes.networkRewards24hrVolume[0] + ethereumRes.networkRewards24hrVolume[0],
    );
    const volumes: string[] = binanceRes.network24hrSwapsVolume.map((volume, i) =>
      (volume + ethereumRes.network24hrSwapsVolume[i]).toFixed(3),
    );
    const metanodes = binancePeersRes.length + ethereumPeersRes.length;
    return {
      volume24HrBinance,
      volume24HrEthereum,
      volume24HrBtc,
      rewards24Hr,
      volumes,
      metanodes,
    };
  } catch (err) {
    console.log(err);
  }
};
