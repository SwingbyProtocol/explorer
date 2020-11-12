import { IFloat, IFloatBalance } from '../../index';
import { ENDPOINT_API } from '../../../env';
import { fetch } from '../../../fetch';

export const fetchFloatBalances = async () => {
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
    ).toFixed(0);

    return { floats, capacity };
  } catch (err) {
    console.log(err);
  }
};
