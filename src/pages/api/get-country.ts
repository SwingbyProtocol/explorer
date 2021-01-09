import { NextApiRequest, NextApiResponse } from 'next';

import { corsMiddleware, getParam } from '../../modules/api';
import { fetch } from '../../modules/fetch';

type Data = { country: string; code: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await corsMiddleware({ req, res });

  const ip = getParam({ req, name: 'ip' });
  const url = `https://api.ipgeolocationapi.com/geolocate/${ip}`;

  try {
    const result = await fetch<{ name: string; alpha2: string }>(url);
    const country = result.ok && result.response.name;
    const code = result.ok && result.response.alpha2;
    res.status(200).json({ country, code });
  } catch (e) {
    console.log(e);
  }
}
