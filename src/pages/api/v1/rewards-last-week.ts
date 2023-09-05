import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

import { corsMiddleware, getParam } from '../../../modules/api';
import { fetcher } from '../../../modules/fetch';
import { skypoolsEnabled, ENDPOINT_SKYBRIDGE_EXCHANGE, mode } from '../../../modules/env';

const isBridgeEnabled = (bridge: SkybridgeBridge): boolean => {
  switch (bridge) {
    case 'btc_skypool': {
      return skypoolsEnabled;
    }
    default:
      return skypoolsEnabled;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ currency: string; total: number; totalSbBtc: number; e?: string }>,
) {
  await corsMiddleware({ req, res });
  const bridge = getParam({ req, name: 'bridge' }) as SkybridgeBridge;
  let reward = {
    currency: 'USD',
    total: 0,
    totalSbBtc: 0,
  };

  if (!isBridgeEnabled(bridge)) {
    return res.status(200).json(reward);
  }

  try {
    const sbBtcPriceUrl = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/sbBTC/price`;

    const results = await Promise.all([
      fetcher<{ price: number; usdtPrice: number }>(sbBtcPriceUrl),
      fetcher<{ result: { rows: { Amount: number }[] } }>(
        `https://api.dune.com/api/v1/query/2364511/results?api_key=${process.env.DUNE_API_KEY}`,
      ),
    ]);

    const sbBtcUsdtPrice = results[0].usdtPrice;
    const currentReward = results[1].result.rows.find((row) => row.Amount > 0);
    if (currentReward) {
      reward.totalSbBtc = currentReward.Amount;
      reward.total = currentReward.Amount * sbBtcUsdtPrice;
    }

    res.status(200).json(reward);
  } catch (e) {
    console.log(e);
    res.status(500).json({ ...reward, e: e.message });
  }
}
