import { NextApiRequest, NextApiResponse } from 'next';

import { corsMiddleware, getParam } from '../../../modules/api';
import { fetcher } from '../../../modules/fetch';

const ACTIVE_RESOLVERS = {
  UD: {
    isEnabled: true,
    resolve: async (address: string) => {
      try {
        const result = await fetcher<{ meta: { domain: string } }>(
          'https://api.unstoppabledomains.com/resolve/reverse/' + address.toLowerCase(),
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_UD_API_KEY}`,
            },
          },
        );

        if (result.meta.domain !== '') {
          return result.meta.domain;
        }
      } catch {
        return null;
      }
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ address: string; isResolved: boolean }>,
) {
  await corsMiddleware({ req, res });

  const address = getParam({ req, name: 'address' });
  const resolver = getParam({ req, name: 'resolver' });

  if (!ACTIVE_RESOLVERS[resolver] || !ACTIVE_RESOLVERS[resolver].isEnabled) {
    return res.status(200).json({ address, isResolved: false });
  }

  const resolvedAddress = await ACTIVE_RESOLVERS[resolver].resolve(address);

  if (!resolvedAddress) {
    return res.status(200).json({ address, isResolved: false });
  }

  return res.status(200).json({ address: resolvedAddress, isResolved: true });
}
