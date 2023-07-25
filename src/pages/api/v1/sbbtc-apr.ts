import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { aprToApy } from 'apr-tools';
import { NextApiRequest, NextApiResponse } from 'next';

import { corsMiddleware, getParam } from '../../../modules/api';
import { fetcher } from '../../../modules/fetch';
import { skypoolsEnabled } from '../../../modules/env';

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
  res: NextApiResponse<{ apr: number; apy: number; e?: string }>,
) {
  await corsMiddleware({ req, res });
  const bridge = getParam({ req, name: 'bridge' }) as SkybridgeBridge;
  let apr = 0;
  let apy = 0;

  if (!isBridgeEnabled(bridge)) {
    return res.status(200).json({ apr, apy });
  }

  try {
    const results = await Promise.all([
      fetcher<{ result: { rows: { apr: number; date: string }[] } }>(
        'https://api.dune.com/api/v1/query/2705069/results?api_key=6AUVgjoBeq5858W8OVcwIhJz4xM0JWPE',
      ),
    ]);

    const currentApr = results[0].result.rows.find((row) => row.apr > 0);
    if (currentApr) {
      apr = Number(currentApr.apr.toFixed(1));
      apy = Number(aprToApy(apr).toFixed(1));
    }

    res.status(200).json({ apr, apy });
  } catch (e) {
    console.log(e);
    res.status(500).json({ apr, apy, e: e.message });
  }
}
