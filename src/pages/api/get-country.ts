import { NextApiRequest, NextApiResponse } from 'next';

import { corsMiddleware, getParam } from '../../modules/api';
import { fetch } from '../../modules/fetch';

type Data = { country: string; code: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await corsMiddleware({ req, res });

  const ip = getParam({ req, name: 'ip' });
  const url = `https://api.ipgeolocationapi.com/geolocate/${ip}`;

  try {
    // Memo: the `name` returns official name which too long such a "United Kingdom of Great Britain and Northern Ireland"
    const result = await fetch<{ unofficial_names: string[]; alpha2: string }>(url);
    const country = result.ok && result.response.unofficial_names[0];
    const code = result.ok && result.response.alpha2;
    res.status(200).json({ country, code });
  } catch (e) {
    console.log(e);
  }
}
