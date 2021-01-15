import { NextApiRequest, NextApiResponse } from 'next';

import { corsMiddleware } from '../../modules/api';
import { fetch } from '../../modules/fetch';

import { ETHER_NETWORK, infuraApiKey } from './../../modules/env';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await corsMiddleware({ req, res });
  try {
    // Memo: the `name` returns official name which too long such a "United Kingdom of Great Britain and Northern Ireland"
    const url = `https://${ETHER_NETWORK.network}.infura.io/v3/${infuraApiKey}`;
    // const result = await fetch<{ unofficial_names: string[]; alpha2: string }>(url);
    res.status(200).json(url);
  } catch (e) {
    console.log(e);
  }
}
