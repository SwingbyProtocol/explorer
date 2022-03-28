import { NextApiRequest, NextApiResponse } from 'next';

import { get7daysVolume, getNodeQty, getTVL } from '../../../modules/network-stats';

import { corsMiddleware } from './../../../modules/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    nodes: string;
    volume: string;
    tvl: string;
  }>,
) {
  await corsMiddleware({ req, res });

  try {
    const results = await Promise.all([
      getNodeQty({ bridge: 'btc_erc' }),
      getNodeQty({ bridge: 'btc_skypool' }),
      get7daysVolume(),
      getTVL(),
    ]);

    const data = {
      nodes: String(results[0] + results[1]),
      volume: results[2],
      tvl: results[3],
    };

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
}
